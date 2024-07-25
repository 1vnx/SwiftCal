import type { Metadata } from "next";

import { auth } from "@clerk/nextjs/server";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Dashboard - SwiftCal",
  description: "",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  auth().protect();

  return (
    <>
      <Header />
      {children}
    </>
  );
}
