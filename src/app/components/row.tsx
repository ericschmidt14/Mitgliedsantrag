import { ActionIcon, Button, Drawer, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconId } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Result } from "../lib/interfaces";
import Summary from "./summary";

export default function Row({ result }: { result: Result }) {
  const [opened, { open, close }] = useDisclosure(false);
  const dateFormat = "DD.MM.YYYY hh:mm:ss";

  const handleDownload = () => {
    if (
      result.json.certificate === undefined ||
      result.json.certificate === null
    ) {
      return;
    }

    const link = document.createElement("a");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link.href = result.json.certificate as any;
    link.download = result.json.certificateName!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Table.Tr>
        <Table.Td>
          {result.firstname} {result.lastname}
        </Table.Td>
        <Table.Td>{result.mail || result.json.email}</Table.Td>
        <Table.Td>
          {result.created && dayjs(result.created).format(dateFormat)}
        </Table.Td>
        <Table.Td>
          {result.mailing && dayjs(result.mailing).format(dateFormat)}
        </Table.Td>
        <Table.Td>
          {result.confirmed && dayjs(result.confirmed).format(dateFormat)}
        </Table.Td>
        <Table.Td>
          <div className="flex justify-end items-center gap-2">
            {result.json.certificate && (
              <ActionIcon variant="transparent" onClick={handleDownload}>
                <IconDownload size={16} />
              </ActionIcon>
            )}
            <Button
              size="xs"
              variant="light"
              onClick={open}
              leftSection={<IconId size={16} />}
            >
              Details
            </Button>
          </div>
        </Table.Td>
      </Table.Tr>

      <Drawer opened={opened} onClose={close} position="right" size="lg">
        <div className="flex flex-col gap-4 overflow-x-hidden">
          <h2>Details</h2>
          <Summary values={result.json} copy />
          <pre className="text-sm muted pt-8">
            {JSON.stringify(result.json, null, 2)}
          </pre>
        </div>
      </Drawer>
    </>
  );
}
