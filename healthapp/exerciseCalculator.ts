interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

type Rating = 1 | 2 | 3;

interface ExerciseArguments {
  target: number;
  hours: number[];
}

function getRating(average: number, target: number): Rating {
  const ratio = average / target;

  if (ratio < 0.5) return 1;
  if (ratio < 1) return 2;
  return 3;
}

function getRatingDescription(rating: Rating): string {
  switch (rating) {
    case 1:
      return "bad";
    case 2:
      return "Not too bad but could be better";
    case 3:
      return "You met the target!";
  }
}

export default function calculateExercises(hours: number[], target: number): Result {
  const sum = hours.reduce((sum, day) => sum + day, 0);
  const average = sum / hours.length;
  const rating = getRating(average, target);

  return {
    periodLength: hours.length,
    trainingDays: hours.reduce((count, day) => (day !== 0 ? count + 1 : count), 0),
    success: average >= target,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average,
  };
}

function parseArguments(args: string[]): ExerciseArguments {
  if (args.length < 2) {
    throw new Error("Input shape: Target, [...Hours]");
  }

  const values = args.map((arg) => Number(arg));

  if (values.some((value) => Number.isNaN(value))) {
    throw new Error("All arguments must be numbers");
  }

  const [target, ...hours] = values;

  if (target <= 0) {
    throw new Error("Target must be greater than 0");
  }

  return {
    target,
    hours,
  };
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, hours } = parseArguments(process.argv.slice(2));
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = "Oops, something went wrong";

    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }

    console.log(errorMessage);
  }
}
