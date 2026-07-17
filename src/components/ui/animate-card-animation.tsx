"use client"

import { useEffect, useRef, useState } from "react"
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
  opacity: 0,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function CardContent({ contentType }: { contentType: 1 | 2 | 3 }) {
  const data = cardData[contentType]

  const readableAppName = {
    'basic-http': 'HTTP Server',
    'static-test': 'Static Site Server',
    'filebrowser': 'Filebrowser',
  }[data.app] ?? data.app

  const shortLabel = (label: string) => {
    if (label.includes('microVM')) return 'Russel microVM'
    if (label.includes('container')) return 'Russel container'
    return 'Podman baseline'
  }

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
        <div className="bench-card-title" style={{ textTransform: 'uppercase' }}>benchmark · {readableAppName}</div>
      </div>

      {/* Body */}
      <div className="bench-card-body" style={{ padding: '18px 24px 22px' }}>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', color: '#fff', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
          {readableAppName}
        </h4>
        <div className="sub" style={{ marginBottom: '16px', fontSize: '11px' }}>Russel vs Podman</div>

        {/* E2E Bars */}
        <div className="bars" style={{ marginBottom: '20px' }}>
          {data.e2e.map((row, idx) => {
            const valNum = parseFloat(row.val)
            const percent = Math.max(10, Math.round((valNum / maxE2E) * 100))
            return (
              <div className="bar-row" key={idx} style={{ marginBottom: '14px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: row.winner ? 'var(--text-color)' : 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                  {shortLabel(row.label)}
                </div>
                <div className="bar-track" style={{ position: 'relative' }}>
                  <div className={`bar-fill ${row.winner ? "win" : "lose"}`} style={{ width: `${percent}%`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: row.winner ? '6px' : '0', minWidth: row.winner ? '50px' : '0' }}>
                    {row.winner && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#040803', whiteSpace: 'nowrap' }}>
                        {row.val}
                      </span>
                    )}
                  </div>
                  {!row.winner && (
                    <span style={{ position: 'absolute', right: '-72px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {row.val}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
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
      className="absolute flex h-[360px] flex-col overflow-hidden rounded-xl border border-border shadow-2xl will-change-transform"
      style={{
        zIndex,
        left: "50%",
        transform: `translate(-50%, ${y}px) scale(${scale})`,
        bottom: 0,
        backgroundColor: '#000000',
        borderColor: 'var(--border-color, oklch(0.11 0.022 145))',
        width: '640px',
        maxWidth: 'calc(100% - 16px)'
      }}
    >
      <CardContent contentType={card.contentType} />
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const nextId = useRef(4)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const handleAnimate = () => {
    setIsAnimating(true)

    setCards((currentCards) => {
      const nextContentType = ((currentCards[2].contentType % 3) + 1) as 1 | 2 | 3
      return [...currentCards.slice(1), { id: nextId.current, contentType: nextContentType }]
    })
    nextId.current += 1
    setIsAnimating(false)
  }

  useEffect(() => {
    const interval = window.setInterval(() => nextButtonRef.current?.click(), 4000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="bench-stack">
      <button
        ref={nextButtonRef}
        type="button"
        onClick={handleAnimate}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }}
      />
      <div className="bench-stack-stage relative h-[430px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard key={card.id} card={card} index={index} isAnimating={isAnimating} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
