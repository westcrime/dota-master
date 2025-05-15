export const formatDuration = (date: Date): string => {
  const hours = date.getHours() - 1;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};