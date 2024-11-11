"use client";
import { SegmentedControl, Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Label from "../components/label";
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
        key={form.key("invitation")}
        {...form.getInputProps("invitation")}
        data={["Digital-Version", "Print-Version"]}
        checkIconPosition="right"
        allowDeselect={false}
        label="Bitte sendet mit die Einladung zur Jahreshauptversammlung als"
      />
      <div>
        <Label text="Ich möchte meinen Mitgliedsausweis digital erhalten." />
        <SegmentedControl
          data={["Ja", "Nein"]}
          fullWidth
          key={form.key("digitalId")}
          {...form.getInputProps("digitalId")}
        />
      </div>
      {form.values.magazine === "Digital-Version" && (
        <p className="muted small">
          Hiermit willige ich ein, dass mir der 1. Fußball-Club Nürnberg e.V.,
          Valznerweiherstraße 200, 90480 Nürnberg die Mitgliederzeitung per
          E-Mail senden darf. Mir ist bewusst, dass ich diese Einwilligung
          jederzeit mit Wirkung für die Zukunft, per E-Mail an mitglied@fcn.de
          widerrufen kann.
        </p>
      )}
      <p className="muted small">
        Ich bin damit einverstanden, dass der 1. Fußball-Club Nürnberg e.V. mir
        regelmäßig Informationen zu ihren Dienstleistungen (Newsletter,
        Veranstaltungen, etc.) per E-Mail an die angegebene E-Mail-Adresse
        zukommen lässt. Meine Einwilligung kann ich jederzeit mit Wirkung für
        die Zukunft per E-Mail an mitglied@fcn.de widerrufen.
      </p>
      <p className="muted small">
        Wir setzen Dich davon in Kenntnis, dass durch den Widerruf der
        Einwilligung die Rechtmäßigkeit der aufgrund der Einwilligung bis zum
        Widerruf erfolgten Verarbeitung nicht berührt wird.
      </p>
    </FormWrapper>
  );
}
