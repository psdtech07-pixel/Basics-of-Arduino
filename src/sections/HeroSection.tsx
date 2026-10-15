import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Cpu, Zap, Radio, Settings } from 'lucide-react';
import CircuitBackground from '../components/CircuitBackground';

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: shouldReduce ? 'auto' : 'smooth' });
  };

  const stats = [
    { val: '14', label: 'Sections' },
    { val: '60', label: 'Minutes' },
    { val: '7+', label: 'Sensors' },
    { val: '1', label: 'Mini-Project' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Arduino Masterclass introduction"
    >
      <CircuitBackground />

      <div className="relative z-10 section-container flex flex-col lg:flex-row items-center gap-12 pt-24">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: -20 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
              <Cpu size={14} className="text-cyan-400" />
              <span className="text-sm text-cyan-400 font-semibold">60-Minute Beginner Workshop</span>
            </div>
          </motion.div>

          <motion.h1
            initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-4"
          >
            <span className="text-white">Arduino</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Masterclass
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 font-medium mb-3"
          >
            From Zero to Sensors &amp; Circuits
          </motion.p>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0"
          >
            A hands-on introduction to microcontrollers, pins, signals, sensors, and outputs for first-year ENTC &amp; Instrumentation students — no prior electronics knowledge required.
          </motion.p>

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button onClick={() => scrollTo('intro')} className="btn-primary text-base">
              Start Learning
              <ChevronDown size={18} />
            </button>
            <button onClick={() => scrollTo('board')} className="btn-secondary text-base">
              <Cpu size={18} />
              Explore the Board
            </button>
          </motion.div>

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={shouldReduce ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-10 justify-center lg:justify-start"
          >
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-cyan-400">{stat.val}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: board SVG illustration */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
          animate={shouldReduce ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 justify-center lg:justify-end relative hidden md:flex"
        >
          <div className="relative">
            <svg viewBox="0 0 200 280" className="w-64 lg:w-80" aria-label="Arduino Uno R3 board illustration">
              <defs>
                <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="100%" stopColor="#0a1628" />
                </linearGradient>
              </defs>
              <rect x="10" y="20" width="180" height="240" rx="12" fill="url(#boardGrad)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
              {/* USB */}
              <rect x="10" y="220" width="30" height="20" rx="3" fill="#0d1428" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5" />
              <rect x="14" y="223" width="22" height="14" rx="2" fill="#050810" />
              {/* DC Jack */}
              <rect x="10" y="30" width="22" height="16" rx="4" fill="#1a1a2e" stroke="rgba(6,182,212,0.15)" strokeWidth="0.5" />
              <circle cx="21" cy="38" r="5" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.8" />
              {/* Chip */}
              <rect x="65" y="100" width="70" height="80" rx="4" fill="#0a1628" stroke="rgba(6,182,212,0.25)" strokeWidth="1" />
              <text x="100" y="136" textAnchor="middle" fontSize="7" fill="rgba(6,182,212,0.6)" fontFamily="monospace">ATmega</text>
              <text x="100" y="146" textAnchor="middle" fontSize="7" fill="rgba(6,182,212,0.6)" fontFamily="monospace">328P</text>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <g key={i}>
                  <rect x="55" y={104 + i * 12} width="10" height="3" rx="1" fill="rgba(6,182,212,0.15)" />
                  <rect x="135" y={104 + i * 12} width="10" height="3" rx="1" fill="rgba(6,182,212,0.15)" />
                </g>
              ))}
              {/* Digital pins */}
              {Array.from({ length: 14 }).map((_, i) => (
                <circle key={i} cx={185} cy={35 + i * 14} r="3" fill="#1a2a4a" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" />
              ))}
              {/* Analog pins */}
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={i} cx={25} cy={50 + i * 14} r="3" fill="#1a2a4a" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
              ))}
              {/* Power pins */}
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={i} cx={25} cy={155 + i * 14} r="3" fill="#1a2a4a" stroke="rgba(239,68,68,0.3)" strokeWidth="0.5" />
              ))}
              {/* LED */}
              <circle cx="175" cy="215" r="4" fill="rgba(6,182,212,0.5)" className="pulse-glow" />
              <text x="175" y="226" textAnchor="middle" fontSize="4" fill="rgba(6,182,212,0.5)" fontFamily="monospace">L</text>
              {/* Reset button */}
              <rect x="155" y="75" width="14" height="14" rx="7" fill="#cc3333" />
              <circle cx="162" cy="82" r="4" fill="#dd4444" />
              {/* Crystal */}
              <rect x="130" y="75" width="20" height="10" rx="2" fill="#c8a800" stroke="rgba(200,168,0,0.5)" strokeWidth="0.5" />
              {/* Traces */}
              <path d="M185 42 L145 42 L145 100" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="0.8" className="circuit-trace" />
              <path d="M25 85 L65 85 L65 130" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="0.8" className="circuit-trace" />
            </svg>

            {/* Floating labels */}
            {[
              { label: 'LED', icon: Zap, x: '80%', y: '20%', delay: 0 },
              { label: 'LDR', icon: Radio, x: '88%', y: '48%', delay: 0.2 },
              { label: 'HC-SR04', icon: Radio, x: '76%', y: '72%', delay: 0.4 },
              { label: 'Servo', icon: Settings, x: '65%', y: '30%', delay: 0.6 },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={shouldReduce ? {} : { opacity: 0, scale: 0 }}
                  animate={shouldReduce ? {} : { opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { delay: 0.5 + item.delay, duration: 0.4 },
                    scale: { delay: 0.5 + item.delay, duration: 0.4 },
                    y: { delay: 0.9 + item.delay, duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute"
                  style={{ left: item.x, top: item.y, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-navy-800/90 border border-cyan-500/30 backdrop-blur-sm shadow-lg">
                    <Icon size={12} className="text-cyan-400" />
                    <span className="text-xs font-semibold text-white">{item.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0 }}
        animate={shouldReduce ? {} : { opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
