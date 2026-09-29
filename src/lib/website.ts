import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Server-only: checks that a signup's company website is a real, reachable public site.
// Because this fetches a user-supplied URL from our server, it refuses anything that
// resolves to a private/internal address and never follows redirects (SSRF protection).

const TIMEOUT_MS = 5000;
const BLOCKED_HOST_SUFFIXES = [
  ".localhost",
  ".local",
  ".internal",
  ".lan",
  ".home.arpa",
];

export type WebsiteCheck =
  { valid: true; url: string } | { valid: false; error: string };

/** Parses user input like "acme.com" or "https://acme.com/about" into an http(s) URL. */
export function normalizeWebsiteUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    if (!url.hostname.includes(".")) return null;
    return url;
  } catch {
    return null;
  }
}

function isPrivateIPv4(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0) ||
    (a === 198 && (b === 18 || b === 19))
  );
}

function isPrivateAddress(ip: string) {
  if (isIP(ip) === 4) return isPrivateIPv4(ip);
  const v6 = ip.toLowerCase();
  const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  return (
    v6 === "::" ||
    v6 === "::1" ||
    v6.startsWith("fc") ||
    v6.startsWith("fd") ||
    /^fe[89ab]/.test(v6) ||
    v6.startsWith("ff")
  );
}

/** Fetches the site (HEAD, falling back to GET) and reports whether it answered with 2xx/3xx. */
export async function checkWebsite(input: string): Promise<WebsiteCheck> {
  const unreachable: WebsiteCheck = {
    valid: false,
    error: "Website could not be reached",
  };
  try {
    const url = normalizeWebsiteUrl(input);
    if (!url) return { valid: false, error: "Enter a valid website URL" };

    const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
    if (
      isIP(host) ||
      host === "localhost" ||
      BLOCKED_HOST_SUFFIXES.some((s) => host.endsWith(s))
    ) {
      return {
        valid: false,
        error: "Enter your company's public website domain",
      };
    }

    const addresses = await lookup(host, { all: true });
    if (
      addresses.length === 0 ||
      addresses.some((a) => isPrivateAddress(a.address))
    ) {
      return unreachable;
    }

    const signal = AbortSignal.timeout(TIMEOUT_MS);
    const init: RequestInit = {
      redirect: "manual",
      signal,
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DiliateSiteCheck/1.0; +https://diliate.com)",
        Accept: "text/html,*/*;q=0.8",
      },
    };

    let res = await fetch(url, { ...init, method: "HEAD" });
    // Some servers reject HEAD; retry once with GET before deciding.
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(url, { ...init, method: "GET" });
    }
    await res.body?.cancel().catch(() => {});

    return res.status >= 200 && res.status < 400
      ? { valid: true, url: url.toString() }
      : unreachable;
  } catch {
    return unreachable;
  }
}
