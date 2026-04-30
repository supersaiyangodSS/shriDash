# Shrihari API

Production-grade REST API designed for temple operations, user management, sevekari records, authentication, and audit logging.

---

## Table of Contents

1. Overview
2. Tech Stack
3. Features
4. Project Structure
5. Prerequisites
6. Installation
7. Environment Variables
8. Running the Application
9. API Documentation
10. Authentication & Authorization
11. API Endpoints
12. Scripts
13. Testing
14. Notes

---

## Overview

This project is a scalable **Express + TypeScript backend** with:

* JWT-based authentication (cookie + bearer token support)
* Role-based access control (`user`, `admin`, `superadmin`)
* Request validation using Zod
* MongoDB integration via Mongoose
* Audit logging for critical actions
* Swagger documentation (non-production environments only)

**Base API Prefix:** `/api`

---

## Tech Stack

* Node.js
* Express 5
* TypeScript
* MongoDB + Mongoose
* Zod
* JWT
* Nodemailer
* Jest
* Swagger (`swagger-jsdoc`, `swagger-ui-express`)
* Pino Logger

---

## Features

* Modular, domain-driven architecture (`auth`, `users`, `sevekari`, `temple`, `audit`)
* Soft delete, restore, and permanent delete flows
* Email verification for onboarding
* Pagination support (users, audit logs)
* Security middlewares
* Centralized error handling using custom `AppError`

---

## Project Structure

```
src/
  app.ts
  server.ts
  config/
  constants/
  errors/
  middleware/
  modules/
    auth/
    users/
      audit/
    sevekari/
    temple/
    audit/
  router/
  utils/
```

---

## Prerequisites

* Node.js (v20+ recommended)
* MongoDB instance

---

## Installation

```bash
git clone <repo-url>
cd shrihari
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/shrihari
JWT_SECRET=your_jwt_secret
NODE_ENV=development
SERVER_EMAIL=your_email@gmail.com
SERVER_EMAIL_SECRET=your_email_app_password
TEMPLE_ID=your_existing_temple_object_id
BASE_API_URL=your_base_api_link
```

### Variable Descriptions

* `PORT` — Application port (default: 4000)
* `MONGO_URI` — MongoDB connection string
* `JWT_SECRET` — Secret used for signing authentication tokens
* `NODE_ENV` — Controls production-specific behavior
* `SERVER_EMAIL` / `SERVER_EMAIL_SECRET` — Used for email services
* `TEMPLE_ID` — Required when creating sevekari records
* `BASE_API_URL` — base url of this API (include `/api` prefix if applicable)
---

## Running the Application

### Development (watch mode)

```
npm run dev:nodemon
```

### Production

```
npm run main
```

---

## API Documentation

Interactive API documentation is available via Swagger UI. Swagger UI is enabled only in non-production environments:


```
NODE_ENV !== "production"
```

Access at:

```
http://localhost:<PORT>/api-docs
```

---

## Authentication & Authorization

### Authentication

This API uses JWT-based authentication.

- A token is issued on login and stored in an HTTP-only cookie (`token`).
- Tokens are validated using middleware on protected routes.

---

### Authorization (Roles)

Access to endpoints is controlled using role-based authorization.

Roles:

* `user`
* `admin`
* `superadmin`

Role checks are enforced via middleware on protected routes.

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Auth

| Method | Endpoint       | Access        |
| ------ | -------------- | ------------- |
| POST   | `/auth/login`  | Public        |
| POST   | `/auth/logout` | Authenticated |

---

### Users

| Method | Endpoint                    | Access                  |
| ------ | --------------------------- | ----------------------- |
| POST   | `/user`                     | Public                  |
| GET    | `/user?page=1&limit=10`     | admin, superadmin       |
| DELETE | `/user/:id`                 | admin, superadmin       |
| DELETE | `/user/:id/force`           | superadmin              |
| PATCH  | `/user/:id/restore`         | superadmin              |
| PATCH  | `/user/:id`                 | user, admin, superadmin |
| PATCH  | `/user/:id/reset-password`  | user, admin, superadmin |
| PATCH  | `/user/:id/email`           | user, admin, superadmin |
| GET    | `/user/verify-email/:token` | Public                  |

---

### Sevekari

| Method | Endpoint                | Access            |
| ------ | ----------------------- | ----------------- |
| POST   | `/sevekari`             | admin, superadmin |
| GET    | `/sevekari`             | admin, superadmin |
| PATCH  | `/sevekari/:id`         | admin, superadmin |
| DELETE | `/sevekari/:id`         | admin, superadmin |
| PATCH  | `/sevekari/:id/restore` | superadmin        |
| DELETE | `/sevekari/:id/force`   | superadmin        |

---

### Temple

| Method | Endpoint                  | Access     |
| ------ | ------------------------- | ---------- |
| GET    | `/temple?page=1&limit=10` | superadmin |
| POST   | `/temple`                 | superadmin |

---

### Audit Logs

| Method | Endpoint                 | Access     |
| ------ | ------------------------ | ---------- |
| GET    | `/audit?page=1&limit=10` | superadmin |

---

## Scripts

| Script                 | Description                            |
| ---------------------- | -------------------------------------- |
| `pnpm dev`             | Run app using nodemon                  |
| `pnpm build`           | Transpile the ts files to js inside    |
| `pnpm main`            | Run compiled app from `dist/server.js` |
| `pnpm test`            | Run Jest tests                         |
| `pnpm format`          | Format code using Prettier             |
| `pnpm format:check`    | Check formatting                       |

---

## Testing

Run all tests:

```
pnpm test
```

Test coverage includes:

* Auth module
* Users module
* Sevekari module
