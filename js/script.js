document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ============================================================
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeElements.forEach((el) => observer.observe(el));
  }

  // ============================================================
  // COUNTER ANIMATION
  // ============================================================
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const finalVal = parseInt(target.getAttribute('data-target'), 10);
            if (isNaN(finalVal)) return;
            let current = 0;
            const increment = Math.ceil(finalVal / 60);
            const timer = setInterval(() => {
              current += increment;
              if (current >= finalVal) {
                target.textContent = finalVal.toLocaleString();
                clearInterval(timer);
              } else {
                target.textContent = current.toLocaleString();
              }
            }, 30);
            counterObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  // ============================================================
  // FORM VALIDATION (Contact Form)
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Real-time validation
    const validateField = (input) => {
      if (input.validity.valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
    };

    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) {
            validateField(input);
          }
        });
      }
    });

    // Custom email validation
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        nameInput.nextElementSibling.textContent = 'Please enter your name.';
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        nameInput.nextElementSibling.textContent = 'Name must be at least 2 characters.';
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      // Email validation
      if (!emailInput.value.trim()) {
        emailInput.classList.add('is-invalid');
        emailInput.nextElementSibling.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        emailInput.nextElementSibling.textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      // Subject validation
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('is-invalid');
        subjectInput.nextElementSibling.textContent = 'Please enter a subject.';
        isValid = false;
      } else if (subjectInput.value.trim().length < 3) {
        subjectInput.classList.add('is-invalid');
        subjectInput.nextElementSibling.textContent = 'Subject must be at least 3 characters.';
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
        subjectInput.classList.add('is-valid');
      }

      // Message validation
      if (!messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        messageInput.nextElementSibling.textContent = 'Please enter your message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        messageInput.nextElementSibling.textContent = 'Message must be at least 10 characters.';
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      }

      if (isValid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        setTimeout(() => {
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alert alert-success mt-3';
          alertDiv.style.background = '#1B5E20';
          alertDiv.style.borderColor = '#2E7D32';
          alertDiv.style.color = '#FFF';
          alertDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>Message sent successfully! Resistencia!';
          contactForm.appendChild(alertDiv);
          contactForm.reset();
          document.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));
          btn.disabled = false;
          btn.innerHTML = originalText;
          setTimeout(() => alertDiv.remove(), 5000);
        }, 1500);
      }
    });
  }

  // ============================================================
  // GALLERY / OVERLAY CLICK (lightbox simulation)
  // ============================================================
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', function () {
      const imgSrc = this.querySelector('img')?.getAttribute('src');
      if (imgSrc) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed; top:0; left:0; width:100%; height:100%;
          background: rgba(0,0,0,0.9); z-index:9999;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
        `;
        overlay.innerHTML = `<img src="${imgSrc}" style="max-width:90%;max-height:90%;border-radius:8px;border:3px solid #C62828;">`;
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
      }
    });
  });

  // ============================================================
  // TOOLTIP INIT (Bootstrap)
  // ============================================================
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (tooltips.length && typeof bootstrap !== 'undefined') {
    tooltips.forEach((el) => new bootstrap.Tooltip(el));
  }

  // ============================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ============================================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ============================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ============================================================
  // PAGE LOAD ANIMATION
  // ============================================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);

});
