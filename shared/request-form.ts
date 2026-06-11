export const AUFLAGE_OPTIONS = [
  "100",
  "200",
  "250",
  "300",
  "350",
  "400",
  "450",
  "500 oder mehr",
] as const;

export const COUNTRY_OPTIONS = [
  "Deutschland",
  "Österreich",
  "Schweiz",
  "Anderes",
] as const;

export type Country = (typeof COUNTRY_OPTIONS)[number];

export const COUNTRY_I18N_KEYS: Record<Country, string> = {
  Deutschland: "de",
  Österreich: "at",
  Schweiz: "ch",
  Anderes: "other",
};

const TRAP_FIELD = "clubWebsite";

export const FIELD_LIMITS = {
  email: 254,
  name: 100,
  club: 150,
  phone: 30,
  street: 150,
  city: 100,
  message: 2000,
} as const;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface RequestFormPayload {
  email: string;
  name: string;
  club: string;
  auflage: string;
  phone?: string;
  street?: string;
  city?: string;
  country?: string;
  message?: string;
}

export type RequestFormErrorCode =
  | "required"
  | "maxLength"
  | "invalidEmail"
  | "invalidAuflage"
  | "invalidCountry"
  | "invalidRequest";

export interface RequestFormValidationError {
  field: string;
  code: RequestFormErrorCode;
  params?: { maxLength?: number };
}

interface FieldIssue {
  code: RequestFormErrorCode;
  params?: { maxLength?: number };
}

interface OptionalFieldResult {
  value?: string;
  error?: FieldIssue;
}

function trimOptional(value: unknown, maxLength: number): OptionalFieldResult {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return {};
  if (trimmed.length > maxLength) {
    return { error: { code: "maxLength", params: { maxLength } } };
  }
  return { value: trimmed };
}

function requireField(
  value: unknown,
  field: string,
  maxLength: number
): { value?: string; error?: RequestFormValidationError } {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) {
    return { error: { field, code: "required" } };
  }
  if (trimmed.length > maxLength) {
    return {
      error: { field, code: "maxLength", params: { maxLength } },
    };
  }
  return { value: trimmed };
}

export function isAutomatedSubmission(data: Record<string, unknown>) {
  return Boolean(String(data[TRAP_FIELD] ?? "").trim());
}

export function auxFieldKey() {
  return TRAP_FIELD;
}

export function validateRequestForm(
  data: unknown
):
  | { success: true; data: RequestFormPayload }
  | { success: false; errors: RequestFormValidationError[] } {
  if (!data || typeof data !== "object") {
    return {
      success: false,
      errors: [{ field: "form", code: "invalidRequest" }],
    };
  }

  const input = data as Record<string, unknown>;
  const errors: RequestFormValidationError[] = [];

  const emailResult = requireField(input.email, "email", FIELD_LIMITS.email);
  if (emailResult.error) {
    errors.push(emailResult.error);
  } else if (
    !emailResult.value ||
    !EMAIL_PATTERN.test(emailResult.value) ||
    emailResult.value.length > FIELD_LIMITS.email
  ) {
    errors.push({ field: "email", code: "invalidEmail" });
  }

  const nameResult = requireField(input.name, "name", FIELD_LIMITS.name);
  if (nameResult.error) errors.push(nameResult.error);

  const clubResult = requireField(input.club, "club", FIELD_LIMITS.club);
  if (clubResult.error) errors.push(clubResult.error);

  const auflage = String(input.auflage ?? "").trim();
  if (!auflage) {
    errors.push({ field: "auflage", code: "required" });
  } else if (
    !AUFLAGE_OPTIONS.includes(auflage as (typeof AUFLAGE_OPTIONS)[number])
  ) {
    errors.push({ field: "auflage", code: "invalidAuflage" });
  }

  const phoneResult = trimOptional(input.phone, FIELD_LIMITS.phone);
  if (phoneResult.error) {
    errors.push({ field: "phone", ...phoneResult.error });
  }

  const streetResult = trimOptional(input.street, FIELD_LIMITS.street);
  if (streetResult.error) {
    errors.push({ field: "street", ...streetResult.error });
  }

  const cityResult = trimOptional(input.city, FIELD_LIMITS.city);
  if (cityResult.error) {
    errors.push({ field: "city", ...cityResult.error });
  }

  const country = String(input.country ?? "").trim();
  let countryValue: string | undefined;
  if (country) {
    if (
      !COUNTRY_OPTIONS.includes(country as (typeof COUNTRY_OPTIONS)[number])
    ) {
      errors.push({ field: "country", code: "invalidCountry" });
    } else {
      countryValue = country;
    }
  }

  const messageResult = trimOptional(input.message, FIELD_LIMITS.message);
  if (messageResult.error) {
    errors.push({ field: "message", ...messageResult.error });
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      email: emailResult.value!,
      name: nameResult.value!,
      club: clubResult.value!,
      auflage,
      phone: phoneResult.value,
      street: streetResult.value,
      city: cityResult.value,
      country: countryValue,
      message: messageResult.value,
    },
  };
}
