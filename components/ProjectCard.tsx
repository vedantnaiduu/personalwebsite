'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HoverPeek } from '@/components/ui/link-preview';

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-black border border-blue-500/20 hover:border-blue-500 transition-colors flex flex-col h-full"
    >
      {/* Header Metadata */}
      <div className="border-b border-blue-500/20 px-4 py-2 flex items-center justify-between font-mono text-[9px] uppercase opacity-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-full diagonal-hatching opacity-20" />
        <span className="relative z-10">PRJ_{index < 9 ? `0${index + 1}` : index + 1}</span>
        {award && <span className="text-blue-500 font-bold relative z-10">{award}</span>}
      </div>

      {/* Image Cell */}
      {image && (
        <div className="relative aspect-[21/9] border-b border-blue-500/20 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden group/img">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover group-hover/img:scale-105 transition-transform duration-700"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="flex-1 p-5 md:p-6">
        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-3 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        
        <p className="font-serif text-sm leading-relaxed text-text-secondary mb-6 line-clamp-3">
          {description}
        </p>

        {/* Technologies Grid - More compact */}
        <div className="flex flex-wrap gap-1 mb-6">
          {technologies.slice(0, 5).map((tech) => (
            <div key={tech} className="border border-blue-500/10 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-white/40 bg-blue-500/5">
              {tech}
            </div>
          ))}
          {technologies.length > 5 && (
            <div className="px-2 py-1 font-mono text-[8px] uppercase text-white/20">
              +{technologies.length - 5} MORE
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto">
          {link && (
            <HoverPeek
              url={link}
              peekWidth={320}
              peekHeight={200}
              enableLensEffect={true}
              className="flex-1"
            >
              <Link
                href={link}
                target="_blank"
                className="w-full h-10 bg-white text-black font-bold uppercase text-[10px] flex items-center justify-center tracking-widest hover:bg-blue-600 hover:text-white transition-all"
              >
                Launch Site
              </Link>
            </HoverPeek>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              className="w-10 h-10 border border-blue-500/20 flex items-center justify-center hover:border-blue-500 transition-colors bg-black"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </Link>
          )}
        </div>
      </div>

      {/* Footer Metadata */}
      <div className="border-t border-blue-500/20 px-6 py-2 font-mono text-[8px] opacity-30 flex justify-between">
        <span>DATA_SOURCE: GITHUB_API</span>
        <span>DEPLOY_TARGET: GH_PAGES</span>
      </div>
    </motion.div>
  );
}
