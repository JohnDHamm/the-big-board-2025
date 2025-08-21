import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {
  DraftStatusProvider,
  PlayersProvider,
  TeamsProvider,
  UserProvider
 } from "./contexts";
import SocketListener from "@/app/sockets/SocketListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Big Board",
  description: "Fantasy football draft app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <DraftStatusProvider>
            <TeamsProvider>
              <PlayersProvider>
                <SocketListener>
                  {children}
                </SocketListener>
              </PlayersProvider>
            </TeamsProvider>
          </DraftStatusProvider>
        </UserProvider>
      </body>
    </html>
  );
}
