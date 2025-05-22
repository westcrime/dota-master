import { GeneralInfo } from "../../models/match";
import Item from "@src/shared/models/item";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Legend,
  Line,
} from "recharts";
import HeroModel from "@src/shared/models/hero";
import { PlayerCard } from "./ui/player-card";
import {
  Paper,
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  useTheme,
} from "@mui/material";

interface GeneralInfoCardProps {
  generalInfo: GeneralInfo;
  durationSeconds: number;
  rank: number;
  heroes: HeroModel[];
  items: Item[];
  matchId: number;
}

const getHero = (id: number, heroes: HeroModel[]) => {
  return heroes.find((h) => h.id === id);
};
export const GeneralInfoCard = ({
  generalInfo,
  durationSeconds,
  rank,
  heroes,
  items,
  matchId,
}: GeneralInfoCardProps) => {
  const theme = useTheme();
  const [showGold, setShowGold] = useState(true);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const radiantPlayers = generalInfo.players.filter((p) => p.isRadiant);
  const direPlayers = generalInfo.players.filter((p) => !p.isRadiant);

  const graphData = generalInfo.radiantNetworthLeads.map(
    (goldValue, index) => ({
      time: index,
      gold: goldValue,
      experience: generalInfo.radiantExperienceLeads[index],
    })
  );

  const radiantTotalKills = radiantPlayers.reduce(
    (sum, player) => sum + player.kills,
    0
  );
  const direTotalKills = direPlayers.reduce(
    (sum, player) => sum + player.kills,
    0
  );

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TeamInfo
          teamName="Свет"
          isWinner={generalInfo.didRadiantWin}
          theme={theme}
          isRadiant
        />

        <MatchScore
          radiantKills={radiantTotalKills}
          direKills={direTotalKills}
          duration={formatTime(durationSeconds)}
          theme={theme}
        />

        <TeamInfo
          teamName="Тьма"
          isWinner={!generalInfo.didRadiantWin}
          theme={theme}
        />
      </Box>
      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        <Grid container>
          {/* Radiant Players */}
          <Grid sx={{ width: "30%" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.palette.success.main }}
            >
              Команда Света
            </Typography>
            <Stack spacing={2}>
              {radiantPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  items={items}
                  player={player}
                  hero={getHero(player.heroId, heroes)}
                  side="radiant"
                />
              ))}
            </Stack>
          </Grid>

          {/* Graph */}
          <Grid sx={{ width: "40%" }}>
            <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6">Прогресс матча</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowGold(!showGold)}
                  sx={{ textTransform: "none" }}
                >
                  {showGold ? "Показать Опыт" : "Показать Золото"}
                </Button>
              </Box>

              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme.palette.divider}
                    />
                    <XAxis
                      dataKey="time"
                      stroke={theme.palette.text.secondary}
                      tickFormatter={(value) =>
                        `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`
                      }
                    />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <ReferenceLine
                      y={0}
                      stroke={theme.palette.divider}
                      strokeDasharray="3 3"
                    />
                    <Legend />
                    {showGold ? (
                      <Line
                        type="monotone"
                        dataKey="gold"
                        stroke={theme.palette.warning.main}
                        dot={false}
                        strokeWidth={2}
                        name="Преимущество в золоте"
                      />
                    ) : (
                      <Line
                        type="monotone"
                        dataKey="experience"
                        stroke={theme.palette.info.main}
                        dot={false}
                        strokeWidth={2}
                        name="Преимущество в опыте"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Dire Players */}
          <Grid sx={{ width: "30%" }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.palette.error.main }}
            >
              Команда Тьмы
            </Typography>
            <Stack spacing={2}>
              {direPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  items={items}
                  player={player}
                  hero={getHero(player.heroId, heroes)}
                  side="dire"
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Match ID: {matchId}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Средний ранг:
          </Typography>
          <Box
            component="img"
            src={`/ranks/${rank}.webp`}
            alt="rank"
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

const TeamInfo = ({ teamName, isWinner, theme, isRadiant = false }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: isRadiant
          ? theme.palette.success.main
          : theme.palette.error.main,
      }}
    />
    <Box>
      <Typography variant="h6">{teamName}</Typography>
      <Typography
        variant="body2"
        color={isWinner ? "success.main" : "error.main"}
      >
        {isWinner ? "Победа" : "Поражение"}
      </Typography>
    </Box>
  </Box>
);

const MatchScore = ({ radiantKills, direKills, duration, theme }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 3,
      px: 4,
      py: 1,
      borderRadius: 2,
      backgroundColor: theme.palette.background.default,
    }}
  >
    <Typography variant="h4" color="success.main">
      {radiantKills}
    </Typography>
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        {duration}
      </Typography>
      <Typography variant="caption">Длительность</Typography>
    </Box>
    <Typography variant="h4" color="error.main">
      {direKills}
    </Typography>
  </Box>
);
