export default function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours < 24) {
    return remainingMinutes === 0 ? `${hours}h` : `${hours}h ${remainingMinutes}m`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  if (days < 30) {
    return remainingHours === 0 ? `${days}d` : `${days}d ${remainingHours}h`;
  }

  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  if (months < 12) {
    return remainingDays === 0 ? `${months}mo` : `${months}mo ${remainingDays}d`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return remainingMonths === 0 ? `${years}y` : `${years}y ${remainingMonths}mo`;
}

// Example usage:
console.log(formatDuration(45)); // "45s"
console.log(formatDuration(90)); // "1m"
console.log(formatDuration(3600)); // "1h"
console.log(formatDuration(3660)); // "1h 1m"
console.log(formatDuration(86400)); // "1d"
console.log(formatDuration(90000)); // "1d 1h"
console.log(formatDuration(2592000)); // "1mo"
console.log(formatDuration(2678400)); // "1mo 1d"
console.log(formatDuration(31536000)); // "1y"
console.log(formatDuration(31708800)); // "1y 1mo"
