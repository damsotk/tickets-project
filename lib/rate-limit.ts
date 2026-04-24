import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const rateLimiters = {
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(15, '15 m'),
    prefix: 'rl:auth',
  }),
  messages: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '1 m'),
    prefix: 'rl:messages',
  }),
  tickets: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(15, '1 h'),
    prefix: 'rl:tickets',
  }),
};
