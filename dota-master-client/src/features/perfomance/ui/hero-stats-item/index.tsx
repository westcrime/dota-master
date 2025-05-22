import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { getImpactColor } from "./../../utils";
import Grid from "@mui/material/Grid";

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
  const { text, bg, border } = getImpactColor(hero.impact);

  return (
    <ListItem
      sx={{
        bgcolor: "grey.950",
        borderRadius: 3,
        px: 2,
        py: 2,
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 6,
          bgcolor: "grey.900",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero.name.replace("npc_dota_hero_", "")}.png`}
          alt={hero.name}
          sx={{ width: 64, height: 64, mr: 3 }}
        />
      </ListItemAvatar>

      <Grid container spacing={1} alignItems="center">
        {/* Top Row: Name + Impact */}
        <Grid>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.primary"
            sx={{ textTransform: "capitalize" }}
          >
            {hero.name
              .replace("npc_dota_hero_", "")
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Typography>
        </Grid>

        <Grid
          sx={{ textAlign: { xs: "left", sm: "right" } }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              bgcolor: bg,
              border: `1px solid ${border}`,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color={text}
              mr={1}
            >
              Вклад:
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" color={text}>
              {hero.impact.toFixed(1)}
            </Typography>
          </Box>
        </Grid>

        {/* Match W/L */}
        <Grid>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <StatItem
              label="Победы"
              value={hero.winCount}
              color="success.main"
            />
            <StatItem
              label="Поражения"
              value={hero.matchCount - hero.winCount}
              color="error.main"
            />
          </Box>
        </Grid>

        {/* KDA */}
        <Grid>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography color="success.main" variant="body2">
              {hero.avgKills.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              /
            </Typography>
            <Typography color="error.main" variant="body2">
              {hero.avgDeaths.toFixed(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              /
            </Typography>
            <Typography color="warning.main" variant="body2">
              {hero.avgAssists.toFixed(1)}
            </Typography>
            <Typography variant="caption" color="text.secondary" ml={1}>
              (K/D/A)
            </Typography>
          </Box>
        </Grid>

        {/* GPM / XPM */}
        <Grid>
          <Box sx={{ display: "flex", gap: 3 }}>
            <StatItem label="GPM" value={hero.avgGpm} color="#f1c40f" />
            <StatItem label="XPM" value={hero.avgXpm} color="#8a82fa" />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
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
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {label}:
    </Typography>
    <Typography
      variant="body2"
      fontWeight="medium"
      sx={color ? { color } : undefined}
    >
      {value}
    </Typography>
  </Box>
);
