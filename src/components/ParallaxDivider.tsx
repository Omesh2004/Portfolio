import React, { useEffect, useRef, useState } from 'react';

interface ParallaxDividerProps {
  speed?: number;
  variant?: 'gold' | 'teal' | 'purple';
}

const colorMap = {
  gold: { from: 'rgba(200, 169, 126, 0)', via: 'rgba(200, 169, 126, 0.25)', to: 'rgba(200, 169, 126, 0)', glow: 'rgba(200, 169, 126, 0.08)' },
  teal: { from: 'rgba(100, 180, 160, 0)', via: 'rgba(100, 180, 160, 0.2)', to: 'rgba(100, 180, 160, 0)', glow: 'rgba(100, 180, 160, 0.06)' },
  purple: { from: 'rgba(160, 140, 200, 0)', via: 'rgba(160, 140, 200, 0.2)', to: 'rgba(160, 140, 200, 0)', glow: 'rgba(160, 140, 200, 0.06)' },
};

const ParallaxDivider: React.FC<ParallaxDividerProps> = ({ speed = 0.3, variant = 'gold' }) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (dividerRef.current) {
            const rect = dividerRef.current.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distance = elementCenter - viewportCenter;
            setOffset(distance * speed * 0.1);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, isMobile]);

  const colors = colorMap[variant];

  return (
    <div
      ref={dividerRef}
      className="relative w-full py-8 overflow-hidden"
      style={{ perspective: '500px' }}
    >
      {/* Main gradient line */}
      <div
        style={{
          transform: isMobile ? 'none' : `translate3d(0, ${offset}px, 0)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
      >
        <div
          className="w-full h-[1px] mx-auto max-w-4xl"
          style={{
            background: `linear-gradient(90deg, ${colors.from}, ${colors.via}, ${colors.to})`,
          }}
        />
        {/* Ambient glow */}
        <div
          className="w-full h-8 mx-auto max-w-2xl -mt-4"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.glow}, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Floating dots */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-[120px] pointer-events-none"
        style={{
          transform: isMobile ? 'none' : `translate3d(0, ${offset * -0.5}px, 0)`,
          willChange: 'transform',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{
              background: colors.via,
              animation: `float ${3 + i * 0.7}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxDivider;
