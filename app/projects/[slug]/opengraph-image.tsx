import { ImageResponse } from 'next/og'
import { getProjectBySlug } from '@/lib/projects'

export const runtime = 'edge'

export const alt = 'Atharva Naik - AI Full Stack Developer'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  const title = project?.metadata.title || 'Atharva Naik'
  const summary = project?.metadata.summary || 'AI Full Stack Developer'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '40px 80px',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #10b981, #3b82f6)',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Atharva Naik
          </div>
          <div
            style={{
              marginLeft: 16,
              marginRight: 16,
              fontSize: 32,
              color: '#666'
            }}
          >
            |
          </div>
          <div style={{ fontSize: 32, color: '#a3a3a3' }}>AI Developer</div>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            color: '#ffffff'
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 32,
            color: '#a3a3a3',
            maxWidth: '900px',
            lineHeight: 1.4
          }}
        >
          {summary}
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
