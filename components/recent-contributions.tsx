import Link from 'next/link'

import Contributions from '@/components/contributions'
import {
  createEmptyGitHubContributions,
  getGitHubContributions,
} from '@/lib/github-contributions'

export default async function RecentContributions() {
  const contributions = await getGitHubContributions({
    mode: 'preview',
    previewLimit: 2,
  }).catch(() =>
    createEmptyGitHubContributions()
  )

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>GitHub Contributions</h2>
        <Contributions data={contributions} compact compactLimit={2} />

        <Link
          href='/contributions'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>View all contributions &rarr;</span>
        </Link>
      </div>
    </section>
  )
}
