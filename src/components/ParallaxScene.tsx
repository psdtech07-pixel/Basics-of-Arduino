import { ReactNode, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props { children: ReactNode; className?: string; }

export default function ParallaxScene({ children, className = '' }: Props) {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || window.matchMedia('(max-width: 767px)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - box.top) / box.height - 0.5) * -5, y: ((event.clientX - box.left) / box.width - 0.5) * 6 });
  };

  return (
    <div className={`parallax-scene ${className}`} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="parallax-halo" aria-hidden="true" />
      <div className="parallax-depth" aria-hidden="true"><i /><i /><i /></div>
      <motion.div className="parallax-object" animate={reduceMotion ? undefined : { rotateX: tilt.x, rotateY: tilt.y, y: [0, -7, 0] }} transition={{ rotateX: { duration: 0.25 }, rotateY: { duration: 0.25 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}>
        {children}
      </motion.div>
    </div>
  );
}
