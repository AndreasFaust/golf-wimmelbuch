import {
  isAutomatedSubmission,
  validateRequestForm,
} from "#shared/request-form";
import { submitRequestToCleverReach } from "../utils/cleverreach";
import { enforceRateLimit } from "../utils/rate-limit";

const RATE_LIMIT = {
  max: 5,
  windowMs: 15 * 60 * 1000,
};

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  enforceRateLimit(`request:${ip}`, RATE_LIMIT);

  const body = await readBody(event);

  if (body && typeof body === "object" && isAutomatedSubmission(body)) {
    return { success: true };
  }

  const result = validateRequestForm(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request",
      data: { errors: result.errors },
    });
  }

  const config = useRuntimeConfig(event);
  const { clientId, clientSecret, groupId } = config.cleverreach;

  if (!clientId || !clientSecret || !groupId) {
    throw createError({
      statusCode: 500,
      statusMessage: "CleverReach ist nicht konfiguriert",
    });
  }

  await submitRequestToCleverReach(
    { clientId, clientSecret, groupId },
    result.data,
  );

  return { success: true };
});
