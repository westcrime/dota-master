import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { fetchSteamProfileRequest } from "../store/fetch-steam-profile";
import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Skeleton,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { ImSteam2 } from "react-icons/im";
import { IoLogOutSharp } from "react-icons/io5";

const SteamProfileCard = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchSteamProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSteamProfileRequest());
  }, [dispatch]);

  return (
    <Card>
      <div onClick={handleClick} className="hover:cursor-pointer p-3">
        <CardContent
          sx={{
            padding: "0 !important",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="space-x-2"
            >
              <Skeleton variant="rectangular" width={200} height={50} />
              <Skeleton variant="circular" width={50} height={50} />
            </div>
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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 className="text-lg text-start font-bold">
                  {data.username}
                </h2>
                <p className="text-sm text-start text-gray-400">
                  DotaID: {data.dotaId}
                </p>
              </div>
              <Avatar src={data.avatarUrl} sx={{ width: 40, height: 40 }} />
            </div>
          )}
        </CardContent>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack spacing={1} sx={{ width: 200, p: 1 }}>
          <Typography
            sx={{ paddingLeft: 2 }}
            variant="subtitle1"
            fontWeight="bold"
          >
            Мой профиль
          </Typography>
          <Divider />

          <List dense>
            <ListItem
              component="a"
              href={`https://steamcommunity.com/profiles/${data?.steamId}`}
              target="_blank"
              sx={{
                "&:hover": { backgroundColor: "action.hover" },
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  width: "20%",
                  justifyContent: "center",
                }}
              >
                <ImSteam2 />
              </ListItemIcon>
              <ListItemText
                primary="Перейти в аккаунт Steam"
                sx={{
                  width: "80%",
                  marginLeft: 1,
                }}
              />
            </ListItem>

            <ListItem
              component="a"
              href={`${import.meta.env.VITE_PUBLIC_BACKEND_DOMAIN}/auth/logout`}
              sx={{
                "&:hover": { backgroundColor: "action.hover" },
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  width: "20%",
                  justifyContent: "center",
                }}
              >
                <IoLogOutSharp size={20} />
              </ListItemIcon>
              <ListItemText
                primary="Выйти"
                sx={{
                  width: "80%",
                  marginLeft: 1,
                }}
              />
            </ListItem>
          </List>
        </Stack>
      </Popover>
    </Card>
  );
};

export { SteamProfileCard };
