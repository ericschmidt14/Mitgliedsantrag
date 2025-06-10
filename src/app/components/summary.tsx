import { ActionIcon, CopyButton, Table } from "@mantine/core";
import { IconCheck, IconClipboard } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FormValues } from "../form/form";

export default function Summary({
  values,
  copy,
}: {
  values: FormValues;
  copy?: boolean;
}) {
  const data = [
    {
      label: "Geschlecht",
      value: values.gender,
    },
    {
      label: "Titel",
      value: values.title,
    },
    {
      label: "Name",
      value: `${values.firstName} ${values.lastName}`,
    },
    {
      label: "Geburtstag",
      value: dayjs(values.dob).format("DD.MM.YYYY"),
    },
    {
      label: "Adresse",
      value: `${values.street}, ${values.postalCode}  ${values.city},  ${values.country}`,
    },
    {
      label: "E-Mail",
      value: values.email,
    },
    {
      label: "Telefon",
      value: values.phone,
    },
    {
      label: "Mobil",
      value: values.mobile,
    },
    {
      label: "Eintrittsdatum",
      value: dayjs(values.entryDate).format("DD.MM.YYYY"),
    },
    {
      label: "Beitragsart",
      value: values.membershipType,
    },
    {
      label: "Ermäßigungsnachweis",
      value: values.certificateName,
    },
    {
      label: "Geworben durch",
      value: values.advertNumber,
    },
    {
      label: "Fanclub",
      value: `${values.ofcnNumber} ${values.ofcnName}`,
    },
    {
      label: "Kontoinhaber",
      value: values.depositor,
    },
    {
      label: "IBAN",
      value: values.iban,
    },
    {
      label: "BIC",
      value: values.bic,
    },
    {
      label: "Mitgliederzeitung",
      value: values.magazine,
    },
    {
      label: "Mitgliedsausweis",
      value: values.id,
    },
    {
      label: "Newsletter",
      value: values.newsletter ? "Ja" : "Nein",
    },
    {
      label: "Antragsdatum",
      value: dayjs(new Date()).format("DD.MM.YYYY"),
    },
  ];

  return (
    <Table className="responsive-table">
      <Table.Tbody>
        {data.map((entry, index) => {
          return (
            entry.value?.toString().trim() !== "" && (
              <Table.Tr key={index}>
                <Table.Td>
                  <b>{entry.label}</b>
                </Table.Td>
                <Table.Td>{entry.value}</Table.Td>
                {copy && (
                  <Table.Td>
                    <CopyButton value={entry.value?.toString() || ""}>
                      {({ copied, copy }) => (
                        <ActionIcon variant="light" onClick={copy}>
                          {copied ? (
                            <IconCheck size={16} />
                          ) : (
                            <IconClipboard size={16} />
                          )}
                        </ActionIcon>
                      )}
                    </CopyButton>
                  </Table.Td>
                )}
              </Table.Tr>
            )
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
