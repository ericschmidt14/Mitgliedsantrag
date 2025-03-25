"use client";
import { Checkbox, Divider, Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
import { PRIVACY_NOTICE } from "../constants";
import { FormValues } from "../form/form";

export default function Step6({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const OTHER = "Sonstiges (Bitte angeben)";

  return (
    <FormWrapper>
      <Title text="Sonstiges" />
      <Select
        key={form.key("advertisement")}
        {...form.getInputProps("advertisement")}
        data={[
          "Im Max-Morlock-Stadion",
          "Fanclub",
          "Auswärtsfahrt",
          "Freunde / Familie",
          "Fan- / Ticketshop",
          "Clubhaus",
          "fcn.de",
          "Social Media",
          "Mitgliederflyer",
          "Plakatwerbung",
          "Radiowerbung",
          "Zeitungsartikel",
          "Auf anderen FCN-Veranstaltungen",
          "Fußballcamps / Fußballschule",
          "AIRTIME Trampolinpark",
          OTHER,
        ]}
        checkIconPosition="right"
        label="Wie bist Du auf die Mitgliedschaft aufmerksam geworden?"
      />
      {form.values.advertisement === OTHER && (
        <TextInput
          key={form.key("advertisementOther")}
          {...form.getInputProps("advertisementOther")}
        />
      )}
      <Select
        key={form.key("magazine")}
        {...form.getInputProps("magazine")}
        data={["Digital-Version", "Print-Version"]}
        checkIconPosition="right"
        allowDeselect={false}
        label="Bitte sendet mir die Mitgliederzeitung als"
      />
      <Select
        key={form.key("id")}
        {...form.getInputProps("id")}
        data={["Digital-Version", "Print-Version"]}
        checkIconPosition="right"
        allowDeselect={false}
        label="Bitte sendet mir den Mitgliedsausweis als"
      />
      <Divider label="Newsletter" />
      <Checkbox
        label="Ich möchte den Newsletter erhalten."
        key={form.key("newsletter")}
        {...form.getInputProps("newsletter", { type: "checkbox" })}
      />
      <p className="small">
        Hiermit willige ich ein, dass mich der 1. FC Nürnberg e.V. per E-Mail,
        Telefon oder postalisch kontaktieren darf, um mir auf meine persönlichen
        Interessen zugeschnittene Angebote im Zusammenhang mit Waren,
        Dienstleitungen und Merchandiseartikeln des Vereins zu unterbreiten und
        mich über Neuigkeiten des Vereins sowie z.B. über Gewinnspiele und
        Veranstaltungen zu informieren.
      </p>
      <p className="small">
        Erläuterungen zu Informationen auf Basis persönlicher Interessen
        erhalten Sie{" "}
        <a href={PRIVACY_NOTICE} className="link small" target="_blank">
          hier
        </a>
        .
      </p>
      <p className="small">
        Mir ist bewusst, dass ich diese Einwilligung jederzeit mit Wirkung für
        die Zukunft, per E-Mail an{" "}
        <a href="mailto:datenschutz@fcn.de" className="link small">
          datenschutz@fcn.de
        </a>{" "}
        widerrufen kann. Wir setzen Sie davon in Kenntnis, dass durch den
        Widerruf der Einwilligung die Rechtmäßigkeit der aufgrund der
        Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt wird.
        Weitere Informationen finden Sie in unserer{" "}
        <a href={PRIVACY_NOTICE} className="link small" target="_blank">
          Datenschutzerklärung
        </a>
        .
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
    </FormWrapper>
  );
}
