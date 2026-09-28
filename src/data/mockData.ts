export const COMPANY = {
  name: 'Reliance Industries',
  ticker: 'RELIANCE',
  exchange: 'NSE',
  price: 1421.8,
  change: 1.82,
  currency: '₹',
  updated: '09:41 IST · 26 SEP 2026',
};

export const BUSINESS_METRICS = [
  { label: 'Revenue', value: '₹1.03T', delta: '+9.4% YoY', spark: [12,18,15,22,26,24,31,38] },
  { label: 'EBITDA', value: '₹178B', delta: '+7.1% YoY', spark: [10,14,13,17,19,18,22,26] },
  { label: 'ROCE', value: '14.8%', delta: '+120 bps', spark: [8,9,10,11,10,12,13,14.8] },
  { label: 'FCF', value: '₹61.2B', delta: '+18.2%', spark: [6,9,8,12,14,16,19,22] },
];

export const VALUATION_METRICS = [
  { label: 'P/E', value: '24.8x', pos: 62 },
  { label: 'EV / EBITDA', value: '13.1x', pos: 48 },
  { label: 'P/B', value: '2.4x', pos: 41 },
  { label: 'FCF Yield', value: '2.1%', pos: 34 },
  { label: 'ROCE', value: '14.8%', pos: 71 },
  { label: 'ROE', value: '16.2%', pos: 68 },
  { label: '5Y Growth', value: '11.6%', pos: 58 },
  { label: 'EBITDA Margin', value: '17.3%', pos: 55 },
];

export const THESIS_NODES = [
  { id: 'business', q: 'WHAT IS THE BUSINESS?', a: 'Refining + retail + digital. Three cash engines, one balance sheet. Jio is the compounder; retail is the grinder; O2C funds both.', tag: 'STRUCTURE · 3 SEGMENTS' },
  { id: 'pricing', q: 'WHAT IS THE MARKET PRICING IN?', a: 'Market prices 12% Jio ARPU CAGR + stable O2C. Implied FY28 EBITDA ₹228B. Any ARPU miss compresses the multiple first.', tag: 'EXPECTATIONS · CONSENSUS' },
  { id: 'thesis', q: 'WHAT IS THE THESIS?', a: 'Jio monetisation + retail operating leverage funds a 14–16% earnings CAGR without balance-sheet stress. ROCE inflects above 15%.', tag: 'CORE · 2-YR VIEW' },
  { id: 'supports', q: 'WHAT SUPPORTS IT?', a: 'Subscriber adds 42M YoY · Retail footfall +19% · Net debt/EBITDA 0.9x · Capex intensity falling post-5G rollout.', tag: 'EVIDENCE · 4 SIGNALS' },
  { id: 'contradicts', q: 'WHAT CONTRADICTS IT?', a: 'O2C GRM $9.1 vs $11.4 guide · Inventory +17% · Receivables +12% while volumes -4.8%. Demand commentary vs data gap.', tag: 'RISK · GAP DETECTED' },
  { id: 'promise', q: 'WHAT DID MANAGEMENT PROMISE?', a: '"Jio ARPU to cross ₹220 by H2 FY27. Retail EBITDA margin 8.5%. No major capex beyond $8B." — Q4 FY25 call.', tag: 'GUIDANCE · QUOTED' },
  { id: 'delivered', q: 'DID THEY DELIVER?', a: 'ARPU ₹204 (+6.2%). Retail margin 8.1% (40bps short). Capex $7.4B — on track. Score: 2 / 3 met.', tag: 'TRACK RECORD · 67%' },
  { id: 'changed', q: 'WHAT CHANGED?', a: 'Q2: margins +90bps on mix. Debt -₹8,200Cr. Guidance raised on Jio, held on O2C. Thesis intact, O2C leg weaker.', tag: 'Q2 FY26 DELTA' },
  { id: 'invalidates', q: 'WHAT INVALIDATES THE THESIS?', a: 'ARPU stall <₹210 for 2 quarters · Retail SSSG negative · Net debt/EBITDA >1.4x · GRM <$8 for full year.', tag: 'KILL CRITERIA · 4 LINES' },
  { id: 'watch', q: 'WHAT SHOULD YOU WATCH?', a: 'Monthly sub adds · GRM weekly · Inventory days · Jio tariff action · Insider holding (stable 50.3%).', tag: 'WATCHLIST · 5 ITEMS' },
];

export const TIMELINE = [
  { year: '2010', rev: '₹2.4T', roce: '11.2%', margin: '9.8%', event: 'Refining super-cycle. Jamnagar II stabilises.', quote: '"We will invest through the cycle." — AGM 2010' },
  { year: '2014', rev: '₹3.9T', roce: '10.4%', margin: '8.1%', event: 'Retail crosses 1,700 stores. Jio capex begins.', quote: '"Connectivity is a basic need." — AGM 2014' },
  { year: '2018', rev: '₹5.1T', roce: '11.8%', margin: '12.4%', event: 'Jio 215M subs. Petcoke gasification onstream.', quote: '"Jio has democratised data." — Q3 FY18 call' },
  { year: '2022', rev: '₹7.9T', roce: '12.9%', margin: '14.1%', event: 'O2C demerger filed. Retail ₹2T sales.', quote: '"We prioritise balance-sheet discipline." — FY22 AR' },
  { year: '2026', rev: '₹10.3T', roce: '14.8%', margin: '17.3%', event: 'Jio IPO filing. New energy capex $10B.', quote: '"ARPU expansion funds the next decade." — Q2 FY26' },
];

export const QUARTERS = [
  { q: 'Q4 FY25', rev: '↑', margin: '→', debt: '→', guide: '→', revN: '+6.2%', marN: '16.4%', note: 'O2C drags. Jio holds.' },
  { q: 'Q1 FY26', rev: '↑', margin: '↓', debt: '→', guide: '→', revN: '+7.8%', marN: '15.9%', note: 'RM inflation bites.' },
  { q: 'Q2 FY26', rev: '↑↑', margin: '↑', debt: '↓', guide: '↑', revN: '+9.4%', marN: '17.3%', note: 'Mix + tariff lift.' },
  { q: 'Q3 FY26E', rev: '→', margin: '↑', debt: '↓↓', guide: '↑', revN: '+8.1%E', marN: '17.8%E', note: 'Deleveraging accelerates.' },
];

export const SEARCH_QS = [
  'Why did margins fall in Q1?',
  'What changed this quarter?',
  'Is management delivering on guidance?',
  'What is the market pricing in?',
  'What contradicts the thesis?',
  'How has ROCE changed over 10 years?',
];

export const SEARCH_ANSWER = {
  title: 'Margins declined 21.4% → 18.7% in Q1, recovered to 17.3%* in Q2.',
  note: '*Blended EBITDA margin. O2C mix-adjusted.',
  drivers: [
    ['01', 'Raw material inflation', 'GRM compressed $11.4 → $9.1. Petchem spreads -180bps.'],
    ['02', 'Product mix', 'Lower-margin retail fuel mix up 340bps. Jio mix helped offset.'],
    ['03', 'Employee + network costs', '5G opex + headcount. Cost/sub flat — operating leverage intact.'],
  ],
  sources: ['Annual Report FY2026 · p.84', 'Q2 Investor Presentation · slide 12', 'Earnings Call Transcript · 14 Aug 2026'],
};

export const FUNDS = ['Revenue','Margins','Capital Allocation','Cash Flow','Debt','ROCE','Competition','Management','Valuation','Ownership'];

export const PROBLEM_LIST = [
  '20+ years of financial history',
  'Thousands of filings',
  'Quarterly results',
  'Management commentary',
  'Valuation data',
  'Ownership data',
  'Industry data',
  'Market behaviour',
];
