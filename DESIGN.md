# AUREVIA — Design Documentation

## 1. Brand and Visual Identity

- **Project name:** AUREVIA — Exceptional Residences
- **Website purpose:** Marketing/portfolio site for a real-estate studio that represents architecturally significant residences, private estates, and investment properties.
- **Meta description (as written in the code):** "AUREVIA is a premium real-estate studio curating architecturally significant residences, private estates and investment properties."
- **Design concept:** An editorial, magazine-style real-estate showcase. Full-bleed photography, a large cut-out hero wordmark, dark "showcase" panels contrasted against warm ivory sections, and restrained gold accenting.
- **Overall visual mood:** Quiet luxury — warm neutrals (ivory, beige, brown, charcoal) paired with a muted gold accent, serif display type, and generous whitespace.
- **Target audience:** Prospective home buyers/sellers, renters, and investors interested in premium/architecturally distinctive residences.
- **Brand personality:** Discreet, editorial, confident, understated — positioned as knowledgeable about "the buildings themselves, not just the listings" (per the About and Testimonials copy).
- **Design direction:** Premium/luxury real-estate branding — dark charcoal/brown gradients, serif headline type (Fraunces), pill-shaped buttons and navbar, soft gold highlight color.

## 2. Color System

All colors are defined as CSS custom properties on `:root` in `style.css`.

| Variable | Value | Role |
|---|---|---|
| `--black` | `#0A0908` | Primary dark background (hero fallback, projects section, footer, navbar glass tint) |
| `--charcoal` | `#16130F` | Secondary dark background (showcase gradient midpoint, project card background) |
| `--brown` | `#2B2016` | Tertiary dark background (showcase gradient end, contact section background) |
| `--ivory` | `#F4EEE1` | Primary light background (body background, properties/services/testimonials sections, modal panel) |
| `--beige` | `#E9DCC6` | Secondary light background (About section, testimonial quote background) |
| `--gold` | `#B98D4F` | Primary accent (solid button background, eyebrow text, price/CTA highlights, stat numbers) |
| `--gold-soft` | `#D8B685` | Secondary/hover accent (button hover, nav underline, footer link headings, project status text) |
| `--text-light` | `#F4EEE1` | Text on dark backgrounds |
| `--text-light-70` | `rgba(244,238,225,0.7)` | Muted text on dark backgrounds |
| `--text-dark` | `#1E1A15` | Body text on light backgrounds |
| `--text-dark-60` | `rgba(30,26,21,0.62)` | Muted text on light backgrounds (descriptions, meta text) |
| `--line-dark` | `rgba(244,238,225,0.16)` | Hairline borders/dividers on dark backgrounds |
| `--line-light` | `rgba(30,26,21,0.14)` | Hairline borders/dividers on light backgrounds |

**Contextual/inline colors** (not tokenized as variables, found directly in rules):
- Form status success: `#B7D6A8`
- Form status error: `#E39B9B`
- Overlay/scrim on hero: `rgba(6,5,4,0.66)` → `rgba(6,5,4,0.94)` gradient, plus a radial `rgba(6,5,4,0.35)` vignette
- Modal backdrop: `rgba(10,9,8,0.72)`
- Navbar glass background: `rgba(10,9,8,0.35)` default, `rgba(10,9,8,0.55)` when `.is-scrolled`
- Card shadow tones derived from `rgba(30,26,21, …)` and `rgba(0,0,0, …)`

## 3. Typography

- **Display font:** `"Fraunces", Georgia, serif` — used for all headings (`h1`, `h2`, `h3`), the navbar wordmark, property card names, stat numbers, and the showcase title. Weight 500 is the default heading weight; the Google Fonts import also loads weights 300, 400, and 600 for the variable Fraunces axis.
- **Body font:** `"Manrope", -apple-system, BlinkMacSystemFont, sans-serif` — used for body copy, navigation, buttons, form fields, and captions. Weights loaded: 300, 400, 500, 600, 700.
- **Hero wordmark font:** The large cut-out "AUREVIA" text inside the hero SVG (`.svg-text-cutout` / `.svg-text-stroke`) is set in `'Montserrat', sans-serif` at `font-weight: 900`, `letter-spacing: 5px`, `font-size: 210px` (scaled down at smaller breakpoints). Note: Montserrat is not linked via `<link>` in the `<head>`, so it will fall back to the browser's default sans-serif unless the font is available on the system.
- **Heading defaults:** `font-weight: 500`, `line-height: 1.08`, `letter-spacing: -0.01em` (set globally on `h1, h2, h3`).
- **Section eyebrow labels:** Small Manrope text (`0.9rem`) colored `--gold`, used above section headings (e.g. "About AUREVIA", "Get in touch").
- **Responsive typography:** Most headings use CSS `clamp()` for fluid scaling, e.g. section heads `clamp(2rem, 4vw, 2.8rem)`, showcase title `clamp(2rem, 4vw, 3.2rem)`, about/contact headings `clamp(1.9rem, 3.4–3.6vw, 2.6rem)`, hero subhead `clamp(1.6rem, 3vw, 2.4rem)`. The hero wordmark SVG text steps down explicitly at `1440px`, `1024px`, `768px`, and `425px` breakpoints (210px → 130px → 100px → 75px → 150px, the last jump intentionally larger for very small screens per the code). Body font size increases slightly (`1.05rem`) above `1900px` viewport width.
- **Letter spacing/transform:** Navbar wordmark uses `letter-spacing: 0.06em`; footer section labels use `letter-spacing: 0.04em`. No explicit `text-transform: uppercase` rules were found in the CSS (all-caps appearance where present, e.g. "AUREVIA" wordmark, comes from the literal text content, not a CSS transform).

## 4. Layout and Structure

- **Overall page layout:** A single-page, vertically-stacked layout (`index.html`) composed of a fixed navbar over a full-viewport hero, followed by alternating light (ivory/beige) and dark (black/charcoal/brown) full-width sections, ending in a footer.
- **Navbar:** Fixed, pill-shaped, floating "glass" bar (`backdrop-filter: blur(14px) saturate(140%)`) centered within `--container` (`min(1600px, 92vw)`) with `border-radius: 999px`. Height is set by `--nav-h: 84px`. It solidifies (`is-scrolled` class, applied via `main.js`'s scroll listener) to a darker background after 40px of scroll.
- **Hero:** Full-viewport (`min-height: 100vh`) section with a full-bleed background photo, a dark scrim/vignette overlay, an SVG-masked large cut-out "AUREVIA" wordmark, and a content block (eyebrow, subhead, description, CTA button) anchored to the bottom-left. A "Scroll" indicator with an animated falling line sits bottom-right (hidden on narrow screens).
- **Main sections (in DOM order):** Navbar → Hero → Intro strip → Showcase (featured residence) → Properties (grid + modal) → Services → About → Featured Projects → Testimonials → Contact → Footer.
- **Grid/flex layouts:** CSS Grid is used for the showcase (2-column), property grid (3-column), services grid (3-column bordered mosaic), about grid (2-column), projects grid (3-column), testimonials track (3-column), contact grid (2-column: info + form), footer grid (3-column), and the contact form itself (2-column field grid). Flexbox is used for the navbar, buttons, stat blocks, and card internals.
- **Spacing system:** Section vertical padding is almost entirely fluid via `clamp()` (e.g. `clamp(60px,8vw,110px)`, `clamp(80px,10vw,140px)`), so spacing scales smoothly between breakpoints rather than jumping at fixed steps.
- **Container widths:** A single shared container variable, `--container: min(1600px, 92vw)`, is reused across every section's inner wrapper for consistent max width and side gutters.
- **Border radius:** Two shared radii — `--radius-lg: 22px` (cards, modal panel, showcase image, project cards, services grid) and `--radius-md: 14px` (mobile menu panel, stat card, testimonial quote cards). Buttons and the navbar use fully round `border-radius: 999px`.
- **Shadows:** Soft, large-blur drop shadows are used on interactive/elevated elements — property cards (`0 10px 30px -18px …` at rest, deeper on hover), the floating stat card, and the modal panel (`0 40px 90px -20px rgba(0,0,0,0.5)`).
- **Image treatment:** All content images use `object-fit: cover` inside fixed-aspect-ratio containers (property cards `4/3`, project cards `4/3`, showcase media `5/6`, modal image `16/9`), so imagery is consistently cropped rather than distorted. All images are sourced from Unsplash via direct URLs (no local `/images` assets referenced).
- **Responsive behavior:** Multi-column grids collapse in stages — 3 columns → 2 columns at `1100px`, then → 1 column at `640px` (see Responsive Design section below for the full breakdown).

## 5. Components

### Navigation bar (`.navbar`)
- **Purpose:** Primary site navigation and brand identity, always accessible while scrolling.
- **Appearance:** Floating glass pill containing a logo mark (inline SVG house icon) + "AUREVIA" wordmark, a horizontal link list (About, Properties, Services, Projects, Contact), a "Contact" ghost button, and a hamburger toggle (hidden above 860px).
- **Interaction:** Nav links use an animated underline that sweeps in from the left on hover (`::after` transition). The bar's background darkens/solidifies once the page is scrolled more than 40px (`is-scrolled` class toggled in `main.js`).
- **Responsive behavior:** Below `860px`, the horizontal nav links and the ghost "Contact" button are hidden and replaced by the hamburger toggle.

### Mobile menu (`.mobile-menu`)
- **Purpose:** Off-canvas-style dropdown navigation for small screens.
- **Appearance:** Dark, blurred panel that expands below the navbar, containing the same links plus a solid "Contact us" button.
- **Interaction:** Toggled open/closed by the hamburger button (`navToggle`), animated via a `max-height` transition (`0` → `420px`). The hamburger's three bars morph into an "X" using rotate/opacity transforms driven by the `aria-expanded` attribute. Clicking any link inside the menu closes it (`closeMobileMenu`, bound to every `<a>` in `main.js`).
- **Responsive behavior:** Only rendered/relevant at ≤860px; hidden entirely above that breakpoint since the horizontal nav is shown instead.

### Buttons (`.btn`, `.btn--solid`, `.btn--ghost`)
- **Purpose:** Primary and secondary calls to action across the site (hero CTA, nav contact, mobile menu, modal "Enquire", form submit).
- **Appearance:** Fully rounded (pill) buttons. `--solid` uses the gold background with black text; `--ghost` uses a translucent light fill with a hairline border, used on dark backgrounds (navbar).
- **Interaction:** Lift slightly on hover (`translateY(-2px)`); solid buttons lighten to `--gold-soft` on hover; ghost buttons brighten their translucent fill. Disabled state reduces opacity and removes the hover lift (used while the contact form is submitting).

### Hero section (`.hero`)
- **Purpose:** First-impression, full-screen brand statement with a primary CTA into the property listings.
- **Appearance:** Full-bleed dusk photo of a residence, dark gradient/radial scrim, a large SVG-masked cut-out "AUREVIA" wordmark centered over the image, and a bottom-left text block (eyebrow "The world of", subhead "Exceptional Living", description, "Explore Properties" button).
- **Interaction:** A bottom-right "Scroll" indicator has a thin vertical line with a small highlight that animates downward on an infinite loop (`scrollDrop` keyframes), hidden below `640px`.
- **Responsive behavior:** The hero becomes a `4/5` aspect ratio (rather than full `100vh`) at ≤768px; the wordmark font size steps down at four breakpoints; below `425px` the content block re-centers, moves to the bottom, and switches to centered text.

### Property cards (`.property-card`)
- **Purpose:** Summarized, clickable preview of each listed property inside the "Discover Your Next Home" grid.
- **Appearance:** White rounded card with a `4/3` cover image, a price pill overlaid top-left, and a body containing location, name (Fraunces), a beds/baths/area meta line, a short description, and a "View Property →" text CTA.
- **Interaction:** On hover/focus, the whole card lifts (`translateY(-8px)`), its shadow deepens, the image zooms slightly (`scale(1.06)`), a dark gradient overlay fades in over the image, and the CTA's icon gap widens. Cards are keyboard-focusable (`tabindex="0"`, `role="button"`) and open the property modal on `Enter`/`Space` as well as click.
- **Responsive behavior:** 3 columns → 2 columns at `1100px` → 1 column at `640px`.

### Property modal (`.modal`)
- **Purpose:** Full property detail view (image, specs, amenities, and an "Enquire" link) opened from a property card.
- **Appearance:** Centered ivory panel over a blurred dark backdrop, with a circular close button, a `16/9` hero image, and a body listing location, name, description, a wrapped row of spec pills (type, beds, baths, area, parking, year built, price), and a bulleted amenities list.
- **Interaction:** Opens via `openModal(id)` (populates `modalBody` from the `PROPERTIES` array), closes via the backdrop, the close button, any `[data-close]` element, or the `Escape` key. Closing via the "Enquire about this property" link also pre-fills the contact form's "Property of interest" `<select>` if a matching option exists. Focus is moved to the close button on open and restored to the previously focused element on close (basic focus management).
- **Responsive behavior:** Panel is capped at `780px` wide and `86vh` tall with internal scrolling; horizontal padding scales fluidly at small sizes via `clamp()`.

### Services section (`.services`)
- **Purpose:** Presents the studio's six service lines.
- **Appearance:** A 3-column bordered "mosaic" grid (thin shared borders via a background-color grid-gap trick) of six numbered cards (01–06): Property Buying, Property Selling, Luxury Rentals, Investment Consulting, Property Management, Architecture & Design Advisory.
- **Interaction:** Each card's background brightens to white on hover.
- **Responsive behavior:** 3 columns → 2 columns at `1100px` → 1 column at `640px`.

### About section (`.about`)
- **Purpose:** Studio background/credibility copy paired with key stats.
- **Appearance:** Beige background, 2-column layout — narrative copy (founding story, mission) on the left, a 2×2 stat grid (18+ Years Experience, 260+ Properties Delivered, 190+ Happy Clients, 12 Cities Represented) on the right.
- **Responsive behavior:** Collapses to a single column at ≤1100px; the stat grid remains 2 columns down to `640px`.

### Featured Projects (`.projects`)
- **Purpose:** Showcases upcoming/new developments distinct from the resale property listings.
- **Appearance:** Black-background section with 3 dark project cards (Ridgeline Terraces, Marram Dunes, Kestrel Yards), each with a `4/3` image, a status label (Under construction / Move-in ready / Reserving now), a title, a short description, and an "Enquire" link-arrow that jumps to the contact form.
- **Responsive behavior:** 3 columns → 2 columns at `1100px` → 1 column at `640px`.

### Testimonials (`.testimonials`)
- **Purpose:** Social proof via three client quotes.
- **Appearance:** Three beige quote cards in a row, each with a Fraunces-set quote and a plain-text citation (name + associated property/role).
- **Responsive behavior:** 3 columns → 2 columns at `1100px` → 1 column at `640px`.

### Contact section (`.contact`)
- **Purpose:** Primary lead-generation form plus direct contact details.
- **Appearance:** Brown background, 2-column layout — contact info (email, phone, office address, hours) on the left, a 2-column contact form on the right (Name, Email, Phone, Property of interest dropdown, full-width Message, full-width Submit button + status line).
- **Interaction:** Client-side validation (required name/message, email format regex) runs before submission; see JavaScript Memory for the full flow. A live-region status message (`role="status"`, `aria-live="polite"`) reports loading/success/error states with distinct colors.
- **Responsive behavior:** Collapses to one column at ≤1100px; the form itself drops to a single field column at ≤860px.

### Footer (`.footer`)
- **Purpose:** Secondary navigation, contact recap, copyright, and credit line.
- **Appearance:** Black background, 3-column grid (brand/tagline, "Navigate" links, "Contact" links/address), a bottom bar with a dynamically-inserted copyright year and the credit "Crafted by Arpita Nayak [suusriAI]".
- **Responsive behavior:** Collapses to a single column at ≤640px.

## 6. Animation and Interaction Design

- **Scroll reveal:** Elements with the `.reveal` class are hidden (`.js-hidden`: `opacity:0`, `translateY(26px)`) and revealed (`.js-visible`: fade + slide up over `0.7s`) as they enter the viewport, driven by two separate `IntersectionObserver` instances in `main.js` — one for static `.reveal` elements present at load (threshold `0.15`), and one specifically for the dynamically injected property cards (threshold `0.1`), since those don't exist in the DOM until `PROPERTIES` is rendered.
- **Reduced motion support:** Both the CSS (`@media (prefers-reduced-motion: reduce)` forcing near-zero animation/transition durations and `scroll-behavior: auto`) and the JavaScript (`window.matchMedia('(prefers-reduced-motion: reduce)')`) check for this preference; when active, `main.js` skips attaching the reveal observers entirely and elements remain visible by default.
- **Navbar scroll effect:** A `scroll` event listener toggles the `is-scrolled` class once `window.scrollY > 40`, driving the CSS background-darkening transition.
- **Hover effects:** Buttons lift and recolor; property/project/service cards lift, deepen shadow, and (for property cards) zoom their image and reveal a gradient overlay; nav links get an animated underline; the stat card lifts on hover; link-arrows nudge their arrow glyph on hover.
- **Modal transitions:** The modal itself has no CSS transition — it is shown/hidden via the `hidden` attribute — but its `.modal__backdrop` includes a blur, and internal elements (image, spec pills) are static. Opening/closing also toggles `document.body.style.overflow` to lock/unlock background scroll.
- **Mobile menu behavior:** Animated via a `max-height` transition (`0 → 420px`) plus the hamburger icon's bar-to-X transform.
- **Hero scroll indicator:** A CSS keyframe animation (`scrollDrop`) continuously animates a highlight moving down the vertical line, looping every `2.2s`.
- **JavaScript-controlled interactions:** Mobile menu open/close, navbar scroll class, scroll-reveal triggers, dynamic property card rendering, modal open/close (click, keyboard Enter/Space, Escape), pre-filling the contact form's property field from the modal, and the contact form's async submit/validation/status flow.

## 7. Responsive Design

Based on the actual media queries in `style.css`:

- **`min-width: 1900px` (large/desktop screens):** Base body font size increases slightly to `1.05rem`.
- **Default (desktop, >1100px):** Full 3-column grids for properties, services, projects, and testimonials; 2-column grids for showcase, about, and contact; horizontal navbar with visible links and ghost CTA.
- **`max-width: 1440px` / `1024px` (laptop/tablet down):** The hero's large SVG wordmark text steps down in size (`210px → 130px → 100px`) to stay proportionate on smaller viewports.
- **`max-width: 1100px` (tablet/small laptop):** Showcase, about, and contact grids collapse from 2 columns to 1 column (stacked); the showcase media aspect ratio is fixed at `16/9`; property/services/projects/testimonials grids drop from 3 columns to 2.
- **`max-width: 860px` (large mobile/small tablet):** The horizontal navbar links and ghost "Contact" button are hidden in favor of the hamburger toggle; the hero content's max width increases to `88vw`; the contact form drops from 2 columns to 1 column.
- **`max-width: 768px`:** The hero switches from `100vh` to a `4/5` aspect ratio; the wordmark text drops further to `75px`.
- **`max-width: 640px` (mobile):** Property/services/projects/testimonials grids drop to a single column; the about stats grid stays at 2 columns; the footer grid drops to a single column; the floating stat card shrinks and reduces its negative top margin; the hero's "Scroll" indicator is hidden.
- **`max-width: 425px` (small mobile):** The wordmark text jumps back up to `150px` (an intentional override for very narrow screens) with the wordmark container repositioned near the top; the hero content block is repositioned to the bottom-center, becomes centered text, and is given a fixed top margin.

No explicit "large screen" (e.g. 4K/ultra-wide) grid changes were found beyond the `1900px` font-size bump.
