import { verifyWithDynamic, ChainEnum } from "@/lib/dynamic-api";
import { appURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { signedMessage, messageToSign, address } = body;
  const res = await verifyWithDynamic({
    signedMessage: signedMessage!,
    messageToSign,
    publicWalletAddress: address!,
    chain: ChainEnum.EVM,
  });
  if (res.error) {
    return NextResponse.json(
      {
        message: "Failed to verify with Dynamic",
      },
      { status: 401 }
    );
  }
  const jwt = res.result.jwt;
  const minJwt = res.result.minifiedJwt;
  return NextResponse.json({
    url: `${appURL()}?jwt=${jwt}&minJwt=${minJwt}`,
  });
};
