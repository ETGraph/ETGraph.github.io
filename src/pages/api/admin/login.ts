import type { APIRoute } from "astro";
import { ethers } from "ethers";
import { generateJWT } from "../../../server-utils"

export const post: APIRoute = async ({
  request,
}) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json() as {
      tbsMessage: string;
      signature: string;
    };

    try {
      // verify signature and get signed message and signer address
      const signerAddress = ethers.verifyMessage(
        body.tbsMessage,
        body.signature,
      );
      if (!signerAddress) {
        return new Response(
          "Signature verification failed",
          {
            status: 400,
          },
        );
      }
      console.log(signerAddress);
      // check if signer address is admin
      const adminAddresses = (import.meta.env.ADMIN_ETH_ADDRESSES as string)
        .split(",");
      if (!adminAddresses.includes(signerAddress)) {
        return new Response(
          "Signer address is not admin",
          {
            status: 401,
          },
        );
      }
      // generate JWT token with signer address
      const jwt = await generateJWT(signerAddress);
      return new Response(
        JSON.stringify({
          jwt,
        }),
      );
    } catch (error) {
      return new Response(
        error,
        {
          status: 500,
        },
      );
    }
  }
  return new Response(null, { status: 400 });
};
