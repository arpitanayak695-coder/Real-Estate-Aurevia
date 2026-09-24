
document.getElementById('year').textContent = new Date().getFullYear();

window.AUREVIA_CONFIG = {
  API_BASE_LOCAL: "http://127.0.0.1:5000",
  API_BASE_PRODUCTION: "https://aurevia-backend-lilac.vercel.app"
};

const API_BASE = (function () {
  var host = window.location.hostname;
  var isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host === "" ||
    /^192\.168\./.test(host) ||
    /^10\./.test(host);
  return isLocal
    ? window.AUREVIA_CONFIG.API_BASE_LOCAL
    : window.AUREVIA_CONFIG.API_BASE_PRODUCTION;
})();

/* ---------------------------------------------------------
   Mobile navigation
--------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu(){
  mobileMenu.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

/* ---------------------------------------------------------
   Navbar: subtle shrink/solidify on scroll
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------------------------------------------------------
   Scroll reveal (IntersectionObserver, respects reduced motion)
--------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('js-hidden'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('js-hidden');
        entry.target.classList.add('js-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
}

/* ---------------------------------------------------------
   Property data
--------------------------------------------------------- */
const PROPERTIES = [
  {
    id: 'oak-residence',
    name: 'The Oak Residence',
    location: 'Port Haven, Coastal District',
    type: 'Detached House',
    price: '$1,480,000',
    beds: 4, baths: 5, area: '4,200 sq.ft.',
    parking: 2, year: 2019,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    desc: 'A light-filled residence with a double-height living room and a garden designed for entertaining.',
    amenities: ['Private garden', 'Home office', 'Wine cellar', 'Radiant floor heating', 'EV charging', 'Guest suite']
  },
  {
    id: 'birchwood-loft',
    name: 'Birchwood Loft',
    location: 'Old Mill District',
    type: 'Converted Loft',
    price: '$865,000',
    beds: 2, baths: 2, area: '1,850 sq.ft.',
    parking: 1, year: 2021,
    image: 'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?auto=format&fit=crop&w=1000&q=80',
    desc: 'Exposed timber beams and steel-framed windows inside a converted textile mill.',
    amenities: ['Exposed brick', 'Roof terrace access', 'Bike storage', 'Concierge', 'Pet friendly']
  },
  {
    id: 'harbour-view',
    name: 'Harbour View Villa',
    location: 'Coastal Bluffs',
    type: 'Villa',
    price: '$2,950,000',
    beds: 5, baths: 6, area: '5,600 sq.ft.',
    parking: 3, year: 2022,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    desc: 'Cantilevered over the bluff, with uninterrupted views across the harbour from every principal room.',
    amenities: ['Infinity pool', 'Private dock access', 'Home cinema', 'Wellness room', 'Smart home', 'Staff quarters']
  },
  {
    id: 'linden-court',
    name: 'Linden Court',
    location: 'Maple Heights',
    type: 'Townhouse',
    price: '$1,120,000',
    beds: 3, baths: 3, area: '2,400 sq.ft.',
    parking: 2, year: 2018,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    desc: 'A quiet courtyard townhouse with a top-floor studio and a private walled garden.',
    amenities: ['Walled garden', 'Studio space', 'Fireplace', 'Underfloor storage', 'Rear lane parking']
  },
  {
    id: 'meridian-penthouse',
    name: 'Meridian Penthouse',
    location: 'Downtown Financial Quarter',
    type: 'Penthouse',
    price: '$3,600,000',
    beds: 3, baths: 4, area: '3,100 sq.ft.',
    parking: 2, year: 2023,
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1000&q=80',
    desc: 'Full-floor penthouse with a wraparound terrace and skyline views in every direction.',
    amenities: ['Wraparound terrace', 'Private elevator', '24-hour concierge', 'Gym access', 'Smart climate control']
  },
  {
    id: 'orchard-cottage',
    name: 'Orchard Cottage',
    location: 'Willowmere Valley',
    type: 'Cottage',
    price: '$640,000',
    beds: 3, baths: 2, area: '1,650 sq.ft.',
    parking: 2, year: 2016,
    image: 'https://images.unsplash.com/photo-1701031977495-0351a1c8d889?auto=format&fit=crop&w=1000&q=80',
    desc: 'A renovated stone cottage set within an established orchard, twenty minutes from the coast.',
    amenities: ['Orchard grounds', 'Wood-burning stove', 'Outbuilding / studio', 'Well water', 'Root cellar']
  }
];

/* ---------------------------------------------------------
   Render property cards
--------------------------------------------------------- */
const grid = document.getElementById('propertyGrid');

function cardTemplate(p){
  return `
    <article class="property-card reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.name}">
      <div class="property-card__media">
        <img src="${p.image}" alt="${p.name}, ${p.type} in ${p.location}" loading="lazy">
        <div class="property-card__overlay"></div>
        <span class="property-card__price">${p.price}</span>
      </div>
      <div class="property-card__body">
        <span class="property-card__loc">${p.location}</span>
        <h3 class="property-card__name">${p.name}</h3>
        <span class="property-card__meta">${p.beds} Beds · ${p.baths} Baths · ${p.area}</span>
        <p class="property-card__desc">${p.desc}</p>
        <span class="property-card__cta">View Property →</span>
      </div>
    </article>
  `;
}

grid.innerHTML = PROPERTIES.map(cardTemplate).join('');

// Observe newly injected cards for reveal animation
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const cardIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('js-hidden');
        entry.target.classList.add('js-visible');
        cardIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  grid.querySelectorAll('.property-card').forEach(el => {
    el.classList.add('js-hidden');
    cardIo.observe(el);
  });
}

/* ---------------------------------------------------------
   Property modal
--------------------------------------------------------- */
const modal = document.getElementById('propertyModal');
const modalBody = document.getElementById('modalBody');
let lastFocusedEl = null;

function openModal(id){
  const p = PROPERTIES.find(item => item.id === id);
  if (!p) return;

  modalBody.innerHTML = `
    <img src="${p.image}" alt="${p.name}, ${p.type} in ${p.location}">
    <div class="modal__body-inner">
      <span class="property-card__loc">${p.location}</span>
      <h3 id="modalTitle">${p.name}</h3>
      <p class="property-card__desc">${p.desc}</p>
      <div class="modal-specs">
        <span>${p.type}</span>
        <span>${p.beds} Bedrooms</span>
        <span>${p.baths} Bathrooms</span>
        <span>${p.area}</span>
        <span>${p.parking} Parking</span>
        <span>Built ${p.year}</span>
        <span>${p.price}</span>
      </div>
      <h4 style="font-family:var(--font-body); font-size:0.85rem; letter-spacing:0.03em; color:var(--gold); margin-bottom:6px;">Amenities</h4>
      <ul class="modal__amenities">
        ${p.amenities.map(a => `<li>${a}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn btn--solid" data-close data-property="${p.name}">Enquire about this property</a>
    </div>
  `;

  lastFocusedEl = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal__close').focus();
}

function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.property-card');
  if (card) openModal(card.dataset.id);
});

grid.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('property-card')) {
    e.preventDefault();
    openModal(e.target.dataset.id);
  }
});

modal.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) {
    const propertyLink = e.target.closest('[data-property]');
    closeModal();
    if (propertyLink) {
      const propertySelect = document.getElementById('property');
      const name = propertyLink.dataset.property;
      const optionExists = Array.from(propertySelect.options).some(o => o.value === name);
      if (optionExists) propertySelect.value = name;
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

/* ---------------------------------------------------------
   Contact form → backend API
--------------------------------------------------------- */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

function setStatus(state, message){
  formStatus.textContent = message;
  formStatus.dataset.state = state;
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    property: form.property.value,
    message: form.message.value.trim()
  };

  if (!data.name || !data.message) {
    setStatus('error', 'Please fill in your name and message.');
    return;
  }
  if (!isValidEmail(data.email)) {
    setStatus('error', 'Please enter a valid email address.');
    return;
  }

  submitBtn.disabled = true;
  const originalLabel = submitBtn.textContent;
  submitBtn.textContent = 'Sending…';
  setStatus('loading', 'Sending your inquiry…');

  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (response.ok && result && result.success) {
      setStatus('success', 'Thank you. Your inquiry has been sent successfully.');
      form.reset();
    } else {
      setStatus('error', (result && result.message) || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    setStatus('error', 'Unable to connect to the server. Please start the backend, or try again later.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});
