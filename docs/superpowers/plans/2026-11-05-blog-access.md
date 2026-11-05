# Blog Access Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the blog easy to find from the main navigation and the homepage.

**Architecture:** Extend the existing route registry so the shared desktop and mobile navigation include `/blog`. Add one editorial callout on the homepage with a link to the existing blog index.

**Tech Stack:** Next.js App Router 16.3.3, React 19, Tailwind CSS 4.

**Spec:** `docs/superpowers/specs/2026-11-05-blog-access-design.md`

## Global Constraints

- Preserve the palette, typography, and spacing in `frontend/DESIGN.md`.
- Keep the blog index and its articles unchanged; all new links point to `/blog`.
- Do not add or run tests unless the user asks.

## Review Focus

- Desktop header width with the additional link: inspect at a standard desktop viewport.
- Mobile menu height and access to every item: open it at a narrow viewport.
- Homepage callout link destination: confirm it opens the existing `/blog` index.
- Existing route visibility in the shared header: confirm the current links remain present.
- Footer blog link: confirm it remains available after the route registry change.

---

### Task 1: Add blog entry points

**Files:**
- Modify: `frontend/lib/routes.ts`
- Modify: `frontend/app/page.tsx`

**Interfaces:**
- Consume the existing `ROUTES` entry for `/blog` and the current `next/link` usage.
- The shared `Header` already renders `NAV_LINKS` on desktop and mobile; no new header API is needed.

- [x] Add `/blog` to `NAV_LINKS` in `frontend/lib/routes.ts` and update the nearby comment to reflect the utility link.
- [x] Add a short homepage section in `frontend/app/page.tsx` with a heading, one sentence introducing the articles, and a visible link to `/blog`; reuse the site’s existing section spacing, typography, and link treatment.
- [x] Open the homepage at desktop and mobile widths. Confirm the Blog link appears in both menus, the homepage callout is readable, all existing navigation entries remain available, and both new entry points open `/blog`.

**Commit:** Do not commit or deploy unless the user asks.
