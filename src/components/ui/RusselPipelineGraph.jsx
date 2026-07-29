import React from 'react'

export default function RusselPipelineGraph() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-4 md:p-8 select-none">
      {/* Dark Grid Background */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1c261e 1px, transparent 1px),
            linear-gradient(to bottom, #1c261e 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header Title */}
      <div className="relative z-10 mb-8 flex flex-col items-center text-center">
        <h3 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          One health check decides the traffic path
        </h3>
        <p className="mt-2 max-w-xl text-xs md:text-sm text-zinc-400">
          The current version keeps serving while a new MicroVM is tested. Traffic moves only when it is healthy.
        </p>
      </div>

      {/* Main Flowchart SVG Container */}
      <div className="relative z-10 w-full overflow-x-auto">
        <div className="min-w-[780px] max-w-[850px] mx-auto relative h-[620px]">
          <svg className="w-full h-full" viewBox="0 0 800 620">
            <defs>
              <filter id="glow-emerald-flow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red-flow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Markers for Arrows */}
              <marker id="arrow-down-grey" viewBox="0 0 10 10" refX="5" refY="6" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 1 0 L 5 8 L 9 0 z" fill="#6b7280" />
              </marker>
              <marker id="arrow-down-red" viewBox="0 0 10 10" refX="5" refY="7" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 0 0 L 5 9 L 10 0 z" fill="#ef4444" />
              </marker>
              <marker id="arrow-down-green" viewBox="0 0 10 10" refX="5" refY="6" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 1 0 L 5 8 L 9 0 z" fill="#10b981" />
              </marker>
            </defs>

            {/* CONNECTING LINES */}

            {/* Line 1: Top Production Card -> Deploy Candidate */}
            <line x1="400" y1="62" x2="400" y2="108" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow-down-grey)" />

            {/* Line 2: Deploy Candidate -> Health Check */}
            <line x1="400" y1="172" x2="400" y2="218" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow-down-grey)" />

            {/* Line 3: Health Check -> Split Point */}
            <line x1="400" y1="282" x2="400" y2="310" stroke="#4b5563" strokeWidth="2" />

            {/* Left Branch (FAIL -> Red) */}
            <path
              d="M 400 310 C 400 340, 240 340, 240 362"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              filter="url(#glow-red-flow)"
            />

            {/* Right Branch (PASS -> Green) */}
            <path
              d="M 400 310 C 400 340, 560 340, 560 362"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              filter="url(#glow-emerald-flow)"
            />

            {/* Line 4: Reject release -> Bottom Rollback Card */}
            <line x1="240" y1="432" x2="240" y2="480" stroke="#ef4444" strokeWidth="3.5" markerEnd="url(#arrow-down-red)" />

            {/* Line 5: Shift traffic -> Bottom Production Card */}
            <line x1="560" y1="432" x2="560" y2="482" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-down-green)" />


            {/* NODES / CARDS */}

            {/* NODE 1: Top Card - Production (v1.0.0) */}
            <g transform="translate(400, 36)">
              <rect x="-135" y="-26" width="270" height="52" rx="10" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
              <rect x="-124" y="-17" width="56" height="34" rx="6" fill="#10b981" />
              <text x="-96" y="4" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LIVE</text>
              <text x="-52" y="-3" fill="#09090b" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Production</text>
              <text x="-52" y="15" fill="#52525b" fontSize="11" fontFamily="monospace">v1.0.0 · serving traffic</text>
            </g>


            {/* NODE 2: Deploy Candidate Box */}
            <g transform="translate(400, 140)">
              <rect x="-175" y="-30" width="350" height="60" rx="10" fill="#0d1117" stroke="#30363d" strokeWidth="1.5" />
              <rect x="-163" y="-20" width="82" height="40" rx="6" fill="#10b981" />
              <svg x="-136" y="-6" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <text x="-66" y="-4" fill="#8b949e" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">DEPLOY CANDIDATE</text>
              <text x="-66" y="16" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="bold">v1.1.0-microvm</text>
            </g>


            {/* NODE 3: Health Check Gate */}
            <g transform="translate(400, 250)">
              <rect x="-145" y="-28" width="290" height="56" rx="10" fill="#0d1117" stroke="#30363d" strokeWidth="1.5" />
              <circle cx="-118" cy="0" r="18" fill="#022c22" stroke="#10b981" strokeWidth="2" filter="url(#glow-emerald-flow)" />
              <path d="M -124 0 L -120 4 L -112 -4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="-88" y="-3" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="bold">Health check</text>
              <text x="-88" y="15" fill="#8b949e" fontSize="11" fontFamily="monospace">pass before traffic moves</text>
            </g>


            {/* SPLIT BADGES (FAIL / PASS) */}
            <g transform="translate(320, 326)">
              <rect x="-32" y="-12" width="64" height="24" rx="12" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="0" y="4" fill="#fca5a5" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">FAIL</text>
            </g>
            <g transform="translate(480, 326)">
              <rect x="-32" y="-12" width="64" height="24" rx="12" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
              <text x="0" y="4" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PASS</text>
            </g>


            {/* NODE 4 (LEFT): Reject release */}
            <g transform="translate(240, 396)">
              <rect x="-135" y="-30" width="270" height="60" rx="10" fill="#0d1117" stroke="#7f1d1d" strokeWidth="1.5" />
              <circle cx="-107" cy="0" r="18" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <path d="M -112 -5 L -102 5 M -102 -5 L -112 5" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              <text x="-76" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Reject release</text>
              <text x="-76" y="15" fill="#f87171" fontSize="11" fontFamily="monospace">5xx errors detected</text>
            </g>


            {/* NODE 4 (RIGHT): Shift traffic */}
            <g transform="translate(560, 396)">
              <rect x="-135" y="-30" width="270" height="60" rx="10" fill="#0d1117" stroke="#065f46" strokeWidth="1.5" />
              <circle cx="-107" cy="0" r="18" fill="#022c22" stroke="#10b981" strokeWidth="2" filter="url(#glow-emerald-flow)" />
              <path d="M -113 0 L -109 4 L -101 -4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="-76" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Shift traffic</text>
              <text x="-76" y="15" fill="#34d399" fontSize="11" fontFamily="monospace">zero dropped connections</text>
            </g>


            {/* NODE 5 (BOTTOM LEFT): Keep v1.0.0 Live (Rollback) */}
            <g transform="translate(240, 520)">
              <rect x="-140" y="-28" width="280" height="56" rx="10" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
              <rect x="-130" y="-17" width="76" height="34" rx="6" fill="#450a0a" />
              <text x="-92" y="4" fill="#fca5a5" fontSize="10" fontFamily="monospace" fontWeight="extrabold" textAnchor="middle">ROLLBACK</text>
              <text x="-40" y="-3" fill="#09090b" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Keep v1.0.0 live</text>
              <text x="-40" y="15" fill="#991b1b" fontSize="11" fontFamily="monospace">no outage · instant</text>
            </g>


            {/* NODE 5 (BOTTOM RIGHT): Production v1.1.0 (Success) */}
            <g transform="translate(560, 520)">
              <rect x="-140" y="-28" width="280" height="56" rx="10" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
              <rect x="-130" y="-17" width="56" height="34" rx="6" fill="#10b981" />
              <text x="-102" y="4" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LIVE</text>
              <text x="-60" y="-3" fill="#09090b" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Production v1.1.0</text>
              <text x="-60" y="15" fill="#047857" fontSize="11" fontFamily="monospace">new version serving traffic</text>
            </g>

          </svg>
        </div>
      </div>
    </div>
  )
}
