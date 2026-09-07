# RakthaSethu – A Smart AI-Powered Blood Donation System

RakthaSethu is a full-stack healthcare platform connecting donors, patients, hospitals, blood banks, and admins.

## Repository structure

```text
RakthaSethu/
├── frontend/   # React + TypeScript + Vite + Tailwind
├── backend/    # Node.js + Express + TypeScript REST API
├── ai/         # Python modular donor matching service
├── database/   # Prisma schema + PostgreSQL setup
├── docs/       # Architecture and implementation status
├── .env.example
└── README.md
```

## Phase 1 status (completed)
- Clean multi-service project structure initialized.
- Frontend scaffolded with routing/layout foundation and responsive healthcare baseline UI.
- Backend scaffolded with modular routes, error handling, env validation, and API security middleware.
- Prisma schema created with all required core models:
  `User`, `DonorProfile`, `PatientProfile`, `Hospital`, `BloodBank`, `BloodRequest`, `Donation`, `BloodInventory`, `Notification`, `DonorMatch`, `AuditLog`.
- AI service scaffolded as a separate Python service with transparent rule-based donor ranking.
- Environment templates and service documentation added.

## Tech stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **AI service:** Python (FastAPI modular service)

## Quick start

### 1) Clone and install
```bash
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 2) Configure environment
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp ai/.env.example ai/.env
```

### 3) Start PostgreSQL (development)
```bash
cd database
docker compose up -d
```

### 4) Generate Prisma client
```bash
npm --prefix backend run prisma:generate
```

### 5) Run services
```bash
# Terminal 1
npm run dev:frontend

# Terminal 2
npm run dev:backend

# Terminal 3
cd ai
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Build checks
```bash
npm run build
```

## API and service base URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000/api/v1`
- AI service: `http://localhost:8000/api/v1`

## Notes
- The AI service currently uses a **rule-based scoring engine**; no trained ML model is claimed in Phase 1.
- Upcoming phases implement authentication, role workflows, matching orchestration, notifications, and admin analytics.
