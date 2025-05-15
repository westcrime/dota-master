import { CustomCard } from "@src/shared/ui/custom-card";
import {
  CardContent,
  Typography,
  CardHeader,
  Divider,
} from "@mui/material";
import DotaLoader from "@src/widgets/loader";
import { Match } from "../../models/match";
import HeroModel from "@src/shared/models/hero";
import { PickAnalysis } from "../picks-analysis";

interface MatchViewProps {
  data: Match | undefined;
  loading: boolean;
  error: string | undefined;

  heroesData: HeroModel[] | undefined;
  heroesLoading: boolean;
  heroesError: string | undefined;
}

export const MatchView = ({
  data,
  loading,
  error,
  heroesData,
  heroesError,
  heroesLoading,
}: MatchViewProps) => {
  if (loading || !data || heroesLoading || !heroesData) {
    return (
      <DotaLoader label="Анализ матча. Это может занять некоторое время" />
    );
  }

  if (error || heroesError) {
    return (
      <CustomCard>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <CardHeader
        title={
          <Typography variant="h4" fontWeight="bold">
            Анализ матча
          </Typography>
        }
      />
      <Divider sx={{ mb: 2 }} />
      <CardContent>
        <PickAnalysis
          picks={data.picks}
          winratesAnalysis={data.winratesAnalysis}
          heroes={heroesData}
        />
      </CardContent>
    </CustomCard>
  );
};
