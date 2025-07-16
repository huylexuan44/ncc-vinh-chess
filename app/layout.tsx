import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NCC VINH KING OF CHESS",
  description: "NCC VINH",
  generator: "NCC VINH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="https://mezon.ai/assets/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
