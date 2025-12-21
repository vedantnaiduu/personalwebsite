'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

export default function Contact() {
  return (
    <section className="min-h-screen py-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Cell */}
        <div className="border border-blue-500/20 bg-black p-8 md:p-16 mb-16 relative overflow-hidden text-center">
          <div className="absolute -right-20 -top-20 text-[20rem] font-black text-blue-600/5 select-none pointer-events-none">
            @
          </div>
          
          <AnimatedText 
            text="CONTACT"
            className="py-0"
            textClassName="text-huge leading-none py-0"
          />
          
          <div className="mt-4 mx-auto font-serif text-xl md:text-2xl italic opacity-70 max-w-xl">
            &quot;For collaborations, inquiries, or technical discourse, use the terminal below or reach out via direct channels.&quot;
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-blue-500/20 border border-blue-500/20">
          
          {/* Form Cell */}
          <div className="lg:col-span-8 p-8 md:p-12 bg-black">
            <ContactForm />
          </div>

          {/* Social Links Cell */}
          <div className="lg:col-span-4 bg-black border-l border-blue-500/20 divide-y divide-blue-500/20">
            
            <Link 
              href="mailto:vedantsnaidu@gmail.com"
              className="group block p-10 hover:bg-blue-600/5 transition-colors"
            >
              <div className="font-mono text-[10px] text-blue-500 uppercase mb-4">[ EMAIL ]</div>
              <div className="text-xl font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                vedantsnaidu<br />@gmail.com
              </div>
            </Link>

            <Link 
              href="https://linkedin.com/in/vedant-naidu"
              target="_blank"
              className="group block p-10 hover:bg-blue-600/5 transition-colors"
            >
              <div className="font-mono text-[10px] text-blue-500 uppercase mb-4">[ LINKEDIN ]</div>
              <div className="text-xl font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                vedant-naidu
              </div>
            </Link>

            <Link 
              href="https://github.com/vedantnaiduu"
              target="_blank"
              className="group block p-10 hover:bg-blue-600/5 transition-colors"
            >
              <div className="font-mono text-[10px] text-blue-500 uppercase mb-4">[ GITHUB ]</div>
              <div className="text-xl font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                vedantnaiduu
              </div>
            </Link>

            <div className="p-10 font-mono text-[10px] opacity-30 uppercase space-y-2">
              <div>{`// LATENCY: 24MS`}</div>
              <div>{`// ENCRYPTION: AES-256`}</div>
              <div>{`// STATUS: STANDBY`}</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
