import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import WiringDiagram from '../components/WiringDiagram';
import { codeExamples } from '../data/codeExamples';
import ComponentPhoto from '../components/ComponentPhoto';

const outputs = [
  {
    name: 'Buzzer',
    image: 'Buzzer.png',
    imageAlt: 'Small black cylindrical electronic buzzer with sound opening and two leads',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    codeId: 'buzzer',
    wiring: [
      { pin: 'Buzzer (+)', connection: 'Arduino D8', color: 'purple' },
      { pin: 'Buzzer (−)', connection: 'Arduino GND', color: 'black' },
    ] as { pin: string; connection: string; color: string }[],
    notes: [
      'Active buzzer: buzzes when D8 goes HIGH — no tone() needed',
      'Passive buzzer: use tone(pin, frequency) for melody control',
      'Use noTone(pin) to stop a passive buzzer',
    ],
  },
  {
    name: 'Servo Motor',
    image: 'Servo motor (SG90).png',
    imageAlt: 'SG90 micro servo motor with blue case, three-wire lead, and white servo horns',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    codeId: 'servo',
    wiring: [
      { pin: 'Servo Red wire', connection: 'Arduino 5V', color: 'red' },
      { pin: 'Servo Brown/Black wire', connection: 'Arduino GND', color: 'black' },
      { pin: 'Servo Orange/Yellow wire', connection: 'Arduino D9 (PWM)', color: 'orange' },
    ] as { pin: string; connection: string; color: string }[],
    notes: [
      'Use the Servo library: #include <Servo.h>',
      'servo.attach(9) — bind servo object to PWM pin',
      'servo.write(angle) — set angle 0°–180°',
      'For heavy servos, power from external supply (not 5V pin)',
    ],
  },
  {
    name: '16×2 LCD (I²C)',
    image: '16×2 LCD display.png',
    imageAlt: '16 by 2 character LCD module with green display and I²C backpack attached',
    imageCaption: 'This photograph shows an I²C backpack attached. A standard parallel LCD exposes more pins; this lesson uses SDA and SCL.',
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    codeId: 'lcd',
    wiring: [
      { pin: 'LCD VCC', connection: 'Arduino 5V', color: 'red' },
      { pin: 'LCD GND', connection: 'Arduino GND', color: 'black' },
      { pin: 'LCD SDA', connection: 'Arduino A4', color: 'blue' },
      { pin: 'LCD SCL', connection: 'Arduino A5', color: 'yellow' },
    ] as { pin: string; connection: string; color: string }[],
    notes: [
      'I²C version only needs 4 wires: VCC, GND, SDA (A4), SCL (A5)',
      'Install LiquidCrystal_I2C library from Library Manager',
      'Default I²C address is typically 0x27 or 0x3F — check your module',
      'lcd.setCursor(col, row) — position starts at column 0, row 0',
    ],
  },
];

export default function OutputDevicesSection() {
  return (
    <section id="outputs" className="relative bg-navy-950/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 10"
            title="Output Devices"
            subtitle="Make the Arduino interact with the physical world — sound with a buzzer, motion with a servo, and text with an LCD display."
          />
        </AnimatedSection>

        <div className="space-y-16">
          {outputs.map((output, i) => {
            const codeEx = codeExamples.find(c => c.id === output.codeId);

            return (
              <div key={output.name}>
                <AnimatedSection>
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h3 className={`text-2xl font-black text-white`}>{output.name}</h3>
                      <div className={`text-xs font-semibold uppercase tracking-wider ${output.color}`}>
                        Output Device — Section 10.{i + 1}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                  <AnimatedSection delay={0.05}>
                    <ComponentPhoto
                      file={output.image}
                      alt={output.imageAlt}
                      size="wide"
                      caption={output.imageCaption}
                    />
                  </AnimatedSection>

                  {/* Wiring */}
                  <AnimatedSection delay={0.1}>
                    <WiringDiagram
                      title={`${output.name} Wiring`}
                      connections={output.wiring}
                    />
                  </AnimatedSection>

                  {/* Notes */}
                  <AnimatedSection delay={0.15}>
                    <div className={`rounded-xl border ${output.border} ${output.bg} p-5 h-full`}>
                      <h4 className={`text-sm font-bold ${output.color} mb-3 uppercase tracking-wider`}>Key Notes</h4>
                      <ul className="space-y-2">
                        {output.notes.map((note, ni) => (
                          <li key={ni} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                              output.color.includes('purple') ? 'bg-purple-400' :
                              output.color.includes('blue') ? 'bg-blue-400' : 'bg-green-400'
                            }`} />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Code */}
                {codeEx && (
                  <AnimatedSection delay={0.2}>
                    <CodeBlock
                      title={codeEx.title}
                      code={codeEx.code}
                      language="cpp"
                      description={codeEx.description}
                    />
                  </AnimatedSection>
                )}

                {i < outputs.length - 1 && (
                  <div className="border-b border-cyan-900/20 mt-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
