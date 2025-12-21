interface RateLimitStore {
  [key: string]: number[];
}

const store: RateLimitStore = {};

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!store[ip]) {
    store[ip] = [];
  }

  // Clean up old requests
  store[ip] = store[ip].filter((timestamp) => timestamp > windowStart);

  if (store[ip].length >= limit) {
    return false;
  }

  store[ip].push(now);
  return true;
}

