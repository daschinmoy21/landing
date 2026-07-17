import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. Hero Dot-Matrix Cloud Graphic
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
      
      // Center of cloud graphic
      const cx = width * 0.62;
      const cy = height * 0.5;
      
      // Gentle breathing scaling (stable, no morphing)
      const scale = 1.0 + Math.sin(time * 0.0015) * 0.02;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * cellSize + cellSize / 2;
          const py = r * cellSize + cellSize / 2;
          
          const rx = (px - cx) / scale;
          const ry = (py - cy) / scale;
          
          let inCloud = false;
          
          // Overlapping circles representing a stable cloud shape
          const dLeft = (rx + 70)**2 + (ry - 20)**2;
          const dCenter = rx**2 + (ry + 20)**2;
          const dRight = (rx - 80)**2 + (ry - 10)**2;
          const dBottomLeft = (rx + 30)**2 + (ry - 40)**2;
          const dBottomRight = (rx - 30)**2 + (ry - 40)**2;
          
          if (dLeft < 60*60 || dCenter < 90*90 || dRight < 70*70 || dBottomLeft < 55*55 || dBottomRight < 55*55) {
            inCloud = true;
          }
          
          // Left to right transparency fade
          const fadeFactor = Math.min(1, Math.max(0, (px - width * 0.2) / (width * 0.5)));
          
          if (inCloud && fadeFactor > 0.01) {
            const wave = Math.sin(px * 0.08 + py * 0.08 + time * 0.003) * 0.4;
            const radius = (2.6 + wave) * fadeFactor;
            
            ctx.fillStyle = `rgba(99, 254, 19, ${0.4 + fadeFactor * 0.6})`;
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Scattered ambient cloud particles
            if (Math.random() < 0.001 * fadeFactor) {
              ctx.fillStyle = 'rgba(99, 254, 19, 0.25)';
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

// Card 1: Hex Package Compilation Stream (Nix Immutability representation)
function NixCompileGraphic() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    const fontHeight = 14;
    const charWidth = 9;
    const hexChars = '0123456789abcdef';
    
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
      
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      
      const cols = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / fontHeight);
      
      for (let c = 0; c < cols; c++) {
        const speed = 0.035 + (c % 4) * 0.02;
        const headY = Math.floor((time * speed) % (rows + 15));
        
        for (let r = 0; r < rows; r++) {
          const x = c * charWidth + charWidth / 2;
          const y = r * fontHeight + fontHeight / 2;
          
          if (r < headY - 8) {
            // Immutable Nix store hash locked green state
            ctx.fillStyle = 'rgba(99, 254, 19, 0.85)';
            const charIdx = (c + r) % hexChars.length;
            ctx.fillText(hexChars[charIdx], x, y);
          } else if (r <= headY) {
            // Processing / building stream
            ctx.fillStyle = '#FFFFFF';
            const randChar = hexChars[Math.floor(Math.random() * hexChars.length)];
            ctx.fillText(randChar, x, y);
          } else {
            // Empty grid nodes
            ctx.fillStyle = 'rgba(99, 254, 19, 0.07)';
            ctx.beginPath();
            ctx.arc(x, y, 1.0, 0, Math.PI * 2);
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

// Card 2: MicroVM Isolation Squares (Hypervisor barrier visualization)
function IsolationSquares() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    const cellSize = 6;
    
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
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      
      const zoneWidth = cols / 3;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const zoneIndex = Math.floor(c / zoneWidth);
          const localC = c % Math.floor(zoneWidth);
          
          const isBarrier = localC === 0 || localC === Math.floor(zoneWidth) - 1 || r === 0 || r === rows - 1;
          
          const x = c * cellSize + cellSize / 2;
          const y = r * cellSize + cellSize / 2;
          
          if (isBarrier) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.beginPath();
            ctx.arc(x, y, 0.9, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const centerC = zoneWidth / 2;
            const centerR = rows / 2;
            const dist = Math.sqrt((localC - centerC)**2 + (r - centerR)**2);
            const pulse = 1.0 + Math.sin(time * 0.0035 + zoneIndex * 1.6) * 0.4;
            
            if (dist < 4 * pulse) {
              ctx.fillStyle = '#63fe13';
              ctx.beginPath();
              ctx.arc(x, y, cellSize * 0.32 * (1.1 - dist / (4 * pulse)), 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillStyle = 'rgba(99, 254, 19, 0.04)';
              ctx.beginPath();
              ctx.arc(x, y, 0.8, 0, Math.PI * 2);
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

// Card 3: Shape-Shifting Runtimes (WebAssembly circle -> Container square -> MicroVM hexagon)
function RuntimeMorph() {
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
      ctx.fillStyle = '#050F1A';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#7EC4FC';
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const cx = cols / 2;
      const cy = rows / 2;
      
      const cycle = (time * 0.0005) % 3;
      const state = Math.floor(cycle);
      const morphFactor = cycle - state; 
      
      const getShapeDistance = (xVal, yVal, shapeType) => {
        if (shapeType === 0) {
          return Math.sqrt(xVal*xVal + yVal*yVal) - 4.5;
        } else if (shapeType === 1) {
          return Math.max(Math.abs(xVal), Math.abs(yVal)) - 4.5;
        } else {
          const px = Math.abs(xVal);
          const py = Math.abs(yVal);
          return Math.max(px * 0.866 + py * 0.5, py) - 5.0;
        }
      };
      
      const nextState = (state + 1) % 3;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xVal = c - cx;
          const yVal = r - cy;
          
          const distCurrent = getShapeDistance(xVal, yVal, state);
          const distNext = getShapeDistance(xVal, yVal, nextState);
          
          const dist = distCurrent * (1 - morphFactor) + distNext * morphFactor;
          
          if (Math.abs(dist) < 0.8) {
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize + cellSize / 2;
            const pulse = 1.0 + Math.sin(time * 0.005) * 0.12;
            ctx.beginPath();
            ctx.arc(x, y, cellSize * 0.35 * pulse, 0, Math.PI * 2);
            ctx.fill();
          } else if (Math.abs(dist) > 0.8 && Math.abs(dist) < 2.0 && Math.random() < 0.04) {
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize + cellSize / 2;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
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

// Card 4: Zero-Downtime Traffic Redirection (Swap path visualizer)
function TrafficSwap() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0, height = 0;
    let particles = [];
    
    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    for (let i = 0; i < 22; i++) {
      particles.push({
        progress: Math.random(),
        speed: 0.0045 + Math.random() * 0.003,
        size: Math.random() * 1.5 + 1.2
      });
    }
    
    const render = (time) => {
      if (!ctx) return;
      ctx.fillStyle = '#090F06';
      ctx.fillRect(0, 0, width, height);
      
      const startX = width * 0.15;
      const startY = height * 0.5;
      const endX = width * 0.85;
      const endY = height * 0.5;
      
      const nodeAX = width * 0.5;
      const nodeAY = height * 0.28;
      
      const nodeBX = width * 0.5;
      const nodeBY = height * 0.72;
      
      const cycle = (time * 0.0003) % 2;
      const activePath = cycle < 1 ? 'A' : 'B';
      
      ctx.fillStyle = activePath === 'A' ? 'rgba(99, 254, 19, 0.8)' : 'rgba(99, 254, 19, 0.2)';
      ctx.beginPath();
      ctx.arc(nodeAX, nodeAY, 7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = activePath === 'B' ? 'rgba(99, 254, 19, 0.8)' : 'rgba(99, 254, 19, 0.2)';
      ctx.beginPath();
      ctx.arc(nodeBX, nodeBY, 7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(startX, startY, 4, 0, Math.PI * 2);
      ctx.arc(endX, endY, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(99, 254, 19, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(nodeAX, nodeAY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(nodeBX, nodeBY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      ctx.fillStyle = '#63fe13';
      particles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        
        let px, py;
        if (p.progress < 0.5) {
          const t = p.progress * 2;
          const targetX = activePath === 'A' ? nodeAX : nodeBX;
          const targetY = activePath === 'A' ? nodeAY : nodeBY;
          px = startX * (1 - t) + targetX * t;
          py = startY * (1 - t) + targetY * t;
        } else {
          const t = (p.progress - 0.5) * 2;
          const sourceX = activePath === 'A' ? nodeAX : nodeBX;
          const sourceY = activePath === 'A' ? nodeAY : nodeBY;
          px = sourceX * (1 - t) + endX * t;
          py = sourceY * (1 - t) + endY * t;
        }
        
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
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

// Card 5: Stable Throughput Column Grid (Minimized fluctuations)
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
      
      // High stable base throughput level
      const baseHeight = rows * 0.72; 
      
      for (let c = 0; c < cols; c++) {
        // Minor steady jitter fluctuations only
        const jitter = Math.sin(c * 0.6 + time * 0.0035) * 1.5 + (Math.random() - 0.5) * 0.6;
        const colHeightVal = baseHeight + jitter; 
        const currentHeight = Math.max(3, Math.min(rows - 1, Math.floor(colHeightVal)));
        
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
            ctx.arc(x, y, cellSize * 0.3, 0, Math.PI * 2);
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
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#63fe13] block mb-1">
          Private Developer Preview
        </span>
        <h3 className="text-[28px] font-black tracking-tight leading-none mt-1 mb-2">
          Request Early Access
        </h3>
        <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
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
.card-size-full { grid-column: span 12; }

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

.stat-col text-white {
  color: #FFFFFF;
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
  .card-size-1-3,
  .card-size-full {
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
        {/* Dynamic Canvas Graphic (Dot Matrix cloud shape) */}
        <div className="hero-graphic-container">
          <DotMatrixCloud />
        </div>
        
        <div className="hero-content-container">
          {/* Left Column (Copy content) */}
          <div className="hero-left">
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
            
            {/* Card 1: From Build To Boot (Hex compilation stream) */}
            <article className="bento-card card-bg-green-dark card-size-large-left">
              <div className="card-content">
                <span className="card-tagline">RUSSEL — Immutable Compiles</span>
                <h2 className="card-title">From Build<br />To Boot.</h2>
                <p className="card-desc">
                  Compile reproducible source packages in deterministic Nix sandboxes. Boot zero-drift infrastructure byte-for-byte matching local setups.
                </p>
              </div>
              <div className="card-graphic">
                <NixCompileGraphic />
              </div>
            </article>

            {/* Card 2: MicroVM Isolation (Insulated isolation squares) */}
            <article className="bento-card card-bg-green-mid card-size-medium-right">
              <div className="card-content">
                <span className="card-tagline">RUSSEL — KVM Isolation</span>
                <h2 className="card-title">MicroVM<br />Isolation.</h2>
                <p className="card-desc">
                  Leverage Cloud Hypervisor and KVM virtual machine sandboxing. Block host-level kernel escapes with dedicated vCPU lanes.
                </p>
              </div>
              <div className="card-graphic">
                <IsolationSquares />
              </div>
            </article>

            {/* Card 3: Born To Deploy (Shape-shifting runtimes) */}
            <article className="bento-card card-bg-blue-dark card-size-large-left">
              <div className="card-content">
                <span className="card-tagline">RUSSEL — Shifting Runtimes</span>
                <h2 className="card-title">Born To<br />Deploy.</h2>
                <p className="card-desc">
                  Unified schema control plane. Switch runtimes between edge WebAssembly, standard container tasks, and secure microVMs with one configuration parameter.
                </p>
              </div>
              <div className="card-graphic">
                <RuntimeMorph />
              </div>
            </article>

            {/* Card 4: Zero-Downtime Swap (Zero-downtime routing swap) */}
            <article className="bento-card card-bg-green-dark card-size-medium-right">
              <div className="card-content">
                <span className="card-tagline">RUSSEL — Routing Swap</span>
                <h2 className="card-title">Zero-Downtime<br />Swap.</h2>
                <p className="card-desc">
                  Intelligent local routing tables swap underlying guest kernels and route networking ports dynamically to guarantee continuous active serving.
                </p>
              </div>
              <div className="card-graphic">
                <TrafficSwap />
              </div>
            </article>

            {/* Card 5: Throughput (Stable Throughput Columns) */}
            <article className="bento-card card-bg-navy card-size-large-left">
              <div className="card-content">
                <span className="card-tagline">RUSSEL — High Performance Flow</span>
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

            {/* Card 7: Request Early Access / Waitlist (Full Width) */}
            <article className="bento-card card-bg-accent card-size-full" id="early-access">
              <div className="w-full">
                <WaitlistForm />
              </div>
            </article>

          </div>
        </div>
      </section>

    </div>
  );
}
