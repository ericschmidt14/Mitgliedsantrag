import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "1. FCN Mitgliedsantrag",
  description: "",
};

const theme = createTheme({
  fontFamily: "Glober Regular",
  headings: { fontFamily: "Glober ExtraBold" },
  primaryColor: "red",
  colors: {
    red: [
      "#fdecef",
      "#f5d6da",
      "#efa8b1",
      "#ea7884",
      "#e6515f",
      "#e33948",
      "#aa1124",
      "#c9222f",
      "#b41b29",
      "#9e1021",
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Suspense>
            <main className="min-h-screen flex flex-col justify-between bg-[length:300%_300%] bg-[#220407]">
              {children}
            </main>
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
