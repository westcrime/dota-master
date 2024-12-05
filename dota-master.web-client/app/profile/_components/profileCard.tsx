'use client';

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { error } from "console";

export interface ProfileData {
    steamUrl: string;
}

interface PlayerData {
    nickname: string;
    id: string;
    avatar: string;
    dotaId: string;
}

export const ProfileCard = ({ steamUrl }: ProfileData) => {
    const [playerData, setPlayerData] = useState<PlayerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/profile`;
                console.log(`[ProfileCard] - Fetching data from: ${url}`); // Лог URL запроса
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include'
                });
                console.log(`[ProfileCard] - Response status: ${response.status}`); // Лог статуса ответа
    
                if (!response.ok) {
                    const errorData = await response.json(); // Получаем подробности ошибки
                    setError(`${errorData.status}: ${errorData.title} - ${errorData.detail}`);
                    throw new Error(`${errorData.status}: ${errorData.detail}`);
                }   
                
                const data = await response.json();
                console.log("[ProfileCard] - Fetched data:", data); // Лог данных ответа
                setPlayerData({
                    nickname: data.username,
                    id: data.steamId,
                    avatar: data.avatarUrl,
                    dotaId: data.dotaId
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
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
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-800 p-2 flex space-x-4">
            <div>
                <h2 className="text-base text-start font-bold">{playerData.nickname}</h2>
                <p className="text-sm text-start text-gray-400">DotaID: {playerData.dotaId}</p>
            </div>
            <Avatar className="h-10 w-10">
                <AvatarImage src={playerData.avatar} alt={playerData.nickname} />
                <AvatarFallback>{playerData.nickname.slice(0, 2)}</AvatarFallback>
            </Avatar>
        </Card>
    );
};
