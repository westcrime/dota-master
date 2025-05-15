import { CustomCard } from "@src/shared/ui/custom-card";
import HeroPerfomance from "../../models/heroPerfomance";
import { Skeleton, CardContent, Typography, CardHeader, Divider, Box, List } from "@mui/material";
import { PerformancePieChart } from "../pie-chart";
import { HeroStatsItem } from "../hero-stats-item";

interface PerformanceViewProps {
  data: HeroPerfomance[] | undefined;
  loading: boolean;
  error: string | undefined;
}

export const PerformanceView = ({ data, loading, error }: PerformanceViewProps) => {
  if (loading || !data) {
    return (
      <CustomCard>
        <Skeleton variant="rectangular" width="100%" height={256} />
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </CustomCard>
    );
  }

  const pieChartData = data.map((hero) => ({
    name: hero.name,
    value: hero.matchCount,
    impact: hero.impact,
  }));

  return (
    <CustomCard>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Последние 20 матчей
          </Typography>
        }
      />
      <Divider sx={{ mb: 2 }} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={3}>
          <PerformancePieChart data={pieChartData} heroesData={data} />
          <Box sx={{ width: "100%" }}>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {data.map((hero) => (
                <HeroStatsItem key={hero.heroId} hero={hero} />
              ))}
            </List>
          </Box>
        </Box>
      </CardContent>
    </CustomCard>
  );
};