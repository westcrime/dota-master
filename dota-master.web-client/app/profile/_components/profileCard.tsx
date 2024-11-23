'use client';

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProfileData {
    steamUrl: string;
}

interface PlayerData {
    nickname: string;
    id: string;
    avatar: string;
}

export const ProfileCard = ({ steamUrl }: ProfileData) => {
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
                        nickname: "westcrime",
                        id: "76561198286045701",
                        avatar: "https://avatars.fastly.steamstatic.com/c5b759768d84a4b83c332b52dfa79c2e299ad74c_full.jpg",
                    });
            setLoading(false)
        };

        fetchPlayerData();
    }, [steamUrl]);

    if (loading) {
        return (
            <Card className="bg-gray-800 p-2 flex space-x-4">
                <div className="flex flex-col space-y-2 w-full">
                    <Skeleton className="h-4 w-40 bg-gray-600" /> {/* Заглушка для имени */}
                    <Skeleton className="h-4 w-40 bg-gray-600" /> {/* Заглушка для ID */}
                </div>
                <Skeleton className="w-16 h-12 rounded-full bg-gray-600 " /> {/* Заглушка для аватара */}
            </Card>
        );
    }

    if (!playerData) {
        return (
            <Card className="bg-gray-800 p-2">
                <p className="text-red-500">Не удалось загрузить данные</p>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 p-2 flex space-x-4">
            <div>
                <h2 className="text-base text-start font-bold">{playerData.nickname}</h2>
                <p className="text-sm text-start text-gray-400">ID: {playerData.id}</p>
            </div>
            <Avatar className="h-10 w-10">
                <AvatarImage src={playerData.avatar} alt={playerData.nickname} />
                <AvatarFallback>{playerData.nickname.slice(0, 2)}</AvatarFallback>
            </Avatar>
        </Card>
    );
};
