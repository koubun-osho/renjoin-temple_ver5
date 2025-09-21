# Phase 0 Readiness Checklist

## Account & Access Status
- **Sanity**: account setup required (owner to provide project ID + read token).
- **Vercel**: account setup required (owner to create project after repository is pushed).
- **GitHub**: repository to be linked after initial commit; no remote configured yet.

## Environment Variable Handling
- Store all secrets in `.env.local` (local only) and Vercel project settings; never commit secrets.
- Share credential values over secure channel; rotate tokens immediately if exposure is suspected.
- Limit Sanity tokens to read-only for the frontend; maintain write tokens exclusively within Studio.
- Use placeholder keys (`TODO_`) in committed config files and document required variables in `docs/env-reference.md`.

## Next Actions Before Coding
1. Collect confirmation that Sanity/Vercel/GitHub accounts can be provisioned this week.
2. Prepare `.env.local` template with placeholder keys once credentials arrive.
3. Configure Vercel environment variables before enabling automatic deployments.
4. Verify `.gitignore` covers `.env*` and other sensitive artefacts (checked into repo).

