import { Button } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center md:justify-between items-center gap-2 px-8 py-2 bg-black/50 backdrop-blur-md text-white shadow-md">
      <div className="flex items-center gap-1">
        <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
        <p className="text-2xl">
          <b>Mitglieds</b>
          <i>antrag</i>
        </p>
      </div>
      <Button
        color="dark"
        className="hidden md:block"
        component="a"
        href="mailto:mitglied@fcn.de"
        leftSection={<IconMail size={20} />}
      >
        Kontakt
      </Button>
    </header>
  );
}
