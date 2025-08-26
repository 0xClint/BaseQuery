import { NextResponse } from "next/server";

import {
  BASEQUERY_CONTRACT_ABI,
  BASEQUERY_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { publicClient } from "@/lib/viemConfig";
import { AllQuestionItem, QuestionItem } from "@/types/Question.type";

export async function GET() {
  try {
    const data = await publicClient.readContract({
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "getAllQuestions",
    });

    if (!Array.isArray(data) || data.length < 7) {
      console.error("Unexpected format from contract", data);
      return NextResponse.json({ questions: [] });
    }

    // Destructure tuple arrays
    const [
      questionIds,
      ipfsHashes,
      creators,
      amounts,
      isPool,
      isActive,
      timestamps,
    ] = data as [
      readonly bigint[],
      readonly string[],
      readonly `0x${string}`[],
      readonly bigint[],
      readonly boolean[],
      readonly boolean[],
      readonly bigint[]
    ];

    // Convert into array of objects
    const questions: AllQuestionItem[] = [];

    for (let idx = 0; idx < questionIds.length; idx++) {
      try {
        const ipfsHash = JSON.parse(ipfsHashes[idx]);
        if (
          ipfsHash &&
          typeof ipfsHash === "object" &&
          !Array.isArray(ipfsHash)
        ) {
          questions.push({
            id: Number(questionIds[idx]),
            ownerAddress: creators[idx],
            amount: Number(amounts[idx]),
            isPool: isPool[idx],
            isActive: isActive[idx],
            createdAt: Number(timestamps[idx]),
            ...ipfsHash,
          });
        } else {
          console.warn("Invalid ipfsHash at index", idx, ipfsHash);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json(
          { error: "Failed to fetch questions" },
          { status: 500 }
        );
      }
    }
    const sorted = [...questions].sort((a, b) => b.createdAt - a.createdAt);
    return NextResponse.json({ questions: sorted });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
