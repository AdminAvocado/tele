export function timeAgo(createdAt: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? "s" : ""} antes`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? "s" : ""} antes`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hora${hours !== 1 ? "s" : ""} antes`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} dia${days !== 1 ? "s" : ""} antes`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} mes${months !== 1 ? "es" : ""} antes`;
  }

  const years = Math.floor(months / 12);
  return `${years} año${years !== 1 ? "s" : ""} antes`;
}

// Example usage
const createdAt = new Date(new Date().getTime() - 90 * 1000); // 90 seconds ago
console.log(timeAgo(createdAt)); // Output: "1 minuto antes"
