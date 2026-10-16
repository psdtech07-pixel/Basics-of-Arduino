import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import { codeExamples } from '../data/codeExamples';
import BlinkCircuit from '../components/BlinkCircuit';
import ComponentPhoto from '../components/ComponentPhoto';

const sketchStructure = [
  {
    name: 'setup()',
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    desc: 'Runs once at startup (or after reset). Use it to configure pin modes, initialize Serial, and set initial states.',
    bullets: [
      'pinMode(pin, INPUT/OUTPUT) — sets pin direction',
      'Serial.begin(9600) — opens serial port at 9600 baud',
      'Called once automatically by the bootloader',
    ],
  },
  {
    name: 'loop()',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    desc: 'Runs continuously after setup() completes. This is where your program logic lives.',
    bullets: [
      'Repeats thousands of times per second (unless slowed)',
      'delay(ms) pauses execution for the given milliseconds',
      'Never exits — think of it as a while(true) loop',
    ],
  },
];

export default function FirstProgramSection() {
  const blinkExample = codeExamples.find(c => c.id === 'blink')!;
  const setupExample = codeExamples.find(c => c.id === 'setup-loop')!;
  const digitalIo = codeExamples.find(c => c.id === 'digital-io')!;
  const pwmFade = codeExamples.find(c => c.id === 'pwm-fade')!;

  return (
    <section id="first-program" className="relative bg-navy-950/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 07"
            title="Your First Program: Blink"
            subtitle='The "Hello World" of electronics — making an LED blink. Every Arduino developer starts here.'
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-[minmax(0,1fr)_260px] gap-6 items-center rounded-2xl border border-cyan-900/30 bg-navy-800 p-5 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Connect the Uno to your computer</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The classic Uno R3 uses a USB-A to USB-B cable: connect the square Type-B plug to the board and the Type-A plug to your computer. Use a data-capable cable to upload sketches and open Serial Monitor; a charge-only cable will not transfer data.
              </p>
            </div>
            <ComponentPhoto
              file="USB-A-to-B-cable.jpg"
              alt="USB-A to USB-B cable used to connect a classic Arduino Uno R3 to a computer"
              size="photo"
              caption={<>Photo by <a href="https://commons.wikimedia.org/wiki/File:A-B_Usb_Cable.jpg" target="_blank" rel="noreferrer" className="underline decoration-cyan-700 underline-offset-2">oomlout</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer" className="underline decoration-cyan-700 underline-offset-2">CC BY-SA 2.0</a>.</>}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-5 md:p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-2">Writing and Uploading Code</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              The Arduino IDE is where you write a sketch, check it, and send it to your board. The annotated view below highlights the main controls; choose the connected board and port before uploading.
            </p>
            <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(250px,.75fr)] gap-6 items-center">
              <ComponentPhoto
                file="ArduinoIDE.png"
                alt="Arduino IDE 2 interface showing the sketch editor, Verify and Upload buttons, board and port selection, and Serial Monitor"
                size="interface"
                caption="Arduino IDE 2: sketch editor and the main upload controls"
              />
              <ul className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 text-sm">
                <li className="rounded-lg border border-cyan-500/15 bg-navy-950/70 p-3"><strong className="text-cyan-300">Code editor</strong><span className="block mt-1 text-slate-400">Write and edit the sketch here.</span></li>
                <li className="rounded-lg border border-cyan-500/15 bg-navy-950/70 p-3"><strong className="text-cyan-300">Verify</strong><span className="block mt-1 text-slate-400">Compile the sketch and check for errors.</span></li>
                <li className="rounded-lg border border-cyan-500/15 bg-navy-950/70 p-3"><strong className="text-cyan-300">Upload</strong><span className="block mt-1 text-slate-400">Compile and transfer the sketch to the board.</span></li>
                <li className="rounded-lg border border-cyan-500/15 bg-navy-950/70 p-3"><strong className="text-cyan-300">Board and port</strong><span className="block mt-1 text-slate-400">Select the Arduino model and its connected USB port.</span></li>
                <li className="rounded-lg border border-cyan-500/15 bg-navy-950/70 p-3"><strong className="text-cyan-300">Serial Monitor</strong><span className="block mt-1 text-slate-400">View text sent by the sketch with Serial.</span></li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Sketch structure */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-6">Every Sketch Has Two Parts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sketchStructure.map(part => (
                <div key={part.name} className={`rounded-xl border ${part.border} ${part.bg} p-5`}>
                  <h4 className={`font-black text-xl font-mono mb-2 ${part.color}`}>{part.name}</h4>
                  <p className="text-sm text-slate-400 mb-3">{part.desc}</p>
                  <ul className="space-y-1.5">
                    {part.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                        <span className={`flex-shrink-0 mt-1 w-1 h-1 rounded-full ${part.color.includes('green') ? 'bg-green-400' : 'bg-purple-400'}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Setup/loop structure code */}
        <AnimatedSection>
          <CodeBlock
            title={setupExample.title}
            code={setupExample.code}
            language="cpp"
            description={setupExample.description}
          />
        </AnimatedSection>

        {/* Blink */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 pulse-glow" />
              <h3 className="text-lg font-bold text-white">The Classic Blink Sketch</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Blink uses the built-in LED on pin 13 (labeled "L" on the board). No external components needed!
            </p>

            {/* Wiring note */}
            <div className="rounded-xl bg-navy-950 border border-cyan-900/20 p-4 mb-6">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Wiring</p>
              <p className="text-sm text-slate-400">
                No wiring needed for the built-in LED (pin 13 is connected on-board).
                For an <strong className="text-slate-300">external LED</strong>: connect the LED anode → 220Ω resistor → Arduino pin 13,
                and LED cathode → GND.
              </p>
            </div>
          </div>
          <CodeBlock
            title={blinkExample.title}
            code={blinkExample.code}
            language="cpp"
            description={blinkExample.description}
          />
          <BlinkCircuit />
        </AnimatedSection>

        {/* Digital I/O */}
        <AnimatedSection>
          <div className="grid md:grid-cols-[260px_minmax(0,1fr)] gap-6 items-center rounded-2xl border border-cyan-900/30 bg-navy-800 p-5 mb-6">
            <ComponentPhoto
              file="Tactile-switch-disassembled.jpg"
              alt="Tactile push-button switch shown assembled and with its internal contact pieces"
              size="photo"
              caption={<>Photo by <a href="https://commons.wikimedia.org/wiki/File:Tactile_switch_disassembled.jpg" target="_blank" rel="noreferrer" className="underline decoration-cyan-700 underline-offset-2">Pabloab</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline decoration-cyan-700 underline-offset-2">CC BY-SA 4.0</a>.</>}
            />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Physical digital input: a tactile button</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                In the example below, the button connects Arduino pin D2 to ground when pressed. The internal pull-up keeps the released input HIGH, so a press reads LOW. The photograph shows a tactile switch and its contact mechanism.
              </p>
            </div>
          </div>
          <CodeBlock
            title={digitalIo.title}
            code={digitalIo.code}
            language="cpp"
            description={digitalIo.description}
          />
        </AnimatedSection>

        {/* PWM Fade */}
        <AnimatedSection>
          <CodeBlock
            title={pwmFade.title}
            code={pwmFade.code}
            language="cpp"
            description={pwmFade.description}
          />
        </AnimatedSection>

        {/* Key functions table */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-cyan-900/30">
              <h3 className="font-bold text-white">Core Arduino Functions Reference</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-700/50">
                    <th className="px-4 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Function</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Returns</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { fn: 'pinMode(pin, mode)', ret: 'void', desc: 'Set pin to INPUT, OUTPUT, or INPUT_PULLUP' },
                    { fn: 'digitalWrite(pin, val)', ret: 'void', desc: 'Set digital pin HIGH (5V) or LOW (0V)' },
                    { fn: 'digitalRead(pin)', ret: 'int (0 or 1)', desc: 'Read digital state of a pin' },
                    { fn: 'analogRead(pin)', ret: 'int (0–1023)', desc: 'Read analog voltage on A0–A5' },
                    { fn: 'analogWrite(pin, val)', ret: 'void', desc: 'Set PWM duty cycle (0–255) on PWM pins' },
                    { fn: 'delay(ms)', ret: 'void', desc: 'Pause execution for given milliseconds' },
                    { fn: 'millis()', ret: 'unsigned long', desc: 'Milliseconds elapsed since board powered on' },
                    { fn: 'Serial.begin(baud)', ret: 'void', desc: 'Initialize serial communication (e.g. 9600)' },
                    { fn: 'Serial.println(val)', ret: 'void', desc: 'Print value to Serial Monitor with newline' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-navy-900/30' : ''}>
                      <td className="px-4 py-2.5 font-mono text-cyan-300 text-xs border-b border-cyan-900/10">{row.fn}</td>
                      <td className="px-4 py-2.5 text-green-400 font-mono text-xs border-b border-cyan-900/10 whitespace-nowrap">{row.ret}</td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs border-b border-cyan-900/10">{row.desc}</td>
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
