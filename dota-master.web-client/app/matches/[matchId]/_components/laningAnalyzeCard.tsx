'use client'

import { useEffect, useState } from "react";
import { GetHeroes, Hero } from "../_services/getHeroes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sword, Skull, Coins, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface LaningAnalyze {
    matchId: string,
    position: string,
    rank: string,
    hero: Hero,
    dotaId: string,
    laningCs: number,
    avgLaningCs: number,
    csAdvice: string,
    laningKills: number,
    avgLaningKills: number,
    laningDeaths: number,
    avgLaningDeaths: number,
    kdaAdvice: string,
    laningNetworth: number,
    avgLaningNetworth: number,
    networthAdvice: string
} 

const StatComparison = ({ label, value, avgValue, icon: Icon }: { label: string, value: number, avgValue: number, icon: React.ElementType }) => {
    const difference = value - avgValue;
    const percentDifference = ((value - avgValue) / avgValue) * 100;
    let color = 'text-yellow-500';
    let ComparisonIcon = Minus;

    if (label == 'Deaths') {
        if (percentDifference > 5) {
            color = 'text-red-500';
            ComparisonIcon = ChevronUp;
        } else if (percentDifference < -5) {
            color = 'text-green-500';
            ComparisonIcon = ChevronDown;
        }
    } else {
        if (percentDifference > 5) {
            color = 'text-green-500';
            ComparisonIcon = ChevronUp;
        } else if (percentDifference < -5) {
            color = 'text-red-500';
            ComparisonIcon = ChevronDown;
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-gray-300">
                {label === 'Deaths' && 'Смерти'}
                {label === 'Kills' && 'Убийства'}
                {label === 'CS' && 'Добитые крипы'}
                {label === 'Networth' && 'Общая ценность'}
                {!['Deaths', 'Kills', 'CS', 'Networth'].includes(label) && 'Неизвестно'}
            </span>
            <span className="text-gray-100 font-bold">{value.toFixed(0)}</span>
            <span className={`flex items-center ${color}`}>
                <ComparisonIcon className="w-4 h-4" />
                {Math.abs(difference).toFixed(1)} ({Math.abs(percentDifference).toFixed(1)}%)
            </span>
        </div>
    );
};

const AdviceSection = ({ title, advice }: { title: string, advice: string }) => (
    <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-lg text-gray-300">{advice}</p>
    </div>
);

const LaningAnalyzeCard = ({ matchId }: { matchId: string }) => {
    const [laningAnalyzeData, setLaningAnalyzeData] = useState<LaningAnalyze | null>(null);
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

        const fetchLaningData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/matches/laning-analyze?matchId=${matchId}`;
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

                const laningData: LaningAnalyze = {
                    ...data,
                    hero: heroes!.find(hero => hero.id == data.heroId)!
                };                              

                setLaningAnalyzeData(laningData);
            } catch (error) {
                console.error("Error during fetchLaningData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLaningData();
    }, [matchId]);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-8 w-full">
                <Skeleton className="h-[600px] w-full bg-gray-600" />
            </Card>
        );
    }

    if (!laningAnalyzeData) {
        return (
            <Card className="bg-gray-800 p-8">
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Анализ лайнинга</CardTitle>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={laningAnalyzeData.hero.heroPortraitUrl} alt={laningAnalyzeData.hero.localizedName} className="object-cover"/>
                                <AvatarFallback>{laningAnalyzeData.hero.localizedName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{laningAnalyzeData.hero.localizedName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-400">Позиция: 
                            {laningAnalyzeData.position === 'POSITION_1' && ' Керри'}
                            {laningAnalyzeData.position === 'POSITION_2' && ' Мидер'}
                            {laningAnalyzeData.position === 'POSITION_3' && ' Хардлайнер'}
                            {laningAnalyzeData.position === 'POSITION_4' && ' Поддержка'}
                            {laningAnalyzeData.position === 'POSITION_5' && ' Полная поддержка'}
                            {!['POSITION_1', 'POSITION_2', 'POSITION_3', 'POSITION_4', 'POSITION_5'].includes(laningAnalyzeData.position) && 'Неизвестно'}
                        </p>
                        <p className="text-sm text-gray-400">Ранг:
                            {laningAnalyzeData.rank === 'UNCALIBRATED' && ' Не откалиброван'}
                            {laningAnalyzeData.rank === 'HERALD_GUARDIAN' && ' Рекрут / Страж'}
                            {laningAnalyzeData.rank === 'CRUSADER_ARCHON' && ' Рыцарь / Герой'}
                            {laningAnalyzeData.rank === 'LEGEND_ANCIENT' && ' Легенда / Властелин'}
                            {laningAnalyzeData.rank === 'DIVINE_IMMORTAL' && ' Божество / Титан'}
                            {!['UNCALIBRATED', 'HERALD_GUARDIAN', 'CRUSADER_ARCHON', 'LEGEND_ANCIENT', 'DIVINE_IMMORTAL'].includes(laningAnalyzeData.rank) && 'Неизвестно'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Match ID: {laningAnalyzeData.matchId}</p>
                        <p className="text-sm text-gray-400">Dota ID: {laningAnalyzeData.dotaId}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <StatComparison 
                        label="CS" 
                        value={laningAnalyzeData.laningCs} 
                        avgValue={laningAnalyzeData.avgLaningCs} 
                        icon={Sword}
                    />
                    <StatComparison 
                        label="Kills" 
                        value={laningAnalyzeData.laningKills} 
                        avgValue={laningAnalyzeData.avgLaningKills} 
                        icon={Sword}
                    />
                    <StatComparison 
                        label="Deaths" 
                        value={laningAnalyzeData.laningDeaths} 
                        avgValue={laningAnalyzeData.avgLaningDeaths} 
                        icon={Skull}
                    />
                    <StatComparison 
                        label="Networth" 
                        value={laningAnalyzeData.laningNetworth} 
                        avgValue={laningAnalyzeData.avgLaningNetworth} 
                        icon={Coins}
                    />
                </div>

                <AdviceSection title="Совет по фарму" advice={laningAnalyzeData.csAdvice} />
                <AdviceSection title="Совет по файтам" advice={laningAnalyzeData.kdaAdvice} />
                <AdviceSection title="Совет по золоту" advice={laningAnalyzeData.networthAdvice} />
            </CardContent>
        </Card>
    );
};

export default LaningAnalyzeCard;