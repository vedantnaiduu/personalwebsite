'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import SquigglyWave from '@/components/SquigglyWave';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

const projects = [
  {
    title: 'Social Oracle',
    description:
      'Social Oracle is an AI-powered social discovery platform designed to transform how people socialize and discover hidden gems within their city. Leveraging conversational AI, real-time prediction market data from Polymarket, and local forum insights from Reddit, the platform helps users find personalized social experiences while connecting businesses with potential customers. It features a sophisticated agentic layer that processes incoming SMS messages via Apache Kafka, classifies user intent using OpenAI GPT-4o-mini, and generates contextually relevant suggestions. The business side includes a web-based dashboard for managing sales and tracking analytics, bridging the gap between social discovery and business growth.',
    highlights: [
      'Built a scalable backend with Apache Kafka for real-time, asynchronous message processing',
      'Integrated OpenAI GPT-4o-mini for natural language understanding and intent classification',
      'Developed real-time data integrations using Polymarket and Reddit MCP for market and community insights',
      'Optimized AI response times using async data fetching, caching, and fire-and-forget techniques'
    ],
    technologies: ['Node.js', 'TypeScript', 'Next.js', 'Apache Kafka', 'OpenAI', 'Supabase', 'Polymarket', 'Reddit MCP'],
    image: '/images/projects/social-oracle.png',
    link: 'https://shipyardhq.tech/projects/8d32e889-dfad-45c4-9000-a09970cb6265',
    github: 'https://github.com/TCYTseven/serieshax',
  },
  {
    title: 'Resi',
    award: 'Best Beginner Use of AI',
    awardType: 'hackathon-winner' as const,
    description:
      'Resi is a voice-driven maintenance and residential life assistant built for UMass students. It addresses the friction of outdated paper forms and phone calls by providing a familiar, voice-first interface for reporting dorm issues. Students describe their problem via web or mobile; Resi transcribes the audio using OpenAI Whisper, classifies the issue with GPT-4-Turbo, and automatically routes structured tickets to the appropriate maintenance or RA queues. The system features a real-time dashboard for facilities staff with automated queue management and backfilling every 5 seconds, ensuring a consistently up-to-date backlog of open tickets.',
    highlights: [
      'Architected a cross-platform Expo/React Native app with role-based navigation and voice recording',
      'Built a high-performance speech-to-text pipeline using OpenAI Whisper and GPT-4-Turbo',
      'Implemented real-time data synchronization and automated queue routing using Firebase',
      'Developed a shared RA/Maintenance dashboard with real-time updates and SLA-based escalation'
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'Express', 'Whisper', 'GPT-4', 'Firebase', 'TypeScript'],
    image: '/images/projects/resi.png',
    link: 'https://devpost.com/software/resi',
    github: 'https://github.com/RavjeetChahal/Resi',
  },
  {
    title: 'RetroCare',
    award: 'Best Healthcare Hack',
    awardType: 'hackathon-winner' as const,
    description:
      'RetroCare reimagines senior care through a scheduled AI-voice check-in service that monitors medication adherence, mood, and safety. The platform places daily automated calls to older adults, asking scripted health questions and logging responses into a longitudinal record for caregivers. It uses a custom microservice to convert call audio into embeddings, flagging abnormal sessions that suggest vocal fatigue or distress. The system orchestrates six complex VAPI tools—medication logging, mood scoring, anomaly detection, etc.—and notifies caregivers in under 10 seconds via a mission-control dashboard when concerns are detected.',
    highlights: [
      'Developed a full end-to-end AI calling loop with voice selection and scripted dialogue',
      'Engineered an audio anomaly detection service using signal processing and vector embeddings',
      'Built a timezone-safe scheduler with retries to ensure reliable patient check-ins across regions',
      'Created a production-ready caregiver mission-control dashboard using Expo Router and React Query'
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'VAPI', 'ElevenLabs', 'Supabase', 'TypeScript', 'React Query'],
    image: '/images/projects/retrocare.png',
    link: 'https://devpost.com/software/retrocare',
    github: 'https://github.com/RavjeetChahal/RetroCare',
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen py-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Cell */}
        <div className="border border-blue-500/20 bg-black p-8 md:p-16 mb-16 relative text-center group">
          <h1 className="text-huge leading-none py-0 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%_auto] group-hover:animate-[shimmer_3s_linear_infinite] transition-all">
            Projects
          </h1>
          
          <div className="mt-4 max-w-xl mx-auto text-xl md:text-2xl opacity-70 italic font-sans">
            Engineering solutions at the intersection of complex data systems and human-centric interfaces.
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
          <div>{`// TOTAL_PROJECTS_LISTED: ${projects.length}`}</div>
          <div>{`// LAST_UPDATED: 2025_12_21`}</div>
          <div>{`// REPOSITORY_STATUS: PUBLIC`}</div>
        </div>

      </div>
    </section>
  );
}
