import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, AlertCircle, ArrowUpRight, Box, Cpu, GitBranch, Layers, ShieldCheck } from 'lucide-react'

export default function RusselPipelineGraph() {
  const [activeBranch, setActiveBranch] = useState('both') // 'both', 'microvm', 'container'

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-4 md:p-8">
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
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-1">
          <button
            onClick={() => setActiveBranch('both')}
            className={`rounded-md px-3 py-1 font-mono text-xs font-bold transition-all ${
              activeBranch === 'both'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Branches
          </button>
          <button
            onClick={() => setActiveBranch('microvm')}
            className={`rounded-md px-3 py-1 font-mono text-xs font-bold transition-all ${
              activeBranch === 'microvm'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            MicroVM (v2)
          </button>
          <button
            onClick={() => setActiveBranch('container')}
            className={`rounded-md px-3 py-1 font-mono text-xs font-bold transition-all ${
              activeBranch === 'container'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Container (v1)
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="relative z-10 mx-auto max-w-3xl min-h-[520px] flex justify-center items-center py-4">
        {/* SVG Cable Traces */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 520">
          <defs>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main Vertical Trunk */}
          <line
            x1="300"
            y1="40"
            x2="300"
            y2="480"
            stroke="oklch(0.24 0.04 145)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Left Branch Curves (Container Branch) */}
          {(activeBranch === 'both' || activeBranch === 'container') && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Branch Out */}
              <path
                d="M 300 130 C 200 130, 160 170, 160 210"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line x1="160" y1="210" x2="160" y2="400" stroke="#ef4444" strokeWidth="2" />
            </motion.g>
          )}

          {/* Right Branch Curves (MicroVM Branch) */}
          {(activeBranch === 'both' || activeBranch === 'microvm') && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {/* Branch Out */}
              <path
                d="M 300 110 C 400 110, 440 150, 440 190"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line x1="440" y1="190" x2="440" y2="390" stroke="#10b981" strokeWidth="2" filter="url(#glow-green)" />
              {/* Rejoin to Prod */}
              <path
                d="M 440 390 C 440 440, 360 450, 300 450"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                filter="url(#glow-green)"
              />
            </motion.g>
          )}
        </svg>

        {/* Nodes Layer */}
        <div className="relative w-full h-[500px]">
          {/* Top Main Node: Production */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-zinc-950 px-4 py-1.5 shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-emerald-400">
                LIVE
              </span>
              <span className="font-sans text-xs font-bold text-white">Production (v1 Container)</span>
            </div>
            <span className="mt-1 font-mono text-[10px] text-zinc-500">09:45 UTC</span>
          </div>

          {/* Left Branch (Container Staging / Failed Test) */}
          {(activeBranch === 'both' || activeBranch === 'container') && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-[30px] sm:left-[50px] top-[140px] flex flex-col items-end gap-5 w-[200px]"
            >
              {/* Change Tag */}
              <div className="flex items-center gap-2 rounded-lg border border-red-900/50 bg-zinc-950/90 px-3 py-1.5 text-xs text-zinc-200 shadow-md">
                <Box className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[10px] text-zinc-400">Changed:</span>
                <span className="font-semibold text-white">Database Config</span>
              </div>

              {/* Preview Branch Pill */}
              <div className="flex items-center gap-2 rounded-md border border-zinc-700 bg-white px-3 py-1.5 shadow-xl text-zinc-950">
                <span className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-white">
                  PREVIEW
                </span>
                <span className="font-mono text-xs font-bold">staging-db-v2</span>
              </div>

              {/* Test Status Node */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs font-medium text-red-400">Port Conflict</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/60 bg-red-950/80 text-red-400 shadow-md">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>

              {/* Action Node */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs font-medium text-zinc-400">Auto-Terminated</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400">
                  <X className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Branch (MicroVM Isolated Preview / Passed Test / Hot Swap) */}
          {(activeBranch === 'both' || activeBranch === 'microvm') && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute right-[30px] sm:right-[50px] top-[120px] flex flex-col items-start gap-5 w-[220px]"
            >
              {/* Change Tag */}
              <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-zinc-950/90 px-3 py-1.5 text-xs text-zinc-200 shadow-md">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[10px] text-zinc-400">Changed:</span>
                <span className="font-semibold text-white">MicroVM Kernel</span>
              </div>

              {/* Preview Branch Pill */}
              <div className="flex items-center gap-2 rounded-md border border-emerald-400/80 bg-white px-3 py-1.5 shadow-xl text-zinc-950">
                <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-white">
                  PREVIEW
                </span>
                <span className="font-mono text-xs font-bold text-zinc-950">microvm-v2-branch</span>
              </div>

              {/* Test Passed Node */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/80 bg-emerald-950/90 text-emerald-400 shadow-lg shadow-emerald-900/30">
                  <Check className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-bold text-emerald-400">Isolated Test Passed</span>
                  <span className="font-mono text-[10px] text-zinc-400">KVM Hardware Bounds Verified</span>
                </div>
              </div>

              {/* Hot Swap Node */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400 bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20">
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-bold text-white">Zero-Downtime Hot Swap</span>
                  <span className="font-mono text-[10px] text-emerald-400">Instant Traefik Route Pivot</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bottom Rejoin Node: Updated Production */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="mb-1 font-mono text-[10px] text-zinc-500">14:45 UTC</span>
            <div className="flex items-center gap-2 rounded-full border border-emerald-400 bg-zinc-950 px-4 py-1.5 shadow-xl backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-emerald-400">
                ACTIVE
              </span>
              <span className="font-sans text-xs font-bold text-white">Production (v2 MicroVM)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
