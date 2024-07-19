export default function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid Date object");
  }

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = daysOfWeek[date.getDay()]; // Day of the week as a string
  const dateStr = date.getDate().toString(); // Date as a string
  const month = monthsOfYear[date.getMonth()]; // Month as a string
  const year = date.getFullYear().toString(); // Year as a string

  return `${day}, ${dateStr} ${month} ${year}`;
}

// Example usage:
const now = new Date();
const formattedDate = formatDate(now);
console.log(formattedDate);

// For testing with a specific date:
const specificDate = new Date("2024-07-16T10:00:00");
const formattedSpecificDate = formatDate(specificDate);
console.log(formattedSpecificDate);
