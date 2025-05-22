import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { useEffect } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { fetchProfileBasicInfoRequest } from "../store/fetch-basic-info";
import { CustomCard } from "@src/shared/ui/custom-card";
import WinrateLinearProgress from "./linear-progress";
import WinrateLabel from "./winrate-label";
import RankCardSkeletonLoading from "./skeleton-loading";

const RankCard = () => {
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

  if (loading || steamProfileLoading || !data || !steamProfileData) {
    return (
      <CustomCard>
        <RankCardSkeletonLoading />
      </CustomCard>
    );
  }

  if (error || steamProfileError) {
    return (
      <CustomCard>
        <Box display="flex" alignItems="center">
          <ErrorIcon sx={{ mr: 1 }} />
          <Typography>{error || "Failed to load data"}</Typography>
        </Box>
      </CustomCard>
    );
  }
  const totalGames = data.wins + data.loses;
  const winRate = totalGames > 0 ? (data.wins / totalGames) * 100 : 0;

  return (
    <CustomCard>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minWidth: 100,
            margin: "auto",
            padding: 0,
          }}
        >
          <Avatar
            src={`/ranks/${data.rank}.webp`}
            sx={{
              width: 80,
              height: 80,
              alignSelf: "center",
              margin: "auto",
            }}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{ width: "100%" }}
        >
          <WinrateLabel winRate={winRate} />
          <WinrateLinearProgress winRate={winRate} />
          <Box display="flex" gap={1}>
            <Box textAlign="center">
              <Typography variant="body1" sx={{ color: "#4caf50" }}>
                {data.wins}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body1" color="text.secondary">
                -
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body1" sx={{ color: "#d32f2f" }}>
                {data.loses}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Первая игра: {new Date(data.firstMatchDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </CustomCard>
  );
};

export { RankCard };
