import { useEffect, useState } from "react";
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
  Chip,
  Divider,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/store";
import { fetchMatchBasicInfoRequest } from "../store/fetch-matches";
import { Pagination } from "@widgets/pagination";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";
import DotaLoader from "@src/widgets/loader";
import { HeroesOpendotaSelect } from "@src/features/heroes-opendota-select";

const MatchHistoryCard = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchMatches
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(0);
  const [heroId, setHeroId] = useState<number | undefined>(undefined);

  useEffect(() => {
    dispatch(
      fetchMatchBasicInfoRequest({
        limit: import.meta.env.VITE_MATCHES_LIMIT_SIZE,
        offset: page * import.meta.env.VITE_MATCHES_LIMIT_SIZE,
        heroId: heroId,
      })
    );
  }, [dispatch, page, heroId]);

  const handleHeroChange = (event: SelectChangeEvent<number>) => {
    setHeroId(event.target.value as number);
    setPage(0);
  };

  if (loading || !data) {
    return <DotaLoader label="Загрузка матчей..." />;
  }

  if (error) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent>
          <Typography color="error">
            {error || "Не удалось загрузить данные"}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
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
              История матчей
            </Typography>
          }
        />
        <CardContent>
          <HeroesOpendotaSelect
            id="hero-select"
            name="hero"
            value={heroId}
            onChange={handleHeroChange}
            isLoadingRequired={true}
            label="Фильтр по герою"
          />
          <Divider sx={{ mb: 2, mt: 2 }} />
          <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {data.map((match) => (
              <ListItem
                key={match.matchId}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  p: 2,
                  mb: 0.5,
                  borderLeft: `4px solid ${match.isWin ? "#4caf50" : "#f44336"}`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 1,
                    bgcolor: "grey.900",
                  },
                  position: "relative",
                }}
                secondaryAction={
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      ml: 2,
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                    component={Link}
                    to={`/match-analysis/${match.matchId}`}
                  >
                    Анализ матча
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={`${import.meta.env.VITE_PUBLIC_HERO_PORTRAITS_DOMAIN}/${match.hero.name.replace("npc_dota_hero_", "")}.png`}
                    alt={match.hero.displayName}
                    sx={{
                      width: 64,
                      height: 64,
                      mr: 2,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {match.hero.displayName}
                      </Typography>
                      <Chip
                        label={match.isWin ? "Победа" : "Поражение"}
                        color={match.isWin ? "success" : "error"}
                        size="small"
                        sx={{ fontWeight: "bold", ml: 2 }}
                      />

                      <Avatar
                        src={`/ranks/${match.averageRank}.webp`}
                        sx={{
                          width: 30,
                          height: 30,
                          ml: 3,
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {formatDistanceToNow(new Date(match.startTime), {
                            addSuffix: true,
                            locale: ru,
                          })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Длительность: {match.duration}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", gap: 3, alignItems: "center" }}
                      >
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Typography
                            variant="body1"
                            color="success.main"
                            fontWeight="bold"
                          >
                            {match.kills}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            /
                          </Typography>
                          <Typography
                            variant="body1"
                            color="error.main"
                            fontWeight="bold"
                          >
                            {match.deaths}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            /
                          </Typography>
                          <Typography
                            variant="body1"
                            color="warning.main"
                            fontWeight="bold"
                          >
                            {match.assists}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            ml={1}
                          >
                            KDA
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Match ID:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {match.matchId}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                  sx={{
                    "& .MuiListItemText-primary": { mb: 0.5 },
                    "& .MuiListItemText-secondary": { mt: 0.5 },
                    paddingRight: "120px",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {data && (
        <Pagination
          pageIndex={page}
          hasPreviousPage={page > 0}
          hasNextPage={true}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export { MatchHistoryCard };
