# AUREVIA — Project Memory

This file is a context handoff for any AI or human developer continuing work on this project. Read it before making changes.

## 1. Project Identity

- **Project name:** AUREVIA — Exceptional Residences
- **Project type:** Static marketing/portfolio website for a real-estate studio (HTML + CSS + vanilla JS frontend), with a contact form that expects a separate backend API.
- **Main purpose:** Showcase a curated portfolio of properties and new developments, present the studio's services/story, and capture leads via a contact form.
- **Current development status:** Frontend is functionally complete for the pages/sections present. The contact form is wired to call a backend endpoint (`POST /api/contact`) at `http://localhost:5000`, but **no backend code was provided/uploaded** — the API is only inferable from the frontend `fetch` call.

## 2. Existing Files

- **`index.html`** — The single-page site markup: navbar + mobile menu, hero, intro strip, dark "showcase" panel, properties section (grid container + modal shell), services, about, featured projects, testimonials, contact section + form, and footer. Property cards themselves are NOT hardcoded here — the grid container (`#propertyGrid`) is empty and populated by `main.js`.
- **`style.css`** — All visual styling: CSS custom properties (`:root`), global resets, and per-section rules, plus all responsive media queries. No CSS framework is used; everything is hand-written.
- **`main.js`** — All interactivity: current-year footer stamp, mobile nav toggle, navbar scroll-state class, scroll-reveal via `IntersectionObserver`, the `PROPERTIES` data array and card renderer, the property detail modal, and the contact form's client-side validation + API submission logic.

## 3. Design Memory

- **Color palette (CSS variables):** `--black #0A0908`, `--charcoal #16130F`, `--brown #2B2016`, `--ivory #F4EEE1`, `--beige #E9DCC6`, `--gold #B98D4F`, `--gold-soft #D8B685`, `--text-light #F4EEE1`, `--text-light-70 rgba(244,238,225,0.7)`, `--text-dark #1E1A15`, `--text-dark-60 rgba(30,26,21,0.62)`, `--line-dark rgba(244,238,225,0.16)`, `--line-light rgba(30,26,21,0.14)`.
- **Typography:** Display headings use `--font-display: "Fraunces", Georgia, serif`; body/UI text uses `--font-body: "Manrope", -apple-system, BlinkMacSystemFont, sans-serif`. Both are loaded from Google Fonts in `index.html`'s `<head>`. The hero's big cut-out wordmark uses `'Montserrat', sans-serif` (declared in CSS only — **not** linked in `<head>`, so it currently relies on a system fallback).
- **Design style:** Editorial/premium real-estate — full-bleed photography, serif display headlines, muted gold accent, warm neutral palette, pill-shaped buttons/navbar.
- **Layout style:** Full-width sections alternating light (ivory/beige) and dark (black/charcoal/brown) backgrounds; shared `--container: min(1600px, 92vw)` max width; shared radii `--radius-lg: 22px` and `--radius-md: 14px`.
- **Important visual rules:** Reduced-motion is respected both in CSS and JS (see `main.js`'s `prefersReducedMotion` check). All grids follow a consistent collapse pattern: 3 → 2 columns at `1100px`, then → 1 column at `640px`. The `.reveal` / `.js-hidden` / `.js-visible` class trio is the single mechanism used for all scroll-reveal animation.

## 4. Page Sections (in DOM order, from `index.html`)

1. **Navbar** (`#navbar`) — logo/wordmark, primary nav (About, Properties, Services, Projects, Contact), ghost "Contact" button, hamburger toggle, mobile menu panel.
2. **Hero** (`#top`) — full-bleed background photo, SVG-masked cut-out "AUREVIA" wordmark, eyebrow/subhead/description/CTA, scroll indicator.
3. **Intro strip** (`#intro`) — single centered editorial sentence about the studio's 18 years.
4. **Showcase** — featured residence ("The Ellery House") with image, description, a 6-item spec list, a "View Residence" link, a curved SVG divider, and a floating stat card ("41% Average energy savings").
5. **Properties** (`#properties`) — section head + `#propertyGrid` (populated by JS) + the property detail `#propertyModal`.
6. **Services** (`#services`) — 6 numbered service cards.
7. **About** (`#about`) — studio narrative + 4-item stat grid.
8. **Featured Projects** (`#projects`) — 3 development project cards.
9. **Testimonials** — 3 client quote cards.
10. **Contact** (`#contact`) — contact info list + contact form.
11. **Footer** — brand blurb, Navigate links, Contact links/address, copyright + credit line.

## 5. Content Memory

- **Site title:** "AUREVIA — Exceptional Residences"
- **Meta description:** "AUREVIA is a premium real-estate studio curating architecturally significant residences, private estates and investment properties."
- **Navigation labels:** About, Properties, Services, Projects, Contact (identical in the desktop nav, mobile menu, and footer "Navigate" column).
- **Hero content:** Eyebrow "The world of"; subhead "Exceptional Living"; description "Discover thoughtfully designed residences where architecture, comfort and contemporary living come together."; CTA "Explore Properties".
- **Intro strip text:** "For eighteen years, AUREVIA has represented residences defined by material honesty and architectural clarity — homes built to be lived in, not merely photographed."
- **Showcase (featured residence):** "The Ellery House" — eyebrow "Featured residence", tag "Designed for modern living", description about board-formed concrete and glass, specs: 4 Bedrooms, 5 Bathrooms, 4,200 sq.ft., Private Garden, Infinity Pool, Smart Home.
- **Property names (from the `PROPERTIES` array in `main.js`):** The Oak Residence, Birchwood Loft, Harbour View Villa, Linden Court, Meridian Penthouse, Orchard Cottage (full field-by-field detail in the JavaScript Memory section below).
- **Services (6):** Property Buying, Property Selling, Luxury Rentals, Investment Consulting, Property Management, Architecture & Design Advisory — each with its own one-line description.
- **About copy:** Founding story ("AUREVIA began in 2008 as a two-person practice…") and mission statement; stats: 18+ Years Experience, 260+ Properties Delivered, 190+ Happy Clients, 12 Cities Represented.
- **Featured project names:** Ridgeline Terraces (Lake District, under construction, completing 2027, 14 terraced residences), Marram Dunes (Coastal Bluffs, move-in ready, 8 homes), Kestrel Yards (Old Mill District, reserving now, 22 converted warehouse lofts).
- **Testimonials:** R. Whitfield (The Ellery House), M. Solano (Marram Dunes), J. Okonkwo (Investment Client) — exact quotes are in `index.html`.
- **Contact form fields:** Name (text, required), Email (email, required), Phone (tel, optional), Property of interest (select: General enquiry / The Ellery House / Ridgeline Terraces / Marram Dunes / Kestrel Yards), Message (textarea, required).
- **Contact details:** Email `hello@aurevia-homes.com`; Phone `+1 (800) 555-1234`; Office "140 Harbour Row, Suite 4, Port Haven"; Hours "Mon – Fri, 9:00 – 18:00".
- **Footer content:** Brand tagline "Exceptional residences, represented with care."; Navigate links (same 5 nav items); Contact column (email, phone, "140 Harbour Row, Port Haven"); bottom bar copyright with JS-injected current year.
- **Creator credit (exact, from `index.html`):** "Crafted by Arpita Nayak [suusriAI]"

## 6. JavaScript Memory (`main.js`)

- **Constants:** `API_BASE = 'http://localhost:5000'`; DOM references — `navToggle`, `mobileMenu`, `navbar`, `revealEls`, `grid` (`#propertyGrid`), `modal` (`#propertyModal`), `modalBody`, `form` (`#contactForm`), `submitBtn`, `formStatus`.
- **State:** `prefersReducedMotion` (boolean, from `matchMedia`); `lastFocusedEl` (tracks focus for modal accessibility).
- **Arrays:** `PROPERTIES` — 6 objects, each with `id, name, location, type, price, beds, baths, area, parking, year, image, desc, amenities[]`.
- **Functions:**
  - `closeMobileMenu()` — closes the mobile menu and resets the toggle button's ARIA state.
  - `cardTemplate(p)` — returns the HTML string for one property card.
  - `openModal(id)` — looks up a property by id, injects its detail markup into `modalBody`, shows the modal, locks body scroll, and moves focus to the close button.
  - `closeModal()` — hides the modal, restores body scroll, and returns focus to the last focused element.
  - `setStatus(state, message)` — writes the contact form's status text and `data-state` attribute (`loading` / `success` / `error`).
  - `isValidEmail(value)` — regex check (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- **Event listeners:**
  - `navToggle` click → toggles `.is-open` on the mobile menu and updates ARIA attributes.
  - Every mobile menu `<a>` click → `closeMobileMenu()`.
  - `window` scroll → toggles `.is-scrolled` on the navbar when `scrollY > 40`.
  - `grid` click → opens the modal if a `.property-card` was clicked.
  - `grid` keydown → opens the modal on `Enter`/`Space` when a card has focus.
  - `modal` click → closes the modal on any `[data-close]` element; if the closed element also carried `data-property`, pre-fills the contact form's property `<select>` if a matching option exists.
  - `document` keydown → closes the modal on `Escape` if it's open.
  - `form` submit → runs validation, then `fetch`es the contact API (see below).
- **Modal behavior:** Content is fully data-driven from `PROPERTIES`; focus is trapped only in the sense of being moved to the close button on open and restored on close (no full focus-trap/cycling implemented).
- **Form validation:** Client-side only — requires non-empty `name` and `message`, and a regex-valid `email`; `phone` and `property` are optional/not validated.
- **API requests:** See "Backend/API Memory" below.
- **Mobile navigation:** Handled entirely by `navToggle`/`mobileMenu` class toggling plus the ARIA attribute updates described above.
- **Scroll behavior:** Only the navbar's `is-scrolled` toggle is scroll-position-driven; section-to-section navigation relies on native anchor links plus `scroll-behavior: smooth` in CSS.
- **IntersectionObserver behavior:** Two separate observers exist — one for `.reveal` elements already in the DOM at load (threshold `0.15`, root margin `0px 0px -60px 0px`), and one specifically re-attached to the dynamically rendered `.property-card.reveal` elements after `grid.innerHTML` is set (threshold `0.1`, root margin `0px 0px -40px 0px`). Both unobserve each element once it has been revealed. Neither observer is created if `prefersReducedMotion` is true or `IntersectionObserver` is unsupported.

## 7. Backend/API Memory

- **HTTP method:** `POST`
- **Endpoint:** `${API_BASE}/api/contact`, i.e. `http://localhost:5000/api/contact` as currently configured.
- **Request body (JSON):**
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "property": "string",
    "message": "string"
  }
  ```
- **Expected response (JSON):** An object containing at least a `success` boolean; on success the code also checks for `result.success` truthy to show the success message and reset the form. An optional `message` string is read for custom error text (`result.message`).
- **Error handling:** If `response.ok` is false, or `result.success` is falsy, or the response body isn't valid JSON, the UI falls back to `result?.message` or a generic "Something went wrong. Please try again." message. If the `fetch` itself throws (e.g. network/CORS failure, server not running), the UI shows "Unable to connect to the server. Please start the backend, or try again later."
- **Missing backend:** **No backend server code, framework, or configuration was provided** in the uploaded files. Everything above is inferred solely from the `fetch` call in `main.js`. Any backend implementation (Node/Express or otherwise) must be built to match this contract, or the frontend contract must be updated to match an existing backend.

## 8. Future Development Context

**Already implemented (do not re-build from scratch):**
- Full page structure and all copy for every section listed above.
- Complete visual design system (colors, typography, spacing, radii) via CSS variables.
- Dynamic property rendering, property modal, and contact form UX including validation, loading/success/error states, and reduced-motion-aware scroll reveal.

**Should not be changed unnecessarily:**
- The CSS variable names/values (`--gold`, `--ivory`, etc.) — many components depend on them.
- Section `id`s (`#top`, `#intro`, `#properties`, `#services`, `#about`, `#projects`, `#contact`) since navbar/footer anchor links point to them.
- The `PROPERTIES` array's field names (`id`, `name`, `location`, `type`, `price`, `beds`, `baths`, `area`, `parking`, `year`, `image`, `desc`, `amenities`) since `cardTemplate` and `openModal` both depend on this exact shape.
- The `/api/contact` request/response contract, unless the backend is being built or changed at the same time.

**What future developers should understand before editing:**
- There is currently no backend in this project; the contact form will always fail with a connection error until a matching API is stood up (or `API_BASE` is pointed at an existing one).
- The Montserrat font used for the hero wordmark is not linked in `<head>`; if pixel-accurate rendering of that font matters, it needs to be added to the Google Fonts `<link>`.
- All images are hot-linked to Unsplash URLs — there is no local `/images` (or similar) asset folder in the current project; production use would likely want to self-host these.
- The reveal-animation system depends on two independent `IntersectionObserver` instances (static content vs. dynamically injected cards); anyone adding new dynamically-rendered `.reveal` content will need to either observe it manually or extend the existing card-specific observer.
