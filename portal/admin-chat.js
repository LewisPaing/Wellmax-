(() => {
  const config = window.WELLMAX_SUPABASE;
  const list = document.querySelector('#conversation-list');
  const thread = document.querySelector('#admin-chat-thread');
  const form = document.querySelector('#admin-chat-form');
  const title = document.querySelector('#admin-chat-title');
  const status = document.querySelector('#admin-chat-status');
  if (!config || !window.supabase || !list || !thread || !form) return;

  const db = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  let adminId = null;
  let clients = [];
  let messages = [];
  let selectedClientId = null;
  let channel = null;

  const setStatus = (text = '', error = false) => {
    status.textContent = text;
    status.classList.toggle('error', error);
  };
  const clientName = client => client?.name || client?.company_name || client?.title || `Client ${String(client?.id || '').slice(0, 6)}`;

  function renderConversations() {
    list.replaceChildren();
    if (!clients.length) {
      list.innerHTML = '<p class="chat-empty">No clients yet.</p>';
      return;
    }
    clients.forEach(client => {
      const clientMessages = messages.filter(item => item.client_id === client.id);
      const unread = clientMessages.filter(item => item.sender_id !== adminId && !item.read_at).length;
      const latest = clientMessages.at(-1);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `conversation-button${selectedClientId === client.id ? ' active' : ''}`;
      button.dataset.clientId = client.id;
      button.innerHTML = `<strong>${clientName(client)}${unread ? `<span class="chat-unread">${unread}</span>` : ''}</strong><small>${latest ? latest.body.slice(0, 54) : 'No messages yet'}</small>`;
      list.append(button);
    });
  }

  function renderThread() {
    const client = clients.find(item => item.id === selectedClientId);
    title.textContent = client ? clientName(client) : 'Select a client';
    thread.replaceChildren();
    const current = messages.filter(item => item.client_id === selectedClientId);
    if (!current.length) {
      thread.innerHTML = '<p class="chat-empty">No messages in this conversation.</p>';
      return;
    }
    current.forEach(message => {
      const row = document.createElement('div');
      row.className = `chat-message${message.sender_id === adminId ? ' mine' : ''}`;
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      const body = document.createElement('p');
      body.textContent = message.body;
      const time = document.createElement('small');
      time.textContent = `${message.sender_id === adminId ? 'You' : 'Client'} · ${new Date(message.created_at).toLocaleString()}`;
      bubble.append(body, time);
      row.append(bubble);
      thread.append(row);
    });
    thread.scrollTop = thread.scrollHeight;
  }

  async function markRead() {
    if (!selectedClientId) return;
    const unreadIds = messages.filter(item => item.client_id === selectedClientId && item.sender_id !== adminId && !item.read_at).map(item => item.id);
    if (!unreadIds.length) return;
    const now = new Date().toISOString();
    const { error } = await db.from('messages').update({ read_at: now }).in('id', unreadIds);
    if (!error) {
      messages = messages.map(item => unreadIds.includes(item.id) ? { ...item, read_at: now } : item);
      renderConversations();
    }
  }

  async function selectConversation(clientId) {
    selectedClientId = clientId;
    renderConversations();
    renderThread();
    await markRead();
  }

  async function load() {
    const { data: { user } } = await db.auth.getUser();
    if (!user) return;
    adminId = user.id;
    const [clientsResult, messagesResult] = await Promise.all([
      db.from('clients').select('*').order('created_at', { ascending: false }),
      db.from('messages').select('id,client_id,sender_id,body,read_at,created_at').order('created_at')
    ]);
    if (clientsResult.error || messagesResult.error) {
      return setStatus((clientsResult.error || messagesResult.error).message, true);
    }
    clients = clientsResult.data || [];
    messages = messagesResult.data || [];
    renderConversations();
    if (clients[0]) await selectConversation(clients[0].id);

    channel = db.channel('admin-chat-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
        if (payload.eventType === 'INSERT') messages.push(payload.new);
        if (payload.eventType === 'UPDATE') messages = messages.map(item => item.id === payload.new.id ? payload.new : item);
        renderConversations();
        if (payload.new?.client_id === selectedClientId) {
          renderThread();
          markRead();
        }
      })
      .subscribe();
  }

  list.addEventListener('click', event => {
    const button = event.target.closest('[data-client-id]');
    if (button) selectConversation(button.dataset.clientId);
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const body = form.elements.message.value.trim();
    if (!body || !selectedClientId || !adminId) return;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    setStatus('Sending…');
    const { data, error } = await db.from('messages').insert({ client_id: selectedClientId, sender_id: adminId, body }).select().single();
    button.disabled = false;
    if (error) return setStatus(error.message, true);
    form.reset();
    if (!messages.some(item => item.id === data.id)) messages.push(data);
    renderConversations();
    renderThread();
    setStatus('Reply sent.');
  });

  window.addEventListener('beforeunload', () => { if (channel) db.removeChannel(channel); });
  load();
})();