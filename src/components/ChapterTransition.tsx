import { useId, useRef } from 'react';
import { easeInOut, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface Props {
  chapter: string;
  title: string;
}

/** A sticky, viewport-sized chapter scene whose complete timeline follows page scroll. */
export default function ChapterTransition({ chapter, title }: Props) {
  const reduceMotion = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });

  const rocketY = useTransform(scrollYProgress, [0, 0.08, 0.27, 0.56, 0.68, 0.88, 1], ['100svh', '100svh', '0vh', '0vh', '-8vh', '-125svh', '-125svh'], { ease: easeInOut });
  const rocketScale = useTransform(scrollYProgress, [0, 0.24, 0.34, 0.58, 0.72, 0.88, 1], [0.72, 0.82, 1, 1, 1.04, 1.3, 1.3], { ease: easeInOut });
  const rocketOpacity = useTransform(scrollYProgress, [0, 0.12, 0.26, 0.72, 0.87, 0.94, 1], [0, 0, 1, 1, 1, 0, 0], { ease: easeInOut });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.32, 0.45, 0.64, 0.76, 0.84, 1], [0, 0, 1, 1, 0, 0, 0], { ease: easeInOut });
  const titleY = useTransform(scrollYProgress, [0.32, 0.45, 0.64, 0.76], [22, 0, 0, -14], { ease: easeInOut });
  const exhaustOpacity = useTransform(scrollYProgress, [0, 0.16, 0.27, 0.48, 0.62, 0.78, 0.93, 1], [0, 1, 0.72, 0.52, 0.8, 1, 1, 0], { ease: easeInOut });
  const exhaustScale = useTransform(scrollYProgress, [0, 0.27, 0.58, 0.88, 1], [0.6, 0.82, 0.8, 1.35, 1.4], { ease: easeInOut });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.04, 0.86, 0.96, 1], [1, 1, 1, 0, 0], { ease: easeInOut });
  const ringScale = useTransform(scrollYProgress, [0, 0.3, 0.54, 0.88, 1], [0.8, 1, 1.08, 1.3, 1.35], { ease: easeInOut });
  const ringOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32, 0.6, 0.82, 0.95, 1], [0, 0.12, 0.62, 0.46, 0.2, 0, 0], { ease: easeInOut });

  return (
    <div ref={track} className={`chapter-transition-track${reduceMotion ? ' chapter-transition-track-static' : ''}`}>
      <section className={`chapter-transition${reduceMotion ? ' chapter-transition-static' : ''}`} aria-label={`${chapter}: ${title}`}>
        <motion.div className="chapter-transition-scene" style={reduceMotion ? undefined : { opacity: sceneOpacity }}>
          <div className="chapter-transition-backdrop" />
          <div className="chapter-transition-atmosphere" />
          <svg className="chapter-transition-circuit" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M0 190h260l70 70h170m940 440h-260l-70-70h-170M0 680h150l60-60h150m1080-400h-150l-60 60h-150" />
            <path d="M0 220h245l70 70h180m945 380h-245l-70-70h-180M0 650h135l60-60h160m1085-350h-135l-60 60h-160" />
            <circle cx="500" cy="260" r="4" /><circle cx="940" cy="630" r="4" />
            <circle cx="355" cy="590" r="3" /><circle cx="1085" cy="300" r="3" />
          </svg>
          <motion.svg className="chapter-transition-rings" viewBox="0 0 600 600" aria-hidden="true" style={reduceMotion ? undefined : { scale: ringScale, opacity: ringOpacity }}>
            <circle cx="300" cy="300" r="222" />
            <circle cx="300" cy="300" r="184" />
            <circle cx="300" cy="300" r="250" />
            <path d="M300 24v76m0 400v76M24 300h76m400 0h76M105 105l54 54m282 282 54 54m0-390-54 54m-282 282-54 54" />
          </motion.svg>
          <div className="chapter-transition-particles" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>

          {!reduceMotion && (
            <motion.svg className="chapter-rocket-exhaust" viewBox="0 0 180 300" aria-hidden="true" style={{ y: rocketY, scale: rocketScale, opacity: exhaustOpacity, scaleY: exhaustScale }}>
              <defs>
                <linearGradient id={`${id}-exhaust`} x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#efffff" stopOpacity=".96" />
                  <stop offset=".24" stopColor="#72f1ff" stopOpacity=".88" />
                  <stop offset=".66" stopColor="#159bff" stopOpacity=".44" />
                  <stop offset="1" stopColor="#0b71ff" stopOpacity="0" />
                </linearGradient>
                <filter id={`${id}-exhaust-blur`} x="-100%" y="-30%" width="300%" height="160%"><feGaussianBlur stdDeviation="12" /></filter>
              </defs>
              <path d="M90 8 145 254Q91 286 35 254Z" fill={`url(#${id}-exhaust)`} filter={`url(#${id}-exhaust-blur)`} />
              <path d="M90 28 112 238Q90 252 68 238Z" fill={`url(#${id}-exhaust)`} opacity=".84" />
            </motion.svg>
          )}

          <motion.svg
            className="chapter-transition-rocket"
            viewBox="0 0 240 390"
            role="img"
            aria-label="Cyan and white Arduino rocket"
            style={reduceMotion ? undefined : { y: rocketY, scale: rocketScale, opacity: rocketOpacity }}
          >
            <defs>
              <linearGradient id={`${id}-rocket-body`} x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#fff" /><stop offset=".38" stopColor="#dffaff" /><stop offset=".72" stopColor="#94dfed" /><stop offset="1" stopColor="#4288aa" />
              </linearGradient>
              <linearGradient id={`${id}-rocket-fin`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#8cf4ff" /><stop offset="1" stopColor="#147eb3" /></linearGradient>
              <radialGradient id={`${id}-rocket-flame`}><stop stopColor="#fff" /><stop offset=".28" stopColor="#a6f7ff" /><stop offset=".68" stopColor="#1bbcff" stopOpacity=".84" /><stop offset="1" stopColor="#0784ff" stopOpacity="0" /></radialGradient>
              <filter id={`${id}-rocket-glow`} x="-60%" y="-40%" width="220%" height="190%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {!reduceMotion && <ellipse cx="120" cy="352" rx="34" ry="54" fill={`url(#${id}-rocket-flame)`} />}
            <path d="M79 268 34 324 38 235 77 204Z" fill={`url(#${id}-rocket-fin)`} stroke="#8cf4ff" strokeWidth="4" />
            <path d="m161 268 45 56-4-89-39-31Z" fill={`url(#${id}-rocket-fin)`} stroke="#8cf4ff" strokeWidth="4" />
            <path d="M91 286h58l13 43q-41 19-84 0Z" fill="#183b58" stroke="#70e9fa" strokeWidth="4" />
            <path d="M120 26C78 63 62 117 62 185v107q58 33 116 0V185c0-68-16-122-58-159Z" fill={`url(#${id}-rocket-body)`} stroke="#9af4ff" strokeWidth="5" filter={`url(#${id}-rocket-glow)`} />
            <path d="M91 125a29 29 0 0 1 58 0c0 19-13 34-29 34s-29-15-29-34Z" fill="#061b31" stroke="#63e7fa" strokeWidth="5" />
            <path d="M103 120q17-15 34-2" fill="none" stroke="#c9fbff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
            <path d="M89 198c12-19 25-19 37 0s25 19 37 0-1-19-10-19-16 8-27 19-25 19-37 0-25-19-37 0 1 19 10 19 16-8 27-19Z" fill="none" stroke="#087e9d" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M89 198c12-19 25-19 37 0s25 19 37 0-1-19-10-19-16 8-27 19-25 19-37 0-25-19-37 0 1 19 10 19 16-8 27-19Z" fill="none" stroke="#d8fcff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="72" cy="230" r="5" fill="#e5fcff" /><circle cx="168" cy="230" r="5" fill="#e5fcff" />
            <path d="M98 276h44" stroke="#fff" strokeOpacity=".75" strokeWidth="4" strokeLinecap="round" />
          </motion.svg>

          <motion.div className="chapter-transition-title" style={reduceMotion ? undefined : { opacity: titleOpacity, y: titleY }}>
            <span>{chapter}</span>
            <h2>{title}</h2>
            <i />
          </motion.div>
          <div className="chapter-transition-vignette" />
        </motion.div>
      </section>
    </div>
  );
}
