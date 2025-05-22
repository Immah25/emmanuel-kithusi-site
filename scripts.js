document.addEventListener("DOMContentLoaded", function () {
  // 1. Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Initial active navigation link highlighting based on URL
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  // 2b. Scroll-based active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60; // adjust for fixed header height if any
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Back to top button functionality
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. Lazy loading images
  const lazyImages = document.querySelectorAll('img.lazy');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers — load all images immediately
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }

  // 5. Basic form validation example (adjust for your form)
  const form = document.querySelector('form#contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      if (!name.value.trim()) {
        alert("Please enter your name.");
        name.focus();
        e.preventDefault();
        return;
      }
      if (!email.value.trim() || !email.value.includes('@')) {
        alert("Please enter a valid email.");
        email.focus();
        e.preventDefault();
        return;
      }
      // Add other validations as needed
    });
  }

  // 6. Animated typing effect for tagline
  const taglineElement = document.querySelector('.tagline');
  if (taglineElement) {
    const text = taglineElement.textContent;
    taglineElement.textContent = '';
    let index = 0;
    function type() {
      if (index < text.length) {
        taglineElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // typing speed in ms
      }
    }
    type();
  }

  // 7. Dark mode toggle logic with default dark mode
  const toggleThemeBtn = document.getElementById('toggle-theme');
  if (toggleThemeBtn) {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no saved preference
    let currentTheme = savedTheme ? savedTheme : 'dark';

    function applyTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('theme', theme);
      currentTheme = theme;
    }

    applyTheme(currentTheme);

    toggleThemeBtn.setAttribute('tabindex', '0');
    toggleThemeBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    toggleThemeBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleThemeBtn.click();
      }
    });
  }
});
