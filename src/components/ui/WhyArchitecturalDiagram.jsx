import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Box, XCircle } from 'lucide-react'

export default function WhyArchitecturalDiagram() {
	const [activePath, setActivePath] = useState('both')

	return (
		<div className="why-arch-container my-6 w-full">
			<div className="relative overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-5 md:p-6">
				{/* Top Bar */}
				<div className="mb-5 flex flex-col items-start justify-between gap-3 border-b border-[oklch(0.18_0.028_145)] pb-4 md:flex-row md:items-center">
					<h3 className="font-sans text-lg font-bold tracking-tight text-white">
						One orchestrator, dual runtimes, Nix reproducibility
					</h3>
					<div className="flex items-center gap-1 rounded-lg border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-1">
						<button
							onClick={() => setActivePath('both')}
							className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] font-bold transition-colors ${
								activePath === 'both'
									? 'bg-[oklch(0.72_0.17_145)] text-[#041004]'
									: 'text-[oklch(0.62_0.016_145)] hover:text-white'
							}`}
						>
							Dual
						</button>
						<button
							onClick={() => setActivePath('microvm')}
							className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] font-bold transition-colors ${
								activePath === 'microvm'
									? 'bg-[oklch(0.72_0.17_145)] text-[#041004]'
									: 'text-[oklch(0.62_0.016_145)] hover:text-white'
							}`}
						>
							MicroVM
						</button>
						<button
							onClick={() => setActivePath('container')}
							className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] font-bold transition-colors ${
								activePath === 'container'
									? 'bg-[oklch(0.68_0.12_230)] text-[#020810]'
									: 'text-[oklch(0.62_0.016_145)] hover:text-white'
							}`}
						>
							Container
						</button>
						<button
							onClick={() => setActivePath('traditional')}
							className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] font-bold transition-colors ${
								activePath === 'traditional'
									? 'bg-[#ef4444] text-white'
									: 'text-[oklch(0.62_0.016_145)] hover:text-white'
							}`}
						>
							Legacy
						</button>
					</div>
				</div>

				{/* SVG Diagram */}
				<div className="relative w-full overflow-hidden rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-2 md:p-4">
					<AnimatePresence mode="wait">
						{activePath !== 'traditional' ? (
							<motion.div
								key="russel-pipeline"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="w-full"
							>
								<svg
									viewBox="0 0 900 240"
									className="block h-auto w-full"
									style={{ maxHeight: '260px' }}
								>
									{/* Grid */}
									<path
										d="M 50 120 H 850 M 200 40 V 200 M 450 40 V 200 M 700 40 V 200"
										stroke="oklch(0.18 0.028 145)"
										strokeWidth="0.8"
										strokeDasharray="4 6"
									/>

									{/* Traces — single gentle glow */}
									<path
										d="M 110 120 L 210 120"
										stroke="oklch(0.72 0.17 145 / 0.35)"
										strokeWidth="2"
									/>
									<path
										d="M 330 120 L 410 120"
										stroke="oklch(0.72 0.17 145 / 0.35)"
										strokeWidth="2"
									/>
									{(activePath === 'both' || activePath === 'microvm') && (
										<>
											<path
												d="M 530 120 Q 560 120 560 60 L 610 60"
												stroke="oklch(0.72 0.17 145 / 0.35)"
												strokeWidth="2"
											/>
											<path
												d="M 730 60 Q 770 60 770 120 L 800 120"
												stroke="oklch(0.72 0.17 145 / 0.35)"
												strokeWidth="2"
											/>
										</>
									)}
									{(activePath === 'both' || activePath === 'container') && (
										<>
											<path
												d="M 530 120 Q 560 120 560 180 L 610 180"
												stroke="oklch(0.68 0.12 230 / 0.40)"
												strokeWidth="2"
											/>
											<path
												d="M 730 180 Q 770 180 770 120 L 800 120"
												stroke="oklch(0.68 0.12 230 / 0.40)"
												strokeWidth="2"
											/>
										</>
									)}

									{/* Nodes */}
									<g transform="translate(30, 95)">
										<rect
											x="0"
											y="0"
											width="80"
											height="50"
											rx="8"
											fill="#0a1405"
											stroke="oklch(0.18 0.028 145)"
											strokeWidth="1"
										/>
										<text
											x="40"
											y="24"
											fill="#fff"
											fontSize="10"
											fontFamily="monospace"
											fontWeight="bold"
											textAnchor="middle"
										>
											cli
										</text>
										<text
											x="40"
											y="36"
											fill="oklch(0.62 0.016 145)"
											fontSize="8"
											fontFamily="sans-serif"
											textAnchor="middle"
										>
											HTTP
										</text>
									</g>

									<g transform="translate(210, 95)">
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0a1405"
											stroke="oklch(0.72 0.17 145)"
											strokeWidth="1.5"
										/>
										<text
											x="60"
											y="23"
											fill="#fff"
											fontSize="11"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											russel-ctrl
										</text>
										<text
											x="60"
											y="35"
											fill="oklch(0.72 0.17 145)"
											fontSize="8.5"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Control Plane
										</text>
									</g>

									<g transform="translate(410, 95)">
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0a1405"
											stroke="oklch(0.18 0.028 145)"
											strokeWidth="1"
										/>
										<text
											x="60"
											y="23"
											fill="#fff"
											fontSize="10.5"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											nix build
										</text>
										<text
											x="60"
											y="35"
											fill="oklch(0.78 0.12 145)"
											fontSize="8"
											fontFamily="monospace"
											textAnchor="middle"
										>
											/nix/store/hash
										</text>
									</g>

									<g transform="translate(610, 35)" opacity={activePath === 'container' ? 0.3 : 1}>
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0a1405"
											stroke={
												activePath === 'microvm' || activePath === 'both'
													? 'oklch(0.72 0.17 145)'
													: 'oklch(0.18 0.028 145)'
											}
											strokeWidth="1"
										/>
										<text
											x="60"
											y="22"
											fill="#fff"
											fontSize="10"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											MicroVM Path
										</text>
										<text
											x="60"
											y="34"
											fill="oklch(0.62 0.016 145)"
											fontSize="7.5"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Cloud Hypervisor
										</text>
										<text
											x="60"
											y="44"
											fill="oklch(0.72 0.17 145)"
											fontSize="7"
											fontFamily="monospace"
											textAnchor="middle"
										>
											TAP · virtiofs (1.26s)
										</text>
									</g>

									<g transform="translate(610, 155)" opacity={activePath === 'microvm' ? 0.3 : 1}>
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#050a10"
											stroke={
												activePath === 'container' || activePath === 'both'
													? 'oklch(0.68 0.12 230)'
													: 'oklch(0.18 0.028 145)'
											}
											strokeWidth="1"
										/>
										<text
											x="60"
											y="22"
											fill="#fff"
											fontSize="10"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											Container Path
										</text>
										<text
											x="60"
											y="34"
											fill="oklch(0.62 0.016 145)"
											fontSize="7.5"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Rootless Podman
										</text>
										<text
											x="60"
											y="44"
											fill="oklch(0.75 0.08 230)"
											fontSize="7"
											fontFamily="monospace"
											textAnchor="middle"
										>
											--rootfs (0.95s)
										</text>
									</g>

									<g transform="translate(800, 95)">
										<rect
											x="0"
											y="0"
											width="85"
											height="50"
											rx="8"
											fill="#0a1405"
											stroke="oklch(0.72 0.17 145)"
											strokeWidth="1.5"
										/>
										<text
											x="42"
											y="23"
											fill="#fff"
											fontSize="10"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											Traefik
										</text>
										<text
											x="42"
											y="34"
											fill="oklch(0.72 0.17 145)"
											fontSize="8"
											fontFamily="monospace"
											textAnchor="middle"
										>
											200 OK
										</text>
									</g>
								</svg>
							</motion.div>
						) : (
							<motion.div
								key="traditional-pipeline"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="w-full"
							>
								<svg
									viewBox="0 0 900 240"
									className="block h-auto w-full"
									style={{ maxHeight: '260px' }}
								>
									<path
										d="M 50 120 H 850 M 200 40 V 200 M 450 40 V 200 M 700 40 V 200"
										stroke="oklch(0.18 0.028 145)"
										strokeWidth="0.8"
										strokeDasharray="4 6"
									/>
									<path
										d="M 120 120 L 230 120 M 350 120 L 440 120"
										stroke="oklch(0.3 0.03 10 / 0.5)"
										strokeWidth="2"
									/>
									<path
										d="M 560 120 Q 590 120 590 60 L 630 60 M 560 120 Q 590 120 590 180 L 630 180"
										stroke="oklch(0.3 0.03 10 / 0.5)"
										strokeWidth="2"
									/>
									<path
										d="M 750 60 Q 780 60 780 120 L 800 120 M 750 180 Q 780 180 780 120 L 800 120"
										stroke="oklch(0.3 0.03 10 / 0.5)"
										strokeWidth="2"
									/>

									<g transform="translate(30, 95)">
										<rect
											x="0"
											y="0"
											width="90"
											height="50"
											rx="8"
											fill="#0f0808"
											stroke="oklch(0.22 0.025 10)"
											strokeWidth="1"
										/>
										<text
											x="45"
											y="23"
											fill="#f87171"
											fontSize="10"
											fontFamily="monospace"
											fontWeight="bold"
											textAnchor="middle"
										>
											Dockerfile
										</text>
										<text
											x="45"
											y="35"
											fill="#991b1b"
											fontSize="8"
											fontFamily="sans-serif"
											textAnchor="middle"
										>
											apt-get drift
										</text>
									</g>

									<g transform="translate(230, 95)">
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0f0808"
											stroke="#ef4444"
											strokeWidth="1.5"
										/>
										<text
											x="60"
											y="23"
											fill="#fff"
											fontSize="10.5"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											Docker Daemon
										</text>
										<text
											x="60"
											y="35"
											fill="#f87171"
											fontSize="8"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Root / Monolithic
										</text>
									</g>

									<g transform="translate(440, 95)">
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0f0808"
											stroke="oklch(0.22 0.025 10)"
											strokeWidth="1"
										/>
										<text
											x="60"
											y="23"
											fill="#fff"
											fontSize="10"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											OCI Image Layers
										</text>
										<text
											x="60"
											y="35"
											fill="#f87171"
											fontSize="8"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Non-hermetic
										</text>
									</g>

									<g transform="translate(630, 35)">
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0f0808"
											stroke="oklch(0.22 0.025 10)"
											strokeWidth="1"
										/>
										<text
											x="60"
											y="22"
											fill="#fff"
											fontSize="9.5"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											Shared Kernel Container
										</text>
										<text
											x="60"
											y="34"
											fill="#991b1b"
											fontSize="7.5"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Weak multi-tenant
										</text>
									</g>

									<g transform="translate(630, 155)">
										<rect
											x="0"
											y="0"
											width="120"
											height="50"
											rx="8"
											fill="#0f0808"
											stroke="oklch(0.22 0.025 10)"
											strokeWidth="1"
										/>
										<text
											x="60"
											y="22"
											fill="#fff"
											fontSize="9.5"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											Cloud VM / PaaS
										</text>
										<text
											x="60"
											y="34"
											fill="#991b1b"
											fontSize="7.5"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Full Guest OS (~10s boot)
										</text>
									</g>

									<g transform="translate(800, 95)">
										<rect
											x="0"
											y="0"
											width="85"
											height="50"
											rx="8"
											fill="#0f0808"
											stroke="#ef4444"
											strokeWidth="1.5"
										/>
										<text
											x="42"
											y="23"
											fill="#fff"
											fontSize="9.5"
											fontFamily="sans-serif"
											fontWeight="bold"
											textAnchor="middle"
										>
											Downtime
										</text>
										<text
											x="42"
											y="34"
											fill="#ef4444"
											fontSize="7.5"
											fontFamily="monospace"
											textAnchor="middle"
										>
											Cold Boot Lag
										</text>
									</g>
								</svg>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* 3 pillar badges — no cards-in-cards, no numbering */}
				<div className="mt-5 grid grid-cols-1 gap-3 text-xs md:grid-cols-3">
					<div className="flex items-start gap-2">
						<Cpu className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.72_0.17_145)]" />
						<span className="text-[oklch(0.62_0.016_145)]">
							<strong className="text-white">Single orchestrator</strong> — Rust daemon, one config
							line flips runtime.
						</span>
					</div>
					<div className="flex items-start gap-2">
						<Box className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.72_0.17_145)]" />
						<span className="text-[oklch(0.62_0.016_145)]">
							<strong className="text-white">Nix hermetic builds</strong> — content-addressed
							/nix/store feeds both paths.
						</span>
					</div>
					<div className="flex items-start gap-2">
						<XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.72_0.17_145)]" />
						<span className="text-[oklch(0.62_0.016_145)]">
							<strong className="text-white">Zero-downtime traffic</strong> — Traefik dynamic file
							swap, no dropped requests.
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
