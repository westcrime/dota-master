'use client';

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

export interface ProfileData {
    steamUrl: string;
}

interface PlayerData {
    rank: string;
    rankImage: string;
    winCount: number;
    loseCount: number;
    isDotaPlusSub: boolean;
}

export const RankCard = ({ steamUrl }: ProfileData) => {
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayerData = async () => {
            console.log("Starting fetchPlayerData..."); // Лог начала вызова
    
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/profile/basic-info`;
                console.log(`Fetching data from: ${url}`); // Лог URL запроса
                
                const response = await fetch(url);
                console.log(`Response status: ${response.status}`); // Лог статуса ответа
    
                if (!response.ok) throw new Error(`Failed to fetch data. Status: ${response.status}`);
                
                const data = await response.json();
                console.log("Fetched data:", data); // Лог данных ответа
                
                setPlayerData({
                    winCount: data.wins,
                    loseCount: data.loses,
                    rank: data.rank,
                    isDotaPlusSub: data.isDotaPlusSub,
                    rankImage: "undef"
                });
    
                console.log("Player data updated successfully.");
            } catch (error) {
                console.error("Error during fetchPlayerData:", error); // Лог ошибок
            } finally {
                setLoading(false);
                console.log("Loading state set to false."); // Лог завершения загрузки
            }
        };
    
        fetchPlayerData();
    }, [steamUrl]);    

    if (loading) {
        return (
            <Card className="bg-gray-800 p-6 px-4 flex space-x-4 w-3/4">
                <Skeleton className="h-1/2 w-full bg-gray-600" />
                <Skeleton className="h-1/2 w-full bg-gray-600" />
            </Card>
        );
    }

    if (!playerData) {
        return (
            <Card className="bg-gray-800 px-4 p-6">
                <p className="text-red-500">Не удалось загрузить данные</p>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 p-6 px-36 flex flex-row justify-between w-3/4">
            <img src={playerData.rankImage} className="h-30 w-30" />
            <div className="flex flex-col space-y-2">
                <h2 className="text-xl font-bold text-white">Статистика игр</h2>

                {/* Полоска прогресса */}
                <div className="w-full bg-red-800 h-4 rounded-full overflow-hidden">
                    <div
                        className="bg-green-500 h-full"
                        style={{ width: `${(playerData.winCount + playerData.loseCount) > 0 ? ((playerData.winCount / (playerData.loseCount + playerData.winCount)) * 100).toFixed(2) : "0"}%` }}
                    ></div>
                </div>

                {/* Текстовые данные */}
                <div className="flex justify-between space-x-2 w-full text-lg text-gray-300">
                    <span className="text-green-500">Победы: {playerData.winCount}</span>
                    <span className="text-red-500">Поражения: {playerData.loseCount}</span>
                </div>

                {/* Общая информация */}
                <p className="text-lg text-gray-300">
                    Всего игр: <span className="text-white font-bold">{playerData.winCount + playerData.loseCount}</span>
                </p>
                <p className="text-lg text-gray-300">
                    Процент побед: <span className="text-green-400 font-bold">{(playerData.winCount + playerData.loseCount) > 0 ? ((playerData.winCount / (playerData.loseCount + playerData.winCount)) * 100).toFixed(2) : "0"}%</span>
                </p>
            </div>
        </Card>
    );
}