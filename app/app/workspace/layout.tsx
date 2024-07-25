import "./workspace.css";

import Sidebar from "./_components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] border-t">
      <Sidebar /> <div className="flex flex-col">{children}</div>
    </div>
  );
}
