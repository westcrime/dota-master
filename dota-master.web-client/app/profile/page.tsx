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
				<RankCard steamUrl={playerData.id}/>

				<Card className="bg-gray-800 p-6 mb-8">
					<h3 className="text-2xl font-bold mb-4">Most Played Heroes</h3>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
						{playerData.topHeroes.map((hero, index) => (
						<div key={index} className="text-center">
							<img
							src={hero.image}
							alt={hero.name}
							className="mx-auto mb-2 cursor-pointer"
							onClick={() => setExpandedHero(expandedHero === index ? null : index)}
							/>
							<p>{hero.name}</p>
							{expandedHero === index && (
							<div className="mt-2">
								<p>Games: {hero.gamesPlayed}</p>
								<p>Winrate: {hero.winrate}%</p>
							</div>
							)}
						</div>
						))}
					</div>
				</Card>
			</div>

			<Card className="bg-gray-800 p-6 mb-8">
			<h3 className="text-2xl font-bold mb-4">Player Records</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div>
				<p className="font-bold">GPM</p>
				<p>{playerData.records.gpm}</p>
				</div>
				<div>
				<p className="font-bold">Kills</p>
				<p>{playerData.records.kills}</p>
				</div>
				<div>
				<p className="font-bold">Assists</p>
				<p>{playerData.records.assists}</p>
				</div>
				<div>
				<p className="font-bold">Last Hits</p>
				<p>{playerData.records.lastHits}</p>
				</div>
			</div>
			</Card>

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