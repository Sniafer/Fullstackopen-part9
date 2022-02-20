// interface Values {
//   value1: number;
//   value2: number;
// }

// const parseArguments = (args: Array<string>): Values => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("Too many arguments");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

export const bmiCalculator = (height: number, weight: number): string => {
  const meters = height / 100;
  const square = Math.pow(meters, 2);
  const bmi = weight / square;
  if (bmi < 16.0) return "Underweight (Severe thinness)";
  if (bmi < 16.9) return "Underweight (Moderate thinness)";
  if (bmi < 18.4) return "Underweight (Mild thinness)";
  if (bmi < 24.9) return "Normal range";
  if (bmi < 29.9) return "Overweight (Pre-obese)";
  if (bmi < 34.9) return "Obese (Class I)";
  if (bmi < 39.9) return "Obese (Class II)";
  if (bmi > 40.0) return "Obese (Class III)";
  return "something wrong";
};

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(bmiCalculator(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
