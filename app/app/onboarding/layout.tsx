import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - SwiftCal",
  description: "",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
