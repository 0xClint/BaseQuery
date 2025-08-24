"use client";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { walletClient } from "@/lib/viemConfig";
import React from "react";

export default function page() {
  const { evmAddress, createQuestion } = useWallet();
  // const createQuestion = async () => {
  // console.log(address);
  // };
  return (
    <div>
      <Button onClick={() => createQuestion()}>Create Question</Button>
    </div>
  );
}
