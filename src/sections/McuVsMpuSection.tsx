import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';

const comparisonRows = [
  {
    feature: "What's on the chip",
    mcu: 'CPU + RAM + Flash + I/O peripherals',
    mpu: 'CPU only (memory and I/O are external)',
  },
  {
    feature: 'Typical example',
    mcu: 'ATmega328P, STM32, ESP32',
    mpu: 'Intel Core i5, the ARM Cortex-A chip in a Raspberry Pi',
  },
  {
    feature: 'Operating system',
    mcu: 'Usually none; one program',
    mpu: 'Yes (Windows, Linux, Android)',
  },
  {
    feature: 'Speed',
    mcu: 'MHz range (16 MHz here)',
    mpu: 'GHz range',
  },
  {
    feature: 'Memory',
    mcu: 'KB',
    mpu: 'GB',
  },
  {
    feature: 'Power use',
    mcu: 'Very low (milliamps)',
    mpu: 'High (watts)',
  },
  {
    feature: 'Cost and size',
    mcu: 'Cheap, tiny',
    mpu: 'Costly, needs a full board around it',
  },
  {
    feature: 'Best at',
    mcu: 'Controlling hardware in real time',
    mpu: 'Running complex software and multitasking',
  },
];

export default function McuVsMpuSection() {
  return (
    <section id="mcu-vs-mpu" className="relative bg-navy-950/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 02"
            title="Microcontroller vs Microprocessor"
            subtitle="Understanding the brain of embedded systems: how a self-contained microcontroller differs from a general-purpose processor."
          />
        </AnimatedSection>

        {/* Board distinction note */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 mb-8">
            <p className="text-sm font-semibold text-cyan-300">
              Arduino is the board; the ATmega328P is the microcontroller on it.
            </p>
          </div>
        </AnimatedSection>

        {/* What is a microcontroller? */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">What is a microcontroller?</h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              A <strong className="text-white">microcontroller (MCU)</strong> is a complete tiny computer on one chip. Inside it are:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1.5 mb-4 ml-2">
              <li>a <strong className="text-cyan-300">CPU</strong> (executes instructions)</li>
              <li><strong className="text-cyan-300">memory</strong> (Flash for the program, SRAM for variables, EEPROM for saved data)</li>
              <li><strong className="text-cyan-300">peripherals</strong> (timers, ADC, serial ports, digital pins)</li>
            </ul>
            <p className="text-sm text-slate-300 leading-relaxed">
              It runs <strong className="text-white">one dedicated program</strong>, starts instantly at power-up, and needs no operating system. It sits inside washing machines, remote controls, car dashboards and thermostats.
            </p>
          </div>
        </AnimatedSection>

        {/* Microcontroller vs microprocessor */}
        <AnimatedSection>
          <div className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-cyan-900/30 bg-navy-700/50">
              <h3 className="text-lg font-bold text-white mb-2">Microcontroller vs microprocessor</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A <strong className="text-white">microprocessor (MPU)</strong> is only the CPU. To make a working computer you must add RAM, storage and peripheral chips around it.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-900/50 border-b border-cyan-900/30">
                    <th className="px-5 py-3.5 text-left text-sm font-bold text-cyan-400 uppercase tracking-wider">Feature</th>
                    <th className="px-5 py-3.5 text-left text-sm font-bold text-cyan-400 uppercase tracking-wider">Microcontroller (MCU)</th>
                    <th className="px-5 py-3.5 text-left text-sm font-bold text-cyan-400 uppercase tracking-wider">Microprocessor (MPU)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-cyan-900/10 ${i % 2 === 0 ? 'bg-navy-900/20' : ''}`}>
                      <td className="px-5 py-3 text-sm font-medium text-white">{row.feature}</td>
                      <td className="px-5 py-3 text-sm text-cyan-300">{row.mcu}</td>
                      <td className="px-5 py-3 text-sm text-slate-300">{row.mpu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 border-t border-cyan-900/30 bg-navy-900/40">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Analogy:</strong> an MCU is a dedicated worker who does one job perfectly. An MPU is a general office with many people and many tasks.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
