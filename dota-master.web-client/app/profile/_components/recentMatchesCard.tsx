'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "lucide-react";
import { useEffect, useState } from "react";
import Link from 'next/link';

export interface Hero {
    id: number,
    name: string,
    localizedName: string
}

export interface RecentMatchesStats {
    matchId: string,
    isWin: boolean,
    duration: string,
    heroId: number,
    heroPortraitUrl: string,
    heroName: string,
    kills: number,
    deaths: number,
    assists: number
}

export const RecentMatchesCard: React.FC = () => {
    const [recentMatchesStats, setRecentMatchesStats] = useState<RecentMatchesStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHeroesInformation = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/heroes`;
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
                const heroesData: Hero[] = data;

                return heroesData
            } catch (error) {
                console.error("Error during fetchRecentHeroesData:", error);
            }
        }

        const fetchRecentMatchesData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/profile/matches-basic-info`;
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
                const recentMatchesData: RecentMatchesStats[] = data.map((match: { heroId: number; }) => ({
                    ...match,
                    heroPortraitUrl: `${process.env.NEXT_PUBLIC_HERO_PORTRAITS_DOMAIN}/${heroes?.find(h => h.id == match.heroId)?.name.replace("npc_dota_hero_", "")}.png`,
                    heroName: heroes?.find(h => h.id == match.heroId)?.localizedName
                }));

                setRecentMatchesStats(recentMatchesData);
            } catch (error) {
                console.error("Error during fetchRecentMatchesData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentMatchesData();
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

    return (
        <Card className="bg-gray-800 w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Недавние матчи</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {recentMatchesStats.map((match) => (
                        <li key={match.matchId}>
                            <Link href={`/matches/${match.matchId}`} passHref>
                                <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-600 transition">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16"> 
                                            <AvatarImage src={match.heroPortraitUrl} alt={match.heroName} className="object-cover" />
                                            <AvatarFallback>{match.heroName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{match.heroName}</h3>
                                            <p className="text-sm text-gray-300">Match ID: {match.matchId}</p>
                                            <p className="text-sm text-gray-300">Длительность: {match.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-white">{match.kills}/{match.deaths}/{match.assists}</p>
                                            <p className="text-xs text-gray-400">K/D/A</p>
                                        </div>
                                        <div
                                            className={`text-sm font-semibold ${match.isWin ? "text-green-500" : "text-red-500"}`}
                                        >
                                            {match.isWin ? "Победа" : "Поражение"}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>);
}