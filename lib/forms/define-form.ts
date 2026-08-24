import { z } from 'zod';
import type { FieldErrors, FieldName, FormValues } from './types';

/**
 * Builds everything a form needs — object schema, field order, normalisation,
 * whole-form parsing, single-field validation — from one declaration of its
 * fields.
 *
 * The point is that each field carries its own schema and its own normaliser,
 * so adding a field to a form is one entry rather than four edits scattered
 * across a file. Field order in the object literal is the order used when
 * focusing the first invalid input, which is why it's read from `Object.keys`
 * rather than passed separately — one less thing to keep in sync.
 *
 * Usage:
 *
 *   export const contactForm = defineForm({
 *     name:  { schema: z.string().min(2, '...'), normalize: collapseWhitespace },
 *     email: { schema: z.string().email('...'),  normalize: normalizeEmail },
 *   });
 */

/**
 * Any Zod schema whose output is a string.
 *
 * Zod 4 signature. `ZodType` here is `<Output, Input>` — v3's middle
 * `ZodTypeDef` parameter is gone, and the third slot is now the schema's
 * internals rather than its input, so the v3 spelling
 * (`z.ZodType<string, z.ZodTypeDef, string>`) fails to compile against v4.
 */
export type FieldSchema = z.ZodType<string, string>;

export interface FieldConfig {
  schema: FieldSchema;
  /** Applied before validation and before sending. Defaults to identity. */
  normalize?: (raw: string) => string;
}

export type ParseResult<TValues extends FormValues> =
  | { ok: true; values: TValues }
  | { ok: false; errors: FieldErrors<TValues> };

export interface FormDefinition<TValues extends FormValues> {
  /** Declaration order. Used for focusing the first invalid field. */
  readonly fields: readonly FieldName<TValues>[];
  readonly schema: z.ZodType<TValues>;
  /** Normalise raw input (usually from FormData) into clean values. */
  normalize(raw: Record<string, unknown>): TValues;
  /** Normalise then validate the whole form. */
  parse(raw: Record<string, unknown>): ParseResult<TValues>;
  /** Validate one field in isolation — used for on-blur feedback. */
  validateField(field: FieldName<TValues>, value: string): string | undefined;
  /** Flatten a ZodError to one message per field. */
  errorsFrom(error: z.ZodError): FieldErrors<TValues>;
}

const identity = (value: string): string => value;

export function defineForm<TConfig extends Record<string, FieldConfig>>(
  config: TConfig,
): FormDefinition<{ [K in keyof TConfig]: string }> {
  type TValues = { [K in keyof TConfig]: string };
  type TField = FieldName<TValues>;

  const fields = Object.keys(config) as TField[];

  const shape: Record<string, FieldSchema> = {};
  for (const field of fields) shape[field] = config[field]!.schema;

  // The only cast in here. z.object() can't express "the shape I just built
  // matches TValues", but the mapped type above guarantees it does.
  const schema = z.object(shape) as unknown as z.ZodType<TValues>;

  function normalizeValue(field: TField, raw: unknown): string {
    const value = typeof raw === 'string' ? raw : '';
    return (config[field]!.normalize ?? identity)(value);
  }

  function normalize(raw: Record<string, unknown>): TValues {
    const out = {} as TValues;
    for (const field of fields) out[field] = normalizeValue(field, raw[field]);
    return out;
  }

  function isField(value: string): value is TField {
    return (fields as readonly string[]).includes(value);
  }

  /**
   * Keeps the FIRST issue per field, not the last. Check order in each schema
   * therefore decides the message: put presence rules before format rules, so an
   * empty email reads "enter your email" rather than "that isn't a valid email".
   */
  function errorsFrom(error: z.ZodError): FieldErrors<TValues> {
    // Accumulated as a plain record: TypeScript won't allow writes to a generic
    // mapped type (TS2862), and the isField guard above already proves the keys
    // are valid, so the assertion at the end is safe rather than hopeful.
    const out: Record<string, string> = {};
    for (const issue of error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && isField(key) && !(key in out)) {
        out[key] = issue.message;
      }
    }
    return out as FieldErrors<TValues>;
  }

  return {
    fields,
    schema,
    normalize,
    errorsFrom,
    parse(raw) {
      const values = normalize(raw);
      const result = schema.safeParse(values);
      return result.success
        ? { ok: true, values }
        : { ok: false, errors: errorsFrom(result.error) };
    },
    validateField(field, value) {
      const result = config[field]!.schema.safeParse(normalizeValue(field, value));
      return result.success ? undefined : result.error.issues[0]?.message;
    },
  };
}

/** Extract the values type from a form definition. */
export type ValuesOf<TForm> = TForm extends FormDefinition<infer TValues> ? TValues : never;

/** Extract the field-name union from a form definition. */
export type FieldOf<TForm> = TForm extends FormDefinition<infer TValues>
  ? FieldName<TValues>
  : never;
