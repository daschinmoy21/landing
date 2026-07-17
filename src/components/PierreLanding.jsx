import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. Dynamic Graphic Components (Canvas)
// ==========================================

// Card 1: ASCII Motion Study
function AsciiMotionStudy() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    
    const chars = ['~', '/', '+', '|', '-', '\\', '{', '}', '(', ')', '<', '>', '!'];
    const cellSizeX = 13;
    const cellSizeY = 15;
    
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const render = (time) => {
      if (!ctx) return;
      ctx.fillStyle = '#7EC4FC';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#0A1E3F';
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const cols = Math.ceil(width / cellSizeX);
      const rows = Math.ceil(height / cellSizeY);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = Math.sin(c * 0.2 + r * 0.2 + time * 0.0035);
          const charIndex = Math.floor(((val + 1) / 2) * chars.length) % chars.length;
          const char = chars[charIndex];
          const x = c * cellSizeX + cellSizeX / 2;
          const y = r * cellSizeY + cellSizeY / 2;
          ctx.fillText(char, x, y);
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Card 2: Density Roll (Dithered shadow waves)
function DensityRoll() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    const cellSize = 5;
    
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const render = (time) => {
      if (!ctx) return;
      ctx.fillStyle = '#0A1E3F';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#7EC4FC';
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wave1 = Math.sin(c * 0.12 + time * 0.002);
          const wave2 = Math.cos(r * 0.12 - time * 0.003);
          const wave3 = Math.sin((c + r) * 0.08 + time * 0.001);
          const val = (wave1 * wave2 + wave3 + 2) / 4; 
          
          const x = c * cellSize + cellSize / 2;
          const y = r * cellSize + cellSize / 2;
          
          const maxRadius = cellSize * 0.42;
          const radius = maxRadius * val;
          
          if (radius > 0.4) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Card 3: Hand-Drawn Glyph
function HandDrawnGlyph() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    const cellSize = 9;
    
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const render = (time) => {
      if (!ctx) return;
      ctx.fillStyle = '#7EC4FC';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#0B0B0B';
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      
      const pulse = 0.82 + Math.sin(time * 0.004) * 0.18;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = cols / 2;
          const cy = rows / 2;
          const xVal = (c - cx) * 0.85;
          const yVal = (r - cy) * 0.85;
          
          let drawDot = false;
          
          const arrowX = -3.5;
          const thickness = 1.6;
          
          // Arrowshape ">"
          if (xVal >= arrowX && xVal < 5) {
            const yDist = Math.abs(yVal);
            const expectedX = yDist * 1.25 - 2;
            if (xVal >= expectedX - thickness && xVal <= expectedX + thickness) {
              drawDot = true;
            }
          }
          
          // Underscore cursor "_"
          if (yVal > 3.8 && yVal < 5.4 && xVal > 0.5 && xVal < 5.5) {
            drawDot = true;
          }
          
          if (drawDot) {
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize + cellSize / 2;
            const radius = (cellSize * 0.35) * pulse;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Card 4: Seeded Glyph (Organic metaball cells)
function SeededGlyph() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    const cellSize = 8;
    
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const render = (time) => {
      if (!ctx) return;
      ctx.fillStyle = '#7EC4FC';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#0B0B0B';
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      
      const t1 = time * 0.0018, t2 = time * 0.0014, t3 = time * 0.0025;
      const b1 = { x: cols / 2 + Math.sin(t1) * (cols * 0.22), y: rows / 2 + Math.cos(t1 * 1.4) * (rows * 0.22), r: 42 };
      const b2 = { x: cols / 2 + Math.cos(t2) * (cols * 0.24), y: rows / 2 + Math.sin(t2 * 1.3) * (rows * 0.18), r: 38 };
      const b3 = { x: cols / 2 + Math.sin(t3 * 0.7) * (cols * 0.2), y: rows / 2 + Math.sin(t3) * (rows * 0.24), r: 32 };
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const d1 = (c - b1.x) * (c - b1.x) + (r - b1.y) * (r - b1.y);
          const d2 = (c - b2.x) * (c - b2.x) + (r - b2.y) * (r - b2.y);
          const d3 = (c - b3.x) * (c - b3.x) + (r - b3.y) * (r - b3.y);
          
          const f1 = b1.r / (d1 + 0.1);
          const f2 = b2.r / (d2 + 0.1);
          const f3 = b3.r / (d3 + 0.1);
          
          const sum = f1 + f2 + f3;
          
          if (sum > 0.042) {
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize + cellSize / 2;
            const radius = cellSize * 0.38 * Math.min(1.2, sum * 11);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Card 5: Throughput Column Grid
function ThroughputGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    const cellSize = 8;
    
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const render = (time) => {
      if (!ctx) return;
      ctx.fillStyle = '#061630'; 
      ctx.fillRect(0, 0, width, height);
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      
      for (let c = 0; c < cols; c++) {
        const wave1 = Math.sin(c * 0.28 + time * 0.005) * 0.38;
        const wave2 = Math.cos(c * 0.14 - time * 0.0028) * 0.22;
        const colHeightVal = (wave1 + wave2 + 0.55) * rows; 
        const currentHeight = Math.max(2, Math.min(rows - 1, Math.floor(colHeightVal)));
        
        for (let r = 0; r < rows; r++) {
          const gridY = rows - 1 - r; 
          
          if (r < currentHeight) {
            const x = c * cellSize + cellSize / 2;
            const y = gridY * cellSize + cellSize / 2;
            
            if (r === currentHeight - 1) {
              ctx.fillStyle = '#FFFFFF';
            } else {
              ctx.fillStyle = '#7EC4FC';
            }
            
            ctx.beginPath();
            ctx.arc(x, y, cellSize * 0.32, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ==========================================
// 2. Interactive Widget Components
// ==========================================

// Card 6: microVM Boot Simulator
const BOOT_LOGS = [
  "[   0.000000] Linux version 6.6.0-russel (gcc 13.2.0) #1 SMP PREEMPT",
  "[   0.080000] KVM virtualization engine: enabled (Intel VMX support)",
  "[   0.190000] ACPI: Core revision 20230528",
  "[   0.320000] PCI: Probing PCI hardware (bus 00)",
  "[   0.450000] virtio_pci: detected virtiofs mount at /",
  "[   0.610000] boot: loading content-addressed initramfs (2.4MB)",
  "[   0.780000] systemd[1]: starting system services...",
  "[   0.940000] net: configuring virtio_net tap interface (10.0.0.42)",
  "[   1.150000] storage: mounting overlayfs at /target/release/api",
  "[   1.320000] runtime: local store loaded (store/78b3f2a-api-service)",
  "[   1.540000] russel-agent[12]: starting gRPC control plane interface...",
  "[   1.740000] VM active: cold boot successful in 1.74s!",
  "[   1.740000] serving traffic: http://10.0.0.42:8880"
];

function BootSimulator() {
  const [bootTime, setBootTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState([]);
  const timerRef = useRef(null);
  
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleStart = () => {
    if (isActive) return;
    setIsActive(true);
    setBootTime(0);
    setLogs([]);
    
    let currentLogIndex = 0;
    const intervalTime = 130; // Ms per log line
    
    timerRef.current = setInterval(() => {
      setBootTime(prev => {
        const nextTime = Math.min(1.74, prev + 0.13);
        
        // Push log lines based on time progress
        if (currentLogIndex < BOOT_LOGS.length) {
          setLogs(prevLogs => [...prevLogs, BOOT_LOGS[currentLogIndex]]);
          currentLogIndex++;
        }
        
        if (nextTime >= 1.74) {
          clearInterval(timerRef.current);
          setIsActive(false);
        }
        return nextTime;
      });
    }, intervalTime);
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setBootTime(0);
    setLogs([]);
  };

  const progressPercent = (bootTime / 1.74) * 100;

  return (
    <div className="flex flex-col h-full justify-between p-8 text-black">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#0066FF] font-semibold">
            russel boot --microvm
          </span>
          <span className="font-mono text-[10px] text-zinc-400">kvm console</span>
        </div>
        
        <div className="text-[52px] font-black tracking-tight leading-none my-2 font-sans tabular-nums">
          {bootTime.toFixed(2)}s
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-zinc-100 rounded-md overflow-hidden relative border border-zinc-200 mb-4">
          <div 
            className="h-full bg-[#0066FF] transition-all duration-100" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Log Viewer */}
        <div className="bg-zinc-950 text-[#86efac] font-mono text-[9.5px] p-3 rounded-lg h-[110px] overflow-y-auto leading-relaxed border border-zinc-800">
          {logs.length === 0 ? (
            <span className="text-zinc-500">// Press Boot to simulate microVM cold start</span>
          ) : (
            logs.map((log, idx) => <div key={idx}>{log}</div>)
          )}
        </div>
      </div>

      {/* Button controls */}
      <div className="flex gap-2 mt-4">
        <button 
          onClick={handleStart}
          disabled={bootTime >= 1.74 && !isActive}
          className="flex-1 py-2 rounded-md font-mono text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {bootTime > 0 && bootTime < 1.74 ? 'Resume' : 'Boot'}
        </button>
        <button 
          onClick={handlePause}
          className="flex-1 py-2 rounded-md font-mono text-xs font-bold text-zinc-700 bg-zinc-100 border border-zinc-300 hover:bg-zinc-200 transition active:scale-[0.98]"
        >
          Pause
        </button>
        <button 
          onClick={handleReset}
          className="flex-1 py-2 rounded-md font-mono text-xs font-bold text-zinc-700 bg-zinc-100 border border-zinc-300 hover:bg-zinc-200 transition active:scale-[0.98]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Card 8: Live Agent Node Monitor (Ticking uptime)
function UptimeNodeMonitor() {
  const [uptimeSecs, setUptimeSecs] = useState(1234954); // Base uptime
  
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSecs(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSecs) => {
    const d = Math.floor(totalSecs / (3600 * 24));
    const h = Math.floor((totalSecs % (3600 * 24)) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return (
    <div className="flex flex-col h-full justify-between p-8 text-white">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
          Node: us-east-1a (Active)
        </span>
        <div className="text-[34px] font-black tracking-tight leading-none my-2 font-mono text-[#7EC4FC]">
          {formatUptime(uptimeSecs)}
        </div>
      </div>
      
      <div className="border-t border-zinc-800 pt-3 mt-4">
        <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-1">
          <span>Active microVMs</span>
          <span className="text-white font-bold">24 / 32</span>
        </div>
        <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-1">
          <span>Memory Allocation</span>
          <span className="text-white font-bold">8.4 GB / 16 GB</span>
        </div>
        <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
          <span>Node Agent version</span>
          <span className="text-zinc-500">v0.8.2</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Waitlist & Confetti Form Component
// ==========================================

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      fireConfetti();
    }, 1200);
  };

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#7EC4FC', '#0A1E3F', '#FFFFFF', '#63fe13'];
    
    canvas.width = containerRef.current.clientWidth;
    canvas.height = containerRef.current.clientHeight;

    const createParticle = () => ({
      x: canvas.width / 2,
      y: canvas.height / 2 + 30,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 1.8) * 8,
      life: 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 2,
    });

    for (let i = 0; i < 60; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.life -= 1.8;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life / 100);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col justify-between p-8 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50 w-full h-full" />
      
      <div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
          Private Developer Preview
        </span>
        <h3 className="text-[28px] font-black tracking-tight leading-none mt-1 mb-2">
          Request Early Access
        </h3>
        <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
          Russel is in private preview. Sign up to participate in early developer trials, test KVM isolation, and receive release updates.
        </p>
      </div>

      <div className="mt-4 relative z-20">
        {status === 'success' ? (
          <div className="bg-[#7EC4FC]/10 border border-[#7EC4FC]/30 text-[#7EC4FC] rounded-lg p-3 text-xs font-mono flex items-center gap-2 animate-pulse">
            <span>✓</span> You have been added to the developer waiting list.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
              type="email"
              required
              disabled={status === 'loading'}
              placeholder="Enter your developer email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#7EC4FC] text-white"
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-zinc-950 text-xs font-bold font-mono px-4 py-2 rounded-lg hover:bg-zinc-100 transition active:scale-[0.98] disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. Main Page Component
// ==========================================

const CSS = `
.pierre-page {
  background-color: #EDEDF0;
  color: #0B0B0B;
  min-height: 100vh;
  padding: 64px 24px;
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 1;
}

.bento-container {
  max-width: 1100px;
  margin: 0 auto;
}

.bento-header {
  margin-bottom: 48px;
  text-align: left;
}

.bento-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  color: #0066FF;
  letter-spacing: 0.15em;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
}

.bento-title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: #0B0B0B;
  margin: 0;
}

.bento-subtitle {
  font-size: 15px;
  color: #555558;
  margin-top: 14px;
  max-width: 60ch;
  line-height: 1.5;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.bento-card {
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 280px;
}

.bento-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.08);
}

.card-black {
  background-color: #0B0B0B;
  color: #FFFFFF;
}

.card-white {
  background-color: #FFFFFF;
  color: #0B0B0B;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.card-blue {
  background-color: #7EC4FC;
  color: #0B0B0B;
}

.card-navy {
  background-color: #0A1E3F;
  color: #FFFFFF;
}

/* Bento Card Grid Positioning */
.card-size-large-left {
  grid-column: span 7;
}

.card-size-medium-right {
  grid-column: span 5;
}

.card-size-equal {
  grid-column: span 6;
}

.card-size-2-3 {
  grid-column: span 8;
}

.card-size-1-3 {
  grid-column: span 4;
}

.card-content {
  flex: 1;
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.card-graphic {
  width: 42%;
  position: relative;
  overflow: hidden;
}

.card-black .card-graphic,
.card-navy .card-graphic {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.card-white .card-graphic,
.card-blue .card-graphic {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}

.card-title {
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 0 0 16px;
  white-space: pre-line;
}

.card-tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.6;
}

.card-desc {
  font-size: 13px;
  opacity: 0.8;
  line-height: 1.5;
  margin: 0;
}

.stats-row {
  display: flex;
  gap: 20px;
  margin-top: 12px;
}

.stat-col {
  flex: 1;
}

.stat-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  display: block;
}

.stat-label {
  font-size: 9px;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Mobile responsive adjustments */
@media (max-width: 992px) {
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .card-size-large-left,
  .card-size-medium-right,
  .card-size-equal,
  .card-size-2-3,
  .card-size-1-3 {
    grid-column: span 1;
  }
  .bento-card {
    min-height: auto;
    flex-direction: column;
  }
  .card-graphic {
    width: 100%;
    height: 180px;
    border-left: none !important;
  }
  
  .card-black .card-graphic,
  .card-navy .card-graphic {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .card-white .card-graphic,
  .card-blue .card-graphic {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
}
`;

export default function PierreLanding() {
  return (
    <div className="pierre-page">
      <style>{CSS}</style>
      
      <div className="bento-container">
        
        {/* Header Block */}
        <header className="bento-header">
          <span className="bento-tag">// 01 // PLATFORM ENGINE</span>
          <h1 className="bento-title">
            One Control Plane.<br />Any Runtime.
          </h1>
          <p className="bento-subtitle">
            Russel is a next-generation local cloud orchestrator. Compile sandboxed, content-addressed Nix builds and run them in hardware-isolated KVM microVMs booting in under 2 seconds.
          </p>
        </header>

        {/* Bento Grid */}
        <main className="bento-grid">
          
          {/* Card 1: From Build To Boot (Black Panel) */}
          <section className="bento-card card-black card-size-large-left">
            <div className="card-content">
              <span className="card-tagline">RUSSEL — ASCII Motion Study</span>
              <h2 className="card-title">From Build<br />To Boot.</h2>
              <p className="card-desc">
                Compile reproducible source packages in deterministic Nix sandboxes. Boot zero-drift infrastructure byte-for-byte matching local setups.
              </p>
            </div>
            <div className="card-graphic">
              <AsciiMotionStudy />
            </div>
          </section>

          {/* Card 2: MicroVM Isolation (White Panel) */}
          <section className="bento-card card-white card-size-medium-right">
            <div className="card-content">
              <span className="card-tagline">RUSSEL — Density Roll</span>
              <h2 className="card-title">MicroVM<br />Isolation.</h2>
              <p className="card-desc">
                Leverage Cloud Hypervisor and KVM virtual machine sandboxing. Block host-level kernel escapes with dedicated vCPU lanes.
              </p>
            </div>
            <div className="card-graphic">
              <DensityRoll />
            </div>
          </section>

          {/* Card 3: Born To Deploy (Light Blue Panel) */}
          <section className="bento-card card-blue card-size-large-left">
            <div className="card-content">
              <span className="card-tagline">RUSSEL — Hand-Drawn Glyph</span>
              <h2 className="card-title">Born To<br />Deploy.</h2>
              <p className="card-desc">
                Unified schema control plane. Switch runtimes between edge WebAssembly, standard container tasks, and secure microVMs with one configuration parameter.
              </p>
            </div>
            <div className="card-graphic">
              <HandDrawnGlyph />
            </div>
          </section>

          {/* Card 4: Zero-Downtime Swap (Black Panel) */}
          <section className="bento-card card-black card-size-medium-right">
            <div className="card-content">
              <span className="card-tagline">RUSSEL — Seeded Glyph</span>
              <h2 className="card-title">Zero-Downtime<br />Swap.</h2>
              <p className="card-desc">
                Intelligent local routing tables swap underlying guest kernels and route networking ports dynamically to guarantee continuous active serving.
              </p>
            </div>
            <div className="card-graphic">
              <SeededGlyph />
            </div>
          </section>

          {/* Card 5: Throughput (Navy Panel) */}
          <section className="bento-card card-navy card-size-large-left">
            <div className="card-content">
              <span className="card-tagline">RUSSEL — Throughput Study</span>
              <div>
                <h2 className="card-title">Throughput.</h2>
                <div className="stats-row">
                  <div className="stat-col">
                    <span className="stat-label">Current</span>
                    <span className="stat-val text-[#7EC4FC]">2,528 req/s</span>
                  </div>
                  <div className="stat-col">
                    <span className="stat-label">Peak</span>
                    <span className="stat-val text-white">4,118 req/s</span>
                  </div>
                  <div className="stat-col">
                    <span className="stat-label">Average</span>
                    <span className="stat-val text-zinc-300">2,936 req/s</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-graphic">
              <ThroughputGrid />
            </div>
          </section>

          {/* Card 6: microVM Boot Simulator (White Panel) */}
          <section className="bento-card card-white card-size-medium-right">
            <div className="w-full">
              <BootSimulator />
            </div>
          </section>

          {/* Card 7: Waitlist Request Form (Navy Panel) */}
          <section className="bento-card card-navy card-size-2-3">
            <div className="w-full">
              <WaitlistForm />
            </div>
          </section>

          {/* Card 8: Live Agent Node Monitor (Black Panel) */}
          <section className="bento-card card-black card-size-1-3">
            <div className="w-full">
              <UptimeNodeMonitor />
            </div>
          </section>

        </main>

      </div>
    </div>
  );
}
