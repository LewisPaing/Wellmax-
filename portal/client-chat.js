(() => {
  const config = window.WELLMAX_SUPABASE;
  const thread = document.querySelector('#client-chat-thread');
  const form = document.querySelector('#client-chat-form');
  const status = document.querySelector('#client-chat-status');
  if (!config || !window.supabase || !thread || !form) return;

  const db = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  let userId = null;
  let clientId = null;
  let channel = null;

  const setStatus = (text = '', error = false) => {
    status.textContent = text;
    status.classList.toggle('error', error);
  };

  const addMessage = message => {
    const empty = thread.querySelector('.chat-empty');
    if (empty) empty.remove();
    if (thread.querySelector(`[data-message-id="${message.id}"]`)) return;
    const row = document.createElement('div');
    row.className = `chat-message${message.sender_id === userId ? ' mine' : ''}`;
    row.dataset.messageId = message.id;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    const body = document.createElement('p');
    body.textContent = message.body;
    const time = document.createElement('small');
    time.textContent = `${message.sender_id === userId ? 'You' : 'WellMax'} · ${new Date(message.created_at).toLocaleString()}`;
    bubble.append(body, time);
    row.append(bubble);
    thread.append(row);
    thread.scrollTop = thread.scrollHeight;
  };

  async function loadMessages() {
    const { data, error } = await db.from('messages').select('id,client_id,sender_id,body,read_at,created_at').eq('client_id', clientId).order('created_at');
    if (error) return setStatus(`Messages could not load: ${error.message}`, true);
    thread.replaceChildren();
    if (!data?.length) {
      const empty = document.createElement('p');
      empty.className = 'chat-empty';
      empty.textContent = 'No messages yet. Send a message to the WellMax team.';
      thread.append(empty);
    } else data.forEach(addMessage);
  }

  async function start() {
    const { data: { user } } = await db.auth.getUser();
    if (!user) return;
    userId = user.id;
    const { data: membership, error } = await db.from('client_members').select('client_id').eq('user_id', user.id).maybeSingle();
    if (error || !membership) return setStatus('Your account is not connected to a client workspace.', true);
    clientId = membership.client_id;
    await loadMessages();
    channel = db.channel(`client-chat-${clientId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `client_id=eq.${clientId}` }, payload => addMessage(payload.new))
      .subscribe();
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const textarea = form.elements.message;
    const body = textarea.value.trim();
    if (!body || !clientId || !userId) return;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    setStatus('Sending…');
    const { data, error } = await db.from('messages').insert({ client_id: clientId, sender_id: userId, body }).select().single();
    button.disabled = false;
    if (error) return setStatus(error.message, true);
    textarea.value = '';
    addMessage(data);
    setStatus('Message sent.');
  });

  window.addEventListener('beforeunload', () => { if (channel) db.removeChannel(channel); });
  start();
})();