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
      <div className="relative z-10 mb-6 flex flex-col items-center text-center">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.24_0.04_145)] bg-[oklch(0.08_0.02_145)] px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Zero-Downtime & Rollback Engine
        </span>
        <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white">
          Zero-Downtime Hot Swaps & Instant Rollbacks
        </h3>
        <p className="mt-1.5 max-w-xl text-xs md:text-sm text-zinc-400">
          Deploy new MicroVM releases seamlessly with zero dropped connections — and rollback instantly if health checks fail.
        </p>
      </div>

      {/* Main SVG Graph Container */}
      <div className="relative z-10 w-full overflow-x-auto">
        <div className="min-w-[760px] max-w-[860px] mx-auto relative h-[620px]">
          <svg className="w-full h-full" viewBox="0 0 800 620">
            <defs>
              <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Center Timeline Vertical Line */}
            <line x1="400" y1="65" x2="400" y2="580" stroke="#27272a" strokeWidth="2" />

            {/* Timeline Dots along Center Line */}
            {[140, 180, 260, 300, 340, 380, 420, 460, 500].map((y) => (
              <circle key={y} cx="400" cy={y} r="3" fill="#3f3f46" />
            ))}

            {/* 09:45 Timestamp Dot */}
            <circle cx="400" cy="100" r="5" fill="#10b981" />
            <circle cx="400" cy="100" r="9" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            <text x="400" y="88" fill="#71717a" fontSize="11" fontFamily="monospace" textAnchor="middle">
              09:45
            </text>

            {/* 11:45 Timestamp Dot */}
            <circle cx="400" cy="220" r="5" fill="#10b981" />
            <circle cx="400" cy="220" r="9" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            <text x="400" y="210" fill="#71717a" fontSize="11" fontFamily="monospace" textAnchor="middle">
              11:45
            </text>

            {/* 14:45 Timestamp Dot */}
            <circle cx="400" cy="540" r="5" fill="#10b981" />
            <circle cx="400" cy="540" r="9" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            <text x="400" y="530" fill="#71717a" fontSize="11" fontFamily="monospace" textAnchor="middle">
              14:45
            </text>

            {/* RIGHT BRANCH (Zero Downtime Hot Swap - Green) */}
            <g>
              {/* Branch curve out from 09:45 */}
              <path
                d="M 400 100 C 530 100, 570 130, 570 170"
                fill="none"
                stroke="#52525b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Vertical line down right side */}
              <line x1="570" y1="170" x2="570" y2="480" stroke="#10b981" strokeWidth="2" filter="url(#glow-emerald)" />
              
              {/* Rejoin curve back to 14:45 */}
              <path
                d="M 570 480 C 570 540, 480 540, 400 540"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                filter="url(#glow-emerald)"
              />

              {/* Right Node 1: Deploy v1.1.0 Release Pill */}
              <g transform="translate(570, 160)">
                <rect x="-95" y="-18" width="190" height="36" rx="18" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
                {/* Rocket Icon Chip */}
                <rect x="-87" y="-12" width="24" height="24" rx="6" fill="#10b981" />
                <text x="-75" y="4" fill="#09090b" fontSize="11" fontWeight="bold" textAnchor="middle">🚀</text>
                <text x="-52" y="4" fill="#e4e4e7" fontSize="12" fontFamily="sans-serif" fontWeight="500">Deploy</text>
                <text x="24" y="4" fill="#ffffff" fontSize="12" fontFamily="sans-serif" fontWeight="bold">v1.1.0</text>
              </g>

              {/* Right Node 2: White Deploying Pill */}
              <g transform="translate(570, 245)">
                <rect x="-135" y="-20" width="270" height="40" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
                <rect x="-127" y="-13" width="85" height="26" rx="4" fill="#09090b" />
                <text x="-85" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HOT-SWAP</text>
                <text x="-38" y="4" fill="#09090b" fontSize="13" fontFamily="sans-serif" fontWeight="bold">v1.1.0-microvm</text>
              </g>

              {/* Right Node 3: Health Check Passed Circle */}
              <g transform="translate(570, 340)">
                <text x="-32" y="5" fill="#e4e4e7" fontSize="13" fontFamily="sans-serif" fontWeight="500" textAnchor="end">
                  Health Check Passed
                </text>
                <circle cx="0" cy="0" r="18" fill="#022c22" stroke="#10b981" strokeWidth="2" filter="url(#glow-emerald)" />
                <path d="M -6 0 L -2 4 L 6 -4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Right Node 4: Traffic Swapped Circle */}
              <g transform="translate(570, 430)">
                <text x="-32" y="5" fill="#e4e4e7" fontSize="13" fontFamily="sans-serif" fontWeight="500" textAnchor="end">
                  Traffic Swapped (0ms)
                </text>
                <circle cx="0" cy="0" r="18" fill="#022c22" stroke="#10b981" strokeWidth="2" filter="url(#glow-emerald)" />
                <path d="M 0 6 L 0 -6 M -5 -1 L 0 -6 L 5 -1" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>

            {/* LEFT BRANCH (Instant Rollback - Red/Amber) */}
            <g>
              {/* Branch curve out from 11:45 */}
              <path
                d="M 400 220 C 270 220, 230 250, 230 290"
                fill="none"
                stroke="#52525b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Vertical line down left side */}
              <line x1="230" y1="290" x2="230" y2="540" stroke="#ef4444" strokeWidth="2" />

              {/* Left Node 1: Deploy Bad Build Pill */}
              <g transform="translate(230, 285)">
                <rect x="-105" y="-18" width="210" height="36" rx="18" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
                {/* Warning Icon Chip Left */}
                <rect x="-97" y="-12" width="24" height="24" rx="6" fill="#ef4444" />
                <text x="-85" y="4" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">⚠️</text>
                <text x="-60" y="4" fill="#e4e4e7" fontSize="12" fontFamily="sans-serif" fontWeight="500">Deploy</text>
                <text x="24" y="4" fill="#ffffff" fontSize="12" fontFamily="sans-serif" fontWeight="bold">v1.2.0-rc</text>
              </g>

              {/* Left Node 2: White Preview Bad Build Pill */}
              <g transform="translate(230, 360)">
                <rect x="-140" y="-20" width="280" height="40" rx="8" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="-132" y="-13" width="85" height="26" rx="4" fill="#450a0a" />
                <text x="-90" y="4" fill="#fca5a5" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">UNHEALTHY</text>
                <text x="-40" y="4" fill="#09090b" fontSize="13" fontFamily="sans-serif" fontWeight="bold">v1.2.0-rc-microvm</text>
              </g>

              {/* Left Node 3: 5xx Error Detected Circle */}
              <g transform="translate(230, 440)">
                <circle cx="0" cy="0" r="18" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                <text x="0" y="5" fill="#ef4444" fontSize="16" fontFamily="sans-serif" fontWeight="extrabold" textAnchor="middle">!</text>
                <text x="32" y="5" fill="#e4e4e7" fontSize="13" fontFamily="sans-serif" fontWeight="500" textAnchor="start">
                  5xx Errors Detected
                </text>
              </g>

              {/* Left Node 4: Instant Rollback Circle */}
              <g transform="translate(230, 520)">
                <circle cx="0" cy="0" r="18" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                {/* Rollback ↺ icon */}
                <path d="M -4 -4 A 6 6 0 1 1 -5 3 M -5 -7 L -5 -3 L -1 -3" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="32" y="5" fill="#fef08a" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="start">
                  Instant Rollback to v1.1
                </text>
              </g>
            </g>

            {/* TOP MAIN NODE: [ LIVE ] Production v1.0.0 */}
            <g transform="translate(400, 36)">
              <rect x="-115" y="-20" width="230" height="40" rx="10" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
              <rect x="-107" y="-13" width="52" height="26" rx="5" fill="#10b981" />
              <text x="-81" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="extrabold" textAnchor="middle">LIVE</text>
              <text x="-35" y="4" fill="#09090b" fontSize="13" fontFamily="sans-serif" fontWeight="bold">Production (v1.0.0)</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
