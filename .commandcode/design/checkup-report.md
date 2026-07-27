# Checkup Report — Russel Landing & /why Route

**Mode**: `/design checkup`
**Target**: `PierreLanding.jsx`, `WhyPage.jsx`, `why.astro`
**Date**: 2026-07-26
**Score**: **45/60**

---

## Vital Signs

| # | Vital Sign | Status | Score | Evidence |
|---|---|---|---|---|
| 1 | Intentionality | Healthy | 10/10 | Custom color tokens, Clash-Display headings, DotGrid canvas background, bento layout. Real decisions across both surfaces. |
| 2 | Readability | Watch | 5/10 | Muted text luminosity bumped from 0.72→0.82, body text now 16-17px with weight 500. Still testing whether the dark green background + monospace labels hit sufficient contrast. |
| 3 | Usability | Healthy | 10/10 | Primary task (understand Russel, join waitlist) achievable on both routes. CTAs prominent and reachable. Navigation links all functional. |
| 4 | Responsiveness | Healthy | 10/10 | Bento grid collapses to single column. Comparison table has horizontal scroll. Header nav collapses on mobile. Both routes have responsive breakpoints. |
| 5 | Speed | Watch | 5/10 | DotGrid canvas + gsap (InertiaPlugin) adds runtime cost. Single large component for landing. Astro SSG mitigates some weight. |
| 6 | Accessibility | Watch | 5/10 | `:focus-visible` present on both routes. `prefers-reduced-motion` respected (DotGrid skips mousemove/click registration). Missing: ARIA labels on comparison table, no skip link on /why. |

---

## Prescriptions

### Readability — Watch
- `--text-muted` at `oklch(0.82 0.015 145)` — borderline on `#040803` background for thin system fonts. Test on actual displays.
- Monospace labels (`JetBrains Mono`) at 11-12px on dark backgrounds — consider bumping to 13px or using a weight-500 variant.
- **Status**: Watch. Bump if real-device testing shows strain.

### Speed — Watch
- DotGrid canvas redraws every frame (requestAnimationFrame loop). On low-power devices, this could cause jank.
- **Fix**: Not urgent. The canvas is small (4px dots, 32px gap) and only reacts within proximity radius. Monitor on real hardware.

### Accessibility — Watch
- Comparison table (`/why` route) has no `<caption>` or `scope` attributes.
- No skip navigation link on `/why` route.
- **Fix**: Add `scope="col"` to `<th>` elements. Add a visually-hidden skip link.
