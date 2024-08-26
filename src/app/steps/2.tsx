"use client";
import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { TextInput } from "@mantine/core";

import { FormValues } from "../form";
import { FormRow, FormWrapper } from "../components/form";

export default function Step2({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="Adresse" />
      <TextInput
        className="col-span-3"
        label="Straße & Hausnummer"
        name="street"
        autoComplete="street"
        key={form.key("street")}
        {...form.getInputProps("street")}
        withAsterisk
      />
      <FormRow asymmetric>
        <TextInput
          label="PLZ"
          name="postal"
          autoComplete="postal"
          key={form.key("postalCode")}
          {...form.getInputProps("postalCode")}
          withAsterisk
        />
        <TextInput
          className="col-span-3"
          label="Ort"
          name="city"
          autoComplete="city"
          key={form.key("city")}
          {...form.getInputProps("city")}
          withAsterisk
        />
      </FormRow>
      <TextInput
        label="Land"
        key={form.key("country")}
        {...form.getInputProps("country")}
        withAsterisk
      />
    </FormWrapper>
  );
}
