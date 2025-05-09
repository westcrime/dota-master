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
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { RootState } from "@src/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeroPerfomanceRequest } from "../store/fetch-perfomance";
import { HeroTooltip } from "../components/hero-tooltip";

function calculateIconPosition(
  index: number,
  total: number,
  cx: number,
  cy: number,
  radius: number
) {
  const angle = (index * 360) / total - 90;
  return {
    x: cx + radius * Math.cos((angle * Math.PI) / 180) - 12,
    y: cy + radius * Math.sin((angle * Math.PI) / 180) - 12,
  };
} 

const Perfomance = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchPerfomance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroPerfomanceRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={256} />
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card
        sx={{
          p: 3,
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
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Недавние Показатели
          </Typography>
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box sx={{ width: "100%", height: 312 }}>
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
                  dataKey="value"
                  label={({ cx, cy, index }) => {
                    const heroName = pieChartData[index].name.replace(
                      "npc_dota_hero_",
                      ""
                    );
                    const midRadius = 95;
                    const iconPosition = calculateIconPosition(
                      index,
                      pieChartData.length,
                      cx,
                      cy,
                      midRadius
                    );

                    return (
                      <image
                        href={`${import.meta.env.VITE_PUBLIC_HERO_ICONS_DOMAIN}/${heroName}_icon.png`}
                        x={iconPosition.x}
                        y={iconPosition.y}
                        width={28}
                        height={28}
                      />
                    );
                  }}
                  labelLine={false}
                >
                  {pieChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      stroke="#0"
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
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ width: "100%" }}>
            <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {data.map((hero) => (
                <ListItem
                  key={hero.heroId}
                  sx={{
                    bgcolor: "grey.900",
                    borderRadius: 2,
                    p: 2,
                    mb: 0.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 1,
                      bgcolor: "grey.800",
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
                        border: "2px solid",
                        borderColor: "primary.main",
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
                        <Box sx={{ display: "flex", gap: 2 }}>
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
                            KDA
                          </Typography>
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
