"use client";
import { Paper } from "@mantine/core";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconLoader2,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/confirm/${token}`, {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        res === 200 ? setConfirm(true) : setError(true);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className="flex justify-center items-center p-8">
      <Paper
        p="lg"
        radius="md"
        w="400"
        className="flex flex-col items-center gap-4"
        withBorder
      >
        {error ? (
          <>
            <IconExclamationCircle size={48} color="#aa1124" />
            <p>
              Leider ist bei der Bestätigung etwas schief gelaufen! Bitte melde
              Dich bei uns unter{" "}
              <a href="mailto:mitglied@fcn.de">mitglied@fcn.de</a>.
            </p>
          </>
        ) : confirm ? (
          <>
            <IconCircleCheck size={48} />
            <p>
              Vielen Dank für Deinen Antrag! Wir freuen uns, Dich in Kürze als
              Mitglied der Club-Familie begrüßen zu dürfen.
            </p>
          </>
        ) : (
          <IconLoader2 size={48} className="animate-spin" />
        )}
      </Paper>
    </div>
  );
}
