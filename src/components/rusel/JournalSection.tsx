import React from 'react';
import { motion } from 'framer-motion';
import type { ModalItem } from './DetailModal';

interface JournalSectionProps {
  onSelectArticle: (item: ModalItem) => void;
}

const ARTICLES_DATA: (ModalItem & { date: string; readTime: string })[] = [
  {
    title: 'MicroVM vs Podman Overhead: Benchmark Tradeoffs',
    category: 'BENCHMARK',
    date: 'AUG 2026',
    readTime: '5 MIN READ',
    subtitle: 'Quantitative measurement of guest VM CPU, RPS, and memory footprint versus standard container runtimes.',
    description: 'We ran identical Go HTTP server workloads under three scenarios: raw Podman containers, Russel container mode, and Russel hardware microVMs. The microVM path trades ~190MB of RAM for a full hardware KVM security boundary while maintaining 32k+ RPS.',
    codeSnippet: `# Measured RPS Tradeoffs (Go HTTP, 30s @ 50 concurrent)
# Scenario                    | microVM Mode  | Container Mode | Raw Podman
# 1 Host CPU Capped           | ~35k RPS      | ~8k RPS        | ~8k RPS
# Uncapped, 1 guest vCPU      | ~32k RPS      | ~36k RPS       | ~37k RPS
# Host memory overhead        | ~190 MiB      | ~16 MiB        | ~15 MiB`,
    metrics: [
      { label: 'THROUGHPUT', value: '32k RPS' },
      { label: 'P99 LATENCY', value: '4.5 ms' },
      { label: 'MEMORY', value: '190 MiB' },
    ],
    details: [
      'Virtio-fs socket acceleration provides near-native IO',
      'CPU capping favors dedicated VM vCPUs over CFS group limits',
      'Hardware guest boundaries isolate memory from host kernel panics',
    ],
  },
  {
    title: 'Zero-Drift Infrastructures: Pure Nix Runtimes',
    category: 'ARCHITECTURE',
    date: 'JUL 2026',
    readTime: '7 MIN READ',
    subtitle: 'Why declarative system closure graphs eliminate server configuration drift forever.',
    description: 'Traditional container images depend on dynamic apt-get/apk updates that mutate state over time. Russel uses pure Nix derivations where every binary, library, and system file is hashed into an immutable dependency tree.',
    codeSnippet: `# Building a hermetic Russel Nix closure
nix build .#russelServices.production
# Output -> /nix/store/7x8a92f01...-russel-service-vm.drv`,
    metrics: [
      { label: 'REPRODUCIBILITY', value: '100%' },
      { label: 'STATE MUTATION', value: 'Zero' },
      { label: 'ROLLBACK TIME', value: '< 1s' },
    ],
    details: [
      'No background package manager state mutation',
      'Atomic system updates with instant cryptographic verification',
      'Identical execution across local macOS Nix shells and bare-metal Linux servers',
    ],
  },
  {
    title: 'Hardware Isolation: KVM vs Container Namespaces',
    category: 'SECURITY',
    date: 'JUN 2026',
    readTime: '6 MIN READ',
    subtitle: 'Analyzing Linux kernel cgroups/namespaces versus hardware VT-x hypervisor boundaries.',
    description: 'Containers share the host OS kernel, leaving all tenant workloads exposed to kernel vulnerabilities (e.g. Dirty COW, Specter). Russel microVMs run guest kernels isolated inside hardware virtualization extensions.',
    codeSnippet: `+--------------------------------------------------------+
| Host OS (KVM Hypervisor)                               |
|   +-------------------+        +--------------------+  |
|   | Guest Kernel (VM) |        | Guest Kernel (VM)  |  |
|   |   Application A   |        |   Application B    |  |
|   +-------------------+        +--------------------+  |
+--------------------------------------------------------+`,
    metrics: [
      { label: 'BOUNDARY', value: 'Hardware VT-x' },
      { label: 'SHARED KERNEL', value: 'None' },
      { label: 'ESCAPE RISK', value: 'Minimal' },
    ],
    details: [
      'Hardware CPU MMU page table isolation prevents memory leakage',
      'Dedicated guest kernel protects host from kernel panic crash cascades',
      'Seccomp filter sandboxing around Cloud Hypervisor VMM process',
    ],
  },
  {
    title: 'Unified CLI Orchestration: Switching Isolation Boundaries',
    category: 'DEVELOPER EXP',
    date: 'MAY 2026',
    readTime: '4 MIN READ',
    subtitle: 'How Russel unifies container and microVM configuration under a single CLI workflow.',
    description: 'Developers should not need to learn separate APIs for Docker, Kubernetes, and QEMU. Russel introduces a single declarative TOML file and CLI command to manage containers and microVMs uniformly.',
    codeSnippet: `# /etc/russel/app.toml
[service.api]
runtime = "microvm" # or "container"
image = "nix.#prodApi"
ports = ["8080:8080"]
cpus = 2
memory = "1GiB"`,
    metrics: [
      { label: 'LEARNING CURVE', value: 'Minimal' },
      { label: 'CONFIG FORMAT', value: 'TOML / Nix' },
      { label: 'CLI ENGINE', value: 'Rust / Go' },
    ],
    details: [
      'Single command deployment across local dev and remote servers',
      'Unified log aggregation and metrics export',
      'Automated SSL certificate management and socket routing',
    ],
  },
];

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="articles" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                Journal
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display text-text-primary tracking-tight">
              Recent <span className="italic">thoughts</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-md mt-4 leading-relaxed">
              Technical articles on microVM isolation, Nix reproducibility, and infrastructure performance.
            </p>
          </div>

          <button
            onClick={() => onSelectArticle(ARTICLES_DATA[0])}
            className="hidden md:inline-flex items-center justify-center rounded-full p-[1px] bg-stroke hover:accent-gradient group cursor-pointer overflow-hidden self-start md:self-end transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-surface rounded-full px-5 py-2.5 text-xs text-text-primary flex items-center gap-2 group-hover:bg-bg transition-colors">
              <span>View all thoughts</span>
              <span className="text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </button>
        </motion.div>

        {/* Horizontal Entry Pills */}
        <div className="space-y-4">
          {ARTICLES_DATA.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => onSelectArticle(article)}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-8 sm:py-6 bg-surface/30 hover:bg-surface border border-stroke rounded-[28px] sm:rounded-full transition-all duration-300 cursor-pointer group hover:border-white/20"
            >
              {/* Left Title & Badge */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-9 h-9 rounded-full bg-bg border border-stroke flex items-center justify-center font-mono text-xs text-muted group-hover:accent-gradient-text group-hover:border-white/30 transition-colors shrink-0">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-body font-medium text-text-primary group-hover:text-white transition-colors">
                    {article.title}
                  </h3>
                  <span className="text-xs text-muted font-mono uppercase tracking-wider block sm:hidden mt-1">
                    {article.category} • {article.date}
                  </span>
                </div>
              </div>

              {/* Right Meta Info & Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-stroke/50 pt-3 sm:pt-0 shrink-0">
                <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-muted">
                  <span className="bg-bg border border-stroke px-3 py-1 rounded-full uppercase">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                  <span>{article.date}</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-bg border border-stroke text-muted group-hover:text-text-primary group-hover:border-white/30 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  ↗
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
