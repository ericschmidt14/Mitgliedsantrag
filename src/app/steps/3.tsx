import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import { FocusTrap, TextInput } from "@mantine/core";
import { FormValues } from "../form";
import { FormRow, FormWrapper } from "../components/form";

export default function Step3({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="Kommunikation" />
      <TextInput
        label="E-Mail"
        key={form.key("email")}
        {...form.getInputProps("email")}
        withAsterisk
      />
      <FormRow>
        <TextInput
          label="Telefon"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />
        <TextInput
          label="Handy"
          key={form.key("mobile")}
          {...form.getInputProps("mobile")}
        />
      </FormRow>
    </FormWrapper>
  );
}
