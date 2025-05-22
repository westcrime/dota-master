import {
  Box,
  Typography,
  Divider,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import Item from "@src/shared/models/item";

interface ItemAvatarProps {
  item?: Item;
  borderColor?: string;
}

export const ItemAvatar: React.FC<ItemAvatarProps> = ({
  item,
  borderColor = "grey",
}) => {
  const theme = useTheme();

  if (!item) return null;

  const getItemImage = () => {
    if (
      item.name.includes("recipe")
    ) {
      return "/recipe_icon.webp";
    }
    if (
      item.iconUrl.includes("default-image.png")
    ) {
      return "/recipe_icon.webp";
    }
    return item.iconUrl;
  };

  return (
    <Box sx={{ width: 40, height: 32 }}>
      <Tooltip
        title={
          <Box sx={{ p: 2, maxWidth: 300 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Box
                component="img"
                src={getItemImage()}
                alt={item.displayName}
                sx={{
                  width: 48,
                  height: 48,
                  objectFit: "contain",
                }}
              />
              <Typography variant="subtitle1" fontWeight="bold">
                {item.displayName}
              </Typography>
            </Stack>

            {item.cost && (
              <Typography variant="body2" color="text.secondary">
                Цена: {item.cost} золота
              </Typography>
            )}

            <Divider sx={{ my: 1.5 }} />

            <Typography variant="body2" paragraph>
              {item.description}
            </Typography>

            {item.lore && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", fontStyle: "italic" }}
              >
                {item.lore}
              </Typography>
            )}

            {item.attributes.length > 0 && (
              <>
                <Divider sx={{ my: 1.5 }} />
                <Stack spacing={0.75}>
                  {item.attributes.map((attr, index) => (
                    <Box key={index}>
                      <Typography variant="caption" fontWeight="bold">
                        {attr.name}:
                      </Typography>
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        {attr.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </Box>
        }
        arrow
        placement="right"
      >
        <Box
          component="img"
          src={getItemImage()}
          alt={item.displayName}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 1,
            border: `1px solid ${borderColor}`,
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            objectFit: "fill",
            backgroundColor: theme.palette.background.paper,
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: `0 0 10px ${borderColor}`,
            },
          }}
        />
      </Tooltip>
    </Box>
  );
};
