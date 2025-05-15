import { Box, Typography, Avatar, Divider, Zoom } from "@mui/material";
import { Picks } from "../../models/match";
import HeroModel from "@src/shared/models/hero";
import { styled } from "@mui/material/styles";
import AghanimDialog from "@src/shared/ui/aghanim-dialog";

interface PickAnalysisProps {
  picks: Picks;
  winratesAnalysis: string;
  heroes: HeroModel[];
}

const getHero = (id: number, heroes: HeroModel[]) => {
  return heroes.find((h) => h.id === id);
};

const HeroBadge = styled(Box)(() => ({
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

const WinrateIndicator = styled(Typography)(
  ({ positive }: { positive: boolean }) => ({
    fontWeight: 600,
    fontSize: "0.75rem",
    marginTop: 4,
    background: positive ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)",
    padding: "2px 6px",
    borderRadius: 12,
    color: positive ? "#4caf50" : "#f44336",
  })
);

export const PickAnalysis = ({
  picks,
  heroes,
  winratesAnalysis,
}: PickAnalysisProps) => {
  const mainHero = getHero(picks.heroId, heroes);

  const renderHeroWrList = (
    list: typeof picks.heroWrWithAlliedHeroes,
    color: string
  ) => (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: 4,
        }}
      >
        {list.map((entry) => {
          const hero = getHero(entry.heroId, heroes);
          const wr = (entry.winrate * 100).toFixed(2);
          const isPositive = entry.winrate >= 0.5;

          return (
            <Zoom in key={entry.heroId}>
              <HeroBadge>
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
                  {hero?.displayName || "Unknown"}
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
                <WinrateIndicator positive={isPositive}>{wr}%</WinrateIndicator>
              </HeroBadge>
            </Zoom>
          );
        })}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-end", // выравнивание по низу
        gap: 3,
      }}
    >
      {/* Левый блок с анализом героя */}
      <Box sx={{ flex: 1 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6" fontWeight="bold">
            Ты выбрал героя:
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${mainHero?.name.replace("npc_dota_hero_", "")}.png`}
              sx={{
                width: 64,
                height: 64,
                border: "2px solid #555",
                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {mainHero?.displayName || "Герой"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Общий винрейт:&nbsp;
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color:
                      picks.heroWinrate >= 0.55
                        ? "#66bb6a"
                        : picks.heroWinrate >= 0.5
                          ? "#ffa726"
                          : "#ef5350",
                    fontSize: "1rem",
                  }}
                >
                  {picks.heroWinrate >= 0
                    ? `${(picks.heroWinrate * 100).toFixed(1)}%`
                    : "N/A"}
                </Box>
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" fontWeight="bold">
            {`Процент побед ${mainHero?.displayName} в команде с этими героями`}
          </Typography>

          {renderHeroWrList(picks.heroWrWithAlliedHeroes, "#4caf50")}
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" fontWeight="bold">
            {`Процент побед ${mainHero?.displayName} против этих героев`}
          </Typography>
          {renderHeroWrList(picks.heroWrWithEnemyHeroes, "#f44336")}
        </Box>
      </Box>

      {/* Диалог внизу справа, но визуально ниже левого блока */}
      <Box sx={{ alignSelf: "flex-end" }}>
        <AghanimDialog text={winratesAnalysis} />
      </Box>
    </Box>
  );
};
