'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HoverPeek } from '@/components/ui/link-preview';
import Link from 'next/link';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

export default function About() {
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null);

  return (
    <section className="min-h-screen py-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Cell */}
        <div className="border border-blue-500/20 bg-black p-8 md:p-16 mb-px text-center group">
          <h1 className="text-huge leading-none py-0 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%_auto] group-hover:animate-[shimmer_3s_linear_infinite] transition-all">
            About
          </h1>
          <div className="mt-4 font-mono text-xs text-blue-500 uppercase tracking-[0.3em]">
            Identity Verification: Vedant Naidu
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-blue-500/20 border-x border-b border-blue-500/20">
          
              {/* Main Bio Content */}
              <div className="md:col-span-8 p-8 md:p-16 bg-black">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-12 text-white/80 text-xl md:text-2xl leading-relaxed font-sans"
                >
                  <div className="space-y-6">
                    <p className="font-bold text-white text-3xl md:text-4xl tracking-tighter uppercase italic">
                      I just like building things.
                    </p>
                    <p>
                      There&apos;s a specific high you get from taking a conceptual idea and turning it into 
                      something tangible—a product that actually works and solves a real problem. That 
                      obsession with shipping is what drives everything I do.
                    </p>
                  </div>

                  <div className="relative p-8 md:p-12 border border-blue-500/20 bg-blue-500/5 group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 diagonal-hatching opacity-10" />
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-600" />
                    <p className="text-xl md:text-2xl leading-relaxed text-white relative z-10">
                      Right now, I&apos;m a CS student at UMass Amherst, spending most of my time at the 
                      intersection of <span className="text-blue-500 font-bold">Human Systems and AI</span>. 
                      I want to build tools that don&apos;t just exist in a lab, but actually augment how we 
                      interact with technology.
                    </p>
                  </div>

                  <div className="space-y-6 text-lg md:text-xl opacity-80">
                    <p>
                      Currently, I&apos;m doing computational biology research at Stanford, building pipelines 
                       to identify promising candidates for experiments. Before that, I was at Algoverse 
                      engineering evaluation systems for EEG foundation models.
                    </p>
                    <p>
                      Beyond the terminal, you&apos;ll probably find me on a pickleball court, at the gym 
                      trying to hit a new PR, or just scrolling through TikTok like everyone else.
                    </p>
                  </div>
                </motion.div>
              </div>

          {/* Sidebar / Metadata */}
          <div className="md:col-span-4 p-8 bg-black border-l border-blue-500/20 space-y-12">
            
            {/* Education Cell */}
            <div>
              <h3 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">Education</h3>
              <div className="space-y-4">
                <div className="text-xl font-bold uppercase tracking-tight">UMass Amherst</div>
                <div className="font-mono text-xs opacity-50">BS Computer Science</div>
                <div className="text-blue-500 font-bold">GPA: 4.0 / 4.0</div>
              </div>
            </div>

            {/* Hobbies / Personal */}
            <div>
              <h3 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">Personal</h3>
              <div className="space-y-2 text-lg opacity-70 font-sans">
                <p>— Pickleball</p>
                <p>— Heavy Lifting</p>
                <p>— Endless Scrolling</p>
              </div>
            </div>

            {/* Technical Stack */}
            <div>
              <h3 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'TS', 'PyTorch', 'Next.js', 'Kafka', 'Postgres'].map(tech => (
                  <span key={tech} className="px-2 py-1 border border-white/10 font-mono text-[9px] uppercase">{tech}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
