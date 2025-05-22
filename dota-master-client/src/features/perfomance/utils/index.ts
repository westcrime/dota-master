export const getImpactColor = (impact: number) => {
  if (impact >= 8)
    return { text: "#4caf50", bg: "rgba(76, 175, 80, 0.1)", border: "#4caf50" };
  if (impact >= 5)
    return { text: "#ffc107", bg: "rgba(255, 193, 7, 0.1)", border: "#ffc107" };
  if (impact >= 2)
    return { text: "#ff9800", bg: "rgba(255, 152, 0, 0.1)", border: "#ff9800" };
  return { text: "#f44336", bg: "rgba(244, 67, 54, 0.1)", border: "#f44336" };
};
