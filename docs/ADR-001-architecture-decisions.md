# Architecture Decision Record (ADR-001)

## Title: FitFlow Redesign Core Architecture & Technology Selection
- **Status**: Approved & Accepted
- **Deciders**: Lead Architect, Full-Stack Engineering Team, AI Team
- **Date**: 2026-09-18

---

## 1. Context and Problem Statement
The FitFlow application is undergoing a comprehensive redesign to deliver a best-in-class multi-platform fitness tracking, AI coaching, and community experience. Key requirements include:
- Cross-platform parity across iOS, Android, and Web with 60 FPS responsiveness.
- Real-time active workout telemetry and interactive audio coaching.
- Dedicated machine learning engine for personalized fitness and nutrition guidance.
- Strict data privacy and relational consistency for biometrics and health records.

---

## 2. Decision
We have decided to adopt the following architectural stack:
1. **Frontend**: Flutter for universal Android, iOS, and Web rendering.
2. **Main API Backend**: Node.js with NestJS in TypeScript, utilizing modular architecture and WebSockets.
3. **AI / ML Microservice**: Python 3.11 with FastAPI for algorithmic recommendation and biometric analysis.
4. **Primary Database**: PostgreSQL managed with Prisma ORM.
5. **In-Memory Cache**: Redis 7.x for hot workout routines, session tokens, and leaderboard sorted sets.
6. **Authentication & Identity**: Supabase Auth with PostgreSQL Row-Level Security (RLS).

---

## 3. Rationale & Trade-Offs

### Positive Consequences
- **Code Reuse**: Over 85% shared code between mobile and web via Flutter.
- **Service Isolation**: High-compute AI training and inference do not degrade API Gateway response times.
- **Type Safety**: End-to-end TypeScript interfaces between NestJS and client interfaces.
- **Relational Integrity**: Zero risk of orphaned workout sets or corrupted nutrition histories.

### Negative Consequences / Mitigations
- **Multi-Language Operational Overhead**: Maintaining Dart, TypeScript, and Python requires coordinated CI/CD pipelines.
- **Mitigation**: Dockerized container orchestration with unified OpenAPI contracts and shared JSON schema generation.
