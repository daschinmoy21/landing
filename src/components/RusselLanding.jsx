import { useEffect, useRef, useState } from 'react'

const CSS = `
:root {
  --paper: #fafafa;
  --paper-warm: #f5f5f5;
  --paper-dark: #f0f0f0;
  --ink: #262626;
  --ink-soft: #434343;
  --ink-mute: #595959;
  --ink-faint: #8c8c8c;
  --coral: #63fe13;
  --coral-tint: color-mix(in oklab, #ffffff, #63fe13 8%);
  --coral-soft: #83ff3b;
  --olive: #218c00;
  --bone: #ffffff;
  --line: #d9d9d9;
  --line-hover: #bfbfbf;
  --line-soft: #f0f0f0;
  --line-faint: #f5f5f5;
  --shadow: 0 30px 60px -30px rgba(38, 38, 38, 0.16);
  --ghost-border: rgba(21, 20, 15, 0.2);
  --font: "Albert Sans", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, sans-serif;
  --maxw: 1200px;
  --maxw-prose: 720px;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}
.russel * { box-sizing: border-box; margin: 0; padding: 0; }
.russel { scroll-behavior: smooth; }
.russel body {
  font-family: var(--font);
  background: var(--paper);
  color: var(--ink);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.russel ::selection { background: var(--coral); color: var(--ink); }
.russel a { color: inherit; text-decoration: none; }
.russel img { max-width: 100%; display: block; }
.russel .wrap { width: 100%; max-width: var(--maxw); margin: 0 auto; padding: 0 32px; }
.russel .prose { max-width: var(--maxw-prose); }
.russel .eyebrow {
  font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ink-mute); font-weight: 600;
  display: inline-flex; align-items: center; gap: 10px;
}
.russel .eyebrow::before {
  content: ""; width: 8px; height: 8px; border-radius: 50%;
  background: var(--coral); box-shadow: 0 0 0 4px var(--coral-tint);
}
.russel h1, .russel h2, .russel h3 { font-weight: 700; letter-spacing: -0.025em; line-height: 1.05; }
.russel .hero h1 { font-size: clamp(48px, 7.2vw, 104px); font-weight: 800; }
.russel .section-head h2 { font-size: clamp(34px, 4.4vw, 56px); font-weight: 700; }
.russel .lead { font-size: clamp(18px, 2.1vw, 23px); color: var(--ink-soft); line-height: 1.5; }
.russel .btn {
  --pad: 13px 22px;
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font); font-weight: 600; font-size: 15px;
  padding: var(--pad); border-radius: 100px; border: 1px solid transparent;
  transition: all 0.18s var(--ease); cursor: pointer; white-space: nowrap;
}
.russel .btn--ink { background: var(--ink); color: var(--bone); }
.russel .btn--ink:hover { background: #000; transform: translateY(-1px); }
.russel .btn--ghost { background: transparent; color: var(--ink); border-color: var(--ghost-border); }
.russel .btn--ghost:hover { border-color: var(--ink); }
.russel .btn--ghost .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--coral); }
.russel .btn .arr { transition: transform 0.18s var(--ease); }
.russel .btn:hover .arr { transform: translateX(3px); }
.russel section { position: relative; }

.russel header.nav {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in oklab, var(--paper) 84%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line-soft);
}
.russel .nav-inner {
  max-width: var(--maxw); margin: 0 auto; padding: 0 32px;
  height: 72px; display: flex; align-items: center; gap: 36px;
}
.russel .brand { display: flex; align-items: center; gap: 9px; font-weight: 800; font-size: 19px; letter-spacing: -0.03em; }
.russel .brand svg { width: 26px; height: 26px; }
.russel .brand .pulse { fill: var(--coral); }
.russel nav.primary { display: flex; align-items: center; gap: 28px; font-size: 15px; font-weight: 500; color: var(--ink-soft); }
.russel nav.primary a:hover { color: var(--ink); }
.russel .nav-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.russel .hamburger { display: none; background: none; border: 1px solid var(--line); border-radius: 10px; padding: 9px 11px; cursor: pointer; }
.russel .hamburger span { display: block; width: 18px; height: 2px; background: var(--ink); margin: 3px 0; }

.russel .hero { padding: 88px 0 64px; }
.russel .hero-top { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
.russel .hero h1 .accent { color: var(--ink); position: relative; }
.russel .hero h1 .accent::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0.06em;
  height: 0.14em; background: var(--coral); border-radius: 2px; z-index: -1; opacity: 0.55;
}
.russel .hero .subhead { margin-top: 22px; max-width: 30ch; }
.russel .hero .subhead strong { font-weight: 700; }
.russel .hero p { margin-top: 20px; max-width: 50ch; color: var(--ink-mute); }
.russel .hero-cta { margin-top: 30px; display: flex; gap: 14px; flex-wrap: wrap; }
.russel .hero-meta { margin-top: 34px; display: flex; gap: 30px; flex-wrap: wrap; }
.russel .hero-meta .item .n { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; }
.russel .hero-meta .item .n .u { color: var(--coral); }
.russel .hero-meta .item .l { font-size: 13px; color: var(--ink-faint); letter-spacing: 0.04em; text-transform: uppercase; }

.russel .terminal {
  background: var(--ink); color: var(--paper); border-radius: 16px;
  overflow: hidden; box-shadow: var(--shadow); font-size: 13.5px; line-height: 1.7;
}
.russel .term-bar { display: flex; align-items: center; gap: 7px; padding: 13px 16px; background: color-mix(in oklab, var(--ink), #000 18%); }
.russel .term-bar i { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
.russel .term-bar i:nth-child(1) { background: #ff5f57; }
.russel .term-bar i:nth-child(2) { background: #febc2e; }
.russel .term-bar i:nth-child(3) { background: #28c840; }
.russel .term-bar .title { margin-left: 8px; color: var(--ink-faint); font-size: 12px; }
.russel .term-body { padding: 20px 22px 24px; font-variant-numeric: tabular-nums; }
.russel .term-body .p { color: var(--coral); }
.russel .term-body .c { color: var(--ink-faint); }
.russel .term-body .ok { color: var(--coral-soft); }
.russel .term-body .o { color: #fff; }

.russel .about { padding: 96px 0; border-top: 1px solid var(--line-soft); }
.russel .about-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; padding: 72px 0; border-top: 1px solid var(--line-faint); }
.russel .about-row:first-of-type { border-top: none; }
.russel .about-row.flip .about-text { order: 2; }
.russel .about-num { font-size: 13px; font-weight: 700; color: var(--coral); letter-spacing: 0.12em; font-variant-numeric: tabular-nums; }
.russel .about-row h3 { font-size: clamp(26px, 3vw, 38px); margin: 14px 0 16px; font-weight: 700; }
.russel .about-row p { color: var(--ink-mute); max-width: 46ch; }
.russel .about-row .tags { margin-top: 18px; display: flex; gap: 8px; flex-wrap: wrap; }
.russel .tag { font-size: 12px; font-weight: 600; padding: 5px 11px; border-radius: 100px; background: var(--paper-warm); color: var(--ink-soft); border: 1px solid var(--line-soft); }
.russel .visual { aspect-ratio: 4 / 3; border-radius: 18px; background: var(--paper-warm); border: 1px solid var(--line-soft); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow); overflow: hidden; }

.russel .section-head { max-width: 60ch; margin-bottom: 56px; }
.russel .section-head .eyebrow { margin-bottom: 18px; }
.russel .section-head h2 { margin-bottom: 16px; }
.russel .section-head p { color: var(--ink-mute); font-size: 18px; }
.russel .pad { padding: 96px 0; border-top: 1px solid var(--line-soft); }

.russel .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 -2px; }
.russel .compare { width: 100%; min-width: 580px; border-collapse: collapse; font-size: 15px; }
.russel .compare th, .russel .compare td { padding: 18px 20px; text-align: left; border-bottom: 1px solid var(--line-soft); }
.russel .compare thead th { font-weight: 600; color: var(--ink-mute); font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }
.russel .compare th:not(:first-child), .russel .compare td:not(:first-child) { text-align: center; }
.russel .compare tbody tr:hover { background: var(--paper-warm); }
.russel .compare .row-h { font-weight: 700; color: var(--ink); }
.russel .compare .yes { color: var(--coral); font-weight: 700; }
.russel .compare .no { color: var(--ink-faint); }
.russel .compare .russel-col { color: var(--ink); font-weight: 600; }
.russel .compare th.russel-col, .russel td.russel-col { background: var(--coral-tint); }
.russel .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
.russel .pill-yes { background: color-mix(in oklab, var(--coral) 16%, var(--bone)); color: var(--olive); }
.russel .pill-no { background: var(--paper-warm); color: var(--ink-faint); }

.russel .flow { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
.russel .flow .step { padding: 24px 20px; border: 1px solid var(--line-soft); border-radius: 16px; background: var(--bone); position: relative; }
.russel .flow .step .k { font-size: 12px; font-weight: 700; color: var(--coral); letter-spacing: 0.1em; }
.russel .flow .step h4 { font-size: 17px; margin: 10px 0 8px; }
.russel .flow .step p { font-size: 13.5px; color: var(--ink-mute); line-height: 1.5; }
.russel .flow .step svg { width: 30px; height: 30px; margin-bottom: 10px; }
.russel .flow .step .arrow { position: absolute; right: -13px; top: 50%; transform: translateY(-50%); color: var(--line-hover); font-size: 16px; z-index: 2; }
.russel .flow .step:last-child .arrow { display: none; }

.russel .bench { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.russel .bench-card { padding: 28px; border: 1px solid var(--line-soft); border-radius: 18px; background: var(--bone); }
.russel .bench-card h4 { font-size: 16px; color: var(--ink-mute); font-weight: 600; }
.russel .bench-card .sub { font-size: 13px; color: var(--ink-faint); margin-top: 4px; }
.russel .bars { margin-top: 24px; }
.russel .bar-row { margin-bottom: 16px; }
.russel .bar-row .lbl { display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 7px; }
.russel .bar-row .lbl .name { font-weight: 600; }
.russel .bar-row .lbl .t { font-variant-numeric: tabular-nums; color: var(--ink-mute); }
.russel .bar-track { height: 12px; background: var(--paper-dark); border-radius: 100px; overflow: hidden; }
.russel .bar-fill { height: 100%; border-radius: 100px; width: 0; transition: width 1.1s var(--ease); }
.russel .bar-fill.win { background: var(--coral); }
.russel .bar-fill.lose { background: var(--ink-faint); }
.russel .bench-note { grid-column: 1/-1; font-size: 13px; color: var(--ink-faint); margin-top: 4px; }

.russel .qs-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: center; }
.russel .qs-list { display: flex; flex-direction: column; gap: 22px; }
.russel .qs-item { display: flex; gap: 16px; }
.russel .qs-item .num { flex: 0 0 auto; width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; font-weight: 700; font-size: 14px; color: var(--ink-soft); }
.russel .qs-item h4 { font-size: 18px; margin-bottom: 4px; }
.russel .qs-item p { font-size: 14px; color: var(--ink-mute); }
.russel .qs-item code { font-size: 13px; background: var(--paper-warm); padding: 1px 6px; border-radius: 5px; }

.russel .tight { padding: 80px 0; border-top: 1px solid var(--line-soft); background: var(--paper-warm); }
.russel .tight .inner { max-width: var(--maxw); margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 48px; align-items: start; }
.russel .tight h2 { font-size: clamp(28px, 3.2vw, 42px); }
.russel .tight .phases { display: flex; flex-direction: column; gap: 18px; }
.russel .phase { display: flex; gap: 14px; }
.russel .phase .badge { flex: 0 0 auto; font-size: 12px; font-weight: 700; padding: 5px 10px; border-radius: 100px; letter-spacing: 0.04em; }
.russel .phase.done .badge { background: var(--coral); color: var(--ink); }
.russel .phase.now .badge { background: var(--ink); color: var(--bone); }
.russel .phase p { color: var(--ink-mute); font-size: 15px; }

.russel .arch { border-top: 1px solid var(--line-soft); }
.russel .arch svg.diagram { width: 100%; height: auto; }

.russel .roadmap-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px; }
.russel .roadmap-item { display: flex; gap: 16px; padding: 22px 0; border-top: 1px solid var(--line-faint); }
.russel .roadmap-item .ri { flex: 0 0 auto; width: 22px; }
.russel .roadmap-item h4 { font-size: 17px; margin-bottom: 4px; }
.russel .roadmap-item p { font-size: 14px; color: var(--ink-mute); }
.russel .roadmap-item .state { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--coral); }

.russel .faq-list { max-width: 820px; }
.russel .faq-item { border-top: 1px solid var(--line); }
.russel .faq-item:last-child { border-bottom: 1px solid var(--line); }
.russel .faq-q { width: 100%; text-align: left; background: none; border: none; font-family: var(--font); font-size: 18px; font-weight: 600; color: var(--ink); padding: 26px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.russel .faq-q .ic { flex: 0 0 auto; width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; transition: all 0.2s var(--ease); color: var(--ink-mute); }
.russel .faq-item.open .faq-q .ic { background: var(--ink); color: var(--bone); border-color: var(--ink); transform: rotate(45deg); }
.russel .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.35s var(--ease); }
.russel .faq-a .inner { padding: 0 0 26px; color: var(--ink-mute); font-size: 16px; max-width: 68ch; }

.russel footer.sub-footer { background: var(--paper); border-top: 1px solid var(--line-soft); padding: 64px 0 40px; }
.russel .foot-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px; }
.russel .foot-grid h5 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-faint); margin-bottom: 16px; }
.russel .foot-grid ul { list-style: none; display: flex; flex-direction: column; gap: 11px; font-size: 15px; color: var(--ink-soft); }
.russel .foot-grid ul a:hover { color: var(--ink); }
.russel .foot-brand p { color: var(--ink-mute); font-size: 15px; margin-top: 14px; max-width: 34ch; }
.russel .foot-bottom { margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line-soft); display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--ink-faint); flex-wrap: wrap; gap: 12px; }
.russel .foot-bottom a:hover { color: var(--ink); }

.russel .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
.russel .reveal.in { opacity: 1; transform: none; }

@media (max-width: 980px) {
  .russel nav.primary { display: none; }
  .russel .hamburger { display: block; }
  .russel .nav-right .btn--ghost { display: none; }
  .russel .hero-top, .russel .about-row, .russel .about-row.flip .about-text, .russel .qs-grid, .russel .tight .inner { grid-template-columns: 1fr; }
  .russel .about-row.flip .about-text { order: 0; }
  .russel .bench { grid-template-columns: 1fr; }
  .russel .flow { grid-template-columns: repeat(2, 1fr); }
  .russel .flow .step .arrow { display: none; }
  .russel .roadmap-list { grid-template-columns: 1fr; }
  .russel .foot-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .russel .wrap, .russel .nav-inner, .russel .tight .inner { padding-left: 20px; padding-right: 20px; }
  .russel .hero { padding-top: 48px; }
  .russel .flow { grid-template-columns: 1fr; }
  .russel .compare { font-size: 13px; }
  .russel .compare th, .russel .compare td { padding: 12px 8px; }
  .russel .foot-grid { grid-template-columns: 1fr; }
  .russel .hero-meta { gap: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .russel .reveal { opacity: 1; transform: none; transition: none; }
  .russel .bar-fill { transition: none; }
  .russel { scroll-behavior: auto; }
}
`

function Reveal({ children, className = '' }) {
	const ref = useRef(null)
	useEffect(() => {
		const el = ref.current
		if (!el) return
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('in')
					el.querySelectorAll('.bar-fill[data-pct]').forEach((b) => {
						b.style.width = b.getAttribute('data-pct') + '%'
					})
					io.unobserve(el)
				}
			},
			{ threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
		)
		io.observe(el)
		return () => io.unobserve(el)
	}, [])
	return (
		<div ref={ref} className={`reveal ${className}`}>
			{children}
		</div>
	)
}

function Bar({ label, time, pct, type }) {
	return (
		<div className="bar-row">
			<div className="lbl">
				<span className="name">{label}</span>
				<span className="t">{time}</span>
			</div>
			<div className="bar-track">
				<div className={`bar-fill ${type}`} data-pct={pct} />
			</div>
		</div>
	)
}

function FAQItem({ q, children }) {
	const [open, setOpen] = useState(false)
	const aRef = useRef(null)

	const toggle = () => {
		if (open) {
			aRef.current.style.maxHeight = null
			setOpen(false)
		} else {
			setOpen(true)
			requestAnimationFrame(() => {
				if (aRef.current) aRef.current.style.maxHeight = aRef.current.scrollHeight + 'px'
			})
		}
	}

	return (
		<div className={`faq-item ${open ? 'open' : ''}`}>
			<button className="faq-q" onClick={toggle}>
				{q}
				<span className="ic">+</span>
			</button>
			<div className="faq-a" ref={aRef}>
				<div className="inner">{children}</div>
			</div>
		</div>
	)
}

export default function RusselLanding() {
	const [menuOpen, setMenuOpen] = useState(false)
	const navRef = useRef(null)
	const year = new Date().getFullYear()

	useEffect(() => {
		const t = setTimeout(() => {
			document.querySelectorAll('.russel .reveal:not(.in)').forEach((el) => el.classList.add('in'))
			document.querySelectorAll('.russel .bar-fill[data-pct]').forEach((b) => {
				if (!b.style.width) b.style.width = b.getAttribute('data-pct') + '%'
			})
		}, 1800)
		return () => clearTimeout(t)
	}, [])

	const closeMenu = () => setMenuOpen(false)

	return (
		<div className="russel">
			<style>{CSS}</style>

			{/* Header */}
			<header className="nav">
				<div className="nav-inner">
					<a className="brand" href="#top">
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
						Russel
					</a>
					<nav
						className="primary"
						ref={navRef}
						style={
							menuOpen
								? {
										display: 'flex',
										flexDirection: 'column',
										position: 'absolute',
										top: '72px',
										left: 0,
										right: 0,
										background: 'var(--paper)',
										padding: '20px 32px',
										borderBottom: '1px solid var(--line)',
										zIndex: 60
									}
								: {}
						}
					>
						<a href="#why" onClick={closeMenu}>
							Why Russel
						</a>
						<a href="#flow" onClick={closeMenu}>
							How it works
						</a>
						<a href="#benchmarks" onClick={closeMenu}>
							Benchmarks
						</a>
						<a href="#architecture" onClick={closeMenu}>
							Architecture
						</a>
						<a href="#roadmap" onClick={closeMenu}>
							Roadmap
						</a>
					</nav>
					<div className="nav-right">
						<a className="btn btn--ghost" href="https://github.com" target="_blank" rel="noopener">
							<span className="dot" /> Star on GitHub
						</a>
						<a className="btn btn--ink" href="#quickstart">
							Get started <span className="arr">→</span>
						</a>
						<button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>

			{/* Hero */}
			<section id="top" className="hero">
				<div className="wrap">
					<div className="hero-top">
						<div className="hero-copy">
							<span className="eyebrow">Self-hosted · Open source · MIT</span>
							<h1 style={{ marginTop: 22 }}>
								Deploy as
								<br />
								<span className="accent">microVMs</span> or containers.
							</h1>
							<p className="lead subhead">
								Russel boots your services as{' '}
								<strong>hardware-isolated microVMs in under 2 seconds</strong>, or as fast,
								immutable containers — pick per deploy, switch any time with one config line and
								zero downtime.
							</p>
							<p>
								Rust-written. Nix for content-addressed, zero-drift builds. Cloud Hypervisor under
								the hood. Auto-detects CVEs and upgrades a vulnerable container to a hardened
								microVM — automatically. Think “self-hosted, hardware-secure, no lock-in.”
							</p>
							<div className="hero-cta">
								<a className="btn btn--ink" href="#quickstart">
									russel deploy&nbsp; <span className="arr">→</span>
								</a>
								<a className="btn btn--ghost" href="#architecture">
									See the architecture
								</a>
							</div>
							<div className="hero-meta">
								<div className="item">
									<div className="n">
										1.7<span className="u">s</span>
									</div>
									<div className="l">Cold boot, static site</div>
								</div>
								<div className="item">
									<div className="n">
										2<span className="u">MB</span>
									</div>
									<div className="l">Initramfs footprint</div>
								</div>
								<div className="item">
									<div className="n">
										dual
										<span className="u" />
									</div>
									<div className="l">Container & microVM</div>
								</div>
							</div>
						</div>

						<div className="terminal">
							<div className="term-bar">
								<i />
								<i />
								<i />
								<span className="title">russel — deploy</span>
							</div>
							<div className="term-body">{TerminalLines}</div>
						</div>
					</div>
				</div>
			</section>

			{/* Why Russel / Pillars */}
			<section className="about">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Why Russel</span>
							<h2>Isolation when you want it, speed when you don&apos;t.</h2>
							<p>
								Not every service needs a hardware boundary. Russel lets you pick container or
								microVM per deploy — and switch between them with one config line and zero downtime.
								A CVE on a container runtime? Russel auto-promotes it to a hardened microVM before
								you even read the advisory.
							</p>
						</div>
					</Reveal>

					<Reveal>
						<div className="about-row">
							<div className="about-text">
								<div className="about-num">01 — Dual runtime</div>
								<h3>Container or microVM. One config line to flip.</h3>
								<p>
									Every service gets a <code>runtime</code> field in its config:{' '}
									<code>container</code> for fast Podman-based deploys, <code>microvm</code> for
									hardware isolation via Cloud Hypervisor + KVM. Change the field, re-deploy — zero
									downtime, no re-architecture. If a CVE hits your container runtime, Russel
									auto-switches the service to a microVM so the boundary is already hardened by the
									time you check your inbox.
								</p>
								<div className="tags">
									<span className="tag">Podman</span>
									<span className="tag">Cloud Hypervisor</span>
									<span className="tag">Zero-downtime switch</span>
								</div>
							</div>
							<div className="visual">
								<svg viewBox="0 0 320 240" width="86%" aria-hidden="true">
									<defs>
										<marker
											id="ah-a"
											markerWidth="9"
											markerHeight="9"
											refX="6"
											refY="3"
											orient="auto"
										>
											<path d="M0 0L6 3L0 6" fill="var(--ink)" />
										</marker>
									</defs>
									<rect
										x="14"
										y="20"
										width="132"
										height="84"
										rx="10"
										fill="var(--bone)"
										stroke="var(--ink)"
										strokeWidth="2"
									/>
									<text
										x="80"
										y="50"
										textAnchor="middle"
										fill="var(--ink)"
										fontSize="12"
										fontWeight="700"
										fontFamily="var(--font)"
									>
										container
									</text>
									<text
										x="80"
										y="72"
										textAnchor="middle"
										fill="var(--ink-mute)"
										fontSize="10"
										fontFamily="var(--font)"
									>
										Podman
									</text>
									<text
										x="80"
										y="90"
										textAnchor="middle"
										fill="var(--ink-faint)"
										fontSize="9"
										fontFamily="var(--font)"
									>
										shared kernel
									</text>
									<rect
										x="174"
										y="20"
										width="132"
										height="84"
										rx="10"
										fill="var(--coral-tint)"
										stroke="var(--coral)"
										strokeWidth="2"
									/>
									<text
										x="240"
										y="50"
										textAnchor="middle"
										fill="var(--ink)"
										fontSize="12"
										fontWeight="700"
										fontFamily="var(--font)"
									>
										microVM
									</text>
									<text
										x="240"
										y="72"
										textAnchor="middle"
										fill="var(--ink-mute)"
										fontSize="10"
										fontFamily="var(--font)"
									>
										Cloud Hypervisor
									</text>
									<text
										x="240"
										y="90"
										textAnchor="middle"
										fill="var(--ink-faint)"
										fontSize="9"
										fontFamily="var(--font)"
									>
										own kernel
									</text>
									<path
										d="M140 62h22"
										stroke="var(--ink)"
										strokeWidth="1.6"
										markerEnd="url(#ah-a)"
									/>
									<path d="M168 70h14" stroke="var(--ink-faint)" strokeWidth="1.2" />
									<text
										x="146"
										y="58"
										textAnchor="middle"
										fill="var(--ink-mute)"
										fontSize="9"
										fontFamily="var(--font)"
									>
										switch
									</text>
									<text
										x="160"
										y="108"
										textAnchor="middle"
										fill="var(--ink-faint)"
										fontSize="10"
										fontFamily="var(--font)"
									>
										one config line · zero downtime
									</text>
									<rect
										x="70"
										y="130"
										width="180"
										height="42"
										rx="8"
										fill="var(--paper-dark)"
										stroke="var(--coral)"
										strokeWidth="1.5"
										strokeDasharray="4 3"
									/>
									<text
										x="160"
										y="150"
										textAnchor="middle"
										fill="var(--ink)"
										fontSize="11"
										fontWeight="700"
										fontFamily="var(--font)"
									>
										CVE detected → auto-upgrade to microVM
									</text>
									<text
										x="160"
										y="168"
										textAnchor="middle"
										fill="var(--ink-faint)"
										fontSize="9"
										fontFamily="var(--font)"
									>
										hardened before you read the advisory
									</text>
									<rect x="40" y="196" width="240" height="22" rx="4" fill="var(--ink)" />
									<text
										x="160"
										y="212"
										textAnchor="middle"
										fill="var(--bone)"
										fontSize="10"
										fontWeight="700"
										fontFamily="var(--font)"
									>
										HOST KERNEL · KVM
									</text>
								</svg>
							</div>
						</div>
					</Reveal>

					<Reveal>
						<div className="about-row flip">
							<div className="about-text">
								<div className="about-num">02 — Immutable builds</div>
								<h3>Content-addressed. Zero drift.</h3>
								<p>
									Builds are Nix. Content-addressed, fully deterministic: the same inputs always
									produce the same store path, on your laptop, the build server, and the deploy box.
									No “works on my machine,” no surprise drift between staging and prod. Every deploy
									is immutable — the hash proves exactly what ran, and the past is never
									overwritten.
								</p>
								<div className="tags">
									<span className="tag">Nix</span>
									<span className="tag">Content-addressed</span>
									<span className="tag">Dedup</span>
									<span className="tag">Zero drift</span>
								</div>
							</div>
							<div className="visual">
								<svg viewBox="0 0 320 240" width="86%" aria-hidden="true">
									<g fontFamily="var(--font)">
										<rect
											x="30"
											y="40"
											width="120"
											height="34"
											rx="6"
											fill="var(--bone)"
											stroke="var(--line)"
										/>
										<text x="40" y="61" fill="var(--ink)" fontSize="11" fontWeight="700">
											laptop
										</text>
										<text
											x="140"
											y="61"
											textAnchor="end"
											fill="var(--coral)"
											fontSize="11"
											fontFamily="monospace"
										>
											a3kf…q9p
										</text>
										<rect
											x="30"
											y="100"
											width="120"
											height="34"
											rx="6"
											fill="var(--bone)"
											stroke="var(--line)"
										/>
										<text x="40" y="121" fill="var(--ink)" fontSize="11" fontWeight="700">
											ci box
										</text>
										<text
											x="140"
											y="121"
											textAnchor="end"
											fill="var(--coral)"
											fontSize="11"
											fontFamily="monospace"
										>
											a3kf…q9p
										</text>
										<rect
											x="30"
											y="160"
											width="120"
											height="34"
											rx="6"
											fill="var(--bone)"
											stroke="var(--line)"
										/>
										<text x="40" y="181" fill="var(--ink)" fontSize="11" fontWeight="700">
											prod host
										</text>
										<text
											x="140"
											y="181"
											textAnchor="end"
											fill="var(--coral)"
											fontSize="11"
											fontFamily="monospace"
										>
											a3kf…q9p
										</text>
										<path
											d="M168 57h120M168 117h120M168 177h120"
											stroke="var(--line)"
											strokeWidth="1.5"
										/>
										<path
											d="M282 57l8 0M282 117l8 0M282 177l8 0"
											stroke="var(--coral)"
											strokeWidth="1.5"
										/>
									</g>
									<text x="200" y="214" textAnchor="middle" fill="var(--ink-faint)" fontSize="11">
										identical store path → deduplicated across hosts
									</text>
								</svg>
							</div>
						</div>
					</Reveal>

					<Reveal>
						<div className="about-row">
							<div className="about-text">
								<div className="about-num">03 — Ownership</div>
								<h3>Self-hosted. No vendor lock-in.</h3>
								<p>
									Russel runs on hardware you already own — a homelab box, a rented bare-metal
									server, a rack in a colo. No control plane you can&apos;t see, no egress billed by
									the gigabyte, no platform deprecating your region. You hold the root.
								</p>
								<div className="tags">
									<span className="tag">Your hardware</span>
									<span className="tag">MIT licensed</span>
									<span className="tag">Axum control plane</span>
								</div>
							</div>
							<div className="visual">
								<svg viewBox="0 0 320 240" width="80%" aria-hidden="true">
									<g stroke="var(--ink)" strokeWidth="2" fill="var(--paper-warm)">
										<rect x="110" y="70" width="100" height="120" rx="10" />
										<rect
											x="125"
											y="92"
											width="70"
											height="22"
											rx="4"
											fill="var(--coral)"
											stroke="none"
										/>
										<rect x="125" y="122" width="70" height="22" rx="4" fill="var(--paper)" />
										<rect x="125" y="152" width="70" height="22" rx="4" fill="var(--paper)" />
									</g>
									<circle cx="160" cy="40" r="6" fill="var(--coral)" />
									<path d="M160 46v22" stroke="var(--coral)" strokeWidth="2" />
									<text x="160" y="214" textAnchor="middle" fill="var(--ink-faint)" fontSize="11">
										your box · your root
									</text>
								</svg>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* Comparison Table */}
			<section id="why" className="pad">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Compared</span>
							<h2>Where Russel sits.</h2>
							<p>
								No single tool wins every column. Russel trades for dual-runtime flexibility,
								reproducibility, and zero-drift deployments without giving up self-hosting or boot
								speed.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="table-scroll">
							<table className="compare">
								<thead>
									<tr>
										<th />
										<th className="russel-col">Russel</th>
										<th>Docker / Podman</th>
										<th>Kubernetes</th>
										<th>AWS Lambda</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="row-h">Isolation</td>
										<td className="russel-col">
											<span className="pill pill-yes">hardware microVM</span>
										</td>
										<td className="no">shared kernel</td>
										<td>namespaces</td>
										<td>Firecracker µVM</td>
									</tr>
									<tr>
										<td className="row-h">Reproducible builds</td>
										<td className="russel-col">
											<span className="yes">✓</span> Nix content-addressed
										</td>
										<td className="no">layer drift</td>
										<td className="no">depends on images</td>
										<td className="no">opaque</td>
									</tr>
									<tr>
										<td className="row-h">Self-hosted</td>
										<td className="russel-col">
											<span className="yes">✓</span> your hardware
										</td>
										<td>yes</td>
										<td className="no">needs a cluster</td>
										<td className="no">AWS only</td>
									</tr>
									<tr>
										<td className="row-h">Cold boot</td>
										<td className="russel-col">
											<span className="yes">~1.7s</span>
										</td>
										<td>2.7–10s</td>
										<td>minutes (sched.)</td>
										<td>~1s (warm) / cold varies</td>
									</tr>
									<tr>
										<td className="row-h">Dual runtime</td>
										<td className="russel-col">
											<span className="yes">✓</span> container &amp; microVM
										</td>
										<td>container only</td>
										<td>container only</td>
										<td>function only</td>
									</tr>
									<tr>
										<td className="row-h">One-line runtime switch</td>
										<td className="russel-col">
											<span className="yes">✓</span> zero downtime
										</td>
										<td className="no">—</td>
										<td className="no">—</td>
										<td className="no">—</td>
									</tr>
									<tr>
										<td className="row-h">CVE auto-upgrade</td>
										<td className="russel-col">
											<span className="yes">✓</span> container → microVM
										</td>
										<td className="no">manual</td>
										<td className="no">manual</td>
										<td className="no">AWS patches</td>
									</tr>
									<tr>
										<td className="row-h">Scaling cost model</td>
										<td className="russel-col">
											<span className="yes">sub-linear</span> · dedup
										</td>
										<td>per-image</td>
										<td>per-pod overhead</td>
										<td>per-invocation</td>
									</tr>
									<tr>
										<td className="row-h">Vendor lock-in</td>
										<td className="russel-col">
											<span className="yes">none · MIT</span>
										</td>
										<td className="no">low</td>
										<td className="no">low–med</td>
										<td className="no">high</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Reveal>
				</div>
			</section>

			{/* How it works / Flow */}
			<section id="flow" className="pad">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">How it works</span>
							<h2>From repo to serving in five steps.</h2>
							<p>
								One CLI command drives the whole path — the CLI streams progress to your terminal
								over HTTP/NDJSON. The <code>runtime</code> field in your config picks container or
								microVM; swap it any time and re-deploy with zero downtime.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="flow">
							<div className="step">
								<svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7">
									<path d="M9 4L3 8l6 4M3 8h13a4 4 0 014 4v1" />
								</svg>
								<div className="k">01</div>
								<h4>Clone</h4>
								<p>
									Pull your repo. Russel reads the <code>Russelfile.toml</code> (migrating to YAML).
								</p>
								<span className="arrow">→</span>
							</div>
							<div className="step">
								<svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7">
									<path d="M4 7h16M4 12h10M4 17h14" />
								</svg>
								<div className="k">02</div>
								<h4>nix build</h4>
								<p>Reproducible build produces a single content-addressed store path.</p>
								<span className="arrow">→</span>
							</div>
							<div className="step">
								<svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7">
									<rect x="4" y="4" width="16" height="16" rx="2" />
									<path d="M4 9h16" />
								</svg>
								<div className="k">03</div>
								<h4>runtime dispatch</h4>
								<p>
									Config field <code>runtime = &quot;microvm&quot;</code> or{' '}
									<code>&quot;container&quot;</code> picks the engine — Podman or Cloud Hypervisor.
								</p>
								<span className="arrow">→</span>
							</div>
							<div className="step">
								<svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.7">
									<path d="M5 12h8M9 8l4 4-4 4" />
									<circle cx="18" cy="12" r="2.5" />
								</svg>
								<div className="k">04</div>
								<h4>boot</h4>
								<p>
									Cloud Hypervisor for microVMs (2&nbsp;MB initramfs, no systemd); Podman for fast
									container starts.
								</p>
								<span className="arrow">→</span>
							</div>
							<div className="step">
								<svg viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2">
									<circle cx="12" cy="12" r="9" />
									<path d="M8 12l3 3 5-6" />
								</svg>
								<div className="k">05</div>
								<h4>serve</h4>
								<p>
									Networking wired via iptables/socat. Your service is live — immutable and
									zero-drift.
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* Benchmarks */}
			<section id="benchmarks" className="pad">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Benchmarks</span>
							<h2>Boots faster than Docker.</h2>
							<p>
								End-to-end times including the Nix build. Measured on the same host; lower is
								better.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="bench">
							<div className="bench-card">
								<h4>Static site · cold deploy</h4>
								<div className="sub">full path: nix build → boot → serve</div>
								<div className="bars">
									<Bar label="Russel" time="1.7s" pct="19" type="win" />
									<Bar label="Docker / Podman (best)" time="2.7s" pct="30" type="lose" />
									<Bar label="Podman (typical)" time="~10s" pct="100" type="lose" />
								</div>
							</div>
							<div className="bench-card">
								<h4>Go HTTP app · end-to-end</h4>
								<div className="sub">including Nix build of a compiling service</div>
								<div className="bars">
									<Bar label="Russel" time="3.9s" pct="45" type="win" />
									<Bar label="Docker / Podman" time="8.6s" pct="100" type="lose" />
								</div>
							</div>
							<div className="bench-note">
								Bars scaled to the slowest measured value in each group. Reproduce on your host with{' '}
								<code>russel bench</code>.
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* Quick Start */}
			<section id="quickstart" className="pad">
				<div className="wrap">
					<div className="qs-grid">
						<Reveal>
							<div className="section-head" style={{ marginBottom: 36 }}>
								<span className="eyebrow">Quick start</span>
								<h2>Zero to deployed in three commands.</h2>
							</div>
							<div className="qs-list">
								<div className="qs-item">
									<div className="num">1</div>
									<div>
										<h4>Install Russel</h4>
										<p>
											From source with Nix — it pins its own toolchain.{' '}
											<code>nix profile install</code> into your PATH.
										</p>
									</div>
								</div>
								<div className="qs-item">
									<div className="num">2</div>
									<div>
										<h4>Grab an app</h4>
										<p>
											Any repo with a <code>Russelfile.toml</code>. <code>git clone</code> your
											service and <code>cd</code> in.
										</p>
									</div>
								</div>
								<div className="qs-item">
									<div className="num">3</div>
									<div>
										<h4>Deploy</h4>
										<p>
											<code>russel deploy</code> builds, packs the initramfs, boots the microVM, and
											serves. One command, NDJSON streamed to your terminal.
										</p>
									</div>
								</div>
							</div>
						</Reveal>
						<div className="terminal">
							<div className="term-bar">
								<i />
								<i />
								<i />
								<span className="title">quickstart</span>
							</div>
							<div className="term-body">
								<div>
									<span className="c">#</span> 1 · install
								</div>
								<div>
									<span className="c">$</span> <span className="p">nix</span> profile install
									github:russel/russel
								</div>
								<div className="c"># 2 · grab an app</div>
								<div>
									<span className="c">$</span> <span className="p">git</span> clone
									git@github.com:you/my-app <span className="c">&&</span> cd my-app
								</div>
								<div className="c"># 3 · deploy</div>
								<div>
									<span className="c">$</span> <span className="p">russel</span> deploy
								</div>
								<div>
									<span className="ok">✓</span> boot 1.74s · serving{' '}
									<span className="o">10.0.0.42:8080</span>
								</div>
								<div>
									<span className="p">$</span> <span style={{ opacity: 0.6 }}>_</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Current State */}
			<section className="tight">
				<div className="inner">
					<Reveal>
						<span className="eyebrow">Where it&apos;s at</span>
						<h2 style={{ marginTop: 16 }}>
							Phase 1 done.
							<br />
							Phase 2 underway.
						</h2>
					</Reveal>
					<div className="phases">
						<div className="phase done">
							<span className="badge">DONE</span>
							<p>
								Single-node microVM deployments work end-to-end — <code>russel deploy</code> boots a
								real service on Cloud Hypervisor.
							</p>
						</div>
						<div className="phase now">
							<span className="badge">NOW</span>
							<p>
								Adding a Podman container runtime, runtime switching, and dual deployment types
								(microVM <em>or</em> container) from one config.
							</p>
						</div>
						<div className="phase">
							<span
								className="badge"
								style={{ background: 'var(--paper-dark)', color: 'var(--ink-soft)' }}
							>
								NEXT
							</span>
							<p>Config evolving from TOML → YAML; multi-node scheduling on the roadmap.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Architecture */}
			<section id="architecture" className="arch pad">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Architecture</span>
							<h2>Three moving parts, no surprises.</h2>
							<p>
								The CLI talks to a local control plane over HTTP/NDJSON. The control plane boots the
								microVM directly on Cloud Hypervisor — no containerd in the middle, no NixOS guest.
							</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="visual" style={{ aspectRatio: 'auto', padding: 36 }}>
							<svg className="diagram" viewBox="0 0 880 320" aria-hidden="true">
								<defs>
									<marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
										<path d="M0 0L6 3L0 6" fill="var(--ink-faint)" />
									</marker>
								</defs>
								<g fontFamily="var(--font)">
									<rect x="30" y="120" width="180" height="80" rx="14" fill="var(--ink)" />
									<text
										x="120"
										y="152"
										textAnchor="middle"
										fill="var(--bone)"
										fontSize="16"
										fontWeight="700"
									>
										russel CLI
									</text>
									<text x="120" y="174" textAnchor="middle" fill="var(--coral)" fontSize="12">
										clap
									</text>
									<rect
										x="350"
										y="110"
										width="180"
										height="100"
										rx="14"
										fill="var(--bone)"
										stroke="var(--ink)"
										strokeWidth="2"
									/>
									<text
										x="440"
										y="142"
										textAnchor="middle"
										fill="var(--ink)"
										fontSize="16"
										fontWeight="700"
									>
										Control plane
									</text>
									<text x="440" y="164" textAnchor="middle" fill="var(--ink-mute)" fontSize="12">
										Axum HTTP server
									</text>
									<text x="440" y="184" textAnchor="middle" fill="var(--ink-mute)" fontSize="12">
										NDJSON streaming
									</text>
									<rect
										x="670"
										y="70"
										width="180"
										height="90"
										rx="14"
										fill="var(--coral-tint)"
										stroke="var(--coral)"
										strokeWidth="2"
									/>
									<text
										x="760"
										y="102"
										textAnchor="middle"
										fill="var(--ink)"
										fontSize="15"
										fontWeight="700"
									>
										microVM
									</text>
									<text x="760" y="122" textAnchor="middle" fill="var(--ink-mute)" fontSize="12">
										Cloud Hypervisor · KVM
									</text>
									<text x="760" y="140" textAnchor="middle" fill="var(--ink-mute)" fontSize="11">
										2MB initramfs · BusyBox
									</text>
									<rect
										x="670"
										y="180"
										width="180"
										height="56"
										rx="14"
										fill="var(--paper)"
										stroke="var(--line)"
									/>
									<text
										x="760"
										y="206"
										textAnchor="middle"
										fill="var(--ink)"
										fontSize="13"
										fontWeight="700"
									>
										host deps
									</text>
									<text x="760" y="224" textAnchor="middle" fill="var(--ink-mute)" fontSize="11">
										virtiofsd · socat · iproute2 · iptables
									</text>
									<path
										d="M210 150L350 150"
										stroke="var(--ink-faint)"
										strokeWidth="1.5"
										markerEnd="url(#ah)"
									/>
									<path
										d="M350 150L210 170"
										stroke="var(--ink-faint)"
										strokeWidth="1.5"
										markerEnd="url(#ah)"
									/>
									<text x="280" y="142" textAnchor="middle" fill="var(--ink-faint)" fontSize="10">
										HTTP / NDJSON
									</text>
									<path
										d="M530 130L670 110"
										stroke="var(--coral)"
										strokeWidth="1.6"
										markerEnd="url(#ah)"
									/>
									<path
										d="M670 150L530 180"
										stroke="var(--coral)"
										strokeWidth="1.6"
										markerEnd="url(#ah)"
									/>
									<path
										d="M760 160L760 180"
										stroke="var(--ink-faint)"
										strokeWidth="1.5"
										markerEnd="url(#ah)"
									/>
									<text
										x="760"
										y="50"
										textAnchor="middle"
										fill="var(--olive)"
										fontSize="12"
										fontWeight="700"
									>
										no systemd · no containerd
									</text>
								</g>
							</svg>
						</div>
					</Reveal>
				</div>
			</section>

			{/* Roadmap */}
			<section id="roadmap" className="pad">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">Roadmap</span>
							<h2>What&apos;s next.</h2>
							<p>Built in the open. Every item has a tracking issue — come pick one.</p>
						</div>
					</Reveal>
					<Reveal>
						<div className="roadmap-list">
							<div className="roadmap-item">
								<svg className="ri" viewBox="0 0 22 22" fill="none">
									<circle cx="11" cy="11" r="9" stroke="var(--coral)" strokeWidth="2" />
									<circle cx="11" cy="11" r="3.5" fill="var(--coral)" />
								</svg>
								<div>
									<h4>
										Dual runtime <span className="state">in progress</span>
									</h4>
									<p>
										Containers <em>and</em> microVMs behind one command; switch per-deploy in the
										config.
									</p>
								</div>
							</div>
							<div className="roadmap-item">
								<svg className="ri" viewBox="0 0 22 22" fill="none">
									<rect
										x="3"
										y="8"
										width="16"
										height="11"
										rx="2"
										stroke="var(--coral)"
										strokeWidth="2"
									/>
									<path d="M7 8V6a4 4 0 018 0v2" stroke="var(--coral)" strokeWidth="2" />
								</svg>
								<div>
									<h4>
										Secrets system <span className="state">planned</span>
									</h4>
									<p>Sealed secrets scoped per-microVM, never written to the shared Nix store.</p>
								</div>
							</div>
							<div className="roadmap-item">
								<svg className="ri" viewBox="0 0 22 22" fill="none">
									<path
										d="M4 6l7 4 7-4M4 6v10l7 4 7-4V6M11 10v10"
										stroke="var(--coral)"
										strokeWidth="2"
										strokeLinejoin="round"
									/>
								</svg>
								<div>
									<h4>
										CVE pipeline <span className="state">planned</span>
									</h4>
									<p>
										Track advisories against your active store paths; flag and re-deploy affected
										services.
									</p>
								</div>
							</div>
							<div className="roadmap-item">
								<svg className="ri" viewBox="0 0 22 22" fill="none">
									<circle cx="6" cy="6" r="3" stroke="var(--coral)" strokeWidth="2" />
									<circle cx="16" cy="16" r="3" stroke="var(--coral)" strokeWidth="2" />
									<path d="M9 6h7v7" stroke="var(--coral)" strokeWidth="2" />
								</svg>
								<div>
									<h4>
										Multi-node <span className="state">planned</span>
									</h4>
									<p>
										Schedule microVMs across a fleet; content-addressed store means warm boot
										anywhere.
									</p>
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			{/* FAQ */}
			<section id="faq" className="pad">
				<div className="wrap">
					<Reveal>
						<div className="section-head">
							<span className="eyebrow">FAQ</span>
							<h2>Questions, answered.</h2>
						</div>
					</Reveal>
					<Reveal>
						<div className="faq-list">
							<FAQItem q="Is Russel production-ready?">
								No — and we say so plainly. Phase 1 (single-node microVM deployments) works
								end-to-end and is safe to run for personal infrastructure and experiments.
								Hardening, multi-node, and the secrets system land in Phases 2–3. Check{' '}
								<code>git log</code> before you trust it with anything you&apos;d miss.
							</FAQItem>
							<FAQItem q="How is this different from Docker?">
								Docker shares your host kernel across every container — one kernel CVE in the
								namespace path can touch them all. Russel gives each service its own kernel under
								KVM/Cloud Hypervisor, and builds with Nix so the same inputs always produce the same
								store hash. You trade a little cold-boot time for real boundaries and real
								reproducibility — and on the benchmarks above, Russel still boots faster.
							</FAQItem>
							<FAQItem q="Do I need Nix installed?">
								Yes. Russel uses Nix for content-addressed, reproducible builds; that&apos;s the
								whole point. Russel pins its own toolchain via a flake, so you install it once with{' '}
								<code>nix profile install</code> and the rest is reproducible downstream. If you
								already use Nix, this is your deployment story.
							</FAQItem>
							<FAQItem q="What are the host dependencies?">
								KVM-capable host, <code>cloud-hypervisor</code>, <code>virtiofsd</code>, plus{' '}
								<code>socat</code>, <code>iproute2</code> and <code>iptables</code> for networking.
								No systemd, no NixOS guest, no container runtime — unless you opt into the Podman
								runtime now in Phase 2.
							</FAQItem>
							<FAQItem q="What's the license? Can I really self-host this?">
								MIT. Clone it, run it on your own metal, modify it, ship it. The control plane is an
								Axum HTTP server you fully own — there is no managed tier and no outbound
								phone-home. You hold the root.
							</FAQItem>
						</div>
					</Reveal>
				</div>
			</section>

			{/* Footer */}
			<footer className="sub-footer">
				<div className="wrap">
					<div className="foot-grid">
						<div className="foot-brand">
							<a className="brand" href="#top">
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
								Russel
							</a>
							<p>
								Self-hosted microVM deployments. Nix for reproducibility, Cloud Hypervisor for
								isolation, Rust all the way down.
							</p>
						</div>
						<div>
							<h5>Product</h5>
							<ul>
								<li>
									<a href="#why">Why Russel</a>
								</li>
								<li>
									<a href="#flow">How it works</a>
								</li>
								<li>
									<a href="#benchmarks">Benchmarks</a>
								</li>
								<li>
									<a href="#architecture">Architecture</a>
								</li>
							</ul>
						</div>
						<div>
							<h5>Project</h5>
							<ul>
								<li>
									<a href="#roadmap">Roadmap</a>
								</li>
								<li>
									<a href="#faq">FAQ</a>
								</li>
								<li>
									<a href="https://github.com" target="_blank" rel="noopener">
										GitHub
									</a>
								</li>
								<li>
									<a href="#top">Get started</a>
								</li>
							</ul>
						</div>
						<div>
							<h5>Community</h5>
							<ul>
								<li>
									<a href="https://github.com" target="_blank" rel="noopener">
										Issues
									</a>
								</li>
								<li>
									<a href="https://github.com" target="_blank" rel="noopener">
										Discussions
									</a>
								</li>
								<li>
									<a href="https://github.com" target="_blank" rel="noopener">
										Contributing
									</a>
								</li>
								<li>
									<a href="https://github.com" target="_blank" rel="noopener">
										Changelog
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="foot-bottom">
						<span>© {year} Russel contributors · MIT License</span>
						<span>
							Built in the open ·{' '}
							<a href="https://github.com" target="_blank" rel="noopener">
								star us on GitHub
							</a>{' '}
							↓
						</span>
					</div>
				</div>
			</footer>
		</div>
	)
}

const TerminalLines = (
	<>
		<div>
			<span className="c">$</span> <span className="p">russel</span> deploy ./my-app
		</div>
		<div className="c">→ nix build · building flake</div>
		<div>
			<span className="ok">✓</span> store path /nix/store/<span className="o">a3kf…q9p</span>
		</div>
		<div className="c">→ packing initramfs (2.0 MiB)</div>
		<div>
			<span className="ok">✓</span> kernel + virtio modules ready
		</div>
		<div className="c">→ cloud-hypervisor · booting microVM</div>
		<div>
			<span className="ok">✓</span> vm-7c9d booted in <span className="o">1.74s</span>
		</div>
		<div className="c">→ networking · 10.0.0.42:8080</div>
		<div>
			<span className="ok">●</span> serving at <span className="o">http://10.0.0.42:8080</span>
		</div>
		<div>
			<span className="p">$</span> <span style={{ opacity: 0.6 }}>_</span>
		</div>
	</>
)
