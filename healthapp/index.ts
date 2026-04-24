import express from "express";
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from "./exerciseCalculator.ts";
import parser from "./utils/parser.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = parser(req.body);
    res.json(calculateExercises(daily_exercises, target));
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "malformatted parameters",
    });
  }
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
