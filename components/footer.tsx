import { JSX, SVGProps } from 'react'

const navigation = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/atharva0506/',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill='currentColor' viewBox='0 0 448 512' {...props}>
        <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
      </svg>
    )
  },
  {
    name: 'X',
    href: 'https://x.com/Atharva_0506',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
        <path d='M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823Z' />
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Atharva0506',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
        <path
          fillRule='evenodd'
          d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
          clipRule='evenodd'
        />
      </svg>
    )
  },
  {
    name: 'Google Developer',
    href: 'https://g.dev/Atharva0506',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill='currentColor' viewBox='0 0 48 48' {...props}>
        <path d='M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.87 2.36 30.3 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8.06 6.26C12.68 13.21 17.85 9.5 24 9.5z'/>
        <path d='M46.5 24c0-1.64-.15-3.21-.43-4.72H24v9h12.69c-.55 2.96-2.23 5.47-4.75 7.16l7.37 5.73C43.98 36.77 46.5 30.92 46.5 24z'/>
        <path d='M10.75 28.7a14.5 14.5 0 010-9.4l-8.06-6.26A23.97 23.97 0 000 24c0 3.97.95 7.73 2.69 10.96l8.06-6.26z'/>
        <path d='M24 48c6.3 0 11.87-2.08 15.82-5.65l-7.37-5.73c-2.05 1.38-4.68 2.19-8.45 2.19-6.15 0-11.32-3.71-13.25-9.2l-8.06 6.26C6.73 42.52 14.82 48 24 48z'/>
      </svg>
    )
  }
]
export default function Footer() {
  return (
    <footer className='py-8'>
      <div className='container max-w-3xl'>
        <div className='md:flex md:items-center md:justify-between'>
          <div className='flex justify-center space-x-6 md:order-2'>
            {navigation.map(item => (
              <a
                key={item.name}
                href={item.href}
                target='_blank'
                rel='noreferrer noopener'
                className='text-muted-foreground hover:text-foreground'
              >
                <span className='sr-only'>{item.name}</span>
                <item.icon aria-hidden='true' className='h-5 w-5' />
              </a>
            ))}
          </div>
          <div className='mt-8 md:order-1 md:mt-0'>
            <p className='text-center text-xs leading-5 text-muted-foreground'>
              &copy; {new Date().getFullYear()} Atharva Naik. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
