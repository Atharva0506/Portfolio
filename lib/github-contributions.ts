const GITHUB_USERNAME = 'Atharva0506'
const GITHUB_SEARCH_ENDPOINT = 'https://api.github.com/search/issues'
const CACHE_SECONDS = 3600
const GITHUB_MAX_PER_PAGE = 100
const GITHUB_MAX_RESULTS = 1000

export type ContributionKind = 'merged_pr' | 'open_pr' | 'issue'

export type ContributionLabel = {
  name: string
  color: string
  description: string | null
}

export type ContributionItem = {
  id: number
  title: string
  url: string
  repoName: string
  orgName: string
  orgAvatarUrl: string
  createdAt: string
  mergedAt: string | null
  labels: ContributionLabel[]
  number: number
  kind: ContributionKind
}

export type GitHubContributionsResponse = {
  mergedPrs: ContributionItem[]
  openPrs: ContributionItem[]
  issues: ContributionItem[]
  mergedPrsTotal: number
  openPrsTotal: number
  issuesTotal: number
  fetchedAt: string
}

export function createEmptyGitHubContributions(): GitHubContributionsResponse {
  return {
    mergedPrs: [],
    openPrs: [],
    issues: [],
    mergedPrsTotal: 0,
    openPrsTotal: 0,
    issuesTotal: 0,
    fetchedAt: new Date().toISOString(),
  }
}

type GitHubSearchIssueLabel = {
  name: string
  color: string
  description: string | null
}

type GitHubSearchIssueItem = {
  id: number
  title: string
  html_url: string
  repository_url: string
  created_at: string
  number: number
  labels: GitHubSearchIssueLabel[]
  pull_request?: {
    merged_at?: string | null
  }
}

type GitHubSearchIssuesResult = {
  total_count: number
  items: GitHubSearchIssueItem[]
}

type ContributionQueryResult = {
  items: ContributionItem[]
  totalCount: number
}

export type GitHubContributionsOptions = {
  mode?: 'preview' | 'full'
  previewLimit?: number
}

function parseRepository(repositoryUrl: string): { orgName: string; repoName: string } {
  const [owner = '', repo = ''] = repositoryUrl.split('/repos/')[1]?.split('/') ?? []

  return {
    orgName: owner,
    repoName: repo,
  }
}

function mapContributionItem(
  item: GitHubSearchIssueItem,
  kind: ContributionKind
): ContributionItem {
  const { orgName, repoName } = parseRepository(item.repository_url)

  return {
    id: item.id,
    title: item.title,
    url: item.html_url,
    repoName,
    orgName,
    orgAvatarUrl: `https://avatars.githubusercontent.com/${orgName}`,
    createdAt: item.created_at,
    mergedAt: item.pull_request?.merged_at ?? null,
    labels: item.labels.map((label) => ({
      name: label.name,
      color: label.color,
      description: label.description ?? null,
    })),
    number: item.number,
    kind,
  }
}

function buildSearchUrl(query: string, perPage: number, page: number): string {
  return `${GITHUB_SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=${perPage}&page=${page}`
}

async function fetchIssuesByQuery(
  query: string,
  kind: ContributionKind,
  perPage: number,
  page = 1
): Promise<ContributionQueryResult> {
  const url = buildSearchUrl(query, perPage, page)

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    next: {
      revalidate: CACHE_SECONDS,
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`)
  }

  const result = (await response.json()) as GitHubSearchIssuesResult

  return {
    items: result.items.map((item) => mapContributionItem(item, kind)),
    totalCount: result.total_count,
  }
}

async function fetchAllIssuesByQuery(
  query: string,
  kind: ContributionKind
): Promise<ContributionQueryResult> {
  const firstPage = await fetchIssuesByQuery(
    query,
    kind,
    GITHUB_MAX_PER_PAGE,
    1
  )

  const cappedTotal = Math.min(firstPage.totalCount, GITHUB_MAX_RESULTS)
  const totalPages = Math.ceil(cappedTotal / GITHUB_MAX_PER_PAGE)

  if (totalPages <= 1) {
    return {
      items: firstPage.items.slice(0, cappedTotal),
      totalCount: firstPage.totalCount,
    }
  }

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      fetchIssuesByQuery(query, kind, GITHUB_MAX_PER_PAGE, index + 2)
    )
  )

  const allItems = [firstPage, ...remainingPages]
    .flatMap((pageResult) => pageResult.items)
    .slice(0, cappedTotal)

  return {
    items: allItems,
    totalCount: firstPage.totalCount,
  }
}

export async function getGitHubContributions(
  options: GitHubContributionsOptions = {}
): Promise<GitHubContributionsResponse> {
  const { mode = 'preview', previewLimit = 8 } = options
  const safePreviewLimit = Math.max(
    1,
    Math.min(previewLimit, GITHUB_MAX_PER_PAGE)
  )

  const mergedPrQuery = `author:${GITHUB_USERNAME} is:pr is:merged -user:${GITHUB_USERNAME}`
  const openPrQuery = `author:${GITHUB_USERNAME} is:pr is:open -user:${GITHUB_USERNAME}`
  const issuesQuery = `author:${GITHUB_USERNAME} is:issue is:open -user:${GITHUB_USERNAME}`

  const fetchByMode =
    mode === 'full'
      ? fetchAllIssuesByQuery
      : (query: string, kind: ContributionKind) =>
          fetchIssuesByQuery(query, kind, safePreviewLimit)

  const [mergedPrsResult, openPrsResult, issuesResult] = await Promise.all([
    fetchByMode(mergedPrQuery, 'merged_pr'),
    fetchByMode(openPrQuery, 'open_pr'),
    fetchByMode(issuesQuery, 'issue'),
  ])

  return {
    mergedPrs: mergedPrsResult.items,
    openPrs: openPrsResult.items,
    issues: issuesResult.items,
    mergedPrsTotal: mergedPrsResult.totalCount,
    openPrsTotal: openPrsResult.totalCount,
    issuesTotal: issuesResult.totalCount,
    fetchedAt: new Date().toISOString(),
  }
}
