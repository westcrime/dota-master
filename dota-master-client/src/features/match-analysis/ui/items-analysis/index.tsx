import {
  Box,
  Typography,
  Divider,
  Tooltip,
  Avatar,
  Stack,
} from "@mui/material";
import HeroModel from "@src/shared/models/hero";
import AghanimDialog from "@src/shared/ui/aghanim-dialog";
import { ItemPurchase } from "../../models/match";
import { useMemo } from "react";
import Item from "@src/shared/models/item";

interface ItemsAnalysisProps {
  itemPurchases: ItemPurchase[];
  items: Item[];
  itemsAnalysis: string;
  heroes: HeroModel[];
  rank: number;
}

export const ItemsAnalysis = ({
  itemPurchases,
  items,
  heroes,
  itemsAnalysis,
  rank,
}: ItemsAnalysisProps) => {
  const sortedPurchases = useMemo(() => {
    return [...itemPurchases].sort((a, b) => a.time - b.time);
  }, [itemPurchases]);

  const getItemById = (id: number) => {
    return items.find((item) => item.id === id);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Хронология покупки предметов
        </Typography>
        
        <Box
          sx={{
            position: "relative",
            pl: 3,
            "&::before": {
              content: '""',
              position: "absolute",
              left: 24,
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "divider",
            },
          }}
        >
          {sortedPurchases.map((purchase, index) => {
            const item = getItemById(purchase.itemId);
            if (!item) return null;

            return (
              <Box
                key={`${purchase.itemId}-${purchase.time}-${index}`}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: -31,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    border: "2px solid",
                    borderColor: "background.paper",
                  },
                }}
              >
                <Tooltip
                  title={
                    <Box sx={{ p: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.displayName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Цена: {item.cost || "N/A"} золота
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {item.description}
                      </Typography>
                      {item.lore.length > 0 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 1, display: "block", fontStyle: "italic" }}
                        >
                          {item.lore[0]}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ mt: 1, display: "block", fontWeight: "bold" }}
                      >
                        Время покупки: {formatTime(purchase.time)}
                      </Typography>
                    </Box>
                  }
                  arrow
                  placement="right"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                      gap: 2,
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <Avatar
                      src={item.iconUrl}
                      alt={item.displayName}
                      sx={{ width: 48, height: 48, border: "1px solid #333" }}
                    />
                    <Box>
                      <Typography variant="subtitle1">
                        {item.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(purchase.time)}
                      </Typography>
                    </Box>
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "flex-end",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
          }}
        ></Box>

        <Box sx={{ alignSelf: "flex-end" }}>
          <AghanimDialog text={itemsAnalysis} right={false} />
        </Box>
      </Box>
    </Box>
  );
};