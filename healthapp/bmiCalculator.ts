//type BmiResult =
//'Underweight' |
//'Normal range' |
//'Overweight' |
//'Obese'

export default function calculateBmi(height: number, weight: number): string {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal range";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
}
if (process.argv[1] === import.meta.filename) {
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
}
