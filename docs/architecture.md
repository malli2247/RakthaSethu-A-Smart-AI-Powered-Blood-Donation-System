# RakthaSethu Architecture (Phase 1)

## Services
- **frontend/**: React + TypeScript + Vite + Tailwind, role-aware route shell and dashboard placeholders.
- **backend/**: Express + TypeScript REST API with secure middleware and modular route boundaries.
- **database/**: PostgreSQL + Prisma schema for all core domain entities.
- **ai/**: Separate Python service for donor matching (currently transparent rule-based scoring).

## Integration boundaries
- Frontend calls backend REST APIs under `/api/v1`.
- Backend uses Prisma client against PostgreSQL.
- Backend will call AI service via `AI_SERVICE_URL` for donor ranking.
- AI service keeps matching API stable so a trained ML model can be added later.

## Security baseline
- Password hashing plan via bcryptjs dependency in backend.
- JWT utility and auth middleware scaffolded.
- Helmet, CORS, input-size limits, and API rate limiting configured.
- Environment values validated on startup.
