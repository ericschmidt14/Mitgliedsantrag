import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import "dayjs/locale/de";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormValues } from "../form";
import { FormRow, FormWrapper } from "../components/form";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { Fieldset, Select, TextInput } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";

export default function Step4({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <FormWrapper>
        <Title text="Mitgliedschaft" />
        <FormRow>
          <DatePickerInput
            defaultDate={new Date()}
            valueFormat="DD.MM.YYYY"
            label="Gewünschtes Eintrittsdatum"
            placeholder="TT.MM.JJJJ"
            key={form.key("entryDate")}
            {...form.getInputProps("entryDate")}
            leftSection={<IconCalendar size={16} />}
            withAsterisk
          />
          <Select
            key={form.key("membershipType")}
            {...form.getInputProps("membershipType")}
            data={[
              "Erwachsene (ab 21 Jahre) – 60€",
              "Schwerbehinderte – 40€",
              "Fördermitglieder – 500€",
              "Lebenslange Mitgliedschaft – 1.900€",
            ]}
            checkIconPosition="right"
            label="Beitragsart"
            withAsterisk
          />
        </FormRow>
        <TextInput
          label="Geworben durch Mitglied"
          description="(Mitgliedsnummer angeben)"
          key={form.key("advertNumber")}
          {...form.getInputProps("advertNumber")}
        />
        <Fieldset legend="Bereits Fanclub-Mitglied?">
          <FormRow>
            <TextInput
              label="Fanclub OFCN-Nr."
              key={form.key("ofcnNumber")}
              {...form.getInputProps("ofcnNumber")}
            />
            <TextInput
              label="Offizieller Fanclub-Name"
              key={form.key("advertNumber")}
              {...form.getInputProps("advertNumber")}
            />
          </FormRow>
        </Fieldset>
      </FormWrapper>
    </DatesProvider>
  );
}
