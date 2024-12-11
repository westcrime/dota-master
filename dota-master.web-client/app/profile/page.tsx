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
import { RecentMatchesCard } from "./_components/recentMatchesCard";

const Profile = () => {

    return (
        <>
			<div className="flex p-0 m-0 flex-row space-x-4">
					<div className="flex p-0 m-0 flex-col space-y-4 w-1/2">
						<RankCard/>

						<RecordsCard/>
						<RecentMatchesCard/>
					</div>
				
				<RecentHeroesCard/>
			</div>

        </>
    )
}

export default Profile;