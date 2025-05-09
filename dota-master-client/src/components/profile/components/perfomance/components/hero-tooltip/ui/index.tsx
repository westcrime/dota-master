import { Box, Avatar, Typography } from "@mui/material";
import HeroPerfomance from "../../../models/heroPerfomance";
import { TooltipProps } from "recharts";


interface HeroTooltipProps extends TooltipProps<number, string> {
    recentHeroesStats: HeroPerfomance[];
  }
  
const HeroTooltip: React.FC<HeroTooltipProps> = ({
  active,
  payload,
  recentHeroesStats,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const heroName = data.name
      .replace("npc_dota_hero_", "")
      .split("_")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const hero = recentHeroesStats.find((hero) => hero.name === data.name);
    const impact = hero?.impact || 0;
    const impactColor = impact >= 0 ? "success.main" : "error.main";
    const heroIconName = data.name.replace("npc_dota_hero_", "");

    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 250,
          display: "flex",
          gap: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          src={`${import.meta.env.VITE_PUBLIC_HERO_ICONS_DOMAIN}/${heroIconName}_icon.png`}
          alt={heroName}
          sx={{
            width: 56,
            height: 56,
            border: "2px solid",
            borderColor: impact >= 0 ? "success.main" : "error.main",
          }}
        />

        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.primary"
            sx={{ mb: 0.5 }}
          >
            {heroName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              Матчи:{" "}
              <strong style={{ color: "text.primary" }}>{data.value}</strong>
            </Typography>
            <Typography
              variant="body2"
              fontWeight="medium"
              color={impactColor}
              sx={{
                px: 1,
                py: 0.5,
                bgcolor:
                  impact >= 0
                    ? "rgba(56, 142, 60, 0.2)"
                    : "rgba(211, 47, 47, 0.2)",
                borderRadius: 1,
              }}
            >
              Вклад: {impact.toFixed(2)}
            </Typography>
          </Box>

          {hero && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Процент побед
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    hero.winCount / hero.matchCount >= 0.5
                      ? "success.main"
                      : "error.main"
                  }
                  fontWeight="bold"
                >
                  {((hero.winCount / hero.matchCount) * 100).toFixed(1)}%
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  KDA
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {hero.avgKills.toFixed(1)} / {hero.avgDeaths.toFixed(1)} /{" "}
                  {hero.avgAssists.toFixed(1)}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
  return null;
};

export { HeroTooltip };
