# Open Andrade Registrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public Open Andrade registration form, show the R$ 30 or R$ 45 Pix amount based on selected modalities only after a saved registration, and let an authenticated organizer track registrations and payment status in the existing Neon database.

**Architecture:** Keep the feature in the existing Next.js App Router app on Vercel. Public and admin screens use same-origin Route Handlers; those handlers use Neon’s serverless driver and the existing production database. Use a single event-specific table, signed HttpOnly admin session cookies, and a BR Code generated server-side from the supplied Pix details and selected modalities.

**Tech Stack:** Next.js 16.3.3, React 19, Tailwind CSS 4, TypeScript, `@neondatabase/serverless`, `qrcode.react`.

**Spec:** `docs/superpowers/specs/2026-10-27-open-andrade-inscricoes-design.md`

## Global Constraints

- Collect only responsible name, student name, Kyorugui, and Poomsae; at least one modality is required.
- Charge R$ 30,00 per student for one modality and R$ 45,00 for both modalities.
- Do not collect age, birth date, weight, belt, or payment receipt.
- Reveal Pix only after a successful Neon insert; payment starts as pending and is marked paid manually.
- Use only the existing Neon `neondb` production branch; do not create a new database or modify unrelated tables.
- Keep credentials in environment variables and out of Git.
- Event details supplied by the user: 15/11/2026; students arrive by 08h and the tournament starts at 09h; registration deadline 08/11/2026 at 23:59. Do not invent a location.
- Stop accepting new registrations at the server-side deadline of 08/11/2026 23:59 BRT.
- Preserve the current União Andrade colors, fonts, tone, and responsive behavior.

## Review Focus

- Empty or whitespace-only names: trim and reject with a recovery message.
- No modality selected: reject without inserting a row.
- DB unavailable or insert failure: show an actionable error and do not reveal Pix.
- Unauthorized admin requests: return no registration data and make no payment changes.
- Repeated payment action: keep the paid status stable and show a useful current status.

---

### Task 1: Public registration frontend

**Files:**
- Create: `frontend/app/open-andrade/page.tsx`
- Create: `frontend/components/open-andrade/RegistrationForm.tsx`
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/lib/routes.ts`

**Interfaces:**
- Produces `/open-andrade` with a form that collects responsible/student names and Kyorugui/Poomsae choices. The client submits JSON `{ responsibleName, studentName, kyorugui, poomsae }` to `POST /api/open-andrade/registrations`.
- The initial screen shows both fees and does not show Pix before a successful response.

- [x] Build the responsive form and event callout using the existing brand tokens; include labels, focus states, required validation, loading, error, and confirmation states.
- [x] Add the route metadata and a clear homepage path to the form, including only the supplied date, arrival/start times, and deadline.
- [x] Inspect the route at desktop and mobile widths in the local browser; correct overflow, contrast, and missing states.

### Task 2: Neon schema, registration API, and Pix confirmation

**Files:**
- Create: `frontend/db/migrations/001_open_andrade_registrations.sql`
- Create: `frontend/db/migrations/002_open_andrade_rate_limits.sql`
- Create: `frontend/db/migrations/003_open_andrade_modality_pricing.sql`
- Create: `frontend/lib/open-andrade/database.ts`
- Create: `frontend/lib/open-andrade/rate-limit.ts`
- Create: `frontend/lib/open-andrade/pix.ts`
- Create: `frontend/app/api/open-andrade/registrations/route.ts`
- Create: `frontend/.env.example`
- Modify: `frontend/package.json`
- Modify: `frontend/package-lock.json`

**Interfaces:**
- `POST /api/open-andrade/registrations` accepts the Task 1 JSON, normalizes and validates it, inserts one pending row, and only then returns `{ registrationId, payment: { amountCents, copyPaste } }`.
- `frontend/lib/open-andrade/database.ts` exports a server-only `getSql()` that reads `DATABASE_URL` and returns the Neon HTTP query client.
- The table `open_andrade_registrations` stores UUID, responsible/student names, two modality booleans, the corresponding amount in cents, payment status, created timestamp, and nullable paid timestamp.
- Pix fields are built from the approved phone key, payee, city, and amount selected by modalities; no secret or payment detail is stored in the registration table.

- [x] Add the Neon serverless driver and QR rendering dependency; document `DATABASE_URL` in `.env.example` without a value.
- [x] Write idempotent event-specific migrations for registrations, rate limits, and modality-based pricing.
- [x] Implement request validation, insert, and static BR Code construction using the BCB Pix format and CRC16.
- [x] Apply both migrations in the already-authorized production Neon SQL Editor and verify the tables with `to_regclass`.
- [x] Confirm there are no existing registrations, apply migration `003_open_andrade_modality_pricing.sql` in Neon production, and verify its modality-based amount constraint.
- [x] Connect the success state to the response so Pix copy-and-paste and QR are rendered only after the insert succeeds.
- [x] Run `npm run lint` and `npm run build` from `frontend`; automated tests were not added or run.

### Task 3: Protected payment dashboard

**Files:**
- Create: `frontend/lib/open-andrade/admin-session.ts`
- Create: `frontend/app/api/admin/open-andrade/session/route.ts`
- Create: `frontend/app/api/admin/open-andrade/registrations/route.ts`
- Create: `frontend/app/api/admin/open-andrade/registrations/[id]/route.ts`
- Create: `frontend/app/admin/open-andrade/page.tsx`
- Create: `frontend/components/open-andrade/AdminDashboard.tsx`
- Modify: `frontend/.env.example`

**Interfaces:**
- Session endpoint supports `GET` (status), `POST` (password login), and `DELETE` (logout); it requires `OPEN_ANDRADE_ADMIN_PASSWORD` and `OPEN_ANDRADE_SESSION_SECRET`.
- `GET /api/admin/open-andrade/registrations` requires a valid session and returns rows ordered newest first plus pending/paid counts.
- `PATCH /api/admin/open-andrade/registrations/[id]` requires a valid session and changes pending to paid with `paid_at` set; it is safe to repeat.
- `/admin/open-andrade` shows a login form when logged out and the list, status filters, counts, and payment action when logged in. No fake registration rows.

- [x] Implement an 8-hour HMAC-signed, HttpOnly, SameSite=Lax session cookie with secure production flags and constant-time password comparison.
- [x] Protect every dashboard data/mutation handler on the server, validate IDs and request bodies, and return generic DB errors to the browser.
- [x] Build loading, login error, empty, list, filter, update, and logout states using the form’s component vocabulary.
- [x] Throttle public registration to 60 submissions per hour per origin and admin login to 10 attempts per 15 minutes; store only an HMAC of the origin IP.
- [ ] Inspect logged-out, empty-list, pending, and paid states in the local browser after the runtime environment variables are configured.

### Task 4: Local and deployment handoff

**Files:**
- Modify: `frontend/README.md`
- Modify: `docs/superpowers/specs/2026-10-27-open-andrade-inscricoes-design.md`

- [x] Document both migrations, local environment variables, event date/deadline, public registration route, admin route, and manual Pix reconciliation.
- [x] Verify `git status` excludes credentials and unrelated generated files, and review the diff against the approved spec.
- [ ] Keep all changes on the feature worktree; do not publish or merge as part of this implementation.

## Handoff note

Both event-specific tables and the modality-based amount constraint were
verified in Neon production, and no student registrations were added. The
runtime still needs `DATABASE_URL`,
`OPEN_ANDRADE_ADMIN_PASSWORD`, and `OPEN_ANDRADE_SESSION_SECRET` configured
outside Git before submissions or the admin list can connect to Neon. The
dashboard's database-backed states remain unverified until then.
