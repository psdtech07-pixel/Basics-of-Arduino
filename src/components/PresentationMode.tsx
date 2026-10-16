import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, X } from 'lucide-react';

interface ZoomItem {
  type: 'svg' | 'pre';
  html: string;
}

export default function PresentationMode() {
  const [isPresent, setIsPresent] = useState(() => {
    return localStorage.getItem('presentation_mode') === 'true';
  });
  const [zoomedItem, setZoomedItem] = useState<ZoomItem | null>(null);

  // Sync class 'present' on <html>
  useEffect(() => {
    if (isPresent) {
      document.documentElement.classList.add('present');
      localStorage.setItem('presentation_mode', 'true');
    } else {
      document.documentElement.classList.remove('present');
      localStorage.setItem('presentation_mode', 'false');
    }
  }, [isPresent]);

  const togglePresentation = useCallback(() => {
    setIsPresent(prev => !prev);
  }, []);

  // Keyboard shortcut: "P" to toggle presentation mode, "Escape" to close zoom overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedItem(null);
        return;
      }

      if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const active = document.activeElement;
        const isInput =
          active instanceof HTMLInputElement ||
          active instanceof HTMLTextAreaElement ||
          active instanceof HTMLSelectElement ||
          (active && active.getAttribute('contenteditable') === 'true');

        if (!isInput) {
          e.preventDefault();
          togglePresentation();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePresentation]);

  // Make SVGs and PREs focusable with Enter key accessibility
  useEffect(() => {
    const markZoomable = () => {
      document.querySelectorAll('pre, svg:not(.lucide)').forEach(el => {
        if (!el.closest('button, a, .zoom-overlay, .presentation-toggle, [data-no-presentation-zoom]')) {
          if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
          }
          el.classList.add('cursor-zoom-in');
        }
      });
    };

    markZoomable();
    const observer = new MutationObserver(markZoomable);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // ONE global click and keydown (Enter) handler for event delegation (mounted once)
  useEffect(() => {
    const handleGlobalTrigger = (e: Event) => {
      const isClick = e.type === 'click';
      const isEnter = e.type === 'keydown' && (e as KeyboardEvent).key === 'Enter';

      if (!isClick && !isEnter) return;

      const target = isClick
        ? (e.target as HTMLElement | null)
        : (document.activeElement as HTMLElement | null);

      if (!target) return;

      // Don't trigger if clicking inside the zoom overlay itself
      if (target.closest('.zoom-overlay')) return;
      // Interactive diagrams own their click and keyboard interactions.
      if (target.closest('[data-no-presentation-zoom]')) return;

      // Check for <pre> code blocks
      const pre = target.closest('pre');
      if (pre && !pre.closest('.presentation-toggle')) {
        e.preventDefault();
        setZoomedItem({ type: 'pre', html: pre.outerHTML });
        return;
      }

      // Check for <svg> diagrams
      const svg = target.closest('svg');
      if (svg && !svg.closest('.presentation-toggle, button, a') && !svg.classList.contains('lucide')) {
        e.preventDefault();
        setZoomedItem({ type: 'svg', html: svg.outerHTML });
        return;
      }
    };

    document.addEventListener('click', handleGlobalTrigger);
    document.addEventListener('keydown', handleGlobalTrigger);

    return () => {
      document.removeEventListener('click', handleGlobalTrigger);
      document.removeEventListener('keydown', handleGlobalTrigger);
    };
  }, []);

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={togglePresentation}
        className={`presentation-toggle fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none ${
          isPresent
            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-cyan-500/20'
            : 'bg-navy-900/90 text-slate-300 border-cyan-900/40 hover:text-white hover:border-cyan-500/50 hover:bg-navy-800'
        }`}
        title="Toggle Presentation Mode (Key: P)"
        aria-label="Toggle Presentation Mode (Key: P)"
        aria-pressed={isPresent}
      >
        <Presentation size={18} className={isPresent ? 'text-cyan-400' : 'text-slate-400'} />
        <span className="text-sm font-semibold tracking-wide">
          {isPresent ? 'Presenting' : 'Present'}
        </span>
        <kbd className="px-1.5 py-0.5 text-sm font-mono rounded bg-navy-950/80 border border-cyan-900/40 text-cyan-400">
          P
        </kbd>
      </button>

      {/* Full-screen zoom overlay with in and out animation */}
      <AnimatePresence>
        {zoomedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="zoom-overlay fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={e => {
              if ((e.target as HTMLElement).classList.contains('zoom-overlay')) {
                setZoomedItem(null);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Zoomed content view"
          >
            {/* Close button */}
            <button
              onClick={() => setZoomedItem(null)}
              className="fixed top-6 right-6 z-50 p-2.5 rounded-xl bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 border border-cyan-900/40 transition-colors"
              aria-label="Close zoom overlay (Esc)"
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-auto flex items-center justify-center p-4"
            >
              {zoomedItem.type === 'svg' ? (
                <div
                  className="w-full flex items-center justify-center p-6 bg-navy-900/95 border border-cyan-500/30 rounded-2xl shadow-2xl [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[75vh]"
                  dangerouslySetInnerHTML={{ __html: zoomedItem.html }}
                />
              ) : (
                <div
                  className="w-full max-h-[85vh] overflow-auto rounded-2xl border border-cyan-500/30 shadow-2xl [&>pre]:m-0 [&>pre]:p-8 [&>pre]:bg-navy-950 [&>pre]:text-base [&>pre]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: zoomedItem.html }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
