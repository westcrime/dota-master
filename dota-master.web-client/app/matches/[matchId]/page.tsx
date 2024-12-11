'use client';

import { useEffect, useState } from "react";
import MatchInfoCard from "./_components/mainInfoCard";
import PickAnalyzeCard from "./_components/pickAnalyzeCard";
import LaningAnalyzeCard from "./_components/laningAnalyzeCard";
import PerfomanceAnalyzeCard from "./_components/perfomanceAnalyzeCard";


export default async function Match({
        params,
    }: {
        params: Promise<{ matchId: string }>
    }) {
    const matchId = (await params).matchId
    

    return (
        <>
            <PickAnalyzeCard matchId={matchId}/>
            <LaningAnalyzeCard matchId={matchId}/>
            <PerfomanceAnalyzeCard matchId={matchId}/>
            <MatchInfoCard matchId={matchId}/>
        </>
    )
}