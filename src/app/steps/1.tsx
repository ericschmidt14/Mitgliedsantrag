"use cient";
import { Autocomplete, SegmentedControl, TextInput } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormRow, FormWrapper } from "../components/form";
import Label from "../components/label";
import Title from "../components/title";
import { FormValues } from "../form/form";

export default function Step1({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <FormWrapper>
        <Title text="Persönliche Daten" />
        <FormRow>
          <Autocomplete
            key={form.key("title")}
            {...form.getInputProps("title")}
            data={[
              "Dr.",
              "Dr. med.",
              "Dr.-Ing.",
              "Dipl.-Ing.",
              "Prof.",
              "Prof. Dr.",
            ]}
            label="Titel"
          />
          <div>
            <Label text="Geschlecht" withAsterisk />
            <SegmentedControl
              key={form.key("gender")}
              {...form.getInputProps("gender")}
              fullWidth
              data={["Männlich", "Weiblich", "Divers"]}
              transitionDuration={500}
              transitionTimingFunction="linear"
            />
          </div>
        </FormRow>
        <FormRow>
          <TextInput
            label="Vorname"
            name="fname"
            autoComplete="given-name"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
            withAsterisk
          />
          <TextInput
            label="Nachname"
            name="lname"
            autoComplete="family-name"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
            withAsterisk
          />
        </FormRow>
        <DatePickerInput
          defaultDate={new Date("1980-01-01")}
          defaultLevel="decade"
          valueFormat="DD.MM.YYYY"
          label="Geburtstag"
          placeholder="TT.MM.JJJJ"
          excludeDate={(d) => d > new Date()}
          key={form.key("dob")}
          {...form.getInputProps("dob")}
          leftSection={<IconCalendar size={16} />}
          withAsterisk
        />
      </FormWrapper>
    </DatesProvider>
  );
}
