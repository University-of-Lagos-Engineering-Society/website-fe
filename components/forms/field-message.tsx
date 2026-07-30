/**
 * Inline validation message for a single field.
 *
 * `role="alert"` so it's announced when it appears; the id is required rather
 * than derived because it's what the input's `aria-describedby` points at.
 */
export function FieldMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-destructive text-sm/5">
      {message}
    </p>
  );
}
