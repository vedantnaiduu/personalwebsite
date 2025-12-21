'use client';

import { motion } from 'framer-motion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

const experiences = [
  {
    title: 'Computational Biology Researcher',
    company: 'Stanford University - Optic Nerve Regeneration Lab',
    location: 'Stanford, CA / Remote',
    period: 'Sep 2025 – Present',
    description: [
      'Constructed a pipeline that filtered 3,000+ protein interaction records down to 12 OCRL candidates using graph algorithms and embedding models',
      'Developed an ESM-2 + OpenFold workflow that ranks adaptor proteins by predicted impact on optic-nerve degeneration',
      'Standardized scoring and validation modules, raising confidence in final rankings by an estimated 5–7x'
    ],
    technologies: ['Python', 'ESM-2', 'OpenFold', 'Graph Algorithms', 'Embeddings'],
  },
  {
    title: 'Machine Learning Research Fellow',
    company: 'Algoverse - Applied ML on EEG Foundation Models',
    location: 'Remote',
    period: 'Jun 2025 – Nov 2025',
    description: [
      'Engineered a NeuroLM evaluation pipeline in PyTorch + MLflow, cutting setup for new EEG tasks from 1 day to under 30 min',
      'Analyzed per-subject AUROC, F1, and calibration metrics for 3 EEG datasets surfacing performance gaps for review',
      'Executed 50+ classifier-head experiments on frozen NeuroLM embeddings, comparing zero-shot and few-shot configurations'
    ],
    technologies: ['PyTorch', 'MLflow', 'Python', 'EEG Analysis', 'Machine Learning'],
  },
  {
    title: 'Software Development Intern',
    company: 'QuickSoftPro - Healthcare Analytics',
    location: 'Seattle, WA',
    period: 'Jun 2025 – Aug 2025',
    description: [
      'Expanded clinician analytics endpoints for patient-trend dashboards, adding indexed filters and server-side pagination',
      'Optimized cohort reporting queries by profiling slow joins and adding composite indexes, reducing reports to sub-second responses',
      'Automated an integration test suite and GitHub Actions CI/CD for ETL and analytics services'
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'GitHub Actions', 'Docker'],
  },
];

export default function Experience() {
  return (
    <section className="min-h-screen py-32 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header Cell */}
        <div className="border border-blue-500/20 bg-black p-8 md:p-16 mb-16 relative text-center group">
          <h1 className="text-huge leading-none py-0 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%_auto] group-hover:animate-[shimmer_3s_linear_infinite] transition-all">
            Experience
          </h1>
          
          <div className="mt-4 font-mono text-xs text-blue-500 uppercase tracking-widest">
            Professional journey and research history.
          </div>
        </div>

        <ExperienceTimeline experiences={experiences} />

      </div>
    </section>
  );
}
