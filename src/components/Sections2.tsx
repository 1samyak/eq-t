import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Minus, Quote } from 'lucide-react';
import { QUARTERS, TIMELINE, VALUATION_METRICS } from '../data/mockData';
import { CountUp, Kicker, Reveal, Spark } from './chrome';

// ---------- TIMELINE ----------
export function Timeline() {
  const [active, setActive] = useState(4);
  const t = TIMELINE[active];
  return (
    <section className="py-28 md:py-36 hairline-t" aria-label="Research timeline">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Kicker n="05" label="HISTORY, NOT JUST THE LAST QUARTER" />
        <Reveal><h2 className="text-4xl md:text-7xl font-black tracking-tighter">SIXTEEN YEARS.<br /><span className="text-white/35">ONE CONTINUOUS STORY.</span></h2></Reveal>

        <div className="mt-12 flex gap-0 overflow-x-auto thin-border" role="tablist" aria-label="Years">
          {TIMELINE.map((y, i) => (
            <button key={y.year} role="tab" aria-selected={active === i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
              className={`flex-1 min-w-[120px] px-6 py-5 text-left border-r border-white/10 last:border-0 transition-colors ${active === i ? 'bg-[#CDFF3D] text-black' : 'bg-[#0A0A0A] text-white/50 hover:text-white'}`}>
              <div className="mono text-[10px] tracking-[0.25em] opacity-60">FY</div>
              <div className="text-2xl font-black tick">{y.year}</div>
              <div className={`mt-2 h-1 ${active === i ? 'bg-black/20' : 'bg-white/10'}`}><div className={`h-full ${active === i ? 'bg-black' : 'bg-[#CDFF3D]'}`} style={{ width: `${25 + i * 18}%` }} /></div>
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mt-px grid md:grid-cols-[1fr_1fr_1.2fr] gap-px bg-white/10 thin-border">
          <div className="bg-[#050505] p-8">
            <div className="mono text-[10px] tracking-[0.3em] text-white/40 mb-4">FINANCIALS · FY{t.year}</div>
            {[['Revenue', t.rev], ['ROCE', t.roce], ['EBITDA margin', t.margin]].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 hairline-b"><span className="text-white/50 text-sm">{k}</span><span className="font-bold tick">{v}</span></div>
            ))}
            <div className="mt-5"><Spark data={[10, 14, 12, 18, 22 + active * 4, 30 + active * 5]} w={260} h={48} /></div>
          </div>
          <div className="bg-[#0A0A0A] p-8">
            <div className="mono text-[10px] tracking-[0.3em] text-white/40 mb-4">WHAT HAPPENED</div>
            <p className="text-lg font-semibold leading-snug">{t.event}</p>
            <div className="mono text-[10px] text-white/35 mt-4">FILING INSIGHT · ANNUAL REPORT {t.year}</div>
            <p className="text-sm text-white/55 mt-2 leading-relaxed">Capex {active > 2 ? 'intensity inflecting' : 'in build phase'} · Leverage {active > 3 ? 'controlled' : 'elevated'} · Promoter holding stable at 50.3%.</p>
          </div>
          <div className="bg-[#0D0D0D] p-8 border-l-2 border-[#CDFF3D]">
            <Quote size={18} className="accent mb-3" />
            <p className="text-white/80 italic leading-relaxed">{t.quote}</p>
            <div className="mono text-[10px] tracking-[0.2em] text-white/35 mt-4">EQ-T VERDICT: {active >= 3 ? 'DELIVERED ✓' : 'PARTIAL ◐'} · TRACKED ACROSS {120 + active * 210} FILINGS</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- WHAT CHANGED ----------
export function WhatChanged() {
  const [q, setQ] = useState(2);
  const cur = QUARTERS[q];
  const Arrow = ({ d }: { d: string }) =>
    d.includes('↑↑') ? <ArrowUpRight className="text-[#CDFF3D]" size={18} /> :
    d.includes('↑') ? <ArrowUpRight className="text-[#CDFF3D]/70" size={16} /> :
    d.includes('↓↓') ? <ArrowDownRight className="text-red-400" size={18} /> :
    d.includes('↓') ? <ArrowDownRight className="text-red-400/70" size={16} /> :
    <Minus className="text-white/30" size={16} />;
  return (
    <section className="py-28 md:py-36 bg-[#080808] hairline-t" aria-label="What changed">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Kicker n="06" label="QUARTERLY EVOLUTION" />
        <Reveal><h2 className="text-5xl md:text-8xl font-black tracking-tighter">WHAT <span className="accent">CHANGED?</span></h2></Reveal>
        <div className="mt-12 grid lg:grid-cols-[1fr_1.4fr] gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-px bg-white/10 thin-border h-fit">
            {QUARTERS.map((x, i) => (
              <button key={x.q} onClick={() => setQ(i)} aria-pressed={q === i}
                className={`p-6 text-left transition-colors ${q === i ? 'bg-[#CDFF3D] text-black' : 'bg-[#050505] text-white/60 hover:bg-[#0D0D0D]'}`}>
                <div className="mono text-[10px] tracking-[0.25em] opacity-60">{x.q}</div>
                <div className="font-black text-lg mt-1">{x.note}</div>
                <div className="mono text-xs mt-2 tick">{x.revN} · {x.marN}</div>
              </button>
            ))}
          </div>
          <motion.div key={q} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="thin-border bg-[#050505] p-8 md:p-10">
            <div className="mono text-[10px] tracking-[0.3em] text-white/40">{cur.q} · DELTA vs PRIOR</div>
            <div className="mt-6 space-y-0">
              {[['Revenue', cur.rev, cur.revN], ['Margins', cur.margin, cur.marN], ['Debt', cur.debt, q >= 2 ? '-₹8,200 Cr' : 'flat'], ['Guidance', cur.guide, q >= 2 ? 'RAISED' : 'HELD']].map(([k, d, n]) => (
                <div key={k as string} className="flex items-center justify-between py-4 hairline-b">
                  <span className="text-white/60">{k}</span>
                  <span className="flex items-center gap-3"><span className="mono text-xs text-white/50 tick">{n}</span><Arrow d={d as string} /><span className="mono text-xs font-bold w-8">{d}</span></span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/55 leading-relaxed">EQ-T read: <span className="text-white">mix + tariff lifted margins 90bps; deleveraging accelerated.</span> Thesis intact — O2C leg weaker, Jio leg stronger.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------- CONTRADICTION ----------
export function Contradiction() {
  return (
    <section className="py-28 md:py-40 hairline-t relative overflow-hidden" aria-label="Contradiction engine">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
        <Kicker n="07" label="CONTRADICTION ENGINE" />
        <Reveal><h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95]">THE SIGNAL IS IN<br />THE <span className="text-stroke">CONTRADICTION.</span></h2></Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch text-left">
            <div className="thin-border bg-[#0D0D0D] p-8">
              <div className="mono text-[10px] tracking-[0.3em] text-white/40">MANAGEMENT SAYS · Q2 CALL</div>
              <p className="mt-4 text-2xl font-bold leading-snug">"Demand remains strong across segments."</p>
              <div className="mono text-[10px] text-white/30 mt-4">14 AUG 2026 · 42:18</div>
            </div>
            <div className="grid place-items-center">
              <div className="w-16 h-16 rounded-full bg-[#CDFF3D] text-black font-black grid place-items-center text-sm mono rotate-[-8deg]">VS</div>
            </div>
            <div className="thin-border bg-black p-8 border-t-2 !border-t-red-400/60">
              <div className="mono text-[10px] tracking-[0.3em] text-red-300">THE DATA SHOWS · FILED</div>
              <div className="mt-4 space-y-3 mono text-sm">
                {[['Volume growth', '-4.8%', true], ['Inventory', '+17%', true], ['Receivables', '+12%', true]].map(([k, v, bad]) => (
                  <div key={k as string} className="flex justify-between py-2 hairline-b"><span className="text-white/55">{k}</span><span className={bad ? 'text-red-300 font-bold tick' : 'tick'}>{v}</span></div>
                ))}
              </div>
              <div className="mono text-[10px] text-white/30 mt-4">AR FY26 · Q2 DECK s.9 · INV DAYS 41→48</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-10 mono text-[11px] tracking-[0.3em]"><span className="bg-[#CDFF3D] text-black px-3 py-1.5 font-bold">EQ-T SURFACES THE GAP</span></p>
          <p className="text-white/45 text-sm mt-5 max-w-lg mx-auto">Skeptical by design. Every claim is checked against filed numbers — before you have to ask.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- VALUATION ----------
export function Valuation() {
  return (
    <section className="py-28 md:py-36 bg-[#080808] hairline-t" aria-label="Valuation">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-12">
        <div>
          <Kicker n="08" label="VALUATION · RESEARCH, NOT ADVICE" />
          <Reveal><h2 className="text-4xl md:text-6xl font-black tracking-tighter">WHAT IS THE MARKET<br /><span className="text-white/35">ACTUALLY PRICING?</span></h2></Reveal>
          <div className="mt-10">
            <div className="flex justify-between mono text-[10px] tracking-[0.25em] text-white/40 mb-3"><span>CHEAP</span><span>FAIR</span><span>EXPENSIVE</span></div>
            <div className="relative h-1.5 bg-gradient-to-r from-[#CDFF3D]/40 via-white/20 to-red-400/50">
              <motion.div initial={{ left: '10%' }} whileInView={{ left: '62%' }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-[7px] w-5 h-5 rounded-full bg-[#CDFF3D] glow-dot border-2 border-black" />
            </div>
            <div className="mt-3 flex items-end gap-3"><span className="text-4xl font-black tick">24.8x</span><span className="mono text-[11px] text-white/40 mb-1.5">P/E · 62nd percentile of 10Y range</span></div>
            <p className="mono text-[10px] text-white/30 mt-4 tracking-[0.15em]">EQ-T DOES NOT SAY BUY OR SELL. IT SHOWS WHAT YOU PAY FOR — AND WHAT MUST HAPPEN TO JUSTIFY IT.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/10 thin-border h-fit">
          {VALUATION_METRICS.map((m, i) => (
            <div key={m.label} className="bg-[#050505] p-5">
              <div className="flex justify-between mono text-[9px] tracking-[0.2em] text-white/40"><span>{m.label.toUpperCase()}</span><span className="tick">{m.value}</span></div>
              <div className="mt-3 h-1 bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${m.pos}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.06 }} className="h-full bg-[#CDFF3D]" /></div>
              <div className="mono text-[9px] text-white/30 mt-2 tick"><CountUp to={m.pos} decimals={0} suffix="th %ile" /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
