import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Code2, BookOpen, Package, ArrowRight } from 'lucide-react';

const concepts = [
  {
    icon: Cpu,
    title: 'Hardware',
    desc: 'The physical board, microcontroller, sensors, LEDs, motors, and components you wire together.',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
  },
  {
    icon: Code2,
    title: 'Software (IDE)',
    desc: 'The Arduino IDE and libraries you use to write and upload programs to the board.',
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
  },
  {
    icon: BookOpen,
    title: 'Sketch',
    desc: 'The program you write for your Arduino. Every Arduino program is called a "sketch" and saved as a .ino file.',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
  },
  {
    icon: Package,
    title: 'Library',
    desc: 'Reusable code that simplifies working with specific devices like LCDs, servos, and sensors.',
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
  },
];

const examples = [
  {
    in: 'LDR detects darkness',
    proc: 'Arduino compares reading to threshold',
    out: 'LED turns ON automatically',
  },
  {
    in: 'Ultrasonic measures 15 cm distance',
    proc: 'Arduino checks: distance < 20 cm?',
    out: 'Buzzer sounds a warning',
  },
];

const useCases = [
  'Robotics & automation',
  'Home automation',
  'Environmental monitoring',
  'Educational electronics',
  'Smart agriculture',
  'Data acquisition',
  'IoT prototypes',
  'Instrumentation demonstrations',
];

export default function IntroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="intro" className="relative bg-navy-950/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 01"
            title="What is Arduino?"
            subtitle="Arduino is an open-source electronics platform that combines a simple hardware board with an easy-to-use development environment, making it accessible for beginners and powerful enough for professionals."
          />
        </AnimatedSection>

        {/* Core concept cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {concepts.map((c, i) => {
            const Icon = c.icon;
            return (
              <AnimatedSection key={c.title} delay={i * 0.1}>
                <motion.div
                  whileHover={shouldReduce ? {} : { y: -4 }}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-5 h-full`}
                >
                  <Icon size={24} className={`${c.color} mb-3`} />
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Input-Process-Output model */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-8 mb-12">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              The Input → Process → Output Model
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
              {[
                { step: 'Input', emoji: '📡', sub: 'Sensor collects data', color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/5' },
                { step: 'Process', emoji: '🧠', sub: 'Code makes decisions', color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/5' },
                { step: 'Output', emoji: '💡', sub: 'Device responds', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/5' },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center">
                  <motion.div
                    whileHover={shouldReduce ? {} : { scale: 1.05 }}
                    className={`flex flex-col items-center p-6 rounded-2xl border ${item.border} ${item.bg} min-w-[130px] text-center`}
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className={`font-black text-lg ${item.color}`}>{item.step}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.sub}</div>
                  </motion.div>
                  {i < 2 && (
                    <div className="flex items-center px-2">
                      <ArrowRight size={20} className="text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Examples */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              {examples.map((ex, i) => (
                <div key={i} className="p-4 rounded-xl bg-navy-900/60 border border-cyan-900/20">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Example {i + 1}</p>
                  <div className="space-y-2">
                    {[
                      { label: 'IN', text: ex.in, color: 'bg-green-500/15 text-green-400' },
                      { label: 'CPU', text: ex.proc, color: 'bg-cyan-500/15 text-cyan-400' },
                      { label: 'OUT', text: ex.out, color: 'bg-purple-500/15 text-purple-400' },
                    ].map(row => (
                      <div key={row.label} className="flex items-start gap-2">
                        <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded ${row.color}`}>
                          {row.label}
                        </span>
                        <span className="text-sm text-slate-300">{row.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Use cases */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6">
            <h3 className="text-base font-bold text-white mb-4">Where is Arduino used?</h3>
            <div className="flex flex-wrap gap-2">
              {useCases.map(uc => (
                <span key={uc} className="tag bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {uc}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Note: "Arduino" is a platform, not a single chip. Different Arduino boards use different microcontrollers. We are using the classic <strong className="text-slate-400">Arduino Uno R3</strong> with the <strong className="text-slate-400">ATmega328P</strong>.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
