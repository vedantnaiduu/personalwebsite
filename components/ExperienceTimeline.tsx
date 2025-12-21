'use client';

import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  technologies?: string[];
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto px-6">
      {/* Vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-blue/20 transform md:-translate-x-1/2" />

      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`relative mb-12 ${
            index % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:pl-0' : 'md:pl-[calc(50%+2rem)] md:pr-0'
          }`}
        >
          {/* Timeline node */}
          <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent-blue rounded-full border-4 border-background-dark transform md:-translate-x-1/2 -translate-x-1/2 top-2 z-10" />

          {/* Content card */}
          <div className="ml-16 md:ml-0 liquid-glass p-8 hover:border-accent-blue/40 transition-all duration-500 relative group rounded-2xl overflow-visible shadow-2xl">
            <GlowingEffect
              variant="blue"
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.3}
              borderWidth={2}
            />
            {/* Geometric accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <h3 className="text-xl md:text-2xl text-accent-blue font-bold leading-tight mb-1">{exp.title}</h3>
                  <p className="text-text-primary font-semibold">{exp.company}</p>
                  {exp.location && (
                    <p className="text-text-secondary text-sm mt-1">{exp.location}</p>
                  )}
                </div>
                <span className="text-text-secondary text-sm mt-1 md:mt-0 whitespace-nowrap">{exp.period}</span>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-text-secondary text-sm flex items-start">
                    <span className="text-accent-blue mr-2">▹</span>
                    {item}
                  </li>
                ))}
              </ul>

              {exp.technologies && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-white/5 text-accent-blue border border-white/10 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

