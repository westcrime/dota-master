export const getImpactColor = (impact: number) => {
  if (impact >= 8) {
    return {
      text: "#ffffff",
      bg: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
      border: "#1B5E20",
    };
  } else if (impact >= 5) {
    return {
      text: "#ffffff",
      bg: "linear-gradient(135deg, #8BC34A 0%, #689F38 100%)",
      border: "#558B2F",
    };
  } else if (impact >= 2) {
    return {
      text: "#212121",
      bg: "linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)",
      border: "#F9A825",
    };
  } else if (impact >= 0) {
    return {
      text: "#212121",
      bg: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
      border: "#E65100",
    };
  } else {
    return {
      text: "#ffffff",
      bg: "linear-gradient(135deg, #F44336 0%, #D32F2F 100%)",
      border: "#B71C1C",
    };
  }
};
