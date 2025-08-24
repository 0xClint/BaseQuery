import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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
  STORAGE_CONTRACT_ABI,
  STORAGE_CONTRACT_ADDRESS,
  USDC_TOKEN_ADDRESS,
} from "@/lib/constants";

const usdcAbi = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "amount", type: "uint256" }],
  },
];

const retrieve = async () => {
  const data = await publicClient.readContract({
    address: BASEQUERY_CONTRACT_ADDRESS,
    abi: BASEQUERY_CONTRACT_ABI,
    functionName: "getQuestion",
    args: [2],
  });
  console.log(data);
};
export async function GET() {
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

    const bountyAmountInUSDC = parseUnits("0.1", 6);

    // const { request: approveRequest } = await publicClient.simulateContract({
    //   account: toAccount(account),
    //   address: USDC_TOKEN_ADDRESS,
    //   abi: usdcAbi,
    //   functionName: "approve",
    //   args: [BASEQUERY_CONTRACT_ADDRESS, bountyAmountInUSDC],
    // });
    // const hash1 = await walletClient.writeContract(approveRequest);
    // console.log("[hash1]: " + hash1);

    // 3. Simulate createQuestion
    // const { request } = await publicClient.simulateContract({
    //   account: toAccount(account),
    //   address: BASEQUERY_CONTRACT_ADDRESS,
    //   abi: BASEQUERY_CONTRACT_ABI,
    //   functionName: "createQuestion",
    //   args: ["ipfsHash", bountyAmountInUSDC, 0, false],
    // });
    // const hash2 = await walletClient.writeContract(request);
    // console.log("[hash2]: " + hash2);

    await retrieve();

    return NextResponse.json({ address: "" });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
