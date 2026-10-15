import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    transition: {
      duration: 0.35,
      ease: 'easeIn',
    },
  },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: customDelay,
      ease: 'easeOut',
    },
  }),
};

export default function AnimatedSection({ children, className = '', delay = 0, id }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      custom={delay}
      initial={shouldReduce ? false : 'hidden'}
      whileInView={shouldReduce ? undefined : 'visible'}
      viewport={{ once: false, margin: '-60px' }}
      variants={shouldReduce ? undefined : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
