'use client'

import { useEffect, useState } from "react";
import { GetHeroes, Hero } from "../_services/getHeroes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sword, Skull, Coins, ChevronUp, ChevronDown, Minus, Zap, Target, Shield } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PerfomanceAnalyze {
    playerPerfomance: PlayerPerfomance,
    avgHeroPerfomance: AvgHeroPerfomance,
    advice: string
}

export interface PlayerPerfomance {
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
    imp: number
}

export interface AvgHeroPerfomance {
    topCore: number,
    topSupport: number,
    kills: number,
    deaths: number,
    assists: number,
    networth: number,
    xp: number,
    cs: number,
    heroDamage: number,
    goldFed: number,
    xpFed: number
}

const StatComparison = ({ label, value, avgValue, icon: Icon, reverseComparison = false }: { label: string, value: number, avgValue: number, icon: React.ElementType, reverseComparison?: boolean }) => {
    const difference = value - avgValue;
    const percentDifference = ((value - avgValue) / avgValue) * 100;
    let color = 'text-yellow-500';
    let ComparisonIcon = Minus;

    if (!reverseComparison) {
        if (percentDifference > 5) {
            color = 'text-green-500';
            ComparisonIcon = ChevronUp;
        } else if (percentDifference < -5) {
            color = 'text-red-500';
            ComparisonIcon = ChevronDown;
        }
    } else {
        if (percentDifference > 5) {
            color = 'text-red-500';
            ComparisonIcon = ChevronUp;
        } else if (percentDifference < -5) {
            color = 'text-green-500';
            ComparisonIcon = ChevronDown;
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium">{label}:</span>
            <span>{value.toFixed(0)}</span>
            <span className={`flex items-center ${color}`}>
                <ComparisonIcon className="w-4 h-4" />
                {Math.abs(difference).toFixed(1)} ({Math.abs(percentDifference).toFixed(1)}%)
            </span>
        </div>
    );
};

const PercentileBar = ({ value, label }: { value: number, label: string }) => {
    const percentage = value * 100;
    return (
        <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const PerfomanceAnalyzeCard = ({ matchId }: { matchId: string }) => {
    const [perfomanceAnalyzeData, setPerfomanceAnalyzeData] = useState<PerfomanceAnalyze | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

        const fetchPerfomanceData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/matches/perfomance?matchId=${matchId}`;
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(`${errorData.status}: ${errorData.title} - ${errorData.detail}`);
                    throw new Error(`${errorData.status}: ${errorData.detail}`);
                }
        
                const data = await response.json();
                const heroes = await fetchHeroesInformation();
        
                const perfomanceData: PerfomanceAnalyze = {
                    advice: data.advice,
                    playerPerfomance: {
                        ...data.playerPerfomance,
                        hero: heroes!.find((hero) => hero.id === data.playerPerfomance.heroId)!
                    },
                    avgHeroPerfomance: data.avgHeroPerfomance,
                };
        
                setPerfomanceAnalyzeData(perfomanceData);
            } catch (error) {
                console.error("Error during fetchPerfomanceData:", error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchPerfomanceData();
    }, [matchId]);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-8 w-full">
                <Skeleton className="h-[600px] w-full bg-gray-600" />
            </Card>
        );
    }

    if (!perfomanceAnalyzeData) {
        return (
            <Card className="bg-gray-800 p-8">
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    const { playerPerfomance, avgHeroPerfomance, advice } = perfomanceAnalyzeData;

    return (
        <Card className="bg-gray-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Performance Analysis</CardTitle>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={playerPerfomance.hero.heroPortraitUrl} alt={playerPerfomance.hero.localizedName} />
                                <AvatarFallback>{playerPerfomance.hero.localizedName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{playerPerfomance.hero.localizedName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-400">Team: {playerPerfomance.isRadiant ? 'Radiant' : 'Dire'}</p>
                        <p className="text-sm text-gray-400">Impact: {playerPerfomance.imp}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">GPM: {playerPerfomance.goldPerMinute}</p>
                        <p className="text-sm text-gray-400">XPM: {playerPerfomance.experiencePerMinute}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <StatComparison 
                        label="Kills" 
                        value={playerPerfomance.kills} 
                        avgValue={avgHeroPerfomance.kills} 
                        icon={Sword}
                    />
                    <StatComparison 
                        label="Deaths" 
                        value={playerPerfomance.deaths} 
                        avgValue={avgHeroPerfomance.deaths} 
                        icon={Skull}
                        reverseComparison
                    />
                    <StatComparison 
                        label="Assists" 
                        value={playerPerfomance.assists} 
                        avgValue={avgHeroPerfomance.assists} 
                        icon={Shield}
                    />
                    <StatComparison 
                        label="Net Worth" 
                        value={playerPerfomance.networth} 
                        avgValue={avgHeroPerfomance.networth} 
                        icon={Coins}
                    />
                    <StatComparison 
                        label="Last Hits" 
                        value={playerPerfomance.numLastHits} 
                        avgValue={avgHeroPerfomance.cs} 
                        icon={Target}
                    />
                    <StatComparison 
                        label="Hero Damage" 
                        value={avgHeroPerfomance.heroDamage} 
                        avgValue={avgHeroPerfomance.heroDamage} 
                        icon={Zap}
                    />
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Performance Percentiles</h3>
                    <PercentileBar value={avgHeroPerfomance.topCore} label="Top Core" />
                    <PercentileBar value={avgHeroPerfomance.topSupport} label="Top Support" />
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Resources Fed to Enemy</h3>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Gold Fed</p>
                            <p className="text-lg font-semibold">{avgHeroPerfomance.goldFed.toFixed(0)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">XP Fed</p>
                            <p className="text-lg font-semibold">{avgHeroPerfomance.xpFed.toFixed(0)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Performance Advice</h3>
                    <p className="text-sm text-gray-300">{advice}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default PerfomanceAnalyzeCard;