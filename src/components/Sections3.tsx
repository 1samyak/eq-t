import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Compass, FlaskConical, Search, ShieldAlert } from 'lucide-react';
import { SEARCH_ANSWER, SEARCH_QS } from '../data/mockData';
import { Kicker, Magnetic, Reveal } from './chrome';

// ---------- SEARCH ----------
export function SearchDemo() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState('');
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(SEARCH_QS[qi]); return; }
    setTyped('');
    const full = SEARCH_QS[qi];
    let i = 0;
    const id = setInterval(() => {
      i += 2; setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 36);
    return () => clearInterval(id);
  }, [qi]);
  useEffect(() => {
    const id = setInterval(() => setQi((v) => (v + 1) % SEARCH_QS.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="ask" className="py-28 md:py-36 hairline-t" aria-label="Ask EQ-T">
      <div className="max-w-[1000px] mx-auto px-5 md:px-10">
        <div className="text-center">
          <Kicker n="09" label="ASK ANYTHING · CITED ANSWERS" />
          <Reveal><h2 className="text-4xl md:text-6xl font-black tracking-tighter">ASK EQ-T <span className="text-white/30">ANYTHING.</span></h2></Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10 thin-border bg-[#0D0D0D]">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 md:p-6 text-left" aria-label="Ask EQ-T">
              <Search size={18} className="accent shrink-0" />
              <span className="mono text-sm md:text-base text-white/80 truncate">{typed}<span className="accent animate-pulse">▍</span></span>
              <span className="ml-auto mono text-[10px] text-white/30 hidden sm:block">↵ ANALYSE</span>
            </button>
            <div className="flex flex-wrap gap-2 px-5 md:px-6 pb-5">
              {SEARCH_QS.map((q, i) => (
                <button key={q} onClick={() => { setQi(i); setOpen(true); }}
                  className={`mono text-[10px] tracking-[0.12em] px-3 py-1.5 border transition-colors ${i === qi ? 'border-[#CDFF3D]/60 text-[#CDFF3D]' : 'border-white/10 text-white/40 hover:text-white'}`}>
                  {q.toUpperCase()}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {open && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden hairline-t">
                  <div className="p-6 md:p-8 bg-black/40">
                    <div className="mono text-[10px] tracking-[0.3em] accent mb-3">EQ-T ANALYSIS · 3 SOURCES</div>
                    <h3 className="text-lg md:text-2xl font-bold tracking-tight">{SEARCH_ANSWER.title}</h3>
                    <p className="mono text-[10px] text-white/35 mt-1">{SEARCH_ANSWER.note}</p>
                    <div className="mt-6 space-y-4">
                      {SEARCH_ANSWER.drivers.map(([n, h, d]) => (
                        <div key={n} className="flex gap-4">
                          <span className="mono accent text-xs font-bold">{n}</span>
                          <div><div className="font-semibold text-sm">{h}</div><div className="text-white/50 text-sm mt-0.5">{d}</div></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 hairline-t">
                      <div className="mono text-[10px] tracking-[0.25em] text-white/40 mb-2">SOURCES</div>
                      {SEARCH_ANSWER.sources.map((s) => (
                        <div key={s} className="mono text-[11px] text-white/60 py-1 flex items-center gap-2"><span className="w-1 h-1 bg-[#CDFF3D]" />{s}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- BUILT FOR ----------
export function BuiltFor() {
  const cols = [
    { icon: Compass, t: 'DISCOVER', d: 'Find what matters across 4,200 companies. Screen on business quality, not just price moves.' },
    { icon: FlaskConical, t: 'UNDERSTAND', d: 'Connect financial data with business context. History, filings, commentary — one thesis.' },
    { icon: ShieldAlert, t: 'CHALLENGE', d: 'Test the thesis against contradictory evidence. Know what would prove you wrong.' },
  ];
  return (
    <section className="py-24 md:py-32 bg-[#080808] hairline-t" aria-label="Built for researchers">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Kicker n="10" label="BUILT FOR RESEARCHERS" />
        <div className="grid md:grid-cols-3 gap-px bg-white/10 thin-border">
          {cols.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="bg-[#050505] p-8 md:p-10 h-full hover:bg-[#0C0C0C] transition-colors group" data-hover>
                <c.icon size={22} className="accent mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black tracking-tight">{c.t}</h3>
                <p className="text-white/50 text-sm leading-relaxed mt-3">{c.d}</p>
                <div className="mono text-[10px] text-white/25 mt-6">0{i + 1} — EQ-T</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FINAL CTA ----------
export function FinalCTA() {
  return (
    <section id="cta" className="relative py-32 md:py-48 bg-black hairline-t overflow-hidden text-center" aria-label="Enter EQ-T">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(205,255,61,0.09), transparent 70%)' }} aria-hidden />
      <div className="relative max-w-[1100px] mx-auto px-5">
        <Reveal><p className="mono text-[10px] tracking-[0.4em] text-white/40 mb-8">FROM FINANCIAL DATA TO CONVICTION</p></Reveal>
        <Reveal>
          <h2 className="font-black tracking-tighter leading-[0.88] text-[13vw] md:text-8xl">
            STOP LOOKING<br />AT THE PRICE.<br />
            <span className="accent">START UNDERSTANDING<br />THE EQUITY.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center"><Magnetic href="#top">Enter EQ-T</Magnetic></div>
          <div className="mono text-[10px] tracking-[0.35em] text-white/35 mt-10">EQ-T.COM<br /><span className="text-white/25">A SARETY COMPANY</span></div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
export function Footer() {
  return (
    <footer className="hairline-t bg-[#050505]" aria-label="Footer">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 grid md:grid-cols-[1.5fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 grid place-items-center bg-[#CDFF3D] text-black mono text-[11px] font-bold">EQ</span>
            <span className="font-black text-lg tracking-tighter">EQ-T</span>
          </div>
          <p className="text-white/40 text-sm mt-4 max-w-xs leading-relaxed">The intelligence layer for equity research. Numbers tell the story — EQ-T helps you read it.</p>
          <p className="mono text-[10px] text-white/25 mt-4 tracking-[0.2em]">© 2026 EQ-T · A SARETY COMPANY</p>
        </div>
        <nav className="mono text-[11px] tracking-[0.2em] text-white/50 space-y-3" aria-label="Footer">
          {[['Research', '#terminal'], ['Terminal', '#terminal'], ['Methodology', '#method'], ['Ask EQ-T', '#ask'], ['Enter', '#cta']].map(([l, h]) => (
            <a key={l} href={h} className="block hover:text-white transition-colors">{l.toUpperCase()}</a>
          ))}
        </nav>
        <div className="mono text-[10px] leading-relaxed text-white/30">
          NOT INVESTMENT ADVICE.<br /><br />
          All data shown is illustrative mock data for design demonstration. EQ-T provides research structure, not recommendations. Market data delayed. <a href="#top" className="underline hover:text-white inline-flex items-center gap-1">eq-t.com <ArrowUpRight size={10} /></a>
        </div>
      </div>
      <div className="hairline-t">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4 flex justify-between mono text-[9px] tracking-[0.3em] text-white/25">
          <span>EQUITY, DECODED.</span><span className="hidden sm:inline">SARETY · EQ-T · 2026</span><span>NSE · BSE</span>
        </div>
      </div>
    </footer>
  );
}
