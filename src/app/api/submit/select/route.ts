import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { cdpClient } from "@/lib/cdpClient";
import { hashEmail } from "@/lib/utils";
import { createWalletClient, http, parseUnits } from "viem";
import { toAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { publicClient } from "@/lib/viemConfig";
import {
  BASEQUERY_CONTRACT_ABI,
  BASEQUERY_CONTRACT_ADDRESS,
} from "@/lib/constants";

export type selectBestAnswerType = {
  questionId: number;
  answerId: number;
};

export async function POST(request: NextRequest) {
  const res: selectBestAnswerType = await request.json();
  const { questionId, answerId } = res;

  if (!questionId || !answerId) {
    return NextResponse.json(
      { error: "Invalid QuestionID or AnswerID!" },
      { status: 400 }
    );
  }
  console.log(res);

  const session = await getServerSession(authOptions);

  const account = await cdpClient.evm.getAccount({
    name: hashEmail(session?.user.email || "clintty"),
  });

  try {
    const walletClient = createWalletClient({
      account: toAccount(account),
      chain: baseSepolia,
      transport: http(),
    });

    // 3. Simulate createQuestion
    const { request } = await publicClient.simulateContract({
      account: toAccount(account),
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "selectBestAnswer",
      args: [questionId, answerId],
    });
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({
      hash,
    });
    console.log("[hash]: " + hash);

    return NextResponse.json({ hash }, { status: 200 });
  } catch (error) {
    console.error("Error fetching balance:", error);
    // console.log();
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
