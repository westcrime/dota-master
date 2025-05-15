import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Box } from "@mui/material";
import HeroPerfomance from "../../models/match";
import { HeroTooltip } from "../../components/hero-tooltip";

interface PerformancePieChartProps {
  data: Array<{
    name: string;
    value: number;
    impact: number;
  }>;
  heroesData: HeroPerfomance[];
}

export const PerformancePieChart = ({
  data,
  heroesData,
}: PerformancePieChartProps) => {
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={110}
            animationBegin={800}
            animationDuration={1200}
            animationEasing="ease-out"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const heroName = data[index].name.replace("npc_dota_hero_", "");
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
              const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

              return (
                <image
                  href={`${import.meta.env.VITE_PUBLIC_HERO_ICONS_DOMAIN}/${heroName}_icon.png`}
                  x={x - 14}
                  y={y - 14}
                  width={28}
                  height={28}
                  clipPath="circle(14px at 14px 14px)"
                />
              );
            }}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                name={entry.name}
                fill={`url(#${entry.name.replace("npc_dota_hero_", "")}-gradient)`}
                stroke="#1e1e1e"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            content={<HeroTooltip recentHeroesStats={heroesData} />}
            wrapperStyle={{
              background: "#2a2a2e",
              borderRadius: 8,
              border: "1px solid #444",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          />
          <defs>
            {data.map((entry) => {
              const heroName = entry.name.replace("npc_dota_hero_", "");
              return (
                <linearGradient
                  key={`gradient-${heroName}`}
                  id={`${heroName}-gradient`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#4a148c" />
                  <stop offset="100%" stopColor="#7b1fa2" />
                </linearGradient>
              );
            })}
          </defs>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
