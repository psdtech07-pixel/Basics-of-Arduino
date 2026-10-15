import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pinoutData, pinTypeColors, pinTypeLabels, type PinInfo } from '../data/pinout';
import { X, Cpu, Zap, Activity, Power, Star } from 'lucide-react';

const typeIcons = {
  digital: Activity,
  analog: Zap,
  pwm: Zap,
  power: Power,
  special: Star,
};

const boardPins = [
  // Right side — digital pins D0-D13 (top to bottom)
  { id: 'd0', x: 88, y: 12 },
  { id: 'd1', x: 88, y: 17 },
  { id: 'd2', x: 88, y: 22 },
  { id: 'd3', x: 88, y: 27 },
  { id: 'd4', x: 88, y: 32 },
  { id: 'd5', x: 88, y: 37 },
  { id: 'd6', x: 88, y: 42 },
  { id: 'd7', x: 88, y: 47 },
  { id: 'd8', x: 88, y: 57 },
  { id: 'd9', x: 88, y: 62 },
  { id: 'd10', x: 88, y: 67 },
  { id: 'd11', x: 88, y: 72 },
  { id: 'd12', x: 88, y: 77 },
  { id: 'd13', x: 88, y: 82 },
  // Left side — analog + power
  { id: 'a0', x: 12, y: 82 },
  { id: 'a1', x: 12, y: 77 },
  { id: 'a2', x: 12, y: 72 },
  { id: 'a3', x: 12, y: 67 },
  { id: 'a4', x: 12, y: 62 },
  { id: 'a5', x: 12, y: 57 },
  { id: '5v', x: 12, y: 45 },
  { id: '3v3', x: 12, y: 40 },
  { id: 'gnd', x: 12, y: 35 },
  { id: 'vin', x: 12, y: 30 },
  // Bottom — USB, DC Jack
  { id: 'usb', x: 12, y: 92 },
  { id: 'dcjack', x: 12, y: 15 },
  // Center
  { id: 'atmega', x: 50, y: 50 },
  { id: 'reset', x: 50, y: 10 },
];

interface PinDot {
  id: string;
  x: number;
  y: number;
}

export default function PinoutExplorer() {
  const [selected, setSelected] = useState<PinInfo | null>(null);

  const getPinInfo = (id: string) => pinoutData.find(p => p.id === id);

  const handlePin = (id: string) => {
    const info = getPinInfo(id);
    if (info) setSelected(prev => prev?.id === id ? null : info);
  };

  const getPinColor = (id: string) => {
    const info = getPinInfo(id);
    if (!info) return 'fill-slate-600 stroke-slate-500';
    const colors: Record<string, string> = {
      digital: 'fill-blue-500 stroke-blue-400',
      analog: 'fill-green-500 stroke-green-400',
      pwm: 'fill-purple-500 stroke-purple-400',
      power: 'fill-red-500 stroke-red-400',
      special: 'fill-cyan-500 stroke-cyan-400',
    };
    return colors[info.type] ?? 'fill-slate-500';
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Board Diagram */}
      <div className="relative">
        <div className="rounded-2xl border border-cyan-900/30 bg-navy-950 p-4 overflow-hidden">
          <p className="text-xs text-slate-500 mb-3 text-center">Click any pin to explore</p>
          <svg
            viewBox="0 0 100 100"
            className="w-full max-w-md mx-auto"
            style={{ aspectRatio: '1/1' }}
            role="img"
            aria-label="Arduino Uno R3 pinout diagram"
          >
            {/* Board outline */}
            <rect x="8" y="8" width="84" height="84" rx="4" fill="#162040" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5" />

            {/* Center chip */}
            <rect x="36" y="36" width="28" height="28" rx="2" fill="#0a1628" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" />
            <text x="50" y="49" textAnchor="middle" fontSize="2" fill="rgba(6,182,212,0.7)" fontFamily="monospace">ATmega</text>
            <text x="50" y="53" textAnchor="middle" fontSize="2" fill="rgba(6,182,212,0.7)" fontFamily="monospace">328P</text>

            {/* USB connector area */}
            <rect x="8" y="86" width="12" height="7" rx="1" fill="#0d1a35" stroke="rgba(6,182,212,0.15)" strokeWidth="0.3" />
            <text x="14" y="91" textAnchor="middle" fontSize="1.5" fill="rgba(6,182,212,0.5)" fontFamily="monospace">USB</text>

            {/* DC Jack */}
            <rect x="8" y="7" width="10" height="8" rx="2" fill="#1a1a2e" stroke="rgba(6,182,212,0.15)" strokeWidth="0.3" />
            <circle cx="13" cy="11" r="2.5" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="0.3" />

            {/* Pin dots */}
            {boardPins.map(pin => {
              const info = getPinInfo(pin.id);
              if (!info) return null;
              const isSelected = selected?.id === pin.id;
              const isPWM = info.type === 'pwm';
              return (
                <g key={pin.id}>
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isSelected ? 3.5 : 2.5}
                    className={`cursor-pointer transition-all ${getPinColor(pin.id)} ${
                      isSelected ? 'stroke-2' : 'stroke-1'
                    }`}
                    onClick={() => handlePin(pin.id)}
                    style={{ filter: isSelected ? `drop-shadow(0 0 4px currentColor)` : undefined }}
                  />
                  {isPWM && !isSelected && (
                    <text
                      x={pin.x + (pin.x > 50 ? 4 : -4)}
                      y={pin.y + 0.6}
                      fontSize="1.5"
                      fill="rgba(168,85,247,0.6)"
                      textAnchor={pin.x > 50 ? 'start' : 'end'}
                      fontFamily="monospace"
                    >
                      ~
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {Object.entries(pinTypeLabels).map(([type, label]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  type === 'digital' ? 'bg-blue-500' :
                  type === 'analog' ? 'bg-green-500' :
                  type === 'pwm' ? 'bg-purple-500' :
                  type === 'power' ? 'bg-red-500' : 'bg-cyan-500'
                }`} />
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-cyan-500/30 bg-navy-800 p-6 relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close pin details"
              >
                <X size={16} />
              </button>

              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg border ${pinTypeColors[selected.type]}`}>
                  {(() => {
                    const Icon = typeIcons[selected.type];
                    return <Icon size={18} />;
                  })()}
                </div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${pinTypeColors[selected.type].split(' ').find(c => c.startsWith('text-'))}`}>
                    {pinTypeLabels[selected.type]}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">{selected.name}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Purpose</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{selected.purpose}</p>
                </div>

                <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                  <p className="text-xs text-cyan-400 font-semibold mb-1">💡 Analogy</p>
                  <p className="text-sm text-slate-400 italic">{selected.analogy}</p>
                </div>

                {selected.caution && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs text-amber-400 font-semibold mb-1">⚠️ Caution</p>
                    <p className="text-sm text-amber-200/80">{selected.caution}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-cyan-900/40 bg-navy-950/50 p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
            >
              <Cpu size={40} className="text-slate-600 mb-3" />
              <p className="text-slate-500 text-sm">Click any pin on the board diagram to see its purpose, how it works, and what to watch out for.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
