export default function RusselPipelineGraph() {
	return (
		<div className="pipeline-graph-wrap">
			{/* Section framing — story first, then diagram */}
			<div className="mb-8 text-center">
				<h2 className="pipeline-graph-heading font-[family-name:var(--font-display,Clash-Display,Inter,sans-serif)] text-[clamp(1.5rem,3.2vw,2.25rem)] font-bold tracking-[-0.03em] text-[oklch(0.93_0.008_145)]">
					Hot-swap releases. Never drop traffic.
				</h2>
				<p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[oklch(0.72_0.018_145)]">
					Production keeps serving while a new MicroVM boots beside it. Healthy builds take
					traffic with zero dropped connections. Unhealthy builds are rejected — live stays
					on the last good version.
				</p>
			</div>

			<div className="relative w-full overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-4 select-none md:p-8">
				{/* Dark Grid Background */}
				<div
					className="pointer-events-none absolute inset-0 opacity-25"
					style={{
						backgroundImage: `
            linear-gradient(to right, #1c261e 1px, transparent 1px),
            linear-gradient(to bottom, #1c261e 1px, transparent 1px)
          `,
						backgroundSize: '36px 36px'
					}}
				/>

				{/* Quiet legend only — graph carries the story */}
				<div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase">
					<span className="text-zinc-400">Release flow</span>
					<span className="flex flex-wrap items-center gap-x-4 gap-y-1">
						<span className="inline-flex items-center gap-1.5">
							<span className="h-1.5 w-1.5 rounded-full bg-zinc-100" />
							<span className="text-zinc-300/90">live spine</span>
						</span>
						<span className="inline-flex items-center gap-1.5">
							<span className="h-px w-3 bg-emerald-500/80" />
							<span className="text-emerald-500/80">promote</span>
						</span>
						<span className="inline-flex items-center gap-1.5">
							<span className="h-px w-3 bg-red-500/70" />
							<span className="text-red-400/70">reject</span>
						</span>
					</span>
				</div>

				<div
					className="relative z-10 w-full overflow-x-auto"
					aria-label="Zero-downtime release flow: healthy hot-swap promotes traffic; failed deploy is rejected without interrupting production"
				>
					<div className="relative mx-auto h-[620px] max-w-[920px] min-w-[800px]">
						<svg
							className="h-full w-full"
							viewBox="0 0 880 620"
							role="img"
							aria-labelledby="pipeline-title pipeline-description"
						>
							<title id="pipeline-title">Zero-downtime release flow</title>
							<desc id="pipeline-description">
								Production traffic stays live the entire time. A healthy MicroVM release is
								hot-swapped in with zero dropped connections. A failed release is marked
								unhealthy, never receives traffic, and production continues on the last good
								version.
							</desc>
							<defs>
								<filter id="glow-emerald" x="-40%" y="-40%" width="180%" height="180%">
									<feGaussianBlur stdDeviation="2.5" result="blur" />
									<feMerge>
										<feMergeNode in="blur" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
								{/* Main production trunk — white/neutral, not green */}
								<linearGradient id="live-spine" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#f4f4f5" stopOpacity="0.55" />
									<stop offset="45%" stopColor="#fafafa" stopOpacity="0.95" />
									<stop offset="100%" stopColor="#e4e4e7" stopOpacity="0.6" />
								</linearGradient>
								<marker
									id="arrow-gray"
									markerWidth="7"
									markerHeight="7"
									refX="5.5"
									refY="3.5"
									orient="auto"
									markerUnits="userSpaceOnUse"
								>
									<path d="M0 0L7 3.5L0 7Z" fill="#71717a" />
								</marker>
								<marker
									id="arrow-emerald"
									markerWidth="7"
									markerHeight="7"
									refX="5.5"
									refY="3.5"
									orient="auto"
									markerUnits="userSpaceOnUse"
								>
									<path d="M0 0L7 3.5L0 7Z" fill="#10b981" />
								</marker>
								<marker
									id="arrow-red"
									markerWidth="7"
									markerHeight="7"
									refX="5.5"
									refY="3.5"
									orient="auto"
									markerUnits="userSpaceOnUse"
								>
									<path d="M0 0L7 3.5L0 7Z" fill="#ef4444" />
								</marker>
							</defs>

							{/* ===== CENTER SPINE: production never stops (white trunk) ===== */}
							<line
								x1="440"
								y1="52"
								x2="440"
								y2="575"
								stroke="#fafafa"
								strokeWidth="12"
								opacity="0.06"
							/>
							<line
								x1="440"
								y1="52"
								x2="440"
								y2="575"
								stroke="url(#live-spine)"
								strokeWidth="3"
							/>

							{/* Top LIVE pill */}
							<g transform="translate(440, 32)">
								<rect
									x="-118"
									y="-18"
									width="236"
									height="36"
									rx="10"
									fill="#fff"
									stroke="#e4e4e7"
									strokeWidth="1"
								/>
								<rect x="-110" y="-11" width="48" height="22" rx="5" fill="#10b981" />
								<text
									x="-86"
									y="4"
									fill="#041004"
									fontSize="10"
									fontFamily="ui-monospace, monospace"
									fontWeight="800"
									textAnchor="middle"
								>
									LIVE
								</text>
								<text
									x="-50"
									y="4"
									fill="#09090b"
									fontSize="13"
									fontFamily="Inter, system-ui, sans-serif"
									fontWeight="700"
								>
									Production always on
								</text>
							</g>

							{/* Spine markers — labels LEFT so right branch stays clear */}
							{/* A: v1.0.0 */}
							<g transform="translate(440, 88)">
								<circle cx="0" cy="0" r="7" fill="#18181b" stroke="#f4f4f5" strokeWidth="2" />
								<circle cx="0" cy="0" r="3" fill="#fafafa" />
								<text
									x="-14"
									y="4"
									fill="#e4e4e7"
									fontSize="11"
									fontFamily="ui-monospace, monospace"
									fontWeight="600"
									textAnchor="end"
								>
									v1.0.0 serving
								</text>
							</g>

							{/* B: promote point after healthy path */}
							<g transform="translate(440, 310)">
								<circle
									cx="0"
									cy="0"
									r="10"
									fill="#18181b"
									stroke="#fafafa"
									strokeWidth="2.5"
								/>
								<circle cx="0" cy="0" r="4" fill="#fff" />
								<text
									x="-16"
									y="-2"
									fill="#f4f4f5"
									fontSize="12"
									fontFamily="ui-monospace, monospace"
									fontWeight="700"
									textAnchor="end"
								>
									v1.1.0 live
								</text>
								<text
									x="-16"
									y="13"
									fill="#71717a"
									fontSize="10"
									fontFamily="ui-monospace, monospace"
									textAnchor="end"
								>
									promoted · no gap
								</text>
							</g>

							{/* C: still live after failed attempt — labels on RIGHT so they never collide with reject path */}
							<g transform="translate(440, 560)">
								<circle cx="0" cy="0" r="7" fill="#18181b" stroke="#f4f4f5" strokeWidth="2" />
								<circle cx="0" cy="0" r="3" fill="#fafafa" />
								<text
									x="14"
									y="-2"
									fill="#e4e4e7"
									fontSize="11"
									fontFamily="ui-monospace, monospace"
									fontWeight="600"
								>
									still v1.1.0
								</text>
								<text
									x="14"
									y="12"
									fill="#71717a"
									fontSize="10"
									fontFamily="ui-monospace, monospace"
								>
									uninterrupted
								</text>
							</g>

							{/* ===== RIGHT: HEALTHY PROMOTE PATH ===== */}
							<g>
								<text
									x="640"
									y="108"
									fill="#52525b"
									fontSize="10"
									fontFamily="ui-monospace, monospace"
									textAnchor="middle"
									letterSpacing="0.1em"
								>
									HEALTHY PATH
								</text>

								{/* Branch from spine → deploy */}
								<path
									d="M 440 110 C 520 110, 580 130, 640 148"
									fill="none"
									stroke="#3f3f46"
									strokeWidth="1.5"
									strokeDasharray="4 3"
									markerEnd="url(#arrow-gray)"
								/>

								{/* Deploy → Hot-swap */}
								<line
									x1="640"
									y1="186"
									x2="640"
									y2="208"
									stroke="#52525b"
									strokeWidth="1.5"
									markerEnd="url(#arrow-gray)"
								/>

								{/* Hot-swap → Health card */}
								<line
									x1="640"
									y1="258"
									x2="640"
									y2="278"
									stroke="#10b981"
									strokeWidth="2"
									filter="url(#glow-emerald)"
									markerEnd="url(#arrow-emerald)"
								/>

								{/* Health card → rejoin promote marker on spine */}
								<path
									d="M 512 310 L 456 310"
									fill="none"
									stroke="#10b981"
									strokeWidth="2.5"
									filter="url(#glow-emerald)"
									markerEnd="url(#arrow-emerald)"
								/>
								{/* connector from health card bottom-left-ish to rejoin line */}
								<path
									d="M 640 344 C 640 310, 560 310, 512 310"
									fill="none"
									stroke="#10b981"
									strokeWidth="2.5"
									filter="url(#glow-emerald)"
								/>

								{/* Deploy pill */}
								<g transform="translate(640, 166)">
									<rect
										x="-92"
										y="-18"
										width="184"
										height="36"
										rx="18"
										fill="#09090b"
										stroke="#3f3f46"
										strokeWidth="1.5"
									/>
									<rect x="-84" y="-12" width="24" height="24" rx="6" fill="#10b981" />
									<text
										x="-72"
										y="4"
										fill="#09090b"
										fontSize="10"
										fontFamily="ui-monospace, monospace"
										fontWeight="800"
										textAnchor="middle"
									>
										&gt;_
									</text>
									<text
										x="-50"
										y="4"
										fill="#d4d4d8"
										fontSize="12"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="500"
									>
										Deploy
									</text>
									<text
										x="22"
										y="4"
										fill="#fff"
										fontSize="12"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="700"
									>
										v1.1.0
									</text>
								</g>

								{/* Hot-swap pill */}
								<g transform="translate(640, 238)">
									<rect
										x="-128"
										y="-20"
										width="256"
										height="40"
										rx="8"
										fill="#fff"
										stroke="#e4e4e7"
										strokeWidth="1"
									/>
									<rect x="-120" y="-13" width="86" height="26" rx="4" fill="#09090b" />
									<text
										x="-77"
										y="4"
										fill="#fff"
										fontSize="10"
										fontFamily="ui-monospace, monospace"
										fontWeight="700"
										textAnchor="middle"
									>
										HOT-SWAP
									</text>
									<text
										x="-28"
										y="4"
										fill="#09090b"
										fontSize="13"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="700"
									>
										v1.1.0-microvm
									</text>
								</g>

								{/* Promote result card */}
								<g transform="translate(640, 316)">
									<rect
										x="-128"
										y="-28"
										width="256"
										height="56"
										rx="10"
										fill="#022c22"
										stroke="#047857"
										strokeWidth="1.5"
									/>
									<circle
										cx="-98"
										cy="0"
										r="14"
										fill="#064e3b"
										stroke="#10b981"
										strokeWidth="1.5"
									/>
									<path
										d="M -104 0 L -100 4 L -92 -4"
										fill="none"
										stroke="#34d399"
										strokeWidth="2.2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<text
										x="-74"
										y="-4"
										fill="#a7f3d0"
										fontSize="12"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="600"
									>
										Health check passed
									</text>
									<text
										x="-74"
										y="12"
										fill="#6ee7b7"
										fontSize="11"
										fontFamily="ui-monospace, monospace"
										fontWeight="600"
									>
										Traffic shifted · 0 dropped
									</text>
								</g>
							</g>

							{/* ===== LEFT: FAILED PATH (never joins live) ===== */}
							<g>
								<text
									x="240"
									y="368"
									fill="#52525b"
									fontSize="10"
									fontFamily="ui-monospace, monospace"
									textAnchor="middle"
									letterSpacing="0.1em"
								>
									FAILED PATH
								</text>

								{/* Branch from spine after promote — attempt beside live */}
								<path
									d="M 440 370 C 360 370, 300 390, 240 410"
									fill="none"
									stroke="#3f3f46"
									strokeWidth="1.5"
									strokeDasharray="4 3"
									markerEnd="url(#arrow-gray)"
								/>

								{/* Deploy → Unhealthy */}
								<line
									x1="240"
									y1="448"
									x2="240"
									y2="470"
									stroke="#52525b"
									strokeWidth="1.5"
									markerEnd="url(#arrow-gray)"
								/>

								{/* Unhealthy → dead end (no rejoin) */}
								<line
									x1="240"
									y1="520"
									x2="240"
									y2="538"
									stroke="#ef4444"
									strokeWidth="2"
									markerEnd="url(#arrow-red)"
								/>
								<circle cx="240" cy="552" r="5" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />

								{/* Deploy bad */}
								<g transform="translate(240, 428)">
									<rect
										x="-100"
										y="-18"
										width="200"
										height="36"
										rx="18"
										fill="#09090b"
										stroke="#3f3f46"
										strokeWidth="1.5"
									/>
									<rect x="-92" y="-12" width="24" height="24" rx="6" fill="#ef4444" />
									<text
										x="-80"
										y="5"
										fill="#fff"
										fontSize="13"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="800"
										textAnchor="middle"
									>
										!
									</text>
									<text
										x="-56"
										y="4"
										fill="#d4d4d8"
										fontSize="12"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="500"
									>
										Deploy
									</text>
									<text
										x="22"
										y="4"
										fill="#fff"
										fontSize="12"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="700"
									>
										v1.2.0-rc
									</text>
								</g>

								{/* Unhealthy pill */}
								<g transform="translate(240, 500)">
									<rect
										x="-128"
										y="-20"
										width="256"
										height="40"
										rx="8"
										fill="#fff"
										stroke="#ef4444"
										strokeWidth="1.5"
									/>
									<rect x="-120" y="-13" width="88" height="26" rx="4" fill="#450a0a" />
									<text
										x="-76"
										y="4"
										fill="#fca5a5"
										fontSize="10"
										fontFamily="ui-monospace, monospace"
										fontWeight="700"
										textAnchor="middle"
									>
										UNHEALTHY
									</text>
									<text
										x="-26"
										y="4"
										fill="#09090b"
										fontSize="12"
										fontFamily="Inter, system-ui, sans-serif"
										fontWeight="700"
									>
										v1.2.0-rc-microvm
									</text>
								</g>

								{/* Reject note stays under the fail branch only (left of spine) */}
								<text
									x="240"
									y="574"
									fill="#fca5a5"
									fontSize="11"
									fontFamily="Inter, system-ui, sans-serif"
									fontWeight="500"
									textAnchor="middle"
								>
									5xx · rejected · never promoted
								</text>
							</g>

							{/* Callout: live continues through the failure window */}
							<g transform="translate(456, 440)">
								<rect
									x="0"
									y="-14"
									width="168"
									height="28"
									rx="6"
									fill="#0a120c"
									stroke="#14532d"
									strokeWidth="1"
								/>
								<text
									x="12"
									y="5"
									fill="#86efac"
									fontSize="10"
									fontFamily="ui-monospace, monospace"
									fontWeight="600"
								>
									live traffic continues →
								</text>
							</g>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}
