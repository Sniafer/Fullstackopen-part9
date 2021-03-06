import express from "express";
import bodyParser from "body-parser";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = bmiCalculator(height, weight);

  const object = {
    height,
    weight,
    bmi,
  };

  try {
    if (isNaN(height) || isNaN(weight)) {
      res.status(400);
      res.send(JSON.stringify({ error: "malformatted parameters" }));
    } else {
      res.status(200);
      res.send(JSON.stringify(object));
    }
  } catch (error: unknown) {
    throw new Error(`Message: ${error}`);
  }
});

interface Training {
  days: Array<number>;
  target: number;
}

app.post("/exercises", (req, res) => {
  const { days, target } = req.body as Training;

  if (!days || !target) return res.status(400).json("Not enough arguments");
  let notNumber = false;
  days.forEach((d: number) => {
    if (isNaN(d)) {
      notNumber = true;
    }
  });
  if (notNumber || isNaN(target))
    return res.status(400).json("Provided values were not numbers!");

  const result = calculateExercises(days, target);
  try {
    return res.status(200).json(result);
  } catch (error: unknown) {
    throw new Error(`Message: ${error}`);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
