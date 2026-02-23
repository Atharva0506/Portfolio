'use client'

import { skills } from '@/lib/data'
import { cn } from '@/lib/utils'
import MouseGlowCard from '@/components/mouse-glow-card'

const levelConfig = {
    advanced: {
        color: 'bg-emerald-500',
        label: 'Advanced',
    },
    intermediate: {
        color: 'bg-amber-500',
        label: 'Intermediate',
    },
    beginner: {
        color: 'bg-zinc-400 dark:bg-zinc-500',
        label: 'Learning',
    },
}

export default function Skills() {
    return (
        <section className='pb-24'>
            <h2 className='title mb-8'>Core Technologies</h2>

            {/* Legend */}
            <div className='mb-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground'>
                {Object.entries(levelConfig).map(([key, config]) => (
                    <div key={key} className='flex items-center gap-1.5'>
                        <span className={cn('inline-block h-2 w-2 rounded-full', config.color)} />
                        <span>{config.label}</span>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {Object.entries(skills).map(([category, { items, highlight }]) => (
                    <MouseGlowCard
                        key={category}
                        className={cn(
                            'rounded-xl border p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
                            highlight
                                ? 'border-emerald-500/30 bg-emerald-50/40 hover:border-emerald-500/50 hover:shadow-emerald-200/30 dark:border-emerald-500/20 dark:bg-emerald-950/20 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-900/20'
                                : 'border-zinc-200/60 bg-zinc-50/40 hover:border-zinc-300 hover:shadow-zinc-200/40 dark:border-zinc-800/60 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:shadow-zinc-800/20'
                        )}
                    >
                        <h3 className={cn(
                            'mb-4 text-sm font-semibold uppercase tracking-wider',
                            highlight
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-zinc-500 dark:text-zinc-400'
                        )}>
                            {category}
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                            {items.map((skill) => (
                                <span
                                    key={skill.name}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03]',
                                        'bg-white/80 text-zinc-700 ring-1 ring-zinc-200/80',
                                        'dark:bg-zinc-800/60 dark:text-zinc-200 dark:ring-zinc-700/50',
                                        'hover:ring-zinc-300 hover:shadow-sm hover:bg-white',
                                        'dark:hover:ring-zinc-600 dark:hover:bg-zinc-800/90'
                                    )}
                                    title={`${skill.name} — ${levelConfig[skill.level].label}`}
                                >
                                    <span
                                        className={cn(
                                            'h-1.5 w-1.5 rounded-full flex-shrink-0',
                                            levelConfig[skill.level].color
                                        )}
                                    />
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </MouseGlowCard>
                ))}
            </div>
        </section>
    )
}
