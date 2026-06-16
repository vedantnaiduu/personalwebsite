export type SocialLink = {
  readonly label: string;
  readonly href: string;
};

export type Identity = {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly github: string;
  readonly linkedin: string;
  readonly spotify: string;
  readonly locationVibe: string;
  readonly resumePdf: string;
  readonly positioning: string;
};

export type Education = {
  readonly school: string;
  readonly degree: string;
  readonly expected: string;
  readonly location: string;
  readonly relevantCoursework: readonly string[];
};

export type Experience = {
  readonly role: string;
  readonly organization: string;
  readonly location: string;
  readonly dates: string;
  readonly bullets: readonly string[];
};

export type Project = {
  readonly id: string;
  readonly title: string;
  readonly githubUrl: string;
  readonly demoUrl?: string;
  readonly award?: string;
  readonly outcome: string;
  readonly underTheHood: string | null;
  readonly stack: readonly string[];
};

export type SkillGroup = {
  readonly label: string;
  readonly skills: readonly string[];
};

export type AboutContent = {
  readonly voice: readonly string[];
  readonly personalityFacts: readonly string[];
};

export const identity = {
  name: "Vedant Naidu",
  email: "vedantsnaidu@gmail.com",
  phone: "646-335-2994",
  github: "https://github.com/vedantnaiduu",
  linkedin: "https://linkedin.com/in/vedant-naidu/",
  spotify: "https://open.spotify.com/user/vedantnaidu",
  locationVibe: "UMass Amherst / Boston / Bay Area",
  resumePdf: "/Vedant_Naidu_Resume.pdf",
  positioning: "AI engineer building agentic & RAG systems that ship to real users.",
} as const satisfies Identity;

export const socialLinks = [
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Spotify", href: identity.spotify },
  { label: "Email", href: `mailto:${identity.email}` },
  { label: "Resume", href: identity.resumePdf },
] as const satisfies readonly SocialLink[];

export const education = {
  school: "University of Massachusetts Amherst",
  degree: "BS Computer Science",
  expected: "Expected 2027",
  location: "Amherst, MA",
  relevantCoursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Computer System Principles",
    "Computer Architecture",
    "Computational Statistics",
    "Human-Centered Design",
  ],
} as const satisfies Education;

export const experience = [
  {
    role: "Artificial Intelligence Intern",
    organization: "Commonwealth of Massachusetts (DPH/EOHHS)",
    location: "Boston, MA",
    dates: "Jan 2026 - Present",
    bullets: [
      "Shipped a production RAG chatbot adopted by 351 Massachusetts health departments that cut regulatory lookup from 8+ minutes to under 30 seconds, handling 500+ inspector queries/week with zero hallucinated citations.",
      "Engineered a hybrid BM25 + KNN retrieval pipeline over 14 CMR regulatory PDFs on Amazon Bedrock + OpenSearch Serverless, validated against a curated LLM eval benchmark at 94% retrieval precision, with inline-cited responses via the Claude (Anthropic) API.",
      "Provisioned full AWS infra via CDK across 7 stacks (VPC isolation, Bedrock Knowledge Bases, private API Gateway, DynamoDB interaction logging, Amplify SSR frontend) with 99.9% uptime.",
    ],
  },
  {
    role: "Computational Biology Researcher",
    organization: "Stanford University (Optic Nerve Regeneration Lab)",
    location: "Stanford, CA / Remote",
    dates: "Sep 2025 - Dec 2025",
    bullets: [
      "Built a Python automation pipeline processing 3,000+ protein-interaction records, surfacing 12 high-confidence wet-lab candidates while cutting the experimental search space by 99.6%.",
      "Integrated graph-centrality signals with sequence-embedding similarity into a unified ranking framework that eliminated 95% of low-signal candidates before costly wet-lab cycles.",
      "Automated the full scoring + data-integration workflow into a reproducible pipeline that re-runs complete candidate selection on any new database snapshot in under 10 minutes.",
    ],
  },
] as const satisfies readonly Experience[];

export const projects: readonly Project[] = [
  {
    id: "voice-maintenance-agent",
    title: "Voice Maintenance Agent",
    githubUrl: "https://github.com/RavjeetChahal/Resi",
    award: "Best Use of AI, HackUMass",
    outcome:
      "Agentic voice system - students call a number, describe an issue in plain speech, an LLM agent classifies urgency and autonomously routes each ticket to Maintenance or RA teams; generated a 100+ person waitlist after live demos.",
    underTheHood:
      "Firebase real-time dashboard surfacing live ticket-position updates without polling; targeted a 40% reduction in staff processing time in a production-deployed cross-platform app.",
    stack: ["LLM agent", "speech/voice", "Firebase", "real-time", "cross-platform"],
  },
  {
    id: "real-time-social-discovery-agent",
    title: "Real-Time Social Discovery Agent",
    githubUrl: "https://github.com/TCYTseven/serieshax",
    outcome:
      "Multi-step agentic SMS automation tying live Reddit city-subreddit sentiment, Polymarket prediction-market odds, and Supabase venue data into one LLM context window, routing replies across 7 intent-classified response types for personalized recommendations.",
    underTheHood:
      "End-to-end latency under 500 ms via concurrent async context assembly, in-memory caching of Polymarket/Reddit responses, and per-user rate limiting on a Kafka consumer group.",
    stack: ["LLM agents", "Kafka", "Supabase", "Reddit", "Polymarket", "async"],
  },
  {
    id: "elderly-health-monitoring-agent",
    title: "Elderly Health Monitoring Agent",
    githubUrl: "https://github.com/RavjeetChahal/RetroCare",
    award: "Best Healthcare Hack, HackRPI",
    outcome:
      "Agentic platform that autonomously calls elderly patients on a schedule, holds a natural multi-turn conversation to track medication adherence + mood, and writes structured results to Supabase with 98% call-completion reliability.",
    underTheHood:
      "Detects voice-health deterioration via per-call cosine similarity against a per-patient healthy-voice embedding, alerting caregivers within 10 seconds when similarity crosses a 0.40 emergency threshold.",
    stack: ["voice agents", "embeddings", "Supabase", "scheduling"],
  },
  {
    id: "jestify",
    title: "Jestify",
    githubUrl: "https://github.com/Nakul-Rajpal/Jestify",
    outcome:
      "AI platform where students upload course notes/slides, pick a persona (e.g., SpongeBob), and receive a fully animated explainer video of that character teaching the concept in its own voice and personality.",
    underTheHood:
      "Multi-step generation pipeline - Claude (Anthropic) API writes character-voiced scripts, ManimCE renders per-scene animations, Qwen3-TTS synthesizes audio, FFmpeg composites the final video; every job dispatched async via a Celery/Redis worker queue.",
    stack: ["Claude API", "ManimCE", "Qwen3-TTS", "FFmpeg", "Celery", "Redis"],
  },
  {
    id: "autonomous-infrastructure-detection",
    title: "Autonomous Infrastructure Detection",
    githubUrl: "https://github.com/Nakul-Rajpal/HackBrown-Kavi",
    outcome:
      "Real-time drone road-inspection pipeline (Meta SAM3 + Gemini Vision API) classifying pavement damage by severity at under 100 ms inference, fusing DJI SRT telemetry with per-frame detections and surfacing reverse-geocoded hazards on a Next.js/Leaflet dashboard at sub-200 ms latency.",
    underTheHood: null,
    stack: ["SAM3", "Gemini Vision", "Next.js", "Leaflet", "geospatial"],
  },
] as const;

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C++", "C", "SQL", "HTML/CSS"],
  },
  {
    label: "Frameworks",
    skills: [
      "React",
      "Next.js",
      "Node.js/Express",
      "FastAPI",
      "React Native",
      "Tailwind CSS",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    label: "Tools & Infra",
    skills: [
      "AWS (CDK, Lambda, Bedrock, OpenSearch, DynamoDB, Amplify, S3)",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "MongoDB",
      "Docker",
      "Git",
      "GitHub Actions",
      "Kafka",
    ],
  },
  {
    label: "AI/ML",
    skills: [
      "LLMs (OpenAI & Anthropic APIs)",
      "Agentic Workflows",
      "Multi-Agent Systems",
      "RAG Pipelines",
      "Prompt Engineering",
      "LLM Evals",
      "Amazon Bedrock",
      "Computer Vision",
      "Whisper",
      "scikit-learn",
    ],
  },
] as const satisfies readonly SkillGroup[];

export const about = {
  voice: [
    "I like building things that make it past the demo table and into real workflows.",
    "Right now I am optimizing for agentic systems, RAG, and AI that helps people move faster at work without making them babysit the software.",
    "Off the laptop, I am usually playing pickleball, chasing a gym PR, feeding the Spotify widget with the next house set, or watching Suits.",
  ],
  personalityFacts: [
    "Loves building things that ship to real users.",
    "Optimizing next for agentic systems and AI that augments how people work.",
    "Plays pickleball regularly.",
    "Gym/PRs.",
    "House music, festivals, and live shows.",
    "Loves TV shows and is currently watching Suits.",
  ],
} as const satisfies AboutContent;
