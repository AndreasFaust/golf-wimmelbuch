<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const state = reactive({
  email: undefined,
  name: undefined,
  club: undefined,
  phone: undefined,
  message: undefined,
  auflage: "100",
  street: undefined,
  city: undefined,
  country: undefined,
});

type Schema = typeof state;

function validate(state: Partial<Schema>): FormError[] {
  const errors = [];
  if (!state.email) errors.push({ name: "email", message: "Pflichtfeld" });
  if (!state.name) errors.push({ name: "name", message: "Pflichtfeld" });
  if (!state.club) errors.push({ name: "club", message: "Pflichtfeld" });
  if (!state.auflage) errors.push({ name: "auflage", message: "Pflichtfeld" });
  return errors;
}

const toast = useToast();
const isSubmitting = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  try {
    await $fetch("/api/request", {
      method: "POST",
      body: event.data,
    });

    toast.add({
      title: "Erfolgreich",
      description: "Ihre Anfrage wurde erfolgreich gesendet.",
      color: "success",
    });

    Object.assign(state, {
      email: undefined,
      name: undefined,
      club: undefined,
      phone: undefined,
      message: undefined,
      auflage: "100",
      street: undefined,
      city: undefined,
      country: undefined,
    });
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
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4 grid grid-cols-2 gap-x-10 gap-y-5 items-start"
    @submit="onSubmit"
  >
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
      />
    </UFormField>

    <UFormField
      label="Ansprechpartner*"
      name="name"
      size="xl"
      :ui="{ error: 'absolute top-full' }"
    >
      <UInput v-model="state.name" type="text" size="xl" class="w-full" />
    </UFormField>

    <UFormField
      label="Name des Clubs*"
      name="club"
      size="xl"
      :ui="{ error: 'absolute top-full' }"
    >
      <UInput v-model="state.club" type="text" size="xl" class="w-full" />
    </UFormField>

    <UFormField label="Mögliche Auflage*" name="auflage" size="xl">
      <USelect
        v-model="state.auflage"
        size="xl"
        class="w-full"
        default="200"
        :items="[
          '100',
          '200',
          '250',
          '300',
          '350',
          '400',
          '450',
          '500 oder mehr',
        ]"
      />
    </UFormField>
    <div class="col-span-2 grid grid-cols-4 gap-x-10 gap-y-5">
      <UFormField label="Telefon" name="phone" size="xl">
        <UInput v-model="state.phone" type="tel" size="xl" class="w-full" />
      </UFormField>
      <UFormField label="Straße / Hausnummer" name="street" size="xl">
        <UInput v-model="state.street" type="text" size="xl" class="w-full" />
      </UFormField>
      <UFormField label="PLZ / Ort" name="city" size="xl">
        <UInput v-model="state.city" type="text" size="xl" class="w-full" />
      </UFormField>
      <UFormField label="Land" name="country" size="xl">
        <USelect
          v-model="state.country"
          size="xl"
          class="w-full"
          default="Deutschland"
          :items="['Deutschland', 'Österreich', 'Schweiz', 'Anderes']"
        />
      </UFormField>
    </div>
    <UFormField label="Weitere Nachricht" name="message" size="xl">
      <UTextarea v-model="state.message" type="text" size="xl" class="w-full" />
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
