import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div>
          <Link href='/' className='font-serif text-2xl font-bold'>
            AN
          </Link>
        </div>

        <ul className='flex items-center gap-6 text-sm font-light text-muted-foreground sm:gap-10'>
          <li className='group transition-colors hover:text-foreground'>
            <Link href='/posts' className='relative pb-1'>
              Posts
              <span className='absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full' />
            </Link>
          </li>
          <li className='group transition-colors hover:text-foreground'>
            <Link href='/projects' className='relative pb-1'>
              Projects
              <span className='absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full' />
            </Link>
          </li>
          <li className='group transition-colors hover:text-foreground'>
            <Link href='/contact' className='relative pb-1'>
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
