document.addEventListener('DOMContentLoaded', () => {
  // ——— Carrusel —————————————————————————————
  const track      = document.querySelector('.carousel-track');
  const slides     = Array.from(track.children);
  const prevBtn    = document.querySelector('.left-arrow');
  const nextBtn    = document.querySelector('.right-arrow');
  const dots       = Array.from(document.querySelectorAll('.indicator'));
  let   currentIndex = 0;

  function updateCarousel() {
    const slideRect = slides[0].getBoundingClientRect();
    const gapValue  = parseInt(getComputedStyle(track).getPropertyValue('gap')) || 0;
    const slideSize = slideRect.width + gapValue;
    track.style.transform = `translateX(-${ slideSize * currentIndex }px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  updateCarousel();

  // ——— FAQ Acordeón —————————————————————————
  document.querySelectorAll('.faq-item').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        document.querySelectorAll('.faq-item').forEach((other) => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });

  // ——— Menú Hamburguesa ————————————————————————
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('header nav');

  if (!toggle || !nav) {
    console.error('No encuentro .menu-toggle o header nav');
  } else {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // ——— Scroll suave en enlaces internos —————————————————
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ——— Formulario + Modal ————————————————————————
  const form       = document.getElementById('contact-form');
  const modal      = document.getElementById('modal-overlay');
  const closeBtn   = document.getElementById('modal-close');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validación nativa HTML5
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Limpiamos el formulario antes de mostrar el modal
    form.reset();

    // Mostrar modal
    modal.classList.add('open');
  });

  // Cerramos el modal al clickear la X
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  // ——— Formulario + Modal ————————————————————————
  const newsletterForm    = document.querySelector('.newsletter-form');
  const newsletterInput   = document.getElementById('newletterEmail');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  newsletterForm.addEventListener('submit', event => {
    event.preventDefault();
    // Validación
    if (!newsletterInput.checkValidity()) {
      newsletterInput.reportValidity();
      return;
    }
    // Reseteamos y mostramos mensaje
    newsletterForm.reset();
    newsletterSuccess.style.display = 'block';
    // Ocultar mensaje tras 4 segundos (opcional)
    setTimeout(() => {
      newsletterSuccess.style.display = 'none';
    }, 4000);
  });
});