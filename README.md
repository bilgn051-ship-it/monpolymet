# Monpolymet Workspace

Three sibling projects:

| Folder | Stack | Purpose | Dev URL |
|---|---|---|---|
| `Monpolymet-WEB` | React 19 + Vite (JSX) | Public website | http://localhost:5173 |
| `Monpolymet-Admin` | React 19 + Vite (JSX) + React Router | Admin dashboard managing all site content | http://localhost:5174 |
| `Monpolymet-API` | NestJS + Mongoose (TypeScript) | REST API backed by MongoDB | http://localhost:4000/api |

## Getting started

Prerequisites: Node.js ≥ 20, MongoDB running locally (or set `MONGODB_URI`).

```sh
# API
cd Monpolymet-API
npm install
npm run start:dev        # http://localhost:4000/api

# Admin dashboard
cd Monpolymet-Admin
npm install
npm run dev              # http://localhost:5175 (or next free port)

# Public website
cd Monpolymet-WEB
npm install
npm run dev              # http://localhost:5173
```

## Architecture notes

- **Database design** — see `Monpolymet-API/DATABASE.md`. Every website
  section maps to a MongoDB collection (or a singleton document) so the
  admin dashboard can manage all public content. All visitor-facing text is
  bilingual (`{ mn, en }`).
- **Shared components** — the admin project uses the same React/JSX + Vite
  setup as the public site so presentational components (`components/ui/`)
  can be shared/copied between them.
- **Phase 1 (done)** — public-site refactor, API scaffolding + full schema,
  admin scaffolding with routing skeleton.
- **Phase 2 (next)** — API auth + CRUD endpoints, admin CRUD screens, public
  site switched from localStorage/mock data to the API, seed script
  migrating `mockData.js` / `translations.js` content into MongoDB.
