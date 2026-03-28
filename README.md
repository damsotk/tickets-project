<div align="center">

# Community Portal

A full-stack web platform for an online game community — support tickets, real-time messaging, a lore wiki, Discord integration, and a live admin panel.

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://upstash.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

**[→ Live Demo](https://tickets-project-delta.vercel.app/)**

</div>

---

## Overview

Community Portal is a production web application serving an active online roleplay community of 30–60 concurrent players. The platform covers the full communication layer between players and staff: structured support tickets, a real-time messenger, a lore wiki, and a Discord integration — all available in 5 languages.

---

## Pages & Features

### For Players

| Route              | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `/articles`        | Lore wiki — characters, cities, factions, beliefs, and world history            |
| `/create-ticket`   | Open a support ticket by category: complaint, lore question, or technical issue |
| `/tickets`         | Real-time conversation with support staff on an open ticket                     |
| `/discord-message` | Send an anonymous message to the community Discord via Webhooks                 |
| `/auth`            | Auth with email/password or Discord OAuth2                                      |
| `/profile`         | User profile with account info and stats                                        |

### For Admins

| Route                | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `/admin/all-tickets` | Unified inbox — all player tickets with status and category filters |
| `/admin/logs`        | Live player activity streamed from the game server                  |

---

## Tech Stack

| Layer                       | Technology                                                 |
| --------------------------- | ---------------------------------------------------------- |
| **Framework**               | Next.js 15 — App Router, Server Components, Server Actions |
| **Language**                | TypeScript                                                 |
| **Database**                | PostgreSQL via Neon                                        |
| **ORM**                     | Prisma                                                     |
| **Caching / Rate limiting** | Upstash Redis                                              |
| **Auth**                    | JWT · bcrypt · Discord OAuth2                              |
| **Styling**                 | CSS Modules                                                |
| **Deployment**              | Vercel                                                     |

---

## Architecture Notes

**Authentication** — Stateless JWT with 7-day access tokens and 30-day refresh tokens stored in `httpOnly` cookies. Refresh token rotation on each use. Edge-compatible token verification in middleware with role-based route protection (user / admin).

**Rate limiting** — Sliding window counters in Upstash Redis. Auth endpoints (login, register) limited by IP. Write endpoints (send message, create ticket) limited by user ID after token verification.

**Optimistic UI** — Messages appear instantly before server confirmation, with silent automatic rollback on failure.

**Discord integration** — Anonymous messages route through Discord Webhooks to a community announcement channel. No user data is attached.

**i18n** — All UI strings are externalized to locale files. Route-level locale detection with 5 supported languages across every page and component.

**Admin logs** — Player actions and server events are fetched from the game server API and rendered in the admin panel in real time.

---
