import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroModel from "../../shared/models/hero";
import { RootState } from "@src/store";
import { fetchHeroesOpendotaRequest } from "./store/fetch-heroes-opendota";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Box,
  SelectChangeEvent,
} from "@mui/material";

interface HeroesOpendotaSelectProps {
  id?: string;
  name?: string;
  onChange?: (event: SelectChangeEvent<number>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: number; // Изменено на number, так как мы работаем с id
  disabled?: boolean;
  className?: string;
  isLoadingRequired: boolean;
  error?: string;
  label: string;
}

const HeroesOpendotaSelect = ({
  id,
  name,
  onChange,
  onBlur,
  value,
  disabled,
  isLoadingRequired,
  error,
  label = "Heroes",
}: HeroesOpendotaSelectProps) => {
  const {
    loading,
    error: fetchError,
    data,
  } = useSelector((state: RootState) => state.fetchHeroesOpendota);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoadingRequired) {
      dispatch(fetchHeroesOpendotaRequest());
    }
  }, [isLoadingRequired, dispatch]);

  if (loading) {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          disabled
          label={label}
          value=""
          endAdornment={
            <CircularProgress
              size={24}
              sx={{ position: "absolute", right: 8 }}
            />
          }
        >
          <MenuItem disabled value="">
            Загрузка героев...
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  if (fetchError) {
    return (
      <FormControl fullWidth error>
        <InputLabel>{label}</InputLabel>
        <Select disabled label={label} value="">
          <MenuItem disabled value="">
            Ошибка при загрузке героев
          </MenuItem>
        </Select>
        <FormHelperText>{fetchError}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth error={!!error} disabled={disabled}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value ?? ""}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        renderValue={(selected) => {
          const selectedHero = data?.find((hero) => hero.id === selected);
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selectedHero && (
                <img
                  src={`${import.meta.env.VITE_PUBLIC_HERO_ICONS_DOMAIN}/${selectedHero.name.replace("npc_dota_hero_", "")}_icon.png`}
                  alt={selectedHero.displayName}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
              )}
              {selectedHero?.displayName || "Выберите героя"}
            </Box>
          );
        }}
      >
        <MenuItem disabled value="">
          Выберите героя
        </MenuItem>
        {data?.map((item: HeroModel) => (
          <MenuItem key={item.id} value={item.id}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <img
                src={`${import.meta.env.VITE_PUBLIC_HERO_ICONS_DOMAIN}/${item.name.replace("npc_dota_hero_", "")}_icon.png`}
                alt={item.displayName}
                style={{ width: 24, height: 24, marginRight: 12 }}
              />
              {item.displayName}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {(error || fetchError) && (
        <FormHelperText>{error || fetchError}</FormHelperText>
      )}
    </FormControl>
  );
};

export { HeroesOpendotaSelect };
