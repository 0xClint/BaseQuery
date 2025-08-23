import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { hashEmail } from "@/lib/utils";
import { cdpClient } from "@/lib/cdpClient";

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  try {
    const account = await cdpClient.evm.getOrCreateAccount({
      name: hashEmail(session?.user.email || "clintty"),
    });
    return NextResponse.json({ address: account.address });
  } catch (error) {
    console.error("Error creating wallet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
