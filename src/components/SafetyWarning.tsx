import { ShieldAlert } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  warnings?: string[];
}

export default function SafetyWarning({ children, warnings }: Props) {
  return (
    <div role="note" className="flex gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
      <ShieldAlert size={20} className="flex-shrink-0 mt-0.5 text-red-400" aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        {warnings ? (
          <ul className="space-y-1">
            {warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-400" />
                {w}
              </li>
            ))}
          </ul>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
