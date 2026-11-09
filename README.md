# White Lotus Group — Property Showcase & Inquiry Manager

A full-stack luxury real estate application for exploring residences and managing buyer inquiries.

## Stack

- **Frontend:** React + TypeScript (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend:** Node.js + TypeScript, Express, MongoDB, Mongoose, Zod, tsx
- **Package manager:** npm

## Project structure

```text
white-lotus-property-manager/
├── client/                 # React + TypeScript frontend
├── server/                 # Express + TypeScript API
├── package.json            # Root scripts
├── AI_USAGE.md
└── README.md
```

## Features

### Public showcase
- Browse luxury property listings
- View property detail pages with imagery, amenities, and pricing
- Submit buyer inquiries linked to a specific property

### Admin portal
- Create, edit, and delete properties
- Search and filter property inventory by status
- Review buyer inquiries
- Search inquiries and update status (`new`, `contacted`, `closed`)

> **Production note:** Admin routes are currently unprotected. Add authentication/authorization before deploying to production.

## Prerequisites

- Node.js 18+
- MongoDB running locally or via Docker / Atlas

## Environment variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

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

## Database

Default local database name: `white-lotus`

Docker example:

```bash
docker start white-lotus-mongo
# first time:
# docker run -d --name white-lotus-mongo -p 27017:27017 mongo:7
```

## Install

```bash
npm run install:all
```

## Run

```bash
npm run dev
```

Or separately:

```bash
npm run dev:server
npm run dev:client
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

## Build & typecheck

```bash
npm run typecheck
npm run build
npm run start   # runs compiled backend from server/dist
```

## API endpoints

### Health
- `GET /api/health`

### Properties
- `GET /api/properties` — query: `search`, `location`, `bedrooms`, `status`, `sort`, `page`, `limit`
- `GET /api/properties/:id`
- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`

### Inquiries
- `POST /api/inquiries`
- `GET /api/inquiries` — query: `search`, `status`, `page`, `limit`
- `GET /api/inquiries/:id`
- `PATCH /api/inquiries/:id/status`

All responses use a consistent envelope:

```json
{
  "success": true,
  "message": "...",
  "data": {},
  "meta": { "total": 0, "page": 1, "limit": 12, "totalPages": 1 }
}
```

## Frontend routes

- `/` — Public property showcase
- `/properties/:id` — Property detail + inquiry form
- `/admin` — Admin dashboard
- `/admin/properties` — Property management
- `/admin/properties/new` — Add property
- `/admin/properties/:id/edit` — Edit property
- `/admin/inquiries` — Inquiry management

## Known limitations

- Admin portal has no authentication yet
- Image uploads are URL-based (no file storage service)
- Deleting a property does not cascade-delete related inquiries; admin UI shows “Property unavailable”
- Use `http://localhost:5173` (not `127.0.0.1`) so CORS matches `CLIENT_URL`
