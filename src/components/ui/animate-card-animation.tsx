'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface Card {
	id: number
	contentType: 1 | 2 | 3
}

type BenchRow = { label: string; val: string; winner?: boolean }

const cardData: Record<1 | 2 | 3, { app: string; e2e: BenchRow[] }> = {
	1: {
		app: 'basic-http',
		e2e: [
			{ label: 'Russel container', val: '1595ms', winner: true },
			{ label: 'Russel microVM', val: '3422ms' },
			{ label: 'Podman baseline', val: '13009ms' }
		]
	},
	2: {
		app: 'static-test',
		e2e: [
			{ label: 'Russel container', val: '975ms', winner: true },
			{ label: 'Russel microVM', val: '1504ms' },
			{ label: 'Podman baseline', val: '1645ms' }
		]
	},
	3: {
		app: 'filebrowser',
		e2e: [
			{ label: 'Russel container', val: '1057ms', winner: true },
			{ label: 'Russel microVM', val: '1395ms' },
			{ label: 'Podman baseline', val: '16721ms' }
		]
	}
}

const APP_LABELS: Record<string, string> = {
	'basic-http': 'HTTP Server',
	'static-test': 'Static Site Server',
	filebrowser: 'Filebrowser'
}

const initialCards: Card[] = [
	{ id: 1, contentType: 1 },
	{ id: 2, contentType: 2 },
	{ id: 3, contentType: 3 }
]

const positionStyles = [
	{ scale: 1, y: 12 },
	{ scale: 0.95, y: -16 },
	{ scale: 0.9, y: -44 }
]

const exitAnimation = {
	y: 360,
	scale: 1,
	opacity: 0,
	zIndex: 10,
	x: '-50%' as const
}

const enterAnimation = {
	y: -16,
	scale: 0.9,
	x: '-50%' as const
}

function shortLabel(label: string) {
	if (label.includes('microVM')) return 'Russel microVM'
	if (label.includes('container')) return 'Russel container'
	return 'Podman baseline'
}

function CardContent({ contentType }: { contentType: 1 | 2 | 3 }) {
	const data = cardData[contentType]
	const readableAppName = APP_LABELS[data.app] ?? data.app
	const e2eValues = data.e2e.map((row) => parseFloat(row.val))
	const maxE2E = Math.max(...e2eValues)

	return (
		<div className="bench-card bench-card--stack">
			<div className="bench-card-titlebar">
				<div className="bench-card-dots" aria-hidden="true">
					<div className="bench-card-dot red" />
					<div className="bench-card-dot yellow" />
					<div className="bench-card-dot green" />
				</div>
				<div className="bench-card-title">benchmark · {readableAppName}</div>
			</div>

			<div className="bench-card-body">
				<h4 className="bench-card-heading">{readableAppName}</h4>
				<p className="bench-card-sub">Russel vs Podman · end-to-end deploy</p>

				<div className="bars">
					{data.e2e.map((row, idx) => {
						const valNum = parseFloat(row.val)
						const percent = Math.max(10, Math.round((valNum / maxE2E) * 100))
						return (
							<div className="bar-row" key={idx}>
								<div className={`bar-row-label${row.winner ? ' is-winner' : ''}`}>
									{shortLabel(row.label)}
								</div>
								<div className="bar-track bar-track--tall">
									<div
										className={`bar-fill ${row.winner ? 'win' : 'lose'}`}
										style={{ width: `${percent}%` }}
									>
										<span className="bar-fill-val">{row.val}</span>
									</div>
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
	isAnimating
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
			animate={{ y, scale, x: '-50%' }}
			exit={exitAnim}
			transition={{
				type: 'spring',
				duration: 1,
				bounce: 0
			}}
			className="bench-stack-card"
			style={{
				zIndex,
				left: '50%',
				bottom: 0
			}}
		>
			<CardContent contentType={card.contentType} />
		</motion.div>
	)
}

export default function AnimatedCardStack() {
	const reduceMotion = useReducedMotion() ?? false
	const [cards, setCards] = useState(initialCards)
	const [isAnimating, setIsAnimating] = useState(false)
	const nextId = useRef(4)

	const frontType = cards[0]?.contentType ?? 1

	const handleAnimate = () => {
		setIsAnimating(true)
		setCards((currentCards) => {
			const nextContentType = (((currentCards[2].contentType % 3) + 1) as 1 | 2 | 3)
			return [
				...currentCards.slice(1),
				{ id: nextId.current, contentType: nextContentType }
			]
		})
		nextId.current += 1
		// Original cleared on same tick — spring still runs via AnimatePresence exit
		setIsAnimating(false)
	}

	useEffect(() => {
		if (reduceMotion) return
		const interval = window.setInterval(handleAnimate, 4000)
		return () => window.clearInterval(interval)
	}, [reduceMotion])

	if (reduceMotion) {
		return (
			<div className="bench-stack">
				<div className="bench-stack-stage">
					<div className="bench-stack-card bench-stack-card--static">
						<CardContent contentType={frontType} />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="bench-stack">
			<div className="bench-stack-stage">
				<AnimatePresence initial={false}>
					{cards.slice(0, 3).map((card, index) => (
						<AnimatedCard
							key={card.id}
							card={card}
							index={index}
							isAnimating={isAnimating}
						/>
					))}
				</AnimatePresence>
			</div>
		</div>
	)
}
