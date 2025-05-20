import {
  Box,
  Avatar,
  Tooltip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Item from "@src/shared/models/item";

interface ItemAvatarProps {
  item?: Item;
  size?: number;
  borderColor?: string;
  left: number;
  top: string;
  zIndex: number;
  time: string;
}

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 75%)`;
};

export const ItemAvatar: React.FC<ItemAvatarProps> = ({
  item,
  size = 48,
  left,
  top,
  zIndex,
  time,
}) => {
  if (!item) return null;
  console.log(item.name.includes('recipe') && item.iconUrl === 'https://cdn.dota2.com/apps/dota2/images/items/default-image.png' ? '/recipe_icon.webp' : item.iconUrl)
  return (
    <Box
      sx={{
        position: "absolute",
        left: `${left}px`,
        top: top,
        transform: "translate(-50%, -50%)",
        zIndex: zIndex,
        width: size,
        height: size,
      }}
    >
      <Tooltip
        title={
          <Box sx={{ p: 1, maxWidth: 300 }}>
            <Typography variant="h6" fontWeight="bold">
              Время покупки - {time}
            </Typography>

            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              {item.displayName}
            </Typography>

            {item.cost && (
              <Typography variant="body2" color="text.secondary">
                Цена: {item.cost} золота
              </Typography>
            )}

            <Divider sx={{ my: 1 }} />

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
                <Divider sx={{ my: 1 }} />
                <Stack spacing={0.5}>
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
        <Avatar
          src={item.name.includes('recipe') && item.iconUrl === 'https://cdn.dota2.com/apps/dota2/images/items/default-image.png' ? 'recipe_icon.webp' : item.iconUrl}
          alt={item.displayName}
          sx={{
            width: "100%",
            height: "100%",
            border: `3px solid ${getRandomPastelColor()}`,
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: `0 0 10px ${getRandomPastelColor()}`,
            },
          }}
        />
      </Tooltip>
    </Box>
  );
};
