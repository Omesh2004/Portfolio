import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  radius = 80,
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice) return;
      const el = btnRef.current;
      if (!el) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < radius) {
          setOffset({
            x: distX * strength,
            y: distY * strength,
          });
          setIsHovering(true);
        }
      });
    },
    [strength, radius, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setOffset({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={btnRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovering
          ? 'transform 0.15s ease-out'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
