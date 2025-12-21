'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

const projects = [
  {
    title: 'Social Oracle',
    award: undefined,
    description:
      'An AI-powered social discovery platform that transforms how people socialize and discover hidden gems within their city. Social Oracle leverages conversational AI, real-time prediction market data, and local forum insights to help users find personalized social experiences while connecting businesses with potential customers.',
    highlights: [
      'Built scalable backend with Apache Kafka for real-time message processing, handling SMS messages via Kafka streams with async data fetching and fire-and-forget techniques',
      'Integrated OpenAI GPT-4o-mini for language understanding and intent classification, overcoming challenges with context windows and token limits through innovative caching strategies',
      'Developed real-time data integration using Polymarket and Reddit MCP for market insights, enhancing query agent capabilities without blocking message processing',
      'Created comprehensive web interface with multi-step onboarding flow, advanced event creation tools, and analytics dashboard for business owners',
    ],
    technologies: ['Node.js', 'TypeScript', 'Next.js', 'Apache Kafka', 'OpenAI GPT-4o', 'Supabase', 'Polymarket', 'Reddit MCP', 'HeroUI', 'Recharts'],
    image: '/images/projects/retrocare.png',
    imageAlt: 'Social Oracle platform dashboard showing AI-powered recommendations',
    link: 'https://shipyardhq.tech/projects/8d32e889-dfad-45c4-9000-a09970cb6265',
    github: '#',
  },
  {
    title: 'Resi',
    award: '🏆 Best Beginner Use of AI - HackUMass',
    description:
      'Resi is a voice-driven maintenance and residential life assistant for UMass. Students describe an issue on web, iOS, or Android; Resi transcribes it, classifies it, and creates a structured ticket. It routes tasks to Maintenance or RAs, assigns queue positions, and keeps everyone updated through a live dashboard.',
    highlights: [
      'Built Expo/React Native cross-platform app (web, iOS, Android) with role-based navigation and voice recording with live feedback',
      'Node.js + Express backend with OpenAI Whisper for transcription and GPT-4-Turbo for ticket classification and conversational logic',
      'Real-time queue assignment and backfilling every 5s with Firebase Realtime Database and UMass-restricted Firebase Authentication',
      'Context-aware conversation system that asks clarifying questions before creating tickets, enabling maintenance requests in < 1 minute',
      'Shared RA/Maintenance dashboard with real-time updates, automated queue routing, and smart task distribution',
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'Express', 'OpenAI Whisper', 'GPT-4-Turbo', 'Firebase', 'TypeScript'],
    image: '/images/projects/resi.png',
    imageAlt: 'Resi voice-enabled maintenance assistant interface',
    link: 'https://devpost.com/software/resi',
    github: '#',
  },
  {
    title: 'RetroCare',
    award: '🏆 Best Healthcare Hack - HackRPI',
    description:
      'RetroCare reimagines the bedside nurse through AI calls that monitor seniors\' meds, mood, and safety, offering compassionate care and peace of mind. A full end-to-end AI calling loop with voice selection, scripted dialogue, medication logging, mood scoring, anomaly detection, and caregiver notification.',
    highlights: [
      'Expo Router + React Native UI with React Query, Zustand stores, and shared Supabase types keeping Mood, Meds, Calls, Flags, Sleep, and Today/Week views in sync',
      'Node/Express services integrate VAPI webhooks, ElevenLabs previews, and Supabase tables for patients, call logs, meds, health flags, and voice baselines',
      'Built timezone-safe scheduler with retries respecting each patient\'s call_schedule array, preventing DST offset issues',
      'Production-ready caregiver dashboard with mission-control view of every patient, including manual overrides like "Call Now" when AI detects concerns',
      'Six VAPI tools (storeDailyCheckIn, updateFlags, markMedicationStatus, logCallAttempt, notifyCaregiver, checkVoiceAnomaly) orchestrated reliably in order',
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'Express', 'VAPI', 'ElevenLabs', 'Supabase', 'TypeScript', 'React Query', 'Zustand'],
    image: '/images/projects/social-oracle.png',
    imageAlt: 'RetroCare caregiver dashboard showing patient monitoring interface',
    link: 'https://devpost.com/software/retrocare',
    github: '#',
  },
];

export default function Projects() {
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
            text="Projects"
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
              Award-winning projects that solve real-world problems through innovative AI and full-stack solutions.
            </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

