import Intro from '@/components/intro'
import Skills from '@/components/skills'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import AnimatedSection from '@/components/animated-section'
import FAQSection from '@/components/faq-section'

const faqItems = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in Python, FastAPI, LangChain, Next.js, and LLM technologies including OpenAI GPT-4, Gemini, and vector databases like ChromaDB and Pinecone. I build production-ready AI applications with multi-agent architectures and scalable backend systems.'
  },
  {
    question: 'Do you work on freelance or consulting projects?',
    answer: 'Yes, I am available for freelance and consulting work in AI development, backend architecture, and full-stack web applications. I have experience building multi-agent AI systems, RAG pipelines, and cloud-deployed APIs. Reach out through the contact form to discuss your project.'
  },
  {
    question: 'What types of AI projects have you built?',
    answer: 'I have built various AI applications including RAG-based documentation assistants, conversational AI companions with persistent memory, AI-powered news aggregation platforms, and chatbots using Vercel AI SDK and LangChain.'
  },
  {
    question: 'Are you open to remote work opportunities?',
    answer: 'Yes, I am open to remote work opportunities. I am based in Pune, India, and have experience collaborating with distributed teams across different time zones.'
  }
]

export default function Home() {
  return (
    <section className='pb-24 pt-24 md:pt-40'>
      <div className='container max-w-3xl'>
        <AnimatedSection delay={0} animation="fade-up">
          <Intro />
        </AnimatedSection>

        <AnimatedSection delay={150} animation="fade-up">
          <Skills />
        </AnimatedSection>

        <AnimatedSection delay={300} animation="fade-up">
          <RecentPosts />
        </AnimatedSection>

        <AnimatedSection delay={450} animation="fade-up">
          <RecentProjects />
        </AnimatedSection>

        <AnimatedSection delay={600} animation="fade-up">
          <FAQSection items={faqItems} />
        </AnimatedSection>
      </div>
    </section>
  )
}
