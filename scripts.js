document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine the initial theme
  let currentTheme;
  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (systemPrefersDark) {
    currentTheme = 'dark';
  } else {
    // Default to dark theme if no preference is set
    currentTheme = 'dark';
  }

  // Apply the initial theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // Save the current theme to localStorage
  localStorage.setItem('theme', currentTheme);

  // Toggle theme on button click
  if (toggleThemeBtn) {
    toggleThemeBtn.setAttribute('tabindex', '0');
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
    });

    // Allow toggling with keyboard
    toggleThemeBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleThemeBtn.click();
      }
    });
  }
});

