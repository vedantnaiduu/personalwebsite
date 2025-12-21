'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { AnimatedGradient } from '@/components/ui/animated-gradient-with-svg';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

const experiences = [
  {
    title: 'Computational Biology Researcher',
    company: 'Stanford University - Optic Nerve Regeneration Lab',
    location: 'Stanford, CA / Remote',
    period: 'Sep 2025 – Present',
    description: [
      'Constructed a pipeline that filtered 3,000+ protein interaction records down to 12 OCRL candidates using graph algorithms, embedding models, and structural features for follow-up experiments',
      'Developed an ESM-2 + OpenFold workflow that ranks adaptor proteins by predicted impact on optic-nerve degeneration and regeneration, guiding wet-lab prioritization',
      'Standardized scoring, validation, and data-integration modules, filtering out 95% of low-signal candidates and raising confidence in final rankings by an estimated 5–7x before wet-lab validation cycles',
    ],
    technologies: ['Python', 'ESM-2', 'OpenFold', 'Graph Algorithms', 'Embedding Models'],
  },
  {
    title: 'Machine Learning Research Fellow',
    company: 'Algoverse - Applied ML on EEG Foundation Models',
    location: 'Remote',
    period: 'Jun 2025 – Nov 2025',
    description: [
      'Engineered a NeuroLM evaluation pipeline in PyTorch + MLflow with shared data loaders and configs, cutting setup for new EEG tasks from about 1 day of ad-hoc scripts to under 30 min per task',
      'Analyzed per-subject AUROC, F1, and calibration metrics for 3 EEG datasets (100+ recordings), surfacing 10–15% performance gaps between subjects and sessions for model and data-collection reviews',
      'Executed 50+ classifier-head experiments on frozen NeuroLM embeddings, comparing zero-shot and few-shot training and selecting the configuration now used as the team\'s internal benchmark',
    ],
    technologies: ['PyTorch', 'MLflow', 'Python', 'EEG Analysis', 'Machine Learning'],
  },
  {
    title: 'Software Development Intern',
    company: 'QuickSoftPro - Healthcare Analytics',
    location: 'Seattle, WA',
    period: 'Jun 2025 – Aug 2025',
    description: [
      'Expanded clinician analytics endpoints (Node.js/Express, PostgreSQL) for new patient-trend dashboards, adding indexed filters and server-side pagination to cut average load times by about 30% for high-traffic care-manager views',
      'Optimized cohort reporting queries by profiling slow joins, adding composite indexes, and introducing cached aggregates, reducing multi-minute cohort reports to sub-second responses used in weekly care-review meetings',
      'Automated an integration test suite and GitHub Actions CI/CD for ETL and analytics services, validating 60+ endpoints on each push and cutting manual release time from about 30 min to under 5 min per release',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'GitHub Actions', 'Docker'],
  },
];

export default function Experience() {
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
            text="Experience"
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
          My professional journey and the experiences that have shaped my career in software
          development.
        </motion.p>

        <ExperienceTimeline experiences={experiences} />
      </div>
    </section>
  );
}

