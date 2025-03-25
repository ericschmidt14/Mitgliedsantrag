"use client";
import { NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useRef } from "react";
import { FormRow, FormWrapper } from "../components/form";
import Title from "../components/title";
import { FormValues } from "../form/form";

export default function Step2({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const focused = useRef<HTMLInputElement>(null);
  useEffect(() => {
    focused.current?.focus();
  }, []);

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
        ref={focused}
        withAsterisk
      />
      <FormRow asymmetric>
        <NumberInput
          label="PLZ"
          name="postal"
          autoComplete="postal"
          key={form.key("postalCode")}
          {...form.getInputProps("postalCode")}
          withAsterisk
          hideControls
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
