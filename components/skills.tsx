import { skills } from '@/lib/data'

export default function Skills() {
    return (
        <section className='pb-24'>
            <h2 className='title mb-12'>Skills</h2>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className='flex flex-col gap-4'>
                        <h3 className='text-lg font-semibold'>{category}</h3>
                        <div className='flex flex-wrap gap-2'>
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className='rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-800 transition-all duration-300 hover:bg-zinc-200 hover:scale-105 hover:shadow-sm dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
