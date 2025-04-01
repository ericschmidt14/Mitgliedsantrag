"use client";
import { Button, Pagination, Table, TextInput } from "@mantine/core";
import { IconLogout, IconRefresh, IconSearch } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import Login from "../components/login";
import Logo from "../components/logo";
import Row from "../components/row";
import { Result } from "../lib/interfaces";

export default function Page() {
  const { data: session, status } = useSession();
  const [results, setResults] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");

  const fetchData = () => {
    if (session) {
      fetch("/api")
        .then((res) => res.json())
        .then((data: Result[]) => {
          setResults(
            [...data].sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
          );
        })
        .catch((error) => {
          setResults([]);
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (status === "loading") {
    return <Loader />;
  }

  if (!session) {
    return <Login />;
  }

  const filteredResults =
    results &&
    results.filter((r) => {
      const keywords = search.toLowerCase().split(" ");

      return keywords.every((keyword) =>
        [r.token || "", r.firstname || "", r.lastname || "", r.mail || ""].some(
          (value) => value.toLowerCase().includes(keyword)
        )
      );
    });

  const pageLimit = 25;
  const pageSize = pageLimit ? +pageLimit : 25;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredResults.length / pageSize);

  return (
    <div className="flex flex-col items-center gap-4">
      <header className="w-full flex justify-between items-center px-8 py-2 bg-black/50">
        <Logo />
        <div className="flex gap-2">
          <Button
            variant="transparent"
            color="gray"
            leftSection={<IconRefresh size={16} />}
            onClick={() => fetchData()}
          >
            Aktualisieren
          </Button>
          <Button
            variant="light"
            leftSection={<IconLogout size={16} />}
            onClick={() => signOut()}
          >
            Ausloggen
          </Button>
        </div>
      </header>
      <div className="w-full flex flex-col gap-4 p-8">
        <TextInput
          placeholder="Suchen ..."
          leftSection={<IconSearch size={16} />}
          rightSection={<p>{filteredResults.length}</p>}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          styles={{
            input: {
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgb(66, 66, 66)",
            },
          }}
        />
        {currentPageData.length < 1 ? (
          <p className="muted text-center p-4">Keine Anträge vorhanden.</p>
        ) : (
          <>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>E-Mail</Table.Th>
                  <Table.Th>Eingang</Table.Th>
                  <Table.Th>Versand</Table.Th>
                  <Table.Th>Bestätigung</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {currentPageData.map((result) => (
                  <Row key={result.token} result={result} />
                ))}
              </Table.Tbody>
            </Table>
            <Pagination
              value={page}
              onChange={setPage}
              total={totalPages}
              className="flex justify-center"
            />
          </>
        )}
      </div>
    </div>
  );
}
