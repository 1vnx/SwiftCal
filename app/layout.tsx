import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme-provider";

import { dark } from "@clerk/themes";

import SmoothScrolling from "@/components/lenis";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwiftCal.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider
    appearance={{
        baseTheme: dark,
      }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <SmoothScrolling>{children}</SmoothScrolling>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
