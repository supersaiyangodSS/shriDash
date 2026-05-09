# Temple Ops API

Production-grade temple operations backend with a REST API and a server-rendered web dashboard for user management, sevekari records, authentication, profile views, and audit logging.

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
9. Web Dashboard
10. API Documentation
11. Authentication & Authorization
12. API Endpoints
13. Scripts
14. Testing
15. Notes

---

## Overview

This project is a scalable **Express + TypeScript backend** with:

* JWT-based authentication (cookie + bearer token support)
* Role-based access control (`user`, `admin`, `superadmin`)
* Request validation using Zod
* MongoDB integration via Mongoose
* Audit logging for critical actions
* Swagger documentation (non-production environments only)
* Server-rendered Handlebars pages for login, signup, dashboard
* HTMX-powered dashboard section rendering through a web BFF layer

**Base API Prefix:** `/api`

**Web App Entry:** `/`

---

## Tech Stack

* Node.js
* Express 5
* TypeScript
* MongoDB + Mongoose
* Zod
* JWT
* Nodemailer
* Express Handlebars
* HTMX
* Tailwind CSS
* Axios
* Jest
* Swagger (`swagger-jsdoc`, `swagger-ui-express`)
* Pino Logger

---

## Features

* Modular, domain-driven architecture
* Soft delete, restore, and permanent delete flows
* Email verification for onboarding
* Pagination support (users, audit logs)
* Security middlewares
* Centralized error handling using custom `AppError`
* Web login and logout flows backed by the API
* Admin/superadmin signup page for creating users
* Custom Dashboard

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
    web/
    users/
      audit/
    sevekari/
    temple/
    audit/
  router/
  utils/
  views/
    layouts/
    pages/
    partials/
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
pnpm install
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

* `PORT` - Application port (default: 4000)
* `MONGO_URI` - MongoDB connection string
* `JWT_SECRET` - Secret used for signing authentication tokens
* `NODE_ENV` - Controls production-specific behavior
* `SERVER_EMAIL` / `SERVER_EMAIL_SECRET` - Used for email services
* `TEMPLE_ID` - Required when creating sevekari records
* `BASE_API_URL` - Base URL of this API, including the `/api` prefix for the web BFF calls

---

## Running the Application

### Development (watch mode)

```
pnpm dev
```

### Tailwind CSS (watch mode)

```
pnpm css
```

### Production

```
pnpm build
pnpm main
```

---

## Web Dashboard

The app includes server-rendered web pages mounted at `/`.

| Method | Endpoint    | Access                  | Description                          |
| ------ | ----------- | ----------------------- | ------------------------------------ |
| GET    | `/`         | Authenticated           | Dashboard shell                      |
| GET    | `/login`    | Public                  | Login page                           |
| POST   | `/login`    | Public                  | Login form submission via API BFF    |
| POST   | `/logout`   | Authenticated           | Logout through API and HTMX redirect |
| GET    | `/signup`   | admin, superadmin       | User signup page                     |
| POST   | `/signup`   | admin, superadmin       | User creation via API BFF            |
| GET    | `/profile`  | user, admin, superadmin | Current user profile dashboard view  |
| GET    | `/settings` | admin, superadmin       | Settings dashboard view              |

Dashboard sections use `renderHTMX` so normal requests render inside the `dashboard` layout, while HTMX requests return only the requested section partial.

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
| GET    | `/user/me`                  | user, admin, superadmin |
| DELETE | `/user/:id`                 | admin, superadmin       |
| DELETE | `/user/:id/force`           | superadmin              |
| PATCH  | `/user/:id/restore`         | admin, superadmin       |
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

| Script              | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Run app using nodemon                  |
| `pnpm build`        | Transpile TypeScript into `dist`       |
| `pnpm main`         | Run compiled app from `dist/server.js` |
| `pnpm css`          | Watch and compile Tailwind CSS         |
| `pnpm test`         | Run Jest tests                         |
| `pnpm format`       | Format code using Prettier             |
| `pnpm format:check` | Check formatting                       |

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
