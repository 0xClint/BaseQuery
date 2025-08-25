import { CdpClient } from "@coinbase/cdp-sdk";
import { createWalletClient, http } from "viem";
import { toAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

export const cdpClient: CdpClient = new CdpClient({
  apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID,
  apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET,
  walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET,
});


// const walletClient = createWalletClient({
//   account: toAccount(account),
//   chain: baseSepolia,
//   transport: http(),
// });

