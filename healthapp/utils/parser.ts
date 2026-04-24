export default function parser(body: unknown): { daily_exercises: number[]; target: number } {
  if (!body || typeof body !== "object") {
    throw new Error("parameters missing");
  }

  const data = body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (data.daily_exercises === undefined || data.target === undefined) {
    throw new Error("parameters missing");
  }

  if (!Array.isArray(data.daily_exercises) || typeof data.target !== "number") {
    throw new Error("malformatted parameters");
  }

  if (!data.daily_exercises.every((value): value is number => typeof value === "number")) {
    throw new Error("malformatted parameters");
  }

  return {
    daily_exercises: data.daily_exercises,
    target: data.target,
  };
}
