import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ModalItem } from './DetailModal';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationsSectionProps {
  onSelectExploration: (item: ModalItem) => void;
}

const EXPLORATIONS_DATA: (ModalItem & { rotate: string; col: number })[] = [
  {
    col: 1,
    rotate: '-rotate-2',
    title: 'Cloud Hypervisor VMM',
    category: 'VIRTUALIZATION ENGINE',
    subtitle: 'Low-footprint Rust-based VMM optimized for modern microVM payloads.',
    description: 'Cloud Hypervisor avoids legacy PC device emulation (like ISA or IDE buses), focusing purely on VirtIO interfaces and hardware KVM acceleration to boot guest kernels in milliseconds.',
    codeSnippet: `[cloud-hypervisor]
api_socket = "/run/rusel/ch.sock"
kernel = "/nix/store/vmlinux"
cmdline = "console=ttyS0 console=hvc0 quiet"
memory = { size = 536870912, shared = false }`,
    metrics: [
      { label: 'DEVICE MODEL', value: 'VirtIO-only' },
      { label: 'MEMORY MAP', value: 'Direct KVM' },
      { label: 'BOOT TIME', value: '1.4s' },
    ],
  },
  {
    col: 2,
    rotate: 'rotate-3',
    title: 'Nix Derivation Graph',
    category: 'BUILD TOPOLOGY',
    subtitle: 'Visualizing hermetic dependency closures across the Nix store.',
    description: 'Every system artifact deployed into a Russel microVM is represented as an acyclic graph of content-addressed hashes. Changing a single line of code recomputes affected branches deterministically.',
    codeSnippet: `+-----------------------+
|  glibc-2.39-44        |
+-----------+-----------+
            |
+-----------v-----------+
|  nodejs-20.12.0       |
+-----------+-----------+
            |
+-----------v-----------+
|  rusel-app-v1.4.0     |
+-----------------------+`,
    metrics: [
      { label: 'STORE HASH', value: 'SHA256' },
      { label: 'GRAPH TYPE', value: 'DAG' },
      { label: 'CACHE REUSE', value: '98%' },
    ],
  },
  {
    col: 1,
    rotate: 'rotate-1',
    title: 'Memory Sandboxing',
    category: 'ISOLATION MATRIX',
    subtitle: 'Hardware page table translation and virtio-mem ballooning.',
    description: 'Guest physical memory is backed by anonymous mmap allocations on the host host, isolated via Intel EPT or AMD NPT page tables so microVMs cannot read host RAM.',
    codeSnippet: `# Virtual Memory Allocation
mmap(NULL, 512 * 1024 * 1024, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0)
ioctl(kvm_vm_fd, KVM_SET_USER_MEMORY_REGION, &mem_region)`,
    metrics: [
      { label: 'PAGING', value: '2MB Hugepages' },
      { label: 'EPT MAP', value: 'Hardware' },
      { label: 'BALLOONING', value: 'VirtIO-Mem' },
    ],
  },
  {
    col: 2,
    rotate: '-rotate-3',
    title: 'Container Socket Proxy',
    category: 'NETWORK TRANSLATION',
    subtitle: 'Zero-copy socket bridging between Podman and microVM guest interfaces.',
    description: 'Whether a service runs inside a Podman container or a Cloud Hypervisor VM, Russel transparently routes incoming TCP/UDP connections with eBPF and virtio-vsock acceleration.',
    codeSnippet: `# Socket Proxy Routing
podman.sock <---> rusel-router <---> vsock://guest_cid:8080`,
    metrics: [
      { label: 'LATENCY', value: '< 0.2ms' },
      { label: 'PROTOCOL', value: 'vsock / eBPF' },
      { label: 'BANDWIDTH', value: '40 Gbps' },
    ],
  },
  {
    col: 1,
    rotate: '-rotate-1',
    title: 'Deterministic Kernel',
    category: 'KERNEL OPTIMIZATION',
    subtitle: 'Minimal guest kernel stripped of legacy drivers for ultra-fast boot.',
    description: 'Standard Linux kernels include thousands of modules for sound cards, Wi-Fi, and ancient PCI devices. The Russel guest kernel compiles only essential VirtIO drivers for sub-second startup.',
    codeSnippet: `CONFIG_VIRTIO_NET=y
CONFIG_VIRTIO_BLK=y
CONFIG_VIRTIO_CONSOLE=y
CONFIG_NET_9P_VIRTIO=y
# Everything else disabled`,
    metrics: [
      { label: 'KERNEL SIZE', value: '4.2 MiB' },
      { label: 'MODULES', value: '0 Built-in' },
      { label: 'INIT TIME', value: '180 ms' },
    ],
  },
  {
    col: 2,
    rotate: 'rotate-2',
    title: 'CLI Orchestration Engine',
    category: 'CONTROL SURFACE',
    subtitle: 'Single binary Rust orchestrator managing local daemon and remote nodes.',
    description: 'The Russel CLI communicates over gRPC/HTTP2 to query node metrics, dispatch deployment jobs, and stream microVM serial console logs in real time.',
    codeSnippet: `russel node list
# ID        STATUS   ENGINE    VMS  CPUS  MEM
# node-us1  READY    KVM/CH    14   32    64GB
# node-eu2  READY    Podman    28   64    128GB`,
    metrics: [
      { label: 'BINARY SIZE', value: '8.4 MiB' },
      { label: 'PROTO', value: 'gRPC / HTTP2' },
      { label: 'DAEMON', value: 'Systemd' },
    ],
  },
];

export const ExplorationsSection: React.FC<ExplorationsSectionProps> = ({
  onSelectExploration,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll movement for column 1 and column 2
      if (col1Ref.current && col2Ref.current && containerRef.current) {
        gsap.to(col1Ref.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(col2Ref.current, {
          y: -240,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const col1Items = EXPLORATIONS_DATA.filter((item) => item.col === 1);
  const col2Items = EXPLORATIONS_DATA.filter((item) => item.col === 2);

  return (
    <section
      id="topology"
      ref={containerRef}
      className="min-h-[220vh] relative bg-bg py-20 overflow-hidden"
    >
      {/* Pinned Center Title (Sticky) */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen flex flex-col justify-center items-center text-center px-6 z-10 pointer-events-none"
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono mb-4">
          Explorations
        </span>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-display italic text-text-primary mb-4 tracking-tight">
          Visual <span className="not-italic">playground</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md mb-8 leading-relaxed">
          Interactive topology cards illustrating memory sandboxing, Nix closure graphs, and hypervisor initialization.
        </p>

        <button
          onClick={() => onSelectExploration(EXPLORATIONS_DATA[0])}
          className="pointer-events-auto accent-gradient rounded-full px-7 py-3.5 text-xs text-bg font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-xl"
        >
          Explore Interactive Topology ↗
        </button>
      </div>

      {/* Parallax Cards Overlay (z-20) */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 -mt-[80vh] pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          {/* Column 1 */}
          <div ref={col1Ref} className="space-y-10 md:space-y-16">
            {col1Items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectExploration(item)}
                className={`aspect-square max-w-[340px] mx-auto bg-surface/80 backdrop-blur-md border border-stroke rounded-3xl p-6 md:p-8 flex flex-col justify-between cursor-pointer hover:border-white/30 transition-all duration-300 shadow-2xl group ${item.rotate} hover:rotate-0 hover:scale-105`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-widest bg-bg px-2.5 py-1 rounded-full border border-stroke">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted group-hover:text-text-primary transition-colors">
                    ↗
                  </span>
                </div>

                <div className="my-auto text-center p-2">
                  <h4 className="text-2xl font-display italic text-text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-stroke/60 flex justify-between items-center text-[10px] font-mono text-muted">
                  <span>RUSSEL TOPOLOGY</span>
                  <span className="text-text-primary group-hover:accent-gradient-text font-semibold">
                    INSPECT →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="space-y-10 md:space-y-16 md:mt-24">
            {col2Items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectExploration(item)}
                className={`aspect-square max-w-[340px] mx-auto bg-surface/80 backdrop-blur-md border border-stroke rounded-3xl p-6 md:p-8 flex flex-col justify-between cursor-pointer hover:border-white/30 transition-all duration-300 shadow-2xl group ${item.rotate} hover:rotate-0 hover:scale-105`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-widest bg-bg px-2.5 py-1 rounded-full border border-stroke">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted group-hover:text-text-primary transition-colors">
                    ↗
                  </span>
                </div>

                <div className="my-auto text-center p-2">
                  <h4 className="text-2xl font-display italic text-text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-stroke/60 flex justify-between items-center text-[10px] font-mono text-muted">
                  <span>RUSSEL TOPOLOGY</span>
                  <span className="text-text-primary group-hover:accent-gradient-text font-semibold">
                    INSPECT →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
