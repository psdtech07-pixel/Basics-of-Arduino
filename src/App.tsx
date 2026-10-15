import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import BackToTop from './components/BackToTop';
import PresentationMode from './components/PresentationMode';

import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import McuVsMpuSection from './sections/McuVsMpuSection';
import BoardSection from './sections/BoardSection';
import ElectronicsSection from './sections/ElectronicsSection';
import BreadboardSection from './sections/BreadboardSection';
import SignalsSection from './sections/SignalsSection';
import FirstProgramSection from './sections/FirstProgramSection';
import LDRSection from './sections/LDRSection';
import UltrasonicSection from './sections/UltrasonicSection';
import OutputDevicesSection from './sections/OutputDevicesSection';
import MiniProjectSection from './sections/MiniProjectSection';
import TroubleshootingSection from './sections/TroubleshootingSection';
import QuizSection from './sections/QuizSection';
import WrapUpSection from './sections/WrapUpSection';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <ProgressBar />
      <Navbar />

      <main>
        <HeroSection />
        <IntroSection />
        <McuVsMpuSection />
        <BoardSection />
        <ElectronicsSection />
        <BreadboardSection />
        <SignalsSection />
        <FirstProgramSection />
        <LDRSection />
        <UltrasonicSection />
        <OutputDevicesSection />
        <MiniProjectSection />
        <TroubleshootingSection />
        <QuizSection />
        <WrapUpSection />
      </main>

      <PresentationMode />
      <BackToTop />
    </div>
  );
}
