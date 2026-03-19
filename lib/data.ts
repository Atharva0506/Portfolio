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
        description: 'A next-generation AI news platform using multiple agents to aggregate, classify, summarize, and analyze news in real-time. Features a Deep Analysis pipeline (Collector → Classifier → Summarizer → Bias Analyzer) using LangGraph, streaming results via SSE. Includes a daily briefing system, RAG-based AI Chat Assistant, and premium subscriptions with Solana-based payments.',
        techStack: ['Next.js', 'FastAPI', 'LangGraph', 'GenAI', 'SSE', 'MongoDB', 'JWT', 'Solana'],
        images: [
            '/images/projects/news-ai/news-app1.png',
            '/images/projects/news-ai/news-app-2.png',
            '/images/projects/news-ai/news-app-3.png',
            '/images/projects/news-ai/news-app-4.png',
        ],
        githubUrl: 'https://github.com/Atharva0506/news-app',
        liveUrl: 'https://newsai.atharvanaik.me/',
    },
    {
        id: 'nakama-ai',
        name: 'Nakama AI',
        description: 'A dynamic web platform for creating personalized AI companions. Users define instructions and conversations to shape long-term behavior. Built with a conversational AI system featuring persistent memory across sessions using vector databases for context recall. Powered by OpenAI and Meta LLaMA models.',
        techStack: ['Next.js', 'Node.js', 'OpenAI API', 'LLaMA-2', 'Vector DB', 'Pinecone'],
        images: [
            '/images/projects/nakama-ai/nakama-ai-1.png',
            '/images/projects/nakama-ai/nakama-ai-2.png',
            '/images/projects/nakama-ai/nakama-ai-3.png',
            '/images/projects/nakama-ai/nakama-ai-4.png',
        ],
        githubUrl: 'https://github.com/Atharva0506/Nakama',
        liveUrl: 'https://nakama-taupe.vercel.app/',
    },
    {
        id: 'blog-platform',
        name: 'Blog Platform',
        description: 'A full-featured blog platform supporting user authentication, blog creation, editing, deletion, and secure access control. Designed for scalability and clean content management.',
        techStack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
        images: [
            '/images/projects/blog-app/blog-app-1.png',
            '/images/projects/blog-app/blog-app-2.png',
        ],
        githubUrl: 'https://github.com/Atharva0506/Blog-Platform',
        liveUrl: null,
    },
    {
        id: 'vscode-ai-assistant',
        name: 'VS Code AI Assistant (Internal)',
        description: 'An internal RAG assistant built for Tata Consultancy Services to support developer documentation and debugging. Reduced debugging and information lookup time by 35%.',
        techStack: ['Python', 'FastAPI', 'LangChain', 'Vector Databases'],
        images: [
            '/images/projects/vscode-ai/vscode-ai-assistant-1.png',
            '/images/projects/vscode-ai/vscode-ai-assistant-2.png',
        ],
        githubUrl: undefined,
        liveUrl: null,
    },
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
            { name: 'LLaMA Fine-Tuning', level: 'intermediate' },
        ],
        highlight: true,
        icon: Bot,
    },
    'Backend Development': {
        items: [
            { name: 'Python', level: 'advanced' },
            { name: 'FastAPI', level: 'advanced' },
            { name: 'Node.js / Express', level: 'intermediate' },
            { name: 'REST API Design', level: 'advanced' },
            { name: 'SSE / WebSockets', level: 'intermediate' },
        ],
        highlight: true,
        icon: Server,
    },
    'Frontend Development': {
        items: [
            { name: 'Next.js (App Router)', level: 'advanced' },
            { name: 'React.js', level: 'advanced' },
            { name: 'TypeScript', level: 'intermediate' },
            { name: 'Tailwind CSS', level: 'advanced' },
        ],
        highlight: true,
        icon: Layout,
    },
    'Infrastructure & DevOps': {
        items: [
            { name: 'Docker', level: 'intermediate' },
            { name: 'AWS', level: 'beginner' },
            { name: 'CI/CD (GitHub Actions)', level: 'intermediate' },
            { name: 'PostgreSQL / MongoDB', level: 'intermediate' },
            { name: 'Git & GitHub', level: 'advanced' },
        ],
        highlight: true,
        icon: Cloud,
    },
    'Blockchain & Web3': {
        items: [
            { name: 'Solidity', level: 'beginner' },
            { name: 'Ethereum', level: 'beginner' },
            { name: 'Solana', level: 'beginner' },
            { name: 'Smart Contracts', level: 'beginner' },
            { name: 'Web3.js / Ethers.js', level: 'intermediate' },
            { name: 'Hardhat / Foundry', level: 'beginner' },
            { name: 'MetaMask & Wallets', level: 'intermediate' },
        ],
        highlight: true,
        icon: Cpu,
    },
}
