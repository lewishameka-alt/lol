# Lewis

Photorealistic Instagram shot studio for **Lewis Hameka**.

The goal: every prompt should produce images that look like a normal phone photo of a
19-year-old bloke in regional Victoria — not AI. Realism always wins.

- **`@lol/server`** — Express + TypeScript API (profile, categories, shot prompts)
- **`@lol/web`** — Vite + React client for browsing shots and copying prompts

## Requirements

- Node.js `>= 20` (developed against Node 22)
- npm `>= 10`

## Getting started

```bash
npm ci        # install all workspace dependencies
npm run dev   # start API (:3001) and web client (:5173) together
```

Then open http://localhost:5173. The Vite dev server proxies `/api/*` to the API on
port `3001`.

## How generation works

1. Pick a category (selfie, mirror, gym, car, dog, casual, work, nights out).
2. Copy the ready-made prompt — it already locks height, build, location, sunglasses, and phone-photo realism.
3. In Cursor chat, upload reference photos of Lewis and ask for variations of that shot.
4. Match Lewis only from refs. Sunglasses on his face in every photo. Never recreate mates from refs — invent different people.
5. Keep lighting natural; no text overlays unless asked.

## Project layout

```
packages/
  server/   Express API (@lol/server)
  web/      Vite + React client (@lol/web)
```

## Common commands

| Command | Description |
| --- | --- |
| `npm run dev` | Run API and web client together (hot reload) |
| `npm run build` | Type-check and build both packages |
| `npm test` | Run all workspace tests (Vitest) |
| `npm run lint` | Lint all packages (ESLint) |
| `npm run typecheck` | Type-check all packages |
| `npm start` | Run the built API (`@lol/server`) |

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Liveness probe |
| GET | `/api/profile` | Lewis subject + style rules |
| GET | `/api/categories` | Shot categories |
| GET | `/api/shots` | List shots (`?category=` optional) |
| GET | `/api/shots/random` | Random shot (`?exclude=` / `?category=`) |
| GET | `/api/shots/:id` | Shot by id |
