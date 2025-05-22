import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { useEffect, useState } from "react";
import {
  Typography,
  Skeleton,
  Box,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchRecordsRequest } from "../store/fetch-records";
import { CustomCard } from "@src/shared/ui/custom-card";
import StatCard, { StatCardProps } from "./stat-card";


const Records = () => {
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
          mainText: `Среднее кол-во убийств: ${data.avgKills.toFixed(0)}`,
          secondaryText: `Всего: ${data.kills}`,
          value: data.kills,
          maxValue: maxValues.kills,
        },
        {
          iconUrl: "deathsIcon.png",
          mainText: `Среднее кол-во смертей: ${data.avgDeaths.toFixed(0)}`,
          secondaryText: `Всего: ${data.deaths}`,
          value: data.deaths,
          maxValue: maxValues.deaths,
        },
        {
          iconUrl: "assistsIcon.png",
          mainText: `Среднее кол-во ассистов: ${data.avgAssists.toFixed(0)}`,
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
          mainText: `Среднее кол-во добиваний: ${data.avgLastHits.toFixed(0)}`,
          secondaryText: `Всего: ${data.lastHits}`,
          value: data.lastHits,
          maxValue: maxValues.lastHits,
        },
        {
          iconUrl: "deniesIcon.png",
          mainText: `Среднее кол-во денаев: ${data.avgDenies.toFixed(0)}`,
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

  if (loading || !data) {
    return (
      <CustomCard>
        <Skeleton variant="rectangular" width="100%" height={256} />
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard>
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
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={2} color="text.primary">
          📊 Общая Статистика
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box gap={1} display="flex" flexDirection="column">
          {elements.map((item) => (
            <Grid>
              <StatCard {...item} />
            </Grid>
          ))}
        </Box>
      </CardContent>
    </CustomCard>
  );
};

export { Records };
