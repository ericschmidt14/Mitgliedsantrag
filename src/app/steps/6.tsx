"use client";
import { Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
import { FormValues } from "../form";

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
        label="Mitgliedschaft durch"
        description="Wie bist du auf die Mitgliedschaft aufmerksam geworden?"
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
        label="Mitgliedermagazin"
        description="Bitte senden Sie mir die Mitgliederzeitung als"
      />
      <p>
        Hiermit willige ich ein, dass mir der 1. Fußball-Club Nürnberg e.V.,
        Valznerweiherstraße 200, 90480 Nürnberg die Mitgliederzeitung per E-Mail
        senden darf. Mir ist bewusst, dass ich diese Einwilligung jederzeit mit
        Wirkung für die Zukunft, per E-Mail an mitglied@fcn.de widerrufen kann.
      </p>
      <p>
        Ich bin zudem damit einverstanden, dass der 1. Fußball-Club Nürnberg
        e.V. mir regelmäßig Informationen zu ihren Dienstleistungen (Newsletter,
        Veranstaltungen, etc.) per E-Mail an die angegebene E-Mail-Adresse
        zukommen lässt. Meine Einwilligung kann ich jederzeit mit Wirkung für
        die Zukunft per E-Mail an mitglied@fcn.de widerrufen.
      </p>
      <p>
        Wir setzen Sie davon in Kenntnis, dass durch den Widerruf der
        Einwilligung die Rechtmäßigkeit der aufgrund der Einwilligung bis zum
        Widerruf erfolgten Verarbeitung nicht berührt wird.
      </p>
    </FormWrapper>
  );
}
