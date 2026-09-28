import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, MessagesSquare, Landmark } from 'lucide-react';
import { Magnetic, Reveal } from './chrome';

const PRICE = [12,18,15,26,22,34,30,44,40,55,50,66,60,78,72,90,84,102,96,118,110,132,126,148];

function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    let raf = 0; let t = 0;
    const resize = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      cv.width = r.width * devicePixelRatio; cv.height = r.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize(); window.addEventListener('resize', resize);
    // particles flowing toward center node
    const P = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(), s: Math.random() * 1.6 + 0.4, v: Math.random() * 0.0016 + 0.0006,
    }));
    const draw = () => {
      t += 0.008;
      const W = cv.width / devicePixelRatio, H = cv.height / devicePixelRatio;
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.72, cy = H * 0.46;
      // faint links to center
      P.forEach((p) => {
        p.x += p.v; if (p.x > 1.05) { p.x = -0.05; p.y = Math.random(); }
        const x = p.x * W, y = p.y * H + Math.sin(t * 2 + p.x * 9) * 10;
        const dx = cx - x, dy = cy - y;
        const d = Math.hypot(dx, dy);
        if (d < W * 0.42) {
          ctx.strokeStyle = `rgba(205,255,61,${(1 - d / (W * 0.42)) * 0.14})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(cx, cy); ctx.stroke();
        }
        ctx.fillStyle = d < 60 ? 'rgba(205,255,61,0.9)' : 'rgba(255,255,255,0.35)';
        ctx.beginPath(); ctx.arc(x, y, p.s, 0, 7); ctx.fill();
      });
      // center pulse
      const pr = 8 + Math.sin(t * 3) * 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      g.addColorStop(0, 'rgba(205,255,61,0.28)'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 70, 0, 7); ctx.fill();
      ctx.fillStyle = '#050505'; ctx.strokeStyle = '#CDFF3D'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, 22, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#CDFF3D'; ctx.font = '700 10px JetBrains Mono'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('EQ', cx, cy + 0.5);
      // pulse ring
      ctx.strokeStyle = `rgba(205,255,61,${0.5 - (t % 1) * 0.5})`;
      ctx.beginPath(); ctx.arc(cx, cy, pr + (t % 1) * 46, 0, 7); ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}

function PriceLine() {
  const w = 900, h = 220;
  const max = Math.max(...PRICE), min = Math.min(...PRICE);
  const pts = PRICE.map((p, i) => `${(i / (PRICE.length - 1)) * w},${h - ((p - min) / (max - min)) * (h - 30) - 10}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="pl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CDFF3D" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#CDFF3D" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
      ))}
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#pl)" />
      <motion.polyline points={pts} fill="none" stroke="#CDFF3D" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 1 }} />
      <motion.circle r="5" fill="#CDFF3D" className="glow-dot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}>
        <animateMotion dur="6s" repeatCount="indefinite" path={`M${pts.split(' ').join(' L')}`} />
      </motion.circle>
    </svg>
  );
}

const FLOATERS = [
  { k: 'ROCE', v: '31.7%', x: '6%', y: '18%', d: 0 },
  { k: 'FCF', v: '₹842 Cr', x: '12%', y: '68%', d: 0.6 },
  { k: 'P/E', v: '24.8x', x: '82%', y: '22%', d: 0.3 },
  { k: 'MARGIN', v: '18.2%', x: '86%', y: '66%', d: 0.9 },
  { k: 'REVENUE', v: '+18.4%', x: '44%', y: '8%', d: 0.4 },
];

const FLOW = ['RAW MARKET DATA', 'FINANCIAL STATEMENTS', 'FILINGS', 'MANAGEMENT COMMENTARY', 'MARKET PRICE', 'EQ-T', 'UNDERSTANDING'];
const TAPE = ['RELIANCE +1.82%', 'ROCE 14.8%', 'FCF ₹61.2B', 'P/E 24.8x', 'JIO ARPU ₹204', 'RETAIL MARGIN 8.1%', 'THESIS WATCH 05', 'FILINGS PARSED 1,204'];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-noise">
      <div className="hero-frame" aria-hidden />
      <div className="scan-line" aria-hidden />
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 40%, rgba(205,255,61,0.06), transparent 70%), radial-gradient(ellipse 60% 45% at 20% 80%, rgba(168,230,255,0.045), transparent 70%)' }} aria-hidden />
      <div className="absolute inset-0"><HeroCanvas /></div>
      <div className="absolute top-20 left-0 right-0 z-10 tape-mask mono text-[9px] tracking-[0.18em] text-white/35" aria-label="Illustrative market tape">
        <div className="tape">
          {[...TAPE, ...TAPE].map((item, i) => (
            <span key={`${item}-${i}`}><b className={i % 3 === 0 ? 'text-[#CDFF3D]' : 'text-white/55'}>{item.split(' ')[0]}</b>{item.slice(item.indexOf(' '))}</span>
          ))}
        </div>
      </div>

      {/* floating metric chips */}
      {FLOATERS.map((f) => (
        <motion.div key={f.k} className="absolute hidden lg:block mono text-[10px] z-10"
          style={{ left: f.x, top: f.y }}
          animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, delay: f.d, ease: 'easeInOut' }}>
          <div className="thin-border bg-[#0D0D0D]/80 backdrop-blur px-3 py-2">
            <div className="text-white/40 tracking-[0.25em]">{f.k}</div>
            <div className="accent font-semibold text-sm mt-0.5 tick">{f.v}</div>
          </div>
        </motion.div>
      ))}

      <motion.div style={{ y: yTitle, scale, opacity: fade }} className="relative z-20 max-w-[1400px] mx-auto w-full px-5 md:px-10 pt-36 md:pt-44 pb-10 flex-1 flex flex-col justify-center">
        <Reveal>
          <div className="mono text-[10px] md:text-[11px] tracking-[0.4em] text-white/45 flex flex-wrap items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#CDFF3D] animate-pulse glow-dot" />
            EQUITY INTELLIGENCE · RESEARCH SYSTEM
            <span className="hidden md:inline text-white/25">— NSE / BSE · 4,200 COMPANIES</span>
            <span className="ml-auto hidden xl:inline text-white/20">SYS 026 · SIGNAL 74 · IST</span>
          </div>
        </Reveal>
        <h1 className="font-black leading-[0.88] tracking-tighter text-[17vw] sm:text-[13vw] lg:text-[9.5rem] xl:text-[11rem]">
          <span className="reveal-mask"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}>EQUITY,</motion.span></span>
          <span className="reveal-mask"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1.02, ease: [0.16, 1, 0.3, 1] }} className="text-stroke">DECODED<span className="accent" style={{ WebkitTextStroke: '0' }}>.</span></motion.span></span>
        </h1>
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end gap-10 justify-between">
          <Reveal delay={1.25}>
            <p className="text-white/60 text-base md:text-xl max-w-md leading-relaxed">
              Financial intelligence built to help you understand what the market is <span className="text-white">actually pricing.</span>
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Magnetic href="#terminal">Explore EQ-T</Magnetic>
              <a href="#method" className="mono text-[11px] tracking-[0.2em] text-white/60 hover:text-white hairline-b pb-1 transition-colors" data-hover>
                SEE THE METHODOLOGY →
              </a>
            </div>
          </Reveal>
          <Reveal delay={1.4} className="w-full lg:max-w-[520px]">
            <div className="data-bracket terminal-shadow thin-border bg-[#080808]/90 backdrop-blur-md p-4 md:p-5">
              <div className="flex items-center justify-between mono text-[10px] tracking-[0.2em] text-white/40 mb-3">
                <span className="flex items-center gap-2"><FileText size={12} /> RELIANCE · NSE</span>
                <span className="accent">+1.82% · ₹1,421.80</span>
              </div>
              <PriceLine />
              <div className="grid grid-cols-3 gap-px bg-white/[0.06] mt-3 mono text-[8px] tracking-[0.14em] text-white/35">
                <div className="bg-[#080808] px-2 py-2"><span className="block text-white/25">SIGNAL</span><b className="text-[#CDFF3D]">+0.74</b></div>
                <div className="bg-[#080808] px-2 py-2"><span className="block text-white/25">EVIDENCE</span><b className="text-white">04 / 05</b></div>
                <div className="bg-[#080808] px-2 py-2"><span className="block text-white/25">STATUS</span><b className="text-amber-300">WATCH</b></div>
              </div>
              <div className="flex items-center justify-between mt-3 mono text-[9px] tracking-[0.2em] text-white/35">
                <span className="flex items-center gap-1.5"><MessagesSquare size={11} /> 1,204 FILINGS PARSED</span>
                <span className="flex items-center gap-1.5"><Landmark size={11} /> THESIS: INTACT</span>
              </div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* data → understanding flow strip */}
      <div className="relative z-20 hairline-t bg-black/40 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4 flex items-center gap-3 overflow-x-auto whitespace-nowrap mono text-[10px] tracking-[0.25em] text-white/40" aria-label="Research pipeline">
          {FLOW.map((s, i) => (
            <span key={s} className="flex items-center gap-3 shrink-0">
              <span className={s === 'EQ-T' ? 'text-black bg-[#CDFF3D] px-2 py-1 font-bold' : s === 'UNDERSTANDING' ? 'text-white' : ''}>{s}</span>
              {i < FLOW.length - 1 && <ArrowDown size={11} className="rotate-[-90deg] text-white/25" />}
            </span>
          ))}
          <a href="#terminal" className="ml-auto hidden md:inline-flex items-center gap-2 text-white/50 hover:text-white shrink-0">SCROLL <ArrowUpRight size={12} className="rotate-[135deg] animate-bounce" /></a>
        </div>
      </div>
    </section>
  );
}
