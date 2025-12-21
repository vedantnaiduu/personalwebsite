'use client';

import { motion } from 'framer-motion';
import { Typewriter } from '@/components/ui/typewriter';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark">
      {/* Animated gradient background with blue colors */}
      <div className="absolute inset-0 z-0">
        <AnimatedGradient 
          colors={["#1E40AF", "#3B82F6", "#1D4ED8", "#2563EB", "#172554"]}
          speed={0.03}
          blur="heavy"
        />
        {/* Deep base gradient overlay */}
        <div className="absolute inset-0 bg-background-dark/40" />
      </div>

      {/* Grid pattern overlay - similar to the screenshot */}
      <div className="absolute inset-0 z-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Central glow beam - the "liquid glass" core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[400px] z-0 pointer-events-none">
        <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-y-50" />
        <div className="absolute top-1/2 left-0 w-full glow-line scale-x-150 opacity-60" />
      </div>

      {/* Main content */}
      <div className="relative z-20 px-6 max-w-7xl mx-auto pt-32 pb-20 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <AnimatedText 
            text="Vedant Naidu"
            gradientColors="linear-gradient(90deg, #ffffff, #3b82f6, #ffffff)"
            gradientAnimationDuration={4}
            hoverEffect={true}
            textClassName="text-7xl md:text-9xl font-bold tracking-tighter"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-4xl text-text-secondary mb-16 font-light tracking-wide max-w-4xl"
        >
          <div className="whitespace-pre-wrap leading-relaxed">
            <span>I'm a </span>
            <Typewriter
              text={[
                "Computer Science Student at UMass Amherst",
                "Computational Biology Researcher at Stanford",
                "Full-Stack Developer crafting innovative solutions",
                "Award-winning hackathon project builder",
                "Passionate builder of AI-powered products",
              ]}
              speed={70}
              className="text-accent-blue font-medium"
              waitTime={2000}
              deleteSpeed={40}
              cursorChar="|"
              initialDelay={500}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-16 text-text-secondary text-base font-medium"
        >
          <motion.a
            href="tel:+16463352994"
            whileHover={{ scale: 1.05, color: '#3b82f6' }}
            className="flex items-center gap-3 transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLineCap="round" strokeLineJoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            646-335-2994
          </motion.a>
          <motion.a
            href="mailto:vedantsnaidu@gmail.com"
            whileHover={{ scale: 1.05, color: '#3b82f6' }}
            className="flex items-center gap-3 transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLineCap="round" strokeLineJoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            vedantsnaidu@gmail.com
          </motion.a>
          <motion.a
            href="https://github.com/vedantnaiduu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, color: '#3b82f6' }}
            className="flex items-center gap-3 transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            github.com/vedantnaiduu
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/vedant-naidu"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, color: '#3b82f6' }}
            className="flex items-center gap-3 transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-white text-background-dark font-bold text-lg rounded-2xl hover:bg-accent-blue hover:text-white transition-all duration-300 shadow-xl"
          >
            View Projects →
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 liquid-glass text-text-primary font-bold text-lg rounded-2xl hover:border-accent-blue hover:text-accent-blue transition-all duration-300 shadow-xl"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Award badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          <div className="flex items-center gap-3 px-6 py-3 liquid-glass rounded-2xl">
            <span className="text-accent-blue text-xl">🏆</span>
            <span className="text-text-secondary text-sm font-semibold uppercase tracking-widest">Best Healthcare Hack</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 liquid-glass rounded-2xl">
            <span className="text-accent-blue text-xl">🏆</span>
            <span className="text-text-secondary text-sm font-semibold uppercase tracking-widest">Best Beginner Use of AI</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

