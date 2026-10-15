interface Connection {
  pin: string;
  connection: string;
  color?: string;
}

interface WiringDiagramProps {
  title: string;
  connections: Connection[];
}

export default function WiringDiagram({ title, connections }: WiringDiagramProps) {
  const dotColor = (color?: string) => {
    const map: Record<string, string> = {
      red: '#ef4444', black: '#475569', yellow: '#eab308',
      orange: '#f97316', blue: '#3b82f6', green: '#22c55e',
      white: '#f8fafc', purple: '#a855f7', cyan: '#06b6d4',
      brown: '#92400e',
    };
    return map[color ?? 'cyan'] ?? '#06b6d4';
  };

  const lineColor = (color?: string) => dotColor(color);

  return (
    <div className="rounded-xl border border-cyan-900/30 bg-navy-800 overflow-hidden">
      <div className="px-4 py-3 bg-navy-700/50 border-b border-cyan-900/30">
        <h4 className="text-sm font-bold text-white">{title}</h4>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          {connections.map((conn, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-cyan-900/10 last:border-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: dotColor(conn.color) }}
                />
                <code className="text-cyan-400 font-mono text-sm font-semibold whitespace-nowrap">{conn.pin}</code>
              </div>
              <svg width="32" height="14" viewBox="0 0 32 14" className="flex-shrink-0" aria-hidden="true">
                <line x1="0" y1="7" x2="26" y2="7" stroke={lineColor(conn.color)} strokeWidth="2" strokeDasharray="3 2" />
                <polygon points="24,3 32,7 24,11" fill={lineColor(conn.color)} />
              </svg>
              <span className="text-slate-300 text-sm font-mono text-right">{conn.connection}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">
          Disconnect power before changing wiring. Verify connections match code pin numbers.
        </p>
      </div>
    </div>
  );
}
