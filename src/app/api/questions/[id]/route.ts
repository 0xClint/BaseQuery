import { NextResponse } from "next/server";

import {
  BASEQUERY_CONTRACT_ABI,
  BASEQUERY_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { publicClient } from "@/lib/viemConfig";
import { QuestionFetchedItems, QuestionItem } from "@/types/Question.type";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const questionId = BigInt(params.id);

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

    const question: QuestionFetchedItems = {
      id: Number(id),
      owner,
      question: questiondata,
      bountyAmount: Number(bountyAmount),
      poolAmount: Number(poolAmount),
      poolEndTime: Number(poolEndTime),
      selectedAnswerId: Number(selectedAnswerId),
      answerIds: (answerIds as readonly bigint[]).map((a) => Number(a)),
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
