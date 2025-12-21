'use client';

import { motion } from 'framer-motion';
import { Typewriter } from '@/components/ui/typewriter';
import Link from 'next/link';
import SystemLog from '@/components/SystemLog';
import SquigglyWave from '@/components/SquigglyWave';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

export default function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-10">
      {/* Structural Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-blue-500/20 border border-blue-500/20">
        
        {/* Massive Title Cell */}
        <div className="col-span-full md:col-span-12 p-8 md:p-16 bg-black flex flex-col justify-end min-h-[50vh] relative overflow-hidden border-b border-blue-500/20 group">
          <div className="absolute inset-0 diagonal-hatching opacity-5" />
          
          <div className="relative z-10 text-left -ml-4 md:-ml-8">
            <h1 className="text-huge leading-[0.8] py-0 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%_auto] group-hover:animate-[shimmer_3s_linear_infinite] transition-all">
              Vedant<br />Naidu
            </h1>
          </div>
          
          <div className="absolute bottom-4 right-8 hidden md:block">
            <SystemLog />
          </div>
        </div>

        {/* Info Cell 1: Bio */}
        <div className="col-span-full md:col-span-8 p-8 md:p-12 bg-black border-r border-blue-500/20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl"
          >
            <SquigglyWave className="mb-6 h-6" opacity={0.15} />
                <p className="font-sans text-2xl md:text-3xl leading-tight mb-8 font-bold">
                  CS student at UMass Amherst. Building tools at the intersection of Human Systems and AI.
                </p>
            
            <div className="font-mono text-xs uppercase tracking-widest text-blue-500">
              <Typewriter
                text={[
                  "COMPUTATIONAL BIOLOGY",
                  "HUMAN SYSTEMS AND AI",
                  "FULL-STACK ENGINEERING"
                ]}
                speed={50}
                className="font-bold"
                waitTime={3000}
                deleteSpeed={30}
                cursorChar="_"
              />
            </div>
          </motion.div>
        </div>

        {/* Info Cell 2: Quick Links / Personal */}
        <div className="col-span-full md:col-span-4 p-8 md:p-12 bg-black flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 diagonal-hatching opacity-10" />
          
          <div className="space-y-4 relative z-10">
            <Link href="/projects" className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-blue-500 transition-colors">
              <span className="font-mono text-xs opacity-50">01</span>
              <span className="font-bold uppercase tracking-tighter text-xl">Projects</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
            <Link href="/about" className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-blue-500 transition-colors">
              <span className="font-mono text-xs opacity-50">02</span>
              <span className="font-bold uppercase tracking-tighter text-xl">About</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
            <Link href="/contact" className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-blue-500 transition-colors">
              <span className="font-mono text-xs opacity-50">03</span>
              <span className="font-bold uppercase tracking-tighter text-xl">Contact</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="mt-8 font-mono text-[10px] space-y-1 opacity-40">
            <div>VEDANT NAIDU © 2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}
