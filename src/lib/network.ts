import { baseSepolia } from "viem/chains";
import { Chain } from "viem";

type NetworkConfig = {
  chain: Chain;
  rpcUrl?: string;
  network: "base" | "base-sepolia";
  explorerUrl: string;
};

export const getNetworkConfig = (): NetworkConfig => {
  return baseSepoliaNetworkConfig;
};

const baseSepoliaNetworkConfig: NetworkConfig = {
  chain: baseSepolia,
  network: "base-sepolia",
  explorerUrl: "https://sepolia.basescan.org",
  rpcUrl: "https://sepolia.base.org",
};
