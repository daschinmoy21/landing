import React from 'react';

// Configuration parameters matching user request JSON
const CONFIG = {
  renderMode: "dots",
  bgMode: "solid",
  bgBlur: 12,
  bgOpacity: 100,
  cellSize: 7,
  coverage: 80,
  invert: false,
  styleBlend: "screen",
  charSet: "binary",
  customChars: "",
  brightness: 10,
  contrast: 135,
  edgeEmphasis: 40,
  density: 0,
  tint: "#00ff66", // High-end tech green tint
  tintOpacity: 35,
  overlayBlend: "overlay",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  pfx: {
    vignette: { enabled: true, intensity: 45 },
    scanLines: { enabled: true, intensity: 15 },
    chromatic: { enabled: true, intensity: 8 },
    bloom: { enabled: true, intensity: 85 },
    filmGrain: { enabled: true, intensity: 10 },
    glitch: { enabled: false, intensity: 0 }
  },
  animated: true,
  animStyle: "shimmer",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 }
};

export default function AsciiBackground() {
  const canvasRef = React.useRef(null);
  const requestRef = React.useRef(null);
  const offscreenCanvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const isImageLoadedRef = React.useRef(false);

  React.useEffect(() => {
    // 1. Load the background source image
    const img = new Image();
    img.src = '/ascii-art-21st.png';
    img.onload = () => {
      isImageLoadedRef.current = true;
    };
    imageRef.current = img;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create offscreen canvas for source downsampling
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvasRef.current = offscreenCanvas;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    let width = 0;
    let height = 0;
    let gridWidth = 0;
    let gridHeight = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;

      // Calculate grid dimensions based on cellSize
      gridWidth = Math.ceil(width / CONFIG.cellSize);
      gridHeight = Math.ceil(height / CONFIG.cellSize);
      offscreenCanvas.width = gridWidth;
      offscreenCanvas.height = gridHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Render loop
    const render = (time) => {
      if (!ctx || !offscreenCanvas || !offscreenCtx) return;

      // Clear offscreen canvas
      offscreenCtx.fillStyle = '#000000';
      offscreenCtx.fillRect(0, 0, gridWidth, gridHeight);

      // If source image is loaded, draw it to offscreen canvas using contain fit
      if (isImageLoadedRef.current && imageRef.current) {
        const image = imageRef.current;
        const imgRatio = image.width / image.height;
        const containerRatio = gridWidth / gridHeight;

        let dWidth = 0;
        let dHeight = 0;
        let scale = 1.0;

        if (containerRatio > imgRatio) {
          // Screen is wider than image aspect ratio -> scale relative to height
          scale = 1.15;
          dHeight = gridHeight * scale;
          dWidth = dHeight * imgRatio;
        } else {
          // Screen is narrower than image aspect ratio (e.g. mobile) -> scale relative to width
          scale = 0.9;
          dWidth = gridWidth * scale;
          dHeight = dWidth / imgRatio;
        }

        const isMobile = gridWidth < 992;
        const dx = isMobile
          ? (gridWidth - dWidth) * 0.5
          : (gridWidth - dWidth) * 0.45 + (gridWidth * 0.12);
        const dy = (gridHeight - dHeight) * 0.5;

        offscreenCtx.drawImage(image, dx, dy, dWidth, dHeight);
      } else {
        // Fallback placeholder pattern while loading
        offscreenCtx.fillStyle = 'rgba(0, 255, 102, 0.2)';
        offscreenCtx.fillRect(gridWidth * 0.2, gridHeight * 0.2, gridWidth * 0.6, gridHeight * 0.6);
      }

      // Read offscreen pixel values
      const imgData = offscreenCtx.getImageData(0, 0, gridWidth, gridHeight);
      const data = imgData.data;

      // Clear main canvas backbuffer
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, width, height);

      // Apply flicker animation
      const flickerVal = CONFIG.animated && CONFIG.animStyle === 'flicker'
        ? Math.sin(time * 0.015 * (CONFIG.animSpeed.intensity / 100)) * (CONFIG.animIntensity.intensity / 100) * 12
        : 0;

      // Apply shimmer animation
      const shimmerVal = CONFIG.animated && CONFIG.animStyle === 'shimmer'
        ? Math.sin(time * 0.005) * 20
        : 0;

      // Apply wave animation
      const waveShift = CONFIG.animated && CONFIG.animStyle === 'wave'
        ? time * 0.008
        : 0;

      const cellsDrawn = [];

      for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
          const idx = (row * gridWidth + col) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a === 0) continue;

          // Calculate luminance
          let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (CONFIG.invert) lum = 1.0 - lum;

          // Apply contrast adjustment
          if (CONFIG.contrast !== 100) {
            const factor = (259 * (CONFIG.contrast + 255)) / (255 * (259 - CONFIG.contrast));
            lum = factor * (lum - 0.5) + 0.5;
            lum = Math.max(0, Math.min(1, lum));
          }

          // Shimmer animation shifts cell brightness
          if (shimmerVal) {
            lum += Math.sin(col * 0.4 + row * 0.3 + time * 0.015) * (CONFIG.animIntensity.intensity / 450);
            lum = Math.max(0, Math.min(1, lum));
          }

          // Respect coverage parameter and flicker animation
          const cellThreshold = (100 - (CONFIG.coverage + flickerVal)) / 100;
          if (lum < cellThreshold) continue;

          // Compute screen placement coordinates
          let x = col * CONFIG.cellSize + CONFIG.cellSize / 2;
          let y = row * CONFIG.cellSize + CONFIG.cellSize / 2;

          // Wave coordinate shifting
          if (waveShift) {
            x += Math.sin(row * 0.25 + waveShift) * (CONFIG.animIntensity.intensity * 0.12);
          }

          // Pulse scaling animation
          if (CONFIG.animStyle === 'pulse') {
            const pulse = 1 + Math.sin(time * 0.005) * (CONFIG.animIntensity.intensity / 250);
            x = (x - width / 2) * pulse + width / 2;
            y = (y - height / 2) * pulse + height / 2;
          }

          const baseColor = `rgb(${Math.round(40 + lum * 215)}, ${Math.round(100 + lum * 155)}, ${Math.round(55 + lum * 160)})`;
          cellsDrawn.push({ x, y, lum, baseColor });
        }
      }

      // Draw primitives to screen
      ctx.save();
      ctx.globalCompositeOperation = CONFIG.styleBlend;
      cellsDrawn.forEach(({ x, y, lum, baseColor }) => {
        // Apply Chromatic Aberration offset directly in cell drawing
        const chromaIntensity = CONFIG.pfx.chromatic.enabled ? (CONFIG.pfx.chromatic.intensity / 22) : 0;
        
        ctx.fillStyle = baseColor;

        if (chromaIntensity > 0) {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.45)';
          drawShape(x - chromaIntensity, y, lum);

          ctx.fillStyle = 'rgba(0, 255, 255, 0.45)';
          drawShape(x + chromaIntensity, y, lum);

          ctx.fillStyle = baseColor;
          drawShape(x, y, lum);
        } else {
          drawShape(x, y, lum);
        }
      });
      ctx.restore();

      // Primitive rendering shape selector
      function drawShape(sx, sy, l) {
        ctx.beginPath();
        if (CONFIG.renderMode === 'dither' || CONFIG.renderMode === 'dots') {
          const maxRadius = CONFIG.cellSize * 0.32;
          const radius = maxRadius * (0.32 + l * 0.68);
          if (radius > 0.4) {
            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (CONFIG.renderMode === 'pixel' || CONFIG.renderMode === 'mosaic') {
          const size = CONFIG.cellSize * l;
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        } else if (CONFIG.renderMode === 'cross') {
          const len = (CONFIG.cellSize / 2) * l;
          ctx.lineWidth = 1;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.moveTo(sx - len, sy);
          ctx.lineTo(sx + len, sy);
          ctx.moveTo(sx, sy - len);
          ctx.lineTo(sx, sy + len);
          ctx.stroke();
        } else if (CONFIG.renderMode === 'diagonal') {
          const len = (CONFIG.cellSize / 2) * l;
          ctx.lineWidth = 1;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.moveTo(sx - len, sy - len);
          ctx.lineTo(sx + len, sy + len);
          ctx.stroke();
        } else if (CONFIG.renderMode === 'lines') {
          const len = (CONFIG.cellSize / 2) * l;
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.moveTo(sx - len, sy);
          ctx.lineTo(sx + len, sy);
          ctx.stroke();
        } else if (CONFIG.renderMode === 'characters') {
          ctx.font = `${Math.floor(CONFIG.cellSize * l * 1.25)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const chars = CONFIG.charSet === 'binary' ? ['0', '1'] : (CONFIG.customChars || '.*+=#').split('');
          const cIdx = Math.floor(l * (chars.length - 1));
          ctx.fillText(chars[cIdx] || '0', sx, sy);
        } else {
          ctx.arc(sx, sy, (CONFIG.cellSize / 2) * l, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Apply Post Processing Effects
      
      // Bloom Effect (lighter blur blend overlay)
      if (CONFIG.pfx.bloom.enabled) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = CONFIG.pfx.bloom.intensity / 260;
        ctx.filter = 'blur(5px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
      }

      // Scanlines Overlay
      if (CONFIG.pfx.scanLines.enabled) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        const scanlineGap = 3;
        const lineThickness = 1.0;
        const scanIntensity = CONFIG.pfx.scanLines.intensity / 100;
        
        ctx.globalAlpha = scanIntensity;
        for (let yCoord = 0; yCoord < height; yCoord += scanlineGap) {
          ctx.fillRect(0, yCoord, width, lineThickness);
        }
        ctx.restore();
      }

      // Glitch Horiz Slicing
      if (CONFIG.pfx.glitch.enabled && Math.random() < 0.05 * (CONFIG.pfx.glitch.intensity / 100)) {
        ctx.save();
        const sliceCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < sliceCount; i++) {
          const sliceY = Math.random() * height;
          const sliceH = Math.random() * 35 + 10;
          const shiftX = (Math.random() - 0.5) * 16;
          ctx.drawImage(canvas, 0, sliceY, width, sliceH, shiftX, sliceY, width, sliceH);
        }
        ctx.restore();
      }

      // Film Grain Effect
      if (CONFIG.pfx.filmGrain.enabled) {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        const grainIntensity = Math.floor((CONFIG.pfx.filmGrain.intensity / 100) * 1000);
        for (let i = 0; i < grainIntensity; i++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          ctx.fillRect(gx, gy, 1, 1);
        }
        ctx.restore();
      }

      // Vignette Shadow Overlay
      if (CONFIG.pfx.vignette.enabled) {
        ctx.save();
        const vignetteInt = CONFIG.pfx.vignette.intensity / 100;
        const grad = ctx.createRadialGradient(width / 2, height / 2, width * 0.35, width / 2, height / 2, width * 0.7);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, `rgba(0, 0, 0, ${0.85 * vignetteInt})`);
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // Tint color blending
      if (CONFIG.tintOpacity > 0) {
        ctx.save();
        ctx.globalCompositeOperation = CONFIG.overlayBlend;
        ctx.globalAlpha = CONFIG.tintOpacity / 100;
        ctx.fillStyle = CONFIG.tint;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: CONFIG.bgOpacity / 100
      }}
    />
  );
}
