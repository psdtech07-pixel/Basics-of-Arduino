import { useState } from 'react';

export default function BlinkCircuit() {
  const [interval, setInterval] = useState(1000);
  const period = Math.max(0.25, interval / 1000);

  return (
    <div className="circuit-lab" aria-label="Interactive simulation of an Arduino and LED circuit">
      <div className="circuit-lab-top"><span className="live-dot" /> CIRCUIT SIMULATION <span className="lab-readout">D13 · {interval} ms</span></div>
      <svg viewBox="0 0 620 210" className="circuit-diagram" role="img" aria-label="Arduino digital pin 13 wired through a 220 ohm resistor and LED to ground">
        <rect x="24" y="38" width="170" height="132" rx="12" fill="#123653" stroke="#3cc7df" />
        <text x="109" y="72" textAnchor="middle" fill="#b9f5ff" fontSize="15" fontFamily="monospace">ARDUINO UNO</text>
        <rect x="76" y="88" width="67" height="37" rx="5" fill="#071727" stroke="#286783" />
        <text x="109" y="111" textAnchor="middle" fill="#6ba9bf" fontSize="11" fontFamily="monospace">ATmega328P</text>
        <text x="178" y="146" textAnchor="end" fill="#7feaff" fontSize="11" fontFamily="monospace">D13</text>
        <text x="178" y="160" textAnchor="end" fill="#7feaff" fontSize="11" fontFamily="monospace">GND</text>
        <path d="M194 145H270" stroke="#42d5eb" strokeWidth="4" />
        <path d="M270 145h10l7-12 12 24 12-24 12 24 7-12h10" fill="none" stroke="#ffc56d" strokeWidth="3" />
        <text x="300" y="181" textAnchor="middle" fill="#d7ac72" fontSize="11" fontFamily="monospace">220 Ω</text>
        <path d="M348 145h36" stroke="#42d5eb" strokeWidth="4" />
        <path d="m389 131 24 14-24 14Z" fill={undefined} stroke="#d6faff" strokeWidth="2" />
        <path d="M413 130v30" stroke="#d6faff" strokeWidth="3" />
        <circle cx="402" cy="145" r="22" fill="#39e5ff" className="sim-led" style={{ animationDuration: `${period * 2}s` }} />
        <path d="M413 145h106v15H194" fill="none" stroke="#7d9cac" strokeWidth="3" />
        <text x="401" y="190" textAnchor="middle" fill="#aec2cf" fontSize="11" fontFamily="monospace">LED</text>
        <text x="534" y="151" fill="#aec2cf" fontSize="11" fontFamily="monospace">GND</text>
        <path d="m397 120 10-11m0 17 11-11" stroke="#99f5ff" strokeWidth="2" />
      </svg>
      <label className="interval-control">Blink interval <strong>{interval} ms</strong>
        <input type="range" min="250" max="2000" step="250" value={interval} onChange={event => setInterval(Number(event.target.value))} aria-label="Blink interval in milliseconds" />
        <span className="interval-ends"><span>250 ms</span><span>2000 ms</span></span>
      </label>
      <p className="circuit-note">Simulation only. The built-in LED on pin 13 needs no external wiring; this diagram illustrates an external LED with a series resistor.</p>
    </div>
  );
}
