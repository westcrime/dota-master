import {
  Box,
  Typography,
  Avatar,
  Divider,
  Zoom,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HeroModel from "@src/shared/models/hero";
import { styled } from "@mui/material/styles";
import AghanimDialog from "@src/shared/ui/aghanim-dialog";
import { Laning } from "../../models/match";

interface LaningAnalysisProps {
  laning: Laning;
  laningAnalysis: string;
  heroes: HeroModel[];
  rank: number;
}

const getHero = (id: number, heroes: HeroModel[]) => {
  return heroes.find((h) => h.id === id);
};

export const LaningAnalysis = ({
  laning,
  heroes,
  laningAnalysis,
  rank,
}: LaningAnalysisProps) => {
  const mainHero = getHero(laning.heroId, heroes);
  console.log(rank);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-end",
        gap: 3,
      }}
    >
      <Box sx={{ alignSelf: "flex-end" }}>
        <AghanimDialog text={laningAnalysis} right={false} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 3,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            mb: 2,
            borderRadius: 2,
            "& .MuiTableRow-root": {
              "&:hover": {
                backgroundColor: "action.hover",
                "& .MuiTableCell-body": {
                  fontWeight: "bold",
                },
              },
            },
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell sx={{ width: 120 }}></TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "primary.main",
                    borderBottom: "2px solid",
                    borderColor: "primary.main",
                  }}
                >
                  Ваши показатели
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "secondary.main",
                    borderBottom: "2px solid",
                    borderColor: "secondary.main",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                    <Typography variant="body2">Средние по рангу</Typography>
                    <Avatar
                      src={`/ranks/${rank}.webp`}
                      sx={{
                        width: 30,
                        height: 30,
                        ml: 3,
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Строка убийств */}
              <TableRow sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src="/records/killsIcon.png"
                      alt="Kills"
                      style={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2">Убийства</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "error.main",
                    py: 2,
                  }}
                >
                  {laning.laningKills}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.1rem",
                    color: "text.secondary",
                    py: 2,
                  }}
                >
                  {laning.avgLaningKills.toFixed(1)}
                </TableCell>
              </TableRow>

              {/* Строка смертей */}
              <TableRow sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src="/records/deathsIcon.png"
                      alt="Deaths"
                      style={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2">Смерти</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "warning.main",
                    py: 2,
                  }}
                >
                  {laning.laningDeaths}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.1rem",
                    color: "text.secondary",
                    py: 2,
                  }}
                >
                  {laning.avgLaningDeaths.toFixed(1)}
                </TableCell>
              </TableRow>

              {/* Строка ластхитов */}
              <TableRow sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src="/records/lastHitsIcon.png"
                      alt="Last Hits"
                      style={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2">Ластхиты</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "success.main",
                    py: 2,
                  }}
                >
                  {laning.laningCs}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.1rem",
                    color: "text.secondary",
                    py: 2,
                  }}
                >
                  {laning.avgLaningCs.toFixed(1)}
                </TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src="/records/goldIcon.png"
                      alt="Gold"
                      style={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2">Золото</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#ebfa4b",
                    py: 2,
                  }}
                >
                  {laning.laningNetworth}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "1.1rem",
                    color: "text.secondary",
                    py: 2,
                  }}
                >
                  {laning.avgLaningNetworth.toFixed(1)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
