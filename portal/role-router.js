(() => {
  const form = document.querySelector('#login-form');
  const message = document.querySelector('#login-message');
  const config = window.WELLMAX_SUPABASE;
  if (!form || !window.supabase || !config) return;

  const client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  const show = (text, error = false) => {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle('error', error);
    message.classList.add('visible');
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    show('Checking your secure access…');

    try {
      const email = form.email.value.trim().toLowerCase();
      const password = form.password.value;
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const user = data.user;
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('role,approved,full_name')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      if (profile.role === 'admin') {
        location.href = 'admin.html';
        return;
      }

      if (!profile.approved) {
        await client.auth.signOut();
        show('Your account is waiting for WellMax approval.', true);
        return;
      }

      location.href = 'dashboard.html';
    } catch (error) {
      const text = error?.message === 'Invalid login credentials'
        ? 'The email or password is incorrect.'
        : (error?.message || 'Unable to sign in.');
      show(text, true);
    } finally {
      button.disabled = false;
    }
  }, true);
})();