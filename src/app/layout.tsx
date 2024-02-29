import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <main className="flex flex-col justify-center items-center h-screen">
          {children}
        </main>
        <footer className="text-white text-center hover:underline">
          <a href="https://sametcc.me/tic-tac-toe" target="_blank">
            check out the source code
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
