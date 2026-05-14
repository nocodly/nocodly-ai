# Nocodly AI — AI-Powered SaaS Dashboard

> A production-ready AI SaaS MVP built with Next.js, Supabase, OpenAI, and Stripe.

![Nocodly AI](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth+DB-3ecf8e?style=flat-square&logo=supabase)
![Stripe](https://img.shields.io/badge/Stripe-Billing-635bff?style=flat-square&logo=stripe)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai)

---

## Features

- **AI Text Generation** — GPT-4o Mini via OpenAI API with prompt templates
- **Supabase Auth** — Sign up, login, forgot password, protected routes
- **Stripe Billing** — Pricing page, checkout, webhooks, subscription management
- **Modern Dashboard** — Usage stats, charts, generation history
- **Beautiful UI** — Dark theme, aurora effects, glassmorphism, framer-motion animations
- **SEO Ready** — Open Graph, Twitter cards, meta tags
- **Production Structure** — Clean folder structure, TypeScript, reusable components

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom CSS |
| UI Components | Custom + Radix UI primitives |
| Animations | Framer Motion |
| Auth + DB | Supabase |
| Payments | Stripe |
| AI | OpenAI GPT-4o / GPT-4o Mini |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, Register, Forgot Password
│   ├── (dashboard)/         # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── page.tsx     # Main dashboard
│   │       ├── generate/    # AI generation
│   │       ├── history/     # Generation history
│   │       ├── billing/     # Subscription & plans
│   │       └── settings/    # Account settings
│   ├── pricing/             # Public pricing page
│   ├── api/
│   │   ├── generate/        # OpenAI API route
│   │   └── stripe/          # Stripe checkout + webhooks
│   ├── layout.tsx
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Button, Card, Input, Badge, Textarea
│   ├── dashboard/           # Sidebar, Header
│   ├── marketing/           # Navbar, Hero, Features, Footer, etc.
│   └── providers.tsx
├── lib/
│   ├── supabase/            # Client + server helpers
│   ├── stripe.ts            # Stripe client + plan config
│   ├── openai.ts            # OpenAI client + generateText
│   └── utils.ts             # cn(), formatDate(), formatNumber()
├── types/
│   └── index.ts             # TypeScript interfaces
└── supabase/
    └── schema.sql           # Complete DB schema with RLS
```

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/nocodly/nocodly-ai.git
cd nocodly-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your keys (see below)
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Copy your `Project URL` and `anon key` to `.env.local`
4. Enable **Email** auth in Authentication → Providers

### 4. Set up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Go to **Products** and create:
   - **Starter** — $9/month recurring
   - **Pro** — $29/month recurring
3. Copy the Price IDs to `.env.local`
4. For webhooks (local): `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### 5. Set up OpenAI

1. Create an API key at [platform.openai.com](https://platform.openai.com/api-keys)
2. Add to `.env.local`

### 6. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — done!

---

## License

MIT — open source, use freely for portfolio and client projects.

---

Built by [Nocodly](https://github.com/nocodly) — AI-powered SaaS development.
