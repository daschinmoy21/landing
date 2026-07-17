import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. Hero Dot-Matrix Cloud/Leaf Graphic
// ==========================================

function DotMatrixCloud() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    
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
      ctx.fillStyle = '#040803';
      ctx.fillRect(0, 0, width, height);
      
      const cellSize = 10;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      
      // 3 major static center clusters forming the main leaf/cloud shape
      const b1 = { x: width * 0.72, y: height * 0.28, r: Math.max(80, width * 0.16) };
      const b2 = { x: width * 0.60, y: height * 0.58, r: Math.max(90, width * 0.18) };
      const b3 = { x: width * 0.44, y: height * 0.82, r: Math.max(70, width * 0.14) };
      
      // Moving dynamic nodes
      const t = time * 0.0008;
      const b4 = { x: b1.x + Math.sin(t) * 35, y: b1.y + Math.cos(t) * 25, r: Math.max(40, width * 0.08) };
      const b5 = { x: b2.x + Math.cos(t * 1.4) * 45, y: b2.y + Math.sin(t * 1.4) * 35, r: Math.max(50, width * 0.09) };
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * cellSize + cellSize / 2;
          const py = r * cellSize + cellSize / 2;
          
          // Field calculations
          const d1 = (px - b1.x)**2 + (py - b1.y)**2;
          const d2 = (px - b2.x)**2 + (py - b2.y)**2;
          const d3 = (px - b3.x)**2 + (py - b3.y)**2;
          const d4 = (px - b4.x)**2 + (py - b4.y)**2;
          const d5 = (px - b5.x)**2 + (py - b5.y)**2;
          
          const f1 = (b1.r * b1.r) / (d1 + 1);
          const f2 = (b2.r * b2.r) / (d2 + 1);
          const f3 = (b3.r * b3.r) / (d3 + 1);
          const f4 = (b4.r * b4.r) / (d4 + 1);
          const f5 = (b5.r * b5.r) / (d5 + 1);
          
          const sum = f1 + f2 + f3 + f4 + f5;
          const noise = Math.sin(px * 0.04 + py * 0.04 + time * 0.002) * 0.18;
          const finalStrength = sum + noise;
          
          // Fade factor towards left to preserve text readability
          const fadeFactor = Math.min(1, Math.max(0, (px - width * 0.22) / (width * 0.45)));
          
          if (finalStrength * fadeFactor > 0.95 && finalStrength * fadeFactor < 1.4) {
            ctx.fillStyle = 'rgba(99, 254, 19, 0.45)';
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fill();
          } else if (finalStrength * fadeFactor >= 1.4) {
            ctx.fillStyle = '#63fe13';
            const scale = 0.85 + Math.sin(px * 0.08 + py * 0.08 + time * 0.004) * 0.15;
            ctx.beginPath();
            ctx.arc(px, py, 2.8 * scale, 0, Math.PI * 2);
            ctx.fill();
          } else if (finalStrength * fadeFactor > 0.65) {
            if (Math.random() < 0.06) {
              ctx.fillStyle = 'rgba(99, 254, 19, 0.2)';
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
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
// 2. Bento Graphic Components (Canvas)
// ==========================================

// Card 1: ASCII Motion Study (Dark Green Theme)
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
      ctx.fillStyle = '#090F06';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#63fe13';
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const cols = Math.ceil(width / cellSizeX);
      const rows = Math.ceil(height / cellSizeY);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = Math.sin(c * 0.2 + r * 0.2 + time * 0.003);
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

// Card 2: Density Roll (Dark Green Theme)
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
      ctx.fillStyle = '#0F180C';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#63fe13';
      
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

// Card 3: Hand-Drawn Glyph (Dark Blue Theme)
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
      ctx.fillStyle = '#050F1A';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#7EC4FC';
      
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
          
          if (xVal >= arrowX && xVal < 5) {
            const yDist = Math.abs(yVal);
            const expectedX = yDist * 1.25 - 2;
            if (xVal >= expectedX - thickness && xVal <= expectedX + thickness) {
              drawDot = true;
            }
          }
          
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

// Card 4: Seeded Glyph (Dark Green Theme)
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
      ctx.fillStyle = '#090F06';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#63fe13';
      
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

// Card 5: Throughput Column Grid (Dark Navy Theme)
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
      ctx.fillStyle = '#050B14'; 
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
// 3. Interactive Widget Components
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
    const intervalTime = 130; 
    
    timerRef.current = setInterval(() => {
      setBootTime(prev => {
        const nextTime = Math.min(1.74, prev + 0.13);
        
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
    <div className="flex flex-col h-full justify-between p-8 text-[#eaeaea]">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#63fe13] font-semibold">
            russel boot --microvm
          </span>
          <span className="font-mono text-[10px] text-zinc-500">kvm console</span>
        </div>
        
        <div className="text-[52px] font-black tracking-tight leading-none my-2 font-mono text-white">
          {bootTime.toFixed(2)}s
        </div>

        {/* Progress Bar */}
        <div className="w-full h-4 bg-zinc-900 rounded-md overflow-hidden relative border border-zinc-800 mb-4">
          <div 
            className="h-full bg-[#63fe13] transition-all duration-100" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Log Viewer */}
        <div className="bg-[#040803] text-[#86efac] font-mono text-[9.5px] p-3 rounded-lg h-[110px] overflow-y-auto leading-relaxed border border-zinc-800">
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
          className="flex-1 py-2 rounded-md font-mono text-xs font-bold text-black bg-[#63fe13] hover:bg-[#52d210] transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {bootTime > 0 && bootTime < 1.74 ? 'Resume' : 'Boot'}
        </button>
        <button 
          onClick={handlePause}
          className="flex-1 py-2 rounded-md font-mono text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition active:scale-[0.98]"
        >
          Pause
        </button>
        <button 
          onClick={handleReset}
          className="flex-1 py-2 rounded-md font-mono text-xs font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition active:scale-[0.98]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Card 8: Live Agent Node Monitor (Ticking uptime)
function UptimeNodeMonitor() {
  const [uptimeSecs, setUptimeSecs] = useState(1234954); 
  
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
        <div className="text-[32px] font-black tracking-tight leading-none my-2 font-mono text-[#63fe13]">
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
// 4. Waitlist & Confetti Form Component
// ==========================================

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
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
    const colors = ['#63fe13', '#7EC4FC', '#FFFFFF', '#14532d'];
    
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
        p.vy += 0.35; 
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
          <div className="bg-[#63fe13]/10 border border-[#63fe13]/30 text-[#63fe13] rounded-lg p-3 text-xs font-mono flex items-center gap-2 animate-pulse">
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
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#63fe13] text-white"
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#63fe13] text-black text-xs font-bold font-mono px-4 py-2 rounded-lg hover:bg-[#52d210] transition active:scale-[0.98]"
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
// 5. Floating Benchmark Widget Component
// ==========================================

function BenchmarkConsole() {
  return (
    <div className="bench-console w-full max-w-[420px] bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10 font-mono text-[11px] leading-relaxed">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-zinc-500 text-[10px] ml-1">benchmark</span>
      </div>
      
      {/* Console Body */}
      <div className="p-5 text-white">
        <div className="font-bold text-[#63fe13] tracking-wide mb-1 text-xs">
          STATIC SITE • COLD DEPLOY
        </div>
        <div className="text-zinc-500 text-[10px] mb-4">
          build &rarr; boot &rarr; serve (lower is better)
        </div>
        
        {/* Row 1 */}
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="text-zinc-100">Russel (microVM)</span>
            <span className="text-[#63fe13] font-bold">1.7s</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-[#63fe13] rounded-full shadow-[0_0_8px_rgba(99,254,19,0.5)]" style={{ width: '17%' }} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="text-zinc-400">Docker / Podman (best-case)</span>
            <span className="text-zinc-300 font-bold">2.7s</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-zinc-600 rounded-full" style={{ width: '27%' }} />
          </div>
        </div>

        {/* Row 3 */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-zinc-400">Podman (typical cold start)</span>
            <span className="text-zinc-300 font-bold">10.0s</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-zinc-700 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. Main Page Component & Styles
// ==========================================

const CSS = `
.pierre-page {
  background-color: #040803;
  color: #eaeaea;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* ==========================================
   Hero Section Styles
   ========================================== */

.hero-section {
  position: relative;
  min-height: min(780px, 95vh);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(99, 254, 19, 0.08);
}

.hero-graphic-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.hero-content-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-left {
  width: 53%;
}

.hero-right {
  width: 42%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* Typography & Content */
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #63fe13;
  letter-spacing: 0.15em;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero-eyebrow::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #63fe13;
  box-shadow: 0 0 8px #63fe13;
}

.hero-title {
  font-size: clamp(34px, 4.8vw, 58px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: #FFFFFF;
  margin: 0 0 20px;
}

.hero-fast {
  font-style: italic;
  font-weight: 900;
  background: linear-gradient(90deg, #B15CFF 0%, #63FE13 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-right: 0.1em;
}

.hero-subtitle {
  font-size: 15px;
  color: #a0aec0;
  line-height: 1.5;
  margin: 0 0 28px;
  max-width: 48ch;
}

/* Buttons */
.hero-cta-group {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.btn-green {
  background-color: #63fe13;
  color: #040803;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(99, 254, 19, 0.15);
}

.btn-green:hover {
  background-color: #52d210;
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(99, 254, 19, 0.25);
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  border-color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.05);
}

/* Inline stats row */
.hero-stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #718096;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
}

.hero-stat-bullet {
  color: #63fe13;
  font-weight: bold;
  margin-right: 6px;
}

.hero-stat-text strong {
  color: #FFFFFF;
}

/* ==========================================
   Bento Section Styles
   ========================================== */

.bento-section {
  padding: 64px 24px 80px;
}

.bento-container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-divider-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: rgba(99, 254, 19, 0.4);
  padding: 12px 0;
  border-bottom: 1px solid rgba(99, 254, 19, 0.08);
  margin-bottom: 48px;
  font-weight: 700;
  text-transform: uppercase;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.bento-card {
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 280px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bento-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.4);
  border-color: rgba(99, 254, 19, 0.15);
}

/* Dark Bento Theme colors */
.card-size-large-left { grid-column: span 7; }
.card-size-medium-right { grid-column: span 5; }
.card-size-equal { grid-column: span 6; }
.card-size-2-3 { grid-column: span 8; }
.card-size-1-3 { grid-column: span 4; }

.card-bg-green-dark { background-color: #090F06; }
.card-bg-green-mid { background-color: #0F180C; }
.card-bg-blue-dark { background-color: #050F1A; }
.card-bg-black { background-color: #0B0B0B; }
.card-bg-navy { background-color: #050B14; }
.card-bg-accent { background-color: #081406; }

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
  border-left: 1px solid rgba(255, 255, 255, 0.06);
}

.card-title {
  font-size: clamp(24px, 3.2vw, 36px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 0 0 16px;
  color: #FFFFFF;
}

.card-tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
}

.card-desc {
  font-size: 13px;
  color: #a0aec0;
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
  font-size: 15px;
  font-weight: 700;
  display: block;
}

.stat-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Responsive configurations */
@media (max-width: 992px) {
  .hero-content-container {
    flex-direction: column;
    padding: 48px 24px;
    align-items: flex-start;
  }
  .hero-left {
    width: 100%;
  }
  .hero-right {
    width: 100%;
    margin-top: 48px;
    justify-content: center;
  }
  .hero-graphic-container {
    width: 100%;
    opacity: 0.25; 
  }
  
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
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
}
`;

export default function PierreLanding() {
  return (
    <div className="pierre-page">
      <style>{CSS}</style>
      
      {/* ==========================================
         Hero Section
         ========================================== */}
      <section className="hero-section">
        {/* Dynamic Canvas Graphic (Dot Matrix cloud/leaf) */}
        <div className="hero-graphic-container">
          <DotMatrixCloud />
        </div>
        
        <div className="hero-content-container">
          {/* Left Column (Copy content) */}
          <div className="hero-left">
            <span className="hero-eyebrow">ONE CONTROL PLANE • ANY RUNTIME</span>
            <h1 className="hero-title">
              Deploy anything.<br />
              Boot <span className="hero-fast">FAST.</span><br />
              Stay in control.
            </h1>
            <p className="hero-subtitle">
              One unified local cloud orchestrator for WASM, container modules, and secure virtual microVM instances. Reproducible content-addressed Nix compilations.
            </p>
            
            <div className="hero-cta-group">
              <a href="#early-access" className="btn-green">Request early access</a>
              <a href="#features" className="btn-outline">Explore features</a>
            </div>
            
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-bullet">&lt;</span>
                <span className="hero-stat-text"><strong>2s</strong> cold boot</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-bullet">Nix</span>
                <span className="hero-stat-text">reproducible builds</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-bullet">0</span>
                <span className="hero-stat-text">downtime swaps</span>
              </div>
            </div>
          </div>
          
          {/* Right Column (Floating Benchmark Card) */}
          <div className="hero-right">
            <BenchmarkConsole />
          </div>
        </div>
      </section>

      {/* ==========================================
         Bento Grid Features Section
         ========================================== */}
      <section className="bento-section" id="features">
        <div className="bento-container">
          
          <div className="section-divider-label">
            // 02 // PLATFORM FEATURES
          </div>

          <div className="bento-grid">
            
            {/* Card 1: From Build To Boot (Dark Green Panel) */}
            <article className="bento-card card-bg-green-dark card-size-large-left">
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
            </article>

            {/* Card 2: MicroVM Isolation (Dark Green-mid Panel) */}
            <article className="bento-card card-bg-green-mid card-size-medium-right">
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
            </article>

            {/* Card 3: Born To Deploy (Dark Blue Panel) */}
            <article className="bento-card card-bg-blue-dark card-size-large-left">
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
            </article>

            {/* Card 4: Zero-Downtime Swap (Dark Green Panel) */}
            <article className="bento-card card-bg-green-dark card-size-medium-right">
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
            </article>

            {/* Card 5: Throughput (Dark Navy Panel) */}
            <article className="bento-card card-bg-navy card-size-large-left">
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
            </article>

            {/* Card 6: microVM Boot Simulator (Black Panel) */}
            <article className="bento-card card-bg-black card-size-medium-right">
              <div className="w-full">
                <BootSimulator />
              </div>
            </article>

            {/* Card 7: Request Early Access / Waitlist (Dark Green Accent Panel) */}
            <article className="bento-card card-bg-accent card-size-2-3" id="early-access">
              <div className="w-full">
                <WaitlistForm />
              </div>
            </article>

            {/* Card 8: Live Agent Node Monitor (Black Panel) */}
            <article className="bento-card card-bg-black card-size-1-3">
              <div className="w-full">
                <UptimeNodeMonitor />
              </div>
            </article>

          </div>
        </div>
      </section>

    </div>
  );
}
