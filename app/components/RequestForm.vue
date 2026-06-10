<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const state = reactive({
  email: undefined,
  name: undefined,
  club: undefined,
  phone: undefined,
  message: undefined,
  auflage: "100",
});

type Schema = typeof state;

function validate(state: Partial<Schema>): FormError[] {
  const errors = [];
  if (!state.email) errors.push({ name: "email", message: "Required" });
  return errors;
}

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "Ihre Anfrage wurde erfolgreich gesendet.",
    color: "success",
  });
  console.log(event.data);
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

    <UFormField label="Ansprechpartner" name="name" size="xl">
      <UInput v-model="state.name" type="text" size="xl" class="w-full" />
    </UFormField>

    <UFormField label="Name des Clubs" name="club" size="xl">
      <UInput v-model="state.club" type="text" size="xl" class="w-full" />
    </UFormField>

    <UFormField label="Telefon" name="phone" size="xl">
      <UInput v-model="state.phone" type="tel" size="xl" class="w-full" />
    </UFormField>
    <UFormField label="Mögliche Auflage" name="auflage" size="xl">
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

    <UFormField label="Nachricht" name="message" size="xl">
      <UTextarea v-model="state.message" type="text" size="xl" class="w-full" />
    </UFormField>

    <UButton
      type="submit"
      size="xl"
      class="w-max rounded-full text-xl pr-5"
      icon="lucide:send"
      label="Absenden"
    />
  </UForm>
</template>
