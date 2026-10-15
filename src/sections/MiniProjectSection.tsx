import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import WiringDiagram from '../components/WiringDiagram';
import { codeExamples } from '../data/codeExamples';

const projectSteps = [
  {
    step: '1',
    title: 'Power Up',
    desc: 'Connect HC-SR04 to D9 (TRIG) and D8 (ECHO). Connect LED via 220Ω resistor to D4. Connect buzzer to D7.',
    color: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
  },
  {
    step: '2',
    title: 'Measure Distance',
    desc: 'Send a TRIG pulse, measure ECHO duration with pulseIn(), calculate distance in centimeters.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/5',
  },
  {
    step: '3',
    title: 'Check Threshold',
    desc: 'Compare measured distance to your threshold (e.g., 20 cm). Use an if/else statement.',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
  },
  {
    step: '4',
    title: 'Trigger Outputs',
    desc: 'If distance < threshold: LED on + buzzer on. Otherwise: LED off + buzzer off.',
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
  },
  {
    step: '5',
    title: 'Log to Serial',
    desc: 'Print distance and status to Serial Monitor for debugging and calibration.',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
  },
];

export default function MiniProjectSection() {
  const projectCode = codeExamples.find(c => c.id === 'distance-warning')!;

  return (
    <section id="mini-project" className="relative">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 10"
            title="Mini-Project: Distance Warning System"
            subtitle="Combine everything you've learned — ultrasonic sensing, digital outputs, and serial logging — into a real proximity alarm. This is what electronics engineers do: integrate components to solve a problem."
          />
        </AnimatedSection>

        {/* Project overview */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 mb-10">
            <div className="flex flex-wrap gap-4 items-start">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-2">Project Goal</h3>
                <p className="text-slate-400">
                  Build a system that continuously measures the distance to objects using HC-SR04. When an object comes within
                  <strong className="text-cyan-400"> 20 cm</strong>, a warning LED turns on and a buzzer sounds. When the object
                  moves away, the alarm automatically resets.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['HC-SR04', 'LED + 220Ω', 'Buzzer', 'Arduino Uno', 'Breadboard'].map(comp => (
                  <span key={comp} className="tag bg-navy-700 text-slate-300 border border-cyan-900/30">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <AnimatedSection>
          <h3 className="text-xl font-bold text-white mb-6">Build Steps</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {projectSteps.map((step) => (
              <div key={step.step} className={`rounded-2xl border ${step.border} ${step.bg} p-4`}>
                <div className={`text-3xl font-black ${step.color} mb-2`}>0{step.step}</div>
                <div className="font-bold text-white text-sm mb-1">{step.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Wiring */}
        <AnimatedSection>
          <div className="mb-8">
            <WiringDiagram
              title="Distance Warning System — Complete Wiring"
              connections={[
                { pin: 'HC-SR04 VCC', connection: 'Arduino 5V', color: 'red' },
                { pin: 'HC-SR04 GND', connection: 'Arduino GND', color: 'black' },
                { pin: 'HC-SR04 TRIG', connection: 'Arduino D9', color: 'yellow' },
                { pin: 'HC-SR04 ECHO', connection: 'Arduino D8', color: 'green' },
                { pin: 'LED anode (+)', connection: '220Ω resistor → Arduino D4', color: 'cyan' },
                { pin: 'LED cathode (−)', connection: 'Arduino GND', color: 'black' },
                { pin: 'Buzzer (+)', connection: 'Arduino D7', color: 'purple' },
                { pin: 'Buzzer (−)', connection: 'Arduino GND', color: 'black' },
              ]}
            />
          </div>
        </AnimatedSection>

        {/* Full code */}
        <AnimatedSection>
          <CodeBlock
            title={projectCode.title}
            code={projectCode.code}
            language="cpp"
            description={projectCode.description}
          />
        </AnimatedSection>

        {/* Extension ideas */}
        <AnimatedSection>
          <div className="mt-8 rounded-2xl border border-cyan-900/30 bg-navy-800 p-6">
            <h3 className="text-base font-bold text-white mb-4">🚀 Extension Challenges</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Change buzzer frequency based on how close the object is (closer = higher pitch)',
                'Add a servo that raises a barrier when triggered',
                'Display distance on a 16×2 LCD instead of Serial Monitor',
                'Add multiple LEDs: green (safe) → amber (approaching) → red (too close)',
                'Make the buzzer beep at intervals that shorten as the object approaches',
                'Log time-stamped distance readings via Serial for analysis',
              ].map((idea, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-navy-900/40 border border-cyan-900/20">
                  <span className="text-cyan-400 font-bold text-sm flex-shrink-0">{i + 1}.</span>
                  <span className="text-sm text-slate-400">{idea}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
