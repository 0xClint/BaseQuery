import { NextResponse } from "next/server";

import {
  BASEQUERY_CONTRACT_ABI,
  BASEQUERY_CONTRACT_ADDRESS,
} from "@/lib/constants";
import { publicClient } from "@/lib/viemConfig";
import { QuestionItem } from "@/types/Question.type";

export async function GET() {
  try {
    const data = await publicClient.readContract({
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "getAllQuestions",
    });

    console.log("Contract returned:", data);

    if (!Array.isArray(data) || data.length < 2) {
      console.error("Unexpected format from contract");
      return NextResponse.json({ questions: [] });
    }

    const [questionIds, ipfsHashes] = data as [
      readonly bigint[],
      readonly string[]
    ];

    const questions: QuestionItem[] = [];

    for (let idx = 0; idx < questionIds.length; idx++) {
      try {
        const ipfsHash = JSON.parse(ipfsHashes[idx]);

        if (
          ipfsHash &&
          typeof ipfsHash === "object" &&
          !Array.isArray(ipfsHash)
        ) {
          questions.push({
            id: Number(questionIds[idx]), // <- bigint → number
            ...ipfsHash,
          });
        } else {
          console.warn("Invalid ipfsHash at index", idx, ipfsHash);
        }
      } catch (err) {
        console.error("Failed to parse ipfsHash at index:", idx, err);
      }
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
