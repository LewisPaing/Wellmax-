# WellMax Agency

Public website and secure client portal for [WellMax Advertising and Media](https://wellmaxagency.com/).

## What is included

- Responsive agency website and portfolio
- Service, contact, insight, and case-study pages
- Supabase-backed client authentication
- Client project, file, approval, request, and messaging workspaces
- Administrative client and project management interface
- Search-engine metadata, `robots.txt`, and `sitemap.xml`

## Project structure

- `index.html` — agency homepage
- `about.html`, `service.html`, `contact.html` — primary pages
- `work-*.html` — portfolio case studies
- `insight-*.html` — articles
- `css/` and `js/` — public-site styling and behaviour
- `portal/` — client and administrator portal
- `supabase/` — database setup and row-level security policies
- `images/` — optimized brand and portfolio assets

## Local development

This is a static site. Serve the repository with any local HTTP server and open the generated local URL. Do not open pages directly from the filesystem because browser security rules can affect scripts and routing.

## Deployment

The `main` branch is deployed through GitHub Pages using the custom domain in `CNAME`:

- <https://wellmaxagency.com/>

Changes pushed to `main` should be visually checked on desktop and mobile after deployment.

## Security

The browser-facing Supabase publishable key is intentionally public. Access control must be enforced with Supabase Row Level Security policies.

- Never commit service-role keys, private API keys, passwords, or environment secrets.
- Keep administrative authorization enforced in database policies, not only in browser JavaScript.
- Render client-supplied content with `textContent` or escape it before using `innerHTML`.
- Review the policies in `supabase/` whenever portal features change.

## Ownership

Copyright © WellMax Advertising and Media. All rights reserved.
