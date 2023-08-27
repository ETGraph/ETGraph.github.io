const kv = await Deno.openKv();

export type Benchmark = {
  leaderboard: string;
  method: string;
  testAucRoc: number;
  testPrecision: number;
  testRecall: number;
  testF1: number;
  name: string;
  email: string;
  references: string;
  clientAddress: string;
  timestamp: number;
};

export type BenchmarkEntry = Benchmark & {
  id: string;
  status: "pending" | "approved" | "rejected";
};

export async function addBenchmark(benchmark: Benchmark) {
  const id = crypto.randomUUID();
  await kv.set(["benchmarks", id], {
    ...benchmark,
    id,
    status: "pending",
  });
  return id;
}

export async function getBenchmarks() {
  const benchmarks: BenchmarkEntry[] = [];
  for await (
    const { value } of kv.list<BenchmarkEntry>({ prefix: ["benchmarks"] })
  ) {
    benchmarks.push({
      ...value,
    });
  }
  return benchmarks;
}

export async function getBenchmark(id: string) {
  const benchmark = await kv.get<BenchmarkEntry>(["benchmarks", id]);
  return benchmark.value;
}

export async function updateBenchmark(
  id: string,
  status: "approved" | "rejected",
) {
  const key = ["benchmarks", id];
  const benchmark = await kv.get<BenchmarkEntry>(key);
  if (benchmark.value === null) {
    throw new Error("Benchmark entry not found");
  }
  try {
    const res = await kv.atomic()
      .check(benchmark)
      .set(key, {
        ...benchmark.value,
        status,
      })
      .commit();
    if (!res.ok) {
      throw new Error("Benchmark entry atomic update failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteBenchmark(id: string) {
  await kv.delete(["benchmarks", id]);
}
