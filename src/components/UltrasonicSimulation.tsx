import { useState, useEffect, useRef } from 'react';
import SimulationBadge from './SimulationBadge';
import { Play, Pause } from 'lucide-react';

export default function UltrasonicSimulation() {
  const [distance, setDistance] = useState(30);
  const [auto, setAuto] = useState(true);
  const [direction, setDirection] = useState<1 | -1>(1);
  const animRef = useRef<number | null>(null);
  const distRef = useRef(30);
  const dirRef = useRef<1 | -1>(1);

  useEffect(() => {
    if (!auto) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    let last = performance.now();
    const speed = 8;
    const animate = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      distRef.current += dirRef.current * speed * dt;
      if (distRef.current >= 80) { distRef.current = 80; dirRef.current = -1; setDirection(-1); }
      if (distRef.current <= 5) { distRef.current = 5; dirRef.current = 1; setDirection(1); }
      setDistance(Math.round(distRef.current * 10) / 10);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [auto]);

  const duration = Math.round((distance * 2 / 0.0343));
  const isClose = distance < 20;

  return (
    <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white">Ultrasonic Sensor Simulator</h3>
        <SimulationBadge />
      </div>

      {/* Visual */}
      <div
        className="relative rounded-xl mb-4 overflow-hidden"
        style={{ height: '140px', background: '#050a14', border: '1px solid rgba(6,182,212,0.15)' }}
        aria-label={`Ultrasonic simulation: object at ${distance} cm`}
      >
        {/* Sensor */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
          <div className="w-8 h-10 rounded bg-navy-700 border border-cyan-900/40 flex flex-col items-center justify-center gap-1">
            <div className="w-4 h-4 rounded-full bg-cyan-900/80 border border-cyan-500/30" />
            <div className="w-4 h-4 rounded-full bg-cyan-900/80 border border-cyan-500/30" />
          </div>
          <span className="text-xs text-cyan-400/60 font-mono">HC-SR04</span>
        </div>

        {/* Sound wave rings */}
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 rounded-full border"
            style={{
              left: `${20 + i * 6}%`,
              width: `${i * 8}px`,
              height: `${i * 24}px`,
              opacity: isClose ? 0.6 - i * 0.1 : 0.3 - i * 0.05,
              borderColor: isClose ? 'rgba(239,68,68,0.4)' : 'rgba(6,182,212,0.3)',
              transition: 'border-color 0.2s ease',
            }}
          />
        ))}

        {/* Object */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all"
          style={{ left: `${20 + (distance / 80) * 65}%`, transitionDuration: '80ms' }}
        >
          <div
            className="w-6 h-16 rounded-md"
            style={{
              background: isClose
                ? 'linear-gradient(to bottom, rgba(239,68,68,0.6), rgba(239,68,68,0.3))'
                : 'linear-gradient(to bottom, rgba(100,116,139,0.6), rgba(100,116,139,0.3))',
              border: `1px solid ${isClose ? 'rgba(239,68,68,0.5)' : 'rgba(100,116,139,0.4)'}`,
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
          />
          <span className="text-xs font-mono mt-1 block text-center"
            style={{ color: isClose ? '#f87171' : '#94a3b8' }}>
            {distance.toFixed(1)}cm
          </span>
        </div>

        {/* Warning */}
        {isClose && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-xs text-red-400 font-semibold">WARNING</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="ultrasonic-slider" className="text-xs text-slate-400">Manual Distance</label>
            <span className="text-xs font-mono text-cyan-400">{distance.toFixed(1)} cm</span>
          </div>
          <input
            id="ultrasonic-slider"
            type="range"
            min="3"
            max="80"
            value={distance}
            onChange={e => {
              setAuto(false);
              const v = Number(e.target.value);
              setDistance(v);
              distRef.current = v;
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${isClose ? '#ef4444' : '#06b6d4'} ${(distance / 80) * 100}%, rgba(30,41,59,0.8) ${(distance / 80) * 100}%)`,
            }}
            aria-label={`Simulated distance: ${distance} cm`}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={() => setAuto(v => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              auto
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/30 hover:text-white'
            }`}
          >
            {auto ? <Pause size={14} /> : <Play size={14} />}
            {auto ? 'Pause' : 'Auto'}
          </button>
        </div>
      </div>

      {/* Serial output */}
      <div className="rounded-xl bg-navy-950 border border-cyan-900/20 p-3">
        <div className="text-xs text-slate-500 mb-1.5 font-semibold">Serial Monitor (simulated)</div>
        <div className="font-mono text-xs space-y-0.5">
          <div className="text-slate-400">Echo duration: <span className="text-green-400">{duration} µs</span></div>
          <div className="text-slate-400">Distance: <span className="text-cyan-400">{distance.toFixed(1)} cm</span></div>
          {isClose && <div className="text-red-400">⚠ Below threshold — LED ON, Buzzer ON</div>}
        </div>
      </div>
    </div>
  );
}
