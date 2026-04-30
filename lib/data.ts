export type Project = {
  id: string
  name: string
  description: string
  techStack: string[]
  images: string[]
  githubUrl?: string
  liveUrl?: string | null
}

export const projects: Project[] = [
  {
    id: 'news-app',
    name: 'News AI App',
    description:
      'News platforms drown users in unfiltered content. I built a 4-agent AI pipeline using LangGraph that autonomously collects, classifies, summarizes, and bias-checks news articles in real-time. The system streams analysis via SSE and monetizes premium features through Solana-based crypto payments — processing 500+ articles daily with sub-second streaming latency.',
    techStack: [
      'Next.js',
      'FastAPI',
      'LangGraph',
      'GenAI',
      'SSE',
      'MongoDB',
      'JWT',
      'Solana'
    ],
    images: [
      '/images/projects/news-ai/news-app1.png',
      '/images/projects/news-ai/news-app-2.png',
      '/images/projects/news-ai/news-app-3.png',
      '/images/projects/news-ai/news-app-4.png'
    ],
    githubUrl: 'https://github.com/Atharva0506/news-app',
    liveUrl: 'https://newsai.atharvanaik.me/'
  },
  {
    id: 'nakama-ai',
    name: 'Nakama AI',
    description:
      'AI chatbots forget everything between sessions. I built Nakama AI — a companion platform where AI maintains persistent personality and memory across unlimited sessions using Pinecone vector search for semantic context recall. Users define custom behavior through instruction tuning, creating AI companions that actually remember who you are.',
    techStack: [
      'Next.js',
      'Node.js',
      'OpenAI API',
      'LLaMA-2',
      'Vector DB',
      'Pinecone'
    ],
    images: [
      '/images/projects/nakama-ai/nakama-ai-1.png',
      '/images/projects/nakama-ai/nakama-ai-2.png',
      '/images/projects/nakama-ai/nakama-ai-3.png',
      '/images/projects/nakama-ai/nakama-ai-4.png'
    ],
    githubUrl: 'https://github.com/Atharva0506/Nakama',
    liveUrl: 'https://nakama-taupe.vercel.app/'
  },

  {
    id: 'vscode-ai-assistant',
    name: 'VS Code AI Assistant (Internal)',
    description:
      'Developers at TCS spent 40% of their time searching internal documentation. I built a RAG-based VS Code extension using FastAPI and LangChain that searches 10,000+ internal docs with semantic understanding, reducing information lookup and debugging time by 35% across 200+ engineers.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Vector Databases'],
    images: [
      '/images/projects/vscode-ai/vscode-ai-assistant-1.png',
      '/images/projects/vscode-ai/vscode-ai-assistant-2.png'
    ],
    githubUrl: undefined,
    liveUrl: null
  }
]

import { Bot, Server, Layout, Cloud, Cpu, LucideIcon } from 'lucide-react'

export type SkillItem = {
  name: string
  level: 'advanced' | 'intermediate' | 'beginner'
}

export type SkillCategory = {
  items: SkillItem[]
  highlight?: boolean
  icon: LucideIcon
}

export const skills: Record<string, SkillCategory> = {
  'AI & LLM Engineering': {
    items: [
      { name: 'LangChain / LangGraph', level: 'advanced' },
      { name: 'RAG Systems', level: 'advanced' },
      { name: 'OpenAI / Gemini APIs', level: 'advanced' },
      { name: 'Vector DBs (ChromaDB, Pinecone)', level: 'intermediate' },
      { name: 'LLaMA Fine-Tuning', level: 'intermediate' }
    ],
    highlight: true,
    icon: Bot
  },
  'Backend Development': {
    items: [
      { name: 'Python', level: 'advanced' },
      { name: 'FastAPI', level: 'advanced' },
      { name: 'Node.js / Express', level: 'intermediate' },
      { name: 'REST API Design', level: 'advanced' },
      { name: 'SSE / WebSockets', level: 'intermediate' }
    ],
    highlight: true,
    icon: Server
  },
  'Frontend Development': {
    items: [
      { name: 'Next.js (App Router)', level: 'advanced' },
      { name: 'React.js', level: 'advanced' },
      { name: 'TypeScript', level: 'intermediate' },
      { name: 'Tailwind CSS', level: 'advanced' }
    ],
    highlight: true,
    icon: Layout
  },
  'Infrastructure & DevOps': {
    items: [
      { name: 'Docker', level: 'intermediate' },
      { name: 'AWS', level: 'beginner' },
      { name: 'CI/CD (GitHub Actions)', level: 'intermediate' },
      { name: 'PostgreSQL / MongoDB', level: 'intermediate' },
      { name: 'Git & GitHub', level: 'advanced' }
    ],
    highlight: true,
    icon: Cloud
  },
  'Blockchain & Web3': {
    items: [
      { name: 'Solidity', level: 'beginner' },
      { name: 'Ethereum', level: 'beginner' },
      { name: 'Solana', level: 'beginner' },
      { name: 'Smart Contracts', level: 'beginner' },
      { name: 'Web3.js / Ethers.js', level: 'intermediate' },
      { name: 'Hardhat / Foundry', level: 'beginner' },
      { name: 'MetaMask & Wallets', level: 'intermediate' }
    ],
    highlight: true,
    icon: Cpu
  }
}
