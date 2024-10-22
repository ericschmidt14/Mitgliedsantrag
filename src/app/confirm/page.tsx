"use client";
import { Button, Fieldset, Paper, Table } from "@mantine/core";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "../components/title";
import { Member } from "../form";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [entry, setEntry] = useState<Member>();
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    fetch(`/api/token/${token}`, {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        setEntry(res);
      })
      .catch((error) => console.error(error));
  }, [token]);

  const handleConfirm = () => {
    fetch(`/api/confirm/${token}`, {
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .then((res) => res.json())
      .then((res) => {
        setConfirm(true);
      })
      .catch((error) => console.error(error));
  };

  const data = entry
    ? [
        {
          description: "Name",
          value: `${entry.firstName} ${entry.lastName}`,
        },
        {
          description: "Geschlecht",
          value: entry.gender,
        },
        {
          description: "Geburtstag",
          value: format(entry.dob || new Date(), "dd.MM.yyyy"),
        },
        {
          description: "Adresse",
          value: `${entry.street}, ${entry.postalCode} ${entry.city} ${entry.country}`,
        },
        {
          description: "E-Mail",
          value: entry.email,
        },
        {
          description: "Telefon",
          value: entry.phone,
        },
        {
          description: "Mobil",
          value: entry.mobile,
        },
        {
          description: "Gewünschtes Eintrittsdatum",
          value: format(entry.entryDate || new Date(), "dd.MM.yyyy"),
        },
        {
          description: "Beitragsart",
          value: entry.membershipType,
        },
        {
          description: "OFCN",
          value: `${entry.ofcnNumber} – ${entry.ofcnName}`,
        },
        {
          description: "Kontoinhaber",
          value: entry.depositor,
        },
        {
          description: "IBAN",
          value: entry.iban,
        },
        {
          description: "Mitgliedermagazin",
          value: entry.magazine,
        },
      ]
    : [];

  return (
    <div className="flex justify-center items-center p-8">
      <Paper p="lg" radius="md" w="600" className="flex flex-col gap-4">
        <Title text="Dein Antrag" />
        {entry ? (
          <>
            <Fieldset legend="Zusammenfassung">
              <Table className="responsive-table">
                <Table.Tbody>
                  {data.map((entry, index) => {
                    return (
                      entry.value !== "" && (
                        <Table.Tr key={index}>
                          <Table.Td>
                            <b>{entry.description}</b>
                          </Table.Td>
                          <Table.Td>{entry.value}</Table.Td>
                        </Table.Tr>
                      )
                    );
                  })}
                </Table.Tbody>
              </Table>
            </Fieldset>
            <Button fullWidth onClick={handleConfirm}>
              Jetzt Anmeldung bestätigen
            </Button>
          </>
        ) : (
          <p>
            Kein Datensatz verfügbar.{" "}
            <a href="mailto:mitglied@fcn.de">Bitte kontaktiere uns.</a>
          </p>
        )}
      </Paper>
    </div>
  );
}
