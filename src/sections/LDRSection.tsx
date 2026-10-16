import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import WiringDiagram from '../components/WiringDiagram';
import LDRSimulation from '../components/LDRSimulation';
import ComponentPhoto from '../components/ComponentPhoto';
import { codeExamples } from '../data/codeExamples';

const dividerTableRows = [
  { resistance: '1kΩ', vout: '4.55 V', adc: '930' },
  { resistance: '5kΩ', vout: '3.33 V', adc: '682' },
  { resistance: '10kΩ', vout: '2.50 V', adc: '512' },
  { resistance: '50kΩ', vout: '0.83 V', adc: '170' },
  { resistance: '100kΩ', vout: '0.45 V', adc: '93' },
];

const sensorComparisonRows = [
  {
    sensor: 'Potentiometer',
    changes: 'Divides voltage itself (knob angle)',
    divider: 'No (it is a divider)',
    pin: 'A2',
  },
  {
    sensor: 'LDR',
    changes: 'Resistance (falls with bright light)',
    divider: 'Yes',
    pin: 'A0',
  },
  {
    sensor: 'NTC Thermistor',
    changes: 'Resistance (falls as temperature rises)',
    divider: 'Yes',
    pin: 'A1',
  },
];

const thermistorCode = `const int THERM_PIN = A1;
const float R_FIXED = 10000.0;   // the fixed resistor
const float R0 = 10000.0;        // thermistor at 25 C
const float T0 = 298.15;         // 25 C in kelvin
const float BETA = 3950.0;       // check your datasheet

void setup() {
  Serial.begin(9600);
}

void loop() {
  int adc = analogRead(THERM_PIN);
  if (adc == 0) return;                          // avoid divide by zero

  float rTherm = R_FIXED * (1023.0 / adc - 1.0);
  float tempK = 1.0 / (1.0 / T0 + log(rTherm / R0) / BETA);
  float tempC = tempK - 273.15;

  Serial.print("Temperature: ");
  Serial.print(tempC, 1);
  Serial.println(" C");
  delay(500);
}`;

const potCode = `const int POT_PIN = A2;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(POT_PIN);              // 0..1023
  float volts = raw * 5.0 / 1023.0;           // 0..5 V
  int percent = map(raw, 0, 1023, 0, 100);    // 0..100 %

  Serial.print("Raw: ");     Serial.print(raw);
  Serial.print("  Volts: "); Serial.print(volts, 2);
  Serial.print("  Percent: "); Serial.println(percent);
  delay(200);
}`;

export default function LDRSection() {
  const ldrCode = codeExamples.find(c => c.id === 'ldr-light')!;

  return (
    <section id="ldr" className="relative bg-navy-950/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 08"
            title="Analog Sensors"
            subtitle="An analog sensor changes smoothly with the thing it measures. The Arduino reads it through the ADC on pins A0 to A5."
          />
        </AnimatedSection>

        {/* 1. Short intro with pipeline line */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-base font-bold text-white mb-2">How Arduino Reads Any Analog Sensor</h3>
            <p className="text-sm font-mono text-cyan-300 bg-navy-950 p-4 rounded-xl border border-cyan-900/30 leading-relaxed overflow-x-auto">
              Physical quantity &rarr; Sensor (its resistance changes) &rarr; Voltage divider (resistance becomes voltage) &rarr; ADC (voltage becomes 0..1023) &rarr; Your code (number becomes real units)
            </p>
          </div>
        </AnimatedSection>

        {/* 2. NEW "Voltage Divider" block FIRST */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Voltage Divider</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center mb-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-navy-950 border border-cyan-500/30">
                  <p className="text-sm font-bold text-cyan-300">Arduino reads voltage, not resistance.</p>
                </div>
                <div className="p-4 rounded-xl bg-navy-950 border border-cyan-900/30">
                  <p className="text-sm font-mono text-cyan-400 font-semibold mb-2">
                    Vout = 5V &times; R2 / (R1 + R2)
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong>Rule:</strong> sensor on the 5V side, fixed 10k to GND, analog pin at the junction; resistance falls &rarr; Vout rises &rarr; reading rises.
                  </p>
                </div>
              </div>

              {/* 5V - R1 - Vout - R2 - GND diagram */}
              <div className="flex justify-center p-4 bg-navy-900/40 rounded-xl border border-cyan-900/20">
                <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" role="img" aria-label="5V - R1 - Vout - R2 - GND voltage divider schematic">
                  <text x="100" y="14" textAnchor="middle" fontSize="10" fill="rgba(239,68,68,0.9)" fontFamily="monospace">5V</text>
                  <line x1="100" y1="16" x2="100" y2="35" stroke="rgba(239,68,68,0.6)" strokeWidth="1.5" />
                  <rect x="82" y="35" width="36" height="20" rx="3" fill="#0a1628" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />
                  <text x="100" y="49" textAnchor="middle" fontSize="9" fill="rgba(6,182,212,0.9)" fontFamily="monospace">R1</text>
                  <line x1="100" y1="55" x2="100" y2="75" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />
                  <circle cx="100" cy="75" r="3.5" fill="rgba(6,182,212,0.9)" />
                  <line x1="100" y1="75" x2="160" y2="75" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" />
                  <text x="170" y="79" textAnchor="start" fontSize="10" fill="rgba(6,182,212,0.9)" fontFamily="monospace">Vout</text>
                  <line x1="100" y1="75" x2="100" y2="100" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
                  <rect x="82" y="100" width="36" height="20" rx="3" fill="#0a1628" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5" />
                  <text x="100" y="114" textAnchor="middle" fontSize="9" fill="rgba(168,85,247,0.9)" fontFamily="monospace">R2</text>
                  <line x1="100" y1="120" x2="100" y2="145" stroke="rgba(148,163,184,0.6)" strokeWidth="1.5" />
                  <line x1="85" y1="145" x2="115" y2="145" stroke="rgba(148,163,184,0.6)" strokeWidth="1.5" />
                  <line x1="90" y1="150" x2="110" y2="150" stroke="rgba(148,163,184,0.5)" strokeWidth="1" />
                  <line x1="95" y1="155" x2="105" y2="155" stroke="rgba(148,163,184,0.4)" strokeWidth="0.8" />
                  <text x="100" y="165" textAnchor="middle" fontSize="10" fill="rgba(148,163,184,0.9)" fontFamily="monospace">GND</text>
                </svg>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-cyan-900/30 bg-navy-900/40">
              <div className="px-4 py-2.5 bg-navy-700/50 border-b border-cyan-900/30">
                <span className="text-sm text-cyan-300 font-mono font-semibold">
                  Vout = 5 &times; 10k / (R_sensor + 10k); ADC = floor(Vout / 5 &times; 1024)
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-900/50 border-b border-cyan-900/20">
                    <th className="px-4 py-3 text-left font-bold text-cyan-400">Sensor Resistance</th>
                    <th className="px-4 py-3 text-left font-bold text-cyan-400">Vout</th>
                    <th className="px-4 py-3 text-left font-bold text-cyan-400">ADC Reading</th>
                  </tr>
                </thead>
                <tbody>
                  {dividerTableRows.map((r, i) => (
                    <tr key={r.resistance} className={`border-b border-cyan-900/10 ${i % 2 === 0 ? 'bg-navy-950/40' : ''}`}>
                      <td className="px-4 py-2.5 font-mono text-slate-300">{r.resistance}</td>
                      <td className="px-4 py-2.5 font-mono text-cyan-300">{r.vout}</td>
                      <td className="px-4 py-2.5 font-mono text-green-400">{r.adc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* 3. LDR: add "How it works" and "Electrical signal" paragraphs from section 6.2 above existing LDR content */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">LDR (Light Dependent Resistor)</h3>
            <div className="grid md:grid-cols-[190px_minmax(0,1fr)] gap-6 items-center mb-6">
              <ComponentPhoto file="ldr.png" alt="Light-dependent resistor photoresistor with a circular light-sensitive face and two leads" />
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">How it works:</strong> the LDR's surface is a light-sensitive semiconductor (cadmium sulfide). In the dark, few electrons are free to carry current, so <strong className="text-white">resistance is high</strong> (hundreds of kilohms up to megohms). When light hits it, photons give electrons enough energy to break free. More free electrons means more current flows, so <strong className="text-white">resistance falls</strong> (to roughly a few kilohms or less in bright light). The exact values vary between parts.
                </p>
                <p>
                  <strong className="text-white">Electrical signal:</strong> a resistance that drops as light increases. A voltage divider turns that into a voltage.
                </p>
              </div>
            </div>

            {/* Existing Voltage Divider content */}
            <h4 className="text-lg font-bold text-white mb-4">The Voltage Divider Circuit</h4>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Connect the LDR and a fixed 10kΩ resistor in series between 5V and GND.
                  The analog input pin reads the voltage at the junction point.
                </p>
                <p className="text-sm text-slate-400 mb-4">
                  As light increases → LDR resistance decreases → more voltage appears at A0 → analogRead() value increases toward 1023.
                </p>
                <div className="p-3 rounded-xl bg-navy-950 border border-cyan-900/20">
                  <p className="text-xs text-slate-500 font-mono">V_A0 = 5V × R_fixed / (R_LDR + R_fixed)</p>
                  <p className="text-xs text-slate-500 mt-1">In bright light: R_LDR → low → V_A0 → closer to 5V → ADC near 1023</p>
                  <p className="text-xs text-slate-500">In darkness: R_LDR → high → V_A0 → closer to 0V → ADC near 0</p>
                </div>
              </div>
              {/* Schematic SVG */}
              <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" role="img" aria-label="LDR voltage divider schematic">
                {/* 5V */}
                <text x="100" y="14" textAnchor="middle" fontSize="9" fill="rgba(239,68,68,0.8)" fontFamily="monospace">5V</text>
                <line x1="100" y1="16" x2="100" y2="35" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" />
                {/* LDR symbol */}
                <rect x="82" y="35" width="36" height="20" rx="3" fill="#0a1628" stroke="rgba(234,179,8,0.5)" strokeWidth="1" />
                <text x="100" y="49" textAnchor="middle" fontSize="8" fill="rgba(234,179,8,0.8)" fontFamily="monospace">LDR</text>
                <line x1="100" y1="55" x2="100" y2="75" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                {/* Node */}
                <circle cx="100" cy="75" r="3" fill="rgba(6,182,212,0.8)" />
                {/* Wire to A0 */}
                <line x1="100" y1="75" x2="160" y2="75" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                <text x="170" y="79" textAnchor="start" fontSize="9" fill="rgba(6,182,212,0.8)" fontFamily="monospace">A0</text>
                {/* Fixed resistor */}
                <line x1="100" y1="75" x2="100" y2="100" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
                <rect x="82" y="100" width="36" height="20" rx="3" fill="#0a1628" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
                <text x="100" y="114" textAnchor="middle" fontSize="8" fill="rgba(168,85,247,0.8)" fontFamily="monospace">10kΩ</text>
                <line x1="100" y1="120" x2="100" y2="145" stroke="rgba(100,116,139,0.5)" strokeWidth="1.5" />
                {/* GND */}
                <line x1="85" y1="145" x2="115" y2="145" stroke="rgba(100,116,139,0.5)" strokeWidth="1.5" />
                <line x1="90" y1="150" x2="110" y2="150" stroke="rgba(100,116,139,0.4)" strokeWidth="1" />
                <line x1="95" y1="155" x2="105" y2="155" stroke="rgba(100,116,139,0.3)" strokeWidth="0.8" />
                <text x="100" y="165" textAnchor="middle" fontSize="9" fill="rgba(100,116,139,0.8)" fontFamily="monospace">GND</text>
              </svg>
            </div>
          </div>
        </AnimatedSection>

        {/* Existing LDR Wiring diagram */}
        <AnimatedSection>
          <div className="mb-6">
            <WiringDiagram
              title="LDR Wiring (Breadboard)"
              connections={[
                { pin: 'Arduino 5V', connection: 'LDR leg 1', color: 'red' },
                { pin: 'LDR leg 2', connection: 'Breadboard node (A0 side)', color: 'yellow' },
                { pin: 'Breadboard node', connection: 'Arduino A0', color: 'cyan' },
                { pin: 'Breadboard node', connection: '10kΩ resistor leg 1', color: 'yellow' },
                { pin: '10kΩ resistor leg 2', connection: 'Arduino GND', color: 'black' },
              ]}
            />
          </div>
        </AnimatedSection>

        {/* Existing LDR Code */}
        <AnimatedSection>
          <CodeBlock
            title={ldrCode.title}
            code={ldrCode.code}
            language="cpp"
            description={ldrCode.description}
          />
        </AnimatedSection>

        {/* Existing LDR Simulation */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-2 mt-4">Live Simulation</h3>
          <p className="text-slate-400 text-sm mb-6">
            Adjust the simulated light level and see how the ADC value and serial output change.
          </p>
          <LDRSimulation />
        </AnimatedSection>

        {/* Existing LDR Calibration note */}
        <AnimatedSection>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 mt-6 mb-12">
            <p className="text-sm font-bold text-amber-400 mb-2">🔧 Calibration Tip</p>
            <p className="text-sm text-slate-400">
              Open the Serial Monitor after uploading. Cover the LDR completely (dark) and note the ADC value — that's your "dark" reading.
              Shine a torch on it and note the "bright" reading. Set your threshold between these two values in your code.
            </p>
          </div>
        </AnimatedSection>

        {/* 4. NEW NTC Thermistor from 6.3 */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">NTC Thermistor (temperature)</h3>

            <div className="grid md:grid-cols-[190px_minmax(0,1fr)] gap-6 items-start mb-6">
              <ComponentPhoto file="thermistor.png" alt="NTC thermistor bead with two metal leads" />
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">What it measures:</strong> temperature.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> an NTC (negative temperature coefficient) thermistor is a ceramic made from metal oxides. Heat gives its charge carriers more energy, so more of them are free to conduct. <strong className="text-white">As temperature rises, resistance falls</strong>, and it falls fast and non-linearly. A common 10k part has <strong className="text-cyan-300">10 kohm at 25 C</strong>.
                </p>
                <p className="font-mono text-cyan-300 bg-navy-950 p-3 rounded-xl border border-cyan-900/30">
                  R = R0 &times; e^(B &times; (1/T - 1/T0))
                </p>
                <p>
                  where T is in kelvin, R0 is the resistance at T0 (298.15 K = 25 C), and <strong className="text-white">B</strong> is a constant for the part (about 3950 for typical 10k modules; check yours).
                </p>
                <p>
                  <strong className="text-white">Electrical signal:</strong> a resistance that changes with temperature. A divider turns it into a voltage.
                </p>
                <p>
                  <strong className="text-white">How Arduino reads it:</strong> read the ADC, work backwards to the thermistor's resistance, then use the Beta equation to get temperature:
                </p>
                <ol className="list-decimal list-inside font-mono text-cyan-300 space-y-1 ml-2">
                  <li>R_therm = 10000 &times; (1023 / adc - 1) (from the divider)</li>
                  <li>1/T = 1/T0 + (1/B) &times; ln(R / R0)</li>
                  <li>degrees C = T - 273.15</li>
                </ol>
              </div>
            </div>

            {/* Divider Schematic (reusing LDR diagram with changed labels) */}
            <div className="p-4 bg-navy-900/40 rounded-xl border border-cyan-900/20 mb-6">
              <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" role="img" aria-label="Thermistor voltage divider schematic">
                <text x="100" y="14" textAnchor="middle" fontSize="9" fill="rgba(239,68,68,0.8)" fontFamily="monospace">5V</text>
                <line x1="100" y1="16" x2="100" y2="35" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" />
                <rect x="78" y="35" width="44" height="20" rx="3" fill="#0a1628" stroke="rgba(234,179,8,0.6)" strokeWidth="1" />
                <text x="100" y="49" textAnchor="middle" fontSize="8" fill="rgba(234,179,8,0.9)" fontFamily="monospace">NTC 10k</text>
                <line x1="100" y1="55" x2="100" y2="75" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                <circle cx="100" cy="75" r="3" fill="rgba(6,182,212,0.8)" />
                <line x1="100" y1="75" x2="160" y2="75" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                <text x="170" y="79" textAnchor="start" fontSize="9" fill="rgba(6,182,212,0.9)" fontFamily="monospace">A1</text>
                <line x1="100" y1="75" x2="100" y2="100" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
                <rect x="82" y="100" width="36" height="20" rx="3" fill="#0a1628" stroke="rgba(168,85,247,0.5)" strokeWidth="1" />
                <text x="100" y="114" textAnchor="middle" fontSize="8" fill="rgba(168,85,247,0.8)" fontFamily="monospace">10kΩ</text>
                <line x1="100" y1="120" x2="100" y2="145" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                <line x1="85" y1="145" x2="115" y2="145" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                <line x1="90" y1="150" x2="110" y2="150" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
                <line x1="95" y1="155" x2="105" y2="155" stroke="rgba(148,163,184,0.3)" strokeWidth="0.8" />
                <text x="100" y="165" textAnchor="middle" fontSize="9" fill="rgba(148,163,184,0.8)" fontFamily="monospace">GND</text>
              </svg>
            </div>

            {/* Wiring */}
            <div className="mb-6">
              <WiringDiagram
                title="NTC Thermistor Wiring"
                connections={[
                  { pin: 'Arduino 5V', connection: 'Thermistor leg 1', color: 'red' },
                  { pin: 'Thermistor leg 2', connection: 'Breadboard node (A1 side)', color: 'yellow' },
                  { pin: 'Breadboard node', connection: 'Arduino A1', color: 'cyan' },
                  { pin: 'Breadboard node', connection: '10kΩ resistor leg 1', color: 'yellow' },
                  { pin: '10kΩ resistor leg 2', connection: 'Arduino GND', color: 'black' },
                ]}
              />
            </div>

            {/* Code */}
            <CodeBlock
              title="NTC Thermistor Temperature Reading"
              code={thermistorCode}
              language="cpp"
              description="Read analog voltage from thermistor divider on A1 and compute temperature in Celsius via the Steinhart-Hart / Beta equation."
            />

            <div className="space-y-3 mt-6">
              <div className="p-4 rounded-xl bg-navy-950 border border-cyan-900/30">
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Try it:</strong> pinch the thermistor between two fingers and watch the value climb by a few degrees.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-navy-950 border border-amber-500/20">
                <p className="text-sm text-slate-300">
                  <strong className="text-amber-400">Watch out:</strong> accuracy is about 1 to 2 C unless calibrated. Compare with a known thermometer. Wait for the reading to settle, because it takes seconds to match the surroundings.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 5. NEW Potentiometer from 6.1 */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Potentiometer</h3>

            <div className="grid md:grid-cols-[190px_minmax(0,1fr)] gap-6 items-center mb-6">
              <ComponentPhoto file="Potentiometer.png" alt="Rotary potentiometer with a metal shaft, resistive track, and three terminals" />
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white">What it measures:</strong> the angle of a knob.
                </p>
                <p>
                  <strong className="text-white">How it works:</strong> a potentiometer is a resistive track with three terminals. The two outer ends connect to the track, and a sliding contact called the <strong className="text-white">wiper</strong> touches the track at the middle pin. Turning the knob moves the wiper, which splits the track into two resistors, R1 (to 5 V) and R2 (to GND). That makes a voltage divider whose ratio you set by hand.
                </p>
                <p>
                  <strong className="text-white">Electrical signal:</strong> a voltage on the wiper, <code className="text-cyan-300">Vwiper = 5 V &times; R2 / (R1 + R2)</code>, changing smoothly and linearly from 0 V to 5 V as you turn.
                </p>
                <p>
                  <strong className="text-white">How Arduino reads it:</strong> the wiper goes to an analog pin, and the ADC returns 0 to 1023.
                </p>
              </div>
            </div>

            {/* Wiring */}
            <div className="mb-6">
              <WiringDiagram
                title="Potentiometer Wiring"
                connections={[
                  { pin: 'Outer pin 1', connection: 'Arduino 5V', color: 'red' },
                  { pin: 'Middle pin (wiper)', connection: 'Arduino A2', color: 'cyan' },
                  { pin: 'Outer pin 2', connection: 'Arduino GND', color: 'black' },
                ]}
              />
            </div>

            {/* Code */}
            <CodeBlock
              title="Potentiometer Analog Read"
              code={potCode}
              language="cpp"
              description="Read analog input from potentiometer wiper on A2 and map to voltage and percentage."
            />

            <div className="space-y-3 mt-6">
              <div className="p-4 rounded-xl bg-navy-950 border border-cyan-900/30">
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Try it:</strong> open Tools &gt; Serial Plotter and turn the knob to see a live graph.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-navy-950 border border-amber-500/20">
                <p className="text-sm text-slate-300">
                  <strong className="text-amber-400">Watch out:</strong> swapping the two outer pins just reverses the direction. Use a 10 kohm pot. Pots are used in volume knobs, joysticks and any manual setting.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 6. NEW 3-row comparison table */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden mb-8">
            <div className="px-6 py-4 bg-navy-700/50 border-b border-cyan-900/30">
              <h3 className="font-bold text-white text-base">Analog Sensors Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-900/50 border-b border-cyan-900/30">
                    <th className="px-5 py-3.5 text-left font-bold text-cyan-400 uppercase tracking-wider">Sensor</th>
                    <th className="px-5 py-3.5 text-left font-bold text-cyan-400 uppercase tracking-wider">What changes</th>
                    <th className="px-5 py-3.5 text-left font-bold text-cyan-400 uppercase tracking-wider">Needs divider?</th>
                    <th className="px-5 py-3.5 text-left font-bold text-cyan-400 uppercase tracking-wider">Pin</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorComparisonRows.map((row, i) => (
                    <tr key={row.sensor} className={`border-b border-cyan-900/10 ${i % 2 === 0 ? 'bg-navy-900/20' : ''}`}>
                      <td className="px-5 py-3 font-semibold text-white">{row.sensor}</td>
                      <td className="px-5 py-3 text-slate-300">{row.changes}</td>
                      <td className="px-5 py-3 text-slate-300">{row.divider}</td>
                      <td className="px-5 py-3 font-mono text-cyan-300">{row.pin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
