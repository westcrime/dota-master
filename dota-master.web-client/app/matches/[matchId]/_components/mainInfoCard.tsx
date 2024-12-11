'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, ReferenceLine, Label } from 'recharts';
import { Moon, Sun } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Hero, GetHeroes } from '../_services/getHeroes'
import { Item, GetItems } from '../_services/getItems'

export interface MatchInfo {
    didRadiantWin: boolean,
    rank: number,
    durationSeconds: number,
    radiantNetworthLeads: number[],
    radiantExperienceLeads: number[],
    radiantKills: number[],
    direKills: number[],
    players: Player[]
}

export interface Player {
    hero: Hero,
    isRadiant: boolean,
    networth: number,
    kills: number,
    deaths: number,
    assists: number,
    goldPerMinute: number,
    experiencePerMinute: number,
    numDenies: number,
    numLastHits: number,
    imp: number,
    item0Id: Item | null,
    item1Id: Item | null,
    item2Id: Item | null,
    item3Id: Item | null,
    item4Id: Item | null,
    item5Id: Item | null,
    backpack0Id: Item | null,
    backpack1Id: Item | null,
    backpack2Id: Item | null
}

const ItemTooltip = ({ item }: { item: Item }) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger>
        <img 
          src={item.iconUrl}
          alt={item.title}
          className="w-8 h-8 rounded"
        />
      </TooltipTrigger>
      <TooltipContent>
        <div className="p-2">
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-sm">Cost: {item.cost}</p>
          <p className="text-xs mt-1">{item.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const PlayerCard = ({ player, side }: { player: Player, side: 'radiant' | 'dire' }) => {
    const [showStats, setShowStats] = useState(false);
    const items = [
        player.item0Id, player.item1Id, player.item2Id,
        player.item3Id, player.item4Id, player.item5Id
    ].filter(Boolean);

    const toggleStats = () => setShowStats(!showStats);

    if (showStats) {
        return (
            <div className={`p-3 rounded bg-opacity-20 ${
                side === 'radiant' ? 'bg-green-900' : 'bg-red-900'
            }`}>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-bold text-gray-200">{player.hero.localizedName}</span>
                    <button onClick={toggleStats} className="text-xs text-gray-400">Назад</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/killsIcon.png`} alt={"records"} width={20} height={20} /><span>KDA: <span className="font-bold">{player.kills}/{player.deaths}/{player.assists}</span></span></div>
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/goldIcon.png`} alt={"records"} width={20} height={20} /><span>Общая ценность: <span className="font-bold">{player.networth}</span></span></div>
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/heroDamageIcon.png`} alt={"records"} width={20} height={20} /><span>Золото в минуту: <span className="font-bold">{player.goldPerMinute}</span></span></div>
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/xpIcon.png`} alt={"records"} width={20} height={20} /><span>Опыт в минуту: <span className="font-bold">{player.experiencePerMinute}</span></span></div>
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/lastHitsIcon.png`} alt={"records"} width={20} height={20} /><span>Добитые крипы: <span className="font-bold">{player.numLastHits}</span></span></div>
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/deniesIcon.png`} alt={"records"} width={20} height={20} /><span>Неотданные крипы: <span className="font-bold">{player.numDenies}</span></span></div>
                    <div className="flex flex-row gap-x-2 items-center"><Image src={`/records/killsIcon.png`} alt={"records"} width={20} height={20} /><span>Перфоманс: <span className="font-bold">{player.imp}</span></span></div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className={`flex items-center gap-4 p-3 rounded bg-opacity-20 ${
                side === 'radiant' ? 'bg-green-900' : 'bg-red-900'
            } cursor-pointer`}
            onClick={toggleStats}
        >
            <div className="relative">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={player.hero.heroPortraitUrl} alt={player.hero.localizedName} className="object-cover"/>
                    <AvatarFallback>{player.hero.localizedName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className={`absolute -top-2 -right-2 px-1.5 rounded text-xs ${
                    player.imp >= 0 ? 'bg-green-500' : 'bg-red-500'
                }`}>
                    {player.imp > 0 ? '+' : ''}{player.imp}
                </span>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-200">{player.hero.localizedName}</span>
                    <span className="text-base font-bold text-gray-300">{player.kills}/{player.deaths}/{player.assists}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                    <span style={{ color: '#FFD700' }}>GPM: {player.goldPerMinute}</span>
                    <span style={{ color: '#1E90FF' }}>XPM: {player.experiencePerMinute}</span>
                </div>
                <div className="flex gap-1 mt-2">
                    {items.map((item, index) => (
                        item && <ItemTooltip key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const MainInfoCard = ({ matchId }: { matchId: string }) => {
    const [matchData, setMatchData] = useState<MatchInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showGold, setShowGold] = useState(true);

    useEffect(() => {
        const fetchHeroesInformation = async () => {
            try {
                const data = await GetHeroes();
                const heroesData: Hero[] = data.map((hero) => ({
                    ...hero,
                    heroPortraitUrl: `${process.env.NEXT_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero.name.replace("npc_dota_hero_", "")}.png`,
                }));

                return heroesData;
            } catch (error) {
                console.error("Error during fetchHeroesInformation:", error);
            }
        }

        const fetchItemsInformation = async () => {
            try {
                return await GetItems()
            } catch (error) {
                console.error("Error during fetchItemsInformation:", error);
            }
        }

        const fetchMatchData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/matches?matchId=${matchId}`;
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(`${errorData.status}: ${errorData.title} - ${errorData.detail}`);
                    throw new Error(`${errorData.status}: ${errorData.detail}`);
                }

                const data = await response.json();
                const heroes = await fetchHeroesInformation();
                const items = await fetchItemsInformation();

                const matchData: MatchInfo = {
                    ...data,
                    players: data.players.map((player: any) => ({
                        ...player,  
                        hero: heroes?.find(hero => hero.id === player.heroId),
                        item0Id: items?.find(item => item.id === player.item0Id) || null,
                        item1Id: items?.find(item => item.id === player.item1Id) || null,
                        item2Id: items?.find(item => item.id === player.item2Id) || null,
                        item3Id: items?.find(item => item.id === player.item3Id) || null,
                        item4Id: items?.find(item => item.id === player.item4Id) || null,
                        item5Id: items?.find(item => item.id === player.item5Id) || null,
                        backpack0Id: items?.find(item => item.id === player.backpack0Id) || null,
                        backpack1Id: items?.find(item => item.id === player.backpack1Id) || null,
                        backpack2Id: items?.find(item => item.id === player.backpack2Id) || null,
                    }))
                };

                setMatchData(matchData);
            } catch (error) {
                console.error("Error during fetchMatchData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, [matchId]);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-8 w-full">
                <Skeleton className="h-[600px] w-full bg-gray-600" />
            </Card>
        );
    }

    const toggleData = () => {
        setShowGold(!showGold);
    };

    if (!matchData) {
        return (
            <Card className="bg-gray-800 p-8">
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const radiantPlayers = matchData.players.filter(p => p.isRadiant);
    const direPlayers = matchData.players.filter(p => !p.isRadiant);

    const graphData = matchData.radiantNetworthLeads.map((goldValue, index) => ({
        time: index,
        gold: goldValue,
        experience: matchData.radiantExperienceLeads[index],  // добавляем опыт
    }));

    return (
        <div className="bg-gray-800 text-white rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <div className="flex items-center gap-4">
                    <Sun className="h-8 w-8 text-green-500" />
                    <div>
                        <h2 className="text-xl font-bold">Свет</h2>
                        <span className="text-green-500 text-sm">Победа</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-2xl font-bold">
                    <span className="text-green-500">40</span>
                    <span className="text-gray-500">{formatTime(matchData.durationSeconds)}</span>
                    <span className="text-red-500">28</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <h2 className="text-xl font-bold">Тьма</h2>
                        <span className="text-red-500 text-sm">Поражение</span>
                    </div>
                    <Moon className="h-8 w-8 text-red-500" />
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 p-4">
                {/* Left Column - Players */}
                <div className="space-y-2">
                    {radiantPlayers.map((player, index) => (
                        <PlayerCard key={index} player={player} side="radiant" />
                    ))}
                </div>

                {/* Middle Column - Graph */}
                <div className="bg-gray-900 rounded-lg p-4">
                    <div>
                        {/* Toggle button */}
                        <button onClick={toggleData} className="toggle-button font-bold text-lg">
                            {showGold ? 'Показать Опыт' : 'Показать Золото'}
                        </button>

                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#666"
                                    tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`}
                                />
                                <YAxis 
                                    stroke="#666" 
                                    domain={['dataMin', 'dataMax']} // Центрируем график по 0
                                >
                                    <Label
                                        value="Тьма"
                                        position="insideBottomLeft"
                                        style={{ textAnchor: 'middle', fill: '#ccc' }}
                                    />
                                    <Label
                                        value="Свет"
                                        position="insideTopLeft"
                                        style={{ textAnchor: 'middle', fill: '#ccc' }}
                                    />
                                </YAxis>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#2a2a2a', border: 'none' }}
                                    labelFormatter={(value) => `Time: ${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`}
                                />
                                <ReferenceLine y={0} stroke="#ccc" strokeDasharray="3 3" /> {/* Baseline at 0 */}

                                {/* Conditional line for gold or experience */}
                                {showGold ? (
                                    <Line
                                        type="monotone"
                                        dataKey="gold"
                                        stroke="#FFD700"  // Gold color
                                        dot={false}
                                        strokeWidth={2}
                                        name="Показатели преимущества золота"
                                    />
                                ) : (
                                    <Line
                                        type="monotone"
                                        dataKey="experience"
                                        stroke="#1E90FF"  // Blue color
                                        dot={false}
                                        strokeWidth={2}
                                        name="Показатели преимущества опыта"
                                    />
                                )}

                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>  


                {/* Right Column - Players */}
                <div className="space-y-2">
                    {direPlayers.map((player, index) => (
                        <PlayerCard key={index} player={player} side="dire" />
                    ))}
                </div>
            </div>

            {/* Footer - Match Info */}
            <div className="border-t border-gray-800 p-4 flex items-center justify-between text-sm text-gray-400">
                <div>Match ID: {matchId}</div>
                <div className="flex flex-row items-center gap-x-4">Средний ранг: 
                    <Image src={`/ranks/${matchData.rank}.webp`} alt="rank" width={80} height={80} />
                </div>
            </div>
        </div>
    );
};

export default MainInfoCard;

