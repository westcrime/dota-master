import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Skeleton,
  Box,
  Avatar,
  CardContent,
  Grid,
  useTheme,
  Paper,
  Divider,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchRecordsRequest } from "../store/fetch-records";

interface StatCardProps {
  iconUrl: string;
  mainText: string;
  secondaryText: string;
  value: number;
  maxValue: number;
}

const StatCard = ({
  iconUrl,
  mainText,
  secondaryText,
  value,
  maxValue,
}: StatCardProps) => {
  const theme = useTheme();
  const progress = (value / maxValue) * 100;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        borderRadius: 2,
        height: "100%",
        background: theme.palette.background.paper,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: theme.palette.background.default,
          }}
        >
          <img
            src={`/records/${iconUrl}`}
            alt={mainText}
            width={32}
            height={32}
          />
        </Avatar>
        <Box flexGrow={1}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {mainText}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {secondaryText}
          </Typography>
          <Box mt={1}>
            <Box
              sx={{
                height: 4,
                bgcolor: theme.palette.background.default,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${progress}%`,
                  bgcolor: theme.palette.primary.main,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const Records = () => {
  const theme = useTheme();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchRecords
  );
  const [elements, setElements] = useState<StatCardProps[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecordsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      // Находим максимальные значения для нормализации прогресс-баров
      const maxValues = {
        kills: Math.max(data.kills, 1000),
        deaths: Math.max(data.deaths, 500),
        assists: Math.max(data.assists, 1000),
        gold: Math.max(data.gold, 100000),
        xp: Math.max(data.xp, 100000),
        lastHits: Math.max(data.lastHits, 5000),
        denies: Math.max(data.denies, 500),
        heroDamage: Math.max(data.heroDamage, 100000),
        towerDamage: Math.max(data.towerDamage, 50000),
        heroHealing: Math.max(data.heroHealing, 50000),
      };

      setElements([
        {
          iconUrl: "killsIcon.png",
          mainText: `Среднее кол-во убийств: ${data.avgKills.toFixed(1)}`,
          secondaryText: `Всего: ${data.kills}`,
          value: data.kills,
          maxValue: maxValues.kills,
        },
        {
          iconUrl: "deathsIcon.png",
          mainText: `Среднее кол-во смертей: ${data.avgDeaths.toFixed(1)}`,
          secondaryText: `Всего: ${data.deaths}`,
          value: data.deaths,
          maxValue: maxValues.deaths,
        },
        {
          iconUrl: "assistsIcon.png",
          mainText: `Среднее кол-во ассистов: ${data.avgAssists.toFixed(1)}`,
          secondaryText: `Всего: ${data.assists}`,
          value: data.assists,
          maxValue: maxValues.assists,
        },
        {
          iconUrl: "goldIcon.png",
          mainText: `GPM: ${data.avgGold.toFixed(0)}`,
          secondaryText: `Всего золота: ${data.gold.toLocaleString()}`,
          value: data.gold,
          maxValue: maxValues.gold,
        },
        {
          iconUrl: "xpIcon.png",
          mainText: `XPM: ${data.avgXp.toFixed(0)}`,
          secondaryText: `Всего опыта: ${data.xp.toLocaleString()}`,
          value: data.xp,
          maxValue: maxValues.xp,
        },
        {
          iconUrl: "lastHitsIcon.png",
          mainText: `Среднее кол-во добиваний: ${data.avgLastHits.toFixed(1)}`,
          secondaryText: `Всего: ${data.lastHits}`,
          value: data.lastHits,
          maxValue: maxValues.lastHits,
        },
        {
          iconUrl: "deniesIcon.png",
          mainText: `Среднее кол-во денаев: ${data.avgDenies.toFixed(1)}`,
          secondaryText: `Всего: ${data.denies}`,
          value: data.denies,
          maxValue: maxValues.denies,
        },
        {
          iconUrl: "heroDamageIcon.png",
          mainText: `Средний урон: ${data.avgHeroDamage.toFixed(0)}`,
          secondaryText: `Всего урона: ${data.heroDamage.toLocaleString()}`,
          value: data.heroDamage,
          maxValue: maxValues.heroDamage,
        },
        {
          iconUrl: "towerDamageIcon.png",
          mainText: `Средний урон по башням: ${data.avgTowerDamage.toFixed(0)}`,
          secondaryText: `Всего: ${data.towerDamage.toLocaleString()}`,
          value: data.towerDamage,
          maxValue: maxValues.towerDamage,
        },
        {
          iconUrl: "heroHealingIcon.png",
          mainText: `Среднее лечение: ${data.avgHeroHealing.toFixed(0)}`,
          secondaryText: `Всего лечения: ${data.heroHealing.toLocaleString()}`,
          value: data.heroHealing,
          maxValue: maxValues.heroHealing,
        },
      ]);
    }
  }, [data]);

  if (loading) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Загрузка статистики...
        </Typography>
        <Grid container spacing={3}>
          {[...Array(6)].map(() => (
            <Grid>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={120}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: theme.shadows[3],
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          color="error.main"
          p={2}
          borderRadius={2}
          bgcolor="rgba(244, 67, 54, 0.1)"
        >
          <ErrorIcon sx={{ mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Ошибка загрузки
            </Typography>
            <Typography variant="body2" mt={0.5}>
              {error || "Не удалось загрузить данные статистики"}
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: theme.shadows[3],
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3} color="text.primary">
          📊 Общая Статистика
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {elements.map((item) => (
            <Grid>
              <StatCard {...item} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Records };
