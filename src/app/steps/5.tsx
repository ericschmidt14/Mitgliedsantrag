"use client";
import { Checkbox, Divider, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
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
      <Checkbox
        label="Ich ermächtige den 1. Fußball-Club Nürnberg für Leibesübungen e. V., die von mir zu entrichtenden Zahlungen bei Fälligkeit von meinem Konto mittels Lastschrift einzuziehen."
        key={form.key("acceptSepa")}
        {...form.getInputProps("acceptSepa", { type: "checkbox" })}
      />
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
      <p className="col-span-2 muted small">
        Vor dem ersten Einzug der SEPA-Lastschrift wird mich der 1. Fußball-Club
        Nürnberg Verein für Leibesübungen e. V., über den Zeitpunkt und
        Mandatsreferenz-Nr. schriftlich informieren. Zugleich weise ich mein
        Kreditinstitut an, die vom 1. Fußball-Club Nürnberg Verein für
        Leibesübungen e. V. auf mein Konto gezogenen Lastschriften einzulösen
        (laut Beitragsordnung nur Bankeinzug möglich). Hinweis: Ich kann
        innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die
        Erstattung des belastenden Beitrags verlangen. Es gelten dabei die mit
        meinem Kreditinstitut vereinbarten Bedingungen.
      </p>
      <Divider label="Satzung" />
      <Checkbox
        label={
          <>
            Hiermit bin ich mit der{" "}
            <a
              href="https://www.fcn.de/fileadmin/fcn/red/saison_18/Downloads/pdf/Vereinssatzung-FCN-0319.pdf"
              className="link"
              target="_blank"
            >
              Satzung des 1. FCN
            </a>{" "}
            einverstanden.
          </>
        }
        key={form.key("acceptCharter")}
        {...form.getInputProps("acceptCharter", { type: "checkbox" })}
      />
      <Divider label="Datenschutz" />
      <Checkbox
        label={
          <>
            Hiermit bestätige ich: Der 1. Fußball-Club Nürnberg Verein für
            Leibesübungen e. V. erhebt, nutzt und verarbeitet die erhobenen
            personenbezogenen Daten ausschließlich im Rahmen der
            datenschutzrechtlichen Bestimmungen. Nähere Informationen zum
            Datenschutz findest du{" "}
            <a
              href="https://www.fcn.de/standards/datenschutzerklaerung/"
              className="link"
              target="_blank"
            >
              hier
            </a>
            .
          </>
        }
        key={form.key("acceptPrivacy")}
        {...form.getInputProps("acceptPrivacy", { type: "checkbox" })}
      />
    </FormWrapper>
  );
}
