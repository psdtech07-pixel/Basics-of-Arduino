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

const irCode = `const int IR_PIN = 2;
const int LED_PIN = 8;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool obstacle = (digitalRead(IR_PIN) == LOW);   // active LOW
  digitalWrite(LED_PIN, obstacle);
  Serial.println(obstacle ? "Obstacle detected" : "Clear");
  delay(100);
}`;

export default function UltrasonicSection() {
  const usCode = codeExamples.find(c => c.id === 'ultrasonic')!;

  return (
    <section id="ultrasonic" className="relative">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 09"
            title="Digital Sensors"
            subtitle="A digital sensor gives the Arduino a clean on/off level, a timed pulse, or a packet of data."
          />
        </AnimatedSection>

        {/* 1. Short intro (pulse width vs on/off level) */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-base font-bold text-white mb-2">Digital Sensor Styles</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              A digital sensor communicates with discrete signals rather than continuous voltages. There are two primary styles used here:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-navy-950 border border-cyan-900/30">
                <div className="text-sm font-bold text-cyan-400 mb-1">Pulse Width (Timing)</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The duration of a timed pulse represents the measured physical quantity (e.g. HC-SR04 ultrasonic sensor, read via <code className="text-cyan-300">pulseIn()</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-navy-950 border border-cyan-900/30">
                <div className="text-sm font-bold text-cyan-400 mb-1">On/Off Level</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The sensor cleanly switches between discrete HIGH and LOW voltage states (e.g. IR obstacle sensor, read via <code className="text-cyan-300">digitalRead()</code>).
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 2. HC-SR04: keep ALL existing content unchanged; only add "How it works" paragraph from 7.3 above it */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">HC-SR04 Ultrasonic Sensor</h3>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed mb-6">
              <p>
                <strong className="text-white">How it works:</strong> it has two small <strong className="text-white">piezoelectric transducers</strong> that look like metal cans.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 ml-2">
                <li>The <strong className="text-cyan-300">transmitter</strong> is driven with a 40 kHz signal, so its crystal vibrates and sends out a burst of ultrasound (too high to hear).</li>
                <li>The sound travels, hits an object and bounces back.</li>
                <li>The <strong className="text-cyan-300">receiver's</strong> crystal is shaken by the echo and generates a tiny voltage (the piezoelectric effect). Onboard circuitry amplifies it.</li>
                <li>The module measures the <strong className="text-white">time</strong> between sending and receiving.</li>
              </ol>
              <p className="mt-2">
                Since the sound goes there <strong className="text-white">and back</strong>, the distance is half the trip:
              </p>
              <p className="font-mono text-cyan-300 bg-navy-950 p-3 rounded-xl border border-cyan-900/30">
                distance = (time &times; speed of sound) / 2
              </p>
              <p>
                Speed of sound is about 343 m/s, which is <strong className="text-cyan-300">0.0343 cm per microsecond</strong>. A handy shortcut: <code className="text-cyan-300">cm = echo_microseconds / 58</code>.
              </p>
            </div>

            {/* Existing How HC-SR04 Works steps */}
            <h4 className="text-lg font-bold text-white mb-6">How HC-SR04 Works</h4>
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

        {/* Existing Timing specs */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-cyan-900/30">
              <h3 className="font-bold text-white">HC-SR04 Specifications & Timing</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {timing.map((t, _i) => (
                <div key={t.label} className="px-4 py-3 border-b border-r border-cyan-900/10">
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">{t.label}</div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Existing Wiring */}
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

        {/* Existing Code */}
        <AnimatedSection>
          <CodeBlock
            title={usCode.title}
            code={usCode.code}
            language="cpp"
            description={usCode.description}
          />
        </AnimatedSection>

        {/* Existing Simulation */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-2 mt-6">Live Distance Simulation</h3>
          <p className="text-sm text-slate-400 mb-6">
            Drag the slider or use Auto mode to see how distance affects the echo duration and what the code reads.
          </p>
          <UltrasonicSimulation />
        </AnimatedSection>

        {/* 3. NEW IR Obstacle Sensor from 7.2 */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mt-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">IR Obstacle Sensor</h3>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-6">
              <p>
                <strong className="text-white">What it detects:</strong> an object in front of it (about 2 to 30 cm, adjustable).
              </p>
              <p>
                <strong className="text-white">How it works:</strong> the module has an <strong className="text-cyan-300">infrared LED</strong> that constantly sends out invisible light, and a <strong className="text-cyan-300">photodiode</strong> that receives it. If an object is in front, it reflects some light back to the photodiode, which then conducts more current. An onboard <strong className="text-white">LM393 comparator</strong> compares that signal with a threshold (set by the blue pot) and switches the output cleanly between HIGH and LOW. A small LED on the board lights when an obstacle is seen.
              </p>
              <p>
                <strong className="text-white">Electrical signal:</strong> a digital level. <strong className="text-cyan-300">LOW = obstacle detected, HIGH = clear</strong> (active low).
              </p>
              <p>
                <strong className="text-white">How Arduino reads it:</strong> <code className="text-cyan-300">digitalRead()</code>.
              </p>
            </div>

            {/* Wiring Table */}
            <div className="overflow-x-auto rounded-xl border border-cyan-900/30 bg-navy-900/40 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-900/50 border-b border-cyan-900/20">
                    <th className="px-5 py-3 text-left font-bold text-cyan-400">IR Module</th>
                    <th className="px-5 py-3 text-left font-bold text-cyan-400">Arduino</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-cyan-900/10">
                    <td className="px-5 py-2.5 font-medium text-slate-300">VCC</td>
                    <td className="px-5 py-2.5 font-mono text-cyan-300">5V</td>
                  </tr>
                  <tr className="border-b border-cyan-900/10 bg-navy-950/40">
                    <td className="px-5 py-2.5 font-medium text-slate-300">GND</td>
                    <td className="px-5 py-2.5 font-mono text-cyan-300">GND</td>
                  </tr>
                  <tr className="border-b border-cyan-900/10">
                    <td className="px-5 py-2.5 font-medium text-slate-300">OUT</td>
                    <td className="px-5 py-2.5 font-mono text-cyan-300">D2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* WiringDiagram */}
            <div className="mb-6">
              <WiringDiagram
                title="IR Obstacle Sensor Wiring"
                connections={[
                  { pin: 'IR VCC', connection: 'Arduino 5V', color: 'red' },
                  { pin: 'IR GND', connection: 'Arduino GND', color: 'black' },
                  { pin: 'IR OUT', connection: 'Arduino D2', color: 'yellow' },
                  { pin: 'LED Anode (via 220Ω)', connection: 'Arduino D8', color: 'cyan' },
                  { pin: 'LED Cathode', connection: 'Arduino GND', color: 'black' },
                ]}
              />
            </div>

            {/* Code */}
            <CodeBlock
              title="IR Obstacle Sensor Read & Alert"
              code={irCode}
              language="cpp"
              description="Read digital state from IR obstacle sensor on D2 (active LOW) and control LED on D8."
            />

            <div className="space-y-3 mt-6">
              <div className="p-4 rounded-xl bg-navy-950 border border-cyan-900/30">
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Try it:</strong> turn the pot until the board's LED just lights for your hand at about 10 cm.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-navy-950 border border-amber-500/20">
                <p className="text-sm text-slate-300">
                  <strong className="text-amber-400">Watch out:</strong> black or shiny surfaces reflect poorly (a black object can be missed), and direct sunlight contains infrared, which confuses the sensor. It tells you <em>if</em> something is there, not <em>how far</em>.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
