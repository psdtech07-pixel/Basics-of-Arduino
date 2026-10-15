import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import PWMExplorer from '../components/PWMExplorer';

const signalTypes = [
  {
    title: 'Digital Signals',
    subtitle: 'HIGH or LOW — nothing in between',
    icon: '⬛',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    points: [
      'Only two states: HIGH (5V) or LOW (0V)',
      'Read with digitalRead() — returns 1 or 0',
      'Write with digitalWrite(pin, HIGH/LOW)',
      'Used for: buttons, LEDs, relays, buzzers',
    ],
    example: {
      code: 'digitalRead(7)   // → HIGH or LOW\ndigitalWrite(13, HIGH); // LED on',
      label: 'Digital I/O',
    },
  },
  {
    title: 'Analog Signals',
    subtitle: 'Continuous range — 0 to 5V maps to 0–1023',
    icon: '〰️',
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    points: [
      '10-bit ADC converts voltage to 0–1023',
      'Read with analogRead(A0) — returns 0 to 1023',
      'Available on pins A0–A5 only',
      'Used for: potentiometers, LDRs, thermistors',
    ],
    example: {
      code: 'int val = analogRead(A0); // 0–1023\n// 5V → 1023, 2.5V → ~511, 0V → 0',
      label: 'Analog Read',
    },
  },
  {
    title: 'PWM Signals',
    subtitle: 'Simulated analog output — duty cycle control',
    icon: '⬜',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    points: [
      'Rapidly switches between HIGH and LOW',
      'Duty cycle (0–100%) sets apparent intensity',
      'analogWrite(pin, 0–255) sets the duty cycle',
      'Available only on pins D3, D5, D6, D9, D10, D11',
    ],
    example: {
      code: 'analogWrite(9, 128);  // ~50% duty cycle\nanalogWrite(9, 255);  // full on\nanalogWrite(9, 0);    // full off',
      label: 'PWM Write',
    },
  },
];

const adcDetails = [
  { label: 'ADC Resolution', value: '10-bit' },
  { label: 'Discrete steps', value: '1024 (2¹⁰)' },
  { label: 'Input range', value: '0 to 5V' },
  { label: 'Value at 5V', value: '1023' },
  { label: 'Value at 2.5V', value: '~511' },
  { label: 'Value at 0V', value: '0' },
  { label: 'Voltage per step', value: '5V / 1024 ≈ 4.88 mV' },
  { label: 'analogWrite range', value: '0–255 (8-bit)' },
];

export default function SignalsSection() {
  return (
    <section id="signals" className="relative">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 05"
            title="Digital, Analog & PWM Signals"
            subtitle="Understanding how the Arduino communicates with the world — reading sensors and controlling outputs."
          />
        </AnimatedSection>

        {/* Signal type cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {signalTypes.map((sig, i) => (
            <AnimatedSection key={sig.title} delay={i * 0.1}>
              <div className={`rounded-2xl border ${sig.border} ${sig.bg} p-6 h-full flex flex-col`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{sig.icon}</span>
                  <div>
                    <h3 className={`font-bold text-white`}>{sig.title}</h3>
                    <p className={`text-xs ${sig.color}`}>{sig.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {sig.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className={`flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${
                        sig.color.includes('blue') ? 'bg-blue-400' :
                        sig.color.includes('green') ? 'bg-green-400' : 'bg-purple-400'
                      }`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl bg-navy-950 border border-cyan-900/20 p-3">
                  <div className="text-xs text-slate-500 font-semibold mb-1.5">{sig.example.label}</div>
                  <code className="text-xs text-cyan-300 font-mono leading-relaxed whitespace-pre">{sig.example.code}</code>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ADC Quick Reference */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-12">
            <h3 className="text-base font-bold text-white mb-4">ADC & PWM Quick Reference</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {adcDetails.map(d => (
                <div key={d.label} className="p-3 rounded-xl bg-navy-900/60 border border-cyan-900/20">
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">{d.label}</div>
                  <div className="text-sm font-mono font-bold text-cyan-400">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* PWM Interactive Explorer */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-2">Interactive PWM Explorer</h3>
          <p className="text-slate-400 text-sm mb-6">
            Drag the slider to change the duty cycle and see the waveform update in real time.
            This is exactly what analogWrite() does on the Uno R3.
          </p>
          <PWMExplorer />
        </AnimatedSection>
      </div>
    </section>
  );
}
