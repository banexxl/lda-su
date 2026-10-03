import 'server-only';
import { PrismaClient } from '@prisma/client';

/*
 * Connects as `lda_app`, which (NOINHERIT) has no table privileges of its own —
 * every query must go through `asAnon` / `asService` in `./rls.ts`, which switch
 * to the right database role for RLS. The public site reads content as `anon`;
 * question submissions run as `service_role`.
 */

const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined;
};

export const prisma =
     globalForPrisma.prisma ??
     new PrismaClient({
          log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
     });

if (process.env.NODE_ENV !== 'production') {
     globalForPrisma.prisma = prisma;
}
