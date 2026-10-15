import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Cpu, Book, Code2, Globe, Youtube, Star } from 'lucide-react';

const covered = [
  'What Arduino is and how it works (Input → Process → Output)',
  'The Arduino Uno R3 board and ATmega328P specifications',
  'Electronics basics: Ohm\'s Law, resistors, LEDs, and voltage dividers',
  'Breadboard layout and safe prototyping',
  'Digital signals, analog ADC readings (0–1023), and PWM (0–255)',
  'Writing setup() and loop() sketches',
  'The Blink, Digital I/O, and PWM Fade programs',
  'Reading light levels with an LDR and voltage divider',
  'Measuring distance with the HC-SR04 ultrasonic sensor',
  'Controlling a buzzer, servo motor, and 16×2 I²C LCD',
  'Building a complete Distance Warning System mini-project',
  'Systematic hardware and software troubleshooting',
];

const resources = [
  {
    icon: Globe,
    title: 'Official Arduino Reference',
    desc: 'Complete language reference for all Arduino functions',
    url: 'https://www.arduino.cc/reference/en/',
    color: 'text-cyan-400',
  },
  {
    icon: Book,
    title: 'Arduino Project Hub',
    desc: 'Thousands of community projects for inspiration',
    url: 'https://create.arduino.cc/projecthub',
    color: 'text-green-400',
  },
  {
    icon: Globe,
    title: 'Tinkercad Circuits',
    desc: 'Free online Arduino + breadboard simulator — test before building',
    url: 'https://www.tinkercad.com/circuits',
    color: 'text-amber-400',
  },
  {
    icon: Youtube,
    title: 'Paul McWhorter Arduino Series',
    desc: 'Excellent free beginner video series on YouTube',
    url: 'https://www.youtube.com/@paulmcwhorter',
    color: 'text-red-400',
  },
  {
    icon: Book,
    title: 'Random Nerd Tutorials',
    desc: 'Step-by-step projects with clear explanations',
    url: 'https://randomnerdtutorials.com/',
    color: 'text-purple-400',
  },
  {
    icon: Code2,
    title: 'ATmega328P Datasheet',
    desc: 'Official Microchip datasheet — register-level reference',
    url: 'https://www.microchip.com/wwwproducts/en/ATmega328p',
    color: 'text-blue-400',
  },
];

const nextTopics = [
  { title: 'Interrupts', desc: 'React to events without polling — use attachInterrupt()' },
  { title: 'millis() Timing', desc: 'Non-blocking delays for multi-tasking programs' },
  { title: 'SPI & I²C', desc: 'Connect OLED displays, IMUs, and SD cards' },
  { title: 'UART Serial', desc: 'Communicate with other devices and Bluetooth modules' },
  { title: 'Shift Registers', desc: 'Control more outputs than you have pins' },
  { title: 'Motor Drivers', desc: 'Drive DC motors and stepper motors safely' },
  { title: 'EEPROM', desc: 'Save data that survives power cycles' },
  { title: 'ESP32 / ESP8266', desc: 'Wi-Fi enabled microcontrollers for IoT projects' },
];

export default function WrapUpSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="wrapup" className="relative overflow-hidden">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 13 · Wrap-Up"
            title="What You've Learned"
            subtitle="Congratulations on completing the Arduino Masterclass! You now have a solid foundation in embedded systems and electronics for your ENTC & I&C studies."
          />
        </AnimatedSection>

        {/* Coverage checklist */}
        <AnimatedSection>
          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 mb-12">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Star size={20} className="text-green-400" />
              Topics Covered in This Session
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {covered.map((item, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
                  whileInView={shouldReduce ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-2 text-sm text-slate-400"
                >
                  <span className="flex-shrink-0 mt-0.5 text-green-400">✓</span>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Resources */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-6">Further Reading & Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {resources.map((res, i) => {
              const Icon = res.icon;
              return (
                <AnimatedSection key={res.title} delay={i * 0.07}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-cyan-900/30 bg-navy-800 p-5 hover:border-cyan-500/30 hover:bg-navy-700/80 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={20} className={res.color} />
                      <ExternalLink size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">{res.title}</h4>
                    <p className="text-xs text-slate-500">{res.desc}</p>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Next topics */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-12">
            <h3 className="text-lg font-bold text-white mb-6">What to Learn Next</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {nextTopics.map((topic, _i) => (
                <div key={topic.title} className="p-3 rounded-xl bg-navy-900/40 border border-cyan-900/20">
                  <div className="text-sm font-bold text-cyan-400 mb-1">{topic.title}</div>
                  <div className="text-xs text-slate-500">{topic.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Final message */}
        <AnimatedSection>
          <motion.div
            whileHover={shouldReduce ? {} : { scale: 1.01 }}
            className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-teal-500/5 p-10 text-center overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-3xl font-black text-white mb-4">
                You're Ready to Build!
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
                You have the fundamentals to read sensors, control outputs, and build interactive systems.
                The best way to get better is to build — start with the mini-project extensions, then
                design your own ideas. Every professional engineer started exactly where you are today.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800/80 border border-cyan-500/20">
                  <Cpu size={16} className="text-cyan-400" />
                  <span className="text-sm font-semibold text-white">Arduino Uno R3</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800/80 border border-green-500/20">
                  <Code2 size={16} className="text-green-400" />
                  <span className="text-sm font-semibold text-white">ATmega328P @ 16 MHz</span>
                </div>
              </div>
            </div>

            {/* Background decorations */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/5 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-500/5 blur-2xl" aria-hidden="true" />
          </motion.div>
        </AnimatedSection>

        {/* Footer credit */}
        <AnimatedSection>
          <div className="text-center mt-12 py-6 border-t border-cyan-900/20">
            <p className="text-xs text-slate-600">
              Arduino Masterclass — ENTC &amp; Instrumentation &amp; Control, Year 1 | Built with React + Vite + Framer Motion
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
