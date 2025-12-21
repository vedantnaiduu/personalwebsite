'use client';

import { motion } from 'framer-motion';

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
    <div className="relative max-w-5xl mx-auto px-4">
      {/* Structural Divide */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-blue-500/20 transform md:-translate-x-1/2" />

      <div className="space-y-px bg-blue-500/20 border border-blue-500/20">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12 bg-black overflow-hidden"
          >
            {/* Date/Period Cell */}
            <div className="md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-blue-500/20 flex flex-col justify-center">
              <span className="font-mono text-[10px] text-blue-500 mb-2 uppercase tracking-widest">
                {exp.period}
              </span>
            </div>

            {/* Content Cell */}
            <div className="md:col-span-9 p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-blue-500">
                    {exp.company} <span className="opacity-30">|</span> {exp.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {exp.description.map((item, i) => (
                  <li key={i} className="font-sans text-lg text-white/70 flex items-start">
                    <span className="text-blue-600 mr-4 font-mono text-sm mt-1">[{i+1}]</span>
                    {item}
                  </li>
                ))}
              </ul>

              {exp.technologies && (
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 font-mono text-[9px] uppercase border border-blue-500/20 text-blue-500/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
