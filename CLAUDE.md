# ULES website-fe — conventions

Next.js App Router, no `src/`. Tailwind v4, shadcn on `@base-ui/react`
(not Radix — registry components take `render={<X/>}`, not `asChild`).

## Ground truth vs inferred

Figma has desktop frames at 1440 and mobile frames for **two** screens
only: `Home V2 Mobile` and `About Us Mobile`. Home and About are
therefore designed; Associations and Contact are inferred by me and
carry known drift. **When patterns conflict, Home and About win.**
Do not treat Associations or Contact as reference for responsive
behaviour.

## RESPONSIVE

Mobile-first, always. No `max-*` variants exist in this codebase; don't
add any.

Breakpoints (`globals.css`): `xs` 390 (mobile artboard), `sm` 640,
`md` 768, `lg` 1024, `xl` 1280 (*old* artboard), `2xl` 1440 (current
desktop artboard), `3xl` 1536.

`lg` is the primary layout hinge — nav swap, most column changes.
`sm` is where cards go 2-up. `xs` is **padding only** — never copy,
never layout. (Home truncates copy below 390; that was a designed
detail, do not generalize it.)

### Gutters

Use `.px-section` (`globals.css`). Never inline the ladder, never
invent a near-miss percentage. Seven competing ladders already exist;
add none.

`.px-section` is currently:
`@apply xs:px-[4.1%] px-4 lg:px-[4.5%] xl:px-[7.778%]`

The 7.778% is derived from the 1440 artboard (7.778% × 1440 = 112px)
but sits on `xl` (1280). Known, deliberate, tracked in TODO.md.
Use `.px-section` unchanged — do not correct it per-screen.

### Multi-column

Default for uniform card grids:
`grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]`

The `min(100%, X)` guard prevents overflow below X — keep it.

This is a default, not a rule. Where auto-fit gives the wrong column
count, or content isn't uniform, use an explicit breakpoint grid
(`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) and leave a one-line
comment saying why. Do not use the flex-basis + max-width ladder from
Associations — it's non-monotonic and self-contradictory.

Gaps: `gap-6` fixed. Column count does the work, not gap scaling.

### Vertical rhythm

`py-8 md:py-10 lg:py-16`. Responsive, always. Flat large padding
(Associations' `py-28.25`) is drift — 113px on a 390px screen.

### Type

Section headings: `text-2xl/9 md:text-3xl/9`. Leading stays pinned at
36px across the step; that's deliberate.

Spacing and type values transcribed from Figma may be fractional
(`py-28.25`, `max-w-97.25`). That's correct — this site snaps to the
artboard, not to a 4/8pt scale. Keep exact measurements.

## PageBanner

Shared header for every non-home page. New screens use it as-is.

It has flat `9.8264%` gutters that don't match `.px-section`, and one
type step. Known, tracked in TODO.md. Do not fix it per-screen, and do
not build an alternative — six new pages adopting six different header
treatments is worse than one inconsistent header.

## Cards

New cards: **feature folder**, wrap the `Card` primitive, use
`next/image`.

`components/ui/eventCard.tsx`, `newsCard.tsx`, `blogCard.tsx` are
misfiled page components — raw `<img>`, slate/emerald palette, no
`Card`. Do not extend or copy them. Do not migrate them either; that's
a separate task in TODO.md.

## Colour

Semantic tokens only. The two brand tokens:

```
--primary: oklch(30.01% 0.08094 265.576);   /* navy  */
--accent:  oklch(63.007% 0.15289 141.011);  /* green */
```

Reference them as `bg-primary`, `text-accent` etc. — never write the
`oklch()` values inline. Also available: `--destructive`,
`--muted-foreground`, `--foreground`, `--background`, `--border`,
`--ring`, `--card`, `--popover`, `--secondary`, `--copyright`.
Tailwind `gray-*` for neutrals.

Never: hex literals, `hsl()` literals, raw `oklch()`, or
`emerald-*`/`slate-*`. `#1A2B56` appears 14 times in older code —
that's `--primary` written wrong, not a precedent.

`--font-montserrat` is declared and unused. Don't wire it up.
`font-sans` is written explicitly in ~10 places that already inherit
it; don't add more.

## Naming

New files: PascalCase components (`NewsCard.tsx`), kebab hooks and lib
(`use-x.ts`, `submit.ts`). Feature components named-export; keep
default exports out of new code.

Multi-part features: folder with `index.tsx` + siblings, e.g.
`about-us/CoreValues/{index,ItemCard}`.

Imports: `@/components/...`. Not relative.

## Server / client

Server by default. `'use client'` goes on **the smallest component that
owns state** — never on a page. Seven files carry it today; that's the
right number.

Components that only get pulled into the client bundle by their
importer (`SubmitButton`, `FieldMessage`, `FormOverlay`) stay
undirected. Preserve that.

`lib/` is boundary-agnostic — no directives.

## Data

No fetching. Static module constants via the
`components/constants/index.ts` barrel. Everything prerenders.

Constants shape: array of objects, numeric `id`, nested `details`
object for card-facing copy, `imageUrl`/`imageAlt` at top level. Use
the nested form — Associations/Excos flatten and that's the outlier.
Write idiomatic TS, not JSON style (`bodies.ts` is the outlier there).

## Detail routes

Reference: `app/activities/events/[slug]/page.tsx`.

- `async` only to `await params` (Next 15+), then `.find()` +
  `notFound()`.
- **No `generateMetadata`.** The site has none anywhere. Adding it to
  three new routes and not the other eleven is worse than having none
  — it's a site-wide task, tracked in TODO.md.
- No `generateStaticParams`, no `Suspense`.
- Back-navigation is the browser's. Don't add a back button unless the
  Figma frame shows one.

## Forms

Four layers, do not collapse them:
1. `lib/forms/define-form.ts` — the factory
2. `lib/<feature>/schema.ts` — fields + `*_LIMITS`
3. `lib/<feature>/submit.ts` — endpoint, flag, `createFieldResolver`
4. `hooks/use-form-submission.ts` — all behaviour, no markup

Field order in the `defineForm` object literal **is** focus order.
`errorsFrom` keeps the first issue per field, so put presence rules
before format rules in every Zod chain — an empty email must read
"enter your email", not "that isn't valid".

One-error-at-a-time: the backend envelope carries one error object.
Transport failures are synthesised into the same `ApiFailure` shape.
On failure the hook branches once — field error *or* banner, never
both. Unknown error titles degrade to the banner, never swallowed.

Client-side `parse` may surface several field errors at once; the
server returns one. That asymmetry is intentional.

New forms inherit: validate on submit, validate on blur only if
non-empty, clear error on first keystroke, one `requestId` per attempt
held in a ref, `AbortController` per attempt, `fieldProps()` for
`aria-describedby`.

Don't add a fifth form pattern. Don't copy the duplicated
`INPUT_CLASS` string into a third file — if a third form needs it,
stop and tell me.

## States

- **Loading:** none at route level, and none needed while data is static.
- **Empty:** every list-rendering screen needs one. There are currently
  zero in the codebase — that's a gap, not a convention.

  Build it **once**, on the News screen, as
  `components/ui/empty-state.tsx`: a heading plus one muted line, using
  `text-muted-foreground`, centred, inside the section's normal
  vertical rhythm. No illustration, no CTA, no border. Every later
  screen imports it and passes copy. Do not write a second one.
- **Error:** form-local, three tiers — `FieldMessage` → `FormErrorBanner`
  → `FormSuccess`. Don't add new error surfaces.
- Unshipped forms use `FormOverlay` gated on `*_FORM_ENABLED`, which
  requires both an explicit `"true"` and a configured endpoint.

## Hard rules

- Never paste Figma's raw output. It's reference for layout and spacing
  only — no `text-[13px]`, no hex, no absolute positioning.
- No new dependencies without asking.
- Never modify a shared component to make one screen work. Stop and say so.
- Never invent API endpoints or data fields. Stub and flag.
- Run typecheck and lint before finishing.
