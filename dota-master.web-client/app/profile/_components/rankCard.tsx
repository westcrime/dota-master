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
}

export const RankCard = ({ steamUrl }: ProfileData) => {
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayerData = async () => {
            // try {
            //     const response = await fetch(`/api/steam?url=${encodeURIComponent(steamUrl)}`);
            //     if (!response.ok) throw new Error("Ошибка загрузки данных");
            //     const data = await response.json();
            //     setPlayerData({
            //         nickname: data.nickname,
            //         id: data.id,
            //         avatar: data.avatar,
            //     });
            // } catch (error) {
            //     console.error(error);
            // } finally {
            //     setLoading(false);
            // }
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 200));
            setPlayerData({
                        rank: "Divine",
                        rankImage: "https://gamepedia.cursecdn.com/dota2_gamepedia/thumb/b/b7/SeasonalRank7-1.png/140px-SeasonalRank7-1.png?version=8cd74e57b63ceb730d7b36a8f6589b9f",
                        winCount: 1423,
                        loseCount: 1350
                    });
            setLoading(false)
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