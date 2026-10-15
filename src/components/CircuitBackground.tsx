import { useReducedMotion } from 'framer-motion';

interface CircuitNode {
  cx: number;
  cy: number;
}

const nodes: CircuitNode[] = [
  { cx: 80, cy: 120 },
  { cx: 200, cy: 80 },
  { cx: 350, cy: 150 },
  { cx: 500, cy: 90 },
  { cx: 650, cy: 160 },
  { cx: 750, cy: 100 },
  { cx: 900, cy: 140 },
  { cx: 1050, cy: 80 },
  { cx: 1100, cy: 200 },
  { cx: 950, cy: 280 },
  { cx: 800, cy: 320 },
  { cx: 600, cy: 290 },
  { cx: 400, cy: 310 },
  { cx: 200, cy: 270 },
  { cx: 100, cy: 240 },
];

const tracePath = nodes.map((n, i) => (i === 0 ? `M${n.cx},${n.cy}` : `L${n.cx},${n.cy}`)).join(' ');

export default function CircuitBackground() {
  const shouldReduce = useReducedMotion();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="rgba(6,182,212,0.04)" />
          <stop offset="100%" stopColor="rgba(6,182,212,0)" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <rect width="100%" height="100%" fill="url(#bgGrad)" />

      {/* Grid lines */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6,182,212,0.05)" strokeWidth="0.5" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Main circuit trace */}
      <path
        d={tracePath}
        fill="none"
        stroke="rgba(6,182,212,0.15)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={shouldReduce ? '' : 'circuit-trace'}
        strokeDasharray="6 4"
      />

      {/* Second trace offset */}
      <path
        d={nodes.map((n, i) => (i === 0 ? `M${n.cx + 0},${n.cy + 80}` : `L${n.cx + 0},${n.cy + 80}`)).join(' ')}
        fill="none"
        stroke="rgba(20,184,166,0.1)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={shouldReduce ? '' : 'circuit-trace'}
        strokeDasharray="4 6"
        style={{ animationDelay: '-1s' }}
      />

      {/* Connection nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="3"
            fill="rgba(6,182,212,0.4)"
            className={shouldReduce ? '' : 'pulse-glow'}
          />
          <circle
            cx={n.cx}
            cy={n.cy}
            r="6"
            fill="none"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Corner decorations */}
      <rect x="20" y="20" width="40" height="40" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="1" rx="4" />
      <rect x="24" y="24" width="32" height="32" fill="none" stroke="rgba(6,182,212,0.06)" strokeWidth="1" rx="2" />
    </svg>
  );
}
