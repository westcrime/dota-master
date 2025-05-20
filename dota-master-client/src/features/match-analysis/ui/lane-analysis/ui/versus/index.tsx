import { Box, Typography, Avatar, Paper, Stack, styled } from "@mui/material";
import { Laning } from "@src/features/match-analysis/models/match";
import HeroModel from "@src/shared/models/hero";

interface VersusProps {
  laning: Laning;
  rank: number;
  heroes: HeroModel[];
}

const HeroBadgeContainer = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 60,
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    "& .MuiAvatar-root": {
      boxShadow: "0 0 15px currentColor",
    },
  },
}));

interface HeroBadgeProps {
  hero?: HeroModel;
  color: string;
  isPlayersHero: boolean;
}

const HeroBadge = ({ hero, color, isPlayersHero }: HeroBadgeProps) => {
  return (
    <HeroBadgeContainer>
      <Typography
        variant="caption"
        fontWeight="bold"
        sx={{
          mb: 0.5,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={hero?.displayName}
      >
        {`${hero?.displayName || "Unknown"}${isPlayersHero ? " (Вы)" : ""}`}
      </Typography>

      <Avatar
        src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero?.name.replace(
          "npc_dota_hero_",
          ""
        )}.png`}
        sx={{
          width: 64,
          height: 64,
          border: `2px solid ${color}`,
          color: color,
          transition: "all 0.3s ease",
        }}
      />
    </HeroBadgeContainer>
  );
};

const getHero = (id: number, heroes: HeroModel[]) => {
  return heroes.find((h) => h.id === id);
};

export const Versus = ({ laning, rank, heroes }: VersusProps) => {
  console.log(laning);
  const mainHero = getHero(laning.heroId, heroes);
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Противостояние на линии
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Союзные герои */}
        <Stack spacing={0.5} sx={{ width: "40%" }}>
          <Typography variant="h6" color="primary.main" textAlign="center">
            Ваша команда
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
            <HeroBadge hero={mainHero} color="#4caf50" isPlayersHero={true} />

            {laning.laneAlliesHeroIds.map((heroId) => (
              <HeroBadge
                hero={getHero(heroId, heroes)}
                color="#4caf50"
                isPlayersHero={false}
              />
            ))}
          </Box>
        </Stack>

        {/* Центральная информация */}
        <Box
          sx={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            VS
          </Typography>
          <div className="flex flex-row justify-center items-center">
            <Typography variant="caption">Ранг:</Typography>
            <Avatar
              src={`/ranks/${rank}.webp`}
              sx={{
                width: 30,
                height: 30,
                ml: 1,
              }}
            />
          </div>
        </Box>

        {/* Вражеские герои */}
        <Stack spacing={2} sx={{ width: "40%" }}>
          <Typography variant="h6" color="error.main" textAlign="center">
            Противники
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
            {laning.laneEnemiesHeroIds.map((heroId) => (
              <HeroBadge
                hero={getHero(heroId, heroes)}
                color="#f44336"
                isPlayersHero={false}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};
