import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  shape?: string;
}

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const themeRef = useRef(currentTheme);

  useEffect(() => {
    themeRef.current = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const PARTICLE_COUNT = isMobile ? 40 : 85;
    const CONNECTION_DISTANCE = isMobile ? 80 : 120;
    const MOUSE_RADIUS = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.15,
          shape: Math.random() > 0.6 ? 'circle' : Math.random() > 0.5 ? 'cross' : 'square',
        });
      }
      particlesRef.current = particles;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle moving grid in both modes
      ctx.beginPath();
      const isLightMode = themeRef.current === 'light';
      ctx.strokeStyle = isLightMode ? 'rgba(0, 0, 0, 0.03)' : 'rgba(200, 169, 126, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offsetX = (performance.now() / 40) % gridSize;
      const offsetY = (performance.now() / 40) % gridSize;
      
      for (let x = offsetX; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = offsetY; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update particle positions
      for (const p of particles) {
        // Mouse interaction (desktop only)
        if (!isMobile && mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dx / dist) * force * 0.03;
            p.vy += (dy / dist) * force * 0.03;
          }
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            const colorRGB = themeRef.current === 'light' ? '30, 30, 30' : '200, 169, 126';
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${colorRGB}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const isLight = themeRef.current === 'light';
        const colorRGB = isLight ? '30, 30, 30' : '200, 169, 126';
        
        ctx.beginPath();
        if (isLight && p.shape === 'cross') {
           const s = p.size * 2.5;
           ctx.moveTo(p.x - s, p.y);
           ctx.lineTo(p.x + s, p.y);
           ctx.moveTo(p.x, p.y - s);
           ctx.lineTo(p.x, p.y + s);
           ctx.strokeStyle = `rgba(${colorRGB}, ${p.opacity})`;
           ctx.lineWidth = 1.2;
           ctx.stroke();
        } else if (isLight && p.shape === 'square') {
           const s = p.size * 2;
           ctx.rect(p.x - s, p.y - s, s * 2, s * 2);
           ctx.strokeStyle = `rgba(${colorRGB}, ${p.opacity})`;
           ctx.lineWidth = 1.2;
           ctx.stroke();
        } else {
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
           ctx.fillStyle = `rgba(${colorRGB}, ${p.opacity})`;
           ctx.fill();
        }
      }

      // Mouse glow (desktop only)
      if (!isMobile && mouse.x > 0) {
        const colorRGB = themeRef.current === 'light' ? '30, 30, 30' : '200, 169, 126';
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        gradient.addColorStop(0, `rgba(${colorRGB}, 0.04)`);
        gradient.addColorStop(1, `rgba(${colorRGB}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', resize, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <div className="aurora-bg fixed inset-0 z-0">
      {/* Ambient color orbs (behind canvas) */}
      <div className="aurora-orb-1" />
      <div className="aurora-orb-2" />
      <div className="aurora-orb-3" />
      {/* Interactive canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1]"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default MatrixBackground;