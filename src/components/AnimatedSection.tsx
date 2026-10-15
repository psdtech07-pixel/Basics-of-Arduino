import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export default function AnimatedSection({ children, className = '', delay = 0, id }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      transition={shouldReduce ? {} : { duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
