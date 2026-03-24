"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ExternalLink,
  GitPullRequest,
  GitPullRequestArrow,
  LayoutGrid,
  List,
  MessageSquare,
} from 'lucide-react'

import MouseGlowCard from '@/components/mouse-glow-card'
import { formatDate } from '@/lib/utils'
import {
  ContributionItem,
  ContributionKind,
  GitHubContributionsResponse,
} from '@/lib/github-contributions'

type ContributionsProps = {
  data: GitHubContributionsResponse
  compact?: boolean
}

type ContributionFilter = {
  key: ContributionKind
  title: string
}

type ViewMode = 'grid' | 'list'

const MAX_LABELS = 3
const COMPACT_LIMIT = 4

const CONTRIBUTION_FILTERS: ContributionFilter[] = [
  {
    key: 'merged_pr',
    title: 'Merged PRs',
  },
  {
    key: 'open_pr',
    title: 'Open PRs',
  },
  {
    key: 'issue',
    title: 'Issues',
  },
]

function getItemsByFilter(
  data: GitHubContributionsResponse,
  filter: ContributionKind
): ContributionItem[] {
  if (filter === 'merged_pr') {
    return data.mergedPrs
  }

  if (filter === 'open_pr') {
    return data.openPrs
  }

  return data.issues
}

function getFilterCount(
  data: GitHubContributionsResponse,
  filter: ContributionKind
): number {
  return getItemsByFilter(data, filter).length
}

function getItemIcon(kind: ContributionKind) {
  if (kind === 'merged_pr') {
    return GitPullRequestArrow
  }

  if (kind === 'open_pr') {
    return GitPullRequest
  }

  return MessageSquare
}

function getSortedItems(items: ContributionItem[]): ContributionItem[] {
  return [...items].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

function ContributionCard({ item }: { item: ContributionItem }) {
  const Icon = getItemIcon(item.kind)

  return (
    <MouseGlowCard className='group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-lg'>
      <li className='flex h-full flex-col p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-3'>
            <Image
              src={item.orgAvatarUrl}
              alt={`${item.orgName} avatar`}
              width={28}
              height={28}
              className='rounded-full border border-border/70'
            />
            <div className='min-w-0'>
              <p className='truncate text-sm text-muted-foreground'>
                {item.orgName}/{item.repoName}
              </p>
              <p className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                <Icon className='size-3.5' />
                #{item.number}
              </p>
            </div>
          </div>

          <Link
            href={item.url}
            target='_blank'
            className='rounded-full border border-border/80 bg-background/80 p-2 text-muted-foreground transition-colors hover:text-foreground'
            aria-label='Open contribution on GitHub'
          >
            <ExternalLink className='size-4' />
          </Link>
        </div>

        <h3 className='mt-4 line-clamp-2 text-base font-semibold text-foreground'>
          {item.title}
        </h3>

        <div className='mt-3 flex flex-wrap gap-2'>
          {item.labels.slice(0, MAX_LABELS).map((label) => (
            <span
              key={`${item.id}-${label.name}`}
              className='inline-flex items-center rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground'
            >
              {label.name}
            </span>
          ))}
        </div>

        <div className='mt-auto pt-5 text-xs text-muted-foreground'>
          <p>Created {formatDate(item.createdAt)}</p>
          {item.mergedAt ? <p>Merged {formatDate(item.mergedAt)}</p> : null}
        </div>
      </li>
    </MouseGlowCard>
  )
}

function ContributionListItem({ item }: { item: ContributionItem }) {
  const Icon = getItemIcon(item.kind)

  return (
    <li className='group'>
      <Link
        href={item.url}
        target='_blank'
        className='flex flex-col gap-4 rounded-2xl border border-border/80 bg-card/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-5'
      >
        <div className='min-w-0'>
          <div className='mb-2 flex min-w-0 items-center gap-2 text-sm text-muted-foreground'>
            <Image
              src={item.orgAvatarUrl}
              alt={`${item.orgName} avatar`}
              width={22}
              height={22}
              className='rounded-full border border-border/70'
            />
            <span className='truncate'>
              {item.orgName}/{item.repoName}
            </span>
            <span className='inline-flex items-center gap-1 text-xs'>
              <Icon className='size-3.5' />
              #{item.number}
            </span>
          </div>

          <p className='line-clamp-2 text-base font-semibold text-foreground'>
            {item.title}
          </p>

          <div className='mt-3 flex flex-wrap gap-2'>
            {item.labels.slice(0, MAX_LABELS).map((label) => (
              <span
                key={`${item.id}-list-${label.name}`}
                className='inline-flex items-center rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground'
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className='flex shrink-0 items-end justify-between gap-3 text-xs text-muted-foreground sm:flex-col sm:items-end'>
          <div className='text-right'>
            <p>Created {formatDate(item.createdAt)}</p>
            {item.mergedAt ? <p>Merged {formatDate(item.mergedAt)}</p> : null}
          </div>
          <ExternalLink className='size-4' />
        </div>
      </Link>
    </li>
  )
}

function ViewToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}) {
  return (
    <div className='inline-flex items-center rounded-lg border border-border/80 bg-card/60 p-1'>
      <button
        type='button'
        onClick={() => setViewMode('grid')}
        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
          viewMode === 'grid'
            ? 'bg-secondary text-secondary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <LayoutGrid className='size-3.5' />
        Grid
      </button>
      <button
        type='button'
        onClick={() => setViewMode('list')}
        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors ${
          viewMode === 'list'
            ? 'bg-secondary text-secondary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <List className='size-3.5' />
        List
      </button>
    </div>
  )
}

function FilterTabs({
  data,
  activeFilter,
  setActiveFilter,
}: {
  data: GitHubContributionsResponse
  activeFilter: ContributionKind
  setActiveFilter: (filter: ContributionKind) => void
}) {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      {CONTRIBUTION_FILTERS.map((filter) => {
        const isActive = filter.key === activeFilter
        const count = getFilterCount(data, filter.key)

        return (
          <button
            key={filter.key}
            type='button'
            onClick={() => setActiveFilter(filter.key)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
              isActive
                ? 'border-border bg-secondary text-secondary-foreground'
                : 'border-border/80 bg-card/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{filter.title}</span>
            <span className='rounded-md bg-background/70 px-1.5 py-0.5 text-[11px]'>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function EmptyState() {
  return (
    <div className='rounded-xl border border-border/80 bg-card/40 p-6 text-sm text-muted-foreground'>
      No items found in this category right now.
    </div>
  )
}

export default function Contributions({ data, compact = false }: ContributionsProps) {
  const [activeFilter, setActiveFilter] = useState<ContributionKind>('merged_pr')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const items = useMemo(() => {
    const sorted = getSortedItems(getItemsByFilter(data, activeFilter))

    if (compact) {
      return sorted.slice(0, COMPACT_LIMIT)
    }

    return sorted
  }, [activeFilter, compact, data])

  return (
    <>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <FilterTabs
          data={data}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {items.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'grid' ? (
        <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          {items.map((item) => (
            <ContributionCard key={`${item.kind}-${item.id}`} item={item} />
          ))}
        </ul>
      ) : (
        <ul className='flex flex-col gap-4'>
          {items.map((item) => (
            <ContributionListItem key={`${item.kind}-list-${item.id}`} item={item} />
          ))}
        </ul>
      )}
    </>
  )
}
