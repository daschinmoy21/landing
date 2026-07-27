import React from 'react'
import { Shield, GitBranch, SlidersHorizontal, Terminal, AlertCircle, X } from 'lucide-react'

export default function PillarsAndBenches() {
	const pillars = [
		{
			title: 'Self-Hosted by Design',
			sub: 'Your CLI → Your Control Plane → Your KVM / Podman',
			icon: <Terminal className="h-4 w-4" />,
			desc: 'Not "open source that still needs our cloud." Zero account requirement, zero region pickers, zero egress bill platform tax.'
		},
		{
			title: 'Dual Runtime, One Deploy Path',
			sub: 'Cloud Hypervisor microVM or Rootless Podman container',
			icon: <Shield className="h-4 w-4" />,
			desc: 'MicroVM (hardware guest kernel wall, virtiofs) vs. Container (rootless Podman, fast path, low memory, same Nix artifact).'
		},
		{
			title: 'Nix as Build System',
			sub: 'Content-addressed /nix/store vs Dockerfile drift',
			icon: <GitBranch className="h-4 w-4" />,
			desc: 'PaaS uses fragile Dockerfiles. Russel uses pure Nix Flake store paths. One binary output feeds microVM virtiofs or rootless container rootfs.'
		},
		{
			title: 'Small, Understandable Control Plane',
			sub: 'cli · ctrl · runtime (Rust + Axum)',
			icon: <SlidersHorizontal className="h-4 w-4" />,
			desc: 'Not a 15-component Kubernetes cluster OS. Auditable Rust control plane daemon with state stored under /var/lib/russel.'
		},
		{
			title: 'Honest Boundaries',
			sub: 'What it is, what it is not — no overclaiming',
			icon: <AlertCircle className="h-4 w-4" />,
			desc: 'Single-host focused today. Not a multi-region anycast network, not infinite scale-to-zero, not a multi-node cluster scheduler.'
		}
	]

	const benchRows = [
		{
			scenario: '1 host CPU capped',
			vm: '~15–35k RPS (wins if containers starved)',
			container: '~8k RPS',
			podman: '~8k RPS'
		},
		{
			scenario: 'Uncapped, 1 guest vCPU',
			vm: '~32k RPS',
			container: '~36k RPS',
			podman: '~37k RPS'
		},
		{
			scenario: 'Uncapped, 2 guest vCPUs',
			vm: '~40k RPS (p99 ~4.5ms)',
			container: '~37k RPS (p99 ~2.8ms)',
			podman: '~39k RPS (p99 ~2.8ms)'
		},
		{ scenario: 'Host memory overhead', vm: '~190 MiB', container: '~16 MiB', podman: '~15 MiB' }
	]

	const nonGoals = [
		{ title: 'Multi-region global anycast', mapsTo: 'Fly.io, Cloudflare' },
		{ title: 'Infinite autoscaling / scale-to-zero', mapsTo: 'AWS Lambda, Cloud Run' },
		{ title: 'Full cluster scheduler / multi-node', mapsTo: 'Kubernetes' },
		{ title: 'Managed DB / object storage SaaS', mapsTo: 'Railway, AWS' },
		{ title: '"Push and we host it" SaaS', mapsTo: 'Vercel, Railway' }
	]

	const personas = [
		{
			title: 'Docker Compose User',
			same: 'Runs on your metal, simple setup',
			diff: 'Russel adds pure Nix hermetic builds, optional microVM isolation, and automated zero-downtime routing.'
		},
		{
			title: 'Kubernetes Operator',
			same: 'Declarative service deployments',
			diff: 'Russel is single-host and tiny: zero etcd, zero CNI maze, zero cluster OS maintenance.'
		},
		{
			title: 'Fly.io / Railway Fan',
			same: 'App-centric, git-oriented workflow',
			diff: 'You own compute, data, and isolation. Zero monthly platform markup or egress tax.'
		}
	]

	return (
		<div className="pillars-benches w-full space-y-10">
			{/* 5 Pillars — primary two get full-width hero treatment, secondary three get a compact row */}
			<div className="rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-6 md:p-8">
				<p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-[oklch(0.72_0.17_145)] uppercase">
					Pillars
				</p>
				<h3 className="mb-6 font-sans text-2xl font-bold tracking-tight text-white md:text-2xl">
					The 5 pillars of Russel
				</h3>

				{/* Primary pillars: full-width blocks with accent backing */}
				<div className="mb-6 space-y-4">
					{pillars.slice(0, 2).map((p, i) => (
						<div
							key={i}
							className="group relative overflow-hidden rounded-xl border border-[oklch(0.72_0.17_145_/_0.18)] bg-[oklch(0.72_0.17_145_/_0.04)] p-5 transition-colors hover:border-[oklch(0.72_0.17_145_/_0.35)] hover:bg-[oklch(0.72_0.17_145_/_0.06)]"
						>
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start">
								<div className="rounded-lg border border-[oklch(0.72_0.17_145_/_0.18)] bg-[oklch(0.72_0.17_145_/_0.08)] p-2.5 text-[oklch(0.72_0.17_145)]">
									{p.icon}
								</div>
								<div className="min-w-0 flex-1">
									<h4 className="mb-0.5 font-sans text-base font-bold text-white">{p.title}</h4>
									<div className="mb-1.5 font-mono text-[10px] text-[oklch(0.78_0.12_145)]">{p.sub}</div>
									<p className="text-[12px] leading-relaxed text-[oklch(0.72_0.018_145)]">{p.desc}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Secondary pillars: compact row */}
				<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
					{pillars.slice(2).map((p, i) => (
						<div
							key={i}
							className="group rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-3.5 transition-colors hover:border-[oklch(0.72_0.17_145_/_0.25)]"
						>
							<div className="mb-2 flex items-center gap-2">
								<div className="rounded-md border border-[oklch(0.72_0.17_145_/_0.10)] bg-[oklch(0.72_0.17_145_/_0.04)] p-1.5 text-[oklch(0.72_0.17_145)]">
									{p.icon}
								</div>
								<h4 className="font-sans text-[13px] font-bold text-white">{p.title}</h4>
							</div>
							<div className="mb-1 font-mono text-[9px] text-[oklch(0.62_0.016_145)]">{p.sub}</div>
							<p className="text-[11px] leading-relaxed text-[oklch(0.62_0.016_145)]">{p.desc}</p>
						</div>
					))}
				</div>
			</div>

			{/* Benchmarks */}
			<div className="rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-6 md:p-8">
				<p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-[oklch(0.72_0.17_145)] uppercase">
					Empirical proof
				</p>
				<h3 className="mb-1 font-sans text-xl font-bold tracking-tight text-white">
					Measured tradeoffs (Go basic-http, 30s @ 50 concurrent)
				</h3>
				<p className="mb-5 text-xs text-[oklch(0.62_0.016_145)]">
					Honest benchmarks on NixOS host: container path matches stock Podman; microVM adds
					hardware wall with competitive RPS.
				</p>
				<div className="overflow-x-auto rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#040803]">
					<table className="w-full border-collapse text-left text-xs">
						<thead>
							<tr className="border-b border-[oklch(0.18_0.028_145)] bg-[#0a1405]">
								<th className="p-3 font-mono font-bold text-[oklch(0.62_0.016_145)] uppercase">
									Scenario
								</th>
								<th className="border-x border-[oklch(0.72_0.17_145_/_0.15)] bg-[oklch(0.72_0.17_145_/_0.06)] p-3 font-mono font-bold text-[oklch(0.72_0.17_145)] uppercase">
									Russel microVM
								</th>
								<th className="p-3 font-mono font-bold text-[oklch(0.78_0.12_145)] uppercase">
									Russel container
								</th>
								<th className="p-3 font-mono font-bold text-[oklch(0.62_0.016_145)] uppercase">
									Raw Podman
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-[oklch(0.18_0.028_145)]">
							{benchRows.map((row, idx) => (
								<tr key={idx} className={idx % 2 === 0 ? 'bg-[#050a04]' : 'bg-[#070d06]'}>
									<td className="p-3 font-mono font-semibold text-white">{row.scenario}</td>
									<td className="border-x border-[oklch(0.72_0.17_145_/_0.15)] bg-[oklch(0.72_0.17_145_/_0.05)] p-3 font-mono font-semibold text-[oklch(0.72_0.17_145)]">
										{row.vm}
									</td>
									<td className="p-3 font-mono text-[oklch(0.78_0.12_145)]">{row.container}</td>
									<td className="p-3 font-mono text-[oklch(0.62_0.016_145)]">{row.podman}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Personas + Non-goals side by side */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Personas */}
				<div className="rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-6">
					<p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-[oklch(0.72_0.17_145)] uppercase">
						Mental models
					</p>
					<h3 className="mb-4 text-lg font-bold text-white">
						How Russel compares to your workflow
					</h3>
					<div className="space-y-3">
						{personas.map((p, i) => (
							<div
								key={i}
								className="rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#050a04] p-3.5"
							>
								<h4 className="mb-1 text-sm font-bold text-white">{p.title}</h4>
								<div className="mb-0.5 text-[11px] text-[oklch(0.62_0.016_145)]">
									<strong className="text-[oklch(0.72_0.018_145)]">Same:</strong> {p.same}
								</div>
								<div className="text-[11px] text-[oklch(0.78_0.12_145)]">
									<strong className="text-[oklch(0.72_0.17_145)]">Diff:</strong> {p.diff}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Non-goals */}
				<div className="rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-6">
					<p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-[#ef4444] uppercase">
						Boundaries
					</p>
					<h3 className="mb-2 text-lg font-bold text-white">What Russel is NOT today</h3>
					<p className="mb-4 text-xs text-[oklch(0.62_0.016_145)]">
						We don't overclaim. Russel is single-host focused for developers who self-host.
					</p>
					<div className="space-y-2">
						{nonGoals.map((item, i) => (
							<div
								key={i}
								className="flex items-center justify-between rounded-xl border border-[oklch(0.22_0.025_10)] bg-[#0f0808] p-2.5 text-xs"
							>
								<span className="flex items-center gap-2 font-medium text-white">
									<X className="h-3.5 w-3.5 flex-shrink-0 text-[#ef4444]" />
									{item.title}
								</span>
								<span className="rounded border border-[oklch(0.22_0.025_10)] bg-[oklch(0.15_0.02_10)] px-2 py-0.5 font-mono text-[10px] text-[#ef4444]">
									{item.mapsTo}
								</span>
							</div>
						))}
					</div>
					<div className="mt-5 border-t border-[oklch(0.15_0.02_10)] pt-4 text-center">
						<p className="font-mono text-xs font-bold text-[oklch(0.72_0.17_145)]">
							Deploy like a PaaS. Own the box. Choose the wall.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
