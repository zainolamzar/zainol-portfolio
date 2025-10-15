# Zainol Amzar's Portfolio

This is my personal **portfolio website** built with [Next.js](https://nextjs.org/) and deployed seamlessly on [Vercel](https://vercel.com/).  
It showcases my projects, skills, and experience in a clean, modern design.

## Features

- ⚡️ **Fast & SEO-optimized** – Powered by Next.js and server-side rendering.
- 🎨 **Modern UI** – Styled with Tailwind CSS and shadcn/ui components.
- 📱 **Responsive Design** – Fully optimized for desktop, tablet, and mobile.
- 🔍 **Projects Showcase** – Highlighting my latest work with live links.
- 📄 **Dynamic Pages** – Blog, contact form, and project details.
- 🚀 **Deployed on Vercel** – Automatic CI/CD with GitHub integration.

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [shadcn/ui](https://ui.shadcn.com/) – UI components
- [Supabase](https://supabase.com/) – Database
- [Vercel](https://vercel.com/) – Hosting & deployment

## Acknowledgements

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

## Installation

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

## Docker

### Prerequisites

- Docker 24+ and Docker Compose v2
- A `.env` file with required public variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`

### Build and run with Docker

```bash
# Build (supplies public envs needed for prerender)
docker build -t zainol-portfolio \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR-ANON-KEY" .

# Run
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR-ANON-KEY" \
  -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="..." \
  -e NEXT_PUBLIC_EMAILJS_SERVICE_ID="..." \
  -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="..." \
  zainol-portfolio
```

### Using Docker Compose

`docker-compose.yml` is configured to pass build args and runtime envs.

```bash
# Ensure .env has all required vars, then
docker compose build
docker compose up -d
```

Notes:

- The compose volumes are commented out for production. Uncomment for local dev hot-reload.
- Only public envs are used at build time. Keep secrets server-side and pass at runtime.
