"use client";
import { Checkbox, Divider, Select, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
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
        description="Ich bin damit einverstanden, dass der 1. Fußball-Club Nürnberg e.V. mir
        regelmäßig Informationen zu ihren Dienstleistungen (Newsletter,
        Veranstaltungen, etc.) per E-Mail an die angegebene E-Mail-Adresse
        zukommen lässt. Meine Einwilligung kann ich jederzeit mit Wirkung für
        die Zukunft per E-Mail an mitglied@fcn.de widerrufen."
        key={form.key("newsletter")}
        {...form.getInputProps("newsletter", { type: "checkbox" })}
        className="mt-2"
      />
    </FormWrapper>
  );
}
