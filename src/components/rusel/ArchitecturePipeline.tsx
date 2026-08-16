import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type NodeKind = 'cli' | 'repo' | 'resolve' | 'build' | 'microvm' | 'container' | 'ingress';

interface GraphNode {
  id: NodeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle: string;
  color: string;
}

interface GraphEdge {
  id: string;
  from: NodeKind;
  to: NodeKind;
  label?: string;
  curve?: number;
}

const C = {
  ink: '#14233c',
  panel: '#173049',
  sky: '#4e9fc3',
  skyDeep: '#2c779c',
  skySoft: '#7eb8d4',
  skyText: '#3e7895',
  green: '#3a9a72',
  greenSoft: '#5dcaa0',
  line: '#8fb5c6',
};

const NODES: GraphNode[] = [
  { id: 'cli', x: 36, y: 72, w: 172, h: 48, title: 'russel-cli', subtitle: '', color: C.sky },
  { id: 'repo', x: 36, y: 224, w: 172, h: 48, title: 'Git repo', subtitle: '', color: C.skySoft },
  { id: 'resolve', x: 304, y: 148, w: 168, h: 48, title: 'Resolve', subtitle: '', color: C.sky },
  { id: 'build', x: 536, y: 148, w: 168, h: 48, title: 'Build', subtitle: '', color: C.skyDeep },
  { id: 'microvm', x: 768, y: 72, w: 160, h: 48, title: 'microVM', subtitle: '', color: C.green },
  { id: 'container', x: 768, y: 224, w: 160, h: 48, title: 'Container', subtitle: '', color: C.sky },
  { id: 'ingress', x: 988, y: 148, w: 152, h: 48, title: 'Ingress', subtitle: '', color: C.skyText },
];

const EDGES: GraphEdge[] = [
  { id: 'e-cli', from: 'cli', to: 'resolve', label: 'deploy', curve: -6 },
  { id: 'e-repo', from: 'repo', to: 'resolve', label: 'push', curve: 6 },
  { id: 'e-res', from: 'resolve', to: 'build' },
  { id: 'e-vm', from: 'build', to: 'microvm', curve: -8 },
  { id: 'e-ct', from: 'build', to: 'container', curve: 8 },
  { id: 'e-in-vm', from: 'microvm', to: 'ingress', curve: 8 },
  { id: 'e-in-ct', from: 'container', to: 'ingress', curve: -8 },
];

const DETAIL: Record<NodeKind, { kicker: string; title: string; body: string }> = {
  cli: {
    kicker: 'Input',
    title: 'russel-cli',
    body: 'One command deploys the same service as a microVM or a container. Flags map 1:1 to the manifest.',
  },
  repo: {
    kicker: 'Input',
    title: 'Git + Russelfile.toml',
    body: 'Declarative source. The control plane clones the repo and reads the service block — no extra YAML sprawl.',
  },
  resolve: {
    kicker: '01',
    title: 'Parse & prepare',
    body: 'Detects the stack, pins the runtime, and prepares a hermetic evaluation. Nothing leaks from the host.',
  },
  build: {
    kicker: '02',
    title: 'Hermetic build',
    body: 'Produces a content-addressed closure. Hash-verified, cache-accelerated, identical on every machine.',
  },
  microvm: {
    kicker: '03',
    title: 'microVM · KVM',
    body: 'Cloud Hypervisor guest. Hardware page-table isolation, virtio-fs store, TAP networking. Boot under 2s.',
  },
  container: {
    kicker: '03',
    title: 'Container · Podman',
    body: 'Rootless Podman on the same artifact. Faster spawn, process-level isolation, live socket handover.',
  },
  ingress: {
    kicker: '04',
    title: 'Route & verify',
    body: 'Health probe first, then cut traffic with automatic TLS. Ready end-to-end in under two seconds.',
  },
};

const PATH: Record<NodeKind, NodeKind[]> = {
  cli: ['cli', 'resolve', 'build', 'microvm', 'container', 'ingress'],
  repo: ['repo', 'resolve', 'build', 'microvm', 'container', 'ingress'],
  resolve: ['cli', 'repo', 'resolve', 'build', 'microvm', 'container', 'ingress'],
  build: ['cli', 'repo', 'resolve', 'build', 'microvm', 'container', 'ingress'],
  microvm: ['cli', 'repo', 'resolve', 'build', 'microvm', 'ingress'],
  container: ['cli', 'repo', 'resolve', 'build', 'container', 'ingress'],
  ingress: ['cli', 'repo', 'resolve', 'build', 'microvm', 'container', 'ingress'],
};

const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<NodeKind, GraphNode>;

function edgePath(from: GraphNode, to: GraphNode, curve = 0) {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1 + curve}, ${mid} ${y2 + curve}, ${x2} ${y2}`;
}

function NodeIcon({ kind, color }: { kind: NodeKind; color: string }) {
  if (kind === 'cli') {
    return (
      <g>
        <rect x="-6.5" y="-5.5" width="13" height="11" rx="1.6" fill="none" stroke={color} strokeWidth="1.4" />
        <path d="M -3.2 -1.2 L -0.4 1.2 L -3.2 3.6" fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M 1 3.6 H 4.2" stroke={color} strokeWidth="1.3" />
      </g>
    );
  }
  if (kind === 'repo') {
    return (
      <g>
        <path d="M -5.5 -2.5 L -2.2 -5.5 H 5.5 V 5.5 H -5.5 Z" fill="none" stroke={color} strokeWidth="1.4" />
        <path d="M -2.2 -5.5 V -2.5 H -5.5" fill="none" stroke={color} strokeWidth="1.3" />
      </g>
    );
  }
  if (kind === 'resolve') {
    return (
      <g>
        <circle cx="-0.6" cy="-0.8" r="4.2" fill="none" stroke={color} strokeWidth="1.4" />
        <path d="M 2.4 2.2 L 5.4 5.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  }
  if (kind === 'build') {
    return (
      <g>
        <path d="M -5.5 -2 L 0 -5.2 L 5.5 -2 V 4.6 L 0 7.2 L -5.5 4.6 Z" fill="none" stroke={color} strokeWidth="1.35" />
        <path d="M -5.5 -2 L 0 1.2 L 5.5 -2 M 0 1.2 V 7.2" stroke={color} strokeWidth="1.2" />
      </g>
    );
  }
  if (kind === 'microvm') {
    return (
      <g>
        <rect x="-6" y="-5.5" width="12" height="11" rx="1.5" fill="none" stroke={color} strokeWidth="1.4" />
        <path d="M -3.2 -1.6 H 3.2 M -3.2 1.6 H 3.2 M -3.2 1.6 V 3.4 H 0" stroke={color} strokeWidth="1.2" />
      </g>
    );
  }
  if (kind === 'container') {
    return (
      <g>
        <rect x="-5.5" y="-5.5" width="11" height="11" rx="1.4" fill="none" stroke={color} strokeWidth="1.4" />
        <path d="M -5.5 0 H 5.5 M 0 -5.5 V 5.5" stroke={color} strokeWidth="1.15" />
      </g>
    );
  }
  return (
    <g>
      <circle cx="0" cy="0" r="5.4" fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M -5.4 0 H 5.4 M 0 -5.4 C 2.2 -2 2.2 2 0 5.4 C -2.2 2 -2.2 -2 0 -5.4" fill="none" stroke={color} strokeWidth="1.15" />
    </g>
  );
}

export const ArchitecturePipeline: React.FC = () => {
  const [active, setActive] = useState<NodeKind>('build');
  const lit = useMemo(() => new Set<NodeKind>(PATH[active]), [active]);
  const detail = DETAIL[active];

  return (
    <section id="topology" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <h2 className="font-sans font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-[44px] leading-[1.08]">
            Source to serving, <span className="text-[#3e7895]">one graph.</span>
          </h2>
          <p className="text-[17px] sm:text-lg font-medium leading-relaxed text-[#315a71] mt-3 max-w-[50ch]">
            Parse the manifest, build a closure, dispatch to a microVM or a container, then publish a route.
          </p>
        </div>

        <div className="mt-7 rounded-3xl overflow-hidden border border-white/35 bg-[#14233c] shadow-[0_22px_48px_rgba(20,35,60,0.22)]">
          <div className="relative overflow-x-auto">
            <svg
              viewBox="0 0 1170 344"
              className="block w-full min-w-[820px] h-auto"
              role="img"
              aria-label="Deployment pipeline from source through resolve and build to microVM or container, then ingress"
            >
              <defs>
                <pattern id="topo-dots" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.7" fill="#4e9fc3" fillOpacity="0.22" />
                </pattern>
                {EDGES.map((edge) => {
                  const from = nodeById[edge.from];
                  const to = nodeById[edge.to];
                  return (
                    <linearGradient key={edge.id} id={`grad-${edge.id}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} gradientUnits="userSpaceOnUse">
                      <stop stopColor={from.color} />
                      <stop offset="1" stopColor={to.color} />
                    </linearGradient>
                  );
                })}
              </defs>

              <rect width="1170" height="344" fill={C.ink} />
              <rect width="1170" height="344" fill="url(#topo-dots)" />

              <rect
                x="256"
                y="16"
                width="898"
                height="312"
                rx="18"
                fill="none"
                stroke={C.sky}
                strokeOpacity="0.42"
                strokeWidth="1.2"
                strokeDasharray="5 6"
              />
              <text
                x="1136"
                y="34"
                textAnchor="end"
                fill={C.sky}
                fillOpacity="0.72"
                fontSize="10"
                fontFamily="var(--font-mono)"
                letterSpacing="0.14em"
              >
                CONTROL PLANE
              </text>

              <rect
                x="748"
                y="40"
                width="200"
                height="264"
                rx="16"
                fill="none"
                stroke={C.sky}
                strokeOpacity="0.22"
                strokeDasharray="4 5"
              />
              <text
                x="848"
                y="54"
                textAnchor="middle"
                fill={C.sky}
                fillOpacity="0.58"
                fontSize="9"
                fontFamily="var(--font-sans)"
                letterSpacing="0.16em"
              >
                RUNTIME
              </text>

              {EDGES.map((edge) => {
                const from = nodeById[edge.from];
                const to = nodeById[edge.to];
                const on = lit.has(edge.from) && lit.has(edge.to);
                const d = edgePath(from, to, edge.curve ?? 0);
                return (
                  <g key={edge.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke={`url(#grad-${edge.id})`}
                      strokeWidth={on ? 1.75 : 1.2}
                      strokeDasharray="5 6"
                      opacity={on ? 0.95 : 0.28}
                      className={on ? 'topo-dash' : undefined}
                    />
                    {edge.label && (
                      <text
                        x={(from.x + from.w + to.x) / 2}
                        y={(from.y + from.h / 2 + to.y + to.h / 2) / 2 - 10}
                        textAnchor="middle"
                        fill={from.color}
                        fillOpacity={on ? 0.92 : 0.38}
                        fontSize="10"
                        fontFamily="var(--font-sans)"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {NODES.map((node) => {
                const on = lit.has(node.id);
                const selected = active === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x} ${node.y})`}
                    onClick={() => setActive(node.id)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActive(node.id);
                      }
                    }}
                  >
                    <rect
                      width={node.w}
                      height={node.h}
                      rx="11"
                      fill={selected ? `${node.color}24` : C.panel}
                      stroke={node.color}
                      strokeWidth={selected ? 1.7 : 1.25}
                      opacity={on ? 1 : 0.38}
                    />
                    <rect x="-3" y={node.h / 2 - 3} width="6" height="6" rx="1" fill={C.ink} stroke={node.color} strokeWidth="1.2" />
                    <rect x={node.w - 3} y={node.h / 2 - 3} width="6" height="6" rx="1" fill={C.ink} stroke={node.color} strokeWidth="1.2" />
                    <g transform={`translate(22 ${node.h / 2})`}>
                      <NodeIcon kind={node.id} color={node.color} />
                    </g>
                    <text
                      x="40"
                      y={node.h / 2 + 4}
                      fill="#eaf6fa"
                      fontSize="15"
                      fontWeight="600"
                      fontFamily="var(--font-sans)"
                    >
                      {node.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 bg-[#14233c]"
          >
            <span className="text-xs font-semibold tracking-wide text-[#7eb8d4] uppercase">{detail.kicker}</span>
            <span className="text-base font-semibold text-white">{detail.title}</span>
            <span className="text-[15px] font-medium leading-relaxed text-white/75 sm:flex-1">{detail.body}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
