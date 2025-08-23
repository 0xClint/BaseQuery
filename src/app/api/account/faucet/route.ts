import { NextRequest, NextResponse } from "next/server";

import { cdpClient } from "@/lib/cdpClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address parameter is required" },
        { status: 400 }
      );
    }

    const faucet = await cdpClient.evm.requestFaucet({
      address: address,
      network: "base-sepolia",
      token: "usdc",
    });
    console.log(faucet);
    return NextResponse.json({ balance: "1000" });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
