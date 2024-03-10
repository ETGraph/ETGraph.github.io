import type { APIRoute } from "astro";

import { addBenchmark } from "../../db/benchmarks";
import { del } from "./admin/benchmarks/[id]";

export const post: APIRoute = async ({
  request,
  clientAddress,
}) => {
  // const clientAddress = "*";
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json() as {
      leaderboard: string;
      method: string;
      testAucRoc: number;
      testPrecision: number;
      testRecall: number;
      testF1: number;
      name: string;
      email: string;
      references: string;
      turnstileResponse: string;
    };

    try {
      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          response: body.turnstileResponse,
          secret: import.meta.env.TURNSTILE_SECRET_KEY,
          sitekey: import.meta.env.PUBLIC_TURNSTILE_SITEKEY,
        }),
      });
      const turnstileResData = await turnstileRes.json() as {
        success: boolean;
      };
      const logMessage = `[${clientAddress}] requestBody: ${
        JSON.stringify(body)
      }, turnstileVerify: ${JSON.stringify(turnstileResData)}`;
      if (turnstileResData.success) {
        console.log(logMessage);
      } else {
        console.error(logMessage);
      }
      if (turnstileResData.success) {
        // TODO: not type safe
        const {
          turnstileResponse: _,
          ...benchmark
        } = {
          ...body,
          clientAddress,
          timestamp: Date.now(),
        };
        await addBenchmark(benchmark);
      }
      return new Response(
        null,
        {
          status: turnstileResData.success ? 200 : 400,
        },
      );
    } catch (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 400 });
};
