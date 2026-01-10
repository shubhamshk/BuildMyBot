# Next.js Landing Page Setup

This project now includes a premium glassmorphic landing page built with Next.js App Router.

## Running the Development Server

```bash
npm run dev
```

The landing page will be available at `http://localhost:3000`

## Project Structure

- `app/page.tsx` - Main landing page with all sections
- `app/layout.tsx` - Root layout with theme provider
- `app/globals.css` - Global styles with glassmorphism utilities
- `components/theme-provider.tsx` - Theme context provider
- `components/theme-toggle.tsx` - Dark/light mode toggle

## Features Implemented

✅ Hero section with calm animations
✅ Product preview with demo UI
✅ How It Works section (3 steps)
✅ Why This Tool section (4 features)
✅ Feature Highlights (3 alternating sections)
✅ Roadmap section
✅ Final CTA section
✅ Footer with theme toggle

## Design System

- **Theme**: Dark by default, light mode optional
- **Glassmorphism**: Backdrop blur with low opacity (4-8%)
- **Colors**: Deep neutral dark background, soft violet/blue accents
- **Animations**: Subtle fade-in and slide-up using Framer Motion
- **Typography**: Inter font from Google Fonts

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion (subtle animations)
- next-themes (theme management)
- Lucide React (icons)
