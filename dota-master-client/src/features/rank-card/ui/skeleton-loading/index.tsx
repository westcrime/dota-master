import { Box, Skeleton } from "@mui/material";

const RankCardSkeletonLoading = () => {
  return (
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
  );
};

export default RankCardSkeletonLoading;
