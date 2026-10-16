import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import SafetyWarning from '../components/SafetyWarning';
import PinoutExplorer from '../components/PinoutExplorer';
import ComponentPhoto from '../components/ComponentPhoto';

const specs = [
  { label: 'Microcontroller', value: 'ATmega328P' },
  { label: 'Clock Speed', value: '16 MHz' },
  { label: 'Flash Memory', value: '32 KB (0.5 KB bootloader)' },
  { label: 'SRAM', value: '2 KB' },
  { label: 'EEPROM', value: '1 KB' },
  { label: 'Operating Voltage', value: '5V' },
  { label: 'Input Voltage', value: '7–12V (DC Jack)' },
  { label: 'Digital I/O Pins', value: '14 (D0–D13)' },
  { label: 'PWM Pins', value: '6 (D3, D5, D6, D9, D10, D11)' },
  { label: 'Analog Inputs', value: '6 (A0–A5, 10-bit ADC)' },
  { label: 'ADC Range', value: '0–1023 (maps 0–5V)' },
  { label: 'Max pin current', value: '40 mA per I/O pin' },
];

const parts = [
  {
    name: 'ATmega328P',
    desc: 'The microcontroller chip — the "brain" that executes your sketch.',
    color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  },
  {
    name: 'USB Port (Type-B)',
    desc: 'Upload sketches and communicate with Serial Monitor. Can also power the board.',
    color: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  },
  {
    name: 'DC Power Jack',
    desc: 'Accepts 7–12V center-positive barrel connector for standalone operation.',
    color: 'bg-red-500/10 border-red-500/20 text-red-400',
  },
  {
    name: 'Digital Pins (D0–D13)',
    desc: '14 pins for digital input/output. D3, D5, D6, D9, D10, D11 also support PWM.',
    color: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  },
  {
    name: 'Analog Pins (A0–A5)',
    desc: '6 pins that read voltages from 0–5V and convert them to numbers 0–1023 via ADC.',
    color: 'bg-green-500/10 border-green-500/20 text-green-400',
  },
  {
    name: 'Power Pins',
    desc: '5V, 3.3V, GND (×3), VIN. Provide regulated power to external components.',
    color: 'bg-red-500/10 border-red-500/20 text-red-400',
  },
  {
    name: 'Reset Button',
    desc: 'Resets the microcontroller, restarting program execution from setup().',
    color: 'bg-slate-500/10 border-slate-500/20 text-slate-400',
  },
  {
    name: 'Crystal Oscillator',
    desc: '16 MHz quartz crystal that provides the clock signal for the ATmega328P.',
    color: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  },
];

export default function BoardSection() {
  return (
    <section id="board" className="relative">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 03"
            title="The Arduino Uno R3 Board"
            subtitle="Before writing code, understand the hardware you're working with. The Arduino Uno R3 is the classic beginner board — robust, well-documented, and forgiving."
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex justify-center mb-12">
            <ComponentPhoto
              file="Arduino-Uno.png"
              alt="Arduino Uno R3 board with USB Type-B connector, ATmega328P, digital and analog pins"
              size="board"
            />
          </div>
        </AnimatedSection>

        {/* Specs table */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden mb-12">
            <div className="px-6 py-4 bg-navy-700/50 border-b border-cyan-900/30">
              <h3 className="font-bold text-white">ATmega328P Specifications</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`px-5 py-3 border-b border-cyan-900/10 ${
                    i % 3 !== 2 ? 'sm:border-r border-cyan-900/10' : ''
                  }`}
                >
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">{spec.label}</div>
                  <div className="text-sm font-mono text-cyan-400 font-semibold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Board parts */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-6">Key Board Components</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {parts.map((part, i) => (
              <AnimatedSection key={part.name} delay={i * 0.06}>
                <div className={`rounded-xl border ${part.color} p-4 h-full bg-opacity-10`}
                  style={{ background: 'rgba(10,22,40,0.6)' }}>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${part.color.split(' ').find(c => c.startsWith('text-'))}`}>
                    {part.name}
                  </div>
                  <p className="text-sm text-slate-400">{part.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Safety warning */}
        <AnimatedSection>
          <SafetyWarning warnings={[
            'Maximum 40 mA per digital I/O pin — LEDs need a series resistor (typically 220Ω–470Ω).',
            'Board operates at 5V logic. Connecting 3.3V-only devices directly can damage them.',
            'Total current from all I/O pins should not exceed ~200 mA.',
            'Always disconnect power before changing wiring.',
            'Never short the 5V or VIN pin to GND.',
          ]} />
        </AnimatedSection>

        {/* Supplementary reference, separate from the interactive SVG below */}
        <AnimatedSection>
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(260px,.9fr)] gap-6 items-center rounded-2xl border border-cyan-900/30 bg-navy-800 p-5 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Arduino Uno Pinout Reference</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Use this labeled board image as a quick reference for the physical pin names. The interactive explorer below is a separate diagram: select a pin there to see its purpose, capabilities, and safety notes.
              </p>
            </div>
            <ComponentPhoto
              file="ArduinoPinout.webp"
              alt="Labeled Arduino Uno R3 pinout reference showing digital and analog pins, power pins, USB port, DC jack, and reset button"
              size="reference"
              caption="Arduino Uno R3 Pinout Reference"
            />
          </div>
        </AnimatedSection>

        {/* Interactive Pinout */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-2">Interactive Pinout Explorer</h3>
          <p className="text-slate-400 text-sm mb-6">Click any pin on the board to learn its purpose and how to use it safely.</p>
          <div data-no-presentation-zoom>
            <PinoutExplorer />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
