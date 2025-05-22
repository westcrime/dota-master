import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { getImpactColor } from "./../../utils";

interface HeroStatsItemProps {
  hero: {
    heroId: number;
    name: string;
    matchCount: number;
    winCount: number;
    avgKills: number;
    avgDeaths: number;
    avgAssists: number;
    avgGpm: number;
    avgXpm: number;
    impact: number;
  };
}

export const HeroStatsItem = ({ hero }: HeroStatsItemProps) => {
  return (
    <ListItem
      sx={{
        bgcolor: "black",
        borderRadius: 2,
        p: 1,
        px: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 1,
          bgcolor: "grey.900",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero.name.replace("npc_dota_hero_", "")}.png`}
          alt={hero.name}
          sx={{ width: 56, height: 56, mr: 2 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
            sx={{ mb: 0.5 }}
          >
            {hero.name
              .replace("npc_dota_hero_", "")
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Typography>
        }
        secondary={<HeroStatsDetails hero={hero} />}
      />
    </ListItem>
  );
};

const HeroStatsDetails = ({ hero }: { hero: HeroStatsItemProps["hero"] }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          Статистика
        </Typography>
        <StatItem label="" value={hero.winCount} color="success.main" />
        <Typography variant="body2" color="text.secondary">
          -
        </Typography>
        <StatItem
          label=""
          value={hero.matchCount - hero.winCount}
          color="error.main"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <StatValue value={hero.avgKills.toFixed(0)} color="success.main" />
          <Typography variant="body2" color="text.secondary">
            /
          </Typography>
          <StatValue value={hero.avgDeaths.toFixed(0)} color="error.main" />
          <Typography variant="body2" color="text.secondary">
            /
          </Typography>
          <StatValue value={hero.avgAssists.toFixed(0)} color="warning.main" />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Средний KDA
        </Typography>
      </Box>
      <HeroAdditionalStats hero={hero} />
    </Box>
  );
};

const HeroAdditionalStats = ({
  hero,
}: {
  hero: HeroStatsItemProps["hero"];
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mt: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <StatItem label="Средний GPM:" value={hero.avgGpm} color="yellow" />
        <StatItem label="Средний XPM:" value={hero.avgXpm} color="#8a82fa" />
      </Box>
      <ImpactBadge impact={hero.impact} />
    </Box>
  );
};

const ImpactBadge = ({ impact }: { impact: number }) => {
  const { text, bg, border } = getImpactColor(impact);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        ml: 2,
        px: 2,
        py: 1,
        borderRadius: 1,
        bgcolor: bg,
        border: `1px solid ${border}`,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: text }}>
        Impact:
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: text }}>
        {impact.toFixed(1)}
      </Typography>
    </Box>
  );
};

const StatItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Typography
      variant="body2"
      sx={color ? { color } : { color: "text.secondary" }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      component="span"
      sx={color ? { color } : undefined}
    >
      {value}
    </Typography>
  </Box>
);

const StatValue = ({ value, color }: { value: string; color: string }) => (
  <Typography variant="body2" color={color} fontWeight="medium">
    {value}
  </Typography>
);
