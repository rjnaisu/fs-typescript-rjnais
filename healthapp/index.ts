import express from "express";
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  const body: any = req.body;
  if (body.daily_exercises === undefined || body.target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }
  if (
    !Array.isArray(body.daily_exercises) ||
    !body.daily_exercises.every((value) => typeof value === "number") ||
    typeof body.target !== "number"
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  res.json(calculateExercises(body.daily_exercises, body.target));
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
