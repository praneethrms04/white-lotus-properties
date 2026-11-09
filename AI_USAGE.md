# AI Usage Log — White Lotus Property Manager

This document records how AI assistance was used during development.

## Tools used

- Cursor Agent (Composer) for scaffolding, TypeScript migration, feature implementation, UI polish, and demo seeding

## How AI was used

1. **Project scaffolding**
   - Generated root workspace scripts, `.gitignore`, and independent `client` / `server` applications.
   - Installed the required npm dependencies for React/Vite and Express/MongoDB.

2. **Backend foundation**
   - Structured Express into config, models, routes, controllers, middleware, and validators.
   - Implemented Property and Inquiry Mongoose models.
   - Added Zod validation, ObjectId checks, centralized error handling, and `GET /api/health`.

3. **Frontend foundation**
   - Set up React Router routes for public and admin areas.
   - Added Axios API client wrappers.
   - Created reusable Button, Input, Loading, Empty, and Error components.
   - Applied a luxury visual direction with ivory, charcoal, and muted gold theming.

4. **Phase 1.5 — TypeScript migration**
   - Migrated existing JavaScript sources to strict TypeScript across `client` and `server`.
   - Preserved API contracts and business behavior.

5. **Phase 2 — Property CRUD & inquiry workflows**
   - Extracted backend services for properties and inquiries.
   - Extended inquiry APIs with pagination, detail retrieval, search, and status updates.
   - Built admin property management (list/search/filter/create/edit/delete).
   - Added public inquiry form on property detail pages.
   - Built admin inquiry dashboard with search, status filter, and status updates.

6. **Phase 3 — Premium public UI**
   - Redesigned homepage, property collection page, detail gallery, and public chrome.
   - Polished admin dashboard/sidebar presentation without changing CRUD contracts.
   - Extended property listing filters with optional `propertyType` and `featured` query params.

7. **Phase 4 — Demo data and final integration**
   - Created an idempotent MongoDB seed script for 8 illustrative Bengaluru residences and 7 demo inquiries.
   - Added development-only reset for known demo records with explicit confirmation.
   - Verified seed repeatability, listing filters, inquiry persistence, and image URL availability.
   - Added image `onError` fallbacks for public cards/detail gallery.
   - Updated README with architecture, seed commands, and demo workflow.

## What was verified

- Frontend and backend TypeScript checks
- Frontend and backend production builds
- MongoDB connection
- Property/inquiry CRUD against live MongoDB
- Seed upsert repeatability (no duplicate demo counts)
- Listing filters and pagination via API smoke checks
- Sample Unsplash image URL availability (broken URLs replaced)

## Guardrails followed

- No hardcoded database credentials
- `.env` excluded from git
- Separate frontend and backend apps
- Modular file structure instead of single-file implementations
- Real MongoDB-backed API routes instead of mock-only responses
- Strict TypeScript without `any`, `@ts-ignore`, or `@ts-nocheck`
- Seed reset blocked in production and scoped to known demo records

## Notes for reviewers

AI accelerated implementation and structure. Human review should focus on visual QA across breakpoints, seed content suitability, admin auth before production, and commit boundaries before merge.
