(() => {
  const button = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.dashboard-nav');
  if (!button || !nav) return;

  if (!button.querySelector('span')) {
    const middleBar = document.createElement('span');
    middleBar.setAttribute('aria-hidden', 'true');
    button.textContent = '';
    button.append(middleBar);
  }

  const closeMenu = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open portal navigation');
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close portal navigation');
    nav.classList.add('open');
    document.body.classList.add('nav-open');
  };

  button.addEventListener('click', event => {
    event.stopImmediatePropagation();
    button.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', event => {
    if (button.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !button.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
})();
