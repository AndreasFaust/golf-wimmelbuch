<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import {
  AUFLAGE_OPTIONS,
  COUNTRY_OPTIONS,
  FIELD_LIMITS,
  auxFieldKey,
  validateRequestForm,
} from "#shared/request-form";

const auxField = auxFieldKey();

type Auflage = (typeof AUFLAGE_OPTIONS)[number];
type Country = (typeof COUNTRY_OPTIONS)[number];

const state = reactive({
  email: undefined as string | undefined,
  name: undefined as string | undefined,
  club: undefined as string | undefined,
  phone: undefined as string | undefined,
  message: undefined as string | undefined,
  auflage: "100" as Auflage,
  street: undefined as string | undefined,
  city: undefined as string | undefined,
  country: undefined as Country | undefined,
  [auxField]: "",
});

type Schema = typeof state;

function validate(formState: Partial<Schema>): FormError[] {
  const result = validateRequestForm(formState);
  if (result.success) return [];

  return result.errors.map((error) => ({
    name: error.field,
    message: error.message,
  }));
}

const toast = useToast();
const isSubmitting = ref(false);
const isSubmitted = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  try {
    await $fetch("/api/request", {
      method: "POST",
      body: event.data,
    });

    isSubmitted.value = true;
  } catch {
    toast.add({
      title: "Fehler",
      description:
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <p v-if="isSubmitted" class="text-2xl text-balance mix">
    Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in
    Kürze bei Ihnen.
  </p>

  <UForm
    v-else
    :validate="validate"
    :state="state"
    class="space-y-4 grid grid-cols-2 gap-x-10 gap-y-5 items-start"
    @submit="onSubmit"
  >
    <div
      class="absolute left-[-9999px] h-px w-px overflow-hidden"
      aria-hidden="true"
    >
      <input
        :id="auxField"
        v-model="state[auxField]"
        :name="auxField"
        type="text"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <UFormField
      label="Email*"
      name="email"
      size="xl"
      :ui="{ error: 'absolute top-full' }"
    >
      <UInput
        v-model="state.email"
        type="email"
        required
        size="xl"
        class="w-full"
        :maxlength="FIELD_LIMITS.email"
      />
    </UFormField>

    <UFormField
      label="Ansprechpartner*"
      name="name"
      size="xl"
      :ui="{ error: 'absolute top-full' }"
    >
      <UInput
        v-model="state.name"
        type="text"
        size="xl"
        class="w-full"
        :maxlength="FIELD_LIMITS.name"
      />
    </UFormField>

    <UFormField
      label="Name des Clubs*"
      name="club"
      size="xl"
      :ui="{ error: 'absolute top-full' }"
    >
      <UInput
        v-model="state.club"
        type="text"
        size="xl"
        class="w-full"
        :maxlength="FIELD_LIMITS.club"
      />
    </UFormField>

    <UFormField label="Mögliche Auflage*" name="auflage" size="xl">
      <USelect
        v-model="state.auflage"
        size="xl"
        class="w-full"
        :items="[...AUFLAGE_OPTIONS]"
      />
    </UFormField>

    <div class="col-span-2 grid grid-cols-4 gap-x-10 gap-y-5">
      <UFormField label="Telefon" name="phone" size="xl">
        <UInput
          v-model="state.phone"
          type="tel"
          size="xl"
          class="w-full"
          :maxlength="FIELD_LIMITS.phone"
        />
      </UFormField>
      <UFormField label="Straße / Hausnummer" name="street" size="xl">
        <UInput
          v-model="state.street"
          type="text"
          size="xl"
          class="w-full"
          :maxlength="FIELD_LIMITS.street"
        />
      </UFormField>
      <UFormField label="PLZ / Ort" name="city" size="xl">
        <UInput
          v-model="state.city"
          type="text"
          size="xl"
          class="w-full"
          :maxlength="FIELD_LIMITS.city"
        />
      </UFormField>
      <UFormField label="Land" name="country" size="xl">
        <USelect
          v-model="state.country"
          size="xl"
          class="w-full"
          :items="[...COUNTRY_OPTIONS]"
        />
      </UFormField>
    </div>

    <UFormField label="Weitere Nachricht" name="message" size="xl">
      <UTextarea
        v-model="state.message"
        size="xl"
        class="w-full"
        :maxlength="FIELD_LIMITS.message"
      />
    </UFormField>

    <UButton
      type="submit"
      size="xl"
      class="w-max rounded-full text-xl pr-5 self-center"
      icon="lucide:send"
      label="Absenden"
      :loading="isSubmitting"
      :disabled="isSubmitting"
    />
  </UForm>
</template>
