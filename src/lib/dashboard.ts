/**
 * Client-side helpers for the dashboard: typed fetchers for the /api proxy routes plus
 * normalizers that tolerate small shape differences in Railway responses
 * (e.g. `{ campaigns: [...] }` vs a bare array, `_id` vs `id`).
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

type Json = Record<string, unknown>;

const isObject = (v: unknown): v is Json =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;
const num = (v: unknown, fallback = 0) => {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : fallback;
};

/** Fetches a same-origin JSON endpoint; throws `ApiError` with the backend's message on failure. */
export async function apiFetch<T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: init?.body
      ? { "Content-Type": "application/json", ...init.headers }
      : init?.headers,
    cache: "no-store",
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = isObject(data) ? str(data.error) || str(data.message) : "";
    throw new ApiError(message || `Request failed (${res.status})`, res.status);
  }
  return data as T;
}

/** Returns the first array found at the top level or under one of `keys`. */
function pickArray(data: unknown, keys: string[]): unknown[] {
  if (Array.isArray(data)) return data;
  if (isObject(data)) {
    for (const key of keys)
      if (Array.isArray(data[key])) return data[key] as unknown[];
  }
  return [];
}

// ── User ──────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  email: string;
}

export function toUserProfile(data: unknown): UserProfile {
  const u =
    isObject(data) && isObject(data.user)
      ? data.user
      : isObject(data)
        ? data
        : {};
  return { name: str(u.name), email: str(u.email) };
}

export interface UserStats {
  totalSent: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  plan: string;
  emailsUsed: number;
  emailsLimit: number;
}

export function toUserStats(data: unknown): UserStats {
  const s =
    isObject(data) && isObject(data.stats)
      ? data.stats
      : isObject(data)
        ? data
        : {};
  return {
    totalSent: num(s.totalSent),
    openRate: num(s.openRate),
    clickRate: num(s.clickRate),
    bounceRate: num(s.bounceRate),
    plan: str(s.plan, "free"),
    emailsUsed: num(s.emailsUsed),
    emailsLimit: num(s.emailsLimit),
  };
}

// ── Campaigns ─────────────────────────────────────────────────────────

export interface Campaign {
  id: string;
  name: string;
  status: string;
  sent: number;
  openRate: number | null;
  createdAt: string | null;
}

export function toCampaigns(data: unknown): Campaign[] {
  return pickArray(data, ["campaigns", "data"])
    .filter(isObject)
    .map((c) => {
      const stats = isObject(c.stats) ? c.stats : {};
      const openRate = c.openRate ?? stats.openRate;
      return {
        id: str(c.id) || str(c._id) || String(c.id ?? c._id ?? ""),
        name: str(c.name, "Untitled campaign"),
        status: str(c.status, "draft").toLowerCase(),
        sent: num(c.sent ?? c.sentCount ?? stats.sent),
        openRate: openRate == null ? null : num(openRate),
        createdAt: str(c.createdAt) || str(c.created_at) || null,
      };
    })
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
}

// ── Gmail pool ────────────────────────────────────────────────────────

export interface GmailAccount {
  id: string;
  email: string;
  status: string;
  connectedAt: string | null;
}

export function toGmailAccounts(data: unknown): GmailAccount[] {
  return pickArray(data, ["accounts", "pool", "gmailPool", "data"])
    .filter(isObject)
    .map((a) => ({
      id: str(a.id) || str(a._id) || String(a.id ?? a._id ?? ""),
      email: str(a.email),
      status: str(a.status, "active").toLowerCase(),
      connectedAt: str(a.connectedAt) || str(a.createdAt) || null,
    }));
}

// ── Formatting ────────────────────────────────────────────────────────

/** Formats a percentage that the backend reports on a 0–100 scale. */
export const formatPercent = (value: number) =>
  `${value.toFixed(1).replace(/\.0$/, "")}%`;

export const formatNumber = (value: number) => value.toLocaleString("en-US");

export function formatDate(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}
