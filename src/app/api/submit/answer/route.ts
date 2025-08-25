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
import { pinataClient } from "@/lib/pinata";

type answerType = {
  questionId: string | number;
  answer: string;
};
export async function POST(request: NextRequest) {
  const res: answerType = await request.json();

  if (!res.questionId || !res.answer) {
    return NextResponse.json({ error: "Invalid Question!" }, { status: 400 });
  }
  console.log(res);

  const session = await getServerSession(authOptions);

  const account = await cdpClient.evm.getAccount({
    name: hashEmail(session?.user.email || "clintty"),
  });

  const { cid } = await pinataClient.upload.public.json(res);
  const answerUrl = await pinataClient.gateways.public.convert(cid);
  // const answerUrl =
  //   "https://gateway.pinata.cloud/ipfs/bafkreiayzwoss6gqmlz2chp3bmamavb5kv6gnr3i2vfz5mmmyx7e54suca";
  console.log("[answerUrl]:" + answerUrl);

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
      functionName: "submitAnswer",
      args: [res.questionId, answerUrl],
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
