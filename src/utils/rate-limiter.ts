import 'server-only';
import Redis from 'ioredis';

/*
 * Sliding-window rate limiter on the self-hosted platform Redis (replaces
 * @upstash/ratelimit). Same public shape as before: `rateLimiter.limit(id)`
 * resolves to { success, limit, remaining, reset }.
 *
 * Fails OPEN: if REDIS_HOST is unset or Redis is unreachable, requests are
 * allowed rather than blocking the contact/question forms. Redis is reachable
 * only over the platform Docker network (redis:6379), so local dev without
 * REDIS_HOST simply skips limiting. Discrete host/port/password vars are used
 * (not a URL) because the password can contain URL-reserved characters.
 */

const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

let redis: Redis | null = null;
if (process.env.REDIS_HOST) {
     redis = new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT) || 6379,
          password: process.env.REDIS_PASSWORD,
          maxRetriesPerRequest: 1,
          // Queue commands until the (fast, same-network) connection is ready so
          // the first request isn't miscounted; time-bound so a real Redis outage
          // still fails open quickly rather than hanging.
          connectTimeout: 3000,
          commandTimeout: 2000,
     });
     // Swallow connection errors — the limiter fails open instead of throwing.
     redis.on('error', () => {});
}

type LimitResult = { success: boolean; limit: number; remaining: number; reset: number };

export const rateLimiter = {
     async limit(identifier: string): Promise<LimitResult> {
          const now = Date.now();
          const reset = now + WINDOW_MS;
          if (!redis) {
               return { success: true, limit: LIMIT, remaining: LIMIT, reset };
          }
          try {
               const key = `ratelimit:${identifier}`;
               await redis.zremrangebyscore(key, 0, now - WINDOW_MS);
               const count = await redis.zcard(key);
               if (count >= LIMIT) {
                    return { success: false, limit: LIMIT, remaining: 0, reset };
               }
               await redis.zadd(key, now, `${now}-${Math.random().toString(36).slice(2)}`);
               await redis.pexpire(key, WINDOW_MS);
               return { success: true, limit: LIMIT, remaining: LIMIT - (count + 1), reset };
          } catch {
               // Redis unavailable — fail open.
               return { success: true, limit: LIMIT, remaining: LIMIT, reset };
          }
     },
};
