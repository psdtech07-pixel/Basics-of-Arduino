import { useState, useCallback } from 'react';
import SimulationBadge from './SimulationBadge';

export default function PWMExplorer() {
  const [duty, setDuty] = useState(50);

  const avgVoltage = ((duty / 100) * 5).toFixed(2);
  const analogWriteVal = Math.round((duty / 100) * 255);

  // SVG waveform parameters
  const width = 400;
  const height = 80;
  const periods = 3;
  const periodWidth = width / periods;
  const highWidth = periodWidth * (duty / 100);
  const lowWidth = periodWidth * (1 - duty / 100);
  const highY = 10;
  const lowY = 65;

  const buildPath = useCallback(() => {
    const parts: string[] = [];
    let x = 0;
    parts.push(`M ${x} ${lowY}`);
    for (let i = 0; i < periods; i++) {
      parts.push(`L ${x} ${highY}`);
      x += highWidth;
      parts.push(`L ${x} ${highY}`);
      parts.push(`L ${x} ${lowY}`);
      x += lowWidth;
      parts.push(`L ${x} ${lowY}`);
    }
    return parts.join(' ');
  }, [duty, highWidth, lowWidth, highY, lowY, periods]);

  return (
    <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white">PWM Duty Cycle Explorer</h3>
        <SimulationBadge />
      </div>

      {/* Waveform */}
      <div className="rounded-xl bg-navy-950 border border-cyan-900/20 p-4 mb-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[300px]"
          style={{ height: '80px' }}
          aria-label={`PWM waveform at ${duty}% duty cycle`}
          role="img"
        >
          {/* Grid lines */}
          <line x1="0" y1={highY} x2={width} y2={highY} stroke="rgba(6,182,212,0.08)" strokeWidth="1" />
          <line x1="0" y1={lowY} x2={width} y2={lowY} stroke="rgba(6,182,212,0.08)" strokeWidth="1" />
          <line x1="0" y1={(highY + lowY) / 2} x2={width} y2={(highY + lowY) / 2} stroke="rgba(6,182,212,0.05)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Average voltage line */}
          <line
            x1="0"
            y1={highY + (lowY - highY) * (1 - duty / 100)}
            x2={width}
            y2={highY + (lowY - highY) * (1 - duty / 100)}
            stroke="rgba(245,158,11,0.5)"
            strokeWidth="1"
            strokeDasharray="6 3"
          />

          {/* Waveform */}
          <path
            d={buildPath()}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Shaded high area */}
          {Array.from({ length: periods }).map((_, i) => (
            <rect
              key={i}
              x={i * periodWidth}
              y={highY}
              width={highWidth}
              height={lowY - highY}
              fill="rgba(6,182,212,0.06)"
            />
          ))}

          {/* Labels */}
          <text x="4" y={highY - 2} fontSize="8" fill="rgba(6,182,212,0.6)" fontFamily="monospace">HIGH (5V)</text>
          <text x="4" y={lowY + 9} fontSize="8" fill="rgba(100,116,139,0.6)" fontFamily="monospace">LOW (0V)</text>
          <text x={width - 4} y={highY + (lowY - highY) * (1 - duty / 100) - 2} fontSize="7" fill="rgba(245,158,11,0.7)" fontFamily="monospace" textAnchor="end">avg ≈ {avgVoltage}V</text>
        </svg>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="pwm-slider" className="text-sm font-medium text-slate-300">
            Duty Cycle
          </label>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-cyan-400 tabular-nums">{duty}%</span>
            <span className="text-xs text-slate-500">analogWrite value: <span className="text-slate-300 font-mono">{analogWriteVal}</span></span>
          </div>
        </div>
        <input
          id="pwm-slider"
          type="range"
          min="0"
          max="100"
          value={duty}
          onChange={e => setDuty(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #06b6d4 ${duty}%, rgba(30,41,59,0.8) ${duty}%)`,
          }}
          aria-label={`PWM duty cycle: ${duty}%`}
        />
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>0% (off)</span>
          <span>50%</span>
          <span>100% (full on)</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl bg-navy-900/80 border border-cyan-900/20">
          <div className="text-xl font-black text-cyan-400 tabular-nums">{duty}%</div>
          <div className="text-xs text-slate-500 mt-0.5">Duty Cycle</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-navy-900/80 border border-cyan-900/20">
          <div className="text-xl font-black text-amber-400 tabular-nums">{avgVoltage}V</div>
          <div className="text-xs text-slate-500 mt-0.5">Avg Voltage*</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-navy-900/80 border border-cyan-900/20">
          <div className="text-xl font-black text-purple-400 tabular-nums">{analogWriteVal}</div>
          <div className="text-xs text-slate-500 mt-0.5">analogWrite()</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">* Approximate average of a 5V PWM signal. The actual pin output switches between 0V and 5V \u2014 it does not produce a true steady analog voltage.</p>
    </div>
  );
}
