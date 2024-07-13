import { generateSiweNonceWithDynamic } from "@/lib/dynamic-api";
import { appURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { baseSepolia } from "viem/chains";
import { createSiweMessage } from "viem/siwe";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;
  const nonce = await generateSiweNonceWithDynamic();
  const messageToSign = createSiweMessage({
    domain: appURL().replace("https://", ""),
    address,
    uri: appURL(),
    version: "1",
    chainId: baseSepolia.id,
    nonce,
  });
  return NextResponse.json({
    message: messageToSign,
  });
};
