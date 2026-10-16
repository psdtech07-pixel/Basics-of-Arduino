import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  file: string;
  alt: string;
  size?: 'component' | 'board' | 'wide' | 'thumbnail' | 'photo' | 'interface' | 'reference';
  caption?: ReactNode;
  className?: string;
}

const dimensions: Record<string, [number, number]> = {
  'Arduino-Uno.png': [500, 500],
  'Breadboard and jumper wires.png': [500, 500],
  'ldr.png': [447, 447],
  'thermistor.png': [500, 500],
  'Potentiometer.png': [451, 443],
  'IR sensor module.png': [738, 246],
  '16×2 LCD display.png': [527, 379],
  'Buzzer.png': [447, 447],
  'Servo motor (SG90).png': [500, 500],
  'led.png': [612, 408],
  'resistors.png': [360, 360],
  'USB-A-to-B-cable.jpg': [2339, 1559],
  'Tactile-switch-disassembled.jpg': [1440, 1080],
  'HC-SR04 ultrasonic sensor.png': [600, 600],
  'ArduinoIDE.png': [1920, 1080],
  'ArduinoPinout.webp': [654, 463],
};

export default function ComponentPhoto({ file, alt, size = 'component', caption, className = '' }: Props) {
  const [width, height] = dimensions[file] ?? [500, 500];
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.scrollTo({ top: scrollY, behavior: 'auto' });
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <figure className={`component-photo component-photo--${size} ${className}`.trim()}>
      <button
        ref={triggerRef}
        type="button"
        className="component-photo__zoom"
        aria-label={`Enlarge image: ${alt}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={`/Images/${encodeURIComponent(file)}`}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="component-lightbox"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Enlarged component image: ${alt}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              onClick={event => {
                if (event.target === event.currentTarget) setIsOpen(false);
              }}
            >
              <motion.div
                className="component-lightbox__panel"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              >
                <button ref={closeRef} type="button" className="component-lightbox__close" onClick={() => setIsOpen(false)} aria-label="Close enlarged image">
                  <X size={20} />
                </button>
                <img src={`/Images/${encodeURIComponent(file)}`} alt={alt} />
                {caption && <div className="component-lightbox__caption">{caption}</div>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </figure>
  );
}
