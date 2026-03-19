import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr
} from '@react-email/components'

interface ContactFormEmailProps {
  name: string
  email: string
  message: string
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message
}) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission from {name}</Preview>
    <Tailwind>
      <Body className="bg-[#f6f9fc] my-auto mx-auto font-sans">
        <Container className="bg-white border border-solid border-[#f0f0f0] rounded-lg my-[40px] mx-auto p-[45px] max-w-[580px]">
          <Section>
            <Heading className="text-[#333] text-[24px] font-bold text-left p-0 my-[40px] mx-0">
              New Portfolio Message
            </Heading>
            
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            
            <Section className="my-[20px]">
              <Text className="text-[#888] text-[12px] font-bold uppercase mb-[5px] m-0">
                From:
              </Text>
              <Text className="text-[#333] text-[16px] leading-[24px] font-semibold m-0">
                {name} (<span className="text-emerald-600 underline">{email}</span>)
              </Text>
            </Section>

            <Section className="my-[20px]">
              <Text className="text-[#888] text-[12px] font-bold uppercase mb-[5px] m-0">
                Message:
              </Text>
              <Section className="bg-[#f9f9f9] border border-solid border-[#eaeaea] rounded p-[20px] my-[10px]">
                <Text className="text-[#333] text-[16px] leading-[26px] m-0 italic">
                  "{message}"
                </Text>
              </Section>
            </Section>
            
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            
            <Text className="text-[#8898aa] text-[14px]">
              This is an automated notification from your portfolio contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default ContactFormEmail
