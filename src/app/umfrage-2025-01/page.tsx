"use client";
import { Button, Checkbox, Paper } from "@mantine/core";
import { IconMailFast } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Title from "../components/title";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [digitalId, setDigitalId] = useState(false);
  const [invitation, setInvitation] = useState(false);

  return (
    <div className="flex justify-center items-center p-8">
      <Paper
        p="xl"
        radius="md"
        w="666"
        className="flex flex-col items-start gap-8"
        withBorder
      >
        <Title text="Mitgliederumfrage 2025 Q1" />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              JSON.stringify({ token, digitalId, invitation }, null, 2)
            );
          }}
        >
          <Checkbox
            label="Ich möchte den Mitgliedsausweis digital erhalten."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus, ligula at fermentum egestas, sapien sem placerat tellus, et tristique lacus mauris in purus. Donec ac eros sodales nibh dapibus semper. Aliquam vulputate massa ut metus dapibus ullamcorper. Nunc sed volutpat ex. Aenean et nisl pretium magna auctor porta in ac quam."
            size="lg"
            checked={digitalId}
            onChange={(e) => setDigitalId(e.currentTarget.checked)}
          />
          <Checkbox
            label="Ich möchte die Einladung zur Jahreshauptversammlung digital erhalten."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus, ligula at fermentum egestas, sapien sem placerat tellus, et tristique lacus mauris in purus. Donec ac eros sodales nibh dapibus semper. Aliquam vulputate massa ut metus dapibus ullamcorper. Nunc sed volutpat ex. Aenean et nisl pretium magna auctor porta in ac quam."
            size="lg"
            checked={invitation}
            onChange={(e) => setInvitation(e.currentTarget.checked)}
          />
          <Button type="submit" leftSection={<IconMailFast size={16} />}>
            Absenden
          </Button>
        </form>
        <div className="flex flex-col gap-4">
          <p className="muted small">
            Hiermit willige ich ein, dass mir der 1. Fußball-Club Nürnberg e.V.,
            Valznerweiherstraße 200, 90480 Nürnberg zu den oben genannten Themen
            E-Mails senden darf. Mir ist bewusst, dass ich diese Einwilligung
            jederzeit mit Wirkung für die Zukunft durch erneutes Absenden dieses
            Formulars widerrufen kann.
          </p>
          <p className="muted small">
            Wir setzen Dich davon in Kenntnis, dass durch den Widerruf der
            Einwilligung die Rechtmäßigkeit der aufgrund der Einwilligung bis
            zum Widerruf erfolgten Verarbeitung nicht berührt wird.
          </p>
        </div>
      </Paper>
    </div>
  );
}
