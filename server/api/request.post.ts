import {
  isAutomatedSubmission,
  validateRequestForm,
} from "#shared/request-form";
import {
  sendConfirmationEmail,
  sendOperatorNotification,
} from "../utils/email";
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

  const pageLocale = (body as Record<string, unknown> | null)?.locale;

  const config = useRuntimeConfig(event);

  try {
    await sendConfirmationEmail(config.smtp, result.data, pageLocale);
  } catch (error) {
    console.error("[email] Failed to send confirmation email", error);
  }

  try {
    await sendOperatorNotification(config.smtp, result.data, pageLocale);
  } catch (error) {
    console.error("[email] Failed to send operator notification", error);
  }

  return { success: true };
});
