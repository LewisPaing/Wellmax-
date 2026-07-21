(() => {
  const form = document.querySelector('#signup-form');
  const message = document.querySelector('#signup-message');
  if (!form || !window.supabase || !window.WELLMAX_SUPABASE) return;

  const client = window.supabase.createClient(
    window.WELLMAX_SUPABASE.url,
    window.WELLMAX_SUPABASE.publishableKey,
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
  );

  const showMessage = (text, isError = false) => {
    message.textContent = text;
    message.classList.toggle('error', isError);
    message.classList.add('visible');
  };

  const resetForm = () => {
    const otpField = form.querySelector('#otp-field');
    form.reset();
    otpField.hidden = true;
    form.otp.required = false;
    form.querySelectorAll('input').forEach(input => { input.readOnly = false; });
    form.querySelector('.signup-action').textContent = 'Send verification code';
    delete form.dataset.otpStep;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const button = form.querySelector('[type="submit"]');
    const otpField = form.querySelector('#otp-field');
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const otpStep = form.dataset.otpStep === 'true';

    button.disabled = true;

    try {
      if (!otpStep) {
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: form.fullName.value.trim(),
              company_name: form.companyName.value.trim()
            }
          }
        });

        if (error) throw error;

        if (data.session) {
          await client.auth.signOut();
          resetForm();
          showMessage('Account created. WellMax will review and approve your portal access.');
          return;
        }

        form.dataset.otpStep = 'true';
        otpField.hidden = false;
        form.otp.required = true;
        form.querySelectorAll('input:not([name="otp"])').forEach(input => { input.readOnly = true; });
        form.querySelector('.signup-action').textContent = 'Verify email & create account';
        showMessage('We sent a verification code to your email. Enter the newest code below.');
        form.otp.focus();
        return;
      }

      const token = form.otp.value.replace(/\s/g, '');
      const { error } = await client.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });

      if (error) throw error;

      await client.auth.signOut();
      resetForm();
      showMessage('Email verified and account created. WellMax will review and approve your portal access.');
    } catch (error) {
      console.error('WellMax signup error:', error);
      const detail = error?.message || 'Verification failed.';
      showMessage(`Unable to complete registration: ${detail}`, true);
    } finally {
      button.disabled = false;
    }
  }, true);
})();