---
name: Russel Teaser Landing
description: Dark terminal-green infrastructure teaser — dual runtime, waitlist conversion
colors:
  bg: "#040803"
  bg-alt: "#050a04"
  text: "oklch(0.93 0.008 145)"
  text-muted: "oklch(0.72 0.018 145)"
  text-faint: "oklch(0.62 0.016 145)"
  border: "oklch(0.18 0.028 145)"
  border-subtle: "oklch(0.13 0.020 145)"
  card-bg: "oklch(0.12 0.028 145 / 0.72)"
  accent: "oklch(0.72 0.17 145)"
  accent-soft: "oklch(0.78 0.12 145)"
  accent-muted: "oklch(0.42 0.07 145)"
  accent-alt: "oklch(0.68 0.16 310)"
  accent-alt-soft: "oklch(0.74 0.12 310)"
  ink-on-accent: "#041004"
  error: "oklch(0.62 0.16 25)"
typography:
  display:
    fontFamily: "Clash-Display, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Clash-Display, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "22px"
  pill: "9999px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "48px"
  section: "104px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink-on-accent}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-soft}"
  card-surface:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  input-waitlist:
    backgroundColor: "oklch(0.10 0.02 145 / 0.85)"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
---

# DESIGN.md — Russel Teaser

## Overview

Marketing teaser for Russel: dark near-black green field, terminal/CLI materials, dual-runtime green + magenta accents. Persuade mode — comprehension then waitlist. Primary surface is the React island `PierreLanding` on `/`.

## Colors

- **Surface:** `#040803` / `#050a04` field; translucent card surfaces with green chroma.
- **Primary accent:** green `oklch(~0.72 0.17 145)` for CTAs, microVM emphasis, success.
- **Secondary accent:** magenta/purple `oklch(~0.68 0.16 310)` for container-engine contrast only.
- **Text:** high-luminance green-tinted neutrals; muted body ≥ ~0.72 L for contrast on dark.
- **Borders:** low-chroma green edges; avoid pure gray.

## Typography

- **Display / section titles:** Clash Display, tight tracking, balanced wrap.
- **Body:** Inter 15px / 1.65.
- **Code / labels / ticks:** JetBrains Mono — only for actual code, cmds, status.
- Hierarchy: one dominant hero line; section titles smaller; avoid mono as costume for marketing headlines.

## Layout

- Max content ~1280px; hero centered stack max ~720–820px.
- Features: 3-column unified panel → 1 column under 992px.
- Bench: text + visual 2-col → stack.
- Section padding ~104px desktop / ~64px mobile.
- Tight groups, generous section separation.

## Elevation & Depth

- Soft offset shadows (`--shadow-soft`, `--shadow-lift`), not zero-offset glow-only.
- Subtle green radial vignettes behind hero/CTA; ascii background atmospheric, not competing.
- Cards: 1px border + soft shadow + optional inset highlight.

## Shapes

- Radius: 8 / 14 / 22 / pill.
- Waitlist CTAs: pill bars; feature panel large radius; illustration wells medium.

## Components

- **Waitlist (hero):** CurvedInput dark theme; green submit; success/error status line.
- **Waitlist (footer CTA):** pill input bar, green primary button (never off-brand blue).
- **Feature columns:** illustration well + heading + mono cmd chip + body.
- **Runtime cards:** dual cards; active state uses accent (microVM) or accent-alt (container).
- **CLI terminal:** black shell, traffic lights, mono body, accent prompt/success.
- Focus: 2px accent ring, 3px offset on interactive controls.

## Do's and Don'ts

**Do**

- Keep dual-accent grammar: green = Russel/microVM/CTA; magenta = container contrast only.
- Prefer product proof (CLI, config, runtime) over stock marketing.
- Respect `prefers-reduced-motion` for decorative loops and autoplaying demos (bench stack, CLI steps, runtime flip, CTA field).
- Post-hero CTA decoration stays sparse (≤8 marks), no CSS blur filters, animate only while in view.
- Feature illustration chrome labels ≥11px using muted (not faint) text.

**Don't**

- Introduce new palette hues or light-mode identity on this teaser.
- Use Inter-only headings when Clash Display is available for display.
- Off-brand CTA colors (e.g. pure blue buttons).
- Fabricate testimonials, logos, or unstated benchmarks.
- Nested cards as structure; colored thick left borders as decoration.
