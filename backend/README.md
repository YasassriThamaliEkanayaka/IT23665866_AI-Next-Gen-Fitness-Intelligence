# FitFlow Backend Services (NestJS + TypeScript)

This is the enterprise API Gateway and core domain service for the **FitFlow Redesign** architecture.

## Tech Stack
- **Framework**: NestJS 10.x (TypeScript)
- **Database ORM**: Prisma ORM with PostgreSQL
- **Caching**: Redis 7.x (ioredis)
- **API Documentation**: OpenAPI / Swagger (`/api/docs`)
- **AI Gateway Integration**: REST/gRPC client to Python FastAPI AI service

## Quick Start
```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev --name init

# Start local dev server
npm run start:dev
```
Endpoint documentation: `http://localhost:4000/api/docs`
