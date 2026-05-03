import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-background/75 py-4 backdrop-blur-sm dark:border-transparent sm:py-6'>
      <nav
        aria-label='Main Navigation'
        className='container flex max-w-3xl items-center justify-between gap-2'
      >
        <div>
          <Link
            href='/'
            aria-label='Home'
            title='Home'
            className='font-serif text-xl font-bold sm:text-2xl'
          >
            AN
          </Link>
        </div>

        <ul className='mx-2 flex flex-1 items-center justify-center gap-4 text-xs font-light text-muted-foreground sm:gap-10 sm:text-sm'>
          <li className='group transition-colors hover:text-foreground'>
            <Link href='/posts' className='relative pb-1' title='Read my posts'>
              Posts
              <span className='absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full' />
            </Link>
          </li>
          <li className='group hidden transition-colors hover:text-foreground sm:block'>
            <Link
              href='/projects'
              className='relative pb-1'
              title='View my projects'
            >
              Projects
              <span className='absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full' />
            </Link>
          </li>
          <li className='group transition-colors hover:text-foreground'>
            <Link
              href='/contributions'
              className='relative pb-1'
              title='See my open source contributions'
            >
              <span className='sm:hidden'>Contrib</span>
              <span className='hidden sm:inline'>Contributions</span>
              <span className='absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full' />
            </Link>
          </li>
          <li className='group transition-colors hover:text-foreground'>
            <Link
              href='/contact'
              className='relative pb-1'
              title='Get in touch'
            >
              Contact
              <span className='absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full' />
            </Link>
          </li>
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
