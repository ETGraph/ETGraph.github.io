import type { APIRoute } from "astro";
import { verifyJWT } from "../../../server-utils";

import { addBenchmark, getBenchmarks } from "../../../db/benchmarks";

export const post: APIRoute = async ({
  request,
}) => {
  const authHeader = request.headers.get("Authorization");
  let jwt = "";
  if (authHeader) {
    jwt = authHeader.split(" ")[1];
  }
  try {
    const verified = await verifyJWT(jwt);
  } catch (error) {
    return new Response(
      "Unauthorized",
      {
        status: 403,
      },
    );
  }
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

export const get: APIRoute = async ({
  request,
}) => {
  const authHeader = request.headers.get("Authorization");
  let jwt = "";
  if (authHeader) {
    jwt = authHeader.split(" ")[1];
  }
  try {
    const verified = await verifyJWT(jwt);
  } catch (error) {
    return new Response(
      "Unauthorized",
      {
        status: 403,
      },
    );
  }
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
