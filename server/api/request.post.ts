import {
  submitRequestToCleverReach,
  type RequestFormPayload,
} from "../utils/cleverreach";

function validatePayload(body: unknown): RequestFormPayload {
  if (!body || typeof body !== "object") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const data = body as Record<string, unknown>;
  const email = String(data.email ?? "").trim();
  const name = String(data.name ?? "").trim();
  const club = String(data.club ?? "").trim();
  const auflage = String(data.auflage ?? "").trim();

  if (!email || !name || !club || !auflage) {
    throw createError({
      statusCode: 400,
      statusMessage: "Pflichtfelder fehlen",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Ungültige E-Mail-Adresse",
    });
  }

  return {
    email,
    name,
    club,
    auflage,
    phone: String(data.phone ?? "").trim() || undefined,
    street: String(data.street ?? "").trim() || undefined,
    city: String(data.city ?? "").trim() || undefined,
    country: String(data.country ?? "").trim() || undefined,
    message: String(data.message ?? "").trim() || undefined,
  };
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { clientId, clientSecret, groupId } = config.cleverreach;

  if (!clientId || !clientSecret || !groupId) {
    throw createError({
      statusCode: 500,
      statusMessage: "CleverReach ist nicht konfiguriert",
    });
  }

  const body = await readBody(event);
  const payload = validatePayload(body);

  await submitRequestToCleverReach(
    { clientId, clientSecret, groupId },
    payload,
  );

  return { success: true };
});
