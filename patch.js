// We will replace the HubCard definition.
const fs = require('fs');
let content = fs.readFileSync('src/components/UIOverlay.jsx', 'utf8');

const oldHubCardRegex = /const HubCard = \(\{(?:[\s\S]*?)return \(\s*<motion\.button(?:[\s\S]*?)<\/motion\.button>\s*\);\s*\};/;

const newHubCard = const HubCard = ({ card, index, smoothScroll, interactive, onSelect }) => {
  const start = 0.58 + index * 0.06;
  const opacity = useTransform(smoothScroll, [start, start + 0.2], [0, 1]);
  const y = useTransform(smoothScroll, [start, start + 0.28], [80, 0]);
  const scale = useTransform(smoothScroll, [start, start + 0.28], [0.95, 1]);
  const blurPx = useTransform(smoothScroll, [start, start + 0.24], [10, 0]);
  const filter = useMotionTemplate\\\lur(\\\px)\\\;

  const px = useSpring(0, { stiffness: 260, damping: 32 });
  const py = useSpring(0, { stiffness: 260, damping: 32 });
  const spotlight = useMotionTemplate\\\adial-gradient(450px circle at \\\px \\\px, color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)\\\;

  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  const { Mark } = card;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      onMouseMove={track}
      style={{ opacity, y, scale, filter, '--accent': card.accent, pointerEvents: interactive ? 'auto' : 'none' }}
      className={\\\group relative flex h-[104px] w-full flex-row items-center gap-5 overflow-hidden
                  rounded-[1.5rem] border border-white/[0.04] p-5 text-left backdrop-blur-3xl
                  bg-gradient-to-b from-white/[0.06] via-transparent to-black/30
                  shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]
                  transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:-translate-y-2
                  hover:shadow-[0_30px_60px_-15px_color-mix(in_srgb,var(--accent)_20%,transparent)]
                  sm:h-[370px] sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[2rem] sm:p-7
                  \\\ hover:border-[var(--accent)]/40\\\}
    >
      <span
        className="pointer-events-none absolute inset-0 hidden opacity-[0.4] sm:block transition-opacity duration-700 group-hover:opacity-[0.8]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--accent) 40%, transparent) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to bottom, black, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 60%)',
        }}
      />
      <motion.span
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span className={\\\pointer-events-none absolute inset-x-0 top-0 h-[1px] transition-all duration-700 \\\\\\} />

      {['left-5 top-5 border-l border-t', 'right-5 top-5 border-r border-t',
        'left-5 bottom-5 border-l border-b', 'right-5 bottom-5 border-r border-b'].map((pos) => (
        <span
          key={pos}
          className={\\\pointer-events-none absolute hidden h-3 w-3 rounded-tl-[2px] border-white/10 transition-all duration-700 group-hover:border-[var(--accent)]/60 group-hover:scale-110 sm:block \\\\\\}
        />
      ))}

      <span className="relative z-10 hidden items-center justify-between sm:flex">
        <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-white/30 transition-colors duration-700 group-hover:text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors duration-700">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse opacity-70 group-hover:opacity-100" />
          {card.status}
        </span>
      </span>

      <span className="relative z-10 flex shrink-0 items-center justify-center sm:flex-1 sm:py-6">
        <span className="relative flex items-center justify-center transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.05] sm:p-4">
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[var(--accent)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.15]" />
          <span className="relative opacity-85 transition-opacity duration-700 group-hover:opacity-100" style={{ filter: 'drop-shadow(0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent))' }}>
            <Mark size={card.id === 'elc' ? 100 : 85} />
          </span>
        </span>
      </span>

      <span className="relative z-10 flex min-w-0 flex-col">
        <span className="text-[15px] font-semibold tracking-[0.1em] text-white/90 sm:text-[18px] transition-all duration-700 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
          {card.title}
        </span>

        <span className="mt-1 text-[10px] font-light tracking-wide text-slate-400 sm:mt-1.5 sm:text-[11px] group-hover:text-slate-300 transition-colors duration-700">
          {card.caption}
        </span>

        <span className="my-4 hidden h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent sm:block transition-all duration-700 group-hover:from-[var(--accent)]/30 group-hover:via-[var(--accent)]/5" />

        <span className="hidden items-center justify-between sm:flex">
          <span className="flex flex-col">
            <span className="truncate whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-400 transition-colors duration-700">{card.meta}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] transition-all duration-700">
              {card.cta}
            </span>
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] transition-all duration-700 group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/10 group-hover:scale-110">
            <ArrowRight size={14} className="text-slate-400 transition-all duration-700 group-hover:translate-x-0.5 group-hover:text-white" />
          </span>
        </span>
      </span>
    </motion.button>
  );
};;

if(oldHubCardRegex.test(content)) {
  content = content.replace(oldHubCardRegex, newHubCard);
  fs.writeFileSync('src/components/UIOverlay.jsx', content);
  console.log("Success");
} else {
  console.log("Regex failed to match HubCard");
}