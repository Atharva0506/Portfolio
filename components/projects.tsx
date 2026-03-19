import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

import { Project } from '@/lib/data'
import MouseGlowCard from '@/components/mouse-glow-card'
import ProjectImageCarousel from '@/components/project-image-carousel'
import { CarouselProvider } from '@/components/carousel-context'

export default function Projects({
  projects
}: {
  projects: Project[]
}) {
  return (
    <CarouselProvider interval={4000}>
      <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map((project, index) => (
        <MouseGlowCard
          key={project.id}
          className='group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/50 transition-all duration-500 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/40 hover:-translate-y-1.5 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/50'
        >
          <li className='flex h-full flex-col'>
            {/* Project Image Carousel */}
            <div className='relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/50'>
              <ProjectImageCarousel 
                images={project.images} 
                projectName={project.name} 
                priority={index < 2}
              />

              {/* Quick links on image hover (optional enhancement, visible on hover) */}
              <div className="absolute bottom-4 right-4 z-40 flex scale-95 items-center gap-x-2 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target='_blank'
                    className='rounded-full bg-white/90 p-2 text-zinc-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900'
                    aria-label="GitHub Repository"
                  >
                    <Github className='size-4' />
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target='_blank'
                    className='rounded-full bg-white/90 p-2 text-zinc-900 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900'
                    aria-label="Live Demo"
                  >
                    <ExternalLink className='size-4' />
                  </Link>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className='flex flex-grow flex-col justify-between p-5 sm:p-6'>
              <div className='flex flex-col gap-y-3'>
                <div className='flex items-start justify-between gap-x-4'>
                  <Link href={project.liveUrl || project.githubUrl || '#'} target='_blank' className='group-hover:underline decoration-zinc-300 underline-offset-4 dark:decoration-zinc-600'>
                    <h2 className='text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100'>
                      {project.name}
                    </h2>
                  </Link>
                </div>

                <p className='line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
                  {project.description}
                </p>
              </div>

              <div className='mt-5 flex flex-wrap gap-2'>
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className='inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium tracking-wide text-zinc-600 ring-1 ring-inset ring-zinc-500/10 transition-colors group-hover:bg-zinc-200/50 dark:bg-zinc-800/80 dark:text-zinc-300 dark:ring-zinc-400/20 dark:group-hover:bg-zinc-700/50'
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
    </CarouselProvider>
  )
}
