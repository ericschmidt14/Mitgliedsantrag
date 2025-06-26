import Image from "next/legacy/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/logo_transparent.svg"
        width={32}
        height={32}
        alt="1. FCN Logo"
      />
      <h1 className="text-2xl">
        Mitglieds<i>Antrag</i>
      </h1>
    </div>
  );
}
