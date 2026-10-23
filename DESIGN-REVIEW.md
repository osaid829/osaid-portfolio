# Portfolio design review — edition 04

Scope: floating navigation → interactive arrival → profile → capability map → working approach → selected work → contact. This is a product/design review, not a full accessibility certification.

## Direction

The redesign keeps Osaid’s personal information, links, and procedural art foundation, then moves the visual world into midnight: deep blue-black surfaces, restrained violet and cyan ambient light, a single acid-green action accent, and a wide asymmetric hero. The page now behaves like a small digital exhibition instead of a long list of sections.

## Review notes

1. **Arrival — cinematic.** The hero uses a wide two-line proposition, an inline image fragment, an animated ASCII field, and the existing progressive Three.js system.
2. **Profile — quieter.** The copy explains the seam between interface and system without fabricated client outcomes, while the orbit study adds depth without another card wall.
3. **Capabilities — mathematically dense.** The bento uses a 12-column × 2-row grid with an 8×2 primary card and two 4×1 cards. There are no empty cells or blank trailing tiles.
4. **Working approach — spatial.** GSAP pins the left-side thought while a right-side gallery scales, darkens, and stacks through the scroll. A separate word-level scrub makes the manifesto reveal sequentially.
5. **Selected work — interactive.** Curated local project records are presented as a horizontal accordion on desktop and an accessible active-panel stack on mobile.
6. **Contact — direct.** The closing CTA is large and high contrast. Configured channels render as direct paths; unconfigured profiles stay out of the UI.
7. **Motion — layered.** Three.js owns the system study, Framer Motion owns navigation and light reveals, GSAP owns pinned/scrubbed scroll choreography, and the ASCII/Python fields add controlled procedural movement.

## Remaining launch checks

- Add `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL` before a public launch.
- Inspect the WebGL path on a GPU-enabled browser and test touch interaction on a physical device.
- Replace remote Picsum art direction with owned project-specific captures when final imagery is available.
