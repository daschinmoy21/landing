import { useState, useEffect } from 'react';
import AsciiBackground from './AsciiBackground.jsx';
import FaultyTerminal from './FaultyTerminal.jsx';

const BADGE_IMAGES = [
  { src: '/badges/archlinux.gif', alt: 'Arch Linux', title: 'Arch Linux (88x31.nl)' },
  { src: '/badges/miku.gif', alt: 'Hatsune Miku', title: 'Hatsune Miku (88x31.nl)' },
  { src: '/badges/vim.gif', alt: 'Vim', title: 'Vim (88x31.nl)' },
  { src: '/badges/pikachu.gif', alt: 'Pikachu', title: 'Pikachu (88x31.nl)' },
  { src: '/badges/gnu-linux.gif', alt: 'GNU/Linux', title: 'GNU/Linux (88x31.nl)' },
  { src: '/badges/neovim.gif', alt: 'Neovim', title: 'Neovim (88x31.nl)' },
  { src: '/badges/notepad.gif', alt: 'Built with Notepad', title: 'Built with Notepad (88x31.nl)' },
  { src: '/badges/getfirefox.gif', alt: 'Get Firefox', title: 'Get Firefox (88x31.nl)' },
  { src: '/badges/neocities.png', alt: 'Neocities', title: 'Neocities (88x31.nl)' },
  { src: '/badges/amd_powered.gif', alt: 'AMD Powered', title: 'AMD Powered (88x31.nl)' }
];

export default function MinimalTypeLanding() {
  const [theme, setTheme] = useState('dark');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#08080a] text-zinc-100' : 'bg-[#fcfcfd] text-zinc-900'
      } font-sans selection:bg-emerald-500/30`}
    >
      {/* Sticky Header Navigation */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
          isDark ? 'bg-[#08080a]/85 border-zinc-800/60' : 'bg-[#fcfcfd]/85 border-zinc-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between font-mono text-xs tracking-wider">
          <a
            href="/"
            className={`hover:opacity-75 transition-opacity ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            cd..
          </a>

          <nav className="flex items-center gap-5 sm:gap-6">
            <a
              href="#features"
              className={`hover:text-emerald-400 transition-colors uppercase ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              FEATURES
            </a>
            <a
              href="#benchmarks"
              className={`hover:text-emerald-400 transition-colors uppercase ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              BENCHMARKS
            </a>
            <a
              href="#architecture"
              className={`hover:text-emerald-400 transition-colors uppercase ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              ARCH
            </a>

            <button
              onClick={toggleTheme}
              className={`ml-1 sm:ml-2 px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                isDark
                  ? 'border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:bg-zinc-800'
                  : 'border-zinc-300 hover:border-zinc-400 text-zinc-700 hover:bg-zinc-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? 'LIGHT' : 'DARK'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Container - Wide Max Width */}
      <main className="max-w-6xl mx-auto px-6 pt-10 pb-24 space-y-12">
        {/* HERO SECTION WITH MUCH WIDER ASCII CANVAS BACKGROUND FROM TEASER-WORK */}
        <section className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-8 sm:p-12 space-y-6 shadow-2xl min-h-[380px]">
          <AsciiBackground />

          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans text-emerald-400">
                Russel
              </h1>

              {/* Relevant 88x31 Badge next to Russel text */}
              <img
                src="/badges/nixos.png"
                alt="Powered by NixOS"
                title="Powered by NixOS (88x31)"
                width="88"
                height="31"
                className="w-[88px] h-[31px] rounded border border-zinc-800/80 shadow-sm select-none"
              />
            </div>

            {/* Subtitle Lines */}
            <div className="space-y-2 font-mono text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">→</span>
                <span>self-hosted microVM &amp; container deployment platform</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">→</span>
                <span>hardware-isolated microVMs boot in &lt; 2 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">→</span>
                <span>
                  zero-drift builds powered by Nix <span className="text-zinc-600 px-1">|</span>{' '}
                  <span className="text-emerald-400 font-medium">{timeString || '09:22 PM'}</span>
                </span>
              </div>
            </div>

            {/* Product Description */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-3xl ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Russel deploys services as containers or hardware-isolated microVMs that boot in under
              2 seconds. Nix for reproducible, immutable builds. One-line switch between runtimes with
              zero downtime. Self-hosted, open source, MIT.
            </p>

            {/* Action CTA */}
            <div className="pt-3">
              <a
                href="/why"
                className="inline-block px-5 py-2.5 rounded font-mono text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors shadow-md"
              >
                Why Russel →
              </a>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <hr className={isDark ? 'border-zinc-800/80' : 'border-zinc-200'} />

        {/* FEATURES / PILLARS SECTION WITH FAULTY TERMINAL BACKGROUND */}
        <section id="features" className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-6 sm:p-8 space-y-4">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.3}
              tint="#00ff66"
              brightness={0.4}
              mouseReact={true}
              scanlineIntensity={0.2}
            />
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
              FEATURES &amp; CORE PILLARS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`p-5 rounded-lg border backdrop-blur-sm ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-white/80 border-zinc-200'
                }`}
              >
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1">1.8s Cold Boot</h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Hardware-isolated Firecracker microVMs boot in under 2 seconds directly from Nix closure flakes.
                </p>
              </div>

              <div
                className={`p-5 rounded-lg border backdrop-blur-sm ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-white/80 border-zinc-200'
                }`}
              >
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1">Zero-Drift Nix Builds</h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Reproducible, bit-for-bit immutable system packages. Eliminates "works on my machine" failures.
                </p>
              </div>

              <div
                className={`p-5 rounded-lg border backdrop-blur-sm ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-white/80 border-zinc-200'
                }`}
              >
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1">Zero Downtime Swap</h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Single-command runtime toggle between OCI containers and microVMs without dropping TCP connections.
                </p>
              </div>

              <div
                className={`p-5 rounded-lg border backdrop-blur-sm ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-white/80 border-zinc-200'
                }`}
              >
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1">100% Self-Hosted &amp; MIT</h3>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Complete infrastructure sovereignty. Run on bare metal, Hetzner, AWS, or home servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <hr className={isDark ? 'border-zinc-800/80' : 'border-zinc-200'} />

        {/* BENCHMARKS SECTION WITH FAULTY TERMINAL BACKGROUND */}
        <section id="benchmarks" className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-6 sm:p-8 space-y-4">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.3}
              tint="#00ff66"
              brightness={0.4}
              mouseReact={true}
              scanlineIntensity={0.2}
            />
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
              BENCHMARKS
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Cold Boot Time (lower is better)</span>
                  <span className="text-emerald-400 font-bold">1.8s (Russel MicroVM)</span>
                </div>
                <div className="h-2.5 rounded bg-zinc-800 overflow-hidden flex">
                  <div className="w-[20%] bg-emerald-500"></div>
                  <div className="w-[35%] bg-amber-500/60" title="Docker Container: 3.2s"></div>
                  <div className="w-[45%] bg-rose-500/60" title="AWS Lambda Cold Start: 8.5s"></div>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 pt-0.5">
                  <span>Russel: 1.8s</span>
                  <span>Docker: 3.2s</span>
                  <span>AWS Lambda: 8.5s</span>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className={`p-4 rounded border backdrop-blur-sm ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                  <div className="text-zinc-500 text-[10px]">RAM OVERHEAD</div>
                  <div className="text-lg font-bold text-emerald-400">14 MB</div>
                  <div className="text-[10px] text-zinc-400">per microVM instance</div>
                </div>
                <div className={`p-4 rounded border backdrop-blur-sm ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                  <div className="text-zinc-500 text-[10px]">MAX DENSITY</div>
                  <div className="text-lg font-bold text-emerald-400">450 VMs</div>
                  <div className="text-[10px] text-zinc-400">per 32GB host node</div>
                </div>
                <div className={`p-4 rounded border backdrop-blur-sm ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-zinc-200'} col-span-2 sm:col-span-1`}>
                  <div className="text-zinc-500 text-[10px]">RUNTIME SWAP</div>
                  <div className="text-lg font-bold text-emerald-400">0 ms</div>
                  <div className="text-[10px] text-zinc-400">dropped connections</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <hr className={isDark ? 'border-zinc-800/80' : 'border-zinc-200'} />

        {/* ARCHITECTURE SECTION WITH FAULTY TERMINAL BACKGROUND */}
        <section id="architecture" className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-6 sm:p-8 space-y-4">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.3}
              tint="#00ff66"
              brightness={0.4}
              mouseReact={true}
              scanlineIntensity={0.2}
            />
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
              ARCHITECTURE
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className={`p-4 rounded border backdrop-blur-sm flex items-start gap-3 ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">DAEMON</span>
                <div>
                  <span className="font-bold text-zinc-200 text-sm">Control Plane Daemon</span>
                  <p className="text-zinc-400 text-xs mt-0.5">High-throughput Rust daemon exposing gRPC API and managing VM lifecycle.</p>
                </div>
              </div>

              <div className={`p-4 rounded border backdrop-blur-sm flex items-start gap-3 ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">BUILDER</span>
                <div>
                  <span className="font-bold text-zinc-200 text-sm">Nix Zero-Drift Engine</span>
                  <p className="text-zinc-400 text-xs mt-0.5">Evaluates Flake outputs to compile bit-for-bit reproducible rootfs closures.</p>
                </div>
              </div>

              <div className={`p-4 rounded border backdrop-blur-sm flex items-start gap-3 ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold text-[10px]">HYPERVISOR</span>
                <div>
                  <span className="font-bold text-zinc-200 text-sm">Firecracker MicroVM Layer</span>
                  <p className="text-zinc-400 text-xs mt-0.5">KVM-isolated kernel virtualization with vsock IPC and minimal memory footprint.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <hr className={isDark ? 'border-zinc-800/80' : 'border-zinc-200'} />

        {/* CONTACT SECTION WITH FAULTY TERMINAL BACKGROUND */}
        <section id="contact" className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-6 sm:p-8 space-y-4">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.3}
              tint="#00ff66"
              brightness={0.4}
              mouseReact={true}
              scanlineIntensity={0.2}
            />
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">
              CONTACT &amp; LINKS
            </h2>

            <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Russel is open source and self-hosted. Feel free to reach out for feedback, systems architecture talk, or deployment help.
            </p>

            <div className="font-mono text-xs sm:text-sm space-y-2.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">→</span>
                <a
                  href="https://github.com/daschinmoy21"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-emerald-400 transition-colors underline decoration-zinc-700 underline-offset-4"
                >
                  github.com/daschinmoy21
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">→</span>
                <a
                  href="https://x.com/crimxnhaze"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-emerald-400 transition-colors underline decoration-zinc-700 underline-offset-4"
                >
                  x.com/crimxnhaze
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-500 select-none">→</span>
                <a
                  href="mailto:daschinmoyy21@gmail.com"
                  className="text-zinc-300 hover:text-emerald-400 transition-colors underline decoration-zinc-700 underline-offset-4"
                >
                  email (daschinmoyy21@gmail.com)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <hr className={isDark ? 'border-zinc-800/80' : 'border-zinc-200'} />

        {/* FOOTER WITH REAL 88x31 BADGES */}
        <footer className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
            © 2026 RUSSEL. MIT LICENSE.
          </div>

          {/* Real 88x31 Image Badges Container */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {BADGE_IMAGES.map((badge, i) => (
              <img
                key={i}
                src={badge.src}
                alt={badge.alt}
                title={badge.title}
                width="88"
                height="31"
                className="w-[88px] h-[31px] transition-transform duration-150 hover:scale-105 select-none cursor-pointer border border-zinc-800/50 rounded"
              />
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
