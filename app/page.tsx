import Intro from '@/components/intro'
import Skills from '@/components/skills'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <Intro />

        <Skills />
        <RecentPosts />
        <RecentProjects />

      </div>
    </section>
  )
}
