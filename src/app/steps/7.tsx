"use client";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Summary from "../components/summary";
import Title from "../components/title";
import { FormValues } from "../form/form";

export default function Step7({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="Zusammenfassung" />
      <Summary values={form.values} />
    </FormWrapper>
  );
}
