import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import WiringDiagram from '../components/WiringDiagram';
import LDRSimulation from '../components/LDRSimulation';
import { codeExamples } from '../data/codeExamples';

export default function LDRSection() {
  const ldrCode = codeExamples.find(c => c.id === 'ldr-light')!;

  return (
    <section id="ldr" className="relative bg-navy-950/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 07"
            title="Analog Sensing: The LDR"
            subtitle="A Light-Dependent Resistor (LDR) changes resistance based on light — bright light = low resistance, darkness = high resistance. Pair it with a fixed resistor to create a voltage divider that the ADC can measure."
          />
        </AnimatedSection>

        {/* Concept: Voltage Divider */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">The Voltage Divider Circuit</h3>
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

        {/* Wiring diagram */}
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

        {/* Code */}
        <AnimatedSection>
          <CodeBlock
            title={ldrCode.title}
            code={ldrCode.code}
            language="cpp"
            description={ldrCode.description}
          />
        </AnimatedSection>

        {/* Simulation */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-2 mt-4">Live Simulation</h3>
          <p className="text-slate-400 text-sm mb-6">
            Adjust the simulated light level and see how the ADC value and serial output change.
          </p>
          <LDRSimulation />
        </AnimatedSection>

        {/* Calibration note */}
        <AnimatedSection>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 mt-6">
            <p className="text-sm font-bold text-amber-400 mb-2">🔧 Calibration Tip</p>
            <p className="text-sm text-slate-400">
              Open the Serial Monitor after uploading. Cover the LDR completely (dark) and note the ADC value — that's your "dark" reading.
              Shine a torch on it and note the "bright" reading. Set your threshold between these two values in your code.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
