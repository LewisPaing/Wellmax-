(function () {
  'use strict';

  var storageKey = 'wellmax-theme';
  var root = document.documentElement;
  var media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function preferredTheme() {
    var saved = savedTheme();
    if (saved === 'light' || saved === 'dark') return saved;
    return media && media.matches ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    var button = document.querySelector('.theme-toggle');
    if (button) {
      var nextTheme = theme === 'dark' ? 'light' : 'dark';
      var label = 'Switch to ' + nextTheme + ' mode';
      button.dataset.i18nLabel = label;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      document.dispatchEvent(new CustomEvent('wellmax:themechange'));
    }

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch (error) {
        // The theme still works when storage is unavailable.
      }
    }
  }

  applyTheme(preferredTheme(), false);

  function mountToggle() {
    if (document.querySelector('.theme-toggle')) return;

    var button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    button.innerHTML = '<span class="theme-toggle__icon theme-toggle__sun" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.75"></circle><path d="M12 2.2v2.1M12 19.7v2.1M2.2 12h2.1M19.7 12h2.1M5.1 5.1l1.5 1.5M17.4 17.4l1.5 1.5M18.9 5.1l-1.5 1.5M6.6 17.4l-1.5 1.5"></path></svg></span><span class="theme-toggle__icon theme-toggle__moon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.2 15.3A8.7 8.7 0 0 1 8.7 3.8 8.7 8.7 0 1 0 20.2 15.3Z"></path></svg></span>';
    button.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });

    var dock = document.querySelector('.preference-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.className = 'preference-dock';
      dock.setAttribute('aria-label', 'Display and language preferences');
      document.body.appendChild(dock);
    }
    dock.appendChild(button);
    applyTheme(root.dataset.theme || preferredTheme(), false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountToggle, { once: true });
  } else {
    mountToggle();
  }

  if (media) {
    var syncWithSystem = function (event) {
      if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light', false);
    };
    if (media.addEventListener) media.addEventListener('change', syncWithSystem);
    else if (media.addListener) media.addListener(syncWithSystem);
  }
})();
