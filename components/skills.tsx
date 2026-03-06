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

            {/* Bento Grid layout */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(180px,auto)]'>
                {Object.entries(skills).map(([category, { items, highlight }], index) => {
                    // Determine grid placement based on index/category for Bento feel
                    const isLarge = highlight || category === 'Backend Development';
                    const colSpanClass = isLarge
                        ? 'md:col-span-2 lg:col-span-2'
                        : 'md:col-span-1 lg:col-span-2';

                    return (
                        <MouseGlowCard
                            key={category}
                            className={cn(
                                'relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                                colSpanClass,
                                highlight
                                    ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 to-emerald-100/20 hover:border-emerald-500/50 hover:shadow-emerald-200/40 dark:border-emerald-500/20 dark:from-emerald-950/30 dark:to-emerald-900/10 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-900/30'
                                    : 'border-zinc-200/60 bg-gradient-to-br from-zinc-50/50 to-zinc-100/20 hover:border-zinc-300 hover:shadow-zinc-200/40 dark:border-zinc-800/60 dark:from-zinc-900/40 dark:to-zinc-800/20 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/30'
                            )}
                        >
                            <div className="flex flex-col gap-y-4 relative z-10">
                                <h3 className={cn(
                                    'text-lg font-bold tracking-tight',
                                    highlight
                                        ? 'text-emerald-800 dark:text-emerald-300'
                                        : 'text-zinc-800 dark:text-zinc-200'
                                )}>
                                    {category}
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {items.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className={cn(
                                                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-200 hover:scale-[1.05]',
                                                'bg-white/90 text-zinc-700 ring-1 ring-zinc-200/80 shadow-sm',
                                                'dark:bg-zinc-800/80 dark:text-zinc-200 dark:ring-zinc-700/50',
                                                'hover:ring-zinc-300 hover:bg-white',
                                                'dark:hover:ring-zinc-600 dark:hover:bg-zinc-700/90'
                                            )}
                                            title={`${skill.name} — ${levelConfig[skill.level].label}`}
                                        >
                                            <span
                                                className={cn(
                                                    'h-1.5 w-1.5 rounded-full flex-shrink-0 animate-pulse-slow',
                                                    levelConfig[skill.level].color
                                                )}
                                            />
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative background element for bento cards */}
                            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-zinc-200/50 to-transparent blur-2xl dark:from-zinc-800/50" />
                        </MouseGlowCard>
                    );
                })}
            </div>
        </section>
    )
}
