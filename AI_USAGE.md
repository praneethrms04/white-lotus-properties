# AI Usage Log — White Lotus Property Manager

This document records how AI assistance was used during development.

## Tools used

- Cursor Agent (Composer) for scaffolding, backend foundation, and frontend foundation

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

## What was done manually / verified by the developer

- Confirmed Node/npm versions locally
- Created and reviewed environment files (`.env` / `.env.example`)
- Started the API and verified the health endpoint response
- Reviewed generated architecture for modularity and maintainability

## Guardrails followed

- No hardcoded database credentials
- `.env` excluded from git
- Separate frontend and backend apps
- Modular file structure instead of single-file implementations
- Real MongoDB-backed API routes instead of mock-only responses

## Notes for reviewers

AI accelerated boilerplate and consistent structure. Human judgment guided architecture choices, dependency selection, and verification of the health endpoint before claiming readiness.
