"use client";
import {
  Autocomplete,
  Checkbox,
  Fieldset,
  NumberInput,
  SegmentedControl,
  Select,
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

export default function Step3({
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
        <Title
          text={
            form.values.applicantType === "self"
              ? "Kontaktdaten"
              : form.values.applicantType === "parent"
              ? "Daten des Erziehungsberechtigten"
              : "Daten des Schenkers"
          }
        />
        <TextInput
          label="E-Mail"
          name="email"
          autoComplete="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          ref={focused}
          withAsterisk
        />
        <FormRow>
          <TextInput
            label="Telefon"
            name="phone"
            autoComplete="phone"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />
          <TextInput
            label="Mobil"
            name="mobile"
            autoComplete="mobile"
            key={form.key("mobile")}
            {...form.getInputProps("mobile")}
          />
        </FormRow>
        {form.values.applicantType !== "self" && (
          <>
            <h3 className="pt-4">Persönliche Daten</h3>
            <FormRow>
              <Autocomplete
                key={form.key("parentTitle")}
                {...form.getInputProps("parentTitle")}
                data={titles}
                label="Titel"
              />
              <div>
                <Label text="Geschlecht" withAsterisk />
                <SegmentedControl
                  key={form.key("parentGender")}
                  {...form.getInputProps("parentGender")}
                  fullWidth
                  aria-label="Geschlecht"
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
                key={form.key("parentFirstName")}
                {...form.getInputProps("parentFirstName")}
                withAsterisk
              />
              <TextInput
                label="Nachname"
                name="lname"
                autoComplete="family-name"
                key={form.key("parentLastName")}
                {...form.getInputProps("parentLastName")}
                withAsterisk
              />
            </FormRow>
            <DatePickerInput
              defaultDate={eighteenYearsAgo}
              defaultLevel="decade"
              valueFormat="DD.MM.YYYY"
              label="Geburtstag"
              aria-label="Geburtstag"
              placeholder="TT.MM.JJJJ"
              minDate={undefined}
              maxDate={eighteenYearsAgo}
              key={form.key("parentDob")}
              {...form.getInputProps("parentDob")}
              leftSection={<IconCalendar size={16} />}
              withAsterisk
            />
            <Checkbox
              label="Ich bin bereits Mitglied beim 1. FC Nürnberg."
              key={form.key("parentIsMember")}
              {...form.getInputProps("parentIsMember", { type: "checkbox" })}
            />
            {form.values.parentIsMember && (
              <NumberInput
                label="Mitgliedsnummer"
                key={form.key("parentMemberNumber")}
                {...form.getInputProps("parentMemberNumber")}
                hideControls
                withAsterisk
              />
            )}
            <h3 className="pt-4">Adresse</h3>
            <Checkbox
              label="Meine Anschrift ist identisch mit der Adresse des Neumitglieds."
              description={`${form.values.street}, ${form.values.postalCode} ${form.values.city}, ${form.values.country}`}
              key={form.key("parentAddressIsIdentical")}
              {...form.getInputProps("parentAddressIsIdentical", {
                type: "checkbox",
              })}
            />
            {!form.values.parentAddressIsIdentical && (
              <Fieldset legend="Abweichende Adresse">
                <TextInput
                  className="col-span-3"
                  label="Straße & Hausnummer"
                  name="street"
                  autoComplete="street"
                  key={form.key("parentStreet")}
                  {...form.getInputProps("parentStreet")}
                  withAsterisk
                />
                <FormRow asymmetric>
                  <NumberInput
                    label="PLZ"
                    name="postal"
                    autoComplete="postal"
                    key={form.key("parentPostalCode")}
                    {...form.getInputProps("parentPostalCode")}
                    withAsterisk
                    hideControls
                    allowLeadingZeros
                  />
                  <TextInput
                    className="col-span-3"
                    label="Ort"
                    name="city"
                    autoComplete="city"
                    key={form.key("parentCity")}
                    {...form.getInputProps("parentCity")}
                    withAsterisk
                  />
                </FormRow>
                <Select
                  label="Land"
                  data={countries}
                  key={form.key("parentCountry")}
                  {...form.getInputProps("parentCountry")}
                  withAsterisk
                  checkIconPosition="right"
                  allowDeselect={false}
                  searchable
                />
              </Fieldset>
            )}
          </>
        )}
      </FormWrapper>
    </DatesProvider>
  );
}
