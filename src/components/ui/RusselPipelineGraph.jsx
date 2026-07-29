import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, AlertCircle, ArrowUpRight, Box, Cpu, GitBranch, ShieldCheck } from 'lucide-react'

export default function RusselPipelineGraph() {
  const [activeBranch, setActiveBranch] = useState('both') // 'both', 'microvm', 'container'

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-5 md:p-8">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.18 0.028 145 / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.18 0.028 145 / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header & Controls */}
      <div className="relative z-10 mb-8 flex flex-col items-center text-center">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.24_0.04_145)] bg-[oklch(0.08_0.02_145)] px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
          <GitBranch className="w-3.5 h-3.5" /> Isolated Branching Pipeline
        </span>
        <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-white">
          Instant Isolated Preview Branches & Zero-Downtime Deploys
        </h3>
        <p className="mt-2 max-w-xl text-xs md:text-sm text-[oklch(0.72_0.018_145)]">
          Test changes in hardware-isolated MicroVM preview branches before pivoting live traffic.
        </p>

        {/* Filter Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 rounded-lg border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-1.5">
          <button
            onClick={() => setActiveBranch('both')}
            className={`rounded-md px-3.5 py-1.5 font-mono text-xs font-bold transition-all ${
              activeBranch === 'both'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Branches
          </button>
          <button
            onClick={() => setActiveBranch('microvm')}
            className={`rounded-md px-3.5 py-1.5 font-mono text-xs font-bold transition-all ${
              activeBranch === 'microvm'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            MicroVM (v2)
          </button>
          <button
            onClick={() => setActiveBranch('container')}
            className={`rounded-md px-3.5 py-1.5 font-mono text-xs font-bold transition-all ${
              activeBranch === 'container'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Container (v1)
          </button>
        </div>
      </div>

      {/* Main Responsive Pipeline Container */}
      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
        {/* Top Node: Live Production (v1) */}
        <div className="flex flex-col items-center mb-6 z-10">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-zinc-950 px-4 py-2 shadow-xl backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-extrabold text-emerald-400">
              LIVE
            </span>
            <span className="font-sans text-xs md:text-sm font-bold text-white">Production (v1 Container)</span>
          </div>
          <span className="mt-1.5 font-mono text-[10px] text-zinc-500">09:45 UTC · Active Traffic</span>
        </div>

        {/* Middle Dual Columns Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative my-2">
          {/* Central Vertical Connector (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 border-r border-dashed border-[oklch(0.24_0.04_145)] pointer-events-none" />

          {/* Left Column: Container Staging (Failed Branch) */}
          <div className="flex flex-col items-center md:items-end">
            {(activeBranch === 'both' || activeBranch === 'container') ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xs flex flex-col gap-3 rounded-xl border border-red-950/60 bg-[#090303]/90 p-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Box className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-semibold text-zinc-300">Database Config</span>
                  </div>
                  <span className="rounded bg-red-950 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-red-400 border border-red-800/40">
                    STAGING
                  </span>
                </div>

                <div className="rounded-md border border-zinc-700 bg-white px-3 py-1.5 text-zinc-950 font-mono text-xs font-bold flex items-center justify-between">
                  <span>PREVIEW: db-v2</span>
                  <span className="text-[10px] text-zinc-600">v1.0.4</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-red-900/40 bg-red-950/30 p-2 text-xs">
                  <div className="flex items-center gap-2 text-red-400 font-medium">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Port Conflict Error</span>
                  </div>
                  <span className="font-mono text-[10px] text-red-300">Test Failed</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-red-950 text-xs text-zinc-400">
                  <span>Branch Action:</span>
                  <span className="flex items-center gap-1 text-red-400 font-mono text-[11px] font-bold">
                    <X className="w-3.5 h-3.5" /> Auto-Terminated
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="w-full max-w-xs h-32 rounded-xl border border-dashed border-zinc-800/60 flex items-center justify-center text-zinc-600 text-xs font-mono">
                Container branch hidden
              </div>
            )}
          </div>

          {/* Right Column: MicroVM Hardware Isolated Branch (Passed) */}
          <div className="flex flex-col items-center md:items-start">
            {(activeBranch === 'both' || activeBranch === 'microvm') ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xs flex flex-col gap-3 rounded-xl border border-emerald-900/60 bg-[#030904]/90 p-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs font-semibold text-zinc-200">MicroVM Kernel</span>
                  </div>
                  <span className="rounded bg-emerald-950 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-emerald-400 border border-emerald-800/40">
                    ISOLATED
                  </span>
                </div>

                <div className="rounded-md border border-emerald-400 bg-white px-3 py-1.5 text-zinc-950 font-mono text-xs font-bold flex items-center justify-between">
                  <span>PREVIEW: microvm-v2</span>
                  <span className="text-[10px] text-emerald-800">v2.0.0</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-emerald-900/40 bg-emerald-950/30 p-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>KVM Hardware Verified</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-300">Test Passed</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-emerald-950 text-xs text-zinc-300">
                  <span>Hot-Swap Route:</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-bold">
                    <ArrowUpRight className="w-3.5 h-3.5" /> Traefik Pivot
                  </span>
                </div>
              </motion.div>
            ) : (
              <div className="w-full max-w-xs h-32 rounded-xl border border-dashed border-zinc-800/60 flex items-center justify-center text-zinc-600 text-xs font-mono">
                MicroVM branch hidden
              </div>
            )}
          </div>
        </div>

        {/* Bottom Node: Updated Production (v2) */}
        <div className="flex flex-col items-center mt-6 z-10">
          <span className="mb-1.5 font-mono text-[10px] text-zinc-500">14:45 UTC · Rejoined Main</span>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400 bg-zinc-950 px-4 py-2 shadow-xl backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-extrabold text-emerald-400">
              ACTIVE
            </span>
            <span className="font-sans text-xs md:text-sm font-bold text-white">Production (v2 MicroVM)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
