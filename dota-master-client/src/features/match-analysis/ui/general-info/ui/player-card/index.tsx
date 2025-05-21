import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { PlayerStats } from "@src/features/match-analysis/models/match";
import HeroModel from "@src/shared/models/hero";
import Item from "@src/shared/models/item";
import { useState } from "react";
import { ItemAvatar } from "../item-avatar";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface StatItemProps {
  icon: string;
  label: string;
  value: string | number;
}

const StatItem = ({ icon, label, value }: StatItemProps) => (
  <Grid>
    <Box
      component="img"
      src={icon}
      alt={label}
      sx={{ width: 20, height: 20 }}
    />
    <Typography variant="body2">
      {label}:{" "}
      <Typography component="span" fontWeight="bold">
        {value}
      </Typography>
    </Typography>
  </Grid>
);

export const PlayerCard = ({
  player,
  hero,
  side,
  items,
}: {
  player: PlayerStats;
  hero?: HeroModel;
  items: Item[];
  side: "radiant" | "dire";
}) => {
  const [showStats, setShowStats] = useState(false);

  const playerItems = [
    player.item0Id,
    player.item1Id,
    player.item2Id,
    player.item3Id,
    player.item4Id,
    player.item5Id,
  ].filter(Boolean);

  const toggleStats = () => setShowStats(!showStats);

  if (!hero) return null;

  const teamBgColor =
    side === "radiant" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)";

  if (showStats) {
    return (
      <Card
        sx={{
          backgroundColor: teamBgColor,
          borderRadius: 2,
          p: 2,
          position: "relative",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            {hero.displayName}
          </Typography>
          <IconButton
            onClick={toggleStats}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1, borderColor: "divider" }} />

        <Grid container spacing={2}>
          <StatItem
            icon="/records/killsIcon.png"
            label="KDA"
            value={`${player.kills}/${player.deaths}/${player.assists}`}
          />
          <StatItem
            icon="/records/goldIcon.png"
            label="Общая ценность"
            value={player.networth}
          />
          <StatItem
            icon="/records/heroDamageIcon.png"
            label="Золото в минуту"
            value={player.goldPerMinute}
          />
          <StatItem
            icon="/records/xpIcon.png"
            label="Опыт в минуту"
            value={player.experiencePerMinute}
          />
          <StatItem
            icon="/records/lastHitsIcon.png"
            label="Добитые крипы"
            value={player.numLastHits}
          />
          <StatItem
            icon="/records/deniesIcon.png"
            label="Неотданные крипы"
            value={player.numDenies}
          />
          <StatItem
            icon="/records/killsIcon.png"
            label="Перфоманс"
            value={player.imp}
          />
        </Grid>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        backgroundColor: teamBgColor,
        borderRadius: 2,
        p: 2,
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 2,
        },
      }}
      onClick={toggleStats}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box position="relative">
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero?.name.replace(
              "npc_dota_hero_",
              ""
            )}.png`}
            alt={hero.displayName}
          />
          <Box
            position="absolute"
            top={-8}
            right={-8}
            px={1}
            py={0.5}
            borderRadius={4}
            bgcolor={player.imp >= 0 ? "success.main" : "error.main"}
          >
            <Typography variant="caption" color="common.white">
              {player.imp > 0 ? "+" : ""}
              {player.imp}
            </Typography>
          </Box>
        </Box>

        <Box flex={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              {hero.displayName}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {player.kills}/{player.deaths}/{player.assists}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={0.5}>
            <Typography variant="caption" color="gold">
              GPM: {player.goldPerMinute}
            </Typography>
            <Typography variant="caption" color="primary.main">
              XPM: {player.experiencePerMinute}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5} mt={1.5}>
            {playerItems.map(
              (item, index) =>
                item && (
                  <ItemAvatar
                    key={index}
                    item={items.find((i) => item === i.id)}
                    size={30}
                  />
                )
            )}
          </Stack>
        </Box>

        <Tooltip title="Подробная статистика">
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
};
