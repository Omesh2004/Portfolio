import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'card'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    // Add cursor:none to body on desktop
    document.body.style.cursor = 'none';
    // Add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      a, button, [role="button"], input, textarea, select, [onclick],
      .glass-card, .tech-card, .nav-link, .group {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = '';
      const el = document.getElementById('custom-cursor-style');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isCard = target.closest('.glass-card') || target.closest('.tilt-card-wrapper');
      const isInteractive = target.closest('a') || target.closest('button') || target.closest('[role="button"]') ||
        target.closest('input') || target.closest('[onclick]');

      if (isCard) {
        setCursorState('card');
      } else if (isInteractive) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Animation loop with lerp for smooth following
    const animate = () => {
      const lerp = 0.15;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  const sizeMap = {
    default: 10,
    hover: 24,
    card: 28,
  };

  const size = sizeMap[cursorState];
  const half = size / 2;

  return (
    <>
      {/* Outer ring - smooth follow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            marginLeft: -half,
            marginTop: -half,
            borderRadius: '50%',
            border: cursorState === 'default' ? '2px solid rgba(200, 169, 126, 0.7)' : 'none',
            background: cursorState !== 'default' ? 'rgba(200, 169, 126, 0.15)' : 'transparent',
            backdropFilter: cursorState !== 'default' ? 'blur(2px)' : 'none',
            transition: 'width 0.35s cubic-bezier(0.23,1,0.32,1), height 0.35s cubic-bezier(0.23,1,0.32,1), margin 0.35s cubic-bezier(0.23,1,0.32,1), background 0.35s ease, border 0.35s ease, backdrop-filter 0.35s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cursorState !== 'default' && (
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(200, 169, 126, 0.8)',
                transition: 'opacity 0.2s ease',
              }}
            />
          )}
        </div>
      </div>

      {/* Inner dot - precise position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: isVisible && cursorState === 'default' ? 1 : 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            borderRadius: '50%',
            background: '#c8a97e',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
