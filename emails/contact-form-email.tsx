import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text
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
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Portfolio Message</Heading>
        <Section style={section}>
          <Text style={label}>From:</Text>
          <Text style={value}>{name} ({email})</Text>
          
          <Text style={label}>Message:</Text>
          <Text style={text}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ContactFormEmail

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0'
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px'
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0'
}

const section = {
  margin: '0'
}

const label = {
  color: '#888',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  margin: '0 0 5px'
}

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 20px'
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px'
}
