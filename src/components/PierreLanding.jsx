import React from 'react'
import AsciiBackground from './AsciiBackground.jsx'
import AnimatedCardStack from './ui/animate-card-animation'
import CurvedInput from './ui/CurvedInput.jsx'
import './ui/SpecularButton.css'
import './ui/CurvedInput.css'

const logo01 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
const logo02 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
const logo03 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
const logo04 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg'
const logo05 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg'
const logo06 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg'
const logo07 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
const logo08 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg'
const logo09 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
const logo10 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wasm/wasm-original.svg'
const logo11 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
const logo12 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg'
const logo13 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg'
const logo14 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg'
const logo15 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg'
const logo16 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg'
const logo17 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
const logo18 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'
const logo19 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg'
const logo20 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg'
const logo21 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg'
const logo22 =
	'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg'
const logo23 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg'
const logo24 = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nixos/nixos-original.svg'

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
  --font-heading: 'Clash-Display', var(--font-sans);
}

.pierre-page h1,
.pierre-page h2,
.pierre-page h3,
.pierre-page h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
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
  padding: 16px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
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
  max-width: 1280px;
  margin: 0 auto;
}

/* Sections layout */
.section-divider-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.05em;
  color: var(--text-faint);
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-alt);
  font-weight: 600;
}

.section-divider-label-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

/* Hero Custom Layout */
.hero-section-grid {
  display: block;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: radial-gradient(circle at 50% 50%, rgba(10, 20, 5, 0.6) 0%, #040803 100%);
}

.hero-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 48px 80px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: min(760px, calc(100vh - 64px));
  justify-content: center;
}

@media (min-width: 993px) {
  .hero-inner {
    padding-top: 140px;
    padding-bottom: 80px;
  }
}

@media (max-width: 992px) {
  .hero-inner {
    padding: 72px 24px 64px;
    min-height: auto;
  }
}

.hero-text-card {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-align: center;
  max-width: 680px;
}

.hero-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  color: var(--accent);
  margin-bottom: 24px;
  background: rgba(10, 20, 5, 0.6);
  box-shadow: 0 0 20px var(--accent-glow);
}

.hero-logo svg {
  width: 26px;
  height: 26px;
}

.hero-logo .pulse {
  fill: var(--accent);
  animation: logo-pulse 2s infinite ease-in-out;
}

@keyframes logo-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
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

.bench-stack {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  grid-template-rows: 430px auto;
  align-items: center;
  gap: 16px;
  width: min(800px, calc(100vw - 96px));
}

.bench-stack-stage {
  min-width: 0;
  width: min(680px, calc(100vw - 224px));
  max-width: none;
  overflow: visible;
  grid-column: 1 / -1;
  grid-row: 1;
}

.bench-stack-controls {
  display: flex;
  justify-content: flex-start;
  position: relative;
  z-index: 20;
  grid-column: 2;
  grid-row: 2;
  margin-top: -6px;
  transform: none;
  align-items: flex-start;
}

@media (max-width: 992px) {
  .bench-stack {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    width: 100%;
  }

  .bench-stack-stage {
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    overflow: hidden;
  }

  .bench-stack-stage > .absolute {
    width: calc(100% - 16px) !important;
  }

  .bench-stack-controls {
    grid-row: 2;
    grid-column: 1;
    justify-content: center;
    transform: none;
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
.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-bottom: 16px;
  font-weight: 700;
}

h1.hero-title {
  font-family: var(--font-sans);
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.035em;
  margin: 0 0 28px;
  color: var(--text-color);
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
}

.hero-gradient-text {
  font-style: italic;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent) 30%, var(--accent-alt) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  text-shadow: 0 0 30px rgba(99, 254, 19, 0.15);
}

.hero-subhead {
  font-size: 16px;
  line-height: 1.55;
  color: rgba(238, 248, 239, 0.85);
  margin-bottom: 26px;
  font-family: var(--font-sans);
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
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 12px;
}

.scroll-down-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
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
  font-size: 13.5px;
  padding: 12px 28px;
  border-radius: 8px; /* Tasteful rounded corners */
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
  font-size: 12px;
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
  align-items: baseline;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
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

.features-desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 56ch;
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
  max-width: 1280px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 640px) {
  .roadmap-grid {
    grid-template-columns: 1fr;
  }
}

.roadmap-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.25s ease;
}

.roadmap-card:hover {
  border-color: var(--text-faint);
  transform: translateY(-1px);
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

.roadmap-card.featured {
  grid-column: span 2;
  border-color: var(--accent);
  background: rgba(99, 254, 19, 0.03);
  box-shadow: 0 0 15px var(--accent-glow);
}

.roadmap-card.featured:hover {
  border-color: var(--accent-soft);
  box-shadow: 0 0 20px rgba(99, 254, 19, 0.15);
}

.roadmap-card.highlight {
  border-color: var(--accent-alt-muted);
  background: rgba(255, 59, 238, 0.02);
}

.roadmap-card.highlight:hover {
  border-color: var(--accent-alt-soft);
}

@media (max-width: 640px) {
  .roadmap-card.featured {
    grid-column: span 1;
  }
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

/* Benchmarks Section */
.bench-section {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 64px;
  align-items: center;
  padding: 72px 48px;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 992px) {
  .bench-section {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px 24px;
  }
}

.bench-text-col h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.bench-text-col p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0 0 24px 0;
  max-width: 48ch;
}

.bench-visual-col {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 430px;
}

/* Centered CTA Section (Image 1) */
.centered-cta-section {
  position: relative;
  padding: 140px 24px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background: radial-gradient(circle at 50% 50%, rgba(10, 20, 15, 0.5) 0%, #000 100%);
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
  background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  color: #111827;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.8);
}

.cta-logo svg {
  width: 32px;
  height: 32px;
}

.cta-logo .pulse {
  fill: #111827;
  animation: logo-pulse 2s infinite ease-in-out;
}

@keyframes logo-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.cta-title {
  font-family: var(--font-mono);
  font-size: clamp(32px, 5.5vw, 56px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 16px;
  text-shadow: 0 0 30px rgba(255,255,255,0.1);
}

.cta-subtitle {
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 54ch;
  margin-bottom: 32px;
  letter-spacing: -0.01em;
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

.cta-input-bar {
  width: 100%;
  max-width: 480px;
  height: 52px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 6px 0 20px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 15px 45px rgba(0,0,0,0.5);
  transition: all 0.25s ease;
  backdrop-filter: blur(16px);
  box-sizing: border-box;
}

.cta-input-bar:focus-within {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 15px 45px rgba(255, 255, 255, 0.05);
}

.cta-input-bar input {
  flex: 1;
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
  color: rgba(255, 255, 255, 0.3);
}

.cta-submit-btn {
  background: #0077ff;
  color: #fff;
  border: none;
  border-radius: 9999px;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 13.5px;
  height: 40px;
  padding: 0 28px;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-sizing: border-box;
}

.cta-submit-btn:hover {
  background-color: #268fff;
  transform: translateY(-1px);
}

.cta-submit-btn:active {
  transform: translateY(0);
}

/* Scattered Bokeh/Blurred Background */
.scattered-bg-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  transform-origin: center;
  animation: cta-orbit 80s linear infinite;
  will-change: transform;
}

.scattered-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px;
  width: 52px;
  height: 52px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%) scale(var(--base-scale, 1)) rotate(var(--base-rotation, 0deg));
  pointer-events: none;
}

.scattered-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Animations for floating icons with translate(-50%, -50%) preserved */
@keyframes float-slow-1 {
  0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(var(--base-rotation)) scale(var(--base-scale)); }
  50% { transform: translate(-50%, -50%) translateY(-12px) rotate(calc(var(--base-rotation) + 3deg)) scale(var(--base-scale)); }
}

@keyframes float-slow-2 {
  0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(var(--base-rotation)) scale(var(--base-scale)); }
  50% { transform: translate(-50%, -50%) translateY(10px) rotate(calc(var(--base-rotation) - 4deg)) scale(var(--base-scale)); }
}

@keyframes float-slow-3 {
  0%, 100% { transform: translate(-50%, -50%) translateX(0) translateY(0) rotate(var(--base-rotation)) scale(var(--base-scale)); }
  50% { transform: translate(-50%, -50%) translateX(-6px) translateY(-8px) rotate(calc(var(--base-rotation) + 2deg)) scale(var(--base-scale)); }
}

/* Let the full backdrop slowly orbit around the CTA while each icon keeps its own drift. */
@keyframes cta-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .scattered-bg-container,
  .scattered-icon,
  .cta-logo .pulse {
    animation: none !important;
  }
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
`

const BOKEH_ICONS = [
	{
		logo: logo01,
		left: '10%',
		top: '15%',
		scale: 0.85,
		blur: '3px',
		opacity: 0.28,
		rotate: '-12deg',
		animationName: 'float-slow-1',
		duration: '14s',
		delay: '0s'
	},
	{
		logo: logo02,
		left: '22%',
		top: '8%',
		scale: 1.15,
		blur: '1px',
		opacity: 0.45,
		rotate: '15deg',
		animationName: 'float-slow-2',
		duration: '18s',
		delay: '-3s'
	},
	{
		logo: logo03,
		left: '32%',
		top: '22%',
		scale: 0.65,
		blur: '5px',
		opacity: 0.18,
		rotate: '-5deg',
		animationName: 'float-slow-3',
		duration: '22s',
		delay: '-7s'
	},
	{
		logo: logo04,
		left: '15%',
		top: '35%',
		scale: 0.95,
		blur: '2px',
		opacity: 0.38,
		rotate: '20deg',
		animationName: 'float-slow-1',
		duration: '16s',
		delay: '-11s'
	},
	{
		logo: logo05,
		left: '50%',
		top: '8%',
		scale: 0.9,
		blur: '3px',
		opacity: 0.32,
		rotate: '-8deg',
		animationName: 'float-slow-2',
		duration: '15s',
		delay: '-2s'
	},
	{
		logo: logo06,
		left: '68%',
		top: '18%',
		scale: 1.2,
		blur: '0.8px',
		opacity: 0.55,
		rotate: '8deg',
		animationName: 'float-slow-3',
		duration: '17s',
		delay: '-5s'
	},
	{
		logo: logo07,
		left: '85%',
		top: '12%',
		scale: 1.0,
		blur: '2px',
		opacity: 0.42,
		rotate: '12deg',
		animationName: 'float-slow-1',
		duration: '19s',
		delay: '-9s'
	},
	{
		logo: logo08,
		left: '76%',
		top: '5%',
		scale: 0.7,
		blur: '4px',
		opacity: 0.22,
		rotate: '-18deg',
		animationName: 'float-slow-2',
		duration: '21s',
		delay: '-13s'
	},
	{
		logo: logo09,
		left: '92%',
		top: '28%',
		scale: 0.8,
		blur: '3px',
		opacity: 0.32,
		rotate: '-10deg',
		animationName: 'float-slow-3',
		duration: '13s',
		delay: '-1s'
	},
	{
		logo: logo10,
		left: '6%',
		top: '48%',
		scale: 1.25,
		blur: '0.5px',
		opacity: 0.52,
		rotate: '-15deg',
		animationName: 'float-slow-1',
		duration: '20s',
		delay: '-6s'
	},
	{
		logo: logo11,
		left: '18%',
		top: '52%',
		scale: 0.6,
		blur: '4.5px',
		opacity: 0.2,
		rotate: '25deg',
		animationName: 'float-slow-2',
		duration: '24s',
		delay: '-10s'
	},
	{
		logo: logo12,
		left: '82%',
		top: '48%',
		scale: 0.75,
		blur: '4px',
		opacity: 0.25,
		rotate: '-20deg',
		animationName: 'float-slow-3',
		duration: '23s',
		delay: '-4s'
	},
	{
		logo: logo13,
		left: '94%',
		top: '55%',
		scale: 1.05,
		blur: '1.5px',
		opacity: 0.48,
		rotate: '14deg',
		animationName: 'float-slow-1',
		duration: '15s',
		delay: '-8s'
	},
	{
		logo: logo14,
		left: '12%',
		top: '72%',
		scale: 0.75,
		blur: '3px',
		opacity: 0.28,
		rotate: '15deg',
		animationName: 'float-slow-2',
		duration: '18s',
		delay: '-12s'
	},
	{
		logo: logo15,
		left: '25%',
		top: '82%',
		scale: 1.15,
		blur: '1px',
		opacity: 0.52,
		rotate: '-8deg',
		animationName: 'float-slow-3',
		duration: '16s',
		delay: '-2s'
	},
	{
		logo: logo16,
		left: '35%',
		top: '70%',
		scale: 0.65,
		blur: '5px',
		opacity: 0.18,
		rotate: '18deg',
		animationName: 'float-slow-1',
		duration: '21s',
		delay: '-7s'
	},
	{
		logo: logo17,
		left: '8%',
		top: '90%',
		scale: 0.95,
		blur: '2px',
		opacity: 0.38,
		rotate: '-25deg',
		animationName: 'float-slow-2',
		duration: '19s',
		delay: '-11s'
	},
	{
		logo: logo18,
		left: '46%',
		top: '92%',
		scale: 1.0,
		blur: '2.5px',
		opacity: 0.35,
		rotate: '12deg',
		animationName: 'float-slow-3',
		duration: '17s',
		delay: '-5s'
	},
	{
		logo: logo19,
		left: '56%',
		top: '88%',
		scale: 0.7,
		blur: '4px',
		opacity: 0.22,
		rotate: '-15deg',
		animationName: 'float-slow-1',
		duration: '15s',
		delay: '-9s'
	},
	{
		logo: logo20,
		left: '68%',
		top: '72%',
		scale: 0.6,
		blur: '4.5px',
		opacity: 0.2,
		rotate: '-5deg',
		animationName: 'float-slow-2',
		duration: '22s',
		delay: '-1s'
	},
	{
		logo: logo21,
		left: '76%',
		top: '85%',
		scale: 1.2,
		blur: '0.8px',
		opacity: 0.58,
		rotate: '20deg',
		animationName: 'float-slow-3',
		duration: '18s',
		delay: '-6s'
	},
	{
		logo: logo22,
		left: '88%',
		top: '74%',
		scale: 0.85,
		blur: '3px',
		opacity: 0.32,
		rotate: '-12deg',
		animationName: 'float-slow-1',
		duration: '16s',
		delay: '-10s'
	},
	{
		logo: logo23,
		left: '84%',
		top: '92%',
		scale: 0.9,
		blur: '2px',
		opacity: 0.42,
		rotate: '15deg',
		animationName: 'float-slow-2',
		duration: '14s',
		delay: '-3s'
	},
	{
		logo: logo24,
		left: '28%',
		top: '6%',
		scale: 0.75,
		blur: '4px',
		opacity: 0.24,
		rotate: '-10deg',
		animationName: 'float-slow-3',
		duration: '20s',
		delay: '-12s'
	}
]

export default function PierreLanding() {
	const [activeRuntime, setActiveRuntime] = React.useState('container')
	const [cliStep, setCliStep] = React.useState(0)

	React.useEffect(() => {
		const runtimeInterval = setInterval(() => {
			setActiveRuntime((prev) => (prev === 'container' ? 'microvm' : 'container'))
		}, 3000)
		return () => clearInterval(runtimeInterval)
	}, [])

	React.useEffect(() => {
		const cliInterval = setInterval(() => {
			setCliStep((prev) => {
				if (prev >= 4) {
					return -3 // Wait in terminal reset state for a natural loop delay
				}
				return prev + 1
			})
		}, 1500)
		return () => clearInterval(cliInterval)
	}, [])

	return (
		<div className="pierre-page">
			<style>{CSS}</style>

			{/* Hero Section */}
			<div className="hero-section-grid" id="top">
				<AsciiBackground />
				<div className="hero-inner">
					<div className="hero-text-card">
						<div className="hero-logo">
							<svg viewBox="0 0 32 32" aria-hidden="true">
								<rect x="2" y="2" width="28" height="28" rx="7" fill="none" stroke="currentColor" strokeWidth="2" />
								<rect x="12" y="12" width="8" height="8" rx="1.5" className="pulse" />
								<path d="M16 2v6M16 24v6M2 16h6M24 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</div>
						<h1 className="hero-title">
							Deploy without limits. Boot <span className="hero-gradient-text">FAST</span>. Stay in
							control.
						</h1>
						<p
							className="hero-subhead"
							style={{
								fontSize: '16px',
								color: 'rgba(238, 248, 239, 0.85)',
								lineHeight: '1.7',
								marginBottom: '32px',
								maxWidth: '520px'
							}}
						>
							One workflow for containers and microVMs. Reproducible builds.
							<br />
							Containers for speed. MicroVMs for security. Managed or self-hosted. Zero drift.
						</p>
						<div style={{ marginBottom: '20px', width: '100%', maxWidth: '480px' }}>
							<CurvedInput
								placeholder="you@domain.com"
								buttonText="Join waitlist"
								theme="dark"
								bend={-28}
								height={60}
								width="100%"
								onSubmit={(email) => console.log('Waitlist signup:', email)}
							/>
						</div>
						<button
							className="scroll-down-btn"
							onClick={() =>
								document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
							}
							aria-label="Scroll to features"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 5v14M5 12l7 7 7-7" />
							</svg>
						</button>
					</div>
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
							<div className="feature-illustration-container">
								<div className="runtime-compare-graphic">
									<div
										className={`runtime-card-sub ${activeRuntime === 'container' ? 'active container-active' : ''}`}
										style={{ width: '110px' }}
									>
										<div
											className="runtime-card-sub-title"
											style={{
												color:
													activeRuntime === 'container' ? 'var(--accent-alt)' : 'var(--text-muted)'
											}}
										>
											CONTAINER
										</div>
										<svg
											style={{
												width: '28px',
												height: '28px',
												color:
													activeRuntime === 'container' ? 'var(--accent-alt)' : 'var(--text-muted)'
											}}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<rect x="3" y="3" width="18" height="18" rx="2" />
											<path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeDasharray="2 2" />
										</svg>
										<span
											style={{
												fontSize: '9px',
												fontFamily: 'var(--font-mono)',
												color:
													activeRuntime === 'container' ? 'var(--accent-alt)' : 'var(--text-faint)'
											}}
										>
											Podman
										</span>
									</div>
									<div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>/</div>
									<div
										className={`runtime-card-sub ${activeRuntime === 'microvm' ? 'active microvm-active' : ''}`}
										style={{ width: '110px' }}
									>
										<div
											className="runtime-card-sub-title"
											style={{
												color: activeRuntime === 'microvm' ? 'var(--accent)' : 'var(--text-muted)'
											}}
										>
											MICROVM
										</div>
										<svg
											style={{
												width: '28px',
												height: '28px',
												color: activeRuntime === 'microvm' ? 'var(--accent)' : 'var(--text-muted)'
											}}
											viewBox="0 0 32 32"
										>
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
										<span
											style={{
												fontSize: '8px',
												fontFamily: 'var(--font-mono)',
												color: activeRuntime === 'microvm' ? 'var(--accent)' : 'var(--text-faint)',
												textAlign: 'center',
												whiteSpace: 'nowrap'
											}}
										>
											Cloud-Hypervisor
										</span>
									</div>
								</div>
							</div>
							<h3 className="feature-column-title">Dual engine runtimes</h3>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
								<div>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											marginBottom: '4px'
										}}
									>
										<span
											style={{
												fontFamily: 'var(--font-mono)',
												fontSize: '11px',
												color: '#fff',
												fontWeight: '600'
											}}
										>
											Container Engine
										</span>
										<span
											className="feature-card-cmd"
											style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px' }}
										>
											runtime = "container"
										</span>
									</div>
									<p className="feature-column-desc">
										Lightweight sandboxing via Podman. Perfect for fast local iteration, developer
										setups, and staging environments.
									</p>
								</div>
								<div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '12px' }}>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											marginBottom: '4px'
										}}
									>
										<span
											style={{
												fontFamily: 'var(--font-mono)',
												fontSize: '11px',
												color: '#fff',
												fontWeight: '600'
											}}
										>
											microVM Engine
										</span>
										<span
											className="feature-card-cmd"
											style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px' }}
										>
											runtime = "microvm"
										</span>
									</div>
									<p className="feature-column-desc">
										Hardware-isolated virtualization via KVM and Cloud Hypervisor. Secure isolation
										without guest OS kernel overhead.
									</p>
								</div>
							</div>
						</div>

						{/* Column 2: Deterministic builds */}
						<div className="feature-column">
							<div className="feature-illustration-container">
								<div className="hermetic-graphic">
									<div className="hermetic-line left">
										<svg
											width="100%"
											height="4"
											viewBox="0 0 100 4"
											fill="none"
											preserveAspectRatio="none"
										>
											<line
												x1="0"
												y1="2"
												x2="100"
												y2="2"
												className="animated-nix-line purple-flow"
												strokeWidth="2"
											/>
										</svg>
									</div>
									<div className="hermetic-line right">
										<svg
											width="100%"
											height="4"
											viewBox="0 0 100 4"
											fill="none"
											preserveAspectRatio="none"
										>
											<line
												x1="0"
												y1="2"
												x2="100"
												y2="2"
												className="animated-nix-line"
												strokeWidth="2"
											/>
										</svg>
									</div>

									<div className="hermetic-node">
										<svg
											className="hermetic-node-icon"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<rect x="2" y="3" width="20" height="14" rx="2" />
											<line x1="8" y1="21" x2="16" y2="21" />
											<line x1="12" y1="17" x2="12" y2="21" />
										</svg>
										<span
											style={{
												fontSize: '9px',
												color: 'var(--text-faint)',
												fontFamily: 'var(--font-mono)',
												marginTop: '4px'
											}}
										>
											Dev Box
										</span>
									</div>

									<div className="hermetic-center-cube">
										<svg
											width="40"
											height="40"
											viewBox="0 0 24 24"
											fill="none"
											stroke="var(--accent)"
											strokeWidth="1.5"
										>
											<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
											<path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
										</svg>
										<div
											style={{
												position: 'absolute',
												fontSize: '8px',
												fontFamily: 'var(--font-mono)',
												color: '#fff',
												bottom: '-12px',
												background: '#000',
												padding: '2px 4px',
												border: '1px solid var(--accent)',
												borderRadius: '3px',
												whiteSpace: 'nowrap'
											}}
										>
											sha256-f83a...
										</div>
									</div>

									<div className="hermetic-node">
										<svg
											className="hermetic-node-icon"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<rect x="2" y="4" width="20" height="8" rx="2" />
											<rect x="2" y="12" width="20" height="8" rx="2" />
											<circle cx="6" cy="8" r="1" fill="currentColor" />
											<circle cx="6" cy="16" r="1" fill="currentColor" />
										</svg>
										<span
											style={{
												fontSize: '9px',
												color: 'var(--text-faint)',
												fontFamily: 'var(--font-mono)',
												marginTop: '4px'
											}}
										>
											Prod Node
										</span>
									</div>
								</div>
							</div>
							<h3 className="feature-column-title">Deterministic builds</h3>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
								<div
									className="feature-card-cmd"
									style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px', width: 'fit-content' }}
								>
									builder = "reproducible"
								</div>
								<p className="feature-column-desc">
									Content-addressed zero-drift packages. Strict environment isolation guarantees
									that the exact same bits build and run identically on your machine and production.
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
										<div
											style={{
												color: 'var(--text-muted)',
												fontSize: '9.5px',
												marginTop: '4px',
												opacity: cliStep >= 1 ? 1 : 0,
												transition: 'opacity 0.25s'
											}}
										>
											[1/3] Building zero-drift package...
										</div>
										<div
											style={{
												color: 'var(--text-muted)',
												fontSize: '9.5px',
												opacity: cliStep >= 2 ? 1 : 0,
												transition: 'opacity 0.25s'
											}}
										>
											[2/3] Dispatching runtime: microvm...
										</div>
										<div
											style={{
												color: 'var(--text-muted)',
												fontSize: '9.5px',
												opacity: cliStep >= 3 ? 1 : 0,
												transition: 'opacity 0.25s'
											}}
										>
											[3/3] Routing port 8080 -&gt; 80
										</div>
										<div
											className="cli-success"
											style={{
												marginTop: '8px',
												fontSize: '10px',
												opacity: cliStep >= 4 ? 1 : 0,
												transition: 'opacity 0.25s'
											}}
										>
											✓ SUCCESS: Deploy complete in 1.7s
										</div>
									</div>
								</div>
							</div>
							<h3 className="feature-column-title">Russel CLI</h3>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
								<div
									className="feature-card-cmd"
									style={{ margin: 0, padding: '2px 6px', fontSize: '9.5px', width: 'fit-content' }}
								>
									russel deploy
								</div>
								<p className="feature-column-desc">
									Single command deployment pipeline. Automates reproducible package build
									generation, sandbox engine dispatching, and dynamic port routing with zero complex
									manifests.
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

			{/* Benchmarks Section */}
			<section className="bench-section" id="benchmarks">
				<div className="bench-text-col">
					<h2>Measurably faster. Radically simpler.</h2>
					<p>
						Russel outperforms vanilla Podman by up to{' '}
						<strong style={{ color: 'var(--accent)' }}>12×</strong> on end-to-end deploy times,
						while adding hardware-enforced microVM isolation and reproducible Nix builds — with zero
						additional configuration overhead.
					</p>
					<p>
						Benchmarks run against identical workloads: HTTP server, static site, and filebrowser.
						Container engine versus microVM engine versus stock Podman — cold start, same hardware.
					</p>
				</div>
				<div className="bench-visual-col">
					<AnimatedCardStack />
				</div>
			</section>

			{/* Centered CTA Section with Orbiting Logos */}
			<section className="centered-cta-section" id="early-access">
				{/* Scattered bokeh background */}
				<div className="scattered-bg-container">
					{BOKEH_ICONS.map((icon, idx) => (
						<div
							key={idx}
							className="scattered-icon"
							style={{
								left: icon.left,
								top: icon.top,
								opacity: icon.opacity,
								filter: `blur(${icon.blur})`,
								animationName: icon.animationName,
								animationDuration: icon.duration,
								animationDelay: icon.delay,
								animationTimingFunction: 'ease-in-out',
								animationIterationCount: 'infinite',
								'--base-scale': icon.scale,
								'--base-rotation': icon.rotate
							}}
						>
							<img src={icon.logo} alt="" />
						</div>
					))}
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
							<rect x="12" y="12" width="8" height="8" rx="1.5" className="pulse" />
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
						onSubmit={(e) => e.preventDefault()}
						style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 0 }}
					>
						<div className="cta-input-bar">
							<input type="email" placeholder="name@email.com" required />
							<button type="submit" className="cta-submit-btn">
								Join waitlist
							</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	)
}
