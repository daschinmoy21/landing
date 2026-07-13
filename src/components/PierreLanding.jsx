import React from 'react';
import AsciiBackground from './AsciiBackground.jsx';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

:root {
  --bg-color: #040803;
  --bg-alt: #040803;
  --text-color: oklch(0.90 0.008 145);
  --text-muted: oklch(0.58 0.020 145);
  --text-faint: oklch(0.36 0.015 145);
  --border-color: oklch(0.11 0.022 145);
  --border-subtle: oklch(0.08 0.015 145);
  --card-bg: #0a1405;
  --card-hover: oklch(0.13 0.030 145);
  --accent: oklch(0.65 0.15 145);
  --accent-soft: oklch(0.72 0.11 145);
  --accent-muted: oklch(0.38 0.06 145);
  --accent-glow: oklch(0.65 0.15 145 / 0.08);
  --accent-alt: oklch(0.60 0.18 310);
  --accent-alt-soft: oklch(0.70 0.12 310);
  --accent-alt-muted: oklch(0.38 0.08 310);
  --accent-alt-glow: oklch(0.60 0.18 310 / 0.08);
  --success: oklch(0.65 0.15 145);
  --error: oklch(0.50 0.14 25);
  --focus-ring: var(--accent);
  --selection-bg: oklch(0.68 0.16 145 / 0.2);
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Inter', sans-serif;
}

.pierre-page {
  box-sizing: border-box;
  background-color: #040803;
  color: var(--text-color);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  z-index: 1;
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

/* Ensure all page content sections layer on top of the fixed background */
.hero-section-grid,
.main-header,
.section-grid,
.features-section,
.config-showcase-section,
.system-design-section,
.footer-section {
  position: relative;
  z-index: 2;
}

.pierre-page * {
  box-sizing: border-box;
}

/* Banner / Ticker */
.ticker-banner {
  border-bottom: 1px solid var(--border-color);
  padding: 10px 48px;
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-muted);
  background-color: var(--bg-alt);
  text-align: center;
}

.ticker-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

/* Header */
.main-header {
  position: sticky;
  top: 0;
  background-color: #040803;
  backdrop-filter: blur(8px);
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 24px;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.header-logo-text {
  display: flex;
  flex-direction: column;
  font-family: var(--font-mono);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

@media (max-width: 768px) {
  .header-right {
    flex-wrap: wrap;
    gap: 12px;
  }
}

.header-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 11px;
  font-family: var(--font-mono);
  transition: color 0.2s ease;
}

.header-link:hover {
  color: var(--accent);
}

/* Content width containment */
.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

/* Sections layout */
.section-divider-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--text-faint);
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-alt);
  font-weight: 600;
}

.section-divider-label-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
}

/* Hero Custom Layout */
.hero-section-grid {
  display: block;
  border-bottom: 1px solid var(--border-color);
  min-height: min(760px, calc(100vh - 92px));
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: #0a1206;
}

.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 48px 42px;
  position: relative;
  min-height: inherit;
}

@media (max-width: 992px) {
  .hero-section-grid {
    min-height: auto;
  }
  .hero-inner {
    padding: 48px 24px;
  }
}

.hero-text-card {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 500px;
  max-width: 480px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0;
  text-align: left;
}

@media (max-width: 768px) {
  .hero-text-card {
    min-height: 380px;
    max-width: 100%;
    padding: 24px 0;
  }
}

.hero-bench-card {
  padding: 24px 0;
  width: 100%;
  max-width: 480px;
  text-align: left;
}

@media (max-width: 768px) {
  .hero-bench-card {
    padding: 24px 0;
  }
}

.hero-bench-col {
  position: absolute;
  right: 48px;
  bottom: 42px;
  z-index: 2;
  width: min(40%, 480px);
  display: flex;
  justify-content: center;
}

@media (max-width: 992px) {
  .hero-bench-col {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    margin: 28px auto 0;
  }
}

.section-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 992px) {
  .section-grid {
    grid-template-columns: 1fr;
  }
}

.col-left {
  padding: 64px 48px;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 992px) {
  .col-left {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 48px 24px;
  }
}

.col-right {
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgba(255, 255, 255, 0.01);
}

@media (max-width: 992px) {
  .col-right {
    padding: 48px 24px;
  }
}

/* Hero elements */
h1.hero-title {
  font-family: var(--font-mono);
  font-size: clamp(28px, 3.2vw, 46px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.06em;
  margin: 0 0 22px;
  color: var(--text-color);
  text-shadow: 0 0 22px rgba(255, 255, 255, 0.18);
}

p.hero-subtitle {
  font-size: 14px;
  color: rgba(238, 248, 239, 0.75);
  line-height: 1.7;
  margin: 0 0 30px;
  max-width: 44ch;
}

.cta-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

@media (max-width: 480px) {
  .cta-group {
    flex-direction: column;
    align-items: stretch;
  }
}

.btn {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 13px;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.btn-primary {
  background: rgba(237, 255, 239, 0.92);
  color: #050505;
  border: 1px solid rgba(237, 255, 239, 0.92);
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--text-color);
}

.btn-secondary {
  background-color: rgba(0, 0, 0, 0.38);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.38);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
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
  font-size: 9px;
  color: var(--text-faint);
  letter-spacing: 0.05em;
  margin-left: 4px;
}

.bench-card-body {
  padding: 20px 24px 24px;
}

.bench-card h4 {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-color);
}

.bench-card .sub {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
  margin-bottom: 20px;
}

.bar-row {
  margin-bottom: 16px;
}

.bar-row .lbl {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  margin-bottom: 6px;
}

.bar-row .lbl .name {
  color: var(--text-muted);
}

.bar-row .lbl .t {
  color: var(--text-color);
  font-weight: bold;
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
}

.bar-fill.win {
  background-color: var(--accent);
  box-shadow: 0 0 10px var(--accent-glow);
}

.bar-fill.lose {
  background-color: var(--text-faint);
}

.hero-bench-card h4 {
  margin: 0 0 8px;
  color: var(--text-color);
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero-bench-card .sub {
  margin-bottom: 24px;
  color: rgba(238, 248, 239, 0.55);
  font-family: var(--font-mono);
  font-size: 10px;
}

/* Features Grid */
.features-section {
  padding: 72px 48px;
  border-bottom: 1px solid var(--border-color);
  background-color: transparent;
}

@media (max-width: 768px) {
  .features-section {
    padding: 48px 24px;
  }
}

.features-header {
  max-width: 650px;
  margin-bottom: 48px;
}

.features-subtitle {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.features-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.15;
  max-width: 24ch;
}

p.features-desc {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0 0 24px 0;
  max-width: 62ch;
  line-height: 1.65;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
}

@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 28px 24px 24px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.feature-card:nth-child(1) { border-left: 2px solid var(--accent); }
.feature-card:nth-child(3) { border-left: 2px solid var(--accent-muted); }

.feature-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-glow);
}

.feature-card-icon {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-card-icon-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent);
}

.feature-card:nth-child(3) .feature-card-icon-dot,
.feature-card:nth-child(4) .feature-card-icon-dot {
  background-color: var(--accent-muted);
}

.feature-card-title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 14px;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.feature-card-cmd {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  background: rgba(255, 255, 255, 0.02);
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid var(--border-subtle);
  margin-bottom: 16px;
  width: fit-content;
}

.feature-card-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
  max-width: 50ch;
}

.checkmarks-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 36px;
  justify-content: flex-start;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.check-icon {
  color: var(--accent);
  font-weight: bold;
}

/* Config & Terminal Showcase */
.config-showcase-section {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 992px) {
  .config-showcase-section {
    grid-template-columns: 1fr;
  }
}

.config-col-left {
  padding: 64px 48px;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  background-color: transparent;
}

@media (max-width: 992px) {
  .config-col-left {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 48px 24px;
  }
}

.config-col-right {
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
}

@media (max-width: 992px) {
  .config-col-right {
    padding: 48px 24px;
  }
}

.showcase-card {
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  text-align: left;
}

.showcase-card-header {
  background-color: oklch(0.05 0.020 145);
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.showcase-card-dots {
  display: flex;
  gap: 6px;
}

.showcase-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.showcase-dot.red { background-color: #ff5f56; }
.showcase-dot.yellow { background-color: #ffbd2e; }
.showcase-dot.green { background-color: #27c93f; }

.showcase-card-title {
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.05em;
}

.showcase-card-body {
  padding: 18px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: #a5a5a5;
  line-height: 1.65;
}

.bullet-check-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bullet-check-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.bullet-check-icon {
  margin-top: 2px;
  color: var(--accent);
  flex-shrink: 0;
}

.bullet-check-text {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.5;
}

.bullet-check-text strong {
  color: var(--text-color);
  font-weight: 600;
}

/* Comparison Table Styling */
.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: oklch(0.07 0.025 145);
  margin: 24px 0 0 0;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
  min-width: 600px;
}

.compare-table th, .compare-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
}

.compare-table th {
  color: var(--text-faint);
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.compare-table td.row-title {
  font-weight: 600;
  color: var(--text-color);
}

.compare-table td.highlight-col, .compare-table th.highlight-col {
  background-color: oklch(0.76 0.15 145 / 0.12);
  border-left: 1px solid var(--accent-muted);
  border-right: 1px solid var(--accent-muted);
  border-bottom: 1px solid var(--accent-muted);
}

.compare-table td.highlight-col .table-check {
  color: var(--accent);
}

.compare-table tr:last-child td {
  border-bottom: none;
}

.table-check {
  font-weight: bold;
  color: var(--accent);
}

/* System Design Visual */
.system-design-section {
  padding: 64px 48px;
  border-bottom: 1px solid var(--border-color);
  background-color: transparent;
}

@media (max-width: 768px) {
  .system-design-section {
    padding: 48px 24px;
  }
}

.system-design-container {
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.system-design-svg {
  width: 100%;
  height: auto;
  max-width: 800px;
}

/* Roadmap Grid & Timeline Layout */
.roadmap-container {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  margin-top: 32px;
}

@media (max-width: 992px) {
  .roadmap-container {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

.phases-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
  padding-left: 24px;
}

/* Vertical dashed timeline axis line */
.phases-list::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: repeating-linear-gradient(180deg, var(--border-color), var(--border-color) 4px, transparent 4px, transparent 8px);
}

.phase-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.phase-badge {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  font-size: 0;
  padding: 0;
  display: inline-block;
}

.phase-badge.done {
  background-color: var(--accent-alt);
  border-color: var(--accent-alt);
  box-shadow: 0 0 8px var(--accent-alt-glow);
}

.phase-badge.now {
  background-color: var(--bg-color);
  border-color: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow);
}

.phase-badge.next {
  background-color: var(--bg-color);
  border-color: var(--border-color);
}

.phase-text {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

.phase-header-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.phase-label-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-faint);
}

.phase-label-tag.active {
  color: var(--accent);
}

.roadmap-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.roadmap-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.roadmap-card-icon {
  font-size: 14px;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.roadmap-card-icon.planned {
  color: var(--text-faint);
}

.roadmap-card h4 {
  font-size: 14.5px;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-transform: uppercase;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.roadmap-state {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.05em;
  color: var(--text-faint);
}

.roadmap-state[data-status="active"] {
  color: var(--accent);
}

.roadmap-card p {
  font-size: 13.5px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.55;
}

/* FAQ Layout */
.faq-layout {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 680px;
  margin-top: 32px;
}

.faq-cta-row {
  display: flex;
  gap: 20px;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .faq-cta-row {
    flex-direction: column;
  }
}

.faq-cta-card {
  border: 1px solid var(--accent-muted);
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 24px;
  flex: 1;
}

.faq-cta-card h4 {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  color: var(--text-color);
}

.faq-cta-card p {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 16px 0;
}
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
}

.faq-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--card-bg);
  overflow: hidden;
}

.faq-q {
  width: 100%;
  background: none;
  border: none;
  padding: 16px 20px;
  text-align: left;
  color: var(--text-color);
  font-weight: 600;
  font-size: 13.5px;
  font-family: var(--font-sans);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-q:hover {
  color: var(--accent);
}

.faq-q .ic {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--text-faint);
}

.faq-a {
  padding: 0 20px 16px 20px;
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Footer Section */
.footer-section {
  padding: 64px 48px 32px 48px;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .footer-section {
    padding: 48px 24px 24px 24px;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  align-items: start;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.footer-card {
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.footer-card h4 {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  color: var(--text-color);
}

.footer-card p {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.footer-divider {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 0 0 24px 0;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  margin-bottom: 16px;
}

.footer-link {
  color: var(--text-faint);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent);
}

.footer-separator {
  color: var(--border-color);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
}

@media (max-width: 480px) {
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

/* Custom code highlight classes */
.code-kw { color: #f87171; }
.code-str { color: var(--accent); }
.code-comment { color: var(--text-faint); }
.code-title { color: #60a5fa; }

/* Unified Features Box Redesign */
.unified-features-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background-color: rgba(4, 8, 3, 0.45);
  overflow: hidden;
  margin-top: 32px;
  width: 100%;
}

.feature-column {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  transition: all 0.25s ease;
}

.feature-column:last-child {
  border-right: none;
}

.feature-column:hover {
  background-color: rgba(99, 254, 19, 0.02);
}

.feature-illustration-container {
  height: 220px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  overflow: hidden;
  position: relative;
}

.feature-column-title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.feature-column-desc {
  font-size: 13.5px;
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
}

.runtime-card-sub {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 105px;
  transition: all 0.3s ease;
}

.runtime-card-sub.active.container-active {
  border-color: var(--accent-alt);
  background: var(--accent-alt-glow);
}

.runtime-card-sub.active.microvm-active {
  border-color: var(--accent);
  background: var(--accent-glow);
}

.runtime-card-sub-title {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.05em;
}

/* Hermetic zero-drift graphic styles */
.hermetic-graphic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  position: relative;
}

.hermetic-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

.hermetic-node-icon {
  width: 32px;
  height: 32px;
  color: var(--text-muted);
}

.hermetic-center-cube {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float-cube 3s ease-in-out infinite;
  z-index: 2;
}

@keyframes float-cube {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.hermetic-line {
  position: absolute;
  top: 36%;
  height: 1px;
  background: repeating-linear-gradient(90deg, var(--border-color), var(--border-color) 4px, transparent 4px, transparent 8px);
  width: 40%;
  z-index: 0;
}

.hermetic-line.left {
  left: 10%;
}

.hermetic-line.right {
  right: 10%;
}

/* CLI terminal emulator styles */
.cli-terminal {
  width: 88%;
  height: 160px;
  background-color: #000000;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
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
  padding: 12px;
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--text-color);
}

.cli-prompt {
  color: var(--accent);
}

.cli-success {
  color: var(--accent);
  font-weight: 600;
}

@media (max-width: 992px) {
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
`;

export default function PierreLanding() {
  const [openFaq, setOpenFaq] = React.useState({});
  const [activeRuntime, setActiveRuntime] = React.useState('container');
  const [cliStep, setCliStep] = React.useState(0);

  React.useEffect(() => {
    const runtimeInterval = setInterval(() => {
      setActiveRuntime(prev => prev === 'container' ? 'microvm' : 'container');
    }, 3000);
    return () => clearInterval(runtimeInterval);
  }, []);

  React.useEffect(() => {
    const cliInterval = setInterval(() => {
      setCliStep(prev => {
        if (prev >= 4) {
          return -3; // Wait in terminal reset state for a natural loop delay
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(cliInterval);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="pierre-page">
      <style>{CSS}</style>



      {/* Hero Section */}
      <div className="hero-section-grid" id="top">
        <AsciiBackground />
        <div className="hero-inner">
        
        <div className="hero-text-card">
          <h1 className="hero-title">
            One <span style={{ color: 'var(--accent)' }}>config</span>.<br />
            Two <span style={{ color: 'var(--accent)' }}>runtimes</span>.<br />
            Near-zero <span style={{ color: 'var(--accent)' }}>overhead</span>.
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '15.5px', color: 'rgba(238, 248, 239, 0.85)', lineHeight: '1.7' }}>
            Hot-swap between lightweight Podman containers and hardware-isolated Cloud Hypervisor microVMs with zero downtime.
          </p>
          <div className="cta-group">
            <a href="#early-access" className="btn btn-primary">
              Request early access
            </a>
            <a href="#features" className="btn btn-secondary">
              Explore features
            </a>
          </div>
        </div>

        <div className="hero-bench-col">
          {/* Benchmark Card */}
          <div className="hero-bench-card">
            <div className="bench-card">
              <div className="bench-card-titlebar">
                <div className="bench-card-dots">
                  <div className="bench-card-dot red"></div>
                  <div className="bench-card-dot yellow"></div>
                  <div className="bench-card-dot green"></div>
                </div>
                <div className="bench-card-title">benchmark</div>
              </div>
              <div className="bench-card-body">
                <h4>Static site · cold deploy</h4>
                <div className="sub">build → boot → serve (lower is better)</div>
                <div className="bars">
                  <div className="bar-row">
                    <div className="lbl">
                      <span className="name">Russel (microVM)</span>
                      <span className="t">1.7s</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill win" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                  <div className="bar-row">
                    <div className="lbl">
                      <span className="name">Docker / Podman (best-case)</span>
                      <span className="t">2.7s</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill lose" style={{ width: '27%' }}></div>
                    </div>
                  </div>
                  <div className="bar-row">
                    <div className="lbl">
                      <span className="name">Podman (typical cold start)</span>
                      <span className="t">10.0s</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill lose" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="section-divider-label"><div className="section-divider-label-inner">// 01 // ENGINE FEATURES &amp; INTEGRATIONS</div></div>

      {/* Features Cards Grid (Bring your own sub layout) */}
      <section className="features-section" id="features">
        <div className="section-inner">
        <div className="features-header">
          <div className="features-subtitle">Dual engine runtimes</div>
          <h2 className="features-title">One Orchestrator, Any Isolation Boundary</h2>
        </div>

        <div className="unified-features-box">
          {/* Column 1: Dual engine runtimes */}
          <div className="feature-column">
            <div className="feature-illustration-container">
              <div className="runtime-compare-graphic">
                <div className={`runtime-card-sub ${activeRuntime === 'container' ? 'active container-active' : ''}`} style={{ width: '110px' }}>
                  <div className="runtime-card-sub-title" style={{ color: activeRuntime === 'container' ? 'var(--accent-alt)' : 'var(--text-muted)' }}>CONTAINER</div>
                  <svg style={{ width: '28px', height: '28px', color: activeRuntime === 'container' ? 'var(--accent-alt)' : 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeDasharray="2 2" />
                  </svg>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: activeRuntime === 'container' ? 'var(--accent-alt)' : 'var(--text-faint)' }}>Podman</span>
                </div>
                <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>/</div>
                <div className={`runtime-card-sub ${activeRuntime === 'microvm' ? 'active microvm-active' : ''}`} style={{ width: '110px' }}>
                  <div className="runtime-card-sub-title" style={{ color: activeRuntime === 'microvm' ? 'var(--accent)' : 'var(--text-muted)' }}>MICROVM</div>
                  <svg style={{ width: '28px', height: '28px', color: activeRuntime === 'microvm' ? 'var(--accent)' : 'var(--text-muted)' }} viewBox="0 0 32 32">
                    <rect x="2" y="2" width="28" height="28" rx="7" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="12" y="12" width="8" height="8" rx="1.5" fill="currentColor" />
                    <path d="M16 2v6M16 24v6M2 16h6M24 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: activeRuntime === 'microvm' ? 'var(--accent)' : 'var(--text-faint)', textAlign: 'center', whiteSpace: 'nowrap' }}>Cloud-Hypervisor</span>
                </div>
              </div>
            </div>
            <h3 className="feature-column-title">Dual engine runtimes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', fontWeight: '600' }}>Container Engine</span>
                  <span className="feature-card-cmd" style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px' }}>runtime = "container"</span>
                </div>
                <p className="feature-column-desc">
                  Lightweight sandboxing via Podman. Perfect for fast local iteration, developer setups, and staging environments.
                </p>
              </div>
              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', fontWeight: '600' }}>microVM Engine</span>
                  <span className="feature-card-cmd" style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px' }}>runtime = "microvm"</span>
                </div>
                <p className="feature-column-desc">
                  Hardware-isolated virtualization via KVM and Cloud Hypervisor. Secure isolation without guest OS kernel overhead.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Deterministic builds */}
          <div className="feature-column">
            <div className="feature-illustration-container">
              <div className="hermetic-graphic">
                <div className="hermetic-line left">
                  <svg width="100%" height="4" viewBox="0 0 100 4" fill="none" preserveAspectRatio="none">
                    <line x1="0" y1="2" x2="100" y2="2" className="animated-nix-line purple-flow" strokeWidth="2" />
                  </svg>
                </div>
                <div className="hermetic-line right">
                  <svg width="100%" height="4" viewBox="0 0 100 4" fill="none" preserveAspectRatio="none">
                    <line x1="0" y1="2" x2="100" y2="2" className="animated-nix-line" strokeWidth="2" />
                  </svg>
                </div>
                
                <div className="hermetic-node">
                  <svg className="hermetic-node-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span style={{ fontSize: '9px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>Dev Box</span>
                </div>

                <div className="hermetic-center-cube">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                  </svg>
                  <div style={{ position: 'absolute', fontSize: '8px', fontFamily: 'var(--font-mono)', color: '#fff', bottom: '-12px', background: '#000', padding: '2px 4px', border: '1px solid var(--accent)', borderRadius: '3px', whiteSpace: 'nowrap' }}>
                    sha256-f83a...
                  </div>
                </div>

                <div className="hermetic-node">
                  <svg className="hermetic-node-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="8" rx="2" />
                    <rect x="2" y="12" width="20" height="8" rx="2" />
                    <circle cx="6" cy="8" r="1" fill="currentColor" />
                    <circle cx="6" cy="16" r="1" fill="currentColor" />
                  </svg>
                  <span style={{ fontSize: '9px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>Prod Node</span>
                </div>
              </div>
            </div>
            <h3 className="feature-column-title">Deterministic builds</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="feature-card-cmd" style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px', width: 'fit-content' }}>
                builder = "reproducible"
              </div>
              <p className="feature-column-desc">
                Content-addressed zero-drift packages. Strict environment isolation guarantees that the exact same bits build and run identically on your machine and production.
              </p>
            </div>
          </div>

          {/* Column 3: Russel CLI */}
          <div className="feature-column">
            <div className="feature-illustration-container">
              <div className="cli-terminal">
                <div className="cli-header">
                  <div className="cli-dot red"></div>
                  <div className="cli-dot yellow"></div>
                  <div className="cli-dot green"></div>
                  <div className="cli-title">russel --deploy</div>
                </div>
                <div className="cli-body">
                  <div style={{ opacity: cliStep >= 0 ? 1 : 0, transition: 'opacity 0.15s' }}>
                    <span className="cli-prompt">$</span> russel deploy
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '9.5px', marginTop: '4px', opacity: cliStep >= 1 ? 1 : 0, transition: 'opacity 0.25s' }}>
                    [1/3] Building zero-drift package...
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '9.5px', opacity: cliStep >= 2 ? 1 : 0, transition: 'opacity 0.25s' }}>
                    [2/3] Dispatching runtime: microvm...
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '9.5px', opacity: cliStep >= 3 ? 1 : 0, transition: 'opacity 0.25s' }}>
                    [3/3] Routing port 8080 -&gt; 80
                  </div>
                  <div className="cli-success" style={{ marginTop: '8px', fontSize: '10px', opacity: cliStep >= 4 ? 1 : 0, transition: 'opacity 0.25s' }}>
                    ✓ SUCCESS: Deploy complete in 1.7s
                  </div>
                </div>
              </div>
            </div>
            <h3 className="feature-column-title">Russel CLI</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="feature-card-cmd" style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px', width: 'fit-content' }}>
                russel deploy
              </div>
              <p className="feature-column-desc">
                Single command deployment pipeline. Automates reproducible package build generation, sandbox engine dispatching, and dynamic port routing with zero complex manifests.
              </p>
            </div>
          </div>
        </div>

        <div className="checkmarks-row">
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>No agent daemon bloat</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>One-line switch between runtimes</span>
          </div>
          <div className="check-item">
            <span className="check-icon">✓</span>
            <span>Self-hosted on bare metal or cloud</span>
          </div>
        </div>
        </div>
      </section>

      <div className="section-divider-label"><div className="section-divider-label-inner">// 02 // CONFIGURATION &amp; EXECUTION OUTPUT</div></div>

      {/* Config File and Terminal Showcase (One button to commit layout) */}
      <section className="config-showcase-section">
        <div className="config-col-left">
          {/* Config file container */}
          <div className="showcase-card">
            <div className="showcase-card-header">
              <div className="showcase-card-dots">
                <div className="showcase-dot red"></div>
                <div className="showcase-dot yellow"></div>
                <div className="showcase-dot green"></div>
              </div>
              <span className="showcase-card-title">Russelfile.toml</span>
            </div>
            <div className="showcase-card-body">
              <span className="code-comment"># Russel deployment configuration</span><br />
              <span className="code-kw">[service]</span><br />
              name = <span className="code-str">"api-service"</span><br />
              port = <span className="code-str">8080</span><br />
              <span className="code-kw">runtime = "microvm"</span> <span className="code-comment"># switch to "container" anytime</span><br />
              <br />
              <span className="code-kw">[build]</span><br />
              builder = <span className="code-str">"reproducible"</span><br />
              entrypoint = <span className="code-str">"./target/release/api"</span>
            </div>
          </div>

          {/* Terminal execution container */}
          <div className="showcase-card">
            <div className="showcase-card-header">
              <div className="showcase-card-dots">
                <div className="showcase-dot red"></div>
                <div className="showcase-dot yellow"></div>
                <div className="showcase-dot green"></div>
              </div>
              <span className="showcase-card-title">russel deploy</span>
            </div>
            <div className="showcase-card-body" style={{ color: '#eaeaea' }}>
              <span style={{ color: '#888' }}>$</span> russel deploy --prod<br />
              <span style={{ color: 'var(--accent)' }}>✓</span> artifact built (store/78b3f2a-api-service)<br />
              <span style={{ color: 'var(--accent)' }}>✓</span> booting runtime: microvm (cloud-hypervisor)<br />
              <span style={{ color: 'var(--accent)' }}>✓</span> VM started in 1.74s<br />
              <span style={{ color: 'var(--accent)' }}>✓</span> routing traffic to <span style={{ textDecoration: 'underline' }}>http://10.0.0.42:8880</span>
            </div>
          </div>
        </div>

        <div className="config-col-right">
          <div className="features-subtitle">Zero orchestration overhead</div>
          <h2 className="features-title" style={{ marginTop: '4px', marginBottom: '24px' }}>
            One file to build, run, and isolate.
          </h2>
          <ul className="bullet-check-list">
            <li className="bullet-check-item">
              <span className="bullet-check-icon">✓</span>
              <span className="bullet-check-text">
                <strong>Instant runtime hot-swaps.</strong> Switch from container to microVM without changes to your application code.
              </span>
            </li>
            <li className="bullet-check-item">
              <span className="bullet-check-icon">✓</span>
              <span className="bullet-check-text">
                <strong>Verifiable artifact builds.</strong> Reproducible builds run in clean sandboxes to guarantee no staging-to-prod drift.
              </span>
            </li>
            <li className="bullet-check-item">
              <span className="bullet-check-icon">✓</span>
              <span className="bullet-check-text">
                <strong>Security promotion.</strong> Auto-detect container CVE dependencies on build and promote directly to microVM.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <div className="section-divider-label"><div className="section-divider-label-inner">// 03 // DETAILED CAPABILITIES BENCHMARK</div></div>

      {/* Comparison table section */}
      <section style={{ borderBottom: '1px solid var(--border-color)' }} id="comparison">
        <div className="section-inner" style={{ padding: '64px 48px' }}>
        <div className="features-header" style={{ marginBottom: '24px' }}>
          <div className="features-subtitle">Comparison matrix</div>
          <h2 className="features-title">Where Russel Sits</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: '0 0 24px 0', maxWidth: '700px' }}>
          Russel bridges the gap between simple containers and full hardware virtualization, avoiding complex orchestration frameworks while delivering content-addressed build reproducibility.
        </p>

        <div className="table-container">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Capabilities</th>
                <th className="highlight-col" style={{ color: 'var(--accent)', fontWeight: '700' }}>Russel</th>
                <th>Docker / Podman</th>
                <th>Kubernetes</th>
                <th>AWS Lambda</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-title">Isolation Boundary</td>
                <td className="highlight-col"><span style={{ border: '1px solid var(--accent)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', color: 'var(--accent)' }}>Container OR microVM</span></td>
                <td>Shared Kernel</td>
                <td>Namespaces</td>
                <td>Firecracker VM</td>
              </tr>
              <tr>
                <td className="row-title">Deterministic builds</td>
                <td className="highlight-col"><span className="table-check">✓</span> Nix Build Store</td>
                <td>Layer Drift</td>
                <td>Image Dependent</td>
                <td>Opaque Layering</td>
              </tr>
              <tr>
                <td className="row-title">Self-Hosted / Control</td>
                <td className="highlight-col"><span className="table-check">✓</span> Yes</td>
                <td>Yes</td>
                <td>Complex Cluster</td>
                <td>AWS Lock-in</td>
              </tr>
              <tr>
                <td className="row-title">Cold boot time</td>
                <td className="highlight-col">~1.7s</td>
                <td>2.7s – 10.0s</td>
                <td>Minutes</td>
                <td>~1s (AWS-bound)</td>
              </tr>
              <tr>
                <td className="row-title">CVE Auto-Upgrade</td>
                <td className="highlight-col"><span className="table-check">✓</span> Yes</td>
                <td>Manual rebuild</td>
                <td>Manual rebuild</td>
                <td>AWS Managed</td>
              </tr>
              <tr>
                <td className="row-title">Vendor lock-in</td>
                <td className="highlight-col">None</td>
                <td>Low</td>
                <td>Medium</td>
                <td>High</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </section>

      <div className="section-divider-label"><div className="section-divider-label-inner">// 04 // SYSTEM ARCHITECTURE &amp; ORCHESTRATION</div></div>

      {/* System Architecture (microVM/container + Russel Orchestrator) */}
      <section className="system-design-section" id="architecture">
        <div className="section-inner">
        <div className="features-header">
          <div className="features-subtitle">System Design</div>
          <h2 className="features-title">Dual Runtimes &amp; Orchestration Model</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: '0 0 24px 0', maxWidth: '700px' }}>
          Russel orchestrates deployment workflows by building content-addressed packages, managing node schedules, and deploying either container or KVM-isolated microVM sandboxes onto bare-metal hosts.
        </p>

        <div className="system-design-container">
          <svg className="system-design-svg" viewBox="0 0 800 380" aria-hidden="true">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="2.5" orient="auto">
                <polygon points="0,0 5,2.5 0,5" fill="var(--accent)" />
              </marker>
              <marker id="arrow-muted" markerWidth="8" markerHeight="8" refX="5" refY="2.5" orient="auto">
                <polygon points="0,0 5,2.5 0,5" fill="var(--text-faint)" />
              </marker>
            </defs>

            {/* Client CLI */}
            <rect x="20" y="145" width="160" height="90" rx="8" fill="oklch(0.05 0.020 145)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="100" y="185" textAnchor="middle" fill="var(--text-color)" fontSize="13" fontWeight="700" fontFamily="var(--font-mono)">russel CLI</text>
            <text x="100" y="205" textAnchor="middle" fill="var(--accent)" fontSize="10.5" fontFamily="var(--font-mono)">russel deploy</text>

            {/* Connector CLI -> Orchestrator */}
            <path d="M180 190 L232 190" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="206" y="180" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">Axum API</text>

            {/* Russel Orchestrator (Control Plane) */}
            <rect x="240" y="95" width="240" height="190" rx="8" fill="oklch(0.05 0.020 145)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="360" y="130" textAnchor="middle" fill="var(--text-color)" fontSize="13.5" fontWeight="700" fontFamily="var(--font-mono)">Russel Orchestrator</text>
            <text x="360" y="150" textAnchor="middle" fill="var(--text-faint)" fontSize="10.5" fontFamily="var(--font-sans)">Control Plane / Scheduler</text>
            
            {/* Inner modules of orchestrator */}
            <rect x="255" y="175" width="210" height="85" rx="5" fill="rgba(255,255,255,0.01)" stroke="var(--accent-muted)" strokeWidth="1" />
            <text x="360" y="205" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)">Nix Package Builder</text>
            <text x="360" y="230" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600" fontFamily="var(--font-mono)">Node Registry &amp; State</text>

            {/* Connector Orchestrator -> Container Node */}
            <path d="M480 145 L532 92.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="502" y="110" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">gRPC</text>

            {/* Connector Orchestrator -> microVM Node */}
            <path d="M480 235 L532 287.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="502" y="275" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">gRPC</text>

            {/* Node Host 1 (Container Host) */}
            <rect x="540" y="20" width="240" height="140" rx="8" fill="oklch(0.05 0.020 145)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="660" y="48" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">Node Host A (russel-agent)</text>
            
            {/* Container Engine Branch */}
            <rect x="555" y="68" width="210" height="75" rx="4" fill="rgba(255,255,255,0.01)" stroke="var(--accent-muted)" strokeWidth="1" />
            <text x="660" y="90" textAnchor="middle" fill="var(--text-color)" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">Container Runtime</text>
            <text x="660" y="110" textAnchor="middle" fill="var(--text-faint)" fontSize="9.5" fontFamily="var(--font-mono)">Podman Sandbox</text>
            <text x="660" y="126" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">Shared Host Kernel</text>

            {/* Node Host 2 (microVM Host) */}
            <rect x="540" y="210" width="240" height="145" rx="8" fill="oklch(0.05 0.020 145)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="660" y="238" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">Node Host B (russel-agent)</text>

            {/* microVM Engine Branch */}
            <rect x="555" y="258" width="210" height="82" rx="4" fill="var(--accent-glow)" stroke="var(--accent)" strokeWidth="1" />
            <text x="660" y="280" textAnchor="middle" fill="var(--accent-soft)" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">microVM Runtime</text>
            <text x="660" y="300" textAnchor="middle" fill="var(--text-color)" fontSize="9.5" fontFamily="var(--font-mono)">Cloud Hypervisor + KVM</text>
            <text x="660" y="318" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">Isolated / virtiofsd &amp; socat</text>
          </svg>
        </div>
        </div>
      </section>

      <div className="section-divider-label"><div className="section-divider-label-inner">// 05 // PROJECT PHASES &amp; ROADMAP</div></div>

      {/* Combined Roadmap and Where It's At Section */}
      <section style={{ borderBottom: '1px solid var(--border-color)' }} id="roadmap">
        <div className="section-inner" style={{ padding: '64px 48px' }}>
        <div className="features-header">
          <div className="features-subtitle">Phases &amp; future milestones</div>
          <h2 className="features-title">Roadmap &amp; Project Status</h2>
        </div>

        <div className="roadmap-container">
          {/* Timeline / Where it's at */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', color: 'var(--text-color)' }}>
              // Project Timeline
            </h3>
            <div className="phases-list">
              <div className="phase-item">
                <span className="phase-badge done">Done</span>
                <div className="phase-header-row">
                  <span className="phase-label-tag">// Phase 1</span>
                  <span style={{ fontSize: '11px', color: 'var(--accent-alt)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>(Completed)</span>
                </div>
                <span className="phase-text">
                  Single-node microVM deployments. End-to-end builds boot via Cloud Hypervisor on local hosts.
                </span>
              </div>
              <div className="phase-item">
                <span className="phase-badge now">Active</span>
                <div className="phase-header-row">
                  <span className="phase-label-tag active">// Phase 2</span>
                  <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>(Active)</span>
                </div>
                <span className="phase-text">
                  Adding a Podman container runtime, runtime hot-swaps, and unified configuration.
                </span>
              </div>
              <div className="phase-item">
                <span className="phase-badge next">Planned</span>
                <div className="phase-header-row">
                  <span className="phase-label-tag">// Phase 3</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>(Planned)</span>
                </div>
                <span className="phase-text">
                  Secrets managers, config evolving from TOML to YAML, and multi-node fleet scheduling.
                </span>
              </div>
            </div>
          </div>

          {/* Roadmap Grid */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', color: 'var(--text-color)' }}>
              // Planned Features
            </h3>
            <div className="roadmap-grid">
              <div className="roadmap-card">
                <div className="roadmap-card-icon">✓</div>
                <div>
                  <h4>Dual runtime <span className="roadmap-state" data-status="active">// Active</span></h4>
                  <p>Containers and microVMs managed via a single config line; zero application rebuild overhead.</p>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="roadmap-card-icon planned">•</div>
                <div>
                  <h4>Sealed secrets <span className="roadmap-state">// Planned</span></h4>
                  <p>Encrypted secret variables injection directly to microVM memory, bypassing the build store.</p>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="roadmap-card-icon planned">•</div>
                <div>
                  <h4>CVE dependency pipeline <span className="roadmap-state">// Planned</span></h4>
                  <p>Auto-check package dependencies against vulnerability catalogs and auto-promote to microVM runtime.</p>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="roadmap-card-icon planned">•</div>
                <div>
                  <h4>Multi-node scheduling <span className="roadmap-state">// Planned</span></h4>
                  <p>Orchestrator manages a cluster of nodes, dispatching instances across local servers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <div className="section-divider-label"><div className="section-divider-label-inner">// 06 // FREQUENTLY ASKED QUESTIONS</div></div>

      {/* FAQ and Contact Section */}
      <section style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-inner" style={{ padding: '64px 48px' }}>
        <div className="features-header">
          <div className="features-subtitle">Faq</div>
          <h2 className="features-title">Questions &amp; Answers</h2>
        </div>

        <div className="faq-layout">
          {/* FAQ Accordion */}
          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-q" onClick={() => toggleFaq(0)}>
                Is Russel open-source?
                <span className="ic">{openFaq[0] ? '−' : '+'}</span>
              </button>
              {openFaq[0] && (
                <div className="faq-a">
                  Russel is currently in private beta and is not open source yet. We are actively developing the code, hardening KVM interfaces, and expanding the dual runtime engine. We will open-source the platform under the MIT license when we reach public stability.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button className="faq-q" onClick={() => toggleFaq(1)}>
                How does this differ from Docker?
                <span className="ic">{openFaq[1] ? '−' : '+'}</span>
              </button>
              {openFaq[1] && (
                <div className="faq-a">
                  Docker shares the host OS kernel across all containers. Russel lets you choose: standard container workflows or isolated microVMs running their own KVM-isolated kernel via Cloud Hypervisor. This blocks kernel-level breakouts while booting under 2 seconds.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button className="faq-q" onClick={() => toggleFaq(2)}>
                What are the host requirements?
                <span className="ic">{openFaq[2] ? '−' : '+'}</span>
              </button>
              {openFaq[2] && (
                <div className="faq-a">
                  Any Linux machine supporting KVM virtualization. Host utilities include `cloud-hypervisor`, `virtiofsd` (for file-sharing), `socat` (for socket redirects), and `iptables` for routing. Standard Docker/Podman environments work as fallback.
                </div>
              )}
            </div>
          </div>

          {/* Contact / Newsletter Card */}
          <div className="faq-cta-row">
            <div className="faq-cta-card" id="early-access">
              <h4>Request early access</h4>
              <p>
                Russel is under active private preview. Sign up to participate in early developer trials, or receive launch updates.
              </p>
              <a href="mailto:russel@example.com" className="btn btn-primary" style={{ width: '100%' }}>
                Request Beta Access
              </a>
              <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-faint)', marginTop: '10px' }}>
                russel@example.com
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>


    </div>
  );
}
