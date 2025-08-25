import { NextRequest, NextResponse } from "next/server";

import { parseResults, sortAnswersByVotes } from "@/lib/utils";
import { Abi } from "viem";

import { publicClient } from "@/lib/viemConfig";
import {
  BASEQUERY_CONTRACT_ABI,
  BASEQUERY_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { AnswerFetchedItems } from "@/types/Answers.type";
import { QuestionFetchedItems } from "@/types/Question.type";

export async function POST(request: NextRequest) {
  const res: { paramsId: number } = await request.json();
  const { paramsId } = res;
  const questionId = BigInt(paramsId);

  if (!questionId) {
    return NextResponse.json(
      { error: "Invalid QuestionID or AnswerID!" },
      { status: 400 }
    );
  }
  try {
    const data = await publicClient.readContract({
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "getQuestion",
      args: [questionId],
    });

    const [
      id,
      owner,
      ipfsHash,
      bountyAmount,
      poolAmount,
      poolEndTime,
      selectedAnswerId,
      answerIds,
      isActive,
      isPoolQuestion,
      timestamp,
    ] = data as [
      bigint,
      `0x${string}`,
      string,
      bigint,
      bigint,
      bigint,
      bigint,
      readonly bigint[],
      boolean,
      boolean,
      bigint
    ];

    let questiondata = JSON.parse(ipfsHash);

    questiondata =
      questiondata &&
      typeof questiondata === "object" &&
      !Array.isArray(questiondata)
        ? questiondata
        : null;

    const contracts = answerIds.map((id) => ({
      address: BASEQUERY_CONTRACT_ADDRESS as `0x${string}`,
      abi: BASEQUERY_CONTRACT_ABI as Abi,
      functionName: "getAnswer",
      args: [id],
    }));

    const result = await publicClient.multicall({
      contracts,
    });

    let paresdResult: AnswerFetchedItems[] = parseResults(result);

    if (isPoolQuestion) paresdResult = sortAnswersByVotes(paresdResult);

    const question: QuestionFetchedItems = {
      id: Number(id),
      owner,
      question: questiondata,
      bountyAmount: Number(bountyAmount),
      poolAmount: Number(poolAmount),
      poolEndTime: Number(poolEndTime),
      selectedAnswerId: Number(selectedAnswerId),
      answers: paresdResult,
      isActive,
      isPoolQuestion,
      timestamp: Number(timestamp),
    };

    return NextResponse.json({ question });
  } catch (error: any) {
    const message = String(error?.message || "");
    const status = message.includes("QuestionNotFound") ? 404 : 500;
    const errorMsg =
      status === 404 ? "Question not found" : "Failed to fetch question";
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
