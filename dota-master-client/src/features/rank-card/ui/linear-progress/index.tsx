import { Box, LinearProgress } from "@mui/material";

interface WinrateLinearProgressProps {
  winRate: number;
}

const WinrateLinearProgress = ({
  winRate,
}: WinrateLinearProgressProps) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={winRate}
        sx={{
          height: 10,
          borderRadius: 0.5,
          backgroundColor: "rgba(211, 47, 47)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#4caf50",
            borderRadius: 0.5,
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          height: "100%",
          width: "1.5px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          transform: "translateX(-50%)",
        }}
      />
    </Box>
  );
};

export default WinrateLinearProgress;
