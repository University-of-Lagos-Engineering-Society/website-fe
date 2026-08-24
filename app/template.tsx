/**
 * Page transition.
 *
 * A `template` rather than a `layout` because Next remounts templates on every
 * navigation — which is exactly what makes the enter animation replay. A layout
 * persists, so the animation would only ever run once on first load.
 *
 * Deliberately one gesture: content rises and fades in. No exit animation —
 * that would need the navigation to be held open, and a delay between click and
 * response costs more than the polish is worth.
 *
 * `prefers-reduced-motion` is handled globally in `globals.css`.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-up">{children}</div>;
}
