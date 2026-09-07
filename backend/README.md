# RakthaSethu Backend Service

Express + TypeScript REST API for RakthaSethu.

## Phase 1 foundation
- Security middleware: Helmet, CORS, rate limiting.
- Environment validation with Zod.
- Modular API route boundaries for all planned feature areas.
- JWT utility and auth middleware scaffolding.
- Prisma integration path to shared schema.

## Run locally
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

API base URL: `http://localhost:4000/api/v1`
