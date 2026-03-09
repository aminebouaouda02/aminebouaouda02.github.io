// Example: smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form — Formspree integration
// Sign up at https://formspree.io, create a form, and replace YOUR_FORM_ID below.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
  console.warn('Contact form: replace YOUR_FORM_ID in script.js with your Formspree form ID (https://formspree.io).');
}

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  // Hide any previous messages
  formSuccess.classList.add('d-none');
  formError.classList.add('d-none');

  // Client-side validation
  if (!contactForm.checkValidity()) {
    contactForm.classList.add('was-validated');
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  submitText.textContent = 'Sending…';
  submitSpinner.classList.remove('d-none');

  const data = {
    name: document.getElementById('contactName').value.trim(),
    email: document.getElementById('contactEmail').value.trim(),
    message: document.getElementById('contactMessage').value.trim(),
  };

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      formSuccess.classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    } else {
      formError.classList.remove('d-none');
    }
  } catch {
    formError.classList.remove('d-none');
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Send';
    submitSpinner.classList.add('d-none');
  }
});