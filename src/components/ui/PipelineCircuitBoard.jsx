import React from 'react'
import { CircuitBoard } from './circuit-board'
import { Terminal, PackageCheck, Layers, Box, Cpu } from 'lucide-react'

export default function PipelineCircuitBoard() {
  return (
    <div className="w-full flex items-center justify-center overflow-x-auto py-2">
      <CircuitBoard
        nodes={[
          { id: "local", x: 70, y: 130, label: "Local Workspace", icon: <Terminal className="w-4 h-4 text-emerald-400" />, status: "active", size: "md" },
          { id: "builder", x: 230, y: 130, label: "Nix Builder", icon: <PackageCheck className="w-4 h-4 text-purple-400" />, status: "processing", size: "lg" },
          { id: "control", x: 420, y: 130, label: "Control Plane", icon: <Layers className="w-4 h-4 text-emerald-400" />, status: "active", size: "lg" },
          { id: "container", x: 640, y: 60, label: "Container Engine", icon: <Box className="w-4 h-4 text-purple-400" />, status: "active", size: "md" },
          { id: "microvm", x: 640, y: 200, label: "MicroVM Engine", icon: <Cpu className="w-4 h-4 text-emerald-400" />, status: "active", size: "md" },
        ]}
        connections={[
          { from: "local", to: "builder", animated: true, pulseColor: "#10b981" },
          { from: "builder", to: "control", animated: true, pulseColor: "#a855f7" },
          { from: "control", to: "container", animated: true, pulseColor: "#a855f7" },
          { from: "control", to: "microvm", animated: true, pulseColor: "#10b981" },
        ]}
        width={740}
        height={260}
        pulseSpeed={2}
      />
    </div>
  )
}
