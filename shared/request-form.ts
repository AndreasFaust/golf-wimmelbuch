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

export interface RequestFormValidationError {
  field: string;
  message: string;
}

interface OptionalFieldResult {
  value?: string;
  error?: string;
}

function trimOptional(value: unknown, maxLength: number): OptionalFieldResult {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return {};
  if (trimmed.length > maxLength) {
    return { error: `Maximal ${maxLength} Zeichen` };
  }
  return { value: trimmed };
}

function requireField(
  value: unknown,
  field: string,
  label: string,
  maxLength: number
): { value?: string; error?: RequestFormValidationError } {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) {
    return { error: { field, message: `${label} ist ein Pflichtfeld` } };
  }
  if (trimmed.length > maxLength) {
    return { error: { field, message: `Maximal ${maxLength} Zeichen` } };
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
      errors: [{ field: "form", message: "Ungültige Anfrage" }],
    };
  }

  const input = data as Record<string, unknown>;
  const errors: RequestFormValidationError[] = [];

  const emailResult = requireField(
    input.email,
    "email",
    "E-Mail",
    FIELD_LIMITS.email
  );
  if (emailResult.error) {
    errors.push(emailResult.error);
  } else if (
    !emailResult.value ||
    !EMAIL_PATTERN.test(emailResult.value) ||
    emailResult.value.length > FIELD_LIMITS.email
  ) {
    errors.push({ field: "email", message: "Ungültige E-Mail-Adresse" });
  }

  const nameResult = requireField(
    input.name,
    "name",
    "Ansprechpartner",
    FIELD_LIMITS.name
  );
  if (nameResult.error) errors.push(nameResult.error);

  const clubResult = requireField(
    input.club,
    "club",
    "Club",
    FIELD_LIMITS.club
  );
  if (clubResult.error) errors.push(clubResult.error);

  const auflage = String(input.auflage ?? "").trim();
  if (!auflage) {
    errors.push({ field: "auflage", message: "Auflage ist ein Pflichtfeld" });
  } else if (
    !AUFLAGE_OPTIONS.includes(auflage as (typeof AUFLAGE_OPTIONS)[number])
  ) {
    errors.push({ field: "auflage", message: "Ungültige Auflage" });
  }

  const phoneResult = trimOptional(input.phone, FIELD_LIMITS.phone);
  if (phoneResult.error) {
    errors.push({ field: "phone", message: phoneResult.error });
  }

  const streetResult = trimOptional(input.street, FIELD_LIMITS.street);
  if (streetResult.error) {
    errors.push({ field: "street", message: streetResult.error });
  }

  const cityResult = trimOptional(input.city, FIELD_LIMITS.city);
  if (cityResult.error) {
    errors.push({ field: "city", message: cityResult.error });
  }

  const country = String(input.country ?? "").trim();
  let countryValue: string | undefined;
  if (country) {
    if (
      !COUNTRY_OPTIONS.includes(country as (typeof COUNTRY_OPTIONS)[number])
    ) {
      errors.push({ field: "country", message: "Ungültiges Land" });
    } else {
      countryValue = country;
    }
  }

  const messageResult = trimOptional(input.message, FIELD_LIMITS.message);
  if (messageResult.error) {
    errors.push({ field: "message", message: messageResult.error });
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
