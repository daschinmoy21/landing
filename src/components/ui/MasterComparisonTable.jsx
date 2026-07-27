import React from 'react'

export default function MasterComparisonTable() {
	const columns = [
		{ key: 'dimension', label: 'Dimension', width: 'min-w-[160px]', sticky: true },
		{ key: 'russel', label: 'Russel', width: 'min-w-[200px]', highlight: true },
		{ key: 'compose', label: 'Docker Compose / Podman', width: 'min-w-[180px]' },
		{ key: 'k8s', label: 'Kubernetes (K8s / K3s)', width: 'min-w-[180px]' },
		{ key: 'fly', label: 'Fly.io / Railway / Render', width: 'min-w-[180px]' },
		{ key: 'lambda', label: 'AWS Lambda / Cloud Run', width: 'min-w-[180px]' },
		{ key: 'fargate', label: 'ECS/Fargate / GKE', width: 'min-w-[170px]' }
	]

	const rows = [
		{
			dimension: 'Who runs metal',
			russel: 'You (bare metal / Linux box)',
			compose: 'You',
			k8s: 'You or cloud provider',
			fly: 'Vendor',
			lambda: 'Vendor',
			fargate: 'Vendor'
		},
		{
			dimension: 'Primary unit',
			russel: 'Service (microVM or container)',
			compose: 'Container',
			k8s: 'Pod',
			fly: 'App / machine',
			lambda: 'Function / service',
			fargate: 'Task / pod'
		},
		{
			dimension: 'Build model',
			russel: 'Nix (flake, hermetic store)',
			compose: 'Dockerfile',
			k8s: 'Dockerfile / OCI',
			fly: 'Buildpacks / Docker',
			lambda: 'Zip / container',
			fargate: 'Container OCI'
		},
		{
			dimension: 'Isolation',
			russel: 'Kernel (microVM) or rootless container',
			compose: 'Namespace / cgroup (shared kernel)',
			k8s: 'Namespace + cgroups + policies',
			fly: 'Firecracker / gVisor / containers',
			lambda: 'Sandbox / microVM-ish',
			fargate: 'Container / microVM (varies)'
		},
		{
			dimension: 'Multi-tenant',
			russel: 'Strong (hardware wall via microVM)',
			compose: 'Weak (shared kernel)',
			k8s: 'Medium (if hardened)',
			fly: 'Vendor-managed',
			lambda: 'Vendor-managed',
			fargate: 'Vendor-managed'
		},
		{
			dimension: 'Control plane',
			russel: 'Small Rust russel-ctrl',
			compose: 'None / docker compose CLI',
			k8s: 'Large (15+ components, etcd)',
			fly: 'Vendor SaaS',
			lambda: 'Vendor SaaS',
			fargate: 'Vendor SaaS'
		},
		{
			dimension: 'Ingress',
			russel: 'Traefik file provider (local)',
			compose: 'Ports / reverse proxy DIY',
			k8s: 'Ingress controllers / CNI',
			fly: 'Built-in edge proxy',
			lambda: 'API Gateway / HTTP API',
			fargate: 'ALB / NLB'
		},
		{
			dimension: 'Scale model',
			russel: 'Single-host (predictable)',
			compose: 'Manual',
			k8s: 'Horizontal cluster HPA',
			fly: 'Region / machines',
			lambda: 'Auto scale-to-zero',
			fargate: 'Services / ASG'
		},
		{
			dimension: 'Secrets',
			russel: 'Host file store secret://',
			compose: 'env files',
			k8s: 'Secrets API',
			fly: 'Vendor secrets',
			lambda: 'IAM + Secrets Manager',
			fargate: 'IAM + Secrets Manager'
		},
		{
			dimension: 'Bill',
			russel: 'Electricity + your time ($0 SaaS markup)',
			compose: 'Same',
			k8s: 'Same or cloud cluster bill',
			fly: 'Monthly SaaS seat/compute',
			lambda: 'Pay per request + egress',
			fargate: 'Pay per vCPU/RAM hour'
		},
		{
			dimension: 'Best when',
			russel: 'Self-host, reproducible deploys, choose isolation',
			compose: 'Simple single apps',
			k8s: 'Many teams / massive clusters',
			fly: "Don't want to ops hardware",
			lambda: 'Event-driven spikes',
			fargate: 'Enterprise cloud-native'
		}
	]

	return (
		<div className="why-matrix-container w-full">
			<div className="overflow-hidden rounded-2xl border border-[oklch(0.18_0.028_145)] bg-[#0a1405] p-6 shadow-2xl">
				<p className="mb-1 font-mono text-[11px] font-bold tracking-widest text-[oklch(0.72_0.17_145)] uppercase">
					Compare
				</p>
				<h3 className="mb-1 font-sans text-2xl font-bold tracking-tight text-white">
					How Russel compares
				</h3>
				<p className="mb-6 text-xs text-[oklch(0.62_0.016_145)]">
					Deployment units, build reproducibility, isolation boundaries, and total ownership.
				</p>

				<div className="overflow-x-auto rounded-xl border border-[oklch(0.18_0.028_145)] bg-[#040803]">
					<table className="w-full min-w-[900px] border-collapse text-left text-xs">
						<thead>
							<tr className="border-b border-[oklch(0.18_0.028_145)] bg-[#0a1405]">
								{columns.map((col) => (
									<th
										key={col.key}
										className={`p-3 font-mono text-[11px] font-bold tracking-wider uppercase ${
											col.sticky
												? 'sticky left-0 z-10 border-r border-[oklch(0.18_0.028_145)] bg-[#0a1405] text-[oklch(0.62_0.016_145)]'
												: col.highlight
													? 'border-x border-[oklch(0.72_0.17_145_/_0.15)] bg-[oklch(0.72_0.17_145_/_0.06)] text-[oklch(0.72_0.17_145)]'
													: 'text-[oklch(0.62_0.016_145)]'
										} ${col.width}`}
									>
										{col.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-[oklch(0.18_0.028_145)]">
							{rows.map((row, idx) => (
								<tr
									key={idx}
									className={`transition-colors ${idx % 2 === 0 ? 'bg-[#050a04]' : 'bg-[#070d06]'} hover:bg-[#0b170e]`}
								>
									<td
										className="sticky left-0 z-10 border-r border-[oklch(0.18_0.028_145)] bg-inherit p-3 font-mono font-semibold text-white"
										style={{ backgroundColor: idx % 2 === 0 ? '#050a04' : '#070d06' }}
									>
										{row.dimension}
									</td>
									<td className="border-x border-[oklch(0.72_0.17_145_/_0.15)] bg-[oklch(0.72_0.17_145_/_0.05)] p-3 font-medium text-[oklch(0.72_0.17_145)]">
										{row.russel}
									</td>
									<td className="p-3 text-[oklch(0.72_0.018_145)]">{row.compose}</td>
									<td className="p-3 text-[oklch(0.72_0.018_145)]">{row.k8s}</td>
									<td className="p-3 text-[oklch(0.72_0.018_145)]">{row.fly}</td>
									<td className="p-3 text-[oklch(0.72_0.018_145)]">{row.lambda}</td>
									<td className="p-3 text-[oklch(0.72_0.018_145)]">{row.fargate}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
