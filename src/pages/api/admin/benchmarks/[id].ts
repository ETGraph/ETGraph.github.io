import type { APIRoute } from "astro";

import {
  deleteBenchmark,
  getBenchmark,
  updateBenchmark,
} from "../../../../db/benchmarks.ts";

export const get: APIRoute = async ({
  params,
}) => {
  const id = params.id as string;
  try {
    const benchmark = await getBenchmark(id);
    if (benchmark) {
      return new Response(
        JSON.stringify(benchmark),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } else {
      return new Response(
        null,
        {
          status: 404,
        },
      );
    }
  } catch (error) {
    return new Response(
      error,
      {
        status: 500,
      },
    );
  }
};

export const patch: APIRoute = async ({
  params,
  request,
}) => {
  const id = params.id as string;
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json() as {
      status: "approved" | "rejected";
    };
    try {
      await updateBenchmark(id, body.status);
      return new Response(
        null,
        {
          status: 204,
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
  } else {
    return new Response(
      null,
      {
        status: 400,
      },
    );
  }
};

export const del: APIRoute = async ({
  params,
}) => {
  const id = params.id as string;
  try {
    await deleteBenchmark(id);
    return new Response(
      null,
      {
        status: 204,
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
