import { Metadata } from 'next'

import Breadcrumbs from '@/components/breadcrumbs'
import Contributions from '@/components/contributions'
import PageTransition from '@/components/page-transition'
import {
  createEmptyGitHubContributions,
  getGitHubContributions,
} from '@/lib/github-contributions'

const baseUrl = 'https://atharvanaik.me'

export const metadata: Metadata = {
  title: 'GitHub Contributions',
  description:
    'Track Atharva Naik\'s open-source activity, including merged pull requests, open pull requests, and issues across external repositories.',
  keywords: [
    'GitHub contributions',
    'open source pull requests',
    'merged PRs',
    'GitHub issues',
    'Atharva Naik GitHub',
  ],
  openGraph: {
    title: 'GitHub Contributions | Atharva Naik',
    description:
      'Merged PRs, open PRs, and issues authored by Atharva Naik across open-source repositories.',
    type: 'website',
    url: `${baseUrl}/contributions`,
  },
  alternates: {
    canonical: `${baseUrl}/contributions`,
  },
}

export default async function ContributionsPage() {
  const contributions = await getGitHubContributions(12).catch(() =>
    createEmptyGitHubContributions()
  )

  const allItems = [
    ...contributions.mergedPrs,
    ...contributions.openPrs,
    ...contributions.issues,
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'GitHub Contributions',
    description:
      'Merged pull requests, open pull requests, and issues authored by Atharva Naik on external repositories.',
    url: `${baseUrl}/contributions`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        name: item.title,
      })),
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTransition>
        <section className='pb-24 pt-24 md:pt-40'>
          <div className='container max-w-3xl'>
            <Breadcrumbs
              items={[{ label: 'Contributions', href: '/contributions' }]}
            />
            <h1 className='title mb-12'>GitHub Contributions</h1>

            <Contributions data={contributions} />
          </div>
        </section>
      </PageTransition>
    </>
  )
}
