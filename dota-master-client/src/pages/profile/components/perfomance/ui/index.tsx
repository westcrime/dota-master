import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Divider,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { RootState } from "@src/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeroPerfomanceRequest } from "../store/fetch-perfomance";
import { HeroTooltip } from "../components/hero-tooltip";

const getImpactColor = (impact: number) => {
  if (impact >= 8)
    return { text: "#4caf50", bg: "rgba(76, 175, 80, 0.1)", border: "#4caf50" };
  if (impact >= 5)
    return { text: "#ffc107", bg: "rgba(255, 193, 7, 0.1)", border: "#ffc107" };
  if (impact >= 2)
    return { text: "#ff9800", bg: "rgba(255, 152, 0, 0.1)", border: "#ff9800" };
  return { text: "#f44336", bg: "rgba(244, 67, 54, 0.1)", border: "#f44336" };
};

// function calculateIconPosition(
//   index: number,
//   total: number,
//   cx: number,
//   cy: number,
//   radius: number
// ) {
//   const angle = (index * 360) / total - 90;
//   return {
//     x: cx + radius * Math.cos((angle * Math.PI) / 180) - 12,
//     y: cy + radius * Math.sin((angle * Math.PI) / 180) - 12,
//   };
// }

const Perfomance = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchPerfomance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroPerfomanceRequest());
  }, [dispatch]);

  if (loading || !data) {
    return (
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={256} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  const pieChartData = data.map((hero) => ({
    name: hero.name,
    value: hero.matchCount,
    impact: hero.impact,
  }));

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Показатели за 20 матчей
          </Typography>
        }
      />
      <Divider sx={{ mb: 2 }} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={500} height={500}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={130}
                  paddingAngle={2}
                  cornerRadius={4}
                  animationBegin={800}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    index,
                  }) => {
                    const heroName = pieChartData[index].name.replace(
                      "npc_dota_hero_",
                      ""
                    );
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x =
                      cx + radius * Math.cos((-midAngle * Math.PI) / 180);
                    const y =
                      cy + radius * Math.sin((-midAngle * Math.PI) / 180);

                    return (
                      <image
                        href={`${import.meta.env.VITE_PUBLIC_HERO_ICONS_DOMAIN}/${heroName}_icon.png`}
                        x={x - 14}
                        y={y - 14}
                        width={28}
                        height={28}
                        clipPath="circle(14px at 14px 14px)"
                      />
                    );
                  }}
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      name={entry.name}
                      fill={`url(#${entry.name.replace("npc_dota_hero_", "")}-gradient)`}
                      stroke="#1e1e1e"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<HeroTooltip recentHeroesStats={data} />}
                  wrapperStyle={{
                    background: "#2a2a2e",
                    borderRadius: 8,
                    border: "1px solid #444",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                  }}
                />
                <defs>
                  {pieChartData.map((entry) => {
                    const heroName = entry.name.replace("npc_dota_hero_", "");
                    return (
                      <linearGradient
                        key={`gradient-${heroName}`}
                        id={`${heroName}-gradient`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#4a148c" />
                        <stop offset="100%" stopColor="#7b1fa2" />
                      </linearGradient>
                    );
                  })}
                </defs>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: "100%" }}>
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {data.map((hero) => (
                <ListItem
                  key={hero.heroId}
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
                      sx={{
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
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
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Кол-во игр:
                            </Typography>
                            <Typography variant="body2" component="span">
                              {hero.matchCount}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body2" color="success.main">
                              Победы:
                            </Typography>
                            <Typography variant="body2" component="span">
                              {hero.winCount}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body2" color="error.main">
                              Поражения:
                            </Typography>
                            <Typography variant="body2" component="span">
                              {hero.matchCount - hero.winCount}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="success.main"
                              fontWeight="medium"
                            >
                              {hero.avgKills.toFixed(0)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              /
                            </Typography>
                            <Typography
                              variant="body2"
                              color="error.main"
                              fontWeight="medium"
                            >
                              {hero.avgDeaths.toFixed(0)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              /
                            </Typography>
                            <Typography
                              variant="body2"
                              color="warning.main"
                              fontWeight="medium"
                            >
                              {hero.avgAssists.toFixed(0)}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Средний KDA
                          </Typography>
                        </Box>
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
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <Typography variant="body2" color="yellow">
                                Средний GPM:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="yellow"
                                component="span"
                              >
                                {hero.avgGpm}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: "#8a82fa" }}
                              >
                                Средний XPM:
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#8a82fa" }}
                                component="span"
                              >
                                {hero.avgXpm}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              ml: 2,
                              px: 2,
                              py: 1,
                              borderRadius: 1,
                              bgcolor: getImpactColor(hero.impact).bg,
                              border: `1px solid ${getImpactColor(hero.impact).border}`,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: "bold",
                                color: getImpactColor(hero.impact).text,
                              }}
                            >
                              Impact:
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: "bold",
                                color: getImpactColor(hero.impact).text,
                              }}
                            >
                              {hero.impact.toFixed(1)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    }
                    sx={{
                      "& .MuiListItemText-primary": { mb: 0.5 },
                      "& .MuiListItemText-secondary": { mt: 0.5 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export { Perfomance };
