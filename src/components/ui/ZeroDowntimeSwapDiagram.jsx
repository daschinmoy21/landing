import React, { useState, useEffect } from 'react'
import { CircuitBoard } from './circuit-board'
import { Globe, Box, Cpu, CheckCircle } from 'lucide-react'

export default function ZeroDowntimeSwapDiagram() {
	// Active runtime state: 'container' (v1) or 'microvm' (v2)
	const [activeRuntime, setActiveRuntime] = useState('container')

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveRuntime((prev) => (prev === 'container' ? 'microvm' : 'container'))
		}, 3400)
		return () => clearInterval(interval)
	}, [])

	const isV1 = activeRuntime === 'container'

	return (
		<div className="relative w-full h-full flex items-center justify-center">
			<CircuitBoard
				variant="dark"
				nodes={[
					{
						id: 'ingress',
						x: 45,
						y: 80,
						label: 'Ingress Router',
						icon: <Globe className="w-4 h-4 text-emerald-400" />,
						status: 'active',
						size: 'sm'
					},
					{
						id: 'v1_container',
						x: 150,
						y: 35,
						label: 'v1 (Container)',
						icon: <Box className={`w-4 h-4 ${isV1 ? 'text-emerald-400' : 'text-neutral-500'}`} />,
						status: isV1 ? 'active' : 'inactive',
						size: isV1 ? 'md' : 'sm'
					},
					{
						id: 'v2_microvm',
						x: 150,
						y: 125,
						label: 'v2 (MicroVM)',
						icon: <Cpu className={`w-4 h-4 ${!isV1 ? 'text-emerald-400' : 'text-neutral-500'}`} />,
						status: !isV1 ? 'active' : 'inactive',
						size: !isV1 ? 'md' : 'sm'
					},
					{
						id: 'live_traffic',
						x: 255,
						y: 80,
						label: '200 OK',
						icon: <CheckCircle className="w-4 h-4 text-emerald-400" />,
						status: 'active',
						size: 'sm'
					}
				]}
				connections={[
					{
						from: 'ingress',
						to: 'v1_container',
						animated: true,
						pulseColor: '#10b981',
						pulseOpacity: isV1 ? 1 : 0
					},
					{
						from: 'v1_container',
						to: 'live_traffic',
						animated: true,
						pulseColor: '#10b981',
						pulseOpacity: isV1 ? 1 : 0
					},
					{
						from: 'ingress',
						to: 'v2_microvm',
						animated: true,
						pulseColor: '#10b981',
						pulseOpacity: !isV1 ? 1 : 0
					},
					{
						from: 'v2_microvm',
						to: 'live_traffic',
						animated: true,
						pulseColor: '#10b981',
						pulseOpacity: !isV1 ? 1 : 0
					}
				]}
				width={300}
				height={160}
				pulseSpeed={2}
			/>
		</div>
	)
}
