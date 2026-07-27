import React from 'react'
import { Cloud, Server } from 'lucide-react'

export default function PositioningMap() {
	return (
		<div className="why-positioning-map w-full">
			<div className="relative overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-6 md:p-8">
				{/* Kicker — one per section */}
				<p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-[oklch(0.72_0.17_145)] uppercase">
					Positioning
				</p>
				<h2 className="mb-2 font-sans text-2xl font-bold tracking-tight text-white md:text-2xl">
					Where Russel sits in the infrastructure landscape
				</h2>
				<p className="mb-8 max-w-2xl text-sm leading-relaxed text-[oklch(0.62_0.016_145)]">
					Combining the <strong className="text-white">"Fly / Railway feel"</strong> (git → running
					HTTP service) with{' '}
					<strong className="text-[oklch(0.72_0.17_145)]">local hardware ownership</strong>, Nix
					reproducibility, and optional microVM isolation.
				</p>

				{/* 2×2 Spectrum — three columns on the self-hosted row, one vendor row below */}
				<div className="relative rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#040803] p-5 md:p-7">
					{/* Axis: Self-Hosted (top) */}
					<div className="mb-5 flex items-center justify-center gap-2 font-mono text-[11px] font-bold tracking-widest text-[oklch(0.72_0.17_145)] uppercase">
						<Server className="h-3.5 w-3.5" />
						Self-hosted (you own the box)
					</div>

					{/* Three self-hosted columns: Simple → Cluster */}
					<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
						<div className="rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-4">
							<div className="mb-1 font-mono text-[10px] font-semibold text-[oklch(0.62_0.016_145)]">
								Simple · DIY
							</div>
							<h4 className="mb-2 text-sm font-bold text-white">Docker / Podman raw</h4>
							<p className="text-[11px] leading-relaxed text-[oklch(0.62_0.016_145)]">
								Manual compose ops, custom scripts, shared kernel. Non-hermetic build drift.
							</p>
						</div>

						<div className="relative -mt-1 rounded-xl border border-[oklch(0.72_0.17_145_/_0.35)] bg-[oklch(0.72_0.17_145_/_0.06)] p-5 shadow-[0_0_20px_oklch(0.72_0.17_145_/_0.08)] md:-mt-2">
							<div className="mb-1 font-mono text-[10px] font-bold text-[oklch(0.72_0.17_145)]">
								Russel sweet spot
							</div>
							<h4 className="mb-2 text-base font-bold text-white">Self-Hosted Deploy Plane</h4>
							<p className="mb-3 text-[11px] leading-relaxed text-[oklch(0.78_0.12_145)]">
								Nix hermetic builds + Cloud Hypervisor microVMs (hardware isolation) OR rootless
								Podman containers.
							</p>
							<ul className="space-y-1 text-[11px] text-white">
								<li>· Your Linux box (no vendor markup)</li>
								<li>· Sub-second cold boots</li>
								<li>· Zero-downtime hot swaps</li>
							</ul>
						</div>

						<div className="rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-4">
							<div className="mb-1 font-mono text-[10px] font-semibold text-[oklch(0.62_0.016_145)]">
								Complex · Multi-node
							</div>
							<h4 className="mb-2 text-sm font-bold text-white">K3s / Kubernetes</h4>
							<p className="text-[11px] leading-relaxed text-[oklch(0.62_0.016_145)]">
								Full cluster OS. 15+ control components (etcd, CNI, ingress controllers, YAML maze).
							</p>
						</div>
					</div>

					{/* Axis divider: Vendor Cloud */}
					<div className="relative mb-5">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-[oklch(0.18_0.028_145)]" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-[#040803] px-4 font-mono text-[10px] font-bold tracking-widest text-[oklch(0.62_0.016_145)] uppercase">
								Vendor cloud (their metal, SaaS tax)
							</span>
						</div>
					</div>

					{/* Vendor row */}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex items-center justify-between rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-4">
							<div>
								<h5 className="text-sm font-bold text-white">Fly.io / Railway / Render</h5>
								<p className="mt-0.5 text-[11px] text-[oklch(0.62_0.016_145)]">
									PaaS mental model, vendor-managed metal with monthly bill markup.
								</p>
							</div>
							<Cloud className="ml-3 h-5 w-5 flex-shrink-0 text-[oklch(0.62_0.016_145)]" />
						</div>
						<div className="flex items-center justify-between rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-4">
							<div>
								<h5 className="text-sm font-bold text-white">AWS / GCP / Azure</h5>
								<p className="mt-0.5 text-[11px] text-[oklch(0.62_0.016_145)]">
									Proprietary control plane lock-in (Lambda, Cloud Run, ECS/Fargate, IAM
									complexity).
								</p>
							</div>
							<Server className="ml-3 h-5 w-5 flex-shrink-0 text-[oklch(0.62_0.016_145)]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
