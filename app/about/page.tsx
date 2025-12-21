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
        <div className="border border-blue-500/20 bg-black p-8 md:p-16 mb-px text-center">
          <AnimatedText 
            text="ABOUT"
            className="py-0"
            textClassName="text-huge leading-none py-0"
          />
          <div className="mt-4 font-mono text-xs text-blue-500 uppercase tracking-[0.3em]">
            [ IDENTITY_VERIFICATION: VEDANT_NAIDU ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-blue-500/20 border-x border-b border-blue-500/20">
          
          {/* Main Bio Content */}
          <div className="md:col-span-8 p-8 md:p-16 bg-black">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12 text-white/80 text-xl md:text-2xl font-serif leading-relaxed"
            >
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                I am a Computer Science student at UMass Amherst, currently exploring the intersection of 
                human systems and ai, full-stack development, and computational biology. I&apos;ve been fortunate 
                enough to work on projects ranging from healthcare analytics to EEG foundation models.
              </p>

              <div className="relative p-8 border border-blue-500/10 bg-blue-500/5 italic">
                &quot;Lately, I&apos;ve developed a deep passion for the art of building. There&apos;s something uniquely 
                satisfying about taking a conceptual idea and turning it into a tangible, functional product.&quot;
              </div>

              <p>
                Right now, I&apos;m doing computational biology research at Stanford, building 
                pipelines that help identify promising candidates for experiments. Previously, I was an 
                ML Research Fellow at Algoverse, focusing on NeuroLM evaluation systems.
              </p>
            </motion.div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="md:col-span-4 p-8 bg-black border-l border-blue-500/20 space-y-12">
            
            {/* Education Cell */}
            <div>
              <h3 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">[ 01_EDUCATION ]</h3>
              <div className="space-y-4">
                <div className="text-xl font-bold uppercase tracking-tight">UMass Amherst</div>
                <div className="font-mono text-xs opacity-50">BS Computer Science</div>
                <div className="text-blue-500 font-bold">GPA: 4.0 / 4.0</div>
              </div>
            </div>

            {/* Hobbies / Personal */}
            <div>
              <h3 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">[ 02_PERSONAL ]</h3>
              <div className="space-y-2 font-serif text-lg opacity-70">
                <p>— Pickleball</p>
                <p>— Heavy Lifting</p>
                <p>— Endless Scrolling</p>
              </div>
            </div>

            {/* Technical Stack */}
            <div>
              <h3 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-6">[ 03_CORE_STACK ]</h3>
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
