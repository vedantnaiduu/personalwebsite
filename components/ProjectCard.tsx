'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HoverPeek } from '@/components/ui/link-preview';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface ProjectCardProps {
  title: string;
  award?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  image?: string;
  imageAlt?: string;
  link?: string;
  github?: string;
  index: number;
}

export default function ProjectCard({
  title,
  award,
  description,
  highlights,
  technologies,
  image,
  imageAlt,
  link,
  github,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative liquid-glass p-8 h-full hover:border-accent-blue/40 transition-all duration-500 overflow-visible rounded-2xl shadow-2xl">
        <GlowingEffect
          variant="blue"
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.3}
          borderWidth={2}
        />
        {/* Geometric border effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent-blue" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent-blue" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent-blue" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent-blue" />
        </div>

        {/* Image */}
        {image && (
          <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-xl border border-white/10 group-hover:border-accent-blue/30 transition-all duration-500 shadow-inner">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {award && (
            <div className="mb-3">
              <span className="text-xs text-accent-blue/80 font-semibold uppercase tracking-wider">{award}</span>
            </div>
          )}
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-text-primary mb-4">{title}</h3>
          <p className="text-text-secondary mb-6 leading-relaxed text-base">{description}</p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {highlights.map((highlight, i) => (
                <li key={i} className="text-text-secondary text-xs flex items-start">
                  <span className="text-accent-blue mr-2 mt-1">▹</span>
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-accent-blue/10 text-accent-blue border border-accent-blue/20 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-6">
            {link && (
              <HoverPeek
                url={link}
                peekWidth={320}
                peekHeight={200}
                enableLensEffect={true}
                className="inline-flex"
              >
                <Link
                  href={link}
                  className="px-6 py-2.5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold text-sm rounded-xl hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 flex items-center gap-2 group/link"
                >
                  Visit
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      strokeLineCap="round"
                      strokeLineJoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </motion.svg>
                </Link>
              </HoverPeek>
            )}
            {github && (
              <Link
                href={github}
                className="px-6 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 text-white/70 font-semibold text-sm rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                GitHub
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 via-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

