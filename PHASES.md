# AUREVIA — Development Phases & Roadmap

This roadmap reflects the actual current state of the uploaded `index.html`, `style.css`, and `main.js` files. Items are marked complete only where clearly present in the code.

---

## Phase 1: Project Planning and Setup

**Objective:** Establish the project's identity, structure, and toolchain.

**Tasks:**
- Define brand name, purpose, and page structure.
- Set up base HTML document, font loading, and stylesheet/script linking.

**Completed:**
- [x] Brand defined: "AUREVIA — Exceptional Residences"
- [x] `<title>` and meta description set
- [x] Google Fonts (Fraunces, Manrope) linked with `preconnect`
- [x] `css/style.css` and `js/main.js` linked from `index.html`

**Pending:**
- [ ] Backend project scaffold (no `backend/` folder or server code provided)
- [ ] Local image/asset folder (currently all images are hot-linked to Unsplash)

**Testing requirements:** N/A (setup phase).

**Expected result:** A working base HTML shell with fonts and assets correctly linked. ✅ Achieved.

---

## Phase 2: HTML Structure

**Objective:** Build the semantic page structure for every section.

**Completed:**
- [x] Navbar with brand, primary nav, CTA, and mobile toggle markup
- [x] Mobile menu markup
- [x] Hero section markup (media, SVG wordmark mask, content block, scroll indicator)
- [x] Intro strip
- [x] Showcase section (featured residence, divider SVG, stat card)
- [x] Properties section shell (`#propertyGrid` container, empty — populated by JS)
- [x] Property modal shell (`#propertyModal`, empty — populated by JS)
- [x] Services section (6 static cards)
- [x] About section (narrative + stats)
- [x] Featured Projects section (3 static cards)
- [x] Testimonials section (3 static quotes)
- [x] Contact section (info list + form)
- [x] Footer (brand, nav links, contact links, bottom bar)

**Pending:**
- [ ] None identified for the sections present in the uploaded file.

**Testing requirements:** Validate HTML structure, confirm all anchor links (`#about`, `#properties`, etc.) match existing section `id`s.

**Expected result:** Complete, semantically structured single-page markup. ✅ Achieved for all sections in the file.

---

## Phase 3: CSS Design System

**Objective:** Establish the color, typography, spacing, and component styling system.

**Completed:**
- [x] CSS custom properties defined (`:root`): colors, fonts, container width, radii, nav height
- [x] Global resets and base typography rules
- [x] `prefers-reduced-motion` handling in CSS
- [x] Button system (`.btn`, `--solid`, `--ghost`, disabled state)
- [x] Component-level styling for every section listed in Phase 2
- [x] Scroll-reveal base styles (`.reveal`, `.js-hidden`, `.js-visible`)
- [x] Full responsive breakpoint set (1900px, 1440px, 1100px, 1024px, 860px, 768px, 640px, 425px)

**Pending:**
- [ ] Linking the `Montserrat` font referenced in `.svg-text-cutout`/`.svg-text-stroke` (currently declared in CSS but not loaded via `<link>`)

**Testing requirements:** Cross-check rendered colors/fonts against `:root` variables; verify no unused or conflicting rules; confirm reduced-motion override works.

**Expected result:** A consistent, token-driven design system. ✅ Achieved, with the Montserrat font-loading gap noted above.

---

## Phase 4: Hero and Navigation

**Objective:** Implement the animated navbar and full-viewport hero.

**Completed:**
- [x] Fixed, glassmorphic navbar with scroll-based `is-scrolled` state (`main.js`)
- [x] Mobile hamburger toggle with ARIA state management and animated icon
- [x] Mobile menu open/close (including auto-close on link click)
- [x] Hero with full-bleed image, gradient/radial scrim, SVG-masked cut-out wordmark
- [x] Hero content block (eyebrow, subhead, description, CTA)
- [x] Animated scroll indicator (CSS keyframes)

**Pending:**
- [ ] None identified.

**Testing requirements:** Verify navbar scroll-state toggle at the 40px threshold; verify mobile menu opens/closes and closes on link click; verify hero wordmark legibility across breakpoints.

**Expected result:** Fully interactive hero and navigation. ✅ Achieved.

---

## Phase 5: Property Listing and Modal

**Objective:** Render property data dynamically and provide a detail view.

**Completed:**
- [x] `PROPERTIES` data array (6 properties) defined in `main.js`
- [x] `cardTemplate()` rendering into `#propertyGrid`
- [x] Card-level scroll-reveal via a dedicated `IntersectionObserver`
- [x] Keyboard-accessible cards (`tabindex`, `role="button"`, Enter/Space handling)
- [x] Property modal (`openModal`/`closeModal`) with full detail rendering (image, specs, amenities, enquire link)
- [x] Modal closes via backdrop, close button, Escape key
- [x] "Enquire about this property" pre-fills the contact form's property select

**Pending:**
- [ ] No static/no-JS fallback markup exists inside `#propertyGrid` despite the HTML comment referencing one ("Cards injected by JS from data in main.js, with a static fallback below for no-JS") — this fallback is not present in the current file.

**Testing requirements:** Verify all 6 properties render correctly; verify modal content matches the clicked card; verify keyboard operability; verify Escape-to-close; verify property pre-fill only applies when a matching `<option>` exists.

**Expected result:** A fully dynamic, accessible property browsing experience. ✅ Achieved (fallback markup gap noted).

---

## Phase 6: Services, About, Projects and Testimonials

**Objective:** Build the supporting content sections.

**Completed:**
- [x] Services section with 6 static numbered cards
- [x] About section with narrative copy and a 4-stat grid
- [x] Featured Projects section with 3 static project cards and status labels
- [x] Testimonials section with 3 static quote cards
- [x] Scroll-reveal applied to relevant elements in each section

**Pending:**
- [ ] None identified — all content in these sections is static and complete as authored.

**Testing requirements:** Visual QA per section at each breakpoint; confirm all "Enquire" links correctly anchor to `#contact`.

**Expected result:** Fully authored supporting content sections. ✅ Achieved.

---

## Phase 7: Contact Form and API Integration

**Objective:** Capture and submit lead inquiries.

**Completed:**
- [x] Contact form markup with Name, Email, Phone, Property select, Message fields
- [x] Client-side validation (required name/message, email regex)
- [x] Async submit handler with loading/success/error status messaging
- [x] `fetch` integration targeting `POST {API_BASE}/api/contact`
- [x] Graceful handling of non-JSON or failed responses
- [x] Form reset on success

**Pending:**
- [ ] **Backend implementation** — no server code was provided; `API_BASE` currently points to `http://localhost:5000`, which will not respond unless a matching backend is built and run.
- [ ] Server-side validation, spam protection, and email delivery (all backend concerns, none present in the provided files).

**Testing requirements:** Test validation failure paths (empty name/message, invalid email); test the network-failure path with no backend running; once a backend exists, test success and server-side error paths.

**Expected result:** A fully validated, API-integrated contact form. ⚠️ Frontend complete; backend integration pending.

---

## Phase 8: Responsive Design and Accessibility

**Objective:** Ensure the site works across devices and is usable with assistive technology.

**Completed:**
- [x] Responsive breakpoints at 1900px, 1440px, 1100px, 1024px, 860px, 768px, 640px, 425px
- [x] `prefers-reduced-motion` support (CSS and JS)
- [x] `:focus-visible` outline styling
- [x] ARIA attributes on navbar toggle, mobile menu, and modal (`role="dialog"`, `aria-modal`, `aria-labelledby`)
- [x] Keyboard support for property cards (Enter/Space) and modal (Escape)
- [x] Form status announced via `aria-live="polite"`
- [x] Descriptive `alt` text on all content images

**Pending:**
- [ ] No formal focus-trap/cycling inside the open modal (focus moves to the close button on open and is restored on close, but Tab does not loop within the modal)
- [ ] No skip-to-content link identified for keyboard users bypassing the navbar

**Testing requirements:** Test at 320px width and up; test with a screen reader on the modal and form status; test full keyboard-only navigation; test with reduced motion enabled.

**Expected result:** A broadly accessible, fully responsive site. ✅ Mostly achieved, with the two gaps above noted as future work.

---

## Phase 9: Testing and Bug Fixing

**Objective:** Validate the site across browsers, devices, and interaction paths.

**Pending (no automated or documented test evidence in the uploaded files):**
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS/Android)
- [ ] Console error audit
- [ ] Broken-link/anchor audit
- [ ] Form edge-case testing (very long input, special characters, rapid double-submit)
- [ ] Backend error-response handling testing (once a backend exists)

**Expected result:** A verified, bug-free experience across target environments. Status: not yet performed/documented.

---

## Phase 10: Production Readiness

**Objective:** Prepare the project for deployment.

**Pending:**
- [ ] Build/implement the backend `/api/contact` service
- [ ] Update `API_BASE` in `main.js` from `http://localhost:5000` to the production API URL
- [ ] Self-host or otherwise finalize image assets (currently Unsplash-hosted)
- [ ] Add the missing `Montserrat` font `<link>` (or replace the hero wordmark font choice)
- [ ] Minification/bundling of CSS and JS, if desired
- [ ] Final accessibility and performance audit (e.g. Lighthouse)
- [ ] Deployment configuration (hosting, domain, HTTPS)

**Expected result:** A production-deployed AUREVIA site with a working backend. Status: not yet started.
