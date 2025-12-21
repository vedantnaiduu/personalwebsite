'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HoverPeek } from '@/components/ui/link-preview';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { AnimatedText } from '@/components/ui/animated-shiny-text';
import Link from 'next/link';

export default function About() {
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null);

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
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <AnimatedText 
            text="About Me"
            gradientColors="linear-gradient(90deg, #ffffff, #3b82f6, #ffffff)"
            gradientAnimationDuration={4}
            hoverEffect={true}
            textClassName="text-6xl md:text-8xl font-bold tracking-tighter"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8 text-text-secondary leading-relaxed text-lg"
        >
          <p>
            I'm a Computer Science student at UMass Amherst, currently exploring the intersection of 
            machine learning, full-stack development, and computational biology. I've been fortunate 
            enough to work on some interesting projects, ranging from healthcare analytics to EEG foundation 
            models, and I'm always learning something new.
          </p>

          <p>
            Right now, I'm doing computational biology research at Stanford, where I'm building 
            pipelines that help identify promising candidates for experiments. I also spent some time 
            as an ML Research Fellow at Algoverse, working on evaluation systems. Before that, I 
            interned at QuickSoftPro, where I got to optimize some backend systems and learn a lot 
            about building production software.
          </p>

          <p>
            Lately, I've developed a deep passion for the art of building. There's something uniquely 
            satisfying about taking a conceptual idea and turning it into a tangible, functional product. 
            Whether it's an AI-driven maintenance tool or a healthcare monitoring system, I find myself 
            increasingly drawn to the process of creating solutions that bridge the gap between 
            sophisticated technology and real-world utility.
          </p>

          <p>
            When I'm not coding, you'll probably find me working on hackathon projects (I've been 
            lucky to win a few awards), scrolling through TikTok for way too long, or trying to 
            balance staying active with actually having a life. I'm still figuring things out, but 
            I'm enjoying the journey.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
              <h2 className="text-phi-2 md:text-4xl font-serif font-bold text-text-primary mb-6">Featured Projects</h2>
          <div className="space-y-4">
                <div className="liquid-glass p-6 hover:border-accent-blue/40 transition-all duration-500 rounded-2xl relative overflow-visible shadow-2xl">
              <GlowingEffect
                variant="blue"
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.3}
                borderWidth={2}
              />
              <div className="relative z-10">
                <p className="text-text-secondary mb-4">
                Check out some of my recent work:
              </p>
              <div className="flex flex-wrap gap-4">
                <HoverPeek
                  url="https://shipyardhq.tech/projects/8d32e889-dfad-45c4-9000-a09970cb6265"
                  peekWidth={320}
                  peekHeight={200}
                  enableLensEffect={true}
                >
                  <Link
                    href="https://shipyardhq.tech/projects/8d32e889-dfad-45c4-9000-a09970cb6265"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-accent-blue-light transition-colors underline decoration-dotted hover:decoration-solid"
                  >
                    Social Oracle
                  </Link>
                </HoverPeek>
                <span className="text-text-secondary">•</span>
                <HoverPeek
                  url="https://devpost.com/software/resi"
                  peekWidth={320}
                  peekHeight={200}
                  enableLensEffect={true}
                >
                  <Link
                    href="https://devpost.com/software/resi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-accent-blue-light transition-colors underline decoration-dotted hover:decoration-solid"
                  >
                    Resi
                  </Link>
                </HoverPeek>
                <span className="text-text-secondary">•</span>
                <HoverPeek
                  url="https://devpost.com/software/retrocare"
                  peekWidth={320}
                  peekHeight={200}
                  enableLensEffect={true}
                >
                  <Link
                    href="https://devpost.com/software/retrocare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:text-accent-blue-light transition-colors underline decoration-dotted hover:decoration-solid"
                  >
                    RetroCare
                  </Link>
                </HoverPeek>
              </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hobbies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
              <h2 className="text-phi-2 md:text-4xl font-serif font-bold text-text-primary mb-8">When I'm Not Coding</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pickleball */}
            <motion.div
              onHoverStart={() => setHoveredHobby('pickleball')}
              onHoverEnd={() => setHoveredHobby(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              className="liquid-glass p-8 hover:border-accent-blue/40 transition-all duration-500 cursor-pointer group relative overflow-visible rounded-2xl shadow-2xl"
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
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: hoveredHobby === 'pickleball' ? [0, -10, 10, -10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-4"
                >
                  🏓
                </motion.div>
                <h3 className="text-accent-blue font-bold text-lg mb-2">Pickleball</h3>
                <p className="text-text-secondary text-sm">
                  Trying to get better at this sport. Still working on my serve, but having fun with it.
                </p>
              </div>
            </motion.div>

            {/* Lifting Weights */}
            <motion.div
              onHoverStart={() => setHoveredHobby('weights')}
              onHoverEnd={() => setHoveredHobby(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              className="liquid-glass p-8 hover:border-accent-blue/40 transition-all duration-500 cursor-pointer group relative overflow-visible rounded-2xl shadow-2xl"
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
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    scale: hoveredHobby === 'weights' ? [1, 1.2, 1] : 1,
                    rotate: hoveredHobby === 'weights' ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl mb-4"
                >
                  💪
                </motion.div>
                <h3 className="text-accent-blue font-bold text-lg mb-2">Lifting Weights</h3>
                <p className="text-text-secondary text-sm">
                  Hitting the gym regularly. It's become a good way to clear my head and stay balanced.
                </p>
              </div>
            </motion.div>

            {/* TikTok */}
            <motion.div
              onHoverStart={() => setHoveredHobby('tiktok')}
              onHoverEnd={() => setHoveredHobby(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              className="liquid-glass p-8 hover:border-accent-blue/40 transition-all duration-500 cursor-pointer group relative overflow-visible rounded-2xl shadow-2xl"
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
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    y: hoveredHobby === 'tiktok' ? [0, -5, 0] : 0,
                    rotate: hoveredHobby === 'tiktok' ? [0, 15, -15, 0] : 0
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: hoveredHobby === 'tiktok' ? Infinity : 0,
                    repeatType: 'reverse'
                  }}
                  className="text-4xl mb-4"
                >
                  📱
                </motion.div>
                <h3 className="text-accent-blue font-bold text-lg mb-2">Scrolling TikTok</h3>
                <p className="text-text-secondary text-sm">
                  Probably spending too much time on here, but the algorithm knows me too well. No regrets.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
              <h2 className="text-phi-2 md:text-4xl font-serif font-bold text-text-primary mb-8">Education</h2>
              <div className="liquid-glass p-8 hover:border-accent-blue/40 transition-all duration-500 group relative rounded-2xl overflow-visible shadow-2xl">
            <GlowingEffect
              variant="blue"
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.3}
              borderWidth={2}
            />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-phi-1 text-text-primary font-bold mb-2">Bachelor of Science in Computer Science</h3>
                <p className="text-text-secondary">University of Massachusetts Amherst</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="text-accent-blue font-semibold">GPA: 4.0/4.0</span>
                <span className="text-text-secondary ml-4">Expected 2027</span>
              </div>
              </div>
              <p className="text-text-secondary mt-4">Relevant Coursework: Data Structures & Algorithms, OOP, C Programming, Computational Statistics</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
              <h2 className="text-phi-2 md:text-4xl font-serif font-bold text-text-primary mb-8">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="liquid-glass p-6 hover:border-accent-blue/40 transition-all duration-500 group relative rounded-2xl overflow-visible shadow-2xl">
              <GlowingEffect
                variant="blue"
                spread={30}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.4}
                borderWidth={2}
              />
              <div className="relative z-10">
                <h3 className="text-accent-blue font-bold text-lg mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JavaScript/TypeScript', 'SQL', 'Java', 'C++'].map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-white/5 text-accent-blue border border-white/10 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

                <div className="liquid-glass p-6 hover:border-accent-blue/40 transition-all duration-500 group relative rounded-2xl overflow-visible shadow-2xl">
              <GlowingEffect
                variant="blue"
                spread={30}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.4}
                borderWidth={2}
              />
              <div className="relative z-10">
                <h3 className="text-accent-blue font-bold text-lg mb-4">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'React Native', 'Next.js', 'FastAPI', 'Node.js/Express'].map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-white/5 text-accent-blue border border-white/10 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

                <div className="liquid-glass p-6 hover:border-accent-blue/40 transition-all duration-500 group relative rounded-2xl overflow-visible shadow-2xl">
              <GlowingEffect
                variant="blue"
                spread={30}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.4}
                borderWidth={2}
              />
              <div className="relative z-10">
                <h3 className="text-accent-blue font-bold text-lg mb-4">ML/AI</h3>
                <div className="flex flex-wrap gap-2">
                  {['PyTorch', 'scikit-learn', 'MLflow', 'GPT', 'Whisper', 'ElevenLabs'].map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-white/5 text-accent-blue border border-white/10 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

                <div className="liquid-glass p-6 hover:border-accent-blue/40 transition-all duration-500 group relative rounded-2xl overflow-visible shadow-2xl">
              <GlowingEffect
                variant="blue"
                spread={30}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.4}
                borderWidth={2}
              />
              <div className="relative z-10">
                <h3 className="text-accent-blue font-bold text-lg mb-4">Cloud/DB</h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS (Lambda, ECS)', 'Firebase', 'PostgreSQL', 'MongoDB', 'Supabase'].map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-white/5 text-accent-blue border border-white/10 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

                <div className="liquid-glass p-6 hover:border-accent-blue/40 transition-all duration-500 group relative rounded-2xl overflow-visible shadow-2xl">
              <GlowingEffect
                variant="blue"
                spread={30}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.4}
                borderWidth={2}
              />
              <div className="relative z-10">
                <h3 className="text-accent-blue font-bold text-lg mb-4">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub Actions', 'Docker', 'Jupyter', 'VS Code'].map((skill) => (
                    <span key={skill} className="px-3 py-1 text-sm bg-white/5 text-accent-blue border border-white/10 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

