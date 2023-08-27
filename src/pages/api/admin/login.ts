import type { APIRoute } from "astro";
import { ethers } from "ethers";

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
      const isVerified = ethers.verifyMessage(body.tbsMessage, body.signature);
      if (!isVerified) {
        return new Response(
          "Signature verification failed",
          {
            status: 400,
          },
        );
      }
      console.log(ethers.Signature.from(body.signature).toJSON());
      // check if signer address is admin
      // generate JWT token with signer address
      return new Response(
        JSON.stringify({
          jwt: "jwt",
        }),
      );
    } catch (error) {
      return new Response(
        null,
        {
          status: 500,
        },
      );
    }
  }
  return new Response(null, { status: 400 });
};
