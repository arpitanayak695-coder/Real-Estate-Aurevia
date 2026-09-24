# AUREVIA — Project Development Rules

These rules apply to any future AI or human developer working on this codebase (`index.html`, `style.css`, `main.js`, and any backend added later).

## General Rules

- Read all existing files (`index.html`, `style.css`, `main.js`, and `memory.md`) before making any change.
- Do not remove existing features (property modal, form validation, mobile menu, scroll reveal, etc.) without explicit permission.
- Do not change the design direction (premium/editorial real-estate aesthetic) unnecessarily.
- Keep code clean, readable, and maintainable — match the existing style (vanilla JS, CSS custom properties, no framework).
- Avoid duplicate code; reuse existing patterns (e.g. the `cardTemplate()` approach) for any similar new feature.

## Design Rules

- Follow the existing color palette exactly as defined in `:root` (`--black`, `--charcoal`, `--brown`, `--ivory`, `--beige`, `--gold`, `--gold-soft`, text/line variants). Do not hardcode new hex values that duplicate an existing token.
- Follow the existing typography system: Fraunces for headings/display, Manrope for body/UI text.
- Maintain the current premium visual identity (full-bleed imagery, generous spacing, restrained gold accents, pill-shaped buttons/navbar).
- Preserve spacing, layout, and component consistency — reuse `--container`, `--radius-lg`, `--radius-md`, and the established `clamp()`-based fluid spacing pattern for any new section.
- Maintain image quality and aspect ratios (property cards `4/3`, project cards `4/3`, showcase `5/6`, modal image `16/9`) for any new imagery.
- Keep hover effects subtle and professional — small lifts/scale/opacity changes, consistent with existing timing (`0.25s`–`0.5s` ease transitions).

## HTML Rules

- Use semantic HTML (the project already uses `header`, `nav`, `section`, `article`, `footer`, `form`) — continue this pattern for new markup.
- Maintain accessible labels: keep `aria-label`, `aria-expanded`, `aria-modal`, `aria-labelledby`, and `role` attributes on interactive/dynamic elements.
- Preserve existing section `id`s (`#top`, `#intro`, `#properties`, `#services`, `#about`, `#projects`, `#contact`) since navigation and footer links depend on them.
- Do not break navigation links — any renamed or removed section `id` must be updated everywhere it is referenced (navbar, mobile menu, footer, CTAs).
- Keep the document structure clean and in the existing section order unless a change is explicitly requested.

## CSS Rules

- Reuse existing CSS custom properties rather than introducing new literal values for colors, radii, or the shared container width.
- Avoid unnecessary inline styles (the project currently has exactly one inline style, on the modal's dynamically generated "Amenities" heading — don't expand this pattern; prefer classes).
- Maintain responsive behavior — any new grid/section should follow the existing collapse pattern (3 → 2 columns at `1100px`, 2 → 1 at `640px`, unless there's a specific reason to diverge).
- Prevent horizontal overflow — the project explicitly sets `overflow-x: hidden` on `html`/`body`; avoid introducing elements that exceed viewport width.
- Follow the project's existing convention of writing desktop-first CSS with `max-width` media queries (this codebase is not mobile-first) — stay consistent with what's already there.
- Do not introduce random colors or fonts outside the established `--font-display`/`--font-body` and the documented color tokens.

## JavaScript Rules

- Preserve existing functionality (mobile menu, navbar scroll state, scroll reveal, property rendering, modal, contact form) unless a change is explicitly requested.
- Use safe DOM handling — check that elements exist before operating on them, following the existing style (e.g. `if (!p) return;` in `openModal`).
- Maintain all existing event listeners; when adding new interactive elements, follow the existing pattern of delegated listeners on parent containers (e.g. the `grid` click/keydown handlers) rather than one listener per element where practical.
- Do not break the property modal — any changes to the `PROPERTIES` data shape must be reflected in both `cardTemplate()` and `openModal()`.
- Do not break contact form submission — preserve the validation-before-fetch order, the loading/success/error status flow, and the `API_BASE` configurability.
- Keep API handling clear — if the endpoint, request shape, or response contract changes, update `memory.md` and `PRD.md` accordingly.
- Support keyboard interaction and Escape-key behavior wherever already implemented (property cards, modal) — do not remove these without an accessibility review.

## Responsive Rules

- Test mobile, tablet, laptop, and desktop viewports for any change.
- Ensure the site works at 320px width and larger screens without breaking layout.
- Avoid introducing horizontal scrolling at any breakpoint.
- Preserve touch-friendly control sizes (buttons, the hamburger toggle, form fields) — do not shrink tap targets below the current sizing.

## Accessibility Rules

- Use meaningful labels on all interactive elements (buttons, links, form fields).
- Maintain full keyboard accessibility for the property cards and modal (Tab/Enter/Space/Escape).
- Preserve `:focus-visible` states — do not remove focus outlines without providing an equivalent visible alternative.
- Respect `prefers-reduced-motion` in both CSS and JavaScript for any new animation.
- Use appropriate native elements for interactive controls (`<button>`, `<select>`, `<input>`, `<textarea>`, `<a>`) rather than reimplementing them with generic `<div>`s.

## Testing Rules

Before merging or shipping any change, verify:

- [ ] The site opens correctly via direct browser file opening (`file://`)
- [ ] The site works correctly under VS Code Live Server (or an equivalent local dev server)
- [ ] Mobile layout renders correctly (≤425px, ≤640px, ≤768px, ≤860px)
- [ ] All navbar and footer navigation links scroll to the correct section
- [ ] The property modal opens/closes correctly via click, keyboard, and Escape, for every property
- [ ] The contact form validates correctly (empty name/message, invalid email) before allowing submission
- [ ] The contact form's behavior is verified with the backend unavailable (network-failure path) and, once a backend exists, with success and error responses
- [ ] No errors appear in the browser console
- [ ] All documented responsive breakpoints (1900px, 1440px, 1100px, 1024px, 860px, 768px, 640px, 425px) have been checked

## Change Management Rules

- Any change to shared design tokens (`:root` variables) should be reviewed against every section that consumes them, since the palette and spacing system are reused site-wide.
- Any change to the `PROPERTIES` array's structure, the contact form's field names, or the `/api/contact` contract must be reflected in `memory.md` and `PRD.md` in the same change.
- When modifying or adding a file, report exactly which file(s) were changed and which features were affected, so `memory.md` can be kept in sync.
- Do not silently change the backend contract (`API_BASE`, endpoint path, request/response shape) — document any such change clearly, since the current frontend and any future backend must agree on it.
- New features should be additive where possible; avoid rewriting existing, working sections unless the rewrite is the explicit goal of the task.
