'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import SquigglyWave from '@/components/SquigglyWave';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

const projects = [
  {
    title: 'Social Oracle',
    description:
      'An AI-powered social discovery platform that transforms how people socialize and discover hidden gems within their city. Social Oracle leverages conversational AI, real-time prediction market data, and local forum insights to help users find personalized social experiences while connecting businesses with potential customers.',
    highlights: [
      'Built scalable backend with Apache Kafka for real-time message processing',
      'Integrated OpenAI GPT-4o-mini for language understanding',
      'Developed real-time data integration using Polymarket and Reddit MCP'
    ],
    technologies: ['Node.js', 'TypeScript', 'Next.js', 'Apache Kafka', 'OpenAI', 'Supabase', 'Polymarket'],
    image: '/images/projects/retrocare.png',
    link: 'https://shipyardhq.tech/projects/8d32e889-dfad-45c4-9000-a09970cb6265',
    github: '#',
  },
  {
    title: 'Resi',
    award: '🏆 Best Beginner Use of AI',
    description:
      'Resi is a voice-driven maintenance and residential life assistant for UMass. Students describe an issue on web, iOS, or Android; Resi transcribes it, classifies it, and creates a structured ticket. It routes tasks to Maintenance or RAs, assigns queue positions, and keeps everyone updated through a live dashboard.',
    highlights: [
      'Built Expo/React Native cross-platform app',
      'Node.js + Express backend with OpenAI Whisper',
      'Real-time queue assignment with Firebase'
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'Express', 'Whisper', 'GPT-4', 'Firebase'],
    image: '/images/projects/resi.png',
    link: 'https://devpost.com/software/resi',
    github: '#',
  },
  {
    title: 'RetroCare',
    award: '🏆 Best Healthcare Hack',
    description:
      'RetroCare reimagines the bedside nurse through AI calls that monitor seniors\' meds, mood, and safety, offering compassionate care and peace of mind. A full end-to-end AI calling loop with voice selection, scripted dialogue, medication logging, mood scoring, anomaly detection, and caregiver notification.',
    highlights: [
      'Expo Router + React Native UI',
      'VAPI webhooks + ElevenLabs previews',
      'Timezone-safe scheduler with retries'
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'VAPI', 'ElevenLabs', 'Supabase'],
    image: '/images/projects/social-oracle.png',
    link: 'https://devpost.com/software/retrocare',
    github: '#',
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen py-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Cell */}
        <div className="border border-blue-500/20 bg-black p-8 md:p-16 mb-16 relative text-center">
          <div className="absolute top-4 left-8 font-mono text-[10px] uppercase opacity-40">
            [ ARCHIVE: SELECTED_WORKS ]
          </div>
          
          <AnimatedText 
            text="PROJECTS"
            className="py-0"
            textClassName="text-huge leading-none py-0"
          />
          
          <div className="mt-4 max-w-xl mx-auto font-serif text-xl md:text-2xl opacity-70 italic">
            &quot;Engineering solutions at the intersection of complex data systems and human-centric interfaces.&quot;
          </div>
        </div>

        {/* Projects Grid */}
        <SquigglyWave className="mb-8" opacity={0.2} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-24 pt-12 border-t border-blue-500/20 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-30 font-mono text-[10px] uppercase">
          <div>// TOTAL_PROJECTS_LISTED: {projects.length}</div>
          <div>// LAST_UPDATED: 2025_12_21</div>
          <div>// REPOSITORY_STATUS: PUBLIC</div>
        </div>

      </div>
    </section>
  );
}
