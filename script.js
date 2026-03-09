// ── Dark / Light mode toggle ──────────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('darkMode', dark ? 'true' : 'false');
}

themeToggle.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark-mode'));
});

// Restore saved preference on load
applyTheme(localStorage.getItem('darkMode') === 'true');

// ── Active nav-link on scroll (scroll spy) ───────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + current
    );
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ── Back-to-top button ────────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Typing animation in hero ──────────────────────────────────────────────────
const roles   = ['Data Science Student', 'ML Enthusiast', 'Python Developer', 'Data Analyst'];
let   roleIdx = 0;
let   charIdx = 0;
let   deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}

type();

// ── Skills progress-bar animation on scroll ───────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar');

function animateBars(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar  = entry.target;
      const pct  = bar.dataset.pct;
      bar.style.width = pct + '%';
      observer.unobserve(bar);
    }
  });
}

const observer = new IntersectionObserver(animateBars, { threshold: 0.3 });
skillBars.forEach(bar => observer.observe(bar));