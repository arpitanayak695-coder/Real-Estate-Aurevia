# AUREVIA — Product Requirements Document (PRD)

## 1. Product Overview

- **Product name:** AUREVIA — Exceptional Residences
- **Product summary:** A single-page marketing and lead-generation website for a real-estate studio, presenting a curated property portfolio, studio services, brand story, upcoming developments, testimonials, and a contact form.
- **Website purpose:** Attract and convert prospective buyers, sellers, renters, and investors by showcasing architecturally significant properties and directing interested visitors to a contact form.
- **Problem it solves:** Gives a boutique real-estate studio a premium, editorial-quality online presence that differentiates it from generic listings sites, and provides a structured way for visitors to browse properties and submit inquiries.

## 2. Goals and Objectives

- Present the AUREVIA brand with a premium, trustworthy visual identity.
- Allow visitors to browse a curated set of properties without leaving the page (client-side rendering + modal detail view).
- Communicate the studio's service offering, credibility (stats, testimonials), and current development pipeline.
- Capture qualified leads through a validated contact form tied to a backend API.

## 3. Target Users

- Prospective home buyers seeking architecturally distinctive residences.
- Homeowners considering selling through a boutique studio.
- Renters interested in luxury/managed rental properties.
- Investors evaluating property or portfolio opportunities.
- Visitors interested in new development projects (pre-completion or newly available).

## 4. User Personas

- **The Discerning Buyer** — wants to browse a small number of high-quality, well-described properties rather than a large generic listings database; values photography and detail (specs, amenities).
- **The Prospective Seller** — wants reassurance of the studio's credibility (experience stats, testimonials) before reaching out.
- **The Investor** — interested in the "Investment Consulting" service and the "Featured Projects" pipeline; likely to use the general contact form.
- **The Renter** — interested in the "Luxury Rentals" service line, browsing available properties similarly to a buyer.

## 5. User Journeys

Based strictly on the interactions implemented in `main.js`/`index.html`:

1. **Visiting the homepage:** User lands on the full-viewport hero, sees the brand wordmark and primary CTA ("Explore Properties"), and can scroll or use the sticky navbar to jump to any section.
2. **Exploring properties:** User scrolls to (or clicks "Properties" in the nav to jump to) the "Discover Your Next Home" section, where six property cards are rendered dynamically from the `PROPERTIES` array, each revealing on scroll.
3. **Opening property details:** User clicks (or focuses + presses Enter/Space on) a property card, which opens a modal populated with that property's image, full spec list, description, and amenities.
4. **Selecting a property:** From within the modal, the user can click "Enquire about this property," which closes the modal and pre-fills the contact form's "Property of interest" dropdown with that property's name (if a matching option exists in the `<select>`).
5. **Filling out the contact form:** User completes Name, Email, optional Phone, optional Property of interest, and Message in the Contact section.
6. **Submitting an inquiry:** On submit, client-side validation runs (required name/message, valid email format). If valid, the button shows a "Sending…" state and a status message announces the request is in progress; on success the form resets and a success message is shown; on failure (validation, server error, or network failure) an appropriate error message is shown instead.
7. **Using the mobile navigation:** On narrow viewports, the user opens the hamburger menu to reveal a stacked navigation list and a "Contact us" button; selecting any link automatically closes the menu.

## 6. Functional Requirements

| Feature | Description | Source |
|---|---|---|
| Sticky/scroll-aware navigation | Fixed navbar that darkens after 40px of scroll | `main.js` scroll listener, `.navbar.is-scrolled` in CSS |
| Smooth scrolling | Anchor-link navigation with smooth scroll behavior | `html { scroll-behavior: smooth }` in CSS |
| Hero CTA | "Explore Properties" button linking to `#properties` | `index.html` hero markup |
| Mobile navigation | Hamburger-triggered slide-down menu with auto-close on link click | `main.js` `navToggle`/`mobileMenu` logic |
| Dynamic property rendering | 6 properties rendered client-side from a JS data array | `PROPERTIES` array + `cardTemplate()` in `main.js` |
| Property cards | Clickable/keyboard-accessible cards with image, price, location, meta, description, CTA | `cardTemplate()`, CSS `.property-card` |
| Property modal | Full-detail popup per property (image, specs, amenities, enquire link) | `openModal()`/`closeModal()` in `main.js` |
| Property-to-form linking | Selecting "Enquire" from the modal pre-fills the contact form's property dropdown | `modal` click handler in `main.js` |
| Contact form | Name/Email/Phone/Property/Message fields | `index.html` `#contactForm` |
| Form validation | Required name & message; email format check | `isValidEmail()`, submit handler in `main.js` |
| API request | `POST` to `{API_BASE}/api/contact` with JSON body | `main.js` `fetch` call |
| Form status feedback | Loading/success/error state text with `aria-live` announcement | `setStatus()`, `#formStatus` |
| Scroll reveal animations | Fade/slide-in for sections and property cards as they enter the viewport | `IntersectionObserver` usage in `main.js`, `.reveal` classes in CSS |
| Reduced-motion support | Skips reveal observers and shortens transitions when the OS preference is set | `prefersReducedMotion` check in `main.js`; `@media (prefers-reduced-motion: reduce)` in CSS |
| Dynamic footer year | Current year injected into the copyright line | `document.getElementById('year')` in `main.js` |

## 7. Non-Functional Requirements

- **Responsiveness:** The layout adapts across 8 documented breakpoints (from `425px` up through `1900px`); grids collapse from 3 → 2 → 1 columns as width decreases.
- **Accessibility:** Semantic landmarks (`header`, `nav`, `section`, `footer`), ARIA attributes on the navbar toggle and modal (`role="dialog"`, `aria-modal`, `aria-labelledby`), keyboard operability for property cards and the modal, `:focus-visible` styling, and an `aria-live` region for form status.
- **Performance:** Hero image uses `loading="eager"`; all other content images use `loading="lazy"`. No JS frameworks/bundlers are used — the site is plain HTML/CSS/JS with no build step required.
- **Browser compatibility:** Relies on modern browser features — `IntersectionObserver`, `backdrop-filter`, CSS `clamp()`, `prefers-reduced-motion` media queries, and the Fetch API. No polyfills are included.
- **Maintainability:** Centralized design tokens via CSS custom properties; property data centralized in a single `PROPERTIES` array rather than duplicated markup.
- **Usability:** Consistent card/section patterns, animated but subtle feedback on interactive elements, clear form status messaging.
- **Reduced-motion support:** Explicitly implemented in both CSS and JS, as noted above.

## 8. Technical Requirements

- **HTML:** `index.html` — semantic single-page structure.
- **CSS:** `style.css` — custom-property-driven design system, no external CSS framework.
- **JavaScript:** `main.js` — vanilla JS (no frameworks/libraries), ES6+ syntax (arrow functions, template literals, `const`/`let`).
- **External fonts:** Google Fonts — Fraunces (weights 300/400/500/600) and Manrope (weights 300/400/500/600/700), loaded via `<link>` in `<head>`. Note: `Montserrat` is referenced in CSS for the hero wordmark but is **not** linked in `<head>`.
- **Image sources:** All property, showcase, and project images are hot-linked from Unsplash (`images.unsplash.com`) with query-string sizing parameters; no local image assets are present.
- **API dependency:** A backend service exposing `POST /api/contact` is required for the contact form to function; none is included in the uploaded files.
- **Required folder structure (as referenced by `index.html`):** `css/style.css` and `js/main.js` relative to `index.html`.

## 9. Data Requirements

**Property data structure** (from the `PROPERTIES` array in `main.js`):
```js
{
  id: 'string-slug',
  name: 'string',
  location: 'string',
  type: 'string',
  price: 'string (formatted, e.g. "$1,480,000")',
  beds: number,
  baths: number,
  area: 'string (e.g. "4,200 sq.ft.")',
  parking: number,
  year: number,
  image: 'string (URL)',
  desc: 'string',
  amenities: ['string', ...]
}
```

**Contact form data structure** (as sent to the API):
```js
{
  name: 'string',
  email: 'string',
  phone: 'string',
  property: 'string (selected option value, may be empty)',
  message: 'string'
}
```

## 10. API Requirements

- **Endpoint:** `POST http://localhost:5000/api/contact` (configurable via the `API_BASE` constant in `main.js`)
- **Request:** JSON body matching the contact form data structure above, sent with header `Content-Type: application/json`.
- **Success response:** JSON object with a truthy `success` field; the form is reset and a success message is shown.
- **Error response:** JSON object where `success` is falsy and an optional `message` string provides a custom error to display; if the response is not valid JSON or the network request fails, a generic connection error message is shown instead.
- **Status:** No backend implementing this contract was provided in the uploaded files — it must be built or an existing service must be pointed to via `API_BASE`.

## 11. Acceptance Criteria

- **Navigation:** Given the user is on any part of the page, when they click a nav link, then the page scrolls smoothly to the corresponding section.
- **Mobile menu:** Given the viewport is ≤860px, when the hamburger is tapped, then the mobile menu opens; when a link inside it is tapped, then the menu closes and the page navigates to that section.
- **Property browsing:** Given the page has loaded, when the user views the Properties section, then exactly 6 property cards are rendered with correct data from the `PROPERTIES` array.
- **Property modal:** Given a property card is clicked or activated via keyboard, when the modal opens, then it displays that property's image, name, location, description, full spec list, and amenities; when Escape is pressed or a close control is used, the modal closes.
- **Form pre-fill:** Given the "Enquire about this property" link is used from the modal, when the modal closes, then the contact form's property dropdown is set to that property's name if a matching option exists.
- **Form validation:** Given the contact form is submitted with an empty name or message, then an error status is shown and no network request is made; given an invalid email format, then an email-specific error status is shown.
- **Form submission (success path):** Given valid input and a reachable backend returning `{ success: true }`, then a success message is shown and the form fields are cleared.
- **Form submission (failure path):** Given valid input but a network failure or a non-success API response, then an appropriate error message is shown and the form fields are preserved.
- **Reduced motion:** Given the OS "reduce motion" preference is enabled, then scroll-reveal animations do not run and content is visible immediately.

## 12. Future Scope

The following are reasonable potential improvements — they are **not** implemented in the current code and are noted here only as future scope:

- Building the backend `/api/contact` service (email delivery, storage, spam protection, server-side validation).
- Self-hosting property/project images instead of relying on external Unsplash URLs.
- Adding a static/no-JS fallback for the property grid (a comment in `index.html` references this, but no fallback markup currently exists).
- Full keyboard focus-trapping within the open property modal.
- A skip-to-content link for keyboard/screen-reader users.
- Search/filter functionality for the property grid (e.g. by price, location, or type).
- Pagination or "load more" if the property catalog grows beyond the current 6 entries.
- Linking the `Montserrat` font referenced in the hero wordmark CSS.
