const textStyle = {
	fontFamily: 'Inter, system-ui, sans-serif'
}

const monoStyle = {
	fontFamily: 'JetBrains Mono, ui-monospace, monospace'
}

export default function RusselPipelineGraph() {
	return (
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

			{/* Header Title */}
			<div className="relative z-10 mb-6 flex flex-col items-center text-center">
				<h3 className="font-sans text-xl font-bold tracking-tight text-white md:text-2xl">
					One health check decides the traffic path
				</h3>
				<p className="mt-1.5 max-w-xl text-xs text-zinc-400 md:text-sm">
					The current version keeps serving while a new MicroVM is tested. Traffic moves only when
					it is healthy.
				</p>
			</div>

			{/* Main SVG Graph Container */}
			<div
				className="relative z-10 w-full overflow-x-auto"
				aria-label="Zero-downtime deployment flow"
			>
				<div className="relative mx-auto h-[620px] max-w-[880px] min-w-[780px]">
					<svg
						className="h-full w-full"
						viewBox="0 0 800 620"
						role="img"
						aria-labelledby="pipeline-flow-title pipeline-flow-description"
					>
						<title id="pipeline-flow-title">Zero-downtime deployment flow</title>
						<desc id="pipeline-flow-description">
							Production stays live while a MicroVM release is deployed and checked. Healthy
							releases receive traffic; unhealthy releases are rejected and the current version
							remains live.
						</desc>

						<defs>
							<filter id="pipeline-glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
								<feGaussianBlur stdDeviation="3" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<marker
								id="pipeline-arrow-gray"
								markerWidth="8"
								markerHeight="8"
								refX="6"
								refY="4"
								orient="auto"
							>
								<path d="M0 0L8 4L0 8Z" fill="#71717a" />
							</marker>
							<marker
								id="pipeline-arrow-emerald"
								markerWidth="8"
								markerHeight="8"
								refX="6"
								refY="4"
								orient="auto"
							>
								<path d="M0 0L8 4L0 8Z" fill="#10b981" />
							</marker>
							<marker
								id="pipeline-arrow-red"
								markerWidth="8"
								markerHeight="8"
								refX="6"
								refY="4"
								orient="auto"
							>
								<path d="M0 0L8 4L0 8Z" fill="#ef4444" />
							</marker>
						</defs>

						{/* Main sequence: current production → deploy → health check */}
						<line
							x1="400"
							y1="78"
							x2="400"
							y2="112"
							stroke="#71717a"
							strokeWidth="1.5"
							markerEnd="url(#pipeline-arrow-gray)"
						/>
						<line
							x1="400"
							y1="178"
							x2="400"
							y2="216"
							stroke="#71717a"
							strokeWidth="1.5"
							markerEnd="url(#pipeline-arrow-gray)"
						/>
						<line
							x1="400"
							y1="286"
							x2="400"
							y2="326"
							stroke="#71717a"
							strokeWidth="1.5"
							markerEnd="url(#pipeline-arrow-gray)"
						/>

						{/* The live version stays available during the test */}
						<g transform="translate(400, 98)">
							<rect
								x="-104"
								y="-10"
								width="208"
								height="20"
								rx="10"
								fill="#09090b"
								stroke="#3f3f46"
								strokeWidth="1"
							/>
							<circle cx="-88" cy="0" r="3" fill="#10b981" />
							<text x="-78" y="4" fill="#a1a1aa" fontSize="10" style={monoStyle}>
								CURRENT VERSION STAYS LIVE
							</text>
						</g>

						{/* Current production */}
						<g transform="translate(400, 48)">
							<rect
								x="-126"
								y="-30"
								width="252"
								height="60"
								rx="12"
								fill="#ffffff"
								stroke="#e4e4e7"
								strokeWidth="1"
							/>
							<rect x="-114" y="-19" width="58" height="38" rx="7" fill="#10b981" />
							<text
								x="-85"
								y="4"
								fill="#ffffff"
								fontSize="11"
								fontWeight="800"
								textAnchor="middle"
								style={monoStyle}
							>
								LIVE
							</text>
							<text x="-42" y="-2" fill="#09090b" fontSize="13" fontWeight="700" style={textStyle}>
								Production
							</text>
							<text x="-42" y="15" fill="#52525b" fontSize="11" style={monoStyle}>
								v1.0.0 · serving traffic
							</text>
						</g>

						{/* Deploy candidate */}
						<g transform="translate(400, 145)">
							<rect
								x="-174"
								y="-33"
								width="348"
								height="66"
								rx="12"
								fill="#09090b"
								stroke="#3f3f46"
								strokeWidth="1.5"
							/>
							<rect x="-160" y="-22" width="86" height="44" rx="7" fill="#10b981" />
							<path
								d="M-139 -1l7 -7 7 7-7 7zM-132 -8l5 -5M-132 6l5 5"
								fill="none"
								stroke="#042f25"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<text x="-59" y="-4" fill="#a1a1aa" fontSize="10" style={monoStyle}>
								DEPLOY CANDIDATE
							</text>
							<text x="-59" y="15" fill="#ffffff" fontSize="14" fontWeight="700" style={textStyle}>
								v1.1.0-microvm
							</text>
						</g>

						{/* Health check gate */}
						<g transform="translate(400, 251)">
							<rect
								x="-142"
								y="-35"
								width="284"
								height="70"
								rx="14"
								fill="#111113"
								stroke="#71717a"
								strokeWidth="1.5"
							/>
							<circle cx="-112" cy="0" r="17" fill="#022c22" stroke="#10b981" strokeWidth="2" />
							<path
								d="M-119 0l5 5 9-10"
								fill="none"
								stroke="#10b981"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<text x="-84" y="-4" fill="#ffffff" fontSize="14" fontWeight="700" style={textStyle}>
								Health check
							</text>
							<text x="-84" y="16" fill="#a1a1aa" fontSize="11" style={monoStyle}>
								pass before traffic moves
							</text>
						</g>

						{/* Split labels */}
						<g transform="translate(295, 331)">
							<rect
								x="-34"
								y="-11"
								width="68"
								height="22"
								rx="11"
								fill="#2b0b0b"
								stroke="#7f1d1d"
								strokeWidth="1"
							/>
							<text
								x="0"
								y="4"
								fill="#fca5a5"
								fontSize="10"
								fontWeight="800"
								textAnchor="middle"
								style={monoStyle}
							>
								FAIL
							</text>
						</g>
						<g transform="translate(505, 331)">
							<rect
								x="-34"
								y="-11"
								width="68"
								height="22"
								rx="11"
								fill="#022c22"
								stroke="#047857"
								strokeWidth="1"
							/>
							<text
								x="0"
								y="4"
								fill="#6ee7b7"
								fontSize="10"
								fontWeight="800"
								textAnchor="middle"
								style={monoStyle}
							>
								PASS
							</text>
						</g>

						{/* Branches after the gate */}
						<path
							d="M400 326 C350 326 285 356 220 378"
							fill="none"
							stroke="#ef4444"
							strokeWidth="2.5"
							markerEnd="url(#pipeline-arrow-red)"
						/>
						<path
							d="M400 326 C450 326 515 356 580 378"
							fill="none"
							stroke="#10b981"
							strokeWidth="2.5"
							filter="url(#pipeline-glow-emerald)"
							markerEnd="url(#pipeline-arrow-emerald)"
						/>
						<line
							x1="220"
							y1="413"
							x2="220"
							y2="465"
							stroke="#ef4444"
							strokeWidth="2.5"
							markerEnd="url(#pipeline-arrow-red)"
						/>
						<line
							x1="580"
							y1="413"
							x2="580"
							y2="465"
							stroke="#10b981"
							strokeWidth="2.5"
							filter="url(#pipeline-glow-emerald)"
							markerEnd="url(#pipeline-arrow-emerald)"
						/>

						{/* Failed path */}
						<g transform="translate(220, 396)">
							<rect
								x="-132"
								y="-34"
								width="264"
								height="68"
								rx="12"
								fill="#09090b"
								stroke="#7f1d1d"
								strokeWidth="1.5"
							/>
							<circle cx="-106" cy="0" r="17" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
							<path
								d="M-112 -6l12 12M-100 -6l-12 12"
								stroke="#ef4444"
								strokeWidth="2.5"
								strokeLinecap="round"
							/>
							<text x="-77" y="-4" fill="#ffffff" fontSize="13" fontWeight="700" style={textStyle}>
								Reject release
							</text>
							<text x="-77" y="16" fill="#fca5a5" fontSize="11" style={monoStyle}>
								5xx errors detected
							</text>
						</g>

						<g transform="translate(220, 510)">
							<rect
								x="-142"
								y="-34"
								width="284"
								height="68"
								rx="12"
								fill="#ffffff"
								stroke="#ef4444"
								strokeWidth="1.5"
							/>
							<rect x="-130" y="-22" width="84" height="44" rx="7" fill="#450a0a" />
							<text
								x="-88"
								y="4"
								fill="#fca5a5"
								fontSize="10"
								fontWeight="800"
								textAnchor="middle"
								style={monoStyle}
							>
								ROLLBACK
							</text>
							<text x="-31" y="-4" fill="#09090b" fontSize="13" fontWeight="700" style={textStyle}>
								Keep v1.0.0 live
							</text>
							<text x="-31" y="16" fill="#7f1d1d" fontSize="11" style={monoStyle}>
								no outage · instant
							</text>
						</g>

						{/* Successful path */}
						<g transform="translate(580, 396)">
							<rect
								x="-132"
								y="-34"
								width="264"
								height="68"
								rx="12"
								fill="#09090b"
								stroke="#047857"
								strokeWidth="1.5"
							/>
							<circle
								cx="-106"
								cy="0"
								r="17"
								fill="#022c22"
								stroke="#10b981"
								strokeWidth="2"
								filter="url(#pipeline-glow-emerald)"
							/>
							<path
								d="M-113 0l5 5 10-11"
								fill="none"
								stroke="#10b981"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<text x="-77" y="-4" fill="#ffffff" fontSize="13" fontWeight="700" style={textStyle}>
								Shift traffic
							</text>
							<text x="-77" y="16" fill="#6ee7b7" fontSize="11" style={monoStyle}>
								zero dropped connections
							</text>
						</g>

						<g transform="translate(580, 510)">
							<rect
								x="-142"
								y="-34"
								width="284"
								height="68"
								rx="12"
								fill="#ffffff"
								stroke="#10b981"
								strokeWidth="1.5"
							/>
							<rect x="-130" y="-22" width="58" height="44" rx="7" fill="#10b981" />
							<text
								x="-101"
								y="4"
								fill="#ffffff"
								fontSize="10"
								fontWeight="800"
								textAnchor="middle"
								style={monoStyle}
							>
								LIVE
							</text>
							<text x="-57" y="-4" fill="#09090b" fontSize="13" fontWeight="700" style={textStyle}>
								Production v1.1.0
							</text>
							<text x="-57" y="16" fill="#047857" fontSize="11" style={monoStyle}>
								new version serving traffic
							</text>
						</g>

						{/* One-line takeaway */}
						<g transform="translate(400, 592)">
							<circle cx="-176" cy="0" r="3" fill="#10b981" />
							<text x="-165" y="4" fill="#a1a1aa" fontSize="10" style={monoStyle}>
								TRAFFIC MOVES ONLY AFTER THE GATE PASSES
							</text>
						</g>
					</svg>
				</div>
			</div>
		</div>
	)
}
