# lol

A tiny full-stack developer joke generator, used to exercise a complete Cloud Agent
development environment end to end.

- **`@lol/server`** — an [Express](https://expressjs.com/) + TypeScript JSON API.
- **`@lol/web`** — a [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript client.

The web client fetches a random joke from the API and lets you reveal the punchline.

## Requirements

- Node.js `>= 20` (developed against Node 22)
- npm `>= 10`

## Getting started

```bash
npm ci        # install all workspace dependencies
npm run dev   # start API (:3001) and web client (:5173) together
```

Then open http://localhost:5173. The Vite dev server proxies `/api/*` to the API on
port `3001`, so no extra configuration is needed.

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
| GET | `/api/jokes` | List all jokes |
| GET | `/api/jokes/random` | Return a random joke |
| GET | `/api/jokes/:id` | Return a joke by id |
