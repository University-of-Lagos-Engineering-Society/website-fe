/**
 * Live character count for a length-limited field.
 *
 * `aria-hidden` on purpose: `maxlength` already stops input at the limit, so
 * announcing a count on every keystroke is noise. Turns amber inside the last
 * stretch, which is where it becomes information rather than decoration.
 */
export function CharacterCount({
  value,
  max,
  warnWithin = 100,
}: {
  value: number;
  max: number;
  warnWithin?: number;
}) {
  const warning = value > max - warnWithin;
  return (
    <span
      aria-hidden="true"
      className={`ml-auto shrink-0 text-sm/5 tabular-nums ${
        warning ? 'text-amber-700' : 'text-gray-500'
      }`}
    >
      {value.toLocaleString()} / {max.toLocaleString()}
    </span>
  );
}
