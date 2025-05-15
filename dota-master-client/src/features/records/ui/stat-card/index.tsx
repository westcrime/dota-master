import { Paper, Box, Avatar, Typography, useTheme } from "@mui/material";

export interface StatCardProps {
  iconUrl: string;
  mainText: string;
  secondaryText: string;
  value: number;
  maxValue: number;
}

const StatCard = ({ iconUrl, mainText, secondaryText }: StatCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        borderRadius: 2,
        height: "100%",
        background: theme.palette.background.paper,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: theme.palette.background.default,
          }}
        >
          <img
            src={`/records/${iconUrl}`}
            alt={mainText}
            width={32}
            height={32}
          />
        </Avatar>
        <Box flexGrow={1}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {mainText}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {secondaryText}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default StatCard;
