import { Button, Drawer, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconId } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Result } from "../lib/interfaces";

export default function Row({ result }: { result: Result }) {
  const [opened, { open, close }] = useDisclosure(false);

  const dateFormat = "DD.MM.YYYY HH:MM:ss";

  return (
    <>
      <Table.Tr>
        <Table.Td>
          {result.firstname} {result.lastname}
        </Table.Td>
        <Table.Td>{result.mail || result.json.email}</Table.Td>
        <Table.Td>{dayjs(result.created).format(dateFormat)}</Table.Td>
        <Table.Td>
          {result.mailing && dayjs(result.mailing).format(dateFormat)}
        </Table.Td>
        <Table.Td>
          {result.confirmed && dayjs(result.confirmed).format(dateFormat)}
        </Table.Td>
        <Table.Td align="right">
          <Button
            size="xs"
            variant="light"
            onClick={open}
            leftSection={<IconId size={16} />}
          >
            Details
          </Button>
        </Table.Td>
      </Table.Tr>

      <Drawer
        opened={opened}
        onClose={close}
        title="Details"
        position="right"
        size="lg"
      >
        <div className="flex flex-col gap-4">
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(result.json, null, 2)}
          </pre>
        </div>
      </Drawer>
    </>
  );
}
