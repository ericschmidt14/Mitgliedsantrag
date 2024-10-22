"use client";
import { Button, Paper } from "@mantine/core";
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

  return (
    <div className="flex justify-center items-center p-8">
      <Paper p="lg" radius="md" w="600">
        <Title text="Dein Antrag" />
        {JSON.stringify(entry)}
        <Button fullWidth onClick={handleConfirm}>
          Jetzt Anmeldung bestätigen
        </Button>
      </Paper>
    </div>
  );
}
