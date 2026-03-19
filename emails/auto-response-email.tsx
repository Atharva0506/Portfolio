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
  render
} from '@react-email/components'

interface AutoResponseEmailProps {
  name: string
}

export const AutoResponseEmail: React.FC<Readonly<AutoResponseEmailProps>> = ({
  name
}) => (
  <Html>
    <Head />
    <Preview>Thank you for reaching out!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Hi {name},</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>
            Thank you for reaching out to me through my portfolio. I have successfully received your message and will get back to you as soon as possible.
          </Text>
          <Text style={paragraph}>
            In the meantime, feel free to explore my latest projects or connect with me on social media. I usually respond within 24-48 hours.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Best regards,<br />
            Atharva Naik
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default AutoResponseEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px'
}

const header = {
  padding: '32px 0'
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0',
  textAlign: 'left' as const
}

const content = {
  padding: '0 0 32px'
}

const paragraph = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  textAlign: 'left' as const
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0'
}

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '16px 0',
  textAlign: 'left' as const
}
