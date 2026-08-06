import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
 
const blockletter = localFont({
  src: '/assets/fonts/Blockletter.otf',
})
const ptSansNarrow = localFont({
  src: '/assets/fonts/PTSansNarrow-Regular.ttf',
})

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
        className={`${blockletter.className} ${ptSansNarrow.className} antialiased`}
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
