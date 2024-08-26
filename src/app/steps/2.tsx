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
        key={form.key("street")}
        {...form.getInputProps("street")}
      />
      <FormRow asymmetric>
        <TextInput
          label="PLZ"
          key={form.key("postalCode")}
          {...form.getInputProps("postalCode")}
        />
        <TextInput
          className="col-span-3"
          label="Ort"
          key={form.key("city")}
          {...form.getInputProps("city")}
        />
      </FormRow>
      <TextInput
        label="Land"
        key={form.key("country")}
        {...form.getInputProps("country")}
      />
    </FormWrapper>
  );
}
