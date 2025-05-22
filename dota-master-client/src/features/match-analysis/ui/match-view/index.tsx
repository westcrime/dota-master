import { CustomCard } from "@src/shared/ui/custom-card";
import { CardContent, Typography, CardHeader, Divider } from "@mui/material";
import DotaLoader from "@src/widgets/loader";
import { Match } from "../../models/match";
import HeroModel from "@src/shared/models/hero";
import { PickAnalysis } from "../picks-analysis";
import { LaningAnalysis } from "../lane-analysis";
import { ItemsAnalysis } from "../items-analysis";
import Item from "@src/shared/models/item";
import { GeneralInfoCard } from "../general-info";

interface MatchViewProps {
  data: Match | undefined;
  loading: boolean;
  error: string | undefined;

  heroesData: HeroModel[] | undefined;
  heroesLoading: boolean;
  heroesError: string | undefined;

  itemsData: Item[] | undefined;
  itemsLoading: boolean;
  itemsError: string | undefined;
}

export const MatchView = ({
  data,
  loading,
  error,
  heroesData,
  heroesError,
  heroesLoading,
  itemsData,
  itemsError,
  itemsLoading,
}: MatchViewProps) => {
  if (
    loading ||
    !data ||
    heroesLoading ||
    !heroesData ||
    itemsLoading ||
    !itemsData
  ) {
    return (
      <DotaLoader label="Анализ матча. Это может занять некоторое время" />
    );
  }

  if (error || heroesError || itemsError) {
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
        <LaningAnalysis
          rank={data.generalInfo.rank}
          laning={data.laning}
          laningAnalysis={data.laningAnalysis}
          heroes={heroesData}
        />
        <ItemsAnalysis
          rank={data.generalInfo.rank}
          itemPurchases={data.userStats.itemPurchases}
          items={itemsData}
          itemsAnalysis={data.itemsAnalysis}
          heroes={heroesData}
          matchDuration={data.generalInfo.durationSeconds}
        />
        <GeneralInfoCard
          generalInfo={data.generalInfo}
          rank={data.generalInfo.rank}
          items={itemsData}
          matchId={data.matchId}
          heroes={heroesData}
          durationSeconds={data.generalInfo.durationSeconds}
        />
      </CardContent>
    </CustomCard>
  );
};
