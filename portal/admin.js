(() => {
  const config = window.WELLMAX_SUPABASE;
  if (!window.supabase || !config) return;

  const client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  const $ = selector => document.querySelector(selector);
  const message = $('#admin-message');
  let profiles = [];
  let clients = [];
  let projects = [];
  let approvals = [];
  let requests = [];

  const show = (text, error = false) => {
    message.textContent = text;
    message.classList.toggle('error', error);
    message.classList.add('visible');
    window.clearTimeout(show.timer);
    show.timer = window.setTimeout(() => message.classList.remove('visible'), 4500);
  };

  const label = value => String(value || '').replaceAll('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
  const date = value => value ? new Date(value).toLocaleDateString() : '—';
  const empty = text => `<p class="empty">${text}</p>`;
  const clientName = row => row?.name || row?.company_name || row?.title || `Client ${String(row?.id || '').slice(0, 6)}`;

  async function protectAdmin() {
    const { data: { session } } = await client.auth.getSession();
    if (!session) return location.replace('index.html');

    const { data: profile, error } = await client.from('profiles').select('full_name,role,approved').eq('id', session.user.id).single();
    if (error || profile?.role !== 'admin') {
      await client.auth.signOut();
      return location.replace('index.html');
    }

    const name = profile.full_name || 'WellMax Admin';
    $('#admin-name').textContent = name;
    $('#admin-avatar').textContent = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
    await loadData();
  }

  async function loadData() {
    show('Refreshing admin workspace…');
    const results = await Promise.all([
      client.from('profiles').select('*').order('created_at', { ascending: false }),
      client.from('clients').select('*').order('created_at', { ascending: false }),
      client.from('projects').select('*').order('updated_at', { ascending: false }),
      client.from('approvals').select('*').order('created_at', { ascending: false }),
      client.from('service_requests').select('*').order('created_at', { ascending: false })
    ]);

    const failed = results.find(result => result.error);
    if (failed) {
      show(`Admin data could not load: ${failed.error.message}. Check the admin RLS policies in Supabase.`, true);
      return;
    }

    [profiles, clients, projects, approvals, requests] = results.map(result => result.data || []);
    renderAll();
    show('Admin workspace is up to date.');
  }

  function renderAll() {
    const clientProfiles = profiles.filter(profile => profile.role !== 'admin');
    $('#metric-clients').textContent = clientProfiles.length;
    $('#metric-projects').textContent = projects.filter(project => !['completed', 'archived'].includes(project.status)).length;
    $('#metric-approvals').textContent = approvals.filter(item => item.status === 'pending').length;
    $('#metric-requests').textContent = requests.filter(item => !['completed', 'closed', 'rejected'].includes(item.status)).length;

    renderClients(clientProfiles);
    renderProjects();
    renderApprovals();
    renderRequests();
    populateClientSelect();
  }

  function renderClients(rows) {
    const tbody = $('#client-rows');
    tbody.replaceChildren();
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="5">No client accounts yet.</td></tr>';
      return;
    }

    rows.forEach(profile => {
      const tr = document.createElement('tr');
      const approved = Boolean(profile.approved);
      tr.innerHTML = `
        <td><strong>${profile.full_name || 'Unnamed client'}</strong></td>
        <td>${label(profile.role)}</td>
        <td><span class="status-pill ${approved ? 'ok' : 'wait'}">${approved ? 'Approved' : 'Pending'}</span></td>
        <td>${date(profile.created_at)}</td>
        <td><button class="row-action" data-profile-id="${profile.id}" data-approved="${approved}">${approved ? 'Suspend' : 'Approve'}</button></td>`;
      tbody.append(tr);
    });
  }

  function renderProjects() {
    const list = $('#project-rows');
    list.replaceChildren();
    if (!projects.length) return list.innerHTML = empty('No projects yet. Create the first project using the form.');

    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'admin-card';
      const owner = clients.find(item => item.id === project.client_id);
      card.innerHTML = `
        <div><strong>${project.title || 'Untitled project'}</strong><p>${clientName(owner)} · ${label(project.status)} · ${Number(project.progress || 0)}% · Due ${date(project.due_at)}</p></div>
        <div class="admin-card-actions">
          <button class="row-action" data-project-id="${project.id}" data-progress="${Number(project.progress || 0)}">Update progress</button>
          <button class="row-action" data-project-complete="${project.id}">Mark complete</button>
        </div>`;
      list.append(card);
    });
  }

  function renderApprovals() {
    const list = $('#approval-rows');
    list.replaceChildren();
    if (!approvals.length) return list.innerHTML = empty('No approval items have been created.');

    approvals.forEach(item => {
      const card = document.createElement('article');
      card.className = 'admin-card';
      card.innerHTML = `<div><strong>${item.title || 'Approval item'}</strong><p>${label(item.status)} · ${date(item.created_at)}</p></div><div class="admin-card-actions">${item.status === 'pending' ? `<button class="row-action" data-approval-id="${item.id}" data-status="approved">Approve</button><button class="row-action" data-approval-id="${item.id}" data-status="rejected">Reject</button>` : ''}</div>`;
      list.append(card);
    });
  }

  function renderRequests() {
    const list = $('#request-rows');
    list.replaceChildren();
    if (!requests.length) return list.innerHTML = empty('No client requests yet.');

    requests.forEach(item => {
      const card = document.createElement('article');
      card.className = 'admin-card';
      card.innerHTML = `<div><strong>${item.title || 'Client request'}</strong><p>${item.service_type || 'General'} · ${label(item.status)} · ${date(item.created_at)}</p></div><div class="admin-card-actions"><button class="row-action" data-request-id="${item.id}" data-status="in_progress">Start</button><button class="row-action" data-request-id="${item.id}" data-status="completed">Complete</button></div>`;
      list.append(card);
    });
  }

  function populateClientSelect() {
    const select = $('#project-form select[name="clientId"]');
    select.innerHTML = '<option value="">Select client</option>';
    clients.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = clientName(item);
      select.append(option);
    });
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest('button');
    if (!button) return;

    try {
      if (button.dataset.profileId) {
        const approved = button.dataset.approved !== 'true';
        const { error } = await client.from('profiles').update({ approved }).eq('id', button.dataset.profileId);
        if (error) throw error;
        show(approved ? 'Client account approved.' : 'Client account suspended.');
        return loadData();
      }

      if (button.dataset.projectId) {
        const current = Number(button.dataset.progress || 0);
        const answer = prompt('Enter project progress from 0 to 100:', String(current));
        if (answer === null) return;
        const progress = Math.min(100, Math.max(0, Number(answer)));
        if (!Number.isFinite(progress)) throw new Error('Enter a valid progress number.');
        const { error } = await client.from('projects').update({ progress, updated_at: new Date().toISOString() }).eq('id', button.dataset.projectId);
        if (error) throw error;
        show('Project progress updated.');
        return loadData();
      }

      if (button.dataset.projectComplete) {
        const { error } = await client.from('projects').update({ status: 'completed', progress: 100, updated_at: new Date().toISOString() }).eq('id', button.dataset.projectComplete);
        if (error) throw error;
        show('Project marked complete.');
        return loadData();
      }

      if (button.dataset.approvalId) {
        const { error } = await client.from('approvals').update({ status: button.dataset.status }).eq('id', button.dataset.approvalId);
        if (error) throw error;
        show(`Approval marked ${button.dataset.status}.`);
        return loadData();
      }

      if (button.dataset.requestId) {
        const { error } = await client.from('service_requests').update({ status: button.dataset.status }).eq('id', button.dataset.requestId);
        if (error) throw error;
        show(`Request marked ${label(button.dataset.status)}.`);
        return loadData();
      }
    } catch (error) {
      show(error.message || 'The update could not be saved.', true);
    }
  });

  $('#project-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      client_id: form.clientId.value,
      title: form.title.value.trim(),
      description: form.description.value.trim() || null,
      status: form.status.value,
      progress: Number(form.progress.value || 0),
      due_at: form.dueAt.value || null
    };

    const { error } = await client.from('projects').insert(payload);
    if (error) return show(`Project could not be created: ${error.message}`, true);
    form.reset();
    show('Project created and added to the client workspace.');
    await loadData();
  });

  $('#refresh-admin')?.addEventListener('click', loadData);
  $('#admin-sign-out')?.addEventListener('click', async () => {
    await client.auth.signOut();
    location.href = 'index.html';
  });

  protectAdmin();
})();