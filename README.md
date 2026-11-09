# White Lotus Group — Property Showcase & Inquiry Manager

A full-stack luxury real estate application for exploring residences and managing buyer inquiries.

## Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Lucide React
- **Backend:** Node.js, Express, MongoDB, Mongoose, Zod
- **Package manager:** npm

## Project structure

```text
white-lotus-property-manager/
├── client/                 # React frontend
├── server/                 # Express API
├── package.json            # Root scripts
├── AI_USAGE.md
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

## Environment variables

Copy the example files and adjust as needed:

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

## Install

```bash
npm run install:all
```

## Run

Start both apps:

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

## API overview

### Health
- `GET /api/health`

### Properties
- `GET /api/properties` — supports `location`, `bedrooms`, `sort`, `page`, `limit`
- `GET /api/properties/:id`
- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`

### Inquiries
- `POST /api/inquiries`
- `GET /api/inquiries`
- `PATCH /api/inquiries/:id/status`

## Frontend routes

- `/` — Public property showcase
- `/properties/:id` — Property detail
- `/admin` — Admin dashboard
- `/admin/properties` — Property management
- `/admin/properties/new` — Add property
- `/admin/properties/:id/edit` — Edit property
- `/admin/inquiries` — Inquiry management

## Current phase status

Completed in this phase:

- Monorepo scaffolding
- Express foundation with CORS, JSON parsing, MongoDB connection, and centralized errors
- Property and Inquiry models
- REST route structure with Zod validation
- React foundation with routing, Axios client, Tailwind theme, and reusable UI primitives

Still to complete:

- Full admin CRUD forms
- Public inquiry form submission
- Seed data / richer property media handling
- Auth for admin routes (if required by assignment)
