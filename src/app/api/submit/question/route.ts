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
  USDC_TOKEN_ABI,
  USDC_TOKEN_ADDRESS,
} from "@/lib/constants";
import { QuestionItem } from "@/types/Question.type";

export type questionType = {
  question: QuestionItem;
  bountyAmount: string;
  poolDuration: number;
  useAsPool: boolean;
};

export async function POST(request: NextRequest) {
  const res: questionType = await request.json();
  const { question, bountyAmount, poolDuration, useAsPool } = res;

  if (!question) {
    return NextResponse.json(
      { error: "Question was not created properly!" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  const account = await cdpClient.evm.getAccount({
    name: hashEmail(session?.user.email || "clintty"),
  });

  const bountyAmountInUSDC = parseUnits(bountyAmount, 6);

  try {
    const walletClient = createWalletClient({
      account: toAccount(account),
      chain: baseSepolia,
      transport: http(),
    });
    const [address] = await walletClient.getAddresses();

    // 1. Check allowance
    let allowance = (await publicClient.readContract({
      address: USDC_TOKEN_ADDRESS,
      abi: USDC_TOKEN_ABI,
      functionName: "allowance",
      args: [address, BASEQUERY_CONTRACT_ADDRESS],
    })) as bigint;

    console.log("[allowance]:" + allowance);
    console.log("[bountyAmountInUSDC]:" + bountyAmountInUSDC);

    // 2. If insufficient allowance → approve
    if (allowance < bountyAmountInUSDC) {
      const { request: approveRequest } = await publicClient.simulateContract({
        account: toAccount(account),
        address: USDC_TOKEN_ADDRESS,
        abi: USDC_TOKEN_ABI,
        functionName: "approve",
        args: [BASEQUERY_CONTRACT_ADDRESS, bountyAmountInUSDC],
      });
      const hash1 = await walletClient.writeContract(approveRequest);
      console.log("[approve hash]: " + hash1);
      await publicClient.waitForTransactionReceipt({
        hash: hash1,
      });
      await new Promise((res) => setTimeout(res, 3000));
    } else {
      console.log("[allowance status] :already allowed that much amount");
    }

    // 3. Simulate createQuestion
    const { request } = await publicClient.simulateContract({
      account: toAccount(account),
      address: BASEQUERY_CONTRACT_ADDRESS,
      abi: BASEQUERY_CONTRACT_ABI,
      functionName: "createQuestion",
      args: [
        JSON.stringify({
          ...question,
          owner: session?.user.name || "John",
        }),
        bountyAmountInUSDC,
        poolDuration,
        useAsPool,
      ],
    });
    const hash2 = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({
      hash: hash2,
    });
    console.log("[hash2]: " + hash2);

    return NextResponse.json(NextResponse.json({ hash2 }, { status: 200 }));
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
