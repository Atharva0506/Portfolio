import Link from 'next/link'
import Image from 'next/image'
import { ProjectMetadata } from '@/lib/projects'

interface RelatedProjectsProps {
  projects: ProjectMetadata[]
  title?: string
}

export default function RelatedProjects({ projects, title = 'Related Projects' }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-lg border border-zinc-200 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              {project.image && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title || 'Project image'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-medium transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {project.summary}
                </p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
