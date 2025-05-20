import { Box, Typography } from "@mui/material";
import { ItemPurchase } from "@src/features/match-analysis/models/match";
import Item from "@src/shared/models/item";
import { ItemAvatar } from "../item-avatar";
import { useMemo } from "react";

interface ChronologyLineProps {
  itemPurchases: ItemPurchase[];
  items: Item[];
  gameDuration: number;
}

const formatTime = (seconds: number) => {
  if (seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export const ChronologyLine = ({
  itemPurchases,
  items,
  gameDuration,
}: ChronologyLineProps) => {
  const GROUP_THRESHOLD = 0.02;

  const groupedPurchases = useMemo(() => {
    if (itemPurchases.length === 0) return [];

    const sorted = [...itemPurchases].sort((a, b) => a.time - b.time);
    const groups: ItemPurchase[][] = [];
    let currentGroup: ItemPurchase[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const prevPos = sorted[i - 1].time / gameDuration;
      const currentPos = sorted[i].time / gameDuration;

      if (currentPos - prevPos < GROUP_THRESHOLD) {
        currentGroup.push(sorted[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [sorted[i]];
      }
    }

    groups.push(currentGroup);
    return groups;
  }, [itemPurchases, gameDuration]);

  const timeMarkers = useMemo(() => {
    const markers = [];
    const fiveMinutes = 300;
    let currentTime = 0;

    while (currentTime <= gameDuration) {
      markers.push({
        time: currentTime,
        label: formatTime(currentTime),
      });
      currentTime += fiveMinutes;
    }
    return markers;
  }, [gameDuration]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "1200px",
        width: "100%",
      }}
    >
      {/* Основная временная линия */}
      <Box
        sx={{
          position: "absolute",
          left: 128,
          top: 0,
          bottom: 0,
          width: "4px",
          backgroundColor: "grey.400",
        }}
      />

      {/* Временные отметки */}
      {timeMarkers.map((marker) => {
        const positionPercentage = ((marker.time) / gameDuration) * 100;

        return (
          <Box
            key={`marker-${marker.time}`}
            sx={{
              position: "absolute",
              left: 0,
              top: `${positionPercentage}%`,
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "1rem",
                mr: 1,
              }}
            >
              {marker.label}
            </Typography>
            <Box
              sx={{
                width: "18px",
                height: "3px",
                backgroundColor: "grey.400",
              }}
            />
          </Box>
        );
      })}

      {/* Группы предметов */}
      {groupedPurchases.map((group, groupIndex) => {
        const firstItem = group[0];
        const positionPercentage =
          ((Math.max(firstItem.time, 0)) / gameDuration) * 100;

        return (
          <Box
            key={`group-${groupIndex}`}
            sx={{
              position: "absolute",
              left: 128,
              top: `${positionPercentage}%`,
              transform:
                group.length > 1 ? "translateY(-50%)" : "translate(-50%, -50%)",
              display: "flex",
              flexDirection: group.length > 1 ? "row" : "column",
              alignItems: "center",
              zIndex: groupIndex,
            }}
          >
            {group.map((ip, itemIndex) => {
              const item = items.find((i) => ip.itemId === i.id);
              if (!item) return null;

              return (
                <Box
                  key={`${ip.itemId}-${ip.time}`}
                  sx={{
                    m: 1.5,
                    position: "relative",
                  }}
                >
                  <ItemAvatar
                    item={item}
                    left={0}
                    top="0"
                    size={64}
                    zIndex={itemIndex}
                    time={formatTime(ip.time)}
                  />
                  {group.length === 1 && (
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "200%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                        mt: 0.5,
                        fontSize: "0.75rem",
                        color: "text.secondary",
                      }}
                    >
                      {formatTime(ip.time)}
                    </Typography>
                  )}
                </Box>
              );
            })}

            {group.length > 1 && (
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "200%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  mt: 0.5,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                {formatTime(firstItem.time)}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
