"use client";
import { Paper } from "@mantine/core";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconLoader2,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Logo from "../components/logo";
import { CONTACT_EMAIL } from "../lib/constants";
import { Result } from "../lib/interfaces";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState("loading");
  const [member, setMember] = useState<Result | null>(null);

  useEffect(() => {
    if (!token) {
      setState("error");
    } else {
      fetch(`/api/member/${token}`, {
        method: "GET",
        headers: { Accept: "*/*" },
      })
        .then((res) => res.json())
        .then((res) => {
          setMember(res[0]);
        })
        .catch((error) => {
          console.error(error);
          setState("error");
        });
    }
  }, [token]);

  useEffect(() => {
    if (!member) return;

    if (member.confirmed) {
      setState("alreadyConfirmed");
      return;
    }

    if (state !== "success" && state !== "alreadyConfirmed") {
      fetch(`/api/confirm/${token}`, {
        method: "GET",
        headers: { Accept: "*/*" },
      })
        .then((res) => res.json())
        .then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          res === 200 ? setState("success") : setState("error");
        })
        .catch((error) => {
          console.error(error);
          setState("error");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  const renderContent = () => {
    switch (state) {
      case "loading":
        return <IconLoader2 size={48} className="animate-spin" />;

      case "error":
        return (
          <>
            <IconExclamationCircle size={48} color="#aa1124" />
            <p>
              Leider ist bei der Bestätigung Deiner Mail-Adresse etwas schief
              gelaufen:{" "}
              {token ? "Das Token ist ungültig" : "Kein Token vorhanden"}. Bitte
              melde Dich unter{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </>
        );

      case "alreadyConfirmed":
        return (
          <>
            <IconCircleCheck size={48} />
            <p>
              <b>
                Hallo {member?.firstname}, Deine E-Mail-Adresse wurde bereits
                bestätigt!
              </b>{" "}
              Wir freuen uns, Dich in Kürze als Mitglied der Club-Familie
              begrüßen zu dürfen.
            </p>
          </>
        );

      case "success":
        return (
          <>
            <IconCircleCheck size={48} />
            <p>
              <b>
                Hallo {member?.firstname}, Deine E-Mail-Adresse wurde bestätigt!
              </b>{" "}
              Wir freuen uns, Dich in Kürze als Mitglied der Club-Familie
              begrüßen zu dürfen.
            </p>
          </>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8 p-8">
        <Logo />
        <Paper p="lg" radius="md" w="400" bg="rgba(0, 0, 0, 0.5)">
          <div className="flex flex-col items-center gap-4">
            {renderContent()}
          </div>
        </Paper>
      </div>
      <Footer />
    </>
  );
}
