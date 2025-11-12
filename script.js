// Accessibility toggles, year fill, skip-link focus handling.
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggleLarge = document.getElementById('toggle-large');
  const toggleContrast = document.getElementById('toggle-contrast');
  const body = document.body;

  // load saved prefs
  const prefs = JSON.parse(localStorage.getItem('ewc-prefs') || "{}");
  if (prefs.large) body.classList.add('large-text');
  if (prefs.contrast) body.classList.add('high-contrast');
  if (toggleLarge) toggleLarge.checked = !!prefs.large;
  if (toggleContrast) toggleContrast.checked = !!prefs.contrast;

  function savePrefs() {
    localStorage.setItem('ewc-prefs', JSON.stringify({
      large: !!toggleLarge.checked,
      contrast: !!toggleContrast.checked
    }));
  }

  if (toggleLarge) {
    toggleLarge.addEventListener('change', function () {
      body.classList.toggle('large-text', toggleLarge.checked);
      savePrefs();
    });
  }
  if (toggleContrast) {
    toggleContrast.addEventListener('change', function () {
      body.classList.toggle('high-contrast', toggleContrast.checked);
      savePrefs();
    });
  }

  // Make the skip-link focus the main element for screen readers
  const skip = document.querySelector('.skip-link');
  const main = document.getElementById('main');
  if (skip && main) {
    skip.addEventListener('click', function (e) {
      // small timeout to ensure focus works in all browsers
      setTimeout(() => main.focus(), 10);
    });
  }
});