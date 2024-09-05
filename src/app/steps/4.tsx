"use client";
import { UseFormReturnType } from "@mantine/form";
import Title from "../components/title";
import "dayjs/locale/de";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormValues } from "../form";
import { FormRow, FormWrapper } from "../components/form";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { Fieldset, FileInput, Select, TextInput } from "@mantine/core";
import { IconCalendar, IconFileText } from "@tabler/icons-react";
import { differenceInYears } from "date-fns";

export default function Step4({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);

  const getTypes = () => {
    const age = differenceInYears(new Date(), new Date(form.values.dob || ""));

    const types = [
      "Schwerbehinderte – 40€",
      "Fördermitglieder – 500€",
      "Lebenslange Mitgliedschaft – 1.900€",
    ];

    if (age < 7) {
      types.unshift("Kind bis 6 Jahre – 20 €");
    } else if (age < 21) {
      types.unshift("Kind / Jugendliche (7 – 20 Jahre) – 40€");
    } else {
      types.unshift("Erwachsene (ab 21 Jahre) – 60€");
    }

    return types;
  };

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
            excludeDate={(d) => {
              const today = new Date();
              const twoWeeksAgo = new Date(today);
              twoWeeksAgo.setDate(today.getDate() - 14);
              const oneMonthAhead = new Date(today);
              oneMonthAhead.setMonth(today.getMonth() + 1);
              return !(d >= twoWeeksAgo && d <= oneMonthAhead);
            }}
            key={form.key("entryDate")}
            {...form.getInputProps("entryDate")}
            leftSection={<IconCalendar size={16} />}
            withAsterisk
          />
          <Select
            key={form.key("membershipType")}
            {...form.getInputProps("membershipType")}
            data={getTypes()}
            checkIconPosition="right"
            label="Beitragsart"
            withAsterisk
          />
        </FormRow>
        {form.values.membershipType === "Schwerbehinderte – 40€" && (
          <FileInput
            label="Bitte Ermäßigungsnachweis hochladen"
            placeholder="Zum Auswählen klicken"
            accept="image/png,image/jpeg"
            clearable
            leftSection={<IconFileText size={16} />}
            withAsterisk
          />
        )}
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
