import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://atharvanaik.me'

  // Get all posts and projects for dynamic sitemap
  const posts = await getPosts()
  const projects = await getProjects()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]

  // Dynamic blog post pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic project pages (from MDX)
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.publishedAt ? new Date(project.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...postPages, ...projectPages]
}
