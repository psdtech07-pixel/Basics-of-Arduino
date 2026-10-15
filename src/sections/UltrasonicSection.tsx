import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import WiringDiagram from '../components/WiringDiagram';
import UltrasonicSimulation from '../components/UltrasonicSimulation';
import { codeExamples } from '../data/codeExamples';

const timing = [
  { label: 'TRIG pulse width', value: '≥ 10 µs HIGH pulse' },
  { label: 'Measurement range', value: '2 cm – 400 cm' },
  { label: 'Echo duration formula', value: 'time (µs) = distance × 2 / 0.0343' },
  { label: 'Distance from echo', value: 'distance (cm) = echo_µs × 0.0343 / 2' },
  { label: 'Speed of sound used', value: '343 m/s ≈ 0.0343 cm/µs' },
  { label: 'Trigger pin', value: 'Digital output (any digital pin)' },
  { label: 'Echo pin', value: 'Digital input (any digital pin)' },
  { label: 'Operating voltage', value: '5V, ~15 mA' },
];

export default function UltrasonicSection() {
  const usCode = codeExamples.find(c => c.id === 'ultrasonic')!;

  return (
    <section id="ultrasonic" className="relative">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 08"
            title="Distance Sensing: HC-SR04 Ultrasonic"
            subtitle="The HC-SR04 sends a 40 kHz ultrasonic pulse and measures the time it takes to bounce back. From that echo duration, we calculate the distance to any object in front of it."
          />
        </AnimatedSection>

        {/* How it works */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-6">How HC-SR04 Works</h3>
            <div className="flex flex-col sm:flex-row gap-0 items-center justify-center">
              {[
                { step: '1', title: 'Trigger', desc: 'Send ≥10µs HIGH pulse to TRIG pin', color: 'border-green-500/30 bg-green-500/5 text-green-400' },
                { step: '2', title: 'Pulse', desc: 'Module sends 8× 40kHz ultrasonic burst', color: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400' },
                { step: '3', title: 'Echo', desc: 'ECHO pin goes HIGH; stays HIGH until reflected', color: 'border-amber-500/30 bg-amber-500/5 text-amber-400' },
                { step: '4', title: 'Calculate', desc: 'Measure ECHO pulse width → calculate distance', color: 'border-purple-500/30 bg-purple-500/5 text-purple-400' },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center">
                  <div className={`flex flex-col items-center p-5 rounded-2xl border ${item.color} min-w-[120px] text-center`}>
                    <div className={`text-2xl font-black mb-1 ${item.color.split(' ').find(c => c.startsWith('text-'))}`}>
                      {item.step}
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                  {i < 3 && (
                    <div className="text-slate-600 text-lg px-2 hidden sm:block">→</div>
                  )}
                  {i < 3 && (
                    <div className="text-slate-600 text-lg py-2 sm:hidden">↓</div>
                  )}
                </div>
              ))}
            </div>

            {/* Formula */}
            <div className="mt-6 p-4 rounded-xl bg-navy-950 border border-cyan-900/20 text-center">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Distance Calculation</p>
              <p className="font-mono text-cyan-400 text-base font-bold">
                distance (cm) = pulseIn(echoPin, HIGH) × 0.0343 / 2
              </p>
              <p className="text-xs text-slate-500 mt-2">Dividing by 2 accounts for the pulse travelling to the object AND back.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Timing specs */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-cyan-900/30">
              <h3 className="font-bold text-white">HC-SR04 Specifications & Timing</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {timing.map((t, i) => (
                <div key={t.label} className="px-4 py-3 border-b border-r border-cyan-900/10">
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">{t.label}</div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Wiring */}
        <AnimatedSection>
          <div className="mb-6">
            <WiringDiagram
              title="HC-SR04 Wiring"
              connections={[
                { pin: 'HC-SR04 VCC', connection: 'Arduino 5V', color: 'red' },
                { pin: 'HC-SR04 GND', connection: 'Arduino GND', color: 'black' },
                { pin: 'HC-SR04 TRIG', connection: 'Arduino D9', color: 'yellow' },
                { pin: 'HC-SR04 ECHO', connection: 'Arduino D8', color: 'green' },
              ]}
            />
          </div>
        </AnimatedSection>

        {/* Code */}
        <AnimatedSection>
          <CodeBlock
            title={usCode.title}
            code={usCode.code}
            language="cpp"
            description={usCode.description}
          />
        </AnimatedSection>

        {/* Simulation */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-2 mt-6">Live Distance Simulation</h3>
          <p className="text-sm text-slate-400 mb-6">
            Drag the slider or use Auto mode to see how distance affects the echo duration and what the code reads.
          </p>
          <UltrasonicSimulation />
        </AnimatedSection>
      </div>
    </section>
  );
}
