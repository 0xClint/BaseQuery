"use client";
// import { cdpClient } from "@/lib/cdpClient";
import {
  STORAGE_CONTRACT_ABI,
  STORAGE_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { encodeFunctionData } from "viem";

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProviderFn = () => {
  const { status, data: session } = useSession();
  const [evmAddress, setEvmAddress] = useState<`0x${string}`>("0x");
  const [accountId, setAccountId] = useState<string>();
  const [balances, setBalances] = useState<string>("0.00");

  const fetchEvmAddress = useCallback(async () => {
    console.log(session);
    const res = await fetch("/api/account");
    if (res.ok) {
      const { address } = await res.json();
      console.log(address);
      setEvmAddress(address);
    }
  }, [session]);

  // const getAccounts = async () => {
  //   let response = await cdpClient.evm.listAccounts();
  //   console.log(response);
  // };

  const refreshBalance = useCallback(async () => {
    if (!evmAddress) return;

    const res = await fetch(`/api/account/balance`);
    if (res.ok) {
      const { balance } = await res.json();
      setBalances(String(balance));
    }
  }, [evmAddress]);

  const requestFaucet = async () => {
    if (evmAddress) {
      try {
        const response = await fetch(
          `/api/account/faucet?address=${encodeURIComponent(evmAddress)}`
        );
        const data = await response.json();
        await refreshBalance();
        toast.success("Amount has been reflected to your account!");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchEvmAddress();
    }
  }, [status, fetchEvmAddress]);

  useEffect(() => {
    if (evmAddress) {
      refreshBalance();
    }
  }, [evmAddress, refreshBalance]);

  const createQuestion = async () => {
    // const encodedTransferCall = encodeFunctionData({
    //   abi: STORAGE_CONTRACT_ABI,
    //   functionName: "store",
    //   args: [1000],
    // });

    if (!evmAddress) return;

    const res = await fetch(`/api/temp`);
    if (res.ok) {
      const { address } = await res.json();
    }
    // const txResult = await cdpClient.evm.sendTransaction({
    //   address: evmAddress,
    //   network: "base-sepolia",
    //   transaction: {
    //     to: STORAGE_CONTRACT_ADDRESS, // recipient address
    //     // value: parseEther("0.000001"), // sending 0.000001 ETH
    //     data: encodedTransferCall,
    //   },
    // });
    // console.log(txResult);
    // const encodedTransferCall = encodeFunctionData({
    //   abi: BASEQUERY_CONTRACT_ABI,
    //   functionName: "createQuestion",
    //   args: ["ipfs hash", 1000, 0, false],
    // });
    // const txResult = await cdpClient.evm.sendTransaction({
    //   address: evmAddress,
    //   network: "base-sepolia",
    //   transaction: {
    //     to: BASEQUERY_CONTRACT_ADDRESS, // recipient address
    //     // value: parseEther("0.000001"), // sending 0.000001 ETH
    //     data: encodedTransferCall,
    //   },
    // });
    // console.log(txResult);
  };
  return {
    evmAddress,
    accountId,
    fetchEvmAddress,
    createQuestion,
    // getAccounts,
    requestFaucet,
    refreshBalance,
    balances,
  };
};

type WalletContextProps = ReturnType<typeof WalletProviderFn>;

const WalletContext = createContext<WalletContextProps | null>(null);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WalletContext.Provider value={WalletProviderFn()}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
