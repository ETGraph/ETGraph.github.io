import type { APIRoute } from "astro";

import { addBenchmark, getBenchmarks } from "../../../db/benchmarks.ts";

export const post: APIRoute = async ({
  request,
}) => {
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
      await addBenchmark({
        ...body,
        clientAddress: "admin",
        timestamp: Date.now(),
      });
      return new Response(
        null,
        {
          status: 200,
        },
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

export const get: APIRoute = async () => {
  try {
    const benchmarks = await getBenchmarks();
    return new Response(
      JSON.stringify(benchmarks),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      error,
      {
        status: 500,
      },
    );
  }
};
