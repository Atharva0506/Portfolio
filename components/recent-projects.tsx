import Link from 'next/link'
import { projects } from '@/lib/data'
import Projects from '@/components/projects'

export default function RecentProjects() {
  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Featured Projects</h2>
        <Projects projects={projects} />

        {/* Removed "All projects" link for now as we are showing all key projects here, 
            or we can point it to a dedicated page if implemented later. 
            Keeping it commented out or removed based on user request scope. 
            For now, showing all 4 projects here is cleaner. 
        */}
      </div>
    </section>
  )
}
