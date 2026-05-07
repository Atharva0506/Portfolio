# Atharva Naik — Portfolio

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

🌐 **Live:** [atharvanaik.me](https://atharvanaik.me)

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- MDX content pipeline
- Resend (contact form emails)

## Getting Started

**Prerequisites:** Node.js 24.x, pnpm

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```bash
RESEND_API_KEY=your_resend_key
```

> `RESEND_API_KEY` is required for the contact form to send emails.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Content Structure

```
content/
├── posts/       # Blog posts (MDX)
└── projects/    # Project writeups (MDX)
public/
└── images/      # Post and project images
```

## License

- **Code:** MIT — see [LICENSE.md](./LICENSE.md)
- **Content** (`content/`): CC BY 4.0
