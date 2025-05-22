import { Box, Typography, Divider } from "@mui/material";
import HeroModel from "@src/shared/models/hero";
import AghanimDialog from "@src/shared/ui/aghanim-dialog";
import { ItemPurchase } from "../../models/match";
import { ChronologyLine } from "./ui/chronology-line";
import Item from "@src/shared/models/item";

interface ItemsAnalysisProps {
  itemPurchases: ItemPurchase[];
  items: Item[];
  itemsAnalysis: string;
  heroes: HeroModel[];
  rank: number;
  matchDuration: number;
}

export const ItemsAnalysis = ({
  itemPurchases,
  items,
  itemsAnalysis,
  matchDuration,
}: ItemsAnalysisProps) => {
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
        Анализ сборки предметов
      </Typography>
      <Divider sx={{ mb: 8 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "flex-end",
          gap: 3,
        }}
      >
        <Box sx={{ width: "50%", height: "1300px" }}>
          <ChronologyLine
            itemPurchases={itemPurchases}
            items={items}
            gameDuration={matchDuration}
          />
        </Box>
        <Box sx={{ width: "50%", alignSelf: "flex-end", transform: "translateY(-50%)" }}>
          <AghanimDialog text={itemsAnalysis} right={true} />
        </Box>
      </Box>
    </Box>
  );
};
