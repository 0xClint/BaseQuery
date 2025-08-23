"use client";
import { SessionProvider } from "next-auth/react";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthProvider";
import { WalletProvider } from "@/context/WalletContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            disableTransitionOnChange={true}
            defaultTheme="light"
          >
            <AuthProvider>
              {/* <UserDataProvider> */}
              <WalletProvider>{children}</WalletProvider>
              {/* </UserDataProvider> */}
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
