'use client'

import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/actions'
import { useId } from 'react'
type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const patternId = useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await sendEmail(data)

    if (result?.error) {
      toast.error('An error occurred! Please try again.')
      return
    }

    toast.success('Message sent successfully!')
    reset()
  }

  return (
    <section className='relative isolate'>
      {/* Background pattern */}
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-zinc-200 opacity-75 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-700'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id={patternId}
            width={200}
            height={200}
            x='50%'
            y={-64}
            patternUnits='userSpaceOnUse'
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg
          x='50%'
          y={-64}
          className='overflow-visible fill-zinc-50 dark:fill-zinc-900/75'
        >
          <path
            d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect
          width='100%'
          height='100%'
          strokeWidth={0}
          fill={`url(#${patternId})`}
        />
      </svg>

      {/* Form */}
      <div className='relative'>
        <form
          onSubmit={handleSubmit(processForm)}
          className='mt-16 lg:flex-auto'
          noValidate
        >
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Name */}
            <div>
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <Input
                id='name'
                type='text'
                placeholder='Name'
                autoComplete='given-name'
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
              />

              {errors.name?.message && (
                <p id='name-error' className='ml-1 mt-2 text-sm text-rose-400' role='alert'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='sr-only'>
                Email Address
              </label>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                placeholder='Email'
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />

              {errors.email?.message && (
                <p id='email-error' className='ml-1 mt-2 text-sm text-rose-400' role='alert'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className='sm:col-span-2'>
              <label htmlFor='message' className='sr-only'>
                Message
              </label>
              <Textarea
                id='message'
                rows={4}
                placeholder='Message'
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                {...register('message')}
              />

              {errors.message?.message && (
                <p id='message-error' className='ml-1 mt-2 text-sm text-rose-400' role='alert'>
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className='mt-6'>
            <button
              type='submit'
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className='group relative w-full inline-flex items-center justify-center overflow-hidden rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:shadow-zinc-50/10 dark:focus:ring-zinc-100 dark:focus:ring-offset-black disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md'
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 dark:via-black/10" />
              <span className="relative">{isSubmitting ? 'Submitting...' : 'Send Message'}</span>
            </button>
          </div>
          <p className='mt-4 text-xs text-muted-foreground'>
            By submitting this form, I agree to the{' '}
            <Link href='/privacy-policy' className='font-bold'>
              privacy&nbsp;policy.
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
