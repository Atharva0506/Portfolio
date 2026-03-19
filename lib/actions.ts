'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'
import AutoResponseEmail from '@/emails/auto-response-email'

const RESEND_SENDER = 'Atharva Naik <hello@contact.atharvanaik.me>'
const CONTACT_RECIPIENT = 'atharvan.coder@gmail.com'

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
      from: RESEND_SENDER,
      to: [CONTACT_RECIPIENT],
      subject: `New Message From Portfolio: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message })
    })

    // 2. visitor (Send)
    await resend.emails.send({
      from: RESEND_SENDER,
      to: [email],
      subject: 'Thank you for reaching out!',
      react: AutoResponseEmail({ name })
    })

    return { success: true }
  } catch (error) {
    return { error }
  }
}
