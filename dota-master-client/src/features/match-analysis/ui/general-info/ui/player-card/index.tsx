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
  useTheme,
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
const GPM_ICON = "/records/goldIcon.png";
const XPM_ICON = "/records/xpIcon.png";

const StatItem = ({ icon, label, value }: StatItemProps) => (
  <Grid>
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        component="img"
        src={icon}
        alt={label}
        sx={{ width: 20, height: 20, opacity: 0.8 }}
      />
      <Typography variant="body2">
        {label}: <b>{value}</b>
      </Typography>
    </Stack>
  </Grid>
);

export const PlayerCard = ({
  player,
  hero,
  items,
  side,
}: {
  player: PlayerStats;
  hero?: HeroModel;
  items: Item[];
  side: "radiant" | "dire";
}) => {
  const [showStats, setShowStats] = useState(false);
  const theme = useTheme();

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
    side === "radiant"
      ? theme.palette.success.light + "22"
      : theme.palette.error.light + "22";

  const cardBaseStyles = {
    backgroundColor: teamBgColor,
    borderRadius: 3,
    p: 2,
    boxShadow: theme.shadows[2],
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[4],
    },
  };

  return (
    <Card sx={cardBaseStyles} onClick={!showStats ? toggleStats : undefined}>
      {showStats ? (
        <>
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

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <StatItem
              icon="/records/killsIcon.png"
              label="KDA"
              value={`${player.kills}/${player.deaths}/${player.assists}`}
            />
            <StatItem
              icon="/records/goldIcon.png"
              label="Нетворс"
              value={player.networth}
            />
            <StatItem
              icon="/records/heroDamageIcon.png"
              label="GPM"
              value={player.goldPerMinute}
            />
            <StatItem
              icon="/records/xpIcon.png"
              label="XPM"
              value={player.experiencePerMinute}
            />
            <StatItem
              icon="/records/lastHitsIcon.png"
              label="Добито крипов"
              value={player.numLastHits}
            />
            <StatItem
              icon="/records/deniesIcon.png"
              label="Не отдано крипов"
              value={player.numDenies}
            />
            <StatItem
              icon="/records/killsIcon.png"
              label="Импакт"
              value={player.imp}
            />
          </Box>
        </>
      ) : (
        <Stack direction="row" spacing={2} alignItems="center">
          <Box position="relative">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                border: "2px solid",
                borderColor: theme.palette.divider,
                boxShadow: 2,
              }}
              src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero?.name.replace(
                "npc_dota_hero_",
                ""
              )}.png`}
              alt={hero.displayName}
            />
            <Box
              position="absolute"
              top={-6}
              right={-6}
              px={1}
              py={0.3}
              borderRadius={6}
              bgcolor={player.imp >= 0 ? "success.main" : "error.main"}
              boxShadow={1}
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
              mb={0.5}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {hero.displayName}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: theme.palette.text.primary }}
              >
                {player.kills}/{player.deaths}/{player.assists}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box
                  component="img"
                  src={GPM_ICON}
                  alt="GPM"
                  sx={{ width: 16, height: 16, opacity: 0.8 }}
                />
                <Typography variant="caption" color="gold">
                  GPM {player.goldPerMinute}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <Box
                  component="img"
                  src={XPM_ICON}
                  alt="XPM"
                  sx={{ width: 16, height: 16, opacity: 0.8 }}
                />
                <Typography variant="caption" color="#89cdfa">
                  XPM {player.experiencePerMinute}
                </Typography>
              </Stack>
            </Stack>

            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 36px)"
              gap={0.5}
              mt={1}
            >
              {playerItems.map(
                (item, index) =>
                  item && (
                    <Box key={index}>
                      <ItemAvatar item={items.find((i) => i.id === item)} />
                    </Box>
                  )
              )}
            </Box>
          </Box>

          <Tooltip title="Подробная статистика">
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Card>
  );
};
