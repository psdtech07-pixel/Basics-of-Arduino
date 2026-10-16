import { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';
import SyntaxHighlightedCode from './SyntaxHighlightedCode';

interface Props {
  code: string;
  language?: string;
  title?: string;
  description?: string;
}

type CopyState = 'idle' | 'success' | 'error';

export default function CodeBlock({ code, language = 'cpp', title, description }: Props) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('success');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-cyan-900/30 bg-navy-950 mb-6">
      {description && (
        <p className="px-4 pt-3 pb-0 text-xs text-slate-500 italic">{description}</p>
      )}
      <div className="flex items-center justify-between px-4 py-2 bg-navy-800 border-b border-cyan-900/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          {title && <span className="ml-2 text-xs text-slate-400 font-mono">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          {language && <span className="text-xs text-slate-500 uppercase tracking-wider">{language}</span>}
          <button
            onClick={handleCopy}
            aria-label={copyState === 'success' ? 'Code copied!' : copyState === 'error' ? 'Copy failed' : 'Copy code'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              copyState === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : copyState === 'error'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/30 hover:border-cyan-500/40 hover:text-cyan-400'
            }`}
          >
            {copyState === 'success' ? (
              <><Check size={12} />Copied!</>
            ) : copyState === 'error' ? (
              <><X size={12} />Failed</>
            ) : (
              <><Copy size={12} />Copy</>
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="syntax-code font-mono"><SyntaxHighlightedCode code={code} language={language} /></code>
      </pre>
    </div>
  );
}
