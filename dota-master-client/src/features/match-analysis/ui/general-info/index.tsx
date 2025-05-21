import { GeneralInfo } from "../../models/match";
import Item from "@src/shared/models/item";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Legend,
  Line,
} from "recharts";
import HeroModel from "@src/shared/models/hero";
import { PlayerCard } from "./ui/player-card";

interface GeneralInfoCardProps {
  generalInfo: GeneralInfo;
  durationSeconds: number;
  rank: number;
  heroes: HeroModel[];
  items: Item[];
  matchId: number;
}

const getHero = (id: number, heroes: HeroModel[]) => {
  return heroes.find((h) => h.id === id);
};

export const GeneralInfoCard = ({
  generalInfo,
  durationSeconds,
  rank,
  heroes,
  items,
  matchId,
}: GeneralInfoCardProps) => {
  const [showGold, setShowGold] = useState(true);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const radiantPlayers = generalInfo.players.filter((p) => p.isRadiant);
  const direPlayers = generalInfo.players.filter((p) => !p.isRadiant);

  const graphData = generalInfo.radiantNetworthLeads.map(
    (goldValue, index) => ({
      time: index,
      gold: goldValue,
      experience: generalInfo.radiantExperienceLeads[index],
    })
  );

  const radiantTotalKills = radiantPlayers.reduce(
    (sum, player) => sum + player.kills,
    0
  );
  const direTotalKills = direPlayers.reduce(
    (sum, player) => sum + player.kills,
    0
  );

  return (
    <div className="bg-gray-800 text-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {/* <Sun className="h-8 w-8 text-green-500" /> */}
          <div>
            <h2 className="text-xl font-bold">Свет</h2>
            <span
              className={`text-sm ${generalInfo.didRadiantWin ? "text-green-500" : "text-red-500"}`}
            >
              {generalInfo.didRadiantWin ? "Победа" : "Поражение"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-2xl font-bold">
          <span className="text-green-500">{radiantTotalKills}</span>
          <span className="text-gray-500">{formatTime(durationSeconds)}</span>
          <span className="text-red-500">{direTotalKills}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <h2 className="text-xl font-bold">Тьма</h2>
            <span
              className={`text-sm ${!generalInfo.didRadiantWin ? "text-green-500" : "text-red-500"}`}
            >
              {!generalInfo.didRadiantWin ? "Победа" : "Поражение"}
            </span>
          </div>
          {/* <Moon className="h-8 w-8 text-red-500" /> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 p-4">
        {/* Left Column - Radiant Players */}
        <div className="space-y-2">
          {radiantPlayers.map((player, index) => (
            <PlayerCard
              items={items}
              key={index}
              player={player}
              hero={getHero(player.heroId, heroes)}
              side="radiant"
            />
          ))}
        </div>

        {/* Middle Column - Graph */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Прогресс матча</h3>
            <button
              onClick={() => setShowGold(!showGold)}
              className="px-3 py-1 bg-gray-700 rounded text-sm"
            >
              {showGold ? "Показать Опыт" : "Показать Золото"}
            </button>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="time"
                stroke="#666"
                tickFormatter={(value) =>
                  `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`
                }
              />
              <YAxis stroke="#666" />
              <ReferenceLine y={0} stroke="#ccc" strokeDasharray="3 3" />
              <Legend />

              {showGold ? (
                <Line
                  type="monotone"
                  dataKey="gold"
                  stroke="#FFD700"
                  dot={false}
                  strokeWidth={2}
                  name="Преимущество в золоте"
                />
              ) : (
                <Line
                  type="monotone"
                  dataKey="experience"
                  stroke="#1E90FF"
                  dot={false}
                  strokeWidth={2}
                  name="Преимущество в опыте"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column - Dire Players */}
        <div className="space-y-2">
          {direPlayers.map((player, index) => (
            <PlayerCard
              items={items}
              key={index}
              player={player}
              hero={getHero(player.heroId, heroes)}
              side="dire"
            />
          ))}
        </div>
      </div>

      {/* Footer - Match Info */}
      <div className="border-t border-gray-800 p-4 flex items-center justify-between text-sm text-gray-400">
        <div>Match ID: {matchId}</div>
        <div className="flex items-center gap-2">
          <span>Средний ранг:</span>
          <img
            src={`/ranks/${rank}.webp`}
            alt="rank"
            width={80}
            height={80}
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};
