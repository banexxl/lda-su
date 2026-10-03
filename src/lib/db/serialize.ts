import { Prisma } from '@prisma/client';

/*
 * Prisma returns Date objects for timestamptz columns; the service mappers and
 * the UI were written against Supabase's JSON (ISO strings). Convert once so the
 * rows fed to the mappers look exactly like the old PostgREST responses.
 */

type Plain<T> = T extends Prisma.Decimal
     ? number
     : T extends Date
       ? string
       : T extends Array<infer U>
         ? Plain<U>[]
         : T extends object
           ? { [K in keyof T]: Plain<T[K]> }
           : T;

export function toPlain<T>(value: T): Plain<T> {
     if (value === null || value === undefined) return value as Plain<T>;
     if (Prisma.Decimal.isDecimal(value)) return (value as Prisma.Decimal).toNumber() as Plain<T>;
     if (value instanceof Date) return value.toISOString() as Plain<T>;
     if (Array.isArray(value)) return value.map(toPlain) as Plain<T>;
     if (typeof value === 'object') {
          const out: Record<string, unknown> = {};
          for (const [key, entry] of Object.entries(value)) out[key] = toPlain(entry);
          return out as Plain<T>;
     }
     return value as Plain<T>;
}
