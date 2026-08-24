(() => {
  "use strict";

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (isStandalone) document.documentElement.classList.add("pwa-standalone");

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}), { once: true });
  }

  if (isStandalone || document.querySelector(".pwa-install-launcher")) return;

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);
  let installPrompt = null;

  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "pwa-install-launcher";
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.innerHTML = '<img src="/images/app-icon-192.png" alt=""><span>Install WellMax</span>';

  const dialog = document.createElement("dialog");
  dialog.className = "pwa-install-dialog";
  dialog.setAttribute("aria-label", "Install WellMax app");
  dialog.innerHTML = `
    <section class="pwa-install-sheet">
      <button class="pwa-install-close" type="button" aria-label="Close">×</button>
      <div class="pwa-install-head">
        <img src="/images/app-icon-192.png" alt="WellMax app icon">
        <div><h2>Install WellMax</h2><p>Services, work and client portal</p></div>
      </div>
      <div class="pwa-install-copy"></div>
    </section>`;

  document.body.append(launcher, dialog);
  const copy = dialog.querySelector(".pwa-install-copy");

  const renderInstructions = () => {
    if (isIOS) {
      copy.innerHTML = `
        <p>Add WellMax to your iPhone or iPad. It will open full-screen from your Home Screen.</p>
        <ol class="pwa-install-steps">
          <li><span>Tap the <strong>Share</strong> button in Safari.</span></li>
          <li><span>Scroll and choose <strong>Add to Home Screen</strong>.</span></li>
          <li><span>Tap <strong>Add</strong> to install WellMax.</span></li>
        </ol>`;
    } else if (isAndroid) {
      copy.innerHTML = `
        <p>Install WellMax on your Android Home Screen.</p>
        <ol class="pwa-install-steps">
          <li><span>Open the browser menu <strong>⋮</strong>.</span></li>
          <li><span>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>.</span></li>
          <li><span>Confirm <strong>Install</strong>.</span></li>
        </ol>`;
    } else {
      copy.innerHTML = `
        <p>Install WellMax for faster access to services, selected work and the client portal.</p>
        <ol class="pwa-install-steps">
          <li><span>Open this page on your iPhone or Android phone.</span></li>
          <li><span>Choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</span></li>
          <li><span>Launch WellMax from your app icon.</span></li>
        </ol>`;
    }
  };

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
  });

  launcher.addEventListener("click", async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      return;
    }
    renderInstructions();
    dialog.showModal();
  });

  dialog.querySelector(".pwa-install-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  window.addEventListener("appinstalled", () => {
    launcher.remove();
    if (dialog.open) dialog.close();
  });
})();
