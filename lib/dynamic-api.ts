export declare enum ChainEnum {
  ETH = "ETH",
  EVM = "EVM",
}

export interface VerifyRequest {
  signedMessage: string;
  messageToSign: string;
  publicWalletAddress: string;
  chain: ChainEnum;
  walletName: string;
  walletProvider: "browserExtension";
}

export interface VerifyResponse {
  mfaToken?: string;
  jwt?: string;
  user: any;
  minifiedJwt?: string;
  expiresAt: number;
}

export const verifyWithDynamic = async (data: {
  signedMessage: string;
  messageToSign: string;
  publicWalletAddress: string;
  chain: ChainEnum;
}) => {
  const body: VerifyRequest = {
    signedMessage: data.signedMessage,
    messageToSign: data.messageToSign,
    publicWalletAddress: data.publicWalletAddress,
    chain: data.chain,
    walletName: "evm-action",
    walletProvider: "browserExtension",
  };
  // console.log(body);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/verify`,
      options
    );
    if (!res.ok) {
      console.log(await res.text());
      throw new Error("Failed to verify with Dynamic");
    }
    const data = await res.json();
    return {
      error: false,
      result: data,
    };
  } catch (e) {
    console.error(e);
    return {
      error: true,
    };
  }
};

export const getCurrentUserWithDynamic = async (jwt: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  try {
    const res = await fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/users`,
      options
    );
    if (!res.ok) {
      console.log(await res.text());
      throw new Error("Failed to get user with Dynamic");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return {
      error: true,
    };
  }
};

export const generateSiweNonceWithDynamic = async () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = await fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/nonce`,
      options
    );
    if (!res.ok) {
      console.log(await res.text());
      throw new Error("Failed to generate nonce with Dynamic");
    }
    const data = await res.json();
    return data.nonce;
  } catch (e) {
    console.error(e);
    return {
      error: true,
    };
  }
};
