interface Props {
  step?: string;
  title: string;
  subtitle?: string;
  accent?: string;
}

export default function SectionHeading({ step, title, subtitle, accent = 'cyan' }: Props) {
  const accentClass = accent === 'teal' ? 'text-teal-400' : 'text-cyan-400';
  return (
    <div className="mb-12">
      {step && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest ${accentClass} mb-3`}>
          {step}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
      <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r ${accent === 'teal' ? 'from-teal-500 to-cyan-500' : 'from-cyan-500 to-teal-400'}`} />
    </div>
  );
}
