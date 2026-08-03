# PRD — Smit Patel Portfolio (Digital Marketing & Growth Specialist)

## Problem Statement
World-class, premium personal portfolio website for a Digital Marketing & Growth Specialist (Smit Patel). Ultra Premium Light theme, Inter font only, accent #2563EB, subtle premium motion. Award-worthy, enterprise-ready feel (Apple/Stripe/Linear/Vercel quality). Includes a working contact form saving to DB and a simple admin page to manage enquiries.

## Architecture
- **Frontend**: React 19 + Tailwind + framer-motion + lenis (smooth scroll). Routes: `/` (Portfolio), `/admin` (Enquiries dashboard). Component-per-section under `src/components/portfolio/`, content centralized in `src/data/content.js`, API client in `src/lib/api.js`.
- **Backend**: FastAPI + Motor (MongoDB), collection `contact_messages`. Routes (all `/api`): POST `/contact`, GET `/contact/messages`, GET `/contact/stats`, PATCH `/contact/messages/{id}`, DELETE `/contact/messages/{id}`.
- **Design**: `/app/design_guidelines.json`.

## User Personas
- Recruiter / hiring manager at an international SaaS company evaluating the candidate.
- Smit (owner) reviewing incoming enquiries via /admin.

## Core Requirements (static)
- Sections: Hero, About, Experience (timeline), Expertise, Case Studies, Marketing Stack (marquee), Why Hire Me, Education, Contact, Footer.
- Sticky nav w/ active highlight + smooth scroll. Fully responsive. Factual copy only (no invented metrics).
- Working contact form + admin management (status: new/read/replied/archived).

## Implemented (2026-08-03)
- Full portfolio single-page site with kinetic hero (masked line reveal), parallax, scroll reveals, editorial marquee.
- Contact form -> MongoDB; success/error toasts (sonner).
- Admin dashboard at /admin: stat cards, search, status filters, status dropdown, message dialog, delete.
- SEO meta tags + semantic sections + lazy-loaded images.
- Tested: backend 11/11 endpoints, frontend critical flows 100%.

## Notes / Placeholders
- Contact details (email/phone/socials) and Resume link are PLACEHOLDERS in `src/data/content.js` — to be updated by user.
- Admin `/admin` has NO authentication (per explicit user request for a "simple admin page").

## Backlog
- P1: Add authentication to /admin (JWT or Emergent Google Auth) when ready to go live.
- P1: Replace placeholder contact info + real resume PDF.
- P2: Email notification on new enquiry (Resend).
- P2: Pagination on messages list.
