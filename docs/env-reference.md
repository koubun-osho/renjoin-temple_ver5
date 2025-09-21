# Environment Variable Reference

| Variable | Scope | Description | Example Value |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public (read) | Sanity project identifier used by the frontend client. | `TODO_SANITY_PROJECT_ID` |
| `NEXT_PUBLIC_SANITY_DATASET` | Public (read) | Target dataset for content queries. | `production` |
| `SANITY_API_TOKEN` | Server only | Read-only token for ISR/SSG data fetching when needed. | `TODO_SANITY_READ_TOKEN` |
| `NEXT_PUBLIC_GA_ID` | Public (read) | Google Analytics 4 measurement ID. | `G-XXXXXXXXXX` |

> All secrets must be stored in `.env.local` locally and in Vercel project settings for deployments. Never commit real values.

