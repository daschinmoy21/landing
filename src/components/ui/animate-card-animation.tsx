"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Card {
  id: number
  contentType: 1 | 2 | 3
}

const cardData = {
  1: {
    app: "basic-http",
    cmd: "russel bench --app basic-http",
    e2e: [
      { label: "Russel container", val: "1595ms", desc: "1583+12", winner: true },
      { label: "Russel microVM", val: "3422ms", desc: "3407+15" },
      { label: "Podman baseline", val: "13009ms", desc: "12740+269" }
    ],
    spawn: [
      { label: "Russel microVM", val: "1247ms" },
      { label: "Russel container", val: "1213ms" },
      { label: "Podman baseline", val: "269ms" }
    ]
  },
  2: {
    app: "static-test",
    cmd: "russel bench --app static-test",
    e2e: [
      { label: "Russel container", val: "975ms", desc: "854+121", winner: true },
      { label: "Russel microVM", val: "1504ms", desc: "1487+17" },
      { label: "Podman baseline", val: "1645ms", desc: "927+718" }
    ],
    spawn: [
      { label: "Russel microVM", val: "1039ms" },
      { label: "Russel container", val: "612ms" },
      { label: "Podman baseline", val: "718ms" }
    ]
  },
  3: {
    app: "filebrowser",
    cmd: "russel bench --app filebrowser",
    e2e: [
      { label: "Russel container", val: "1057ms", desc: "921+136", winner: true },
      { label: "Russel microVM", val: "1395ms", desc: "1384+11" },
      { label: "Podman baseline", val: "16721ms", desc: "16240+481" }
    ],
    spawn: [
      { label: "Russel microVM", val: "688ms" },
      { label: "Russel container", val: "465ms" },
      { label: "Podman baseline", val: "481ms" }
    ]
  }
}

const initialCards: Card[] = [
  { id: 1, contentType: 1 },
  { id: 2, contentType: 2 },
  { id: 3, contentType: 3 },
]

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = {
  y: 360,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function CardContent({ contentType }: { contentType: 1 | 2 | 3 }) {
  const data = cardData[contentType]

  // Find max e2e value for scaling the progress bars
  const e2eValues = data.e2e.map(row => parseFloat(row.val))
  const maxE2E = Math.max(...e2eValues)

  return (
    <div className="bench-card" style={{ border: 'none', boxShadow: 'none', background: 'transparent', width: '100%', height: '100%', borderRadius: 0, maxWidth: 'none' }}>
      {/* Titlebar */}
      <div className="bench-card-titlebar">
        <div className="bench-card-dots">
          <div className="bench-card-dot red"></div>
          <div className="bench-card-dot yellow"></div>
          <div className="bench-card-dot green"></div>
        </div>
        <div className="bench-card-title" style={{ textTransform: 'uppercase' }}>benchmark · {data.app}</div>
      </div>

      {/* Body */}
      <div className="bench-card-body" style={{ padding: '16px 20px 20px' }}>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.05em', color: '#fff', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
          {data.app} · boot race
        </h4>
        <div className="sub" style={{ marginBottom: '14px', fontSize: '9.5px' }}>build → boot → serve (lower is better)</div>

        {/* E2E Bars */}
        <div className="bars" style={{ marginBottom: '20px' }}>
          {data.e2e.map((row, idx) => {
            const valNum = parseFloat(row.val)
            // ensure winner looks visually different, scale width relative to maximum (with 10% minimum width)
            const percent = Math.max(10, Math.round((valNum / maxE2E) * 100))
            return (
              <div className="bar-row" key={idx} style={{ marginBottom: '12px' }}>
                <div className="lbl" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '4px' }}>
                  <span className="name" style={{ color: row.winner ? 'var(--text-color)' : 'var(--text-muted)' }}>
                    {row.label}
                  </span>
                  <span className="t" style={{ color: row.winner ? 'var(--accent)' : 'var(--text-color)' }}>
                    {row.val} <span style={{ fontSize: '9px', color: 'var(--text-faint)' }}>({row.desc})</span>
                  </span>
                </div>
                <div className="bar-track">
                  <div className={`bar-fill ${row.winner ? "win" : "lose"}`} style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Spawn-to-Ready stats */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            // Spawn-to-Ready (excluding build)
          </h5>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            {data.spawn.map((row, idx) => {
              const isCtr = row.label.includes("container")
              return (
                <div key={idx} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '6px 8px', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ fontSize: '8px', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.label.replace("Russel ", "")}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: isCtr ? 'var(--accent)' : '#fff' }}>
                    {row.val}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
}: {
  card: Card
  index: number
  isAnimating: boolean
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      className="absolute flex h-[300px] flex-col overflow-hidden rounded-xl border border-border shadow-2xl will-change-transform"
      style={{
        zIndex,
        left: "50%",
        transform: `translate(-50%, ${y}px) scale(${scale})`,
        bottom: 0,
        backgroundColor: '#000000',
        borderColor: 'var(--border-color, oklch(0.11 0.022 145))',
        width: '720px',
        maxWidth: 'calc(100% - 24px)'
      }}
    >
      <CardContent contentType={card.contentType} />
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)

  const handleAnimate = () => {
    setIsAnimating(true)

    const nextContentType = ((cards[2].contentType % 3) + 1) as 1 | 2 | 3

    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }])
    setNextId((prev) => prev + 1)
    setIsAnimating(false)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center pt-2">
      <div className="relative h-[370px] overflow-hidden" style={{ width: '740px', maxWidth: '100%' }}>
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard key={card.id} card={card} index={index} isAnimating={isAnimating} />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-8 flex w-full items-center justify-center py-2">
        <button
          onClick={handleAnimate}
          className="flex h-9 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden border border-border px-8 font-mono text-[11px] text-white transition-all hover:bg-neutral-900 active:scale-[0.98]"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(255,255,255,0.03)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
