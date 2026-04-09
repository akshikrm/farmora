# Agents Instructions

## Project Overview

Farmora is a farm management SaaS with three components:
- `backend/` — Express.js + Sequelize + PostgreSQL (Bun runtime)
- `frontend/` — React 19 + Vite + TypeScript + Tailwind CSS v4
- `app/farmora/` — Flutter mobile app (Dart)

## Backend

### Runtime & Tools
- Uses **Bun** as runtime — not Node. All scripts use `bun ...` prefix.
- Entry point: `backend/server.js`
- Config: `backend/config/config.js` (reads `backend/.env`)

### Database
- PostgreSQL via Sequelize ORM
- Migrations: `bun run db:migrate`, `db:migrate:undo`, `db:migrate:undo:all`
- Seeds: `bun run db:seed`, `db:seed:undo`, `db:seed:undo:all`
- **Full reset**: `bun run db:refresh` (undo all migrations → migrate → seed)
- Core seed data: `bun run seed:core` (seeds super-admin, default packages, managers, staff, permissions, roles, subscriptions)

### Testing
- `bun run test` — runs `db:refresh` then `vitest --run`
- Tests are in `backend/tests/`
- Requires running DB (migrations must be applied before tests)

### Code Style
- No semicolons, single quotes, trailing commas ES5
- Config: `backend/prettier.config.js`
- Linting: ESLint flat config (`backend/eslint.config.mjs`)

### Path Aliases (backend)
```
@routes/*     → ./src/routes/*.js
@utils/*      → ./src/utils/*.js
@controllers/* → ./src/controllers/*.js
@middlewares/* → ./src/middlewares/*.js
@validators/*  → ./src/validators/*.js
@models/*      → ./models/*.js
@services/*    → ./src/services/*.js
@errors/*      → ./src/errors/*.js
```

## Frontend

### Dev
- `cd frontend && bunx vite` — dev server
- `bun run build` — production build

### Linting
- `bun run lint` runs `eslint .`
- Uses TypeScript ESLint + React Hooks plugin

### Path Aliases (frontend)
```
@api, @pages, @app-types, @errors, @utils, @hooks, @store, @components, @config
```

## Flutter App

- `cd app/farmora`
- `flutter run` / `flutter build apk` etc.
- Analysis: `flutter analyze`
- State management: Provider pattern

## Workflow

- All changes via PR to `main` (see `CONTRIBUTING.md`)
- This is a proprietary/closed project — do not share code
- Contact: **Casper** (@thecaspercraft)

## Notes

- `notes.md` contains current dev backlog/todos
- Mobile app (`app/farmora`) is currently a separate Flutter project
- Backend currently has no TypeScript checking in CI (TypeScript is a devDependency but not enforced)
