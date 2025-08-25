"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import {
  BASEQUERY_CONTRACT_ABI,
  BASEQUERY_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { publicClient } from "@/lib/viemConfig";
import React from "react";

export default function Page() {
  // <-- Capital "P"
  const {
    evmAddress,
    createQuestion,
    createAnswer,
    upVote,
    selectBestAnswer,
    withdrawBounty,
    questionList,
    fetchQuestionById,
  } = useWallet();

  const getQuestion = async (id: number) => {
    const data = await publicClient.readContract({
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "getQuestion",
      args: [id],
    });
    console.log(data);
  };

  const getAnswer = async (id: number) => {
    const data = await publicClient.readContract({
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "getAnswer",
      args: [id],
    });
    console.log(data);
  };

  return (
    <div>
      <Header />
      <Button onClick={() => getQuestion(3)}>get Question</Button>
      <Button onClick={() => fetchQuestionById(3)}>fetch Question byID</Button>

      <Button onClick={() => getAnswer(1)}>get Answer</Button>
      <Button onClick={() => createAnswer(3, "new-answer1")}>
        create Answer
      </Button>
      <Button onClick={() => upVote(4, 2, true)}>upVote</Button>
      <Button onClick={() => selectBestAnswer(9, 4)}>selectBestAnswer</Button>
      <Button onClick={() => withdrawBounty(9)}>withdrawBounty</Button>
    </div>
  );
}
