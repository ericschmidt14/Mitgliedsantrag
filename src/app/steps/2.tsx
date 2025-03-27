"use client";
import {
  Autocomplete,
  NumberInput,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useRef } from "react";
import { FormRow, FormWrapper } from "../components/form";
import Label from "../components/label";
import Title from "../components/title";
import { FormValues } from "../form/form";
import { countries, genders, titles } from "../lib/data";

export default function Step2({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  dayjs.extend(customParseFormat);
  const focused = useRef<HTMLInputElement>(null);
  useEffect(() => {
    focused.current?.focus();
  }, []);

  const today = new Date();
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

  return (
    <DatesProvider settings={{ locale: "de" }}>
      <FormWrapper>
        <Title text="Daten des Neumitglieds" />
        <h3>Persönliche Daten</h3>
        <FormRow>
          {form.values.applicantType !== "parent" && (
            <Autocomplete
              key={form.key("title")}
              {...form.getInputProps("title")}
              data={titles}
              label="Titel"
            />
          )}
          <div
            className={
              form.values.applicantType === "parent" ? "col-span-2" : ""
            }
          >
            <Label text="Geschlecht" withAsterisk />
            <SegmentedControl
              key={form.key("gender")}
              {...form.getInputProps("gender")}
              fullWidth
              data={genders}
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
          defaultDate={
            form.values.applicantType === "self" ? eighteenYearsAgo : today
          }
          defaultLevel="decade"
          valueFormat="DD.MM.YYYY"
          label="Geburtstag"
          placeholder="TT.MM.JJJJ"
          minDate={
            form.values.applicantType === "self" ? undefined : eighteenYearsAgo
          }
          maxDate={
            form.values.applicantType === "self" ? eighteenYearsAgo : today
          }
          key={form.key("dob")}
          {...form.getInputProps("dob")}
          leftSection={<IconCalendar size={16} />}
          withAsterisk
        />
        <h3 className="pt-4">Adresse</h3>
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
        <Autocomplete
          label="Land"
          data={countries}
          key={form.key("country")}
          {...form.getInputProps("country")}
          withAsterisk
        />
      </FormWrapper>
    </DatesProvider>
  );
}
