"use client";
import { Table } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import dayjs from "dayjs";
import { FormWrapper } from "../components/form";
import Title from "../components/title";
import { FormValues } from "../form/form";

export default function Step7({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  const data = [
    {
      label: "Geschlecht",
      value: form.values.gender,
    },
    {
      label: "Titel",
      value: form.values.title,
    },
    {
      label: "Name",
      value: `${form.values.firstName} ${form.values.lastName}`,
    },
    {
      label: "Geburtstag",
      value: dayjs(form.values.dob).format("DD.MM.YYYY"),
    },
    {
      label: "Adresse",
      value: `${form.values.street}, ${form.values.postalCode}  ${form.values.city},  ${form.values.country}`,
    },
    {
      label: "E-Mail",
      value: form.values.email,
    },
    {
      label: "Telefon",
      value: form.values.phone,
    },
    {
      label: "Mobil",
      value: form.values.mobile,
    },
    {
      label: "Eintrittsdatum",
      value: dayjs(form.values.entryDate).format("DD.MM.YYYY"),
    },
    {
      label: "Beitragsart",
      value: form.values.membershipType,
    },
    {
      label: "Ermäßigungsnachweis",
      value: form.values.certificateName,
    },
    {
      label: "Geworben durch",
      value: form.values.advertNumber,
    },
    {
      label: "Fanclub",
      value: `${form.values.ofcnNumber} ${form.values.ofcnName}`,
    },
    {
      label: "Kontoinhaber",
      value: form.values.depositor,
    },
    {
      label: "IBAN",
      value: form.values.iban,
    },
    {
      label: "BIC",
      value: form.values.bic,
    },
    {
      label: "Mitgliederzeitung",
      value: form.values.magazine,
    },
    {
      label: "Mitgliedsausweis",
      value: form.values.id,
    },
    {
      label: "Antragsdatum",
      value: dayjs(new Date()).format("DD.MM.YYYY"),
    },
  ];

  return (
    <FormWrapper>
      <Title text="Zusammenfassung" />
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
                </Table.Tr>
              )
            );
          })}
        </Table.Tbody>
      </Table>
    </FormWrapper>
  );
}
