import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import HeroModel from "@src/shared/models/hero";
import AghanimDialog from "@src/shared/ui/aghanim-dialog";
import { Laning } from "../../models/match";
import { StatsTable } from "./ui/stats-table";
import { Versus } from "./ui/versus";

interface LaningAnalysisProps {
  laning: Laning;
  laningAnalysis: string;
  heroes: HeroModel[];
  rank: number;
}

export const LaningAnalysis = ({
  laning,
  heroes,
  laningAnalysis,
  rank,
}: LaningAnalysisProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 3,
        mt: 10,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Анализ лайнинга
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "flex-end",
          gap: 3,
        }}
      >
        <Box sx={{ alignSelf: "flex-end" }}>
          <AghanimDialog text={laningAnalysis} right={false} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
          }}
        >
          <Versus laning={laning} rank={rank} heroes={heroes} />
          <StatsTable laning={laning} rank={rank} />
        </Box>
      </Box>
    </Box>
  );
};
