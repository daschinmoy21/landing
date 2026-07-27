import React from 'react'
import { Shield, Cpu, Globe, Zap, FileCode, HardDrive } from 'lucide-react'

const tableRows = [
  {
    label: 'Isolation',
    containers: 'Shared kernel — CVEs, noisy neighbor',
    serverless: 'Real microVM — but their machine',
    russel: 'Real microVM — your machine'
  },
  {
    label: 'Reproducibility',
    containers: 'Dockerfile drift, "works on my machine"',
    serverless: 'Opaque build pipelines',
    russel: 'Content-hashing — same hash = same bits, forever'
  },
  {
    label: 'Sovereignty',
    containers: 'Yours, but complex to run well',
    serverless: 'Zero — total vendor lock-in',
    russel: 'Self-hosted, single binary, no cluster required'
  },
  {
    label: 'Speed',
    containers: 'Fast start',
    serverless: 'Fast cold start',
    russel: 'Container: <1s. microVM: <2s boot-to-HTTP'
  }
]

const practiceItems = [
  {
    icon: <FileCode className="h-4 w-4" />,
    title: 'Content-addressed deployments',
    body: 'Builds produce content-hashed store paths. The hash is the content. Same source + same deps = same hash on any machine, six months from now. Rollback is pointing at an old hash. No image registry, no tag mutation, no "latest."'
  },
  {
    icon: <Cpu className="h-4 w-4" />,
    title: 'One pipeline, two runtimes',
    body: 'Every app builds once, producing a single store path. At deploy time, service.type picks the runtime — Cloud Hypervisor microVM (hardware isolation behind virtio) or rootless Podman container (sub-second startup on the same rootfs). No Dockerfile required for either path.'
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: 'Zero-config deploys',
    body: 'Drop a Russelfile.toml in your repo. Russel detects your stack (Rust via Cargo.toml, Go via go.mod, static files) and handles the rest. Deploy with one command. Compare to: write a Dockerfile, pick a base image, pin versions, configure multi-stage builds, set up a registry...'
  },
  {
    icon: <HardDrive className="h-4 w-4" />,
    title: 'Self-hosted, single binary',
    body: 'The control plane is one Rust binary. No etcd, no scheduler, no control loop to maintain. Workloads are detached OS children — the control plane can restart without dropping traffic. Traefik integration is automatic if you want it; raw port publishing if you don\'t.'
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: 'Secrets stay on your host',
    body: 'Secrets are written to /var/lib/russel/secrets/ with mode 0600. Apps reference secret://DB_PASSWORD. No third-party secret store, no SaaS billing tier for "additional secrets."'
  }
]

const goodFit = [
  'You run services on your own hardware and want VM-grade isolation without Kubernetes',
  'You care about reproducible builds and auditable deployments (the hash proves what\'s running)',
  'You want the "push code, it runs" experience but refuse vendor lock-in',
  'You\'re deploying Rust or Go services and want sub-second container starts or <2s microVM boots',
  'You have a single host or a handful of them — Russel is not a cluster scheduler'
]

const badFit = [
  'You need multi-node orchestration, auto-scaling, or geographic distribution — Russel is single-host by design',
  'You\'re deploying JVM or Node apps — microVM memory overhead hits harder there (still works, just less optimal)',
  'You\'re happy with Kubernetes and have the team to run it'
]

export default function WhyPage() {
  return (
    <div className="why-page-root">
      {/* Hero — single thesis statement */}
      <header className="why-hero">
        <p className="why-kicker">Why Russel</p>
        <h1>Modern deployment forces a tradeoff you shouldn't have to make</h1>
      </header>

      {/* Comparison Table — the anchor */}
      <section className="why-section" id="compare" aria-labelledby="compare-heading">
        <h2 id="compare-heading" className="sr-only">Comparison table</h2>
        <div className="why-table-wrap" role="region" aria-label="Feature comparison" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" className="col-containers">Containers (Docker/K8s)</th>
                <th scope="col" className="col-serverless">Serverless (Lambda/Fly)</th>
                <th scope="col" className="col-russel">Russel</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i}>
                  <th scope="row" className="dim-label">{row.label}</th>
                  <td className="col-containers">{row.containers}</td>
                  <td className="col-serverless">{row.serverless}</td>
                  <td className="col-russel">{row.russel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The Gap — three-column pull-quote on what Russel uniquely delivers */}
      <section className="why-section" id="gap">
        <h2>The gap Russel fills</h2>
        <div className="gap-grid">
          <div className="gap-col">
            <h3>Docker</h3>
            <p>
              Gives you speed but fake reproducibility. Images are imperative snapshots that
              drift. A rebuild six months later produces different bits. Escapes happen — the
              kernel is shared.
            </p>
          </div>
          <div className="gap-col">
            <h3>Serverless</h3>
            <p>
              Gives you microVMs but takes your infrastructure. Fly.io and Lambda run real
              VMs with hardware isolation and fast cold starts. But your builds, your data,
              your routing live on their machines, behind their APIs, at their pricing.
            </p>
          </div>
          <div className="gap-col gap-col-russel">
            <h3>Russel</h3>
            <p>
              MicroVM isolation, content-hashed reproducibility, and self-hosted control —
              in one stack.
            </p>
          </div>
        </div>
      </section>

      {/* Practice — bento grid, asymmetric */}
      <section className="why-section" id="practice">
        <h2>What that means in practice</h2>
        <div className="practice-bento">
          <div className="bento-card bento-span-2">
            <div className="bento-icon">{practiceItems[0].icon}</div>
            <h3>{practiceItems[0].title}</h3>
            <p>{practiceItems[0].body}</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon">{practiceItems[1].icon}</div>
            <h3>{practiceItems[1].title}</h3>
            <p>{practiceItems[1].body}</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon">{practiceItems[2].icon}</div>
            <h3>{practiceItems[2].title}</h3>
            <p>{practiceItems[2].body}</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon">{practiceItems[3].icon}</div>
            <h3>{practiceItems[3].title}</h3>
            <p>{practiceItems[3].body}</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon">{practiceItems[4].icon}</div>
            <h3>{practiceItems[4].title}</h3>
            <p>{practiceItems[4].body}</p>
          </div>
        </div>
      </section>

      {/* Decision — good fit / bad fit side by side */}
      <section className="why-section" id="decision">
        <h2>When Russel makes sense</h2>
        <div className="decision-grid">
          <div className="decision-col">
            <ul>
              {goodFit.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="why-section" id="limits">
        <h2>When it doesn't</h2>
        <div className="decision-grid">
          <div className="decision-col decision-col-out">
            <ul>
              {badFit.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA — committed, not floating */}
      <section className="why-cta">
        <h2>Deploy without the runtime trade-offs</h2>
        <p>Get early access. One workflow for containers and microVMs.</p>
        <a href="/#early-access" className="btn-fill">Join waitlist</a>
      </section>

      <style jsx>{`
        .why-page-root {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 28px 80px;
          color: #ffffff;
        }

        .why-page-root h1,
        .why-page-root h2,
        .why-page-root h3 {
          font-family: 'Instrument Serif', serif;
          font-weight: 400;
        }

        /* Hero */
        .why-hero {
          margin-bottom: clamp(72px, 10vw, 96px);
        }
        .why-kicker {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #38bdf8;
          font-weight: 600;
          margin: 0 0 14px;
        }
        .why-hero h1 {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.05;
          max-width: 22ch;
          margin: 0;
        }

        /* Sections */
        .why-section {
          margin-bottom: clamp(72px, 8vw, 96px);
          scroll-margin-top: 80px;
        }
        .why-section h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0 0 36px;
        }

        /* Table */
        .why-table-wrap {
          overflow-x: auto;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 24, 44, 0.75);
          backdrop-filter: blur(12px);
        }
        .why-table-wrap table {
          width: 100%;
          min-width: 760px;
          border-collapse: collapse;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.55;
        }
        .why-table-wrap th {
          padding: 14px 16px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
        }
        .why-table-wrap th:first-child { width: 140px; }
        .col-containers {
          color: hsl(240 4% 66%);
          font-weight: 400;
        }
        .col-serverless {
          color: hsl(240 4% 66%);
          font-weight: 400;
        }
        .col-russel {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.08);
          font-weight: 500;
        }
        .why-table-wrap td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .why-table-wrap tr:last-child td {
          border-bottom: none;
        }
        .dim-label {
          font-weight: 700;
          color: oklch(0.95 0.008 145);
        }

        /* Gap */
        .gap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .gap-grid { grid-template-columns: 1fr; }
        }
        .gap-col {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 28px 24px;
          background: rgba(0, 24, 44, 0.65);
          backdrop-filter: blur(8px);
        }
        .gap-col h3 {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0 0 10px;
        }
        .gap-col p {
          margin: 0;
          color: hsl(240 4% 75%);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.65;
        }
        .gap-col-russel {
          border-color: rgba(56, 189, 248, 0.3);
          background: rgba(56, 189, 248, 0.08);
        }
        .gap-col-russel h3 {
          color: #38bdf8;
        }

        /* Practice — bento grid */
        .practice-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 768px) {
          .practice-bento { grid-template-columns: 1fr; }
        }
        .bento-card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 28px 24px 24px;
          background: rgba(0, 24, 44, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bento-span-2 {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: flex-start;
          gap: 24px;
          border-color: rgba(56, 189, 248, 0.25);
          background: rgba(56, 189, 248, 0.06);
        }
        @media (max-width: 640px) {
          .bento-span-2 { flex-direction: column; }
        }
        .bento-span-2 h3 {
          font-size: 1.3rem;
        }
        .bento-span-2 p {
          max-width: 80ch;
        }
        .bento-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(56, 189, 248, 0.25);
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
        }
        .bento-card h3 {
          font-size: 1.2rem;
          font-weight: 400;
          margin: 0;
        }
        .bento-card p {
          margin: 0;
          color: hsl(240 4% 75%);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          max-width: 68ch;
        }

        /* Decision */
        .decision-grid {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 32px 28px 24px;
          background: rgba(0, 24, 44, 0.65);
          backdrop-filter: blur(8px);
        }
        .decision-col ul {
          margin: 0;
          padding-left: 1.2em;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .decision-col li {
          color: hsl(240 4% 75%);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.65;
        }
        .decision-col-out {
          border-color: rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .decision-col-out li {
          color: hsl(240 4% 60%);
        }

        /* CTA */
        .why-cta {
          text-align: center;
          padding: 56px 24px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          background:
            radial-gradient(ellipse 70% 80% at 50% 0%, rgba(56, 189, 248, 0.12), transparent 60%),
            rgba(0, 20, 38, 0.85);
          backdrop-filter: blur(12px);
        }
        .why-cta h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }
        .why-cta p {
          margin: 0 0 24px;
          color: hsl(240 4% 75%);
          font-size: 16px;
        }
        .btn-fill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 32px;
          border-radius: 999px;
          font-weight: 500;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }
        .btn-fill:hover {
          transform: scale(1.03);
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }
        .btn-fill:focus-visible {
          outline: 2px solid #38bdf8;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}
