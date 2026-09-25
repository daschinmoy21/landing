import React, { useEffect, useMemo, useState } from 'react';
import { GitBranch, Globe, Hammer, Search, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ContainerGlyph, MicroVMGlyph, type Glyph } from './Glyphs';
import { SectionHeader } from './SectionHeader';

type NodeKind = 'cli' | 'repo' | 'resolve' | 'build' | 'microvm' | 'container' | 'ingress';

interface GraphNode {
  id: NodeKind;
  x: number;
  y: number;
  w: number;
  title: string;
  subtitle: string;
  color: string;
  icon: LucideIcon | Glyph;
}

const C = {
  ink: '#14233c',
  muted: '#52768a',
  sky: '#2c779c',
  line: '#8fb5c6',
  container: '#185a7a',
  microvm: '#1f6b4a',
};

const NODE_H = 58;
const VIEW_W = 1170;
const VIEW_H = 340;

const NODES: GraphNode[] = [
  { id: 'cli', x: 24, y: 84, w: 184, title: 'russel deploy', subtitle: 'CLI · git URL', color: C.sky, icon: Terminal },
  { id: 'repo', x: 24, y: 222, w: 184, title: 'Git repo', subtitle: 'Russelfile.toml', color: C.sky, icon: GitBranch },
  { id: 'resolve', x: 268, y: 153, w: 170, title: 'Resolve', subtitle: 'clone + parse', color: C.sky, icon: Search },
  { id: 'build', x: 486, y: 153, w: 170, title: 'Build', subtitle: 'reproducible', color: C.sky, icon: Hammer },
  { id: 'microvm', x: 716, y: 84, w: 190, title: 'microVM', subtitle: 'Cloud Hypervisor', color: C.microvm, icon: MicroVMGlyph },
  { id: 'container', x: 716, y: 222, w: 190, title: 'Container', subtitle: 'rootless Podman', color: C.container, icon: ContainerGlyph },
  { id: 'ingress', x: 962, y: 153, w: 184, title: 'Traefik', subtitle: 'route + cutover', color: C.sky, icon: Globe },
];

const EDGES: { id: string; from: NodeKind; to: NodeKind }[] = [
  { id: 'e-cli', from: 'cli', to: 'resolve' },
  { id: 'e-repo', from: 'repo', to: 'resolve' },
  { id: 'e-res', from: 'resolve', to: 'build' },
  { id: 'e-vm', from: 'build', to: 'microvm' },
  { id: 'e-ct', from: 'build', to: 'container' },
  { id: 'e-in-vm', from: 'microvm', to: 'ingress' },
  { id: 'e-in-ct', from: 'container', to: 'ingress' },
];

const STEPS: { title: string; body: string; nodes: NodeKind[] }[] = [
  { title: 'Push', body: 'Point russel deploy at a git repo. Its Russelfile.toml describes the service.', nodes: ['cli', 'repo'] },
  { title: 'Resolve', body: 'The control plane clones the repo and reads the Russelfile, runtime included.', nodes: ['resolve'] },
  { title: 'Build', body: 'Detects Rust, Go or static sites and builds a reproducible, hash-pinned package.', nodes: ['build'] },
  { title: 'Run', body: 'Boots that same package as a microVM or a rootless container.', nodes: ['microvm', 'container'] },
  { title: 'Route', body: 'Waits until the port answers, adds a Traefik route, then drains the old version.', nodes: ['ingress'] },
];

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NodeKind, GraphNode>;
const stepOf = (id: NodeKind) => STEPS.findIndex((s) => s.nodes.includes(id));

function edgePath(from: GraphNode, to: GraphNode) {
  const x1 = from.x + from.w;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export const ArchitecturePipeline: React.FC = () => {
  const [step, setStep] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const lit = useMemo(
    () => new Set<NodeKind>(step === null ? NODES.map((n) => n.id) : STEPS[step].nodes),
    [step],
  );

  return (
    <section id="topology" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
        <SectionHeader title="From source to serving," accent="in five steps.">
          You describe the service once. Russel builds it, runs it on the runtime you picked, and puts it behind a route.
        </SectionHeader>

        <div className="mt-8 rounded-3xl liquid-glass">
          <div className="relative z-10 hidden md:block p-3 lg:p-4">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="block w-full h-auto"
              role="img"
              aria-label="Deployment pipeline: russel deploy or a git repo feeds resolve and build, which runs as a microVM or a container, then Traefik routes traffic"
            >
              <defs>
                <pattern id="topo-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1" fill={C.sky} fillOpacity="0.16" />
                </pattern>
                <filter id="node-shadow" x="-20%" y="-30%" width="140%" height="180%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#205c79" floodOpacity="0.14" />
                </filter>
                <linearGradient id="runtime-wash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={C.microvm} stopOpacity="0.09" />
                  <stop offset="1" stopColor={C.container} stopOpacity="0.09" />
                </linearGradient>
              </defs>

              <rect width={VIEW_W} height={VIEW_H} rx="18" fill="url(#topo-dots)" />

              {/* Control plane */}
              <rect x="244" y="18" width="918" height="304" rx="22" fill="#ffffff" fillOpacity="0.38" stroke="#ffffff" strokeOpacity="0.9" />

              {/* Runtime choice */}
              <rect x="700" y="62" width="222" height="240" rx="18" fill="url(#runtime-wash)" stroke={C.line} strokeOpacity="0.45" strokeDasharray="4 5" />
              <g transform="translate(761 290)">
                <rect width="100" height="22" rx="11" fill="#ffffff" stroke={C.line} strokeOpacity="0.5" />
                <text x="50" y="15" textAnchor="middle" fill={C.muted} fontSize="11" fontWeight="600" fontFamily="var(--font-sans)" letterSpacing="0.06em">
                  PICK ONE
                </text>
              </g>

              {EDGES.map((edge, i) => {
                const from = nodeById[edge.from];
                const to = nodeById[edge.to];
                const on = step === null || lit.has(edge.from) || lit.has(edge.to);
                const d = edgePath(from, to);
                const color = to.color === C.sky ? from.color : to.color;
                return (
                  <g key={edge.id} opacity={on ? 1 : 0.3} style={{ transition: 'opacity 200ms' }}>
                    <path d={d} fill="none" stroke={C.line} strokeOpacity="0.55" strokeWidth="2" />
                    <path d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" className="topo-dash" />
                    {!reducedMotion && (
                      <circle r="4" fill={color} stroke="#ffffff" strokeWidth="1.5">
                        <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${(i % 4) * 0.45}s`} path={d} />
                      </circle>
                    )}
                  </g>
                );
              })}

              {NODES.map((node) => {
                const on = lit.has(node.id);
                const selected = step !== null && on;
                const Icon = node.icon;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x} ${node.y})`}
                    onMouseEnter={() => setStep(stepOf(node.id))}
                    onMouseLeave={() => setStep(null)}
                    opacity={on ? 1 : 0.4}
                    style={{ transition: 'opacity 200ms' }}
                  >
                    <rect
                      width={node.w}
                      height={NODE_H}
                      rx="14"
                      fill="#ffffff"
                      stroke={node.color}
                      strokeOpacity={selected ? 0.9 : 0.22}
                      strokeWidth={selected ? 1.75 : 1}
                      filter="url(#node-shadow)"
                    />
                    <rect x="12" y="13" width="32" height="32" rx="10" fill={node.color} fillOpacity="0.11" />
                    <Icon x={20} y={21} width={16} height={16} color={node.color} strokeWidth={2} />
                    <text x="56" y="26" fill={C.ink} fontSize="15" fontWeight="600" fontFamily="var(--font-sans)">
                      {node.title}
                    </text>
                    <text x="56" y="44" fill={C.muted} fontSize="12" fontFamily="var(--font-sans)">
                      {node.subtitle}
                    </text>
                    <circle cx="0" cy={NODE_H / 2} r="3.5" fill="#ffffff" stroke={node.color} strokeWidth="1.5" />
                    <circle cx={node.w} cy={NODE_H / 2} r="3.5" fill="#ffffff" stroke={node.color} strokeWidth="1.5" />
                  </g>
                );
              })}
            </svg>
          </div>

          <ol className="relative z-10 grid grid-cols-1 md:grid-cols-5 md:border-t border-[#214b65]/10">
            {STEPS.map((st, i) => (
              <li
                key={st.title}
                onMouseEnter={() => setStep(i)}
                onMouseLeave={() => setStep(null)}
                className={`px-5 py-4 md:py-5 border-[#214b65]/10 transition-colors ${i > 0 ? 'border-t md:border-t-0 md:border-l' : ''} ${
                  step === i ? 'bg-white/55' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-white border border-[#8fb5c6]/50 text-[#2c779c] font-mono text-[11px] font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-base font-semibold text-[#14233c]">{st.title}</span>
                </div>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#315a71]">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
