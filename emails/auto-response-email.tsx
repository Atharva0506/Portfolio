import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Img
} from '@react-email/components'

const baseUrl = 'https://atharvanaik.me'

interface AutoResponseEmailProps {
  name: string
}

export const AutoResponseEmail: React.FC<Readonly<AutoResponseEmailProps>> = ({
  name
}) => (
  <Html>
    <Head />
    <Preview>Thank you for reaching out!</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Section className="mt-[32px]">
            <Heading className="text-black text-[24px] font-normal text-left p-0 my-[30px] mx-0">
              Hi <strong>{name}</strong>,
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for reaching out to me through my portfolio. I have successfully received your message and will get back to you as soon as possible.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              In the meantime, feel free to explore my latest projects or connect with me on social media. I usually respond within 24-48 hours.
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Section className="flex items-center gap-4">
              <Img
                src={`${baseUrl}/favicon.png`}
                width="48"
                height="48"
                alt="Atharva Naik"
              />
              <Text className="text-[#8898aa] text-[14px] leading-[24px] m-0">
                <strong>Atharva Girish Naik</strong><br />
                <a href="mailto:atharvan.coder@gmail.com" className="text-emerald-600 no-underline">atharvan.coder@gmail.com</a> | +91 9226781673<br />
                <a href="https://linkedin.com/in/Atharva0506" className="text-emerald-600 no-underline">LinkedIn</a> | <a href="https://github.com/Atharva0506" className="text-emerald-600 no-underline">GitHub</a> | <a href="https://atharvanaik.me" className="text-emerald-600 no-underline">atharvanaik.me</a>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default AutoResponseEmail
