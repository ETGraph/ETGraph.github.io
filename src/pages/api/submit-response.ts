import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request, clientAddress }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json() as {
      method: string;
      testAucRoc: number;
      testPrecision: number;
      testRecall: number;
      testF1: number;
      name: string;
      email: string;
      references: string;
      hCaptchaResponse: string;
    };

    try {
      const hCaptchaRes = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          response: body.hCaptchaResponse,
          secret: import.meta.env.HCAPTCHA_SECRET_KEY,
          sitekey: import.meta.env.PUBLIC_HCAPTCHA_SITEKEY,
        }),
      });
      const hCaptchaResData = await hCaptchaRes.json() as {
        success: boolean;
      };
      if (!hCaptchaResData.success) {
        console.log(`From ${clientAddress}: ${JSON.stringify(body)}`);
      } else {
        console.error(`From ${clientAddress}: ${JSON.stringify(body)}`);
      }
      return new Response(
        null,
        {
          status: hCaptchaResData.success ? 200 : 400,
        },
      );
    } catch (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 400 });
};
