Implement one screen from Figma.

$ARGUMENTS

## Figma reading protocol

Call `get_metadata` on the frame node first — skeleton only. Then
`get_design_context` scoped to specific child nodes as you need them.

Never call either on a page/canvas node. The `Screens` canvas returns
~660KB and destroys the context window.

## Rules

Follow CLAUDE.md. Where Home or About Us disagree with Associations or
Contact, Home and About win.

- Use existing components and tokens. Figma output is reference for
  layout and spacing only.
- No new dependencies.
- Don't modify shared components — stop and tell me instead.
- Don't invent API fields. Stub and flag.
- If this screen renders a list, it needs an empty state.
- Run typecheck and lint before finishing.

## Finish with two sections

**Assumed or stubbed** — every decision I need to verify.

**Deviated from CLAUDE.md** — anything where the convention didn't fit,
and why. If this section is empty, say so explicitly.
