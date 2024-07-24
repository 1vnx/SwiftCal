import Header from "../_components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex justify-center items-center flex-1">
            <Header />
    {children}</div>;
}
