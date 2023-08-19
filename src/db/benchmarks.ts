const kv = await Deno.openKv();

export interface Benchmark {
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
}

export async function addBenchmark(benchmark: Benchmark) {
  await kv.set(["benchmarks", crypto.randomUUID()], benchmark);
}

const userId = crypto.randomUUID();
await kv.set(["users", userId], {
  userId,
  name: "Alice",
});
