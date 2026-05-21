import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  glareEnabled?: boolean;
  scale?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltMax = 8,
  glareEnabled = true,
  scale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / (rect.height / 2)) * tiltMax;
      const rotateY = (mouseX / (rect.width / 2)) * tiltMax;

      setTransform(
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`
      );

      if (glareEnabled) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(200, 169, 126, 0.15) 0%, transparent 60%)`,
          opacity: 1,
        });
      }
    });
  }, [tiltMax, glareEnabled, scale, isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovering(true);
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    cancelAnimationFrame(rafRef.current);
    setIsHovering(false);
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    setGlareStyle({ opacity: 0 });
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovering
          ? 'transform 0.1s ease-out'
          : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
      {glareEnabled && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
          style={{
            ...glareStyle,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
