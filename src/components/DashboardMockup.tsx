import React, { useEffect, useRef, useState } from 'react';
import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  RotateCw,
  Share,
  Plus,
  Copy,
  Grid,
  Compass,
  Layers,
  ListTodo,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';

export const DashboardInner: React.FC = () => {
  return (
    <div className="w-[896px] bg-[#1a1a1c] text-white font-sans rounded-t-2xl overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 text-left select-none">
      {/* Title Bar Chrome */}
      <div className="bg-[#242427] border-b border-white/5 px-4 py-2.5 flex items-center justify-between">
        {/* Left Traffic Lights & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <PanelLeft className="w-3.5 h-3.5 text-white/40 cursor-pointer hover:text-white/70" />
            <ChevronLeft className="w-3.5 h-3.5 text-white/40 cursor-pointer hover:text-white/70" />
            <ChevronRight className="w-3.5 h-3.5 text-white/25 cursor-not-allowed" />
          </div>
        </div>

        {/* Center URL Bar */}
        <div className="bg-[#1a1a1c] rounded-md px-6 py-1 text-[10px] text-white/60 flex items-center gap-1.5 ring-1 ring-white/5 font-mono">
          <Monitor className="w-3 h-3 text-white/40" />
          <span>ctrl.russel.local:7878</span>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5">
          <RotateCw className="w-3.5 h-3.5 text-white/40 cursor-pointer hover:text-white/70" />
          <Share className="w-3.5 h-3.5 text-white/40 cursor-pointer hover:text-white/70" />
          <Plus className="w-3.5 h-3.5 text-white/40 cursor-pointer hover:text-white/70" />
          <Copy className="w-3.5 h-3.5 text-white/40 cursor-pointer hover:text-white/70" />
        </div>
      </div>

      {/* Main Dashboard Layout (Sidebar + Content Area) */}
      <div className="flex min-h-[460px]">
        {/* Sidebar (22% width) */}
        <div className="w-[22%] shrink-0 border-r border-white/5 bg-[#1e1e21] px-3 py-3.5 flex flex-col justify-between">
          <div>
            {/* Top Branding */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-1.5">
                <Logo className="w-4 h-4 text-white/70" />
                <span className="text-[11px] font-semibold text-white/80">Russel</span>
              </div>
              <Grid className="w-3.5 h-3.5 text-white/30 cursor-pointer" />
            </div>

            {/* Workspace Badge */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5 mb-4 border border-white/5">
              <div className="w-4 h-4 rounded bg-[#4E85BF] flex items-center justify-center text-[9px] font-bold text-white">
                R
              </div>
              <span className="text-[10px] text-white/80 font-medium truncate">Prod Cluster</span>
            </div>

            {/* Nav Items */}
            <div className="space-y-1">
              <div className="text-[10px] text-white/90 font-medium flex items-center gap-2 px-2 py-1.5 rounded bg-white/10">
                <Compass className="w-3.5 h-3.5 text-white/70" />
                <span>microVMs</span>
              </div>
              <div className="text-[10px] text-white/60 hover:text-white/80 flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer">
                <Layers className="w-3.5 h-3.5 text-white/40" />
                <span>Containers</span>
              </div>
              <div className="text-[10px] text-white/60 hover:text-white/80 flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer">
                <ListTodo className="w-3.5 h-3.5 text-white/40" />
                <span>Ingress</span>
              </div>
            </div>
          </div>

          {/* Recent Deployments List */}
          <div className="pt-3 border-t border-white/5">
            <div className="text-[9px] uppercase tracking-wider text-white/30 mb-2 px-1 font-mono">
              Live Services
            </div>
            <div className="space-y-1.5 text-[9px] font-mono">
              <div className="flex items-center gap-1.5 text-white/70 truncate px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]/80 shrink-0" />
                <span className="truncate">microvm-http (KVM)</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70 truncate px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]/80 shrink-0" />
                <span className="truncate">hello-rust (Container)</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50 truncate px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                <span className="truncate">filebrowser (virtiofs)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#161618] p-4 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#4E85BF] flex items-center justify-center text-sm font-bold text-white shadow-md">
                  R
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    Prod Cluster
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-mono">
                      HEALTHY
                    </span>
                  </h3>
                  <p className="text-[10px] text-white/45">Self-hosted KVM & Podman orchestrator</p>
                </div>
              </div>

              <button className="bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-white/5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Deploy Service</span>
              </button>
            </div>

            {/* Stats Grid (4 columns) */}
            <div className="grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5 p-3 mb-4">
              <div className="px-2">
                <div className="text-[8px] tracking-wider text-white/35 uppercase font-mono mb-1">
                  MICROVMS
                </div>
                <div className="text-xl font-medium text-white">62</div>
                <div className="text-[8px] text-white/40 mt-0.5">Instances booted</div>
              </div>

              <div className="px-2 pl-3">
                <div className="text-[8px] tracking-wider text-white/35 uppercase font-mono mb-1">
                  DRIFT
                </div>
                <div className="text-xl font-medium text-white">0%</div>
                <div className="text-[8px] text-white/40 mt-0.5">Nix reproducibility</div>
              </div>

              <div className="px-2 pl-3">
                <div className="text-[8px] tracking-wider text-white/35 uppercase font-mono mb-1">
                  SPAWN LATENCY
                </div>
                <div className="text-xl font-medium text-white">880ms</div>
                <div className="text-[8px] text-white/40 mt-0.5">Ready to serve</div>
              </div>

              <div className="px-2 pl-3">
                <div className="text-[8px] tracking-wider text-white/35 uppercase font-mono mb-1">
                  MAX THROUGHPUT
                </div>
                <div className="text-xl font-medium text-white">3.1M</div>
                <div className="text-[8px] text-white/40 mt-0.5">Requests / day</div>
              </div>
            </div>

            {/* Subject / Engine Cards (3 columns) */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 p-3 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-medium text-white mb-1">Cloud Hypervisor KVM</div>
                  <div className="text-[9px] text-white/45">24 microVMs active</div>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#4E85BF] h-full w-[78%]" />
                </div>
              </div>

              <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 p-3 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-medium text-white mb-1">Rootless Podman</div>
                  <div className="text-[9px] text-white/45">18 containers active</div>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#4E85BF] h-full w-[62%]" />
                </div>
              </div>

              <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 p-3 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-medium text-white mb-1">Traefik Ingress Proxy</div>
                  <div className="text-[9px] text-white/45">20 routes active</div>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#28c840] h-full w-[85%]" />
                </div>
              </div>
            </div>

            {/* Drafting / Deployment Queue Table */}
            <div className="rounded-xl bg-white/[0.03] ring-1 ring-white/5 overflow-hidden">
              <div className="px-3 py-2 border-b border-white/5 flex justify-between items-center text-[10px] text-white/50 font-mono">
                <span>DEPLOYMENT QUEUE</span>
                <span>4 ACTIVE</span>
              </div>
              <div className="divide-y divide-white/5 text-[9.5px]">
                <div className="px-3 py-2 flex items-center justify-between text-white/80 font-mono">
                  <span className="truncate max-w-[280px]">microvm-http (Cloud Hypervisor)</span>
                  <span className="text-white/40">512MB RAM</span>
                  <span className="text-white/40">2 vCPUs</span>
                  <span className="text-[#28c840]/80 bg-[#28c840]/10 px-2 py-0.5 rounded text-[8.5px]">
                    Ready
                  </span>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-white/80 font-mono">
                  <span className="truncate max-w-[280px]">hello-rust (Rootless Podman)</span>
                  <span className="text-white/40">256MB RAM</span>
                  <span className="text-white/40">1 vCPU</span>
                  <span className="text-[#28c840]/80 bg-[#28c840]/10 px-2 py-0.5 rounded text-[8.5px]">
                    Ready
                  </span>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-white/80 font-mono">
                  <span className="truncate max-w-[280px]">shortlink (virtio-fs store)</span>
                  <span className="text-white/40">512MB RAM</span>
                  <span className="text-white/40">2 vCPUs</span>
                  <span className="text-[#febc2e]/80 bg-[#febc2e]/10 px-2 py-0.5 rounded text-[8.5px]">
                    Building
                  </span>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-white/80 font-mono">
                  <span className="truncate max-w-[280px]">env-config (Nix closure)</span>
                  <span className="text-white/40">256MB RAM</span>
                  <span className="text-white/40">1 vCPU</span>
                  <span className="text-[#28c840]/80 bg-[#28c840]/10 px-2 py-0.5 rounded text-[8.5px]">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Scaled Dashboard Container Component using ResizeObserver */
export const ScaledDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const DESIGN_WIDTH = 896; // 4xl max width in Tailwind

    const updateScale = () => {
      const currentWidth = container.clientWidth;
      if (currentWidth === 0) return;

      const newScale = Math.min(currentWidth / DESIGN_WIDTH, 1);
      setScale(newScale);

      // Calculate scaled height (approx 530px design height)
      setContainerHeight(530 * newScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden flex justify-center"
      style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '896px',
          position: 'absolute',
          top: 0,
        }}
      >
        <DashboardInner />
      </div>
    </div>
  );
};
