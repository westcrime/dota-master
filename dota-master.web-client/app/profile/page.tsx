'use client'

import Logo from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ProfileCard } from "./_components/profileCard";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { RankCard } from "./_components/rankCard";
import { RecordsCard } from "./_components/recordsCard";
import { RecentHeroesCard } from "./_components/recentHeroesCard";

// Mock data - replace with actual API calls
const playerData = {
    nickname: 'ProGamer123',
    id: '76561198123456789',
    avatar: 'https://avatars.fastly.steamstatic.com/c5b759768d84a4b83c332b52dfa79c2e299ad74c_full.jpg',
    rank: {
      name: 'Divine',
      image: '/placeholder.svg?height=100&width=100'
    },
    winrate: {
      percentage: 55.5,
      wins: 1000,
      losses: 800
    },
    topHeroes: [
      { name: 'Invoker', image: '/placeholder.svg?height=60&width=60', gamesPlayed: 500, winrate: 60 },
      { name: 'Pudge', image: '/placeholder.svg?height=60&width=60', gamesPlayed: 400, winrate: 55 },
      { name: 'Anti-Mage', image: '/placeholder.svg?height=60&width=60', gamesPlayed: 300, winrate: 58 },
      { name: 'Shadow Fiend', image: '/placeholder.svg?height=60&width=60', gamesPlayed: 250, winrate: 52 },
      { name: 'Juggernaut', image: '/placeholder.svg?height=60&width=60', gamesPlayed: 200, winrate: 57 }
    ],
    records: {
      gpm: 1200,
      kills: 35,
      assists: 42,
      lastHits: 1500
    },
    recentMatches: [
      { id: '1234567890', hero: 'Invoker', result: 'Win', kda: '10/2/15' },
      { id: '1234567891', hero: 'Anti-Mage', result: 'Loss', kda: '5/7/3' },
      { id: '1234567892', hero: 'Pudge', result: 'Win', kda: '8/4/20' },
      { id: '1234567893', hero: 'Shadow Fiend', result: 'Win', kda: '15/3/10' },
      { id: '1234567894', hero: 'Juggernaut', result: 'Loss', kda: '6/8/7' },
      { id: '1234567895', hero: 'Invoker', result: 'Win', kda: '12/1/18' },
      { id: '1234567896', hero: 'Pudge', result: 'Win', kda: '7/5/22' },
      { id: '1234567897', hero: 'Anti-Mage', result: 'Loss', kda: '4/6/2' },
      { id: '1234567898', hero: 'Shadow Fiend', result: 'Win', kda: '14/2/9' },
      { id: '1234567899', hero: 'Juggernaut', result: 'Win', kda: '11/3/8' }
    ]
}

const Profile = () => {
    const [expandedHero, setExpandedHero] = useState<number | null>(null)

	const handleLogout = () => {
	};

    return (
        <>
			<div className="flex p-0 m-0 flex-row space-x-4">
				<div className="flex p-0 m-0 flex-col space-y-4 w-1/2">
					<RankCard/>

					<RecordsCard/>
				</div>
				
				<RecentHeroesCard/>
			</div>

			<Card className="bg-gray-800 p-6">
			<h3 className="text-2xl font-bold mb-4">Recent Matches</h3>
			<div className="space-y-2">
				{playerData.recentMatches.map((match, index) => (
				<a
					key={index}
					href={`/match/${match.id}`}
					className="block bg-gray-700 p-2 rounded hover:bg-gray-600 transition-colors"
				>
					<div className="flex justify-between items-center">
					<span>{match.hero}</span>
					<Badge variant={match.result === 'Win' ? 'default' : 'destructive'}>
						{match.result}
					</Badge>
					<span>{match.kda}</span>
					</div>
				</a>
				))}
			</div>
			</Card>
        </>
    )
}

export default Profile;