# RakthaSethu – Smart AI-Powered Blood Donation System

RakthaSethu is a healthcare-focused full-stack platform for connecting donors, patients, hospitals, blood banks, and admins to improve blood-request response time, especially during emergencies.

## Current Implementation Status

### ✅ Phase 1 (Implemented)
- Monorepo structure for frontend, backend, and AI service
- React + TypeScript frontend scaffold with Tailwind CSS
- Express + TypeScript backend scaffold with baseline security middleware
- Prisma + PostgreSQL schema with core domain models and constraints
- Python FastAPI AI service with transparent rule-based donor ranking
- Environment templates for all services
- Initial backend health endpoint test (Vitest + Supertest)

### 🚧 Next Phases (Planned)
- Phase 2: Authentication, RBAC, profile creation/update flows
- Phase 3: Donor/patient management + blood requests
- Phase 4: Hospital/blood-bank modules + inventory APIs
- Phase 5: Advanced matching and location intelligence improvements
- Phase 6: Notifications + emergency workflows
- Phase 7: Admin dashboards + analytics + expanded security
- Phase 8: Broader testing, performance hardening, deployment prep

---

## Architecture

```text
rakthasethu/
├── apps/
│   └── web/                # React + TypeScript + Tailwind frontend
├── services/
│   ├── api/                # Node.js + Express + TypeScript backend
│   │   ├── prisma/         # Prisma schema
│   │   └── src/
│   │       ├── config/
│   │       ├── middleware/
│   │       ├── routes/
│   │       └── tests/
│   └── ai/                 # FastAPI rule-based matching service
└── README.md
```

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **AI Service:** Python, FastAPI (rule-based matching architecture)
- **Testing:** Vitest, Supertest (backend baseline)

## Implemented Core Foundations

### Backend API Baseline
- `GET /api/v1/health` health endpoint
- Centralized error handling middleware
- Security middleware: Helmet, CORS, Rate limiting
- Logging middleware: Morgan
- Environment validation with Zod

### Database Models (Prisma)
- User
- DonorProfile
- PatientProfile
- Hospital
- BloodBank
- BloodRequest
- Donation
- BloodInventory
- Notification
- Match
- AuditLog

Includes primary keys, foreign keys, indexes, timestamps, and status/role enums.

### AI Service Baseline
- `GET /health` endpoint
- `POST /match` endpoint for transparent rule-based donor ranking
- Ranking factors currently include:
  - blood-group compatibility
  - donor availability
  - approximate location distance (when coordinates are available)
  - last donation recency
  - donor response rate
  - emergency priority weighting

> No trained ML model is claimed or used at this stage.

---

## Setup Instructions

## 1) Prerequisites
- Node.js 20+
- npm 10+
- Python 3.11+
- PostgreSQL 15+

## 2) Install dependencies

Frontend:
```bash
cd apps/web
npm install
```

Backend:
```bash
cd services/api
npm install
```

AI service:
```bash
cd services/ai
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 3) Environment variables

Copy and configure:
- `apps/web/.env.example` → `apps/web/.env`
- `services/api/.env.example` → `services/api/.env`
- `services/ai/.env.example` → `services/ai/.env`

### Backend (`services/api/.env.example`)
- `NODE_ENV`
- `PORT`
- `API_PREFIX`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`

### Frontend (`apps/web/.env.example`)
- `VITE_API_BASE_URL`

### AI (`services/ai/.env.example`)
- `AI_SERVICE_PORT`

## 4) Database setup

From `services/api`:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 5) Run services

Frontend:
```bash
cd apps/web
npm run dev
```

Backend:
```bash
cd services/api
npm run dev
```

AI service:
```bash
cd services/ai
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

---

## API Baseline

### Backend
- `GET /api/v1/health`

### AI service
- `GET /health`
- `POST /match`

## Security Notes

Current baseline includes:
- password-hashing dependencies prepared (`bcryptjs`)
- JWT dependency prepared (`jsonwebtoken`)
- request rate limiting
- environment validation
- CORS + Helmet defaults
- audit log model in schema for sensitive operation tracking

Further hardening (auth flows, RBAC enforcement, request validation per endpoint, reset-token flows) is planned for Phase 2+.

## Development Roadmap

1. Phase 1 — Foundation ✅
2. Phase 2 — Authentication, role onboarding, protected routes
3. Phase 3 — Donor/patient profile and blood request flows
4. Phase 4 — Hospital and blood bank operations + inventory APIs
5. Phase 5 — Matching enhancements + location-based discovery
6. Phase 6 — Notification and emergency orchestration
7. Phase 7 — Admin dashboard and analytics
8. Phase 8 — Comprehensive testing and deployment readiness

## Notes

- This repository currently contains a **real working baseline**, not mocked production claims.
- Seed/demo data, when introduced later, will be explicitly labeled.
