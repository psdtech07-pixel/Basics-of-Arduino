import { useState } from 'react';
import SimulationBadge from './SimulationBadge';
import { Sun, Moon } from 'lucide-react';

export default function LDRSimulation() {
  const [light, setLight] = useState(50);

  const adcValue = Math.round((light / 100) * 1023);
  const voltage = ((adcValue / 1023) * 5).toFixed(2);
  const isDark = light < 40;

  return (
    <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white">LDR Light Simulator</h3>
        <SimulationBadge />
      </div>

      {/* Light visualization */}
      <div
        className="relative rounded-xl mb-6 overflow-hidden flex items-center justify-center"
        style={{
          height: '120px',
          background: `radial-gradient(ellipse at center, rgba(255,230,100,${light/140}) 0%, rgba(10,15,30,0.95) 70%)`,
          border: '1px solid rgba(6,182,212,0.15)',
          transition: 'background 0.3s ease',
        }}
        aria-label={`Light level simulation: ${light}%`}
      >
        {isDark ? (
          <Moon size={36} className="text-slate-400" />
        ) : (
          <Sun size={36} style={{ color: `rgba(255,${Math.round(180 + light * 0.75)},50,${0.4 + light/140})` }} />
        )}
        <span className="absolute bottom-3 right-3 text-xs font-mono text-slate-500">
          {isDark ? 'Dark' : light > 75 ? 'Bright' : 'Medium'}
        </span>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="ldr-slider" className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Moon size={14} className="text-slate-500" /> Light Level <Sun size={14} className="text-amber-400" />
          </label>
          <span className="text-sm font-mono text-cyan-400">{light}%</span>
        </div>
        <input
          id="ldr-slider"
          type="range"
          min="0"
          max="100"
          value={light}
          onChange={e => setLight(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, rgba(255,200,50,0.5) ${light}%, rgba(30,41,59,0.8) ${light}%)` }}
          aria-label={`Simulated light level: ${light}%`}
        />
      </div>

      {/* Serial Monitor simulation */}
      <div className="rounded-xl bg-navy-950 border border-cyan-900/20 p-4">
        <div className="text-xs text-slate-500 mb-2 font-semibold">Serial Monitor Output (simulated @ 9600 baud)</div>
        <div className="font-mono text-sm space-y-1">
          <div className="text-green-400">Light reading: {adcValue}</div>
          <div className="text-slate-500 text-xs">// Approx voltage at A0: {voltage} V</div>
          {isDark && <div className="text-amber-400">// Low value — could trigger "dark" condition</div>}
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3">Actual ADC readings depend on your specific LDR, resistor value, supply voltage, and ambient lighting. Calibrate thresholds on real hardware.</p>
    </div>
  );
}
