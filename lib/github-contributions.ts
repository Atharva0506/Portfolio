const GITHUB_USERNAME = 'Atharva0506'
const GITHUB_SEARCH_ENDPOINT = 'https://api.github.com/search/issues'
const CACHE_SECONDS = 3600

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
  fetchedAt: string
}

export function createEmptyGitHubContributions(): GitHubContributionsResponse {
  return {
    mergedPrs: [],
    openPrs: [],
    issues: [],
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
  items: GitHubSearchIssueItem[]
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

async function fetchIssuesByQuery(
  query: string,
  kind: ContributionKind,
  perPage: number
): Promise<ContributionItem[]> {
  const url = `${GITHUB_SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=${perPage}`

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

  return result.items.map((item) => mapContributionItem(item, kind))
}

export async function getGitHubContributions(
  perTypeLimit = 8
): Promise<GitHubContributionsResponse> {
  const mergedPrQuery = `author:${GITHUB_USERNAME} is:pr is:merged -user:${GITHUB_USERNAME}`
  const openPrQuery = `author:${GITHUB_USERNAME} is:pr is:open -user:${GITHUB_USERNAME}`
  const issuesQuery = `author:${GITHUB_USERNAME} is:issue is:open -user:${GITHUB_USERNAME}`

  const [mergedPrs, openPrs, issues] = await Promise.all([
    fetchIssuesByQuery(mergedPrQuery, 'merged_pr', perTypeLimit),
    fetchIssuesByQuery(openPrQuery, 'open_pr', perTypeLimit),
    fetchIssuesByQuery(issuesQuery, 'issue', perTypeLimit),
  ])

  return {
    mergedPrs,
    openPrs,
    issues,
    fetchedAt: new Date().toISOString(),
  }
}
