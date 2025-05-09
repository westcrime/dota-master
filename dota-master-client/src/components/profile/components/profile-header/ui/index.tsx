import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { useEffect } from "react";
import {
  Card,
  Typography,
  Skeleton,
  LinearProgress,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchProfileBasicInfoRequest } from "../store/fetch-basic-info";

const ProfileHeader = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchProfileBasicInfo
  );

  const {
    loading: steamProfileLoading,
    error: steamProfileError,
    data: steamProfileData,
  } = useSelector((state: RootState) => state.fetchSteamProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileBasicInfoRequest());
  }, [dispatch]);

  if (loading || steamProfileLoading) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box display="flex" gap={3}>
          <Skeleton
            variant="rectangular"
            width={150}
            height={150}
            sx={{ bgcolor: "#333" }}
          />
          <Box flexGrow={1}>
            <Skeleton
              variant="text"
              width="60%"
              height={40}
              sx={{ bgcolor: "#333" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={10}
              sx={{ my: 2, bgcolor: "#333" }}
            />
            <Box display="flex" gap={2}>
              <Skeleton
                variant="text"
                width="30%"
                height={30}
                sx={{ bgcolor: "#333" }}
              />
              <Skeleton
                variant="text"
                width="30%"
                height={30}
                sx={{ bgcolor: "#333" }}
              />
            </Box>
            <Skeleton
              variant="text"
              width="50%"
              height={30}
              sx={{ mt: 1, bgcolor: "#333" }}
            />
          </Box>
        </Box>
      </Card>
    );
  }

  if (error || !data || steamProfileError || !steamProfileData) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box display="flex" alignItems="center" color="#ff4444">
          <ErrorIcon sx={{ mr: 1 }} />
          <Typography>{error || "Failed to load data"}</Typography>
        </Box>
      </Card>
    );
  }
  const totalGames = data.wins + data.loses;
  const winRate = totalGames > 0 ? (data.wins / totalGames) * 100 : 0;

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
        {/* Rank Image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 150,
          }}
        >
          <Avatar
            src={`/ranks/${data.rank}.webp`}
            sx={{
              width: 120,
              height: 120,
              border: "2px solid #333",
              mb: 1,
            }}
          />
          {data.isDotaPlusSub && (
            <Chip
              label="Dota Plus"
              sx={{
                mt: 1,
                backgroundColor: "#4a148c",
                color: "white",
              }}
              size="small"
            />
          )}
        </Box>

        {/* Stats */}
        <Box flexGrow={1}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ color: "white" }}
          >
            Статистика игр
          </Typography>

          {/* Win Rate Progress */}
          <Box mb={3}>
            <LinearProgress
              variant="determinate"
              value={winRate}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#d32f2f",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4caf50",
                  borderRadius: 5,
                },
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={0.5}>
              <Typography variant="caption" sx={{ color: "#4caf50" }}>
                {winRate.toFixed(1)}% побед
              </Typography>
              <Typography variant="caption" sx={{ color: "#888" }}>
                {totalGames} игр
              </Typography>
            </Box>
          </Box>

          {/* Wins/Losses */}
          <Box display="flex" gap={2} mb={2}>
            <Box textAlign="center">
              <Typography variant="h5" sx={{ color: "#4caf50" }}>
                {data.wins}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Побед
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h5" sx={{ color: "#d32f2f" }}>
                {data.loses}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Поражений
              </Typography>
            </Box>
          </Box>

          {/* First match date */}
          <Typography variant="body2" sx={{ color: "#888" }}>
            Первая игра: {new Date(data.firstMatchDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export { ProfileHeader };
