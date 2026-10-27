import "server-only";

import { createHmac } from "node:crypto";
import { getSql } from "@/lib/open-andrade/database";

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export async function consumeRateLimit(
  request: Request,
  purpose: "registration" | "admin-login",
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const secret = process.env.OPEN_ANDRADE_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("OPEN_ANDRADE_SESSION_SECRET não configurado");
  }

  const trustedIpHeader = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")
    : null;
  const clientIp = trustedIpHeader?.split(",", 1)[0]?.trim()
    || (process.env.NODE_ENV !== "production" ? "local-development" : "");

  if (!clientIp) {
    throw new Error("Cabeçalho de IP confiável não configurado para este provedor");
  }
  const keyHash = createHmac("sha256", secret)
    .update(`open-andrade:${purpose}:v1:${clientIp}`)
    .digest("hex");
  const sql = getSql();
  const rows = await sql`
    INSERT INTO public.open_andrade_rate_limits AS current_bucket
      (key_hash, window_started_at, request_count, updated_at)
    VALUES
      (${keyHash}, now(), 1, now())
    ON CONFLICT (key_hash) DO UPDATE SET
      window_started_at = CASE
        WHEN current_bucket.window_started_at <= now() - make_interval(secs => ${windowSeconds})
          THEN now()
        ELSE current_bucket.window_started_at
      END,
      request_count = CASE
        WHEN current_bucket.window_started_at <= now() - make_interval(secs => ${windowSeconds})
          THEN 1
        ELSE current_bucket.request_count + 1
      END,
      updated_at = now()
    RETURNING request_count,
      GREATEST(
        1,
        CEIL(EXTRACT(EPOCH FROM (window_started_at + make_interval(secs => ${windowSeconds}) - now())))
      )::integer AS retry_after_seconds
  `;

  const requestCount = Number(rows[0]?.request_count ?? limit + 1);
  const retryAfterSeconds = Number(rows[0]?.retry_after_seconds ?? windowSeconds);

  return {
    allowed: requestCount <= limit,
    retryAfterSeconds,
  };
}
