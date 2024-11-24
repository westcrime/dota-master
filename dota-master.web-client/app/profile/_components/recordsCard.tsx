'use client'

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from 'next/image';
import cookieSession from "cookie-session";
import { cookies } from "next/headers";

interface RecordsData {
    Kills: number,
    AvgKills: number,
    Deaths: number,
    AvgDeaths: number,
    Assists: number,
    AvgAssists: number,
    Gold: number,
    AvgGold: number,
    Xp: number,
    AvgXp: number,
    LastHits: number,
    AvgLastHits: number,
    Denies: number,
    AvgDenies: number,
    HeroDamage: number,
    AvgHeroDamage: number,
    TowerDamage: number,
    AvgTowerDamage: number,
    HeroHealing: number,
    AvgHeroHealing: number
}

interface Element {
    iconUrl: string,
    mainText: string,
    secondaryText: string
}

export const RecordsCard = () => {
    const [recordsData, setRecordsData] = useState<RecordsData | null>(null);
    const [elements, setElements] = useState<Element[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRecordsData = async () => {
            setLoading(true);
            console.log("Starting fetchRecordsData..."); // Лог начала вызова
    
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/profile/records`;
                console.log(`Fetching data from: ${url}`); // Лог URL запроса
                
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include'
                });
                console.log(`Response status: ${response.status}`);
    
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(`${errorData.status}: ${errorData.title} - ${errorData.detail}`);
                    throw new Error(`${errorData.status}: ${errorData.detail}`);
                }                
                
                const data = await response.json();
                console.log("Fetched data:", data);
                
                setRecordsData({
                    Kills: data.kills,
                    AvgKills: data.avgKills,
                    Deaths: data.deaths,
                    AvgDeaths: data.avgDeaths,
                    Assists: data.assists,
                    AvgAssists: data.avgAssists,
                    Gold: data.gold,
                    AvgGold: data.avgGold,
                    Xp: data.xp,
                    AvgXp: data.avgXp,
                    LastHits: data.lastHits,
                    AvgLastHits: data.avgLastHits,
                    Denies: data.denies,
                    AvgDenies: data.avgDenies,
                    HeroDamage: data.heroDamage,
                    AvgHeroDamage: data.avgHeroDamage,
                    TowerDamage: data.towerDamage,
                    AvgTowerDamage: data.avgTowerDamage,
                    HeroHealing: data.heroHealing,
                    AvgHeroHealing: data.avgHeroHealing
                });
            } catch (error) {
                console.error("Error during fetchRecordsData:", error); // Лог ошибок
            } finally {
                setLoading(false);
                console.log("Loading state set to false."); // Лог завершения загрузки
            }
        };
    
        fetchRecordsData();
    }, []);  

    useEffect(() => {
        setLoading(true);
        if (recordsData) {
            console.log(recordsData); // Теперь данные обновлены
            
            setElements(
                [
                    { iconUrl: 'killsIcon.png', mainText: `Среднее кол-во убийств: ${recordsData?.AvgKills}`, secondaryText: `Общее кол-во убийств: ${recordsData?.Kills}` },
                    { iconUrl: 'deathsIcon.png', mainText: `Среднее кол-во смертей: ${recordsData?.AvgDeaths}`, secondaryText: `Общее кол-во смертей: ${recordsData?.Deaths}` },
                    { iconUrl: 'assistsIcon.png', mainText: `Среднее кол-во ассистов: ${recordsData?.AvgAssists}`, secondaryText: `Общее кол-во ассистов: ${recordsData?.Assists}` },
                    { iconUrl: 'goldIcon.png', mainText: `Среднее золото в минуту: ${recordsData?.AvgGold}`, secondaryText: `Общее золота: ${recordsData?.Gold}` },
                    { iconUrl: 'xpIcon.png', mainText: `Среднее опыта в минуту: ${recordsData?.AvgXp}`, secondaryText: `Общее кол-во опыта: ${recordsData?.Xp}` },
                    { iconUrl: 'lastHitsIcon.png', mainText: `Среднее кол-во добитых крипов: ${recordsData?.AvgLastHits}`, secondaryText: `Общее кол-во убийств: ${recordsData?.LastHits}` },
                    { iconUrl: 'deniesIcon.png', mainText: `Среднее кол-во неотданных крипов: ${recordsData?.AvgDenies}`, secondaryText: `Общее кол-во неотданных крипов: ${recordsData?.Denies}` },
                    { iconUrl: 'heroDamageIcon.png', mainText: `Среднее кол-во урона по героям: ${recordsData?.AvgHeroDamage}`, secondaryText: `Общее кол-во урона по героям: ${recordsData?.HeroDamage}` },
                    { iconUrl: 'towerDamageIcon.png', mainText: `Среднее кол-во урона по строениям: ${recordsData?.AvgTowerDamage}`, secondaryText: `Общее кол-во урона по строениям: ${recordsData?.TowerDamage}` },
                    { iconUrl: 'heroHealingIcon.png', mainText: `Среднее кол-во лечения союзников: ${recordsData?.AvgHeroHealing}`, secondaryText: `Общее кол-во лечения союзников: ${recordsData?.HeroHealing}` },
                ]
            )

            console.log("Player data updated successfully.");
        }
        setLoading(false);
    }, [recordsData]);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-8 flex space-x-4 w-1/2">
                <Skeleton className="w-160 h-80 bg-gray-600" />
            </Card>
        );
    }

    if (!recordsData || !elements) {
        return (
            <Card className="bg-gray-800 p-8">
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 p-8 flex flex-col space-y-4 w-1/2">
            <h2 className="text-xl font-bold text-white mb-4">Рекорды</h2>
            <div className="grid grid-cols-2 gap-4">
                {elements?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <Image src={`/records/${item.iconUrl}`} alt={item.mainText} width={40} height={40} />
                        <div className="flex flex-col">
                            <span className="text-white font-bold">{item.mainText}</span>
                            <span className="text-sm text-gray-400">{item.secondaryText}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}