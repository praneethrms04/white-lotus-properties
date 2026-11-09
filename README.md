# White Lotus Group — Property Showcase & Inquiry Manager

A full-stack luxury real estate application for exploring residences and managing buyer inquiries.

## Architecture

```text
white-lotus-property-manager/
├── client/     # React + TypeScript (Vite, Tailwind, React Router, Axios, TanStack Query)
├── server/     # Express + TypeScript (MongoDB/Mongoose, Zod, tsx)
├── package.json
├── README.md
└── AI_USAGE.md
```

- **Public app:** homepage, property collection, property detail + inquiry form
- **Admin portal:** dashboard, property CRUD, inquiry status management
- **API:** REST JSON under `/api` with consistent `{ success, message, data, meta? }` responses
- **Client server-state:** TanStack Query v5 (caching, mutations, invalidation)

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, Axios, TanStack Query v5
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

## TanStack Query (client)

Server state is managed with **TanStack Query v5**. Axios remains the HTTP client (`client/src/api/*`). Local UI state (form drafts, dialogs, gallery index) stays in React `useState`.

### QueryClient defaults

Configured in `client/src/lib/queryClient.ts` and provided from `client/src/main.tsx`:

| Option | Value |
|---|---|
| `staleTime` | 60 seconds |
| `gcTime` | 5 minutes |
| `retry` | 1 (queries) |
| `refetchOnWindowFocus` | `false` |

React Query Devtools load only when `import.meta.env.DEV` is true.

### Query key conventions

Centralized in `client/src/lib/queryKeys.ts`:

```ts
propertyKeys.all
propertyKeys.lists()
propertyKeys.list(filters)   // search, bedrooms, type, featured, sort, page, limit, …
propertyKeys.detail(id)

inquiryKeys.all
inquiryKeys.lists()
inquiryKeys.list(filters)    // search, status, page, limit, …
inquiryKeys.detail(id)
```

Filter objects are part of the key so distinct filter combinations cache separately. Avoid inline unstable objects for keys outside these factories.

### Query / mutation hooks

| Hook | Purpose |
|---|---|
| `useProperties(filters)` | Property lists (public + admin) |
| `useProperty(id)` | Property detail (`enabled` when `id` is present) |
| `useInquiries(filters)` | Inquiry lists |
| `useInquiry(id)` | Inquiry detail (available; unused by current UI) |
| `useCreateProperty` / `useUpdateProperty` / `useDeleteProperty` | Admin property mutations |
| `useCreateInquiry` | Public inquiry submission |
| `useUpdateInquiryStatus` | Admin inquiry status updates |

### Cache invalidation

- Create/update/delete property → invalidate `propertyKeys.lists()`; update/delete also touch `propertyKeys.detail(id)`; delete also invalidates `inquiryKeys.lists()` (orphaned inquiry UI).
- Create inquiry / update inquiry status → invalidate `inquiryKeys.lists()`; status update also writes `inquiryKeys.detail(id)`.

### Example

```ts
const { data, isLoading, error } = useProperties({ featured: true, limit: 3, sort: 'newest' });
const properties = data?.data ?? [];

const createInquiry = useCreateInquiry();
await createInquiry.mutateAsync({ property, name, email, phone, message });
```

## Known limitations

- Admin portal has no authentication yet — required before production.
- Images are URL-based (no upload service).
- Property delete does not cascade-delete inquiries; admin shows “Property unavailable”.
- Seed data is fictional/illustrative for demos only.
- No automated unit/e2e test suite is included yet (use typecheck/build/API smoke + seed checks).
