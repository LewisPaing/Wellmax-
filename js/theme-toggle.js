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
      button.setAttribute('aria-label', 'Switch to ' + nextTheme + ' mode');
      button.setAttribute('title', 'Switch to ' + nextTheme + ' mode');
      button.setAttribute('aria-pressed', String(theme === 'dark'));
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
    button.innerHTML = '<span class="theme-toggle__icon theme-toggle__sun" aria-hidden="true">☀</span><span class="theme-toggle__icon theme-toggle__moon" aria-hidden="true">☾</span>';
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
