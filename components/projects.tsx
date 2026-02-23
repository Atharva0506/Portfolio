import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

import { Project } from '@/lib/data'
import MouseGlowCard from '@/components/mouse-glow-card'

export default function Projects({
  projects
}: {
  projects: Project[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        <MouseGlowCard key={project.id} className='rounded-xl border border-zinc-200/60 bg-zinc-50/50 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/30 hover:-translate-y-1 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/30'>
          <li className='group relative flex flex-col gap-y-4 p-4 sm:p-6'>
            {/* Project Image */}
            <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
              {project.images && project.images.length > 0 ? (
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-400">
                  No Image
                </div>
              )}
            </div>

            <div className='flex flex-col gap-y-3'>
              <div className='flex items-start justify-between gap-x-4'>
                <h2 className='text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100'>
                  {project.name}
                </h2>
                <div className='flex items-center gap-x-2'>
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target='_blank'
                      className='text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    >
                      <Github className='size-5' />
                      <span className='sr-only'>GitHub</span>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target='_blank'
                      className='text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    >
                      <ExternalLink className='size-5' />
                      <span className='sr-only'>Live Demo</span>
                    </Link>
                  )}
                </div>
              </div>

              <p className='line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-2'>
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className='inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-400/20'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </li>
        </MouseGlowCard>
      ))}
    </ul>
  )
}
