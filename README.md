# White Lotus Group — Property Showcase & Inquiry Manager

A full-stack luxury real estate application for exploring residences and managing buyer inquiries.

## Architecture

```text
white-lotus-property-manager/
├── client/     # React + TypeScript (Vite, Tailwind, React Router, Axios)
├── server/     # Express + TypeScript (MongoDB/Mongoose, Zod, tsx)
├── package.json
├── README.md
└── AI_USAGE.md
```

- **Public app:** homepage, property collection, property detail + inquiry form
- **Admin portal:** dashboard, property CRUD, inquiry status management
- **API:** REST JSON under `/api` with consistent `{ success, message, data, meta? }` responses

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, Zod
- Tooling: npm, tsx, concurrently

## Prerequisites

- Node.js 18+
- MongoDB (local Docker/Atlas)
- npm

## Installation

```bash
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
```

## Environment variables

### Server (`server/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | API port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/white-lotus` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |
| `NODE_ENV` | Runtime environment | `development` |

### Client (`client/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

Never commit real `.env` files.

## MongoDB setup

```bash
docker start white-lotus-mongo
# first time:
# docker run -d --name white-lotus-mongo -p 27017:27017 mongo:7
```

Default database name: `white-lotus`

## Seed commands

Demo seed data is illustrative only (not real inventory).

```bash
# Idempotent upsert of 8 properties + 7 inquiries
npm run seed

# Development-only reset of known demo records, then reseed
npm run seed:reset
```

Notes:
- `npm run seed` upserts by stable demo slugs/emails and does **not** wipe unrelated data.
- `npm run seed:reset` requires `CONFIRM_SEED_RESET=YES` (already set in the npm script) and is blocked when `NODE_ENV=production`.
- Reset only removes known demo property slugs and demo inquiry emails / linked demo properties.

## Development commands

```bash
npm run dev          # API + Vite
npm run dev:server
npm run dev:client
npm run typecheck
npm run build
npm run start        # compiled server from server/dist
npm run seed
npm run seed:reset
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health

Use `http://localhost:5173` (not `127.0.0.1`) so CORS matches `CLIENT_URL`.

## API endpoints

### Health
- `GET /api/health`

### Properties
- `GET /api/properties` — `search`, `location`, `bedrooms`, `propertyType`, `status`, `featured`, `sort`, `page`, `limit`
- `GET /api/properties/:id`
- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`

### Inquiries
- `POST /api/inquiries`
- `GET /api/inquiries` — `search`, `status`, `page`, `limit`
- `GET /api/inquiries/:id`
- `PATCH /api/inquiries/:id/status`

## Frontend routes

- `/` — Premium homepage
- `/properties` — Collection + filters
- `/properties/:id` — Detail + inquiry form
- `/admin` — Dashboard
- `/admin/properties` — Property management
- `/admin/properties/new` — Create property
- `/admin/properties/:id/edit` — Edit property
- `/admin/inquiries` — Inquiry management

## Demo workflow

1. Start MongoDB.
2. Copy env files and install dependencies.
3. Run `npm run seed`.
4. Run `npm run dev`.
5. Browse http://localhost:5173 and explore residences.
6. Submit an inquiry from a property detail page.
7. Review/update inquiries in `/admin/inquiries`.
8. Manage inventory in `/admin/properties`.

## Known limitations

- Admin portal has no authentication yet — required before production.
- Images are URL-based (no upload service).
- Property delete does not cascade-delete inquiries; admin shows “Property unavailable”.
- Seed data is fictional/illustrative for demos only.
- No automated unit/e2e test suite is included yet (use typecheck/build/API smoke + seed checks).
