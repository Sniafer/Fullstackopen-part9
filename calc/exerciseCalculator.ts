interface UserValues {
  target: number;
  days: Array<number>;
}

const parse = (args: Array<string>): UserValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const days = args.slice(3);
  const daysToNumber = days.map((a) => {
    if (isNaN(Number(a))) {
      throw new Error("Provided values were not numbers!");
    } else {
      return Number(a);
    }
  });
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target was not number!");
  return {
    target,
    days: daysToNumber,
  };
};

interface Rating {
  rating: number;
  ratingDescription: string;
}

const calculateRating = (average: number, target: number): Rating => {
  if (average >= target) {
    return { rating: 3, ratingDescription: "Great work!" };
  }
  if (average >= target / 2) {
    return { rating: 2, ratingDescription: "Not too bad but could be better" };
  }
  return { rating: 1, ratingDescription: "Not good" };
};

const calculateExercises = (days: Array<number>, target: number) => {
  const periodLength = days.length;
  const trainingDays = days.filter((d) => d > 0).length;

  const sum = days.reduce((a: number, b: number): number => {
    return a + b;
  });
  const average = (sum / (target * periodLength)) * target;
  const success = average >= target;
  const { rating, ratingDescription } = calculateRating(average, target);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, days } = parse(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
