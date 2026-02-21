const ACCESS_TOKEN_COOKIE = "accessToken";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getAccessToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const tokenEntry = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${ACCESS_TOKEN_COOKIE}=`));

  if (!tokenEntry) {
    return null;
  }

  const token = tokenEntry.slice(`${ACCESS_TOKEN_COOKIE}=`.length);
  return token ? decodeURIComponent(token) : null;
}

export function setAccessToken(token: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function clearAccessToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
