import React from 'react'

export default function RusselPipelineGraph() {
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-4 md:p-8 select-none">
      {/* Dark Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
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
        <div className="min-w-[780px] max-w-[860px] mx-auto relative h-[620px]">
          <svg className="w-full h-full" viewBox="0 0 800 620">
            <defs>
              <filter id="glow-emerald-subtle" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red-subtle" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Precise Markers for Arrowheads (Clean Gap Alignment) */}
              <marker id="arrow-grey-precise" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 1 1 L 9 5 L 1 9 z" fill="#71717a" />
              </marker>
              <marker id="arrow-red-precise" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 1 1 L 9 5 L 1 9 z" fill="#ef4444" />
              </marker>
              <marker id="arrow-green-precise" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 1 1 L 9 5 L 1 9 z" fill="#10b981" />
              </marker>
            </defs>

            {/* CONNECTING LINES WITH CLEAN GAPS */}

            {/* Line 1: Top Production Card -> Deploy Candidate */}
            <line x1="400" y1="67" x2="400" y2="114" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrow-grey-precise)" />

            {/* Line 2: Deploy Candidate -> Health Check */}
            <line x1="400" y1="175" x2="400" y2="222" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrow-grey-precise)" />

            {/* Line 3: Health Check -> Junction Split */}
            <line x1="400" y1="283" x2="400" y2="310" stroke="#52525b" strokeWidth="1.5" />

            {/* Left Branch (FAIL -> Red Curve) */}
            <path
              d="M 400 310 C 400 340, 240 340, 240 379"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              filter="url(#glow-red-subtle)"
            />

            {/* Right Branch (PASS -> Green Curve) */}
            <path
              d="M 400 310 C 400 340, 560 340, 560 379"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              filter="url(#glow-emerald-subtle)"
            />

            {/* Line 4: Reject Release -> Bottom Rollback Outcome */}
            <line x1="240" y1="440" x2="240" y2="494" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-precise)" />

            {/* Line 5: Shift Traffic -> Bottom Production Outcome */}
            <line x1="560" y1="440" x2="560" y2="494" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-precise)" />


            {/* NODES / CARDS */}

            {/* NODE 1: Top Card - Production (v1.0.0) */}
            <g transform="translate(400, 42)">
              <rect x="-135" y="-25" width="270" height="50" rx="10" fill="#090d0a" stroke="#1f2923" strokeWidth="1.5" />
              <rect x="-125" y="-16" width="54" height="32" rx="6" fill="#10b981" />
              <text x="-98" y="4" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LIVE</text>
              <text x="-54" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Production</text>
              <text x="-54" y="14" fill="#818cf8" fontSize="11" fontFamily="monospace" className="fill-zinc-400">v1.0.0 · serving traffic</text>
            </g>


            {/* NODE 2: Deploy Candidate Box */}
            <g transform="translate(400, 147)">
              <rect x="-165" y="-28" width="330" height="56" rx="10" fill="#090d0a" stroke="#27272a" strokeWidth="1.5" />
              <rect x="-155" y="-18" width="76" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
              <svg x="-131" y="-6" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <text x="-64" y="-4" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">DEPLOY CANDIDATE</text>
              <text x="-64" y="15" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">v1.1.0-microvm</text>
            </g>


            {/* NODE 3: Health Check Gate */}
            <g transform="translate(400, 255)">
              <rect x="-145" y="-27" width="290" height="54" rx="10" fill="#090d0a" stroke="#27272a" strokeWidth="1.5" />
              <circle cx="-118" cy="0" r="16" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
              <path d="M -123 0 L -120 3 L -113 -4" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="-88" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Health check</text>
              <text x="-88" y="14" fill="#8b949e" fontSize="11" fontFamily="monospace">pass before traffic moves</text>
            </g>


            {/* SPLIT BADGES (FAIL / PASS) */}
            <g transform="translate(315, 326)">
              <rect x="-28" y="-11" width="56" height="22" rx="11" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <text x="0" y="4" fill="#fca5a5" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">FAIL</text>
            </g>
            <g transform="translate(485, 326)">
              <rect x="-28" y="-11" width="56" height="22" rx="11" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
              <text x="0" y="4" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PASS</text>
            </g>


            {/* NODE 4 (LEFT): Reject Release */}
            <g transform="translate(240, 410)">
              <rect x="-130" y="-28" width="260" height="56" rx="10" fill="#110707" stroke="#7f1d1d" strokeWidth="1.5" />
              <circle cx="-103" cy="0" r="16" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M -107 -4 L -99 4 M -99 -4 L -107 4" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <text x="-73" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Reject release</text>
              <text x="-73" y="14" fill="#f87171" fontSize="11" fontFamily="monospace">5xx errors detected</text>
            </g>


            {/* NODE 4 (RIGHT): Shift Traffic */}
            <g transform="translate(560, 410)">
              <rect x="-130" y="-28" width="260" height="56" rx="10" fill="#05140d" stroke="#065f46" strokeWidth="1.5" />
              <circle cx="-103" cy="0" r="16" fill="#022c22" stroke="#10b981" strokeWidth="1.5" filter="url(#glow-emerald-subtle)" />
              <path d="M -108 0 L -105 3 L -98 -4" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="-73" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Shift traffic</text>
              <text x="-73" y="14" fill="#34d399" fontSize="11" fontFamily="monospace">zero dropped connections</text>
            </g>


            {/* NODE 5 (BOTTOM LEFT): Keep v1.0.0 Live (Rollback Outcome) */}
            <g transform="translate(240, 528)">
              <rect x="-135" y="-28" width="270" height="56" rx="10" fill="#160909" stroke="#b91c1c" strokeWidth="1.5" />
              <rect x="-125" y="-17" width="74" height="34" rx="6" fill="#450a0a" stroke="#7f1d1d" strokeWidth="1" />
              <text x="-88" y="4" fill="#fca5a5" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ROLLBACK</text>
              <text x="-38" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Keep v1.0.0 live</text>
              <text x="-38" y="14" fill="#f87171" fontSize="11" fontFamily="monospace">no outage · instant pivot</text>
            </g>


            {/* NODE 5 (BOTTOM RIGHT): Production v1.1.0 (Success Outcome) */}
            <g transform="translate(560, 528)">
              <rect x="-135" y="-28" width="270" height="56" rx="10" fill="#061810" stroke="#047857" strokeWidth="1.5" />
              <rect x="-125" y="-17" width="54" height="34" rx="6" fill="#10b981" />
              <text x="-98" y="4" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LIVE</text>
              <text x="-58" y="-3" fill="#ffffff" fontSize="14" fontFamily="sans-serif" fontWeight="bold">Production v1.1.0</text>
              <text x="-58" y="14" fill="#34d399" fontSize="11" fontFamily="monospace">new version serving traffic</text>
            </g>

          </svg>
        </div>
      </div>
    </div>
  )
}
