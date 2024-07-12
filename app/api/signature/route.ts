import { NextRequest, NextResponse } from "next/server";
import SafeApiKit from '@safe-global/api-kit'

export const POST = async (req: NextRequest) => {
  try {
    // Initialize the API Kit
    const apiKit = new SafeApiKit({
      chainId: BigInt(8453) // Base chain ID
    });

    const { txHash } = await req.json();

    const signedTransaction = await apiKit.getTransaction(txHash);

    return NextResponse.json({ 
      to: signedTransaction.to,
      value: signedTransaction.value.toString(),
      data: signedTransaction.data,
      operation: signedTransaction.operation,
      safeTxGas: signedTransaction.safeTxGas.toString(),
      baseGas: signedTransaction.baseGas.toString(),
      gasPrice: signedTransaction.gasPrice.toString(),
      gasToken: signedTransaction.gasToken,
      refundReceiver: signedTransaction.refundReceiver,
      nonce: signedTransaction.nonce.toString(),
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
};
