import { RankCard } from "@src/features/rank-card";
import { Records } from "@src/features/records";
import { Perfomance } from "@src/features/perfomance";
import { Box } from "@mui/material";
import { ProfileHeader } from "@src/features/profile-header/ui";

const Profile = () => {
  return (
    <div className="flex flex-col w-full space-y-6">
      <ProfileHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          gap: { xs: 2, md: 3 },
          "& > *": {
            width: { xs: "100%", md: "50%" },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: 2,
          }}
        >
          <RankCard />
          <Records />
        </Box>

        <Box>
          <Perfomance />
        </Box>
      </Box>
    </div>
  );
};

export { Profile };
