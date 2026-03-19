'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'
import AutoResponseEmail from '@/emails/auto-response-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data

    // 1. me (Receive)
    await resend.emails.send({
      from: 'Portfolio <hello@contact.atharvanaik.me>',
      to: ['atharvan.coder@gmail.com'],
      subject: `New Message From Portfolio: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message })
    })

    // 2. visitor (Send)
    await resend.emails.send({
      from: 'Atharva Naik <hello@contact.atharvanaik.me>',
      to: [email],
      subject: 'Thank you for reaching out!',
      react: AutoResponseEmail({ name })
    })

    return { success: true }
  } catch (error) {
    return { error }
  }
}
