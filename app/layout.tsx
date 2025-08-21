import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import {
  CurrentPickProvider,
  DraftProvider,
  DraftStatusProvider,
  MyTeamProvider,
  PicksProvider,
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
          <CurrentPickProvider>
            <DraftProvider>
              <DraftStatusProvider>
                <TeamsProvider>
                  <PlayersProvider>
                    <PicksProvider>
                      <MyTeamProvider>
                        <SocketListener>
                          {children}
                        </SocketListener>
                      </MyTeamProvider>
                    </PicksProvider>
                  </PlayersProvider>
                </TeamsProvider>
              </DraftStatusProvider>
            </DraftProvider>
          </CurrentPickProvider>
        </UserProvider>
      </body>
    </html>
  );
}
