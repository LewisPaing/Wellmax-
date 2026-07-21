const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');
const recoveryForm = document.querySelector('#recovery-form');
const signupForm = document.querySelector('#signup-form');
const signupMessage = document.querySelector('#signup-message');
const authTabs = document.querySelectorAll('[data-auth-view]');
const requestDialog = document.querySelector('#request-dialog');
const requestForm = document.querySelector('#request-form');
const requestMessage = document.querySelector('#request-message');
const recoveryMessage = document.querySelector('#recovery-message');
const forgotPassword = document.querySelector('#forgot-password');
const signOut = document.querySelector('#sign-out');
const mobileMenu = document.querySelector('.mobile-menu');
const dashboardNav = document.querySelector('.dashboard-nav');
const config = window.WELLMAX_SUPABASE;
const supabaseClient = config && window.supabase
  ? window.supabase.createClient(config.url, config.publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;

function setMessage(element, message, isError = false) {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('error', isError);
  element.classList.add('visible');
}

function showAuthView(view) {
  if (!loginForm || !signupForm) return;
  const signingUp = view === 'signup';
  loginForm.hidden = signingUp;
  signupForm.hidden = !signingUp;
  recoveryForm.hidden = true;
  authTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.authView === view));
  document.querySelector('.login-card h2').textContent = signingUp ? 'Create your account' : 'Sign in to your portal';
  document.querySelector('.login-card .muted').textContent = signingUp
    ? 'Register now. WellMax will review and approve your workspace access.'
    : 'Access projects, approvals, files and requests securely.';
}
authTabs.forEach(tab => tab.addEventListener('click', () => showAuthView(tab.dataset.authView)));

signupForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!supabaseClient) return setMessage(signupMessage, 'The secure connection is unavailable.', true);
  const button = signupForm.querySelector('[type="submit"]');
  const otpField = signupForm.querySelector('#otp-field');
  const otpStep = !otpField.hidden;
  button.disabled = true;

  if (!otpStep) {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: signupForm.email.value.trim(),
      options: {
        shouldCreateUser: true,
        data: {
          full_name: signupForm.fullName.value.trim(),
          company_name: signupForm.companyName.value.trim()
        }
      }
    });
    if (error) {
      setMessage(signupMessage, error.message, true);
      button.disabled = false;
      return;
    }
    otpField.hidden = false;
    signupForm.otp.required = true;
    signupForm.querySelectorAll('input:not([name="otp"])').forEach(input => input.readOnly = true);
    signupForm.querySelector('.signup-action').textContent = 'Verify email & create account';
    setMessage(signupMessage, 'We sent a 6-digit verification code to your email. Enter it below.');
    signupForm.otp.focus();
    button.disabled = false;
    return;
  }

  const { error: verifyError } = await supabaseClient.auth.verifyOtp({
    email: signupForm.email.value.trim(),
    token: signupForm.otp.value.trim(),
    type: 'email'
  });
  if (verifyError) {
    setMessage(signupMessage, 'That code is incorrect or expired. Please check your email and try again.', true);
    button.disabled = false;
    return;
  }

  const { error: passwordError } = await supabaseClient.auth.updateUser({
    password: signupForm.password.value
  });
  if (passwordError) {
    setMessage(signupMessage, passwordError.message, true);
    button.disabled = false;
    return;
  }

  await supabaseClient.auth.signOut();
  signupForm.reset();
  otpField.hidden = true;
  signupForm.querySelectorAll('input').forEach(input => input.readOnly = false);
  signupForm.querySelector('.signup-action').textContent = 'Send verification code';
  setMessage(signupMessage, 'Email verified and account created. WellMax will review and approve your portal access.');
  button.disabled = false;
});

function showRecovery() {
  if (!loginForm || !recoveryForm) return;
  loginForm.hidden = true;
  recoveryForm.hidden = false;
  document.querySelector('.login-card h2').textContent = 'Choose a new password';
  document.querySelector('.login-card .muted').textContent = 'Use at least eight characters for your new password.';
}

loginForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!supabaseClient) return setMessage(loginMessage, 'The secure connection is unavailable. Please contact WellMax.', true);
  const button = loginForm.querySelector('[type="submit"]');
  button.disabled = true;
  setMessage(loginMessage, 'Checking your secure access…');
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: loginForm.email.value.trim(), password: loginForm.password.value
  });
  if (error) {
    setMessage(loginMessage, error.message === 'Invalid login credentials' ? 'The email or password is incorrect.' : error.message, true);
    button.disabled = false;
    return;
  }
  const { data: profile } = await supabaseClient.from('profiles').select('approved').maybeSingle();
  if (!profile?.approved) {
    await supabaseClient.auth.signOut();
    setMessage(loginMessage, 'Your account is waiting for WellMax approval. We will enable access after reviewing your registration.', true);
    button.disabled = false;
    return;
  }
  location.href = 'dashboard.html';
});

forgotPassword?.addEventListener('click', async () => {
  if (!supabaseClient) return;
  const email = loginForm?.email.value.trim();
  if (!email) {
    setMessage(loginMessage, 'Enter your email address first, then choose Forgot password.', true);
    loginForm?.email.focus();
    return;
  }
  const redirectTo = new URL('index.html', location.href).href;
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
  setMessage(loginMessage, error ? error.message : 'A secure password-reset link has been sent.', Boolean(error));
});

recoveryForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const password = recoveryForm.newPassword.value;
  if (password.length < 8) return setMessage(recoveryMessage, 'Use at least eight characters.', true);
  const { error } = await supabaseClient.auth.updateUser({ password });
  if (error) return setMessage(recoveryMessage, error.message, true);
  setMessage(recoveryMessage, 'Password updated. Opening your dashboard…');
  setTimeout(() => { location.href = 'dashboard.html'; }, 900);
});

function emptyState(message) {
  const p = document.createElement('p');
  p.className = 'empty-state';
  p.textContent = message;
  return p;
}

function statusLabel(value = '') {
  return value.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

function projectCode(title = 'Project') {
  return title.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase();
}

function renderProjects(projects) {
  const list = document.querySelector('#project-list');
  list.replaceChildren();
  if (!projects.length) return list.append(emptyState('No projects have been assigned yet. Your WellMax team will add them here.'));
  projects.forEach(project => {
    const row = document.createElement('div');
    row.className = 'project-row';
    const code = document.createElement('span'); code.className = 'project-code purple'; code.textContent = projectCode(project.title);
    const info = document.createElement('div'); info.className = 'project-info';
    const title = document.createElement('strong'); title.textContent = project.title;
    const detail = document.createElement('small'); detail.textContent = project.description || `Updated ${new Date(project.updated_at).toLocaleDateString()}`;
    const progress = document.createElement('div'); progress.className = 'progress';
    const fill = document.createElement('i'); fill.style.width = `${Math.min(100, Math.max(0, project.progress || 0))}%`; progress.append(fill);
    info.append(title, detail, progress);
    const status = document.createElement('span'); status.className = 'status review'; status.textContent = statusLabel(project.status);
    const percent = document.createElement('b'); percent.textContent = `${project.progress || 0}%`;
    row.append(code, info, status, percent); list.append(row);
  });
}

function renderApprovals(approvals) {
  const list = document.querySelector('#approval-list');
  list.replaceChildren();
  if (!approvals.length) return list.append(emptyState('You are all caught up. No approvals are waiting.'));
  approvals.forEach(approval => {
    const item = document.createElement('div'); item.className = 'action-item';
    const icon = document.createElement('span'); icon.className = 'file-type'; icon.textContent = 'OK';
    const copy = document.createElement('span');
    const title = document.createElement('strong'); title.textContent = approval.title;
    const hint = document.createElement('small'); hint.textContent = 'Review requested by WellMax';
    copy.append(title, hint); item.append(icon, copy); list.append(item);
  });
}

function formatBytes(bytes) {
  if (!bytes) return 'File';
  const units = ['B', 'KB', 'MB', 'GB']; let value = bytes; let unit = 0;
  while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit += 1; }
  return `${value.toFixed(unit ? 1 : 0)} ${units[unit]}`;
}

function renderFiles(files) {
  const list = document.querySelector('#file-list');
  list.replaceChildren();
  if (!files.length) return list.append(emptyState('No files are available yet. New deliverables will appear here.'));
  files.slice(0, 9).forEach(file => {
    const button = document.createElement('button'); button.type = 'button';
    const type = document.createElement('span'); type.textContent = (file.name.split('.').pop() || 'FILE').slice(0, 4).toUpperCase();
    const name = document.createElement('strong'); name.textContent = file.name;
    const size = document.createElement('small'); size.textContent = formatBytes(file.size_bytes);
    button.append(type, name, size);
    button.addEventListener('click', async () => {
      const { data, error } = await supabaseClient.storage.from('client-files').createSignedUrl(file.storage_path, 120);
      if (!error && data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener');
    });
    list.append(button);
  });
}

function renderRequests(requests) {
  const list = document.querySelector('#request-list');
  if (!list) return;
  list.replaceChildren();
  if (!requests.length) return list.append(emptyState('No requests yet. Use “Start a request” to send your first brief.'));
  requests.forEach(request => {
    const row = document.createElement('div'); row.className = 'request-row';
    const copy = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = request.title;
    const detail = document.createElement('small'); detail.textContent = `${request.service_type} · ${new Date(request.created_at).toLocaleDateString()}`;
    copy.append(title, detail);
    const status = document.createElement('span'); status.className = 'status review'; status.textContent = statusLabel(request.status);
    row.append(copy, status); list.append(row);
  });
}

function renderActivity(comments) {
  const list = document.querySelector('#activity-list');
  list.replaceChildren();
  if (!comments.length) return list.append(emptyState('No updates yet. Project conversations will appear here.'));
  comments.slice(0, 6).forEach(comment => {
    const item = document.createElement('li');
    const badge = document.createElement('span'); badge.textContent = 'WM';
    const copy = document.createElement('p');
    const body = document.createElement('strong'); body.textContent = comment.body;
    const date = document.createElement('small'); date.textContent = new Date(comment.created_at).toLocaleString();
    copy.append(body, date); item.append(badge, copy); list.append(item);
  });
}

async function protectDashboard() {
  if (!document.body.classList.contains('dashboard-page')) return;
  if (!supabaseClient) return location.replace('index.html');
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) return location.replace('index.html');
  const [profileResult, projectsResult, filesResult, approvalsResult, commentsResult] = await Promise.all([
    supabaseClient.from('profiles').select('full_name,role,approved').eq('id', session.user.id).maybeSingle(),
    supabaseClient.from('projects').select('id,title,description,status,progress,due_at,updated_at').order('updated_at', { ascending: false }),
    supabaseClient.from('project_files').select('id,name,storage_path,mime_type,size_bytes,created_at').order('created_at', { ascending: false }),
    supabaseClient.from('approvals').select('id,title,status,created_at').eq('status', 'pending').order('created_at', { ascending: false }),
    supabaseClient.from('comments').select('id,body,created_at').order('created_at', { ascending: false })
  ]);
  const profile = profileResult.data;
  if (!profile?.approved) {
    await supabaseClient.auth.signOut();
    return location.replace('index.html?pending=1');
  }
  const projects = projectsResult.data || [];
  const files = filesResult.data || [];
  const approvals = approvalsResult.data || [];
  const comments = commentsResult.data || [];
  if (profile) {
    const fullName = profile.full_name || session.user.email.split('@')[0];
    document.querySelector('.account strong').textContent = fullName;
    document.querySelector('.account small').textContent = `${statusLabel(profile.role)} account`;
    document.querySelector('.avatar').textContent = fullName.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
    document.querySelector('.welcome-row h1').textContent = `Welcome, ${fullName.split(' ')[0]}.`;
  }
  document.querySelector('#active-count').textContent = projects.filter(p => ['active', 'review'].includes(p.status)).length;
  document.querySelector('#approval-count').textContent = approvals.length;
  document.querySelector('#attention-count').textContent = approvals.length;
  document.querySelector('#file-count').textContent = files.length;
  const deadlines = projects.map(p => p.due_at).filter(Boolean).map(value => new Date(value)).filter(date => date >= new Date()).sort((a, b) => a - b);
  document.querySelector('#next-deadline').textContent = deadlines[0] ? deadlines[0].toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : 'None';
  const { data: requests } = await supabaseClient.from('service_requests').select('id,title,service_type,status,created_at').order('created_at', { ascending: false });
  renderProjects(projects); renderApprovals(approvals); renderFiles(files); renderActivity(comments); renderRequests(requests || []);
  document.querySelector('.dashboard-main').setAttribute('aria-busy', 'false');
}

document.querySelectorAll('#open-request,#open-request-secondary').forEach(button => button?.addEventListener('click', () => requestDialog?.showModal()));
document.querySelector('#close-request')?.addEventListener('click', () => requestDialog?.close());
requestDialog?.addEventListener('click', event => { if (event.target === requestDialog) requestDialog.close(); });
requestForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const { data: { user } } = await supabaseClient.auth.getUser();
  const { data: membership } = await supabaseClient.from('client_members').select('client_id').eq('user_id', user.id).maybeSingle();
  if (!membership) return setMessage(requestMessage, 'Your account is not assigned to a client workspace yet.', true);
  const payload = {
    client_id: membership.client_id,
    created_by: user.id,
    title: requestForm.title.value.trim(),
    service_type: requestForm.serviceType.value,
    description: requestForm.description.value.trim(),
    desired_due_at: requestForm.desiredDueAt.value || null
  };
  const { error } = await supabaseClient.from('service_requests').insert(payload);
  if (error) return setMessage(requestMessage, error.message, true);
  setMessage(requestMessage, 'Request submitted to WellMax.');
  requestForm.reset();
  setTimeout(() => location.reload(), 700);
});

signOut?.addEventListener('click', async () => {
  if (supabaseClient) await supabaseClient.auth.signOut();
  location.href = 'index.html';
});
mobileMenu?.addEventListener('click', () => {
  const open = mobileMenu.getAttribute('aria-expanded') === 'true';
  mobileMenu.setAttribute('aria-expanded', String(!open)); dashboardNav?.classList.toggle('open');
});
if (location.hash.includes('type=recovery')) showRecovery();
supabaseClient?.auth.onAuthStateChange(event => { if (event === 'PASSWORD_RECOVERY') showRecovery(); });
protectDashboard();
