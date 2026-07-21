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
    delete form.dataset.otpEmail;
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
        const { error } = await client.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
            data: {
              full_name: form.fullName.value.trim(),
              company_name: form.companyName.value.trim()
            }
          }
        });

        if (error) throw error;

        form.dataset.otpStep = 'true';
        form.dataset.otpEmail = email;
        otpField.hidden = false;
        form.otp.required = true;
        form.querySelectorAll('input:not([name="otp"])').forEach(input => { input.readOnly = true; });
        form.querySelector('.signup-action').textContent = 'Verify email & create account';
        showMessage('A new verification code was sent. Enter the newest code from this email only.');
        form.otp.focus();
        return;
      }

      const token = form.otp.value.replace(/\D/g, '');
      const requestedEmail = form.dataset.otpEmail || email;

      if (token.length < 6 || token.length > 8) {
        throw new Error('Enter the complete verification code from the newest email.');
      }

      const { error: verifyError } = await client.auth.verifyOtp({
        email: requestedEmail,
        token,
        type: 'email'
      });

      if (verifyError) throw verifyError;

      const { error: passwordError } = await client.auth.updateUser({ password });
      if (passwordError) throw passwordError;

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