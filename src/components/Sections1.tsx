import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowUpRight, BookOpen, Crosshair, Eye, FileSearch, Layers, Scale } from 'lucide-react';
import { BUSINESS_METRICS, COMPANY, PROBLEM_LIST, THESIS_NODES, FUNDS } from '../data/mockData';
import { CountUp, Kicker, Reveal, Spark } from './chrome';

// ---------- PROBLEM ----------
export function Problem() {
  return (
    <section className="relative py-28 md:py-40 hairline-t" aria-label="The problem">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Kicker n="01" label="WHY EQ-T EXISTS" />
        <Reveal>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] max-w-4xl">
            A stock price is simple.<br />
            <span className="text-white/35">Understanding the business isn't.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <div className="mono text-[11px] tracking-[0.2em]">
            {PROBLEM_LIST.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <div className="flex items-center justify-between py-3 hairline-b text-white/45 hover:text-white transition-colors group" data-hover>
                  <span>{p.toUpperCase()}</span>
                  <span className="text-white/20 group-hover:text-[#CDFF3D] mono">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <Reveal delay={0.2}>
              <p className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                EQ-T turns the noise<br />into a <span className="accent">research system.</span>
              </p>
              <p className="text-white/50 mt-5 max-w-sm leading-relaxed text-sm md:text-base">
                From financial data to conviction. Numbers tell the story — EQ-T helps you read it. No tips. No noise. Just structure.
              </p>
              <div className="mt-6 flex gap-8 mono">
                <div><div className="text-3xl font-bold tick"><CountUp to={20} decimals={0} suffix="+" /></div><div className="text-[10px] tracking-[0.25em] text-white/40 mt-1">YRS HISTORY</div></div>
                <div><div className="text-3xl font-bold tick"><CountUp to={4200} decimals={0} /></div><div className="text-[10px] tracking-[0.25em] text-white/40 mt-1">COMPANIES</div></div>
                <div><div className="text-3xl font-bold tick accent"><CountUp to={98} decimals={0} suffix="%" /></div><div className="text-[10px] tracking-[0.25em] text-white/40 mt-1">FILING COVERAGE</div></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- EQUITY LAYER ----------
export function EquityLayer() {
  const [tab, setTab] = useState<'BUSINESS' | 'VALUATION' | 'THESIS'>('BUSINESS');
  return (
    <section id="terminal" className="relative py-28 md:py-36 bg-[#080808] hairline-t overflow-hidden" aria-label="The equity layer">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Kicker n="02" label="THE EQUITY LAYER · LIVE MOCK" />
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter">THE EQUITY<br /><span className="text-stroke">LAYER.</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/50 max-w-sm text-sm md:text-base leading-relaxed">One screen. The business, the valuation, the thesis — with receipts. This is what institutional-grade looks like.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="thin-border bg-[#050505] grid lg:grid-cols-[1.5fr_1fr]">
            {/* left: main terminal */}
            <div className="p-6 md:p-10 hairline-b lg:hairline-b-0 lg:border-r border-white/10">
              <div className="flex items-center justify-between mono text-[10px] tracking-[0.25em] text-white/40">
                <span>EQ-T / {COMPANY.ticker} · {COMPANY.exchange}</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#CDFF3D] animate-pulse" />{COMPANY.updated}</span>
              </div>
              <div className="mt-6 flex items-end gap-4">
                <div className="text-4xl md:text-6xl font-black tracking-tighter tick">₹<CountUp to={1421.8} decimals={2} /></div>
                <div className="mono text-sm accent font-semibold mb-1.5 tick">+1.82%</div>
                <div className="mono text-[10px] text-white/35 mb-2 hidden sm:block">VOL 4.2M · MKT CAP ₹19.2T</div>
              </div>
              <div className="mt-4"><Spark data={[12,18,15,22,26,24,31,38,44,52,61]} w={520} h={64} /></div>

              <div className="flex gap-2 mt-8 mono text-[10px] tracking-[0.2em]" role="tablist" aria-label="Terminal tabs">
                {(['BUSINESS', 'VALUATION', 'THESIS'] as const).map((t) => (
                  <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                    className={`px-4 py-2 border transition-colors ${tab === t ? 'bg-[#CDFF3D] text-black border-[#CDFF3D] font-bold' : 'border-white/10 text-white/50 hover:text-white hover:border-white/25'}`}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-6 min-h-[220px]">
                {tab === 'BUSINESS' && (
                  <div className="grid sm:grid-cols-2 gap-px bg-white/10 thin-border">
                    {BUSINESS_METRICS.map((m) => (
                      <div key={m.label} className="bg-[#050505] p-5 hover:bg-[#0D0D0D] transition-colors" data-hover>
                        <div className="mono text-[10px] tracking-[0.25em] text-white/40">{m.label.toUpperCase()}</div>
                        <div className="text-2xl font-bold tick mt-1">{m.value}</div>
                        <div className="mono text-[10px] accent mt-1">{m.delta}</div>
                        <div className="mt-3"><Spark data={m.spark} w={180} h={28} /></div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'VALUATION' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 thin-border">
                    {[['P/E', '24.8x'], ['EV/EBITDA', '13.1x'], ['P/B', '2.4x'], ['FCF YLD', '2.1%'], ['ROCE', '14.8%'], ['ROE', '16.2%'], ['GROWTH', '11.6%'], ['MARGIN', '17.3%']].map(([k, v]) => (
                      <div key={k} className="bg-[#050505] p-5 text-center"><div className="mono text-[9px] tracking-[0.2em] text-white/40">{k}</div><div className="text-xl font-bold tick mt-1">{v}</div></div>
                    ))}
                  </div>
                )}
                {tab === 'THESIS' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="thin-border p-6 bg-[#0D0D0D]">
                    <div className="mono text-[10px] tracking-[0.25em] text-[#CDFF3D] mb-3">EQ-T THESIS · CONFIDENCE 74%</div>
                    <p className="text-sm md:text-base leading-relaxed text-white/80">Growth remains supported by Jio ARPU expansion and retail operating leverage. O2C funds the transition. Key risk: GRM softness vs management tone. <span className="text-white/40">Watch inventory + receivables divergence.</span></p>
                    <div className="mt-4 flex gap-2 mono text-[10px]">
                      <span className="border border-[#CDFF3D]/40 text-[#CDFF3D] px-2 py-1">SUPPORTS ×4</span>
                      <span className="border border-red-400/40 text-red-300 px-2 py-1">CONTRADICTIONS ×1</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* right: thesis rail */}
            <div className="p-6 md:p-10 bg-[#0A0A0A]">
              <div className="mono text-[10px] tracking-[0.3em] text-white/40 mb-5">THESIS CHECKLIST</div>
              {[
                ['Business understood', true], ['Priced-in mapped', true], ['Supports > contradicts', true], ['Management delivering', false], ['Invalidation set', true],
              ].map(([label, ok]) => (
                <div key={label as string} className="flex items-center justify-between py-3 hairline-b text-sm">
                  <span className="text-white/70">{label}</span>
                  <span className={`mono text-[10px] px-2 py-1 border ${ok ? 'text-[#CDFF3D] border-[#CDFF3D]/30' : 'text-amber-300 border-amber-300/30'}`}>{ok ? 'PASS' : 'WATCH'}</span>
                </div>
              ))}
              <div className="mt-6 thin-border p-4 mono text-[10px] leading-relaxed text-white/50">
                <div className="text-white/70 tracking-[0.2em] mb-2">▸ SOURCES</div>
                AR FY26 p.84 · Q2 Deck s.12<br />Concall 14 AUG 2026 · 1,204 filings
              </div>
              <a href="#thesis" className="mt-6 inline-flex items-center gap-2 mono text-[11px] tracking-[0.2em] text-black bg-[#CDFF3D] px-5 py-3 font-bold w-full justify-center" data-hover>
                OPEN THESIS ENGINE <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- THESIS ENGINE ----------
export function ThesisEngine() {
  const [active, setActive] = useState(4);
  return (
    <section id="thesis" className="py-28 md:py-36 hairline-t" aria-label="Thesis engine">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-12">
        <div>
          <Kicker n="03" label="THESIS ENGINE · THE DIFFERENTIATOR" />
          <Reveal>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.95]">
              Don't just ask what the company does.<br />
              <span className="accent">Ask what would make the thesis wrong.</span>
            </h2>
          </Reveal>
          <div className="mt-8 space-y-0" role="list">
            {THESIS_NODES.map((n, i) => (
              <Reveal key={n.id} delay={Math.min(i * 0.03, 0.3)}>
                <button onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-4 py-3 border-l-2 pl-5 transition-all ${active === i ? 'border-[#CDFF3D] bg-white/[0.03]' : 'border-white/10 hover:border-white/30'}`}
                  aria-expanded={active === i}>
                  <span className={`mono text-[10px] w-7 ${active === i ? 'accent' : 'text-white/30'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`mono text-[11px] md:text-xs tracking-[0.15em] ${active === i ? 'text-white font-semibold' : 'text-white/45'}`}>{n.q}</span>
                  {active === i && <motion.span layoutId="thesis-dot" className="ml-auto w-2 h-2 bg-[#CDFF3D] shrink-0" />}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24 h-fit">
          <Reveal>
            <div className="thin-border bg-[#0D0D0D] p-8 md:p-10 relative overflow-hidden" aria-live="polite">
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden"><div className="h-full w-1/3 bg-[#CDFF3D]" style={{ animation: 'scan 2.4s linear infinite' }} /></div>
              <div className="mono text-[10px] tracking-[0.3em] accent mb-2">{THESIS_NODES[active].tag}</div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">{THESIS_NODES[active].q}</h3>
              <motion.p key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-4 text-white/70 leading-relaxed text-sm md:text-base">
                {THESIS_NODES[active].a}
              </motion.p>
              <div className="mt-6 flex items-center gap-3 mono text-[10px] text-white/35">
                <BookOpen size={13} /> CITED: AR FY26 · CONCALL Q2 · FILING #1182
              </div>
              <div className="mt-8 grid grid-cols-3 gap-px bg-white/10 border border-white/10">
                {[['SUPPORTS', '4', '#CDFF3D'], ['AGAINST', '1', '#FF5D5D'], ['WATCH', '5', '#A8E6FF']].map(([k, v, c]) => (
                  <div key={k} className="bg-[#050505] p-4 text-center"><div className="text-2xl font-black tick" style={{ color: c }}>{v}</div><div className="mono text-[9px] tracking-[0.25em] text-white/40 mt-1">{k}</div></div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="mt-4 flex items-center gap-2 mono text-[10px] tracking-[0.2em] text-white/35">
            <AlertTriangle size={12} className="text-amber-300" /> EQ-T IS RESEARCH, NOT ADVICE. CHALLENGE EVERYTHING.
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- KNOWLEDGE GRAPH ----------
export function KnowledgeGraph() {
  return (
    <section className="py-28 md:py-40 bg-[#080808] hairline-t relative overflow-hidden" aria-label="Understand the business">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 text-center">
        <Kicker n="04" label="FIRST PRINCIPLES" />
        <Reveal>
          <h2 className="text-[11vw] md:text-8xl font-black tracking-tighter leading-[0.9]">
            PRICE IS THE OUTPUT.<br /><span className="accent">BUSINESS IS THE INPUT.</span>
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {FUNDS.map((f, i) => (
            <motion.span key={f}
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.08, borderColor: 'rgba(205,255,61,0.6)', color: '#fff' }}
              data-hover
              className={`mono text-[11px] tracking-[0.2em] px-5 py-3 thin-border cursor-default ${['ROCE', 'Cash Flow', 'Management'].includes(f) ? 'bg-[#CDFF3D] text-black font-bold border-[#CDFF3D]' : 'bg-black/40 text-white/60'}`}>
              {f.toUpperCase()}
            </motion.span>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center gap-8 mono text-[10px] tracking-[0.25em] text-white/40">
            <span className="flex items-center gap-2"><Eye size={13} /> SEE BEYOND THE PRICE</span>
            <span className="flex items-center gap-2"><FileSearch size={13} /> RESEARCH THE BUSINESS</span>
            <span className="hidden sm:flex items-center gap-2"><Crosshair size={13} /> UNDERSTAND THE EQUITY</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MethodStrip() {
  return (
    <section id="method" className="hairline-t py-16" aria-label="Methodology">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <Layers size={20} className="accent" />
          <p className="mono text-[11px] tracking-[0.2em] text-white/60">METHODOLOGY: HISTORY → CONTEXT → CLAIMS → CONTRADICTIONS → VALUATION → THESIS</p>
        </div>
        <a href="#ask" className="mono text-[11px] tracking-[0.2em] text-white/60 hover:text-white flex items-center gap-2" data-hover>READ THE METHOD <Scale size={14} /></a>
      </div>
    </section>
  );
}
