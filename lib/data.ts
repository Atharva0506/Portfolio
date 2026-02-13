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
        id: 'news-ai-app',
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
        liveUrl: 'https://news-app-delta-mocha-27.vercel.app/',
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
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
            'https://images.unsplash.com/photo-1607799275518-d58665d099db?w=800',
        ],
        githubUrl: undefined,
        liveUrl: null,
    },
]

export const skills = {
    'Machine Learning & AI': ['PyTorch', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'CNN', 'Model Training'],
    'Generative AI & LLMs': ['LangChain', 'OpenAI API (GPT-4)', 'Llama-2', 'RAG', 'ChromaDB'],
    'Languages': ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    'Frontend': ['React.js', 'Next.js', 'Tailwind CSS'],
    'Backend & Tools': ['FastAPI', 'Node.js', 'Docker', 'Git/GitHub', 'AWS'],
    'Databases': ['PostgreSQL', 'MongoDB', 'Vector Databases'],
}
