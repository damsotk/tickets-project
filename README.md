```markdown
# Game Server Web Portal

https://elium.site

A web portal made for a private game server community.

It gives players a simple place to join the server, check available services, talk with support, send anonymous Discord messages, and manage their profile.  
Admins get a separate panel for tickets, server logs, whitelist requests, and player whitelist management.

Built with **Next.js 15**, **TypeScript**, **PostgreSQL**, **Prisma**, **Upstash Redis**, and **Discord OAuth2**.

---

## Features

### For players

| Route              | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `/shop`            | View services available for the site currency                       |
| `/how-to-play`     | Quick guide for starting on the game server                         |
| `/tickets`         | Real-time conversation with support staff on an open ticket         |
| `/discord-message` | Send an anonymous message to the community Discord through Webhooks |
| `/auth`            | Login/register with email and password or Discord OAuth2            |
| `/profile`         | User profile with account info and stats                            |

### For admins

| Route                | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `/admin/all-tickets` | View and manage all tickets created by users                                              |
| `/admin/logs`        | See live logs from the game server                                                        |
| `/admin/whitelist`   | Add players to the whitelist, view whitelisted players, and handle whitelist applications |

---

## Tech Stack

| Layer                   | Technology                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Framework               | Next.js 15 — App Router, Server Components, Server Actions |
| Language                | TypeScript                                                 |
| Database                | PostgreSQL via Neon                                        |
| ORM                     | Prisma                                                     |
| Caching / Rate limiting | Upstash Redis                                              |
| Auth                    | JWT, bcrypt, Discord OAuth2                                |
| Styling                 | CSS Modules                                                |
| Deployment              | Vercel                                                     |
```
