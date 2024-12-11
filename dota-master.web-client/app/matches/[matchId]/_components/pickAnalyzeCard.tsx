'use client'

import { useEffect, useState } from "react";
import { GetHeroes, Hero } from "../_services/getHeroes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';

export interface WinrateMatchup {
    winrate: number,
    hero: Hero
}

export interface PickAnalyze {
    hero: Hero,
    heroWinrate: number,
    heroWrWithAlliedHeroes: WinrateMatchup[],
    heroWrWithEnemyHeroes: WinrateMatchup[],
    pickAdvice: string 
}

const WinrateBar = ({ winrate }: { winrate: number }) => {
    const width = Math.abs(winrate - 50) * 2;
    const isPositive = winrate >= 50;
    const color = isPositive ? 'bg-green-500' : 'bg-red-500';
    const position = isPositive ? 'left-1/2' : 'right-1/2';

    return (
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
                className={`h-full ${color} ${position}`} 
                style={{ width: `${width}%` }}
            ></div>
        </div>
    );
};

const HeroMatchup = ({ matchup }: { matchup: WinrateMatchup }) => (
    <div className="flex items-center space-x-2 mb-2">
        <Avatar className="h-12 w-12">
            <AvatarImage src={matchup.hero.heroPortraitUrl} alt={matchup.hero.localizedName} className="object-cover"/>
            <AvatarFallback>{matchup.hero.localizedName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm flex-grow">{matchup.hero.localizedName}</span>
        <span className={`text-sm font-bold ${matchup.winrate >= 50 ? 'text-green-500' : 'text-red-500'}`}>
            {matchup.winrate.toFixed(2)}%
        </span>
        <WinrateBar winrate={matchup.winrate} />
    </div>
);

const PickAnalyzeCard = ({ matchId }: { matchId: string }) => {
    const [pickAnalyzeData, setPickAnalyzeData] = useState<PickAnalyze | null>(null);
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

        const fetchPickData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/matches/pick-analyze?matchId=${matchId}`;
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

                const pickData: PickAnalyze = {
                    hero: heroes!.find(hero => hero.id == data.heroId)!,
                    heroWinrate: data.heroWinrate * 100.0,
                    pickAdvice: data.pickAdvice,
                    heroWrWithAlliedHeroes: data.heroWrWithAlliedHeroes.map((matchup: { winrate: number, heroId: number }) => ({
                        winrate: matchup.winrate * 100.0,
                        hero: heroes!.find(hero => hero.id == matchup.heroId)!
                    })),
                    heroWrWithEnemyHeroes: data.heroWrWithEnemyHeroes.map((matchup: { winrate: number, heroId: number }) => ({
                        winrate: matchup.winrate * 100.0,
                        hero: heroes!.find(hero => hero.id == matchup.heroId)!
                    }))
                };                              

                setPickAnalyzeData(pickData);
            } catch (error) {
                console.error("Error during fetchPickData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPickData();
    }, [matchId]);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-8 w-full">
                <Skeleton className="h-[600px] w-full bg-gray-600" />
            </Card>
        );
    }

    if (!pickAnalyzeData) {
        return (
            <Card className="bg-gray-800 p-8">
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 text-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Анализ вашего пика</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <h2>Данные взяты с этого рейтинга за последнее время</h2>
                    <div className="flex flex-row gap-x-8 mx-16 items-center">
                        {/* Абзац для совета */}
                        <div className="text-gray-200 text-xl font-bold max-w-lg">
                            <p> &emsp; {pickAnalyzeData.pickAdvice}</p>
                        </div>

                        {/* Картинка */}
                        <img 
                            src={`${process.env.NEXT_PUBLIC_HERO_PORTRAITS_DOMAIN}/${pickAnalyzeData.hero.name.replace("npc_dota_hero_", "")}.png`} 
                            alt="Picture for pick advice" 
                            height={200} 
                            width={300} 
                            className="object-contain"
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Винрейт вашего героя</h3>
                        <div className="flex items-center space-x-4">
                            <span className={`text-2xl font-bold ${pickAnalyzeData.heroWinrate >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                                {pickAnalyzeData.heroWinrate.toFixed(2)}%
                            </span>
                            <WinrateBar winrate={pickAnalyzeData.heroWinrate} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Синергия с героями-союзниками</h3>
                        <div className="space-y-2">
                            {pickAnalyzeData.heroWrWithAlliedHeroes.map((matchup, index) => (
                                <HeroMatchup key={index} matchup={matchup} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Матчап против героев-врагов</h3>
                        <div className="space-y-2">
                            {pickAnalyzeData.heroWrWithEnemyHeroes.map((matchup, index) => (
                                <HeroMatchup key={index} matchup={matchup} />
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PickAnalyzeCard;
