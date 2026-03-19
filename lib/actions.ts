'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'
import AutoResponseEmail from '@/emails/auto-response-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data

    // 1. me
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['onboarding@resend.dev'], // Send to owner (replace with verified domain image if available)
      subject: `New Message From Portfolio: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message })
    })

    // 2.  visitor
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Thank you for reaching out!',
      react: AutoResponseEmail({ name })
    })

    return { success: true }
  } catch (error) {
    return { error }
  }
}
