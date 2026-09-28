import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';

// ---------- Reveal ----------
export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ---------- CountUp ----------
export function CountUp({ to, decimals = 1, suffix = '', prefix = '', duration = 1.6 }: { to: number; decimals?: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const e = 1 - Math.pow(1 - p, 4);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref} className="tick">{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

// ---------- Spark ----------
export function Spark({ data, w = 120, h = 36, accent = '#CDFF3D' }: { data: number[]; w?: number; h?: number; accent?: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / (max - min || 1)) * (h - 4) - 2}`).join(' ');
  const id = useRef(Math.random().toString(36).slice(2)).current;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${id})`} />
      <motion.polyline points={pts} fill="none" stroke={accent} strokeWidth="1.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.8, ease: 'easeOut' }} />
    </svg>
  );
}

// ---------- Magnetic button ----------
export function Magnetic({ children, href = '#terminal' }: { children: ReactNode; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={reset}
      className="inline-flex items-center gap-2 bg-[#CDFF3D] text-black font-semibold text-sm px-6 py-3.5 transition-transform duration-200 will-change-transform hover:shadow-[0_0_40px_rgba(205,255,61,0.35)]">
      {children} <ArrowUpRight size={16} strokeWidth={2.5} />
    </a>
  );
}

// ---------- Loader ----------
export function Loader({ done }: { done: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 34 + 12;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(done, 180); }
      setP(Math.floor(v));
    }, 120);
    return () => clearInterval(id);
  }, [done]);
  return (
    <motion.div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
      exit={{ opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
      <div className="mono text-[11px] tracking-[0.4em] text-white/40 mb-4">A SARETY COMPANY</div>
      <div className="text-5xl font-black tracking-tighter">EQ<span className="accent">-T</span></div>
      <div className="mono text-[10px] tracking-[0.3em] text-white/50 mt-4">LOADING EQUITY INTELLIGENCE…</div>
      <div className="mono text-xs mt-3 w-56">
        <div className="flex justify-between text-white/60 mb-2"><span>{'█'.repeat(Math.floor(p / 5))}</span><span>{p}%</span></div>
        <div className="h-px bg-white/10"><div className="h-px bg-[#CDFF3D] transition-all" style={{ width: `${p}%` }} /></div>
      </div>
    </motion.div>
  );
}

// ---------- Cursor + glow ----------
export function CursorFX() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const glow = document.getElementById('mouse-glow');
    if (!dot || !ring || !glow) return;
    let mx = -100, my = -100, rx = -100, ry = -100;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      glow.style.left = mx + 'px'; glow.style.top = my + 'px';
      const t = e.target as HTMLElement;
      const interactive = t.closest('a,button,[data-hover]');
      if (interactive) { dot.style.width = '20px'; dot.style.height = '20px'; dot.style.opacity = '0.9'; ring.style.width = '52px'; ring.style.height = '52px'; }
      else { dot.style.width = '8px'; dot.style.height = '8px'; dot.style.opacity = '1'; ring.style.width = '32px'; ring.style.height = '32px'; }
    };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    const raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div id="cursor-dot" aria-hidden /><div id="cursor-ring" aria-hidden /><div id="mouse-glow" aria-hidden /></>);
}

// ---------- Navbar ----------
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/85 backdrop-blur-xl hairline-b' : 'bg-transparent'}`}>
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-5 md:px-10 h-16" aria-label="Primary">
        <a href="#top" className="flex items-center gap-3" aria-label="EQ-T home">
          <span className="w-8 h-8 grid place-items-center bg-[#CDFF3D] text-black"><BrandMark size={22} /></span>
          <span className="font-black tracking-tighter text-lg">EQ-T</span>
          <span className="mono hidden sm:inline text-[9px] tracking-[0.25em] text-white/35 border-l border-white/10 pl-3 ml-1">A SARETY COMPANY</span>
        </a>
        <div className="hidden md:flex items-center gap-8 mono text-[11px] tracking-[0.18em] text-white/60">
          <a href="#terminal" className="hover:text-white transition-colors">RESEARCH</a>
          <a href="#terminal" className="hover:text-white transition-colors">TERMINAL</a>
          <a href="#method" className="hover:text-white transition-colors">METHODOLOGY</a>
          <span className="mono text-[10px] text-white/30 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#CDFF3D] animate-pulse" />LIVE · NSE</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#cta" className="hidden sm:inline-flex items-center gap-2 mono text-[11px] tracking-[0.15em] bg-white text-black px-5 py-2.5 font-semibold hover:bg-[#CDFF3D] transition-colors">
            ENTER EQ-T <ArrowUpRight size={14} />
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/70" aria-label="Menu" aria-expanded={open}>☰</button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden bg-[#080808] hairline-t px-6 py-4 flex flex-col gap-4 mono text-xs tracking-[0.2em] text-white/70">
          <a href="#terminal" onClick={() => setOpen(false)}>RESEARCH</a>
          <a href="#terminal" onClick={() => setOpen(false)}>TERMINAL</a>
          <a href="#method" onClick={() => setOpen(false)}>METHODOLOGY</a>
          <a href="#cta" onClick={() => setOpen(false)} className="text-[#CDFF3D]">ENTER EQ-T →</a>
        </div>
      )}
    </header>
  );
}

// ---------- Section head ----------
export function Kicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mono text-[10px] tracking-[0.35em] text-white/40 mb-6">
      <span className="accent">{n}</span><span className="h-px w-12 bg-white/15" /><span>{label}</span>
    </div>
  );
}
