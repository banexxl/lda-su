import 'server-only';
import type { Prisma } from '@prisma/client';
import { prisma } from './prisma';

/*
 * Row-level security for Prisma (same pattern as lda-dashboard / dar-pharmacy).
 * Each call runs `fn` in one transaction that first does
 *   SET LOCAL ROLE <role>
 *   set_config('request.jwt.claims', {"role": <role>}, true)
 * so the RLS policies from ~/platform/lda-migration/02_rls.sql apply. Both
 * settings are transaction-local, so pooled connections never leak a role.
 *
 * - asAnon: public content reads (RLS grants anon SELECT on activities,
 *   project_summaries, project_activities, publications).
 * - asService: the `questions` table (no public policy) — reads answered Q&A and
 *   inserts new submissions, matching the old service-role Supabase client.
 */

export type Tx = Prisma.TransactionClient;

type DbRole = 'anon' | 'service_role';

const TX_OPTIONS = { maxWait: 5_000, timeout: 15_000 } as const;

const withRole = <T>(role: DbRole, fn: (tx: Tx) => Promise<T>): Promise<T> =>
     prisma.$transaction(async (tx) => {
          // `role` is one of the two literals above, never user input.
          await tx.$executeRawUnsafe(`SET LOCAL ROLE ${role}`);
          await tx.$queryRaw`SELECT set_config('request.jwt.claims', ${JSON.stringify({ role })}, true)`;
          return fn(tx);
     }, TX_OPTIONS);

/** Public visitor: RLS allows SELECT on the content tables only. */
export const asAnon = <T>(fn: (tx: Tx) => Promise<T>) => withRole('anon', fn);

/** Bypasses RLS — used only for the `questions` table (read answered / insert new). */
export const asService = <T>(fn: (tx: Tx) => Promise<T>) => withRole('service_role', fn);
