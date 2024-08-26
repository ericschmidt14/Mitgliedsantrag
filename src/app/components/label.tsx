import { Text } from "@mantine/core";

export default function Label({
  text,
  withAsterisk,
}: {
  text: string;
  withAsterisk?: boolean;
}) {
  return (
    <Text size="sm" fw={500} mb={2}>
      {text}
      {withAsterisk && (
        <span
          className="mantine-InputWrapper-required mantine-TextInput-required"
          aria-hidden="true"
          style={{
            color: "var(--input-asterisk-color, var(--mantine-color-error))",
          }}
        >
          {" "}
          *
        </span>
      )}
    </Text>
  );
}
