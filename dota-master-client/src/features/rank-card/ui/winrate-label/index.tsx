import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface WinrateLabelProps {
  winRate: number;
}

const WinrateLabel = ({ winRate }: WinrateLabelProps) => {
  return (
    <Typography
      variant="h6"
      sx={{
        color: winRate >= 50 ? "#4caf50" : "#f44336",
        fontWeight: "bold",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {winRate >= 50 ? (
        <TrendingUp fontSize="medium" sx={{ color: "inherit" }} />
      ) : (
        <TrendingDown fontSize="medium" sx={{ color: "inherit" }} />
      )}
      {winRate.toFixed(2)}%
      <Typography
        component="span"
        variant="h6"
        sx={{ color: "text.primary", ml: 0 }}
      >
        Процент побед
      </Typography>
    </Typography>
  );
};

export default WinrateLabel;
