"use client";
import { Checkbox, Divider, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
import { FormValues } from "../form/form";
import { CHARTER, PRIVACY_NOTICE } from "../lib/constants";
import { media } from "../lib/data";

export default function Step6({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
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
          "Freunde/Familie",
          "Fan-/Ticketshop",
          "Clubhaus",
          "fcn.de",
          "Social Media",
          "Mitgliederflyer",
          "Plakatwerbung",
          "Radiowerbung",
          "Zeitungsartikel",
          "Auf anderen FCN-Veranstaltungen",
          "Fußballcamps/Fußballschule",
          "AIRTIME Trampolinpark",
        ]}
        checkIconPosition="right"
        label="Wie bist Du auf die Mitgliedschaft aufmerksam geworden?"
      />
      <Select
        key={form.key("magazine")}
        {...form.getInputProps("magazine")}
        data={media}
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
        erhältst Du{" "}
        <a
          href="https://fcn.de/fileadmin/fcn/red/saison_24/Downloads/pdf/URL-Basis_persoenlicher_Interessen_Newsletter.pdf"
          className="link small"
          target="_blank"
        >
          hier
        </a>
        .
      </p>
      <Divider label="Datenschutz" />
      <Checkbox
        label="Ich bin ausdrücklich damit einverstanden, dass mein Vor- und Nachname im Mitgliedermagazin sowie auf der Stadionleinwand veröffentlicht werden darf, um mich als Neumitglied des Clubs bekannt zu machen."
        key={form.key("acceptPrivacyNewMember")}
        {...form.getInputProps("acceptPrivacyNewMember", { type: "checkbox" })}
      />
      <Checkbox
        label="Ich bin ausdrücklich damit einverstanden, dass mein Geburtstag inkl. Vor- und Nachname für die öffentliche Gratulation im Mitgliedermagazin „Der Club“ genutzt werden dürfen."
        key={form.key("acceptPrivacyBirthday")}
        {...form.getInputProps("acceptPrivacyBirthday", { type: "checkbox" })}
      />
      <Checkbox
        label="Ich willige hiermit ausdrücklich ein, dass der 1. FC Nürnberg e. V. meine angegebenen Daten über die Vertragslaufzeit hinaus bis zu meinem Widerruf zu Marktforschungs-, Analyse- und Marketingzwecken nutzt und mich zu diesem Zweck per Post, E-Mail, Telefon und SMS kontaktieren darf, um mich über aktuelle Angebote und Dienstleistungen rund um den 1. FC Nürnberg zu informieren."
        key={form.key("acceptPrivacyMarketing")}
        {...form.getInputProps("acceptPrivacyMarketing", { type: "checkbox" })}
      />
      <p className="small">
        Mir ist bewusst, dass ich diese Einwilligungen jederzeit mit Wirkung für
        die Zukunft, per E-Mail an{" "}
        <a href="mailto:datenschutz@fcn.de" className="link small">
          datenschutz@fcn.de
        </a>{" "}
        widerrufen kann. Wir setzen Dich davon in Kenntnis, dass durch den
        Widerruf der Einwilligung die Rechtmäßigkeit der aufgrund der
        Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt wird.
        Weitere Informationen findest Du in unserer{" "}
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
            <a href={CHARTER} className="link" target="_blank">
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
