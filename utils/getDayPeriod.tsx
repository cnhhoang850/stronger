export default function getWorkoutTimeCategory(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid Date object");
  }

  const hours = date.getHours();

  if (hours >= 5 && hours < 12) {
    return "Morning Workout";
  } else if (hours >= 12 && hours < 13) {
    return "Noon Workout";
  } else if (hours >= 13 && hours < 17) {
    return "Afternoon Workout";
  } else if (hours >= 17 && hours < 21) {
    return "Evening Workout";
  } else {
    return "Night Workout";
  }
}
