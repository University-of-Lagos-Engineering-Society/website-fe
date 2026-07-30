/**
 * Bot trap.
 *
 * Positioned off-screen rather than `display: none` — the cheaper scrapers skip
 * hidden inputs but happily fill positioned ones. `aria-hidden` plus
 * `tabIndex={-1}` keeps it out of the accessibility tree and the tab order, so
 * no real person ever meets it.
 *
 * `autoComplete="off"` matters more than it looks: without it a browser will
 * helpfully autofill this field and lock a genuine user out of the form.
 *
 * The parent form needs `position: relative` so the offset resolves against it.
 */
export function HoneypotField({ id, name = 'company_website' }: { id: string; name?: string }) {
  return (
    <div aria-hidden="true" className="absolute top-0 left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Company website</label>
      <input id={id} name={name} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
