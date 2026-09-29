/** Cookie holding the Railway JWT. Read by the proxy and the API routes. */
export const AUTH_COOKIE = "diliate_token";

/** localStorage key for the cached `{ name, email, plan }` of the signed-in user. */
export const USER_STORAGE_KEY = "diliate_user";

const THIRTY_DAYS = 30 * 24 * 60 * 60;

export interface StoredUser {
  name: string;
  email: string;
  plan: string;
}

/** Persists the session after login/signup (browser only). */
export function saveSession(
  token: string,
  user: Partial<StoredUser> | undefined,
) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${THIRTY_DAYS}; samesite=lax${secure}`;

  const stored: StoredUser = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    plan: user?.plan ?? "free",
  };
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage can be unavailable (private mode); the cookie alone is enough to stay signed in.
  }
}

/** Clears the session cookie and cached user (browser only). */
export function clearSession() {
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; samesite=lax`;
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(AUTH_COOKIE); // legacy token location from before cookie auth
  } catch {
    // Ignore unavailable storage.
  }
}
