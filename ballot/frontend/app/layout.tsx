"use client";
import * as React from 'react';
import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

import Navbar from "@/components/instructionsComponent/navigation/navbar";
import Footer from "@/components/instructionsComponent/navigation/footer";

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID as string,
    appName: 'Homework week 4',
    chains: [sepolia],
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="dark">
          <body>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "105vh" }}>
              <Navbar />
              <div style={{flexGrow: 1}}>{children}</div>
              <Footer />
            </div>
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}