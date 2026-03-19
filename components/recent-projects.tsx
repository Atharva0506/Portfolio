import Link from 'next/link'
import { projects } from '@/lib/data'
import Projects from '@/components/projects'

export default function RecentProjects() {
  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Projects</h2>
        <Projects projects={projects.slice(0, 2)} />

        <Link
          href='/projects'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>View all projects &rarr;</span>
        </Link>
      </div>
    </section>
  )
}
