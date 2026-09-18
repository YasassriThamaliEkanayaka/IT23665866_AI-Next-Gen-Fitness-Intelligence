# Activity 2 – Backend, Database & Authentication Architecture

## 1. Introduction
The backend infrastructure of **FitFlow Redesign** must handle diverse workloads:
1. **High-Throughput Relational Workloads**: Workout logging, set-by-set telemetry, nutrition journals, user biometrics, and progress history.
2. **AI & ML Workloads**: Generative workout customization, macro target auto-adjustment, recovery score prediction based on sleep/HRV.
3. **Sub-Millisecond Caching & Real-Time Sync**: Session state, active live workouts, leaderboards, and community feeds.
4. **Identity & Compliance**: Enterprise-grade OAuth2/OIDC, JWT claims, role-based access control (RBAC), and HIPAA/GDPR data protection standards.

---

## 2. Backend Framework Comparison

| Metric | Node.js / NestJS (TypeScript) | Python / FastAPI | Go (Golang / Gin) |
| :--- | :---: | :---: | :---: |
| **Architectural Rigor** | ⭐⭐⭐⭐⭐ (Modular DI, Clean Arch) | ⭐⭐⭐⭐ (Lightweight / Async) | ⭐⭐⭐⭐ (Explicit / Structs) |
| **Real-Time WebSockets** | ⭐⭐⭐⭐⭐ (Built-in Gateway / Socket.io) | ⭐⭐⭐⭐ (Asyncio ASGI) | ⭐⭐⭐⭐⭐ (Goroutine Channels) |
| **AI / ML Interoperability** | ⭐⭐⭐ (Requires subprocess/HTTP) | ⭐⭐⭐⭐⭐ (Native PyTorch/NumPy/SciPy) | ⭐⭐⭐ (ONNX bindings) |
| **Developer Velocity** | ⭐⭐⭐⭐⭐ (Shared TS models with client) | ⭐⭐⭐⭐⭐ (Fast prototyping) | ⭐⭐⭐ (Verbose error handling) |
| **Microservices Readiness** | ⭐⭐⭐⭐⭐ (gRPC, NATS, Kafka ready) | ⭐⭐⭐⭐⭐ (REST / OpenAPI) | ⭐⭐⭐⭐⭐ (Ultra-low memory) |
| **Role in FitFlow** | **Core API & Business Logic Gateway** | **Dedicated AI Recommendation Engine**| **Future High-Load Ingestion Layer** |

---

## 3. Database Architecture & Storage Comparison

| Storage Category | PostgreSQL (Selected Relational Core) | MongoDB (Document Store) | Firebase Firestore (NoSQL) | Redis (In-Memory Cache) |
| :--- | :---: | :---: | :---: | :---: |
| **Data Integrity & ACID** | ⭐⭐⭐⭐⭐ Full ACID & Foreign Keys | ⭐⭐⭐ Document-level ACID | ⭐⭐⭐ Eventually Consistent | ⭐⭐⭐ In-Memory / AOF |
| **Complex Analytics & Aggregations** | ⭐⭐⭐⭐⭐ Advanced Window Functions, CTEs | ⭐⭐⭐⭐ Aggregation Pipeline | ⭐⭐ Limited query filters | ⭐⭐ Key-Value / Sorted Sets |
| **JSON & Semi-Structured Data** | ⭐⭐⭐⭐⭐ Native JSONB indexing | ⭐⭐⭐⭐⭐ Native BSON | ⭐⭐⭐⭐ Native Documents | ⭐⭐⭐ JSON modules |
| **Time-Series / Metric History** | ⭐⭐⭐⭐⭐ TimescaleDB extension ready | ⭐⭐⭐ Requires custom sharding | ⭐⭐ High read-cost at scale | ⭐⭐⭐⭐ Real-time ring buffer |
| **Role in FitFlow** | **Primary Database (All Core Entities)** | Not Selected | Real-time Push Notification Sync | **Session, Leaderboard & AI Cache** |

---

## 4. Authentication & Security Comparison

| Auth Solution | Supabase Auth (Selected) | Firebase Auth | Auth0 (Okta) | Custom OAuth2/JWT |
| :--- | :---: | :---: | :---: | :---: |
| **PostgreSQL Integration** | ⭐⭐⭐⭐⭐ Native Row Level Security (RLS) | ⭐⭐ Requires custom claims sync | ⭐⭐⭐ Webhook sync needed | ⭐⭐⭐ Manual schema design |
| **Self-Hosting / Data Privacy** | ⭐⭐⭐⭐⭐ Full control over user health data | ⭐ Vendor Lock-in (GCP) | ⭐ Cloud only | ⭐⭐⭐⭐⭐ Full control |
| **Cost at Scale** | ⭐⭐⭐⭐⭐ Predictable open-source / tiered | ⭐⭐⭐ Usage spike penalties | ⭐ Expensive MAU tiers | ⭐⭐⭐ Infrastructure only |
| **MFA & Social Logins** | ⭐⭐⭐⭐⭐ Google, Apple, GitHub, Email OTP | ⭐⭐⭐⭐⭐ Google, Apple, SMS | ⭐⭐⭐⭐⭐ Enterprise SSO | ⭐⭐⭐ High build effort |

---

## 5. End-to-End System Security Strategy
- **Transport Layer**: Enforced TLS 1.3 encryption across all public and internal service meshes.
- **Data At Rest**: AES-256 encryption on PostgreSQL table spaces and Redis persistence files.
- **Row-Level Security (RLS)**: Users can only query and mutate their own biometrics, workouts, and private nutrition logs.
- **Token Hygiene**: Short-lived JWTs (15 min) paired with cryptographically signed httpOnly Refresh Tokens stored in secure platform storage (Flutter Secure Storage / Keychain).
