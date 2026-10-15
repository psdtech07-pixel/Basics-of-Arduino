import { useId, useRef } from 'react';
import { easeInOut, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface Props {
  chapter: string;
  title: string;
}

/** A normal-flow chapter bridge whose lighting, flight, and title are scrubbed by page scroll. */
export default function ChapterTransition({ chapter, title }: Props) {
  const reduceMotion = useReducedMotion();
  const scene = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const { scrollYProgress } = useScroll({
    target: scene,
    // Keep progress at 0 while the transition is entering the viewport.
    // Begin scrubbing only once its top reaches the top of the viewport,
    // after the preceding section has fully passed.
    offset: ['start start', 'end start'],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.06, 0.18, 0.34, 0.48, 0.62, 0.72], [0, 0, 0.42, 0.9, 0.94, 0.36, 0], { ease: easeInOut });
  const glowOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.34, 0.5, 0.62], [0, 0.62, 0.9, 0.48, 0], { ease: easeInOut });
  const tracesOpacity = useTransform(scrollYProgress, [0.12, 0.24, 0.38, 0.5, 0.6], [0, 0.22, 0.48, 0.26, 0], { ease: easeInOut });
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.31, 0.43, 0.54], [0, 1, 1, 0], { ease: easeInOut });
  const titleY = useTransform(scrollYProgress, [0.2, 0.31, 0.43, 0.54], [24, 0, -2, -20], { ease: easeInOut });

  // Both flight layers read the same scrubbed path, so fast and reverse scrolling stay in sync.
  const flightX = useTransform(scrollYProgress, [0.08, 0.19, 0.31, 0.42, 0.52], ['-72vw', '-32vw', '-2vw', '28vw', '86vw'], { ease: easeInOut });
  const flightY = useTransform(scrollYProgress, [0.08, 0.19, 0.31, 0.42, 0.52], ['15vh', '5vh', '-11vh', '-15vh', '-3vh'], { ease: easeInOut });
  const flightScale = useTransform(scrollYProgress, [0.08, 0.19, 0.31, 0.42, 0.52], [0.48, 0.82, 1.08, 1.14, 0.72], { ease: easeInOut });
  const flightRotate = useTransform(scrollYProgress, [0.08, 0.19, 0.31, 0.42, 0.52], [-15, -7, 0, 6, 17], { ease: easeInOut });
  const flightOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.4, 0.52], [0, 1, 0.95, 0], { ease: easeInOut });
  const trailOpacity = useTransform(scrollYProgress, [0.09, 0.18, 0.38, 0.5], [0, 0.72, 0.44, 0], { ease: easeInOut });
  const flightBlur = useTransform(scrollYProgress, [0.08, 0.19, 0.31, 0.42, 0.52], ['blur(7px)', 'blur(2px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'], { ease: easeInOut });

  return (
    <div ref={scene} className={`chapter-transition${reduceMotion ? ' chapter-transition-static' : ''}`} aria-hidden="true">
      <motion.div className="chapter-transition-backdrop" style={reduceMotion ? undefined : { opacity: backgroundOpacity }} />
      <motion.div className="chapter-transition-glow" style={reduceMotion ? undefined : { opacity: glowOpacity }} />
      <motion.svg
        className="chapter-transition-traces"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={reduceMotion ? undefined : { opacity: tracesOpacity }}
      >
        <path d="M0 190h260l70 70h170m940 440h-260l-70-70h-170M0 680h150l60-60h150m1080-400h-150l-60 60h-150" />
        <path d="M0 220h245l70 70h180m945 380h-245l-70-70h-180M0 650h135l60-60h160m1085-350h-135l-60 60h-160" />
        <circle cx="500" cy="260" r="4" /><circle cx="940" cy="630" r="4" />
        <circle cx="355" cy="590" r="3" /><circle cx="1085" cy="300" r="3" />
      </motion.svg>
      {!reduceMotion && (
        <>
          <motion.svg className="chapter-energy-trail" viewBox="0 0 620 100" style={{ x: flightX, y: flightY, scale: flightScale, rotate: flightRotate, opacity: trailOpacity }}>
            <defs>
              <linearGradient id={`${id}-chapter-energy`} x1="1" x2="0">
                <stop stopColor="#bbfbff" stopOpacity=".88" />
                <stop offset=".3" stopColor="#29d6ff" stopOpacity=".48" />
                <stop offset="1" stopColor="#1b91ff" stopOpacity="0" />
              </linearGradient>
              <filter id={`${id}-chapter-energy-glow`} x="-30%" y="-100%" width="160%" height="300%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <path d="M18 50 C150 8 230 84 350 44 S520 22 600 50" fill="none" stroke={`url(#${id}-chapter-energy)`} strokeWidth="12" strokeLinecap="round" filter={`url(#${id}-chapter-energy-glow)`} />
            <path d="M18 50 C150 8 230 84 350 44 S520 22 600 50" fill="none" stroke={`url(#${id}-chapter-energy)`} strokeWidth="3" strokeLinecap="round" />
          </motion.svg>
          <motion.svg
            className="chapter-transition-mascot"
            viewBox="0 0 260 150"
            style={{ x: flightX, y: flightY, scale: flightScale, rotate: flightRotate, opacity: flightOpacity, filter: flightBlur }}
          >
            <defs>
              <linearGradient id={`${id}-chapter-armor`} x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#e0fcff" /><stop offset=".4" stopColor="#51c8e0" /><stop offset="1" stopColor="#10243d" />
              </linearGradient>
              <linearGradient id={`${id}-chapter-wing`} x1="0" x2="1">
                <stop stopColor="#8cf2ff" stopOpacity=".8" /><stop offset="1" stopColor="#167db8" stopOpacity=".15" />
              </linearGradient>
            </defs>
            <path d="m73 60-58-31 17 38-22 20 70-8m119-19 47-25-18 42 20 19-65-8" fill={`url(#${id}-chapter-wing)`} stroke="#5fdff5" strokeWidth="2" />
            <path d="m75 53 41-33 38 4 31 31-14 46-43 27-42-20-20-27Z" fill={`url(#${id}-chapter-armor)`} stroke="#c1f9ff" strokeWidth="3" />
            <path d="m106 50 27-12 26 11-4 20-24 12-24-11Z" fill="#0a2236" stroke="#68e6f8" strokeWidth="2" />
            <path d="m111 58 19-8 18 7-18 10Z" fill="#d8fcff" />
            <circle cx="132" cy="59" r="5" fill="white" />
            <path d="m83 91-16 24 36-10m68-13 17 24-37-10" fill="#255271" stroke="#76e7f6" strokeWidth="2" />
            <path d="m106 88 26 12 25-13" fill="none" stroke="#73f2ff" strokeWidth="3" strokeLinecap="round" />
          </motion.svg>
        </>
      )}
      <motion.div className="chapter-transition-title" style={reduceMotion ? undefined : { opacity: titleOpacity, y: titleY }}>
        <span>{chapter}</span>
        <h2>{title}</h2>
        <i />
      </motion.div>
    </div>
  );
}
