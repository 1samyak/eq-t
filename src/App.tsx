import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CursorFX, Loader, Navbar } from './components/chrome';
import Hero from './components/Hero';
import { EquityLayer, KnowledgeGraph, MethodStrip, Problem, ThesisEngine } from './components/Sections1';
import { Contradiction, Timeline, Valuation, WhatChanged } from './components/Sections2';
import { BuiltFor, FinalCTA, Footer, SearchDemo } from './components/Sections3';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDEA] antialiased">
      <AnimatePresence>{loading && <Loader done={() => setLoading(false)} />}</AnimatePresence>
      <CursorFX />
      <a href="#terminal" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-[#CDFF3D] focus:text-black focus:px-4 focus:py-2 mono text-xs">
        Skip to research terminal
      </a>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <EquityLayer />
        <ThesisEngine />
        <KnowledgeGraph />
        <MethodStrip />
        <Timeline />
        <WhatChanged />
        <Contradiction />
        <Valuation />
        <SearchDemo />
        <BuiltFor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
