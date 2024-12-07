'use client';

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface RecentHeroesStats {
    heroId: number,
    name: string,
    matchCount: number,
    winCount: number,
    avgKills: number,
    avgDeaths: number,
    avgAssists: number,
    avgGpm: number,
    avgXpm: number,
    impact: number,
    heroPortraitUrl: string
}

interface CustomTooltipProps extends TooltipProps<number, string> {
    recentHeroesStats: RecentHeroesStats[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, recentHeroesStats }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const heroName = data.name
            .replace("npc_dota_hero_", "")
            .split("_")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        const hero = recentHeroesStats.find(hero => hero.name === data.name);
        const impact = hero?.impact || 0;
        const impactColor = impact >= 0 ? 'text-green-500' : 'text-red-500';

        return (
            <div className="bg-gray-800 p-2 rounded shadow-lg">
                <p className="font-bold text-white">{heroName}</p>
                <p className="text-gray-300">Matches: {data.value}</p>
                <p className={`font-semibold ${impactColor}`}>
                    Impact: {impact.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

export const RecentHeroesCard: React.FC = () => {
    const [recentHeroesStats, setRecentHeroesStats] = useState<RecentHeroesStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecentHeroesData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/profile/recent-hero-stats`;
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
                const recentHeroesData: RecentHeroesStats[] = data.map((hero: { name: string; }) => ({
                    ...hero,
                    heroPortraitUrl: `${process.env.NEXT_PUBLIC_HERO_PORTRAITS_DOMAIN}/${hero.name.replace("npc_dota_hero_", "")}.png`
                }));

                setRecentHeroesStats(recentHeroesData);
            } catch (error) {
                console.error("Error during fetchRecentHeroesData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentHeroesData();
    }, []);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-8 w-full">
                <Skeleton className="h-64 w-full bg-gray-600" />
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-gray-800 p-8 w-full">
                <CardContent>
                    <p className="text-red-500">{error}</p>
                </CardContent>
            </Card>
        );
    }

    const pieChartData = recentHeroesStats.map(hero => ({
        name: hero.name,
        value: hero.matchCount,
        impact: hero.impact
    }));

    return (
        <Card className="bg-gray-800 p-8 w-1/2 mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Недавние перфомансы</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-8">
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name
                                        .replace("npc_dota_hero_", "")
                                        .split("_")
                                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip recentHeroesStats={recentHeroesStats} />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-full mt-8 md:mt-0">
                        <ul className="space-y-4">
                            {recentHeroesStats.map(hero => (
                                <li key={hero.heroId} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={hero.heroPortraitUrl} alt={hero.name} className="object-cover" />
                                        <AvatarFallback>{hero.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{hero.name.replace("npc_dota_hero_", "").split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h3>
                                        <p className="text-sm text-gray-300">Матчи: {hero.matchCount} | Победы: {hero.winCount}</p>
                                        <p className="text-sm text-gray-300">KDA: {hero.avgKills.toFixed(0)}/{hero.avgDeaths.toFixed(0)}/{hero.avgAssists.toFixed(0)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

