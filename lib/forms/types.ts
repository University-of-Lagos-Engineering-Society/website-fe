/**
 * Types shared by every form built on `defineForm`.
 *
 * `FormValues` is deliberately `Record<string, string>` rather than something
 * richer: HTML form controls only ever produce strings, and coercion belongs in
 * the schema, not the type. Keeping this narrow is what lets the hook and the
 * API client stay generic without a pile of type parameters.
 */

export type FormValues = Record<string, string>;

export type FieldName<TValues extends FormValues> = keyof TValues & string;

export type FieldErrors<TValues extends FormValues> = Partial<
  Record<FieldName<TValues>, string>
>;
