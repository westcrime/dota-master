import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { fetchSteamProfileRequest } from "@shared/store/fetch-steam-profile";
import { useEffect } from "react";
import {
  Alert,
  Avatar,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import { ImSteam2 } from "react-icons/im";

const ProfileHeader = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchSteamProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSteamProfileRequest());
  }, [dispatch]);

  return (
    <div
      className="flex flex-row w-full"
      style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {loading && (
        <>
          <div className="flex flex-row space-x-8">
            <Skeleton variant="circular" width={150} height={150} />
            <div className="felx flex-col space-y-6">
              <Skeleton variant="rectangular" width={200} height={50} />
              <Skeleton variant="rectangular" width={200} height={50} />
            </div>
          </div>
          <Skeleton variant="rectangular" width={200} height={50} />
        </>
      )}
      {error && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {data && (
        <>
          <div className="flex flex-row space-x-8">
            <Avatar src={data.avatarUrl} sx={{ width: 150, height: 150 }} />
            <div className="felx flex-col space-y-6">
              <Typography variant="h4">{data.username}</Typography>
              <Typography variant="body1" color="text.secondary">
                Dota ID: {data.dotaId}
              </Typography>
            </div>
          </div>
          <Button
            component="a"
            href={`https://steamcommunity.com/profiles/${data?.steamId}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<ImSteam2 />}
            sx={{ mr: 8, alignSelf: "start" }}
          >
            <Typography variant="button">
              Steam
            </Typography>
          </Button>
        </>
      )}
    </div>
  );
};

export { ProfileHeader };
