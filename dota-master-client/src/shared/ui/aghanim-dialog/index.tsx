import { Box, Avatar, Typography } from "@mui/material";

interface AghanimDialogProps {
  text: string;
  right: boolean;
}

const AghanimDialog = ({ text, right }: AghanimDialogProps) => {
  if (right) {
    return (
      <Box
        sx={{
          width: 500,
          height: 400,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 4,
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "grey.900",
            color: "white",
            p: 2,
            borderRadius: 3,
            maxWidth: "60%",
            boxShadow: 4,
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {text}
          </Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: 48,
              right: -8,
              width: 16,
              height: 16,
              bgcolor: "grey.900",
              transform: "rotate(45deg)",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "translateX(16px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "white" }}
          >
            Рубик
          </Typography>
          <Box
            sx={{
              width: 112,
              height: 112,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #424242",
              boxShadow: 3,
            }}
          >
            <Avatar
              src="/dialog.jpg"
              alt="Aghanim"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(2)",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: 500,
          height: 400,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "translateX(-16px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "white" }}
          >
            Рубик
          </Typography>
          <Box
            sx={{
              width: 112,
              height: 112,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #424242",
              boxShadow: 3,
            }}
          >
            <Avatar
              src="/dialog.jpg"
              alt="Aghanim"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(2)",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            bgcolor: "grey.900",
            color: "white",
            p: 2,
            borderRadius: 3,
            maxWidth: "60%",
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 48,
              left: -8,
              width: 16,
              height: 16,
              bgcolor: "grey.900",
              transform: "rotate(45deg)",
            }}
          />
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {text}
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default AghanimDialog;
