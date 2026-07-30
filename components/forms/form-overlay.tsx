/**
 * Renders a form as visible-but-inactive, behind a translucent overlay.
 *
 * For shipping a page before its form has somewhere to submit to. The form
 * stays on screen — people see what's coming and the layout is final — but
 * nothing about it works.
 *
 * "Looks disabled" isn't enough, so the wrapped content gets `inert`. That takes
 * it out of the tab order and the accessibility tree in one attribute, which
 * matters because a purely visual overlay leaves every input reachable by
 * keyboard: someone tabbing through would land in fields hidden behind a
 * "coming soon" notice, typing into something they can't see.
 * `pointer-events-none` covers browsers that haven't shipped `inert` yet.
 *
 * The wash is deliberately thin — the form should still read as a real form
 * rather than a grey rectangle.
 *
 * NOTE: `inert` as a boolean prop needs React 19 (Next 15+). On React 18 use
 * `{...{ inert: '' }}` with a cast, or the attribute is silently dropped.
 */
export function FormOverlay({
  active,
  label = 'Coming soon',
  title,
  description,
  variant = 'card',
  children,
}: {
  /** When false this renders children untouched — no wrapper, no cost. */
  active: boolean;
  label?: string;
  title: string;
  description?: string;
  /**
   * card    — full notice, for forms with vertical room
   * compact — a single pill, for short forms (an inline email row, say) where a
   *           card would be taller than the thing it covers
   */
  variant?: 'card' | 'compact';
  children: React.ReactNode;
}) {
  if (!active) return <>{children}</>;

  const badge = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs/4 font-medium tracking-wide text-amber-900 uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />
      {label}
    </span>
  );

  return (
    <div className="relative">
      <div inert aria-hidden="true" className="pointer-events-none select-none">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/60 p-3 backdrop-blur-[2px]">
        {variant === 'compact' ? (
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            {badge}
            <span className="text-sm/5 font-medium text-gray-700">{title}</span>
          </p>
        ) : (
          <div className="bg-primary max-w-sm rounded-lg border border-gray-200 px-6 py-5 text-center shadow-sm">
            {badge}
            <p className="text-accent mt-3 text-base/6 font-medium">{title}</p>
            {description && <p className="mt-2 text-sm/5 text-[hsl(218,14%,84%)]">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
