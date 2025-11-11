import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface WelcomeEmailProps {
  name: string
  unsubscribeUrl: string
  advisorName?: string
  advisorTitle?: string
}

export const WelcomeEmail = ({
  name,
  unsubscribeUrl,
  advisorName = "Kunda John Kim",
  advisorTitle = "Global Education & F&B Consultant"
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Kunda Pathways Newsletter!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to Kunda Pathways!</Heading>
          <Text style={tagline}>Your Gateway to Global Education and Business Success</Text>
        </Section>
        
        <Section style={content_section}>
          <Heading as="h2" style={h2}>Hello {name}!</Heading>
          
          <Text style={content_text}>
            Thank you for subscribing to our newsletter! We're excited to have you join our community.
          </Text>
          
          <Text style={content_text}>
            You'll now receive regular updates about:
          </Text>
          
          <ul style={list}>
            <li style={listItem}>🎓 Educational opportunities and scholarship alerts</li>
            <li style={listItem}>💼 Business consulting insights and tips</li>
            <li style={listItem}>📚 Exclusive resources and guides</li>
            <li style={listItem}>🌟 Success stories from our community</li>
          </ul>
          
          <Text style={content_text}>
            Stay tuned for valuable content that will help you achieve your global education and business goals!
          </Text>
        </Section>

        <Hr style={hr} />
        
        <Section style={footer_section}>
          <Text style={footer_text}>
            Best regards,<br />
            <strong>{advisorName}</strong><br />
            {advisorTitle}<br />
            Kunda Pathways
          </Text>
          
          <Text style={unsubscribe_text}>
            You received this email because you subscribed to our newsletter.{' '}
            <Link href={unsubscribeUrl} style={link}>
              Unsubscribe here
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
}

const header = {
  padding: '32px 48px 24px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #e6ebf1',
}

const h1 = {
  color: '#2563eb',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  lineHeight: '1.3',
}

const h2 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px',
}

const tagline = {
  color: '#666666',
  fontSize: '16px',
  margin: '0',
  fontStyle: 'italic',
}

const content_section = {
  padding: '32px 48px',
}

const content_text = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const list = {
  margin: '0 0 20px',
  paddingLeft: '20px',
}

const listItem = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '8px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer_section = {
  padding: '0 48px 32px',
}

const footer_text = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const unsubscribe_text = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0',
}

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
}
