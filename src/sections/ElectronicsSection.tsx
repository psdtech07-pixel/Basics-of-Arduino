import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import SafetyWarning from '../components/SafetyWarning';
import { motion, useReducedMotion } from 'framer-motion';
import ComponentPhoto from '../components/ComponentPhoto';

const components = [
  {
    name: 'Resistor',
    symbol: 'Ω',
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    desc: 'Limits current flow. Protects LEDs and other components from excessive current.',
    analogy: 'Like a narrow pipe restricting water flow.',
    example: 'Place a 220Ω–470Ω resistor in series with an LED.',
  },
  {
    name: 'LED',
    symbol: '▷|',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    desc: 'Light Emitting Diode. Lights up when current flows in the correct direction.',
    analogy: 'A one-way valve that also glows.',
    example: 'Always pair with a current-limiting resistor (220Ω–470Ω at 5V).',
  },
  {
    name: 'Button (Switch)',
    symbol: '/ /',
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    desc: 'Completes or breaks a circuit when pressed. Read with digitalRead().',
    analogy: 'Like a door — open means no current, closed means current flows.',
    example: 'Use with a 10kΩ pull-down resistor for clean HIGH/LOW readings.',
  },
  {
    name: 'LDR (Photoresistor)',
    symbol: 'LDR',
    color: 'text-yellow-400',
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/5',
    desc: 'Its resistance changes based on light level. High resistance in dark, low resistance in light.',
    analogy: 'A resistor that "sees" light.',
    example: 'Use in a voltage divider with a 10kΩ resistor; read with analogRead().',
  },
  {
    name: 'Buzzer',
    symbol: '♪',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    desc: 'Converts electrical signals to sound. Active buzzer buzzes when power is applied.',
    analogy: 'Like a tiny speaker that needs an on/off signal.',
    example: 'Connect to a digital pin; use tone() for passive buzzers.',
  },
  {
    name: 'Servo Motor',
    symbol: '↺',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    desc: 'Rotates to a specific angle (0–180°) based on a PWM signal.',
    analogy: 'A motor with a built-in angle controller.',
    example: 'Use the Servo library; connect signal wire to a PWM pin.',
  },
];

const ohmLawNotes = [
  { label: 'Voltage (V)', unit: 'Volts', formula: 'V = I × R', color: 'text-red-400' },
  { label: 'Current (I)', unit: 'Amperes', formula: 'I = V / R', color: 'text-green-400' },
  { label: 'Resistance (R)', unit: 'Ohms (Ω)', formula: 'R = V / I', color: 'text-amber-400' },
];

export default function ElectronicsSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="electronics" className="relative bg-navy-950/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 04"
            title="Electronics Essentials"
            subtitle="You don't need a full electronics degree. Here are the key concepts and components you'll use in every Arduino project."
          />
        </AnimatedSection>

        {/* Ohm's Law */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-8 mb-12">
            <h3 className="text-xl font-bold text-white mb-2">Ohm's Law</h3>
            <p className="text-slate-400 text-sm mb-6">The fundamental relationship between voltage, current, and resistance. Every circuit obeys this law.</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {ohmLawNotes.map(item => (
                <div key={item.label} className="text-center p-4 rounded-xl bg-navy-900/60 border border-cyan-900/20">
                  <div className={`text-2xl font-black ${item.color} mb-1`}>{item.label.split(' ')[0]}</div>
                  <div className="text-xs text-slate-500 mb-3">{item.unit}</div>
                  <div className={`text-sm font-mono font-bold ${item.color}`}>{item.formula}</div>
                </div>
              ))}
            </div>

            {/* LED resistor calculation */}
            <div className="rounded-xl bg-navy-950 border border-cyan-900/20 p-5">
              <div className="grid md:grid-cols-[150px_minmax(0,1fr)] gap-4 items-center">
                <ComponentPhoto file="resistors.png" alt="Axial through-hole resistor with colored value bands and two wire leads" size="thumbnail" />
                <div>
                  <p className="text-sm font-bold text-white mb-3">Practical: Choosing an LED Resistor</p>
                  <div className="font-mono text-sm space-y-1.5 text-slate-300">
                    <div>Supply voltage: <span className="text-cyan-400">5 V</span></div>
                    <div>LED forward voltage: <span className="text-yellow-400">~2 V</span></div>
                    <div>Desired LED current: <span className="text-green-400">~15 mA = 0.015 A</span></div>
                    <div className="border-t border-cyan-900/30 pt-2 mt-2">
                      R = (V<sub>supply</sub> − V<sub>LED</sub>) / I<sub>LED</sub>
                    </div>
                    <div className="text-cyan-400">R = (5 − 2) / 0.015 = <strong>200 Ω</strong> → use <strong>220 Ω</strong> (next standard value)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Safety */}
        <AnimatedSection>
          <SafetyWarning warnings={[
            'LEDs are diodes — they only conduct in one direction. Reverse them and they block (and are protected). But too much forward current destroys them — always use a resistor.',
            'Polarized components (electrolytic capacitors, diodes, LEDs) have a + and − side — connecting them backwards can damage them.',
            '5V is safe for humans but can easily damage components. Short circuits can permanently destroy your Arduino board.',
          ]} />
        </AnimatedSection>

        {/* Component cards */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-6 mt-8">Common Components You'll Use</h3>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((comp, i) => (
            <AnimatedSection key={comp.name} delay={i * 0.07}>
              <motion.div
                whileHover={shouldReduce ? {} : { y: -4 }}
                className={`rounded-2xl border ${comp.border} ${comp.bg} p-5 h-full`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl font-black font-mono ${comp.color}`}>{comp.symbol}</span>
                  <h3 className="font-bold text-white">{comp.name}</h3>
                </div>
                {comp.name === 'LED' && (
                  <>
                    <ComponentPhoto file="led.png" alt="Red, green, and blue through-hole LEDs with visible anode and cathode leads" size="thumbnail" className="mb-3" />
                    <svg viewBox="0 0 260 74" className="w-full h-[74px] mb-3 rounded-lg bg-navy-950/70 border border-cyan-900/20" role="img" aria-label="LED polarity diagram: current flows from anode positive through the LED to cathode negative, with a series resistor">
                      <path d="M18 36h28l7-10 10 20 10-20 10 20 10-10h16m0 0 30-18v36l-30-18m30 0h8m0-14v28m0-14h39" fill="none" stroke="#7de9f5" strokeWidth="2" strokeLinejoin="round" />
                      <path d="m129 18 9-9m-1 13 9-9" stroke="#7de9f5" strokeWidth="1.5" />
                      <path d="m138 9-2 7 7-2m-5 8-2 7 7-2" fill="none" stroke="#7de9f5" strokeWidth="1.5" />
                      <text x="20" y="65" fill="#9fb2c0" fontSize="9">+ Anode</text>
                      <text x="158" y="65" fill="#9fb2c0" fontSize="9">Cathode −</text>
                      <text x="49" y="15" fill="#9fb2c0" fontSize="9">Series resistor</text>
                    </svg>
                  </>
                )}
                <p className="text-sm text-slate-400 mb-3 leading-relaxed">{comp.desc}</p>
                <div className="p-2.5 rounded-lg bg-navy-900/60 mb-2">
                  <p className="text-xs text-slate-500 mb-0.5 font-semibold">Analogy</p>
                  <p className="text-xs text-slate-400 italic">{comp.analogy}</p>
                </div>
                <div className={`text-xs font-semibold ${comp.color}`}>
                  Usage: <span className="font-normal text-slate-400">{comp.example}</span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
