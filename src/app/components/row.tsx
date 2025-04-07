import { ActionIcon, Button, CopyButton, Drawer, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconClipboard,
  IconDownload,
  IconId,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { Result } from "../lib/interfaces";

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
          <header className="flex justify-between items-baseline gap-2">
            <h2>Details</h2>

            <CopyButton value={JSON.stringify(result.json, null, 2)}>
              {({ copied, copy }) => (
                <Button
                  variant="light"
                  size="xs"
                  leftSection={
                    copied ? (
                      <IconCheck size={16} />
                    ) : (
                      <IconClipboard size={16} />
                    )
                  }
                  onClick={copy}
                >
                  {copied ? "Daten kopiert" : "Daten kopieren"}
                </Button>
              )}
            </CopyButton>
          </header>
          <pre className="text-sm">{JSON.stringify(result.json, null, 2)}</pre>
        </div>
      </Drawer>
    </>
  );
}
