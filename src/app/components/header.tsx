import { Button } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { CONTACT_EMAIL } from "../lib/constants";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center md:justify-between items-center gap-2 px-8 py-2 bg-black/50 backdrop-blur-md text-white shadow-md">
      <Logo />
      <Button
        color="dark"
        className="hidden md:block"
        component="a"
        href={`mailto:${CONTACT_EMAIL}`}
        leftSection={<IconMail size={20} />}
      >
        Kontakt
      </Button>
    </header>
  );
}
