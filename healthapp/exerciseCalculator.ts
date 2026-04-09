// Interface for args
interface exerciseValues {
  target: number,
  exerciseHours: Array<number>
}

// Checks args
const parseArgs = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  if (isNaN(Number(args[2]))) throw new Error('Target value must be number');
  const target = Number(args[2]);

  const exerciseHours = args
    .slice(3)
    .map(arg => {
      if (isNaN(Number(arg))) {
        throw new Error('All exercise hours must be numbers');
      }
      return Number(arg);
    });

  return {
    target,
    exerciseHours
  };
};

// Interface for final return
interface Summary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number
}

// Main logic
export const calculateExercises = (hours: Array<number>, dailyGoal: number): Summary => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;

  const total = hours.reduce((sum, h) => sum + h, 0);
  const average = total / periodLength;

  const success = average >= dailyGoal;

  let rating: number;
  let ratingDescription: string;

  if (average >= dailyGoal) {
    rating = 3;
    ratingDescription = "Great job!";
  } else if (average >= dailyGoal * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better ";
  } else {
    rating = 1;
    ratingDescription = "You need to improve";
  }
  

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyGoal,
    average
  };
};

try {
  const { target, exerciseHours } = parseArgs(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}