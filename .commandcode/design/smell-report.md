# Smell Report — Russel Landing

**Mode**: `/design smell`
**Target**: `PierreLanding.jsx`
**Date**: 2026-07-13
**Score**: **7/10 — PRESENT** (3 tells)

---

## TL;DR

The Russel landing page makes several real design decisions — the ASCII background, the benchmark card in the hero, the `// 01 //` section dividers, the floating AI logos, the runtime comparison graphic. It's not a default generated page. But three odors linger where the design stopped making project-specific choices and fell back on reflex.

**Primary recommendation**: Attack the feature tile grid by varying the roadmap boxes, and consider whether the dark-terminal-green palette is the strongest identity for a product whose differentiator is _dual runtime orchestration_, not terminal aesthetic.

---

## Heuristic Scores

| # | Heuristic | Score | Finding |
|---|---|---|---|
| 1 | Tech gradient | 1/1 | No blue-violet, indigo-cyan, or purple-to-teal gradient anywhere. Clean pass. |
| 2 | Generic tech hue | 1/1 | Green (145 hue) is not the default blue-purple SaaS reflex. Clean pass. |
| 3 | Feature tile grid | 0/1 | **Detected.** Roadmap "Planned" boxes are 5 identical cards in a uniform grid. |
| 4 | Accent rail | 1/1 | No decorative colored stripes on card edges. The 2px left borders on feature cards are structural hints, not decorative rails. Clean pass. |
| 5 | Unearned blur | 1/1 | The header uses `backdrop-filter: blur(8px)` but it sits over a dark solid bg, not a decorative glass effect. No frosted-glass panels elsewhere. Clean pass. |
| 6 | Stat monument | 1/1 | Microstats (`<2s cold boot`, `Nix reproducible builds`, `0 downtime swaps`) are small, contextual, and tied to product claims. Not oversized number clusters. Clean pass. |
| 7 | Icon topper | 1/1 | No rounded-square icons placed above section headings. Feature cards use dots and inline SVGs, not decoration-topper patterns. Clean pass. |
| 8 | Bounce everywhere | 1/1 | Motion is restrained: floating AI logos use subtle ease-in-out, card hovers use `translateY(-2px)` with cubic-bezier. No elastic or spring bounce. Clean pass. |
| 9 | Default type | 0/1 | **Detected.** Inter + JetBrains Mono pairing. Competent and readable, but entirely unsurprising for a developer infrastructure product. |
| 10 | Center stack | 1/1 | Hero is left-aligned text with a right-positioned benchmark card. Features use a 3-column layout. Config section is split-view. No centered-just-because composition. Clean pass. |

---

## Detected Smells

### 1. Feature Tile Grid (Heuristic 3)

**Location**: Roadmap planned features — 5 `.roadmap-box` elements in a `grid-template-columns: repeat(3, 1fr)`.

**Pattern**: Every box is identical — same padding (`22px 20px`), same border, same internal structure (tag → h4 → p), all tagged "Planned". There is zero visual hierarchy among 5 items that span different domains (runtime, Wasm, secrets, CVE pipeline, scheduling).

**Why it weakens this brief**: Russel's core differentiator is _dual runtime_ — container + microVM. That is a structural, not cosmetic, property. Yet the roadmap treats all five items as equally weighted and equally styled. The Wasm edge runtime and CVE pipeline are fundamentally different features but get the same visual treatment as scheduling.

**Reflex behind it**: "Display features in equal cards without prioritization." The content has hierarchy — the cards don't.

**Fix mode**: `/design relayout` — vary box sizes, group related items, or give the most strategic items more visual weight.

### 2. Default Type (Heuristic 9)

**Location**: `font-family: var(--font-sans)` = Inter, `font-family: var(--font-mono)` = JetBrains Mono.

**Pattern**: Inter is the default sans-serif for 2024-2026 web projects. JetBrains Mono is the default monospace for developer tools. Together they're the "safe default monospace tool" pairing.

**Why it weakens this brief**: Russel has a specific visual personality — ASCII dithering, scanlines, CLI section dividers, terminal window cards. The type choice doesn't match the ambition. A project this visually authored deserves a type choice with more character than the default.

**Reflex behind it**: "Developer tools use monospace headings and a clean sans-serif body." The choice is correct but unchosen.

**Fix mode**: `/design typeset` — keep one of the two fonts (JetBrains Mono makes sense given the CLI aesthetic) but replace Inter with something that has more editorial voice.

### 3. Domain Default Trap (Heuristic N/A — domain assessment)

**Pattern**: Dark green (`#040803` base, oklch 145 hue accent) + terminal window motifs + CLI section dividers + ASCII dithering = the developer infrastructure tool aesthetic. If someone described "a landing page for a container/orchestration dev tool," the guess would be: dark, green, monospace, terminal windows.

**Why it's not a failure yet**: The execution is stronger than the reflex. The benchmark card, floating AI logos, runtime comparison graphic, and `// 01 //` dividers add specificity. But the _palette_ is exactly what you'd predict from the domain — a developer tool that hasn't found its color lane.

**Fix mode**: `/design recolor` — consider whether the accent should shift away from pure terminal green. The product's differentiator is dual runtime (container + microVM), not terminal aesthetic. A color strategy that distinguishes container vs. microVM could be more project-specific than "green terminal."

---

## What's Working

- **Hero composition** — Left-aligned headline, right-positioned benchmark card. Real tension, not center-stacked.
- **Benchmark card** — The right proof object in the right position. Concrete numbers against competitors.
- **Floating AI logos** — Genuinely specific. Claude, Codex, Hermes, Grok are named, visible, and animated with restraint.
- **Section dividers** — `// 01 // ENGINE FEATURES` gives the page a CLI-like cadence that matches the audience.
- **Runtime comparison graphic** — The container/microVM toggle with alternating active states is a real interaction decision.
- **Architecture SVG** — Well-composed, readable, product-specific.
- **No AI gradients** — Zero blue-purple or cyan-teal gradients anywhere.
- **No bounce** — Motion is subtle and appropriate.
- **No icon toppers or accent rails** — Cards earn their structure.

---

## Summary

The landing page has real bones. The hero is distinctive, the proof elements are specific, and the page avoids most of the obvious AI tells (gradients, bounce, stat monuments, icon toppers). The three odors come from places where the design coasted on reflex: equal roadmap cards, Inter as the default choice, and a palette that's the domain's first guess.

The deck isn't fully clean, but it's not an identity failure. Three targeted fixes — vary the roadmap grid, evaluate the type stack, and consider whether the green-terminal palette is the strongest lane — would remove the remaining smell.

---

## Recommended Next Modes

1. `/design relayout` → Vary roadmap card hierarchy, give strategic items more visual weight
2. `/design typeset` → Replace Inter with a more editorial sans-serif, or commit fully to monospace
3. `/design recolor` → Evaluate whether terminal green is the strongest color strategy for a dual-runtime product
