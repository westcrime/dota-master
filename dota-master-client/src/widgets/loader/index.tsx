import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import { SiDota2 } from "react-icons/si";

interface DotaLoaderProps {
  label: string;
}

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const DotaLoader = ({ label }: DotaLoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#fff",
        gap: 3,
      }}
    >
      <Box
        component={SiDota2}
        sx={{
          width: 90,
          height: 90,
          animation: `${pulse} 2s infinite ease-in-out, ${rotate} 10s infinite linear`,
          filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.7))",
          color: "#ffffff",
        }}
      />

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #f0c808, #e74c3c)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "#ffffff",
          animation: `${pulse} 1.5s infinite`,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default DotaLoader;
