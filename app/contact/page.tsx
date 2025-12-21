'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

export default function Contact() {
  return (
    <section className="min-h-screen py-32 px-6 relative bg-background-dark">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatedGradient 
          colors={["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB"]}
          speed={0.08}
          blur="medium"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-background-dark/80 to-background-dark" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <AnimatedText 
            text="Get In Touch"
            gradientColors="linear-gradient(90deg, #ffffff, #3b82f6, #ffffff)"
            gradientAnimationDuration={4}
            hoverEffect={true}
            textClassName="text-6xl md:text-8xl font-bold tracking-tighter"
          />
        </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-secondary text-center mb-16 max-w-2xl mx-auto text-lg font-light leading-relaxed"
            >
              Have a project in mind or want to collaborate? I&apos;d love to hear from you. Send me a
              message and let&apos;s create something amazing together.
            </motion.p>

        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.a
            href="tel:+16463352994"
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center gap-3 p-6 liquid-glass group relative rounded-2xl overflow-visible shadow-lg hover:shadow-xl hover:shadow-accent-blue/10"
          >
            <GlowingEffect
              variant="blue"
              spread={30}
              glow={true}
              disabled={false}
              proximity={48}
              inactiveZone={0.4}
              borderWidth={2}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
              <span className="text-text-secondary group-hover:text-accent-blue transition-colors text-sm">646-335-2994</span>
            </div>
          </motion.a>
          
          <motion.a
            href="mailto:vedantsnaidu@gmail.com"
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center gap-3 p-6 liquid-glass group relative rounded-2xl overflow-visible shadow-lg hover:shadow-xl hover:shadow-accent-blue/10"
          >
            <GlowingEffect
              variant="blue"
              spread={30}
              glow={true}
              disabled={false}
              proximity={48}
              inactiveZone={0.4}
              borderWidth={2}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
              <span className="text-text-secondary group-hover:text-accent-blue transition-colors text-sm text-center">vedantsnaidu@gmail.com</span>
            </div>
          </motion.a>
          
          <motion.a
            href="https://github.com/vedantnaiduu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center gap-3 p-6 liquid-glass group relative rounded-2xl overflow-visible shadow-lg hover:shadow-xl hover:shadow-accent-blue/10"
          >
            <GlowingEffect
              variant="blue"
              spread={30}
              glow={true}
              disabled={false}
              proximity={48}
              inactiveZone={0.4}
              borderWidth={2}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <svg className="w-8 h-8 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
              <span className="text-text-secondary group-hover:text-accent-blue transition-colors text-sm">GitHub</span>
            </div>
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/vedant-naidu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center gap-3 p-6 liquid-glass group relative rounded-2xl overflow-visible shadow-lg hover:shadow-xl hover:shadow-accent-blue/10"
          >
            <GlowingEffect
              variant="blue"
              spread={30}
              glow={true}
              disabled={false}
              proximity={48}
              inactiveZone={0.4}
              borderWidth={2}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <svg className="w-8 h-8 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
              <span className="text-text-secondary group-hover:text-accent-blue transition-colors text-sm">LinkedIn</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
