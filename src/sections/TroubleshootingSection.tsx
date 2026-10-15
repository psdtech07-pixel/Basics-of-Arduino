import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const issues = [
  {
    symptom: 'Sketch won\'t upload',
    causes: [
      'Wrong board selected — check Tools → Board → "Arduino Uno"',
      'Wrong COM port — check Tools → Port (Windows) or /dev/ttyUSB (Linux/Mac)',
      'D0/D1 have components connected — disconnect them during upload',
      'Charge-only USB cable — use a data cable',
      'Missing driver — install CH340 or ATmega16U2 driver',
    ],
    fixes: [
      'Unplug and replug the USB cable',
      'Press the Reset button just before clicking Upload',
      'Try a different USB cable or port',
    ],
    severity: 'high',
  },
  {
    symptom: 'LED not lighting up',
    causes: [
      'LED is backwards (anode and cathode swapped)',
      'Missing or wrong resistor value',
      'Wrong pin number in code vs. breadboard wiring',
      'LED is burnt out from previous short circuit',
    ],
    fixes: [
      'Test LED polarity: longer leg = anode (+), connect to power side',
      'Use 220Ω–470Ω resistor in series',
      'Check code pin number matches physical wiring',
    ],
    severity: 'medium',
  },
  {
    symptom: 'Serial Monitor shows garbage',
    causes: [
      'Baud rate mismatch between Serial.begin() and Serial Monitor setting',
      'Serial Monitor not set to the correct line ending',
    ],
    fixes: [
      'Match Serial.begin(9600) with "9600 baud" dropdown in Serial Monitor',
      'Set Serial Monitor line ending to "Newline" or "Both NL & CR"',
    ],
    severity: 'low',
  },
  {
    symptom: 'Ultrasonic gives wrong distances',
    causes: [
      'TRIG and ECHO wires swapped',
      'Object too close (< 2 cm) or too far (> 4 m)',
      'Angled or soft/porous surface absorbs ultrasonic pulses',
    ],
    fixes: [
      'Check TRIG → trigger pin, ECHO → echo pin in both code and wiring',
      'Print raw pulseIn() values to Serial Monitor first',
      'Test with flat, hard surface at 10–50 cm distance',
    ],
    severity: 'medium',
  },
  {
    symptom: 'Servo buzzes / jerks / doesn\'t move',
    causes: [
      'Drawing too much current from the 5V pin',
      'Power supply insufficient — USB port may not supply enough',
      'Signal wire connected to non-PWM pin',
    ],
    fixes: [
      'Power servo from external 5V supply with shared GND',
      'Ensure signal wire is on a PWM pin (D3, D5, D6, D9, D10, D11)',
      'Add 100µF capacitor across servo power lines to smooth current',
    ],
    severity: 'medium',
  },
  {
    symptom: 'Board gets very hot / resets',
    causes: [
      'Short circuit on breadboard (5V connected directly to GND)',
      'Too many components pulling excessive current',
      'Reversed polarity on electrolytic capacitor or motor',
    ],
    fixes: [
      'IMMEDIATELY disconnect USB power',
      'Inspect all wiring for accidental bridges',
      'Check total current draw is within safe limits',
    ],
    severity: 'high',
  },
  {
    symptom: 'analogRead always returns 0 or 1023',
    causes: [
      'Floating pin (nothing connected) — reads random values',
      'Sensor not actually connected or voltage divider incorrect',
      'Reading digital pin instead of analog (A0–A5)',
    ],
    fixes: [
      'Check voltage divider wiring is complete (both resistor legs connected)',
      'Verify the pin in analogRead() matches the physical wire',
      'Use a multimeter to check actual voltage at the pin',
    ],
    severity: 'medium',
  },
  {
    symptom: 'LCD shows nothing or all black squares',
    causes: [
      'Wrong I²C address (0x27 vs 0x3F)',
      'Contrast potentiometer on I²C backpack not adjusted',
      'Library not installed or wrong library',
    ],
    fixes: [
      'Run an I²C scanner sketch to find the correct address',
      'Adjust the blue contrast potentiometer on the I²C backpack',
      'Install LiquidCrystal_I2C library from Library Manager',
    ],
    severity: 'low',
  },
];

const severityConfig = {
  high: { color: 'border-red-500/30 bg-red-500/5', label: 'HIGH', labelColor: 'text-red-400' },
  medium: { color: 'border-amber-500/30 bg-amber-500/5', label: 'MEDIUM', labelColor: 'text-amber-400' },
  low: { color: 'border-blue-500/30 bg-blue-500/5', label: 'LOW', labelColor: 'text-blue-400' },
};

const generalTips = [
  'Always print sensor values to Serial Monitor before making decisions in code.',
  'Build and test incrementally — add one component at a time.',
  'Use a multimeter to verify actual voltages if a sensor gives unexpected readings.',
  'If the board seems frozen, press Reset before re-uploading.',
  'Keep a dedicated GND row on the breadboard — connect all component GNDs to it.',
  'Comment your code with pin numbers and component names.',
];

export default function TroubleshootingSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="troubleshooting" className="relative bg-navy-950/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 11"
            title="Troubleshooting Guide"
            subtitle="Something not working? Here are the most common issues and exactly how to fix them. Troubleshooting is a core engineering skill — systematic diagnosis beats guessing."
          />
        </AnimatedSection>

        {/* Diagnostic mindset */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-10">
            <h3 className="text-base font-bold text-white mb-4">🔍 The Debugging Approach</h3>
            <ol className="space-y-2">
              {[
                'Isolate the problem — does the issue come from hardware or software?',
                'Test each component individually before combining them.',
                'Read the error message carefully — it usually tells you exactly what went wrong.',
                'Use Serial.println() to print values and trace program flow.',
                'Check wiring against your schematic, pin-by-pin.',
                'Search the exact error message — it has almost certainly been solved before.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold flex items-center justify-center border border-cyan-500/20">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>

        {/* Issue cards */}
        <div className="space-y-4 mb-10">
          {issues.map((issue, i) => {
            const config = severityConfig[issue.severity as keyof typeof severityConfig];
            return (
              <AnimatedSection key={i} delay={i * 0.04}>
                <motion.div
                  whileHover={shouldReduce ? {} : { y: -2 }}
                  className={`rounded-2xl border ${config.color} overflow-hidden`}
                >
                  <div className="px-5 py-4 flex items-center justify-between border-b border-cyan-900/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={18} className={config.labelColor} />
                      <h3 className="font-bold text-white">{issue.symptom}</h3>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${config.labelColor}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="p-5 grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Possible Causes</p>
                      <ul className="space-y-1.5">
                        {issue.causes.map((cause, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/50" />
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Fixes to Try</p>
                      <ul className="space-y-1.5">
                        {issue.fixes.map((fix, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                            <CheckCircle size={13} className="flex-shrink-0 mt-0.5 text-green-400" />
                            {fix}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* General tips */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6">
            <h3 className="text-base font-bold text-white mb-4">✅ General Best Practices</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {generalTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-navy-900/40 border border-cyan-900/20">
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5 text-cyan-400" />
                  <span className="text-sm text-slate-400">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
