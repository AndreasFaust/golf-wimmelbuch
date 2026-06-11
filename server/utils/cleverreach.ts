const API_URL = "https://rest.cleverreach.com";

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

interface CachedToken {
  value: string;
  expiresAt: number;
}

// Persisted via Nitro storage (fs-backed in dev, configured in nuxt.config.ts).
// CleverReach rate-limits token issuance and returns 400 invalid_client if a
// new token is requested while a previous one is still valid, so we MUST
// reuse a cached token across HMR reloads and full server restarts.
const TOKEN_STORAGE_KEY = "cleverreach:token";

async function getAccessToken(clientId: string, clientSecret: string) {
  const storage = useStorage<CachedToken>("cache");
  const cached = await storage.getItem(TOKEN_STORAGE_KEY);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await fetch(`${API_URL}/oauth/token.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(
      `[CleverReach] OAuth token request failed (${response.status} ${response.statusText})`,
      body,
    );
    throw createError({
      statusCode: 502,
      statusMessage: `CleverReach authentication failed (${response.status})`,
      data: { upstream: body },
    });
  }

  const data = (await response.json()) as TokenResponse;
  await storage.setItem(TOKEN_STORAGE_KEY, {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  });

  return data.access_token;
}

import type { RequestFormPayload } from "#shared/request-form";

function toGlobalAttributes(data: RequestFormPayload) {
  return {
    name: data.name,
    club: data.club,
    auflage: data.auflage,
    phone: data.phone ?? "",
    street: data.street ?? "",
    city: data.city ?? "",
    country: data.country ?? "",
    message: data.message ?? "",
  };
}

async function cleverReachFetch<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : null;

  return { ok: response.ok, status: response.status, data };
}

export async function submitRequestToCleverReach(
  config: { clientId: string; clientSecret: string; groupId: string },
  data: RequestFormPayload,
) {
  const token = await getAccessToken(config.clientId, config.clientSecret);
  const groupId = config.groupId;
  const now = Math.floor(Date.now() / 1000);

  const receiverBody = {
    email: data.email,
    registered: now,
    activated: now,
    source: "golf-wimmelbuch-anfrage",
    global_attributes: toGlobalAttributes(data),
  };

  const createResult = await cleverReachFetch<{ id?: number; error?: string }>(
    `/v3/groups/${groupId}/receivers`,
    token,
    { method: "POST", body: JSON.stringify(receiverBody) },
  );

  if (createResult.ok) {
    return createResult.data;
  }

  const receiversResult = await cleverReachFetch<
    Array<{ id: number; email: string }>
  >(
    `/v3/groups/${groupId}/receivers?email=${encodeURIComponent(data.email)}`,
    token,
  );

  const existing = receiversResult.data?.[0];
  if (!existing?.id) {
    throw createError({
      statusCode: 502,
      statusMessage: "CleverReach submission failed",
    });
  }

  const updateResult = await cleverReachFetch(
    `/v3/groups/${groupId}/receivers/${existing.id}`,
    token,
    {
      method: "PUT",
      body: JSON.stringify({
        global_attributes: toGlobalAttributes(data),
        source: "golf-wimmelbuch-anfrage",
      }),
    },
  );

  if (!updateResult.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: "CleverReach submission failed",
    });
  }

  return updateResult.data;
}
