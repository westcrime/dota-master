import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { fetchSteamProfileRequest } from "../store/fetch-steam-profile";
import { useEffect } from "react";
import { Alert, Avatar, Card, Skeleton } from "@mui/material";

const SteamProfileCard = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchSteamProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSteamProfileRequest());
  }, [dispatch]);

  return (
    <Card>
      {loading && (
        <div className="flex p-2 space-x-4">
          <Skeleton variant="rectangular" width={310} height={50} />
          <Skeleton variant="circular" width={50} height={50} />
        </div>
      )}
      {error && (
        <div className="flex p-2 space-x-4">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {data && (
        <div className="flex flex-row w-full justify-between items-center p-2 space-x-4">
          <div>
            <h2 className="text-base text-start font-bold">{data.username}</h2>
            <p className="text-sm text-start text-gray-400">
              DotaID: {data.dotaId}
            </p>
          </div>
          <Avatar src={data.avatarUrl} />
        </div>
      )}
    </Card>
  );
};

export { SteamProfileCard };
