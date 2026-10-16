import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import SafetyWarning from '../components/SafetyWarning';
import ComponentPhoto from '../components/ComponentPhoto';

const rows = [
  { label: 'Power Rail (+)', color: '#ef4444', desc: 'Red line — connects to 5V or 3.3V. Runs the length of the board.' },
  { label: 'Ground Rail (−)', color: '#3b82f6', desc: 'Blue/black line — connects to GND. Completes all circuits.' },
  { label: 'Component Rows (a–e)', color: '#22c55e', desc: 'Groups of 5 holes that are connected horizontally — insert components here.' },
  { label: 'Component Rows (f–j)', color: '#a855f7', desc: 'Opposite side groups of 5. The center gap separates the two halves.' },
  { label: 'Center Gap (DIP)', color: '#94a3b8', desc: 'Isolates the two halves — ICs (integrated circuits) straddle this gap.' },
];

const rules = [
  'Holes in the same lettered row (a–e or f–j) are connected to each other.',
  'The two halves (a–e and f–j) are NOT connected — the center gap separates them.',
  'Top and bottom power rails run independently — bridge them with a wire if you need one shared rail.',
  'Never connect 5V directly to GND — it creates a short circuit and can damage the board.',
  'Always add resistors in series with LEDs — do not connect LED directly between power and ground.',
];

export default function BreadboardSection() {
  return (
    <section id="breadboard" className="relative bg-navy-950/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 05"
            title="The Breadboard"
            subtitle="A breadboard lets you prototype circuits without soldering. Components plug into holes that are internally connected — understand this layout and you can build any circuit."
          />
        </AnimatedSection>

        {/* Breadboard visual */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-12">
            <h3 className="text-lg font-bold text-white mb-6">Breadboard Anatomy</h3>

            {/* SVG Breadboard */}
            <div className="grid md:grid-cols-2 gap-6 items-center mb-6">
              <svg
                viewBox="0 0 500 160"
                className="w-full max-w-xl"
                style={{ height: '160px' }}
                role="img"
                aria-label="Breadboard layout diagram"
              >
                {/* Board outline */}
                <rect x="10" y="10" width="480" height="140" rx="6" fill="#1e293b" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />

                {/* Power rail top + */}
                <rect x="20" y="20" width="460" height="16" rx="3" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8" />
                <text x="490" y="32" textAnchor="end" fontSize="9" fill="rgba(239,68,68,0.7)" fontFamily="monospace">+</text>
                {Array.from({ length: 25 }).map((_, i) => (
                  <circle key={i} cx={28 + i * 18} cy={28} r="4" fill="#0a1628" stroke="rgba(239,68,68,0.4)" strokeWidth="0.8" />
                ))}

                {/* Power rail top − */}
                <rect x="20" y="40" width="460" height="16" rx="3" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.8" />
                <text x="490" y="52" textAnchor="end" fontSize="9" fill="rgba(59,130,246,0.7)" fontFamily="monospace">−</text>
                {Array.from({ length: 25 }).map((_, i) => (
                  <circle key={i} cx={28 + i * 18} cy={48} r="4" fill="#0a1628" stroke="rgba(59,130,246,0.4)" strokeWidth="0.8" />
                ))}

                {/* Component rows a-e */}
                {[0, 1, 2, 3, 4].map(row => (
                  <g key={row}>
                    <text x="14" y={72 + row * 8} textAnchor="middle" fontSize="6" fill="rgba(6,182,212,0.4)" fontFamily="monospace">{String.fromCharCode(65 + row)}</text>
                    {Array.from({ length: 25 }).map((_, col) => (
                      <rect key={col} x={20 + col * 18} y={66 + row * 8} width="8" height="5" rx="1" fill="#0a1628" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
                    ))}
                  </g>
                ))}

                {/* Center gap label */}
                <line x1="20" y1="108" x2="480" y2="108" stroke="rgba(100,116,139,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <text x="250" y="113" textAnchor="middle" fontSize="7" fill="rgba(100,116,139,0.5)" fontFamily="monospace">CENTER GAP (DIP)</text>

                {/* Component rows f-j */}
                {[0, 1, 2, 3, 4].map(row => (
                  <g key={row}>
                    <text x="14" y={120 + row * 8} textAnchor="middle" fontSize="6" fill="rgba(6,182,212,0.4)" fontFamily="monospace">{String.fromCharCode(70 + row)}</text>
                    {Array.from({ length: 25 }).map((_, col) => (
                      <rect key={col} x={20 + col * 18} y={114 + row * 8} width="8" height="5" rx="1" fill="#0a1628" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5" />
                    ))}
                  </g>
                ))}

                {/* Example connections */}
                <line x1="28" y1="67" x2="28" y2="44" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" />
                <line x1="46" y1="67" x2="46" y2="44" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="34" y="63" fontSize="6" fill="rgba(239,68,68,0.6)" fontFamily="monospace">wire</text>
              </svg>
              <ComponentPhoto
                file="Breadboard and jumper wires.png"
                alt="Full-size solderless breadboard beside a set of jumper wires"
                size="wide"
              />
            </div>

            {/* Rail legend */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {rows.map(row => (
                <div key={row.label} className="flex items-start gap-2 p-2 rounded-lg bg-navy-900/40">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ background: row.color }} />
                  <div>
                    <div className="text-xs font-bold text-slate-300">{row.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{row.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Rules */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-base font-bold text-white mb-4">Golden Rules of Breadboarding</h3>
            <ol className="space-y-3">
              {rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-500/20">
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <SafetyWarning warnings={[
            'A short circuit (power rail connected directly to ground) can instantly damage your Arduino or components.',
            'Double-check all wiring before applying power — once damaged, components cannot be repaired.',
          ]} />
        </AnimatedSection>
      </div>
    </section>
  );
}
