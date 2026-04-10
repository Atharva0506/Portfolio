# Atharva Naik Portfolio

My personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

Live site: https://atharvanaik.me/

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- MDX content pipeline
- Resend (contact form emails)

## Local Development

Prerequisites:

- Node.js 24.x
- pnpm

Install and run:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

### Environment Variables

Create a `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_key
```

`RESEND_API_KEY` is required for the contact form email flow.

## Scripts

```bash
pnpm dev    # Start development server
pnpm build  # Build for production
pnpm start  # Start production server
pnpm lint   # Run ESLint
```

## Content

- `content/posts`: Blog posts in MDX
- `content/projects`: Project writeups in MDX
- `public/images`: Post and project images

## License

- Code: MIT ([LICENSE.md](./LICENSE.md))
- Content in `content/`: CC BY 4.0