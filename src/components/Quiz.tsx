import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
    window.scrollTo({ top: document.getElementById('quiz')?.offsetTop ?? 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
  };

  const score = quizQuestions.filter(q => answers[q.id] === q.correctId).length;
  const allAnswered = quizQuestions.every(q => answers[q.id]);

  const scoreColor = score >= 6 ? 'text-green-400' : score >= 4 ? 'text-amber-400' : 'text-red-400';
  const scoreBg = score >= 6
    ? 'bg-green-500/10 border-green-500/30'
    : score >= 4
    ? 'bg-amber-500/10 border-amber-500/30'
    : 'bg-red-500/10 border-red-500/30';

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {showResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-8 p-6 rounded-2xl border ${scoreBg}`}
          >
            <div className="flex items-center gap-4">
              <Trophy size={40} className={scoreColor} />
              <div>
                <div className={`text-4xl font-black ${scoreColor}`}>{score} / {quizQuestions.length}</div>
                <div className="text-slate-300 mt-1">
                  {score === quizQuestions.length ? 'Perfect score! Excellent work.' :
                   score >= 6 ? 'Great job! Review any missed questions.' :
                   score >= 4 ? 'Good effort. Review the sections on missed topics.' :
                   'Keep going — revisit the sections above and try again.'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {quizQuestions.map((q, qi) => {
          const userAnswer = answers[q.id];
          const isCorrect = submitted && userAnswer === q.correctId;
          const isWrong = submitted && userAnswer && !isCorrect;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: qi * 0.04 }}
              className="rounded-2xl border border-cyan-900/30 bg-navy-800 overflow-hidden"
            >
              <div className="p-5 border-b border-cyan-900/20">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-bold flex items-center justify-center border border-cyan-500/20">
                    {qi + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug pt-0.5">{q.question}</h3>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {q.options.map(opt => {
                  const isSelected = userAnswer === opt.id;
                  const isCorrectOpt = opt.id === q.correctId;

                  let optClass = 'border-cyan-900/20 bg-navy-900/40 text-slate-300 hover:border-cyan-500/30 hover:bg-cyan-500/5';
                  if (submitted && isCorrectOpt) {
                    optClass = 'border-green-500/40 bg-green-500/10 text-green-300';
                  } else if (submitted && isSelected && !isCorrectOpt) {
                    optClass = 'border-red-500/40 bg-red-500/10 text-red-300';
                  } else if (!submitted && isSelected) {
                    optClass = 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(q.id, opt.id)}
                      disabled={submitted}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all ${submitted ? 'cursor-default' : 'cursor-pointer'} ${optClass}`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className="w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{
                          borderColor: submitted && isCorrectOpt ? 'rgba(34,197,94,0.5)'
                            : submitted && isSelected && !isCorrectOpt ? 'rgba(239,68,68,0.5)'
                            : isSelected ? 'rgba(6,182,212,0.5)'
                            : 'rgba(100,116,139,0.3)',
                        }}
                      >
                        {submitted && isCorrectOpt ? <Check size={12} />
                          : submitted && isSelected && !isCorrectOpt ? <X size={12} />
                          : opt.id.toUpperCase()}
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`border-t ${isCorrect ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'} overflow-hidden`}
                  >
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wider mb-1.5"
                        style={{ color: isCorrect ? '#4ade80' : '#f87171' }}>
                        {isCorrect ? '✓ Correct' : isWrong ? '✗ Incorrect' : '→ Answer'}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`btn-primary text-base px-8 py-3 ${!allAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit Answers ({Object.keys(answers).length}/{quizQuestions.length} answered)
          </button>
        ) : (
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
