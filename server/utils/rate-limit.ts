interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  max: number;
  windowMs: number;
}

export function enforceRateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + options.windowMs });
    return;
  }

  if (entry.count >= options.max) {
    throw createError({
      statusCode: 429,
      statusMessage: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    });
  }

  entry.count++;
}
