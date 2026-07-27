import React from 'react'
import AnimatedCardStack from './ui/animate-card-animation'
import { CircuitBoard } from './ui/circuit-board'
import ZeroDowntimeSwapDiagram from './ui/ZeroDowntimeSwapDiagram.jsx'
import { Box, Cpu, Server, Terminal, PackageCheck } from 'lucide-react'
import './ui/SpecularButton.css'
import './ui/CurvedInput.css'

const LOGO = (name) =>
	`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`
const LOGO_PLAIN = (name) =>
	`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-plain.svg`

const logoDocker = LOGO('docker')
const logoRust = LOGO('rust')
const logoGo = LOGO('go')
const logoLinux = LOGO('linux')
const logoNixos = LOGO('nixos')
const logoK8s = LOGO_PLAIN('kubernetes')
const logoPostgres = LOGO('postgresql')
const logoGit = LOGO('git')
const logoReact = LOGO('react')
const logoNode = LOGO('nodejs')
const logoPython = LOGO('python')
const logoTs = LOGO('typescript')
const logoRedis = LOGO('redis')
const logoNginx = LOGO('nginx')
const logoWasm = LOGO('wasm')
const logoTerraform = LOGO('terraform')

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

:root {
  --background: 201 100% 13%;
  --foreground: 0 0% 100%;
  --muted-foreground: 240 4% 66%;
  --primary: 0 0% 100%;
  --primary-foreground: 0 0% 4%;
  --secondary: 0 0% 10%;
  --muted: 0 0% 10%;
  --accent: 0 0% 10%;
  --border: 0 0% 18%;
  --input: 0 0% 18%;

  --bg-color: hsl(201 100% 13%);
  --bg-alt: hsl(201 100% 11%);
  --text-color: hsl(0 0% 100%);
  --text-muted: hsl(240 4% 66%);
  --text-faint: hsl(240 4% 45%);
  --border-color: hsl(0 0% 18%);
  --border-subtle: hsl(0 0% 14%);
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-hover: rgba(255, 255, 255, 0.06);
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Instrument Serif', serif;
}

.pierre-page h1,
.pierre-page h2,
.pierre-page h3,
.pierre-page h4 {
  font-family: var(--font-heading);
  font-weight: 400;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.pierre-page {
  box-sizing: border-box;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  z-index: 1;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.pierre-page ::selection {
  background: var(--selection-bg);
  color: var(--text-color);
}

.pierre-page :focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

/* Global terminal background */
.terminal-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.terminal-bg .faulty-terminal-container {
  width: 100%;
  height: 100%;
}

/* Ensure page content sections layer above fixed ascii field */
.hero-section-grid,
.features-section,
.bench-section,
.centered-cta-section {
  position: relative;
  z-index: 2;
}

.pierre-page * {
  box-sizing: border-box;
}

.section-inner {
  max-width: 1280px;
  margin: 0 auto;
}

/* Hero Custom Layout */
.hero-section-grid {
  display: block;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(ellipse 70% 55% at 72% 42%, oklch(0.24 0.07 145 / 0.22) 0%, transparent 58%),
    radial-gradient(circle at 50% 100%, oklch(0.14 0.04 145 / 0.35) 0%, var(--bg-color) 70%);
}

.hero-section-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* Protect the text column; keep the right open for the cropped figure */
  background:
    linear-gradient(
      to right,
      oklch(0.04 0.015 145 / 0.75) 0%,
      oklch(0.04 0.015 145 / 0.8) 38%,
      oklch(0.04 0.015 145 / 0.35) 60%,
      transparent 80%
    ),
    linear-gradient(
      to bottom,
      oklch(0.04 0.015 145 / 0.35) 0%,
      transparent 22%,
      transparent 68%,
      var(--bg-color) 100%
    );
}

.hero-inner {
  max-width: 820px;
  margin: 0 auto;
  padding: 132px 48px 96px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: min(780px, calc(100vh - 48px));
  justify-content: center;
}

@media (min-width: 993px) {
  .hero-inner {
    padding-top: 152px;
    padding-bottom: 104px;
  }
}

@media (max-width: 992px) {
  .hero-inner {
    padding: 72px 20px 64px;
    min-height: auto;
  }

  .hero-section-grid::after {
    background:
      radial-gradient(ellipse 90% 70% at 50% 40%, oklch(0.04 0.015 145 / 0.25) 0%, oklch(0.04 0.015 145 / 0.15) 55%, transparent 85%),
      linear-gradient(to bottom, transparent 60%, var(--bg-color) 100%);
  }

  .hero-text-card {
    background: radial-gradient(
      ellipse 80% 75% at 50% 42%,
      oklch(0.05 0.02 145 / 0.4) 0%,
      oklch(0.04 0.015 145 / 0.2) 65%,
      transparent 85%
    );
  }
}

.hero-text-card {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 32px 24px;
  text-align: center;
  max-width: 720px;
  width: 100%;
  border-radius: 28px;
  background: radial-gradient(
    ellipse 70% 65% at 50% 42%,
    oklch(0.05 0.02 145 / 0.72) 0%,
    oklch(0.04 0.015 145 / 0.35) 55%,
    transparent 78%
  );
}

.hero-waitlist {
  width: 100%;
  max-width: 480px;
  margin-bottom: 8px;
}

.hero-waitlist-note {
  margin-top: 14px;
  font-size: 14px;
  color: var(--text-faint);
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
  min-height: 1.2em;
}

.hero-waitlist-note[data-state="success"] {
  color: var(--accent-soft);
}

.hero-waitlist-note[data-state="error"] {
  color: var(--error);
}

.hero-secondary-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 18px;
}

.hero-why-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--ink-on-accent);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
  box-shadow:
    0 1px 0 oklch(1 0 0 / 0.14) inset,
    0 10px 28px -10px var(--accent-glow);
  transition: filter 0.2s var(--ease-out), transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
}

.hero-why-btn:hover,
.hero-why-btn:focus-visible {
  /* Keep ink-on-accent — global main a:hover otherwise forces a light color */
  color: var(--ink-on-accent);
  filter: brightness(1.12);
  transform: translateY(-1px);
  box-shadow:
    0 1px 0 oklch(1 0 0 / 0.18) inset,
    0 14px 32px -10px var(--accent-glow);
}

.hero-why-btn .arr {
  transition: transform 0.2s var(--ease-out);
  color: inherit;
  font-weight: 700;
}

.hero-why-btn:hover .arr {
  transform: translateX(3px);
}

.hero-bench-col {
  z-index: 2;
  width: 100%;
  min-width: 0;
  max-width: 1040px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(520px);
}

@media (max-width: 992px) {
  .hero-bench-col {
    transform: none;
  }
}

@media (min-width: 993px) and (max-width: 2000px) {
  .hero-bench-col {
    transform: translate(-300px, 420px);
  }
}

@media (max-width: 600px) {
  .hero-inner {
    gap: 36px;
    padding: 48px 20px 56px;
  }

  h1.hero-title {
    font-size: clamp(28px, 8vw, 34px);
    line-height: 1.08;
    margin-bottom: 20px;
  }

  .hero-text-card {
    padding: 12px 0;
  }

  .hero-subhead {
    font-size: 14px !important;
    line-height: 1.55 !important;
  }
}

/* Hero elements */
.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 16px;
  font-weight: 700;
}

h1.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(36px, 5.2vw, 64px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.038em;
  margin: 0 0 22px;
  color: #f4faf4;
  max-width: 13em;
  text-shadow:
    0 1px 0 oklch(0.04 0.02 145 / 0.55),
    0 0 28px oklch(0.04 0.02 145 / 0.75),
    0 12px 40px oklch(0.04 0.02 145 / 0.55);
}

.hero-gradient-text {
  font-style: italic;
  font-weight: 700;
  color: var(--accent);
  display: inline;
  text-shadow:
    0 0 28px oklch(0.72 0.17 145 / 0.35),
    0 1px 0 oklch(0.04 0.02 145 / 0.45);
}

.hero-subhead {
  font-size: clamp(16px, 1.5vw, 18px);
  line-height: 1.65;
  color: oklch(0.88 0.015 145);
  margin: 0 auto 32px;
  font-family: var(--font-sans);
  max-width: 42ch;
  font-weight: 500;
  text-shadow: 0 0 24px oklch(0.04 0.02 145 / 0.85);
}

.hero-divider-line {
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  margin: 20px 0;
}

.hero-description-bullets {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 32px;
}

.cta-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

.scroll-down-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: oklch(0.10 0.02 145 / 0.5);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s var(--ease-out), color 0.2s var(--ease-out), background 0.2s var(--ease-out), transform 0.2s var(--ease-out);
  margin-top: 20px;
}

.scroll-down-btn:hover {
  border-color: var(--accent-muted);
  color: var(--accent);
  background: oklch(0.72 0.17 145 / 0.06);
  transform: translateY(2px);
}

@media (max-width: 480px) {
  .cta-group {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
}

.btn {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.btn-primary {
  background: var(--accent);
  color: #040803;
  border: 1px solid var(--accent);
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--accent);
}

.btn-secondary {
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary:hover {
  border-color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
}

.hero-microstats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.microstat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.microstat-item .mono-symbol {
  font-family: var(--font-mono);
  color: var(--accent);
  font-weight: 700;
}

.microstat-item .stat-label {
  color: var(--text-muted);
}

/* Benchmark Card */
.bench-card {
  border: 1px solid var(--border-color);
  background-color: #000000;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.bench-card-titlebar {
  background: #000000;
  border-bottom: 1px solid var(--border-color);
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bench-card-dots {
  display: flex;
  gap: 5px;
}

.bench-card-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.bench-card-dot.red { background: #ff5f56; }
.bench-card-dot.yellow { background: #ffbd2e; }
.bench-card-dot.green { background: #27c93f; }

.bench-card-title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.05em;
  margin-left: 4px;
}

.bench-card-body {
  padding: 20px 24px 24px;
}

.bench-card h4 {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-color);
}

.bench-card .sub {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  margin-bottom: 20px;
}

.bar-row {
  margin-bottom: 16px;
}

.bar-row .lbl {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  margin-bottom: 6px;
}

.bar-row .lbl .name {
  color: var(--text-muted);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bar-row .lbl .t {
  color: var(--text-color);
  font-weight: bold;
  flex: 0 0 auto;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.bar-track {
  height: 8px;
  background-color: oklch(0.05 0.020 145);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8px;
  min-width: 70px;
  transition: width 1s var(--ease-out);
}

.bar-fill.win,
.bar-fill.rank-1 {
  background-color: var(--accent);
  box-shadow: 0 0 10px var(--accent-glow);
  color: var(--ink-on-accent);
}

.bar-fill.mid,
.bar-fill.rank-2 {
  background-color: oklch(0.54 0.14 145);
  box-shadow: 0 0 8px oklch(0.54 0.14 145 / 0.25);
  color: #ecfdf5;
}

.bar-fill.lose,
.bar-fill.rank-3 {
  background-color: oklch(0.34 0.07 145);
  color: #a7f3d0;
}

.hero-bench-card h4 {
  margin: 0 0 8px;
  color: var(--text-color);
  font-family: var(--font-mono);
  font-size: 15px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero-bench-card .sub {
  margin-bottom: 24px;
  color: rgba(238, 248, 239, 0.55);
  font-family: var(--font-mono);
  font-size: 12px;
}

/* Features Grid */
.features-section {
  padding: 104px 48px 96px;
  border-bottom: 1px solid var(--border-color);
  background: hsl(201 100% 12%);
}

@media (max-width: 768px) {
  .features-section {
    padding: 64px 24px 56px;
  }
}

.features-header {
  max-width: 720px;
  margin: 0 auto 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features-desc {
  font-size: 17px;
  font-weight: 400;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 52ch;
}

.features-title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4.2vw, 48px);
  font-weight: 400;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  max-width: 22ch;
  color: var(--text-color);
  text-wrap: balance;
}

p.features-desc {
  color: var(--text-muted);
  font-size: 17px;
  font-weight: 400;
  margin: 0;
  max-width: 48ch;
  line-height: 1.65;
  text-align: center;
}

.feature-card-cmd {
  font-family: var(--font-mono);
  font-size: 13px;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.08);
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  margin-bottom: 16px;
  width: fit-content;
  letter-spacing: -0.01em;
}

.feature-card-desc {
  font-size: 15px;
  font-weight: 400;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
  max-width: 50ch;
}

/* Benchmarks Section */
.bench-section {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 104px 48px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
  background: hsl(201 100% 11%);
}

@media (max-width: 992px) {
  .bench-section {
    gap: 36px;
    padding: 64px 24px;
  }
}

.bench-text-col {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bench-text-col h2 {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
  max-width: 24ch;
  text-wrap: balance;
  text-align: center;
}

.bench-text-col p {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
  max-width: 52ch;
  text-align: center;
}

.bench-text-col--above-rps {
  margin-bottom: 56px;
}

.bench-text-col--below-rps {
  margin-top: 72px;
  margin-bottom: 28px;
}

.bench-footnote {
  margin: 8px auto 0;
  max-width: 48ch;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--text-faint);
  text-align: center;
}

/* Empirical proof benchmark table */
.bench-empirical-card {
  width: min(960px, 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 28, 50, 0.65);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
}

.bench-empirical-titlebar {
  background: rgba(0, 20, 36, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bench-empirical-dots {
  display: flex;
  gap: 5px;
}

.bench-empirical-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.bench-empirical-dot.red { background: #ff5f56; }
.bench-empirical-dot.yellow { background: #ffbd2e; }
.bench-empirical-dot.green { background: #27c93f; }

.bench-empirical-title {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
  letter-spacing: 0.05em;
  margin-left: 4px;
}

.bench-empirical-body {
  padding: 24px 28px;
  text-align: left;
}

.bench-empirical-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #38bdf8;
  text-transform: uppercase;
  margin: 0 0 6px;
}

.bench-empirical-card h4 {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 4px;
  letter-spacing: -0.01em;
  color: var(--text-color);
}

.bench-empirical-sub {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  margin: 0 0 20px;
  line-height: 1.55;
}

.bench-empirical-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.bench-empirical-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
}

.bench-empirical-table th,
.bench-empirical-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
}

.bench-empirical-table thead th {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.03);
}

.bench-empirical-table tbody td:first-child {
  color: var(--text-muted);
  font-weight: 500;
}

.bench-empirical-table tbody td {
  color: var(--text-color);
}

.bench-empirical-table thead th.col-metric {
  color: var(--text-muted);
}

.bench-empirical-table tbody td.col-metric {
  color: var(--text-color);
  font-weight: 500;
}

@media (max-width: 600px) {
  .bench-empirical-body {
    padding: 16px 14px 18px;
  }
  .bench-empirical-table {
    font-size: 11px;
  }
  .bench-empirical-table th,
  .bench-empirical-table td {
    padding: 8px 10px;
  }
}

.bench-visual-col {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 460px;
}

/* Benchmark card stack (AnimatedCardStack) */
.bench-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(640px, 100%);
}

.bench-stack-stage {
  position: relative;
  width: 100%;
  height: 430px;
}

.bench-stack-card {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: min(640px, calc(100% - 16px));
  height: 360px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 24, 44, 0.95);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.65);
  overflow: hidden;
  will-change: transform;
}

.bench-stack-card--static {
  position: relative;
  left: auto;
  transform: none;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

.bench-card--stack {
  border: none;
  box-shadow: none;
  background: transparent;
  width: 100%;
  height: 100%;
  max-width: none;
  border-radius: 0;
}

.bench-card-heading {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text-color);
  margin: 0 0 6px 0;
}

.bench-card-sub {
  margin: 0 0 16px;
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.bar-row-label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
  font-weight: 600;
}

.bar-row-label.is-winner {
  color: var(--text-color);
}

.bar-track--tall {
  position: relative;
  height: 22px;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill-val {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
}

.bar-fill.lose .bar-fill-val {
  color: var(--text-color);
}

@media (prefers-reduced-motion: reduce) {
  .bar-fill {
    transition: none;
  }
}

/* Centered CTA — full-bleed deep navy glassmorphism */
.centered-cta-section {
  position: relative;
  padding: 140px 24px 132px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background:
    radial-gradient(circle at 50% 45%, rgba(0, 110, 200, 0.18) 0%, transparent 60%),
    hsl(201 100% 9%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.cta-content-wrapper {
  position: relative;
  z-index: 5;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: #ffffff;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
  box-shadow:
    0 12px 36px rgba(0, 0, 0, 0.45),
    0 0 28px rgba(56, 189, 248, 0.18),
    inset 0 2px 2px rgba(255, 255, 255, 0.4);
}

.cta-logo svg {
  width: 32px;
  height: 32px;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: clamp(36px, 5.8vw, 64px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 16px;
}

.cta-subtitle {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.65;
  color: var(--text-muted);
  max-width: 54ch;
  margin: 0 0 32px;
}

.cta-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  letter-spacing: 0.08em;
  margin-bottom: 40px;
  flex-wrap: wrap;
  text-transform: uppercase;
}

.cta-tags .divider {
  color: var(--border-color);
}

.cta-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.cta-input-bar {
  width: 100%;
  max-width: 480px;
  height: 52px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0 6px 0 20px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);
  transition: border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
  backdrop-filter: blur(16px);
  box-sizing: border-box;
}

.cta-input-bar:focus-within {
  border-color: oklch(0.72 0.17 145 / 0.55);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55), 0 0 0 3px var(--accent-glow);
}

.cta-input-bar input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 14px;
  outline: none;
  padding: 0;
  margin: 0;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
}

.cta-input-bar input::placeholder {
  color: rgba(255, 255, 255, 0.32);
}

.cta-submit-btn {
  background: var(--accent);
  color: var(--ink-on-accent);
  border: none;
  border-radius: 9999px;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13.5px;
  height: 40px;
  padding: 0 26px;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s var(--ease-out), transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
  white-space: nowrap;
  box-sizing: border-box;
  box-shadow: 0 1px 0 oklch(1 0 0 / 0.14) inset;
}

.cta-submit-btn:hover {
  background-color: var(--accent-soft);
  transform: translateY(-1px);
  box-shadow: 0 10px 28px -10px oklch(0.72 0.17 145 / 0.45);
}

.cta-submit-btn:active {
  transform: translateY(0);
}

.cta-submit-btn:disabled {
  opacity: 0.7;
  cursor: default;
  transform: none;
}

.cta-form-note {
  font-size: 12.5px;
  color: var(--text-faint);
  font-family: var(--font-mono);
  min-height: 1.2em;
}

.cta-form-note[data-state="success"] {
  color: var(--accent-soft);
}

.cta-form-note[data-state="error"] {
  color: var(--error);
}

@media (max-width: 520px) {
  .cta-input-bar {
    height: auto;
    min-height: 52px;
    border-radius: 16px;
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
    gap: 10px;
  }

  .cta-input-bar input {
    padding: 0 10px;
    height: 40px;
  }

  .cta-submit-btn {
    width: 100%;
    height: 44px;
  }
}

/* Orbiting tech field — dual counter-rotating rings */
.scattered-bg-container {
  position: absolute;
  inset: -12%;
  width: 124%;
  height: 124%;
  left: -12%;
  top: -12%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
  transform-origin: 50% 50%;
  animation: cta-orbit 70s linear infinite;
  animation-play-state: paused;
  will-change: transform;
}

.scattered-bg-container.is-active {
  animation-play-state: running;
}

.scattered-bg-ring {
  position: absolute;
  inset: 0;
  transform-origin: 50% 50%;
}

.scattered-bg-ring--inner {
  animation: cta-orbit-reverse 95s linear infinite;
  animation-play-state: paused;
}

.scattered-bg-container.is-active .scattered-bg-ring--inner {
  animation-play-state: running;
}

.scattered-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 10px;
  width: 54px;
  height: 54px;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.45),
    0 0 18px oklch(0.72 0.17 145 / 0.08);
  transform: translate(-50%, -50%) scale(var(--base-scale, 1)) rotate(var(--base-rotation, 0deg));
  pointer-events: none;
  animation-play-state: paused;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.scattered-bg-container.is-active .scattered-icon {
  animation-play-state: running;
}

.scattered-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.92;
}

/* Stronger individual float so spin field feels alive */
@keyframes float-slow-1 {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0) rotate(var(--base-rotation)) scale(var(--base-scale));
  }
  50% {
    transform: translate(-50%, -50%) translateY(-22px) rotate(calc(var(--base-rotation) + 8deg)) scale(calc(var(--base-scale) * 1.05));
  }
}

@keyframes float-slow-2 {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0) rotate(var(--base-rotation)) scale(var(--base-scale));
  }
  50% {
    transform: translate(-50%, -50%) translateY(18px) rotate(calc(var(--base-rotation) - 10deg)) scale(calc(var(--base-scale) * 0.96));
  }
}

@keyframes float-slow-3 {
  0%, 100% {
    transform: translate(-50%, -50%) translate(0, 0) rotate(var(--base-rotation)) scale(var(--base-scale));
  }
  33% {
    transform: translate(-50%, -50%) translate(-12px, -14px) rotate(calc(var(--base-rotation) + 6deg)) scale(var(--base-scale));
  }
  66% {
    transform: translate(-50%, -50%) translate(10px, -8px) rotate(calc(var(--base-rotation) - 5deg)) scale(calc(var(--base-scale) * 1.04));
  }
}

@keyframes cta-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes cta-orbit-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .scattered-bg-container,
  .scattered-bg-ring--inner,
  .scattered-icon,
  .hermetic-center-cube,
  .animated-nix-line,
  .animated-nix-line.purple-flow {
    animation: none !important;
  }

  .pierre-page {
    scroll-behavior: auto;
  }

  .feature-column,
  .scroll-down-btn,
  .cta-submit-btn,
  .runtime-card-sub {
    transition: none !important;
  }
}

/*/* Unified Features Box Redesign */
.unified-features-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, oklch(0.12 0.03 145 / 0.55) 0%, oklch(0.07 0.02 145 / 0.72) 100%);
  overflow: hidden;
  margin-top: 8px;
  width: 100%;
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(8px);
}

.feature-column {
  padding: 36px 28px 40px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  transition: background-color 0.28s var(--ease-out);
  min-width: 0;
}

.feature-column:last-child {
  border-right: none;
}

.feature-column:hover {
  background-color: oklch(0.72 0.17 145 / 0.03);
}

.feature-illustration-container {
  height: 210px;
  width: 100%;
  background:
    radial-gradient(circle at 50% 30%, oklch(0.22 0.05 145 / 0.18) 0%, transparent 60%),
    oklch(0.05 0.015 145 / 0.9);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 26px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.03);
  padding: 8px;
}

.feature-illustration-container--circuit {
  padding: 4px;
}

.feature-illustration-container--circuit > * {
  max-width: 100%;
}

.runtime-lucide {
  width: 28px;
  height: 28px;
}

.feature-column-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 20px;
  color: var(--text-color);
  margin: 0 0 14px 0;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.feature-column-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Specific runtime engine comparison cards */
.runtime-compare-graphic {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 8px;
}

.runtime-card-sub {
  background: oklch(1 0 0 / 0.02);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 0 1 120px;
  min-width: 0;
  color: var(--text-muted);
  transition: border-color 0.3s var(--ease-out), background 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), color 0.3s var(--ease-out);
}

.runtime-card-sub svg {
  width: 28px;
  height: 28px;
}

.runtime-card-sub.active.container-active {
  border-color: var(--accent-alt);
  background: var(--accent-alt-glow);
  color: var(--accent-alt);
  box-shadow: 0 0 0 1px var(--accent-alt-muted), 0 8px 24px -12px var(--accent-alt-glow);
}

.runtime-card-sub.active.microvm-active {
  border-color: var(--accent);
  background: var(--accent-glow);
  color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-muted), 0 8px 24px -12px var(--accent-glow);
}

.runtime-card-sub-title {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.runtime-card-sub-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.3;
}

.runtime-card-sub.active .runtime-card-sub-label {
  color: inherit;
}

.feature-engine-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-engine-block.is-split {
  border-top: 1px dashed oklch(1 0 0 / 0.08);
  padding-top: 12px;
}

.feature-engine-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.feature-engine-name {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-color);
  font-weight: 600;
}

.feature-card-cmd {
  font-size: 11px;
  margin: 0;
}

/* Hermetic zero-drift graphic — flex row, no absolute overflow */
.hermetic-graphic {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  max-width: 320px;
  padding: 8px;
}

.hermetic-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  min-width: 64px;
}

.hermetic-node-icon {
  width: 28px;
  height: 28px;
  color: var(--text-muted);
}

.hermetic-node-label {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-align: center;
  line-height: 1.25;
}

.hermetic-flow {
  flex: 1 1 28px;
  min-width: 20px;
  max-width: 48px;
  height: 8px;
  display: flex;
  align-items: center;
}

.hermetic-flow svg {
  width: 100%;
  height: 8px;
  overflow: visible;
}

.hermetic-flow line {
  stroke-width: 2;
}

.hermetic-center-cube {
  position: relative;
  width: 56px;
  min-height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  animation: float-cube 3s ease-in-out infinite;
  flex: 0 0 auto;
}

.hermetic-hash {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-color);
  background: var(--bg-color);
  padding: 2px 6px;
  border: 1px solid var(--accent-muted);
  border-radius: 4px;
  white-space: nowrap;
}

@keyframes float-cube {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* CLI terminal emulator styles */
.cli-terminal {
  width: 90%;
  height: 168px;
  background-color: #010301;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.65);
  font-family: var(--font-mono);
}

.cli-header {
  height: 24px;
  background: #080808;
  border-bottom: 1px solid #141414;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 5px;
}

.cli-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.cli-dot.red { background-color: #ff5f56; }
.cli-dot.yellow { background-color: #ffbd2e; }
.cli-dot.green { background-color: #27c93f; }

.cli-title {
  margin-left: auto;
  margin-right: auto;
  font-size: 9px;
  color: var(--text-muted);
  opacity: 0.7;
}

.cli-body {
  padding: 12px 14px;
  font-size: 12px;
  line-height: 1.55;
  color: var(--text-color);
}

.cli-line {
  opacity: 0;
  transition: opacity 0.25s var(--ease-out);
}

.cli-line.is-on {
  opacity: 1;
}

.cli-muted {
  color: var(--text-muted);
  font-size: 11.5px;
  margin-top: 2px;
}

.cli-prompt {
  color: var(--accent);
}

.cli-success {
  color: var(--accent);
  font-weight: 600;
  margin-top: 8px;
  font-size: 12px;
}

@media (max-width: 1100px) {
  .unified-features-box {
    grid-template-columns: 1fr;
  }
  .feature-column {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  .feature-column:last-child {
    border-bottom: none;
  }
}

@media (max-width: 992px) {
  .unified-features-box {
    grid-template-columns: 1fr;
  }
}

.animated-nix-line {
  stroke: var(--accent);
  stroke-dasharray: 6 4;
  animation: nix-flow 1.5s linear infinite;
}

.animated-nix-line.purple-flow {
  stroke: var(--accent-alt);
  stroke-dasharray: 6 4;
  animation: nix-flow 1.5s linear infinite;
}

@keyframes nix-flow {
  from {
    stroke-dashoffset: 20;
  }
  to {
    stroke-dashoffset: 0;
  }
}
`

const BOKEH_OUTER = [
	{
		logo: logoDocker,
		left: '10%',
		top: '18%',
		scale: 0.95,
		opacity: 0.38,
		blur: '1.5px',
		rotate: '-12deg',
		animationName: 'float-slow-1',
		duration: '14s',
		delay: '0s'
	},
	{
		logo: logoRust,
		left: '22%',
		top: '72%',
		scale: 1.1,
		opacity: 0.42,
		blur: '0.5px',
		rotate: '14deg',
		animationName: 'float-slow-2',
		duration: '16s',
		delay: '-3s'
	},
	{
		logo: logoGo,
		left: '80%',
		top: '16%',
		scale: 1.0,
		opacity: 0.4,
		blur: '1px',
		rotate: '-16deg',
		animationName: 'float-slow-3',
		duration: '15s',
		delay: '-2s'
	},
	{
		logo: logoLinux,
		left: '88%',
		top: '70%',
		scale: 0.92,
		opacity: 0.36,
		blur: '1.5px',
		rotate: '10deg',
		animationName: 'float-slow-1',
		duration: '18s',
		delay: '-7s'
	},
	{
		logo: logoK8s,
		left: '6%',
		top: '48%',
		scale: 0.85,
		opacity: 0.32,
		blur: '2px',
		rotate: '8deg',
		animationName: 'float-slow-2',
		duration: '17s',
		delay: '-5s'
	},
	{
		logo: logoReact,
		left: '94%',
		top: '40%',
		scale: 0.9,
		opacity: 0.34,
		blur: '1px',
		rotate: '-8deg',
		animationName: 'float-slow-3',
		duration: '13s',
		delay: '-4s'
	},
	{
		logo: logoPython,
		left: '18%',
		top: '8%',
		scale: 0.78,
		opacity: 0.28,
		blur: '2.5px',
		rotate: '18deg',
		animationName: 'float-slow-1',
		duration: '19s',
		delay: '-9s'
	},
	{
		logo: logoNginx,
		left: '70%',
		top: '86%',
		scale: 0.82,
		opacity: 0.3,
		blur: '2px',
		rotate: '-6deg',
		animationName: 'float-slow-2',
		duration: '15s',
		delay: '-1s'
	}
]

const BOKEH_INNER = [
	{
		logo: logoNixos,
		left: '38%',
		top: '22%',
		scale: 0.75,
		opacity: 0.26,
		blur: '2px',
		rotate: '-10deg',
		animationName: 'float-slow-3',
		duration: '12s',
		delay: '-2s'
	},
	{
		logo: logoPostgres,
		left: '62%',
		top: '28%',
		scale: 0.7,
		opacity: 0.24,
		blur: '2.5px',
		rotate: '12deg',
		animationName: 'float-slow-1',
		duration: '14s',
		delay: '-6s'
	},
	{
		logo: logoGit,
		left: '48%',
		top: '78%',
		scale: 0.8,
		opacity: 0.28,
		blur: '1.5px',
		rotate: '-4deg',
		animationName: 'float-slow-2',
		duration: '13s',
		delay: '-3s'
	},
	{
		logo: logoNode,
		left: '28%',
		top: '58%',
		scale: 0.72,
		opacity: 0.22,
		blur: '3px',
		rotate: '20deg',
		animationName: 'float-slow-3',
		duration: '16s',
		delay: '-8s'
	},
	{
		logo: logoTs,
		left: '72%',
		top: '55%',
		scale: 0.68,
		opacity: 0.24,
		blur: '2px',
		rotate: '-14deg',
		animationName: 'float-slow-1',
		duration: '11s',
		delay: '-1s'
	},
	{
		logo: logoRedis,
		left: '55%',
		top: '12%',
		scale: 0.65,
		opacity: 0.2,
		blur: '3px',
		rotate: '6deg',
		animationName: 'float-slow-2',
		duration: '15s',
		delay: '-5s'
	},
	{
		logo: logoWasm,
		left: '35%',
		top: '40%',
		scale: 0.6,
		opacity: 0.18,
		blur: '3.5px',
		rotate: '-18deg',
		animationName: 'float-slow-3',
		duration: '17s',
		delay: '-10s'
	},
	{
		logo: logoTerraform,
		left: '65%',
		top: '68%',
		scale: 0.7,
		opacity: 0.22,
		blur: '2.5px',
		rotate: '8deg',
		animationName: 'float-slow-1',
		duration: '14s',
		delay: '-4s'
	}
]

const VIDEO_SOURCES = [
	{
		id: 'cloud-night',
		name: 'Starlit Sky',
		url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'
	},
	{
		id: 'navy-ether',
		name: 'Cosmic Ether',
		url: '/videos/hero-alternate.mp4'
	}
]

export default function PierreLanding() {
	const [activeRuntime, setActiveRuntime] = React.useState('container')
	const [ctaWaitlist, setCtaWaitlist] = React.useState({ state: 'idle', message: '', email: '' })
	const [ctaInView, setCtaInView] = React.useState(false)
	const [videoIndex, setVideoIndex] = React.useState(0)
	const ctaSectionRef = React.useRef(null)

	React.useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)')
		if (media.matches) return
		const runtimeInterval = setInterval(() => {
			setActiveRuntime((prev) => (prev === 'container' ? 'microvm' : 'container'))
		}, 3000)
		return () => clearInterval(runtimeInterval)
	}, [])

	React.useEffect(() => {
		const el = ctaSectionRef.current
		if (!el || typeof IntersectionObserver === 'undefined') return
		const io = new IntersectionObserver(([entry]) => setCtaInView(entry.isIntersecting), {
			rootMargin: '80px',
			threshold: 0.08
		})
		io.observe(el)
		return () => io.disconnect()
	}, [])

	const submitWaitlist = (email, setState) => {
		const value = String(email || '').trim()
		if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setState({
				state: 'error',
				message: 'Enter a valid email to join the waitlist.',
				email: value
			})
			return
		}
		console.log('Waitlist signup:', value)
		setState({
			state: 'success',
			message: "You're on the list. We'll be in touch.",
			email: value
		})
	}

	return (
		<div className="pierre-page">
			<style>{CSS}</style>

			{/* Single-Page Hero Section with Fullscreen Video Background */}
			<div className="relative min-h-screen w-full overflow-hidden bg-[hsl(201_100%_13%)] flex flex-col justify-between" id="top">
				{/* Video Background */}
				<video
					key={VIDEO_SOURCES[videoIndex].id}
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 w-full h-full object-cover z-0"
					src={VIDEO_SOURCES[videoIndex].url}
				/>

				{/* Glassmorphic Navigation Bar */}
				<nav className="relative z-10 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
					<a
						href="#top"
						className="text-3xl tracking-tight text-white flex items-center transition-opacity hover:opacity-90"
						style={{ fontFamily: "'Instrument Serif', serif", color: '#ffffff' }}
					>
						Russel<sup className="text-xs ml-0.5" style={{ color: '#ffffff' }}>®</sup>
					</a>

					<div className="hidden md:flex items-center gap-8 text-sm">
						<a href="#top" className="text-foreground font-medium transition-colors">
							Home
						</a>
						<a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
							Studio
						</a>
						<a href="#benchmarks" className="text-muted-foreground hover:text-foreground transition-colors">
							About
						</a>
						<a href="/why" className="text-muted-foreground hover:text-foreground transition-colors">
							Journal
						</a>
						<a href="#early-access" className="text-muted-foreground hover:text-foreground transition-colors">
							Reach Us
						</a>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={() => setVideoIndex((prev) => (prev + 1) % VIDEO_SOURCES.length)}
							className="liquid-glass rounded-full px-3.5 py-2 text-xs text-foreground/90 hover:text-foreground hover:scale-[1.03] transition-transform cursor-pointer flex items-center gap-1.5"
							title="Switch hero background video"
						>
							<span className="text-sky-400">✦</span> Atmosphere: {VIDEO_SOURCES[videoIndex].name}
						</button>

						<button
							onClick={() =>
								document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
							}
							className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
						>
							Begin Journey
						</button>
					</div>
				</nav>

				{/* Hero Content */}
				<div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] my-auto max-w-7xl mx-auto">
					<h1
						className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						Where <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
						<em className="not-italic text-muted-foreground">through the silence.</em>
					</h1>

					<p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
						We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
					</p>

					<button
						onClick={() =>
							document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
						}
						className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2"
					>
						Begin Journey
					</button>
				</div>
			</div>

			{/* Features Cards Grid (Bring your own sub layout) */}
			<section className="features-section" id="features">
				<div className="section-inner">
					<div className="features-header">
						<h2 className="features-title">One Orchestrator, Any Isolation Boundary</h2>
						<p className="features-desc">
							Dual engine runtimes. Containers for speed. MicroVMs for hardware-enforced isolation.
							One orchestrator manages both — switch runtimes with a single config line.
						</p>
					</div>

					<div className="unified-features-box">
						{/* Column 1: Dual engine runtimes */}
						<div className="feature-column">
							<div
								className="feature-illustration-container feature-illustration-container--runtime"
								aria-hidden="true"
							>
								<div className="runtime-compare-graphic">
									<div
										className={`runtime-card-sub ${activeRuntime === 'container' ? 'active container-active' : ''}`}
									>
										<div className="runtime-card-sub-title">CONTAINER</div>
										<Box className="runtime-lucide" strokeWidth={1.75} />
										<span className="runtime-card-sub-label">Podman</span>
									</div>
									<div
										className={`runtime-card-sub ${activeRuntime === 'microvm' ? 'active microvm-active' : ''}`}
									>
										<div className="runtime-card-sub-title">MICROVM</div>
										<Cpu className="runtime-lucide" strokeWidth={1.75} />
										<span className="runtime-card-sub-label">KVM Engine</span>
									</div>
								</div>
							</div>
							<h3 className="feature-column-title">Dual engine runtimes</h3>
							<div className="feature-engine-list">
								<div className="feature-engine-block">
									<div className="feature-engine-head">
										<span className="feature-engine-name">Container Engine</span>
										<code className="feature-card-cmd">runtime = &quot;container&quot;</code>
									</div>
									<p className="feature-column-desc">
										Lightweight sandboxing via Podman. Perfect for fast local iteration, developer
										setups, and staging environments.
									</p>
								</div>
								<div className="feature-engine-block is-split">
									<div className="feature-engine-head">
										<span className="feature-engine-name">microVM Engine</span>
										<code className="feature-card-cmd">runtime = &quot;microvm&quot;</code>
									</div>
									<p className="feature-column-desc">
										Hardware-isolated virtualization via KVM microVMs. Secure isolation without
										guest OS kernel overhead.
									</p>
								</div>
							</div>
						</div>

						{/* Column 2: Deterministic builds */}
						<div className="feature-column">
							<div
								className="feature-illustration-container feature-illustration-container--circuit"
								aria-hidden="true"
							>
								<CircuitBoard
									variant="dark"
									nodes={[
										{
											id: 'dev',
											x: 45,
											y: 80,
											label: 'Dev Box',
											icon: <Terminal className="h-4 w-4 text-neutral-300" />,
											status: 'active',
											size: 'sm'
										},
										{
											id: 'nix',
											x: 150,
											y: 80,
											label: 'sha256-f83a…',
											icon: <PackageCheck className="h-4 w-4 text-emerald-400" />,
											status: 'processing',
											size: 'md'
										},
										{
											id: 'prod',
											x: 255,
											y: 80,
											label: 'Prod Node',
											icon: <Server className="h-4 w-4 text-neutral-300" />,
											status: 'active',
											size: 'sm'
										}
									]}
									connections={[
										{ from: 'dev', to: 'nix', animated: true, pulseColor: '#a855f7' },
										{ from: 'nix', to: 'prod', animated: true, pulseColor: '#10b981' }
									]}
									width={300}
									height={160}
									pulseSpeed={2}
								/>
							</div>
							<h3 className="feature-column-title">Deterministic builds</h3>
							<div className="feature-engine-list">
								<p className="feature-column-desc">
									Content-addressed zero-drift packages. Strict environment isolation guarantees
									that the exact same bits build and run identically on your machine and production.
								</p>
							</div>
						</div>

						{/* Column 3: Zero-downtime hot swaps */}
						<div className="feature-column">
							<div
								className="feature-illustration-container feature-illustration-container--circuit"
								aria-hidden="true"
							>
								<ZeroDowntimeSwapDiagram />
							</div>
							<h3 className="feature-column-title">Zero-downtime hot swaps</h3>
							<div className="feature-engine-list">
								<p className="feature-column-desc">
									Seamlessly pivot live workloads from container to microVM (or deploy v2 updates)
									with zero dropped connections and instant background port re-routing.
								</p>
							</div>
						</div>
					</div>

				</div>
			</section>

			{/* Benchmarks Section */}
			<section className="bench-section" id="benchmarks">
				<div className="bench-text-col bench-text-col--above-rps">
					<h2>Same performance. Simpler stack</h2>
				</div>
				<div className="bench-empirical-card">
					<div className="bench-empirical-titlebar">
						<div className="bench-empirical-dots">
							<span className="bench-empirical-dot red" />
							<span className="bench-empirical-dot yellow" />
							<span className="bench-empirical-dot green" />
						</div>
						<span className="bench-empirical-title">benchmarks/rps-tradeoffs.md</span>
					</div>
					<div className="bench-empirical-body">
						<p className="bench-empirical-kicker">Runtime throughput</p>
						<h4>Measured tradeoffs (Go basic-http, 30s @ 50 concurrent)</h4>
						<p className="bench-empirical-sub">
							NixOS host, same workload. Container path tracks stock Podman; microVM trades some
							throughput and memory for a hardware isolation wall.
						</p>
						<div className="bench-empirical-table-wrap">
							<table className="bench-empirical-table">
								<thead>
									<tr>
										<th>Scenario</th>
										<th className="col-metric">Russel microVM</th>
										<th className="col-metric">Russel container</th>
										<th className="col-metric">Raw Podman</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1 host CPU capped</td>
										<td className="col-metric">~15–35k RPS</td>
										<td className="col-metric">~8k RPS</td>
										<td className="col-metric">~8k RPS</td>
									</tr>
									<tr>
										<td>Uncapped, 1 guest vCPU</td>
										<td className="col-metric">~32k RPS</td>
										<td className="col-metric">~36k RPS</td>
										<td className="col-metric">~37k RPS</td>
									</tr>
									<tr>
										<td>Uncapped, 2 guest vCPUs</td>
										<td className="col-metric">~40k RPS (p99 ~4.5ms)</td>
										<td className="col-metric">~37k RPS (p99 ~2.8ms)</td>
										<td className="col-metric">~39k RPS (p99 ~2.8ms)</td>
									</tr>
									<tr>
										<td>Host memory overhead</td>
										<td className="col-metric">~190 MiB</td>
										<td className="col-metric">~16 MiB</td>
										<td className="col-metric">~15 MiB</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="bench-text-col bench-text-col--below-rps">
					<h2>Measurably faster. Radically simpler</h2>
				</div>
				<div className="bench-visual-col">
					<AnimatedCardStack />
				</div>
				<p className="bench-footnote">
					Warm run benchmarks across 7 test workloads (HTTP server, env-config, hello-rust,
					shortlink, static site, filebrowser). Russel container vs Russel microVM vs Podman
					baseline.
				</p>
			</section>

			{/* Centered CTA Section with Orbiting Logos */}
			<section className="centered-cta-section" id="early-access" ref={ctaSectionRef}>
				{/* Dual counter-rotating tech fields — animate while in view */}
				<div
					className={`scattered-bg-container${ctaInView ? ' is-active' : ''}`}
					aria-hidden="true"
				>
					<div className="scattered-bg-ring">
						{BOKEH_OUTER.map((icon, idx) => (
							<div
								key={`o-${idx}`}
								className="scattered-icon"
								style={{
									left: icon.left,
									top: icon.top,
									opacity: icon.opacity,
									filter: `blur(${icon.blur})`,
									animationName: icon.animationName,
									animationDuration: icon.duration,
									animationDelay: icon.delay,
									animationPlayState: ctaInView ? 'running' : 'paused',
									'--base-scale': icon.scale,
									'--base-rotation': icon.rotate
								}}
							>
								<img
									src={icon.logo}
									alt=""
									loading="lazy"
									decoding="async"
									width="36"
									height="36"
								/>
							</div>
						))}
					</div>
					<div className="scattered-bg-ring scattered-bg-ring--inner">
						{BOKEH_INNER.map((icon, idx) => (
							<div
								key={`i-${idx}`}
								className="scattered-icon"
								style={{
									left: icon.left,
									top: icon.top,
									opacity: icon.opacity,
									filter: `blur(${icon.blur})`,
									animationName: icon.animationName,
									animationDuration: icon.duration,
									animationDelay: icon.delay,
									animationPlayState: ctaInView ? 'running' : 'paused',
									'--base-scale': icon.scale,
									'--base-rotation': icon.rotate
								}}
							>
								<img
									src={icon.logo}
									alt=""
									loading="lazy"
									decoding="async"
									width="32"
									height="32"
								/>
							</div>
						))}
					</div>
				</div>

				<div className="cta-content-wrapper">
					<div className="cta-logo">
						<svg viewBox="0 0 32 32" aria-hidden="true">
							<rect
								x="2"
								y="2"
								width="28"
								height="28"
								rx="7"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<rect x="12" y="12" width="8" height="8" rx="1.5" fill="currentColor" />
							<path
								d="M16 2v6M16 24v6M2 16h6M24 16h6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>

					<h2 className="cta-title">
						Deploy without the
						<br />
						runtime trade-offs.
					</h2>

					<p className="cta-subtitle">
						One workflow for Wasm, containers, and microVMs. Get early access to the infrastructure
						built for speed, isolation, and control.
					</p>

					<div className="cta-tags">
						<span>Fast Boots</span>
						<span className="divider">·</span>
						<span>Reproducible Builds</span>
						<span className="divider">·</span>
						<span>KVM Isolation</span>
					</div>

					<form
						className="cta-form"
						onSubmit={(e) => {
							e.preventDefault()
							const data = new FormData(e.currentTarget)
							submitWaitlist(data.get('email'), setCtaWaitlist)
						}}
						noValidate
					>
						<div className="cta-input-bar">
							<input
								type="email"
								name="email"
								placeholder="you@domain.com"
								autoComplete="email"
								aria-label="Email for waitlist"
								value={ctaWaitlist.email}
								onChange={(e) =>
									setCtaWaitlist((prev) => ({
										...prev,
										email: e.target.value,
										state: prev.state === 'success' ? 'idle' : prev.state,
										message: prev.state === 'success' ? '' : prev.message
									}))
								}
								disabled={ctaWaitlist.state === 'success'}
								required
							/>
							<button
								type="submit"
								className="cta-submit-btn"
								disabled={ctaWaitlist.state === 'success'}
							>
								{ctaWaitlist.state === 'success' ? 'Joined' : 'Join waitlist'}
							</button>
						</div>
						<p
							className="cta-form-note"
							data-state={ctaWaitlist.state}
							role={ctaWaitlist.state === 'error' ? 'alert' : 'status'}
							aria-live="polite"
						>
							{ctaWaitlist.message || 'No spam. Product updates only.'}
						</p>
					</form>
				</div>
			</section>
		</div>
	)
}
