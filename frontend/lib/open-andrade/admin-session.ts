import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "open_andrade_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function getConfiguration() {
  const password = process.env.OPEN_ANDRADE_ADMIN_PASSWORD;
  const secret = process.env.OPEN_ANDRADE_SESSION_SECRET;

  if (!password || !secret || Buffer.byteLength(secret, "utf8") < 32) return null;
  return { password, secret };
}

export function hasAdminConfiguration() {
  return getConfiguration() !== null;
}

export function verifyAdminPassword(candidate: string) {
  const configuration = getConfiguration();
  if (!configuration) return null;

  const expected = createHash("sha256").update(configuration.password).digest();
  const actual = createHash("sha256").update(candidate).digest();
  return timingSafeEqual(actual, expected);
}

function signature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSessionToken() {
  const configuration = getConfiguration();
  if (!configuration) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expiresAt}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${signature(payload, configuration.secret)}`;
}

function getCookie(request: Request) {
  const cookies = request.headers.get("cookie")?.split(";") ?? [];
  const cookie = cookies.find((value) => value.trim().startsWith(`${COOKIE_NAME}=`));
  return cookie?.trim().slice(COOKIE_NAME.length + 1) ?? null;
}

export function hasValidAdminSession(request: Request) {
  const configuration = getConfiguration();
  const token = getCookie(request);
  if (!configuration || !token) return false;

  const [expiresAt, nonce, providedSignature, ...extra] = token.split(".");
  if (!expiresAt || !nonce || !providedSignature || extra.length > 0) return false;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;

  const payload = `${expiresAt}.${nonce}`;
  const expected = Buffer.from(signature(payload, configuration.secret));
  const provided = Buffer.from(providedSignature);
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function adminSessionCookie(token: string) {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
  ];

  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function expiredAdminSessionCookie() {
  const parts = [`${COOKIE_NAME}=`, "Path=/", "Max-Age=0", "HttpOnly", "SameSite=Lax"];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function adminSessionTtlSeconds() {
  return SESSION_TTL_SECONDS;
}
