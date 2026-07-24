# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: infrastructure and platform engineers evaluating self-hosted deployment runtimes (containers vs microVMs, Nix/reproducibility, isolation). Secondary: founders and technical decision-makers who need a plain-language path to the same conclusion without deep ops detail.

Situation: early-awareness or evaluation — comparing Russel to containers/K8s/self-hosted stacks; open to waitlist if the product story is clear.

## Product Purpose

Russel is a self-hosted microVM and container deployment platform. One workflow deploys services as containers (speed) or hardware-isolated microVMs (security), with reproducible/immutable builds (Nix), and a one-line runtime switch. Open source (MIT), managed or self-hosted, zero drift / no lock-in framing.

This surface (the marketing landing) must make visitors understand what Russel is and why it differs, then convert them to the waitlist.

## Positioning

One orchestrator for dual engine runtimes — containers via Podman and microVMs via KVM/Cloud Hypervisor — with deterministic Nix builds and a single CLI/config surface. Switch isolation boundary without changing workflow. Hardware-enforced isolation without full guest OS overhead; self-hosted with zero-drift builds.

## Operating Context

Visitors arrive via social, search, or community; they scan a single long-form teaser landing (`PierreLanding` on `/`). Primary interaction is reading technical claims and illustrations, then joining a waitlist via email. Secondary: scroll to features, optional GitHub/docs-style credibility cues if present. Desktop-first evaluation; mobile must remain usable.

## Capabilities and Constraints

- Live surface: Astro site; homepage is React `PierreLanding` (`client:only="react"`).
- Stack: Astro v5, React, Tailwind v4, custom CSS-in-component on the teaser page.
- Confirmed claims already on-site: dual runtimes, deterministic builds, Russel CLI, performance vs Podman framing, waitlist CTA.
- Waitlist submit currently logs client-side only — treat as UX shell unless product wires a real endpoint later.
- Branch/worktree: refine on `teaser-work` from `teaser-minimal`; do not invent pricing, customer logos, or unproven benchmarks beyond existing page content.
- Open: real waitlist backend, broader multi-page marketing polish outside `/`.

## Brand Commitments

- Name: **Russel**
- Visual DNA of the teaser: dark near-black green field (`#040803`), green accent (oklch ~145 hue), secondary purple/magenta accent for dual-runtime contrast, terminal/CLI materials, Clash Display headings, Inter body, JetBrains Mono for code.
- Voice: technical, precise, infrastructure-native; not consumer-saas fluff.
- Assets: logos (`logo-light.svg` / `logo-dark.svg`), ascii/terminal background treatment, specular/curved waitlist input.

## Evidence on Hand

- On-page product claims and interactive demos (runtime toggle, CLI steps, feature columns, bench framing).
- Devicon-based tech cloud; no customer case studies or named logos as social proof on this teaser.
- Do not fabricate testimonials, customer counts, funding, or benchmarks not already stated on the page.

## Product Principles

1. Comprehension before conversion — visitors must grasp dual-runtime + reproducibility before the waitlist feels earned.
2. Engineers first, decision-makers second — lead with mechanism; keep language scannable for non-deep-ops readers.
3. Prove with product materials (CLI, config, isolation boundary) not generic marketing stock.
4. Self-hosted control and open source are durable trust anchors.
5. Prefer one clear story over feature laundry lists.

## Accessibility & Inclusion

No product-specific legal standard declared. Default to solid web accessibility: keyboardable waitlist and controls, sufficient contrast on dark UI, reduced-motion respect for decorative animation, readable type sizes on mobile.
