"use client";
import { Checkbox, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
import { PRIVACY_NOTICE } from "../constants";
import { FormValues } from "../form/form";
import { formatIBAN } from "../utils";

export default function Step5({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <FormWrapper>
      <Title text="SEPA-Mandat" />
      <TextInput
        className="col-span-2"
        label="Name des Kontoinhabers"
        key={form.key("depositor")}
        {...form.getInputProps("depositor")}
        withAsterisk
      />
      <TextInput
        label="IBAN"
        key={form.key("iban")}
        {...form.getInputProps("iban")}
        onChange={(event) => {
          form.setFieldValue("iban", formatIBAN(event.currentTarget.value));
        }}
        withAsterisk
      />
      <TextInput
        label="BIC"
        key={form.key("bic")}
        {...form.getInputProps("bic")}
        withAsterisk
      />
      <Checkbox
        label="Ich ermächtige den 1. Fußball-Club Nürnberg für Leibesübungen e. V., die von mir zu entrichtenden Zahlungen bei Fälligkeit von meinem Konto mittels Lastschrift einzuziehen."
        key={form.key("acceptSepa")}
        {...form.getInputProps("acceptSepa", { type: "checkbox" })}
      />
      <p className="small">
        Vor dem ersten Einzug der SEPA-Lastschrift wird mich der 1. Fußball-Club
        Nürnberg Verein für Leibesübungen e. V., über den Zeitpunkt und
        Mandatsreferenz-Nr. schriftlich informieren. Zugleich weise ich mein
        Kreditinstitut an, die vom 1. Fußball-Club Nürnberg Verein für
        Leibesübungen e. V. auf mein Konto gezogenen Lastschriften einzulösen
        (laut Beitragsordnung nur Bankeinzug möglich).
      </p>
      <p className="small">
        Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem
        Belastungsdatum, die Erstattung des belastenden Beitrags verlangen. Es
        gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
      </p>
      <p className="small">
        Zur Verarbeitung meiner personenbezogenen Daten habe ich die{" "}
        <a href={PRIVACY_NOTICE} className="link small" target="_blank">
          Datenschutzbelehrung
        </a>{" "}
        zur Kenntnis genommen.
      </p>
    </FormWrapper>
  );
}
