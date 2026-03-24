import { NextResponse } from 'next/server'
import { getGitHubContributions } from '@/lib/github-contributions'

const CACHE_SECONDS = 3600

export async function GET() {
  try {
    const contributions = await getGitHubContributions()

    return NextResponse.json(contributions, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
      },
    })
  } catch {
    return NextResponse.json(
      {
        message: 'Failed to fetch GitHub contributions',
      },
      {
        status: 502,
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_SECONDS}`,
        },
      }
    )
  }
}
