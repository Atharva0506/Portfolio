import Intro from '@/components/intro'
import Skills from '@/components/skills'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import RecentContributions from '@/components/recent-contributions'
import AnimatedSection from '@/components/animated-section'
import FAQSection from '@/components/faq-section'

const faqItems = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in Python, FastAPI, LangChain, Next.js, Golang, and LLM technologies including OpenAI GPT-4, Gemini, and vector databases like ChromaDB and Pinecone. I build production-ready AI applications with multi-agent architectures and scalable backend systems.'
  },
  {
    question: 'Do you work on freelance or consulting projects?',
    answer: 'Yes, I am available for freelance AI consulting and development work, including backend architecture, full-stack web applications, and AI integration. I have experience building multi-agent AI systems, RAG pipelines, and cloud-deployed APIs. If you want to hire an AI developer in India, reach out through the contact form to discuss your project.'
  },
  {
    question: 'What types of AI projects have you built?',
    answer: 'I have built production-grade AI applications including RAG-based documentation assistants, conversational AI companions with persistent memory using vector databases, AI-powered news aggregation platforms with LangGraph multi-agent pipelines, and chatbots using Vercel AI SDK and LangChain.'
  },
  {
    question: 'Are you open to remote work opportunities?',
    answer: 'Yes, I am open to remote work opportunities as a full stack AI developer. I am based in Pune, India, and have experience collaborating with distributed teams across different time zones on Python, FastAPI, and Next.js projects.'
  },
  {
    question: 'How can I hire you or get in touch?',
    answer: 'You can reach me through the contact form on this website, or connect with me on LinkedIn and GitHub. I am available for full-time roles, freelance projects, and AI consulting engagements. I typically respond within 24 hours.'
  }
]

export default function Home() {
  return (
    <section className='pb-24 pt-24 md:pt-32'>
      <div className='container max-w-3xl'>
        <AnimatedSection delay={0} animation="fade-up">
          <Intro />
        </AnimatedSection>

        <AnimatedSection delay={150} animation="fade-up">
          <Skills />
        </AnimatedSection>
        
        <AnimatedSection delay={600} animation="fade-up">
          <RecentContributions />
        </AnimatedSection>
        
        <AnimatedSection delay={300} animation="fade-up">
          <RecentPosts />
        </AnimatedSection>

        <AnimatedSection delay={450} animation="fade-up">
          <RecentProjects />
        </AnimatedSection>


        <AnimatedSection delay={750} animation="fade-up">
          <FAQSection items={faqItems} />
        </AnimatedSection>
      </div>
    </section>
  )
}
