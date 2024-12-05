'use client';
import { Button } from "@/components/ui/button";
import Carousel from "./_components/carousel";
import { ImSteam2 } from "react-icons/im";
import Logo from "@/components/logo";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"  
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SiDota2 } from "react-icons/si";
import { Link } from "lucide-react";

const Welcome = () => {
    const [ steamID, setSteamID ] = useState('')
    const [ error, setError ] = useState('')
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

    const handleLogin = async () => {
        
    }

    return (
        <>
            <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 z-10">
                <a href="/" className="z-10">
                    <div className="flex flex-row">
                        <SiDota2 size={64} className="mr-3"/>
                        <h1 className="text-7xl font-bold">
                            DotaMaster
                        </h1>
                    </div>
                </a>
            </div>
            <div
                className='absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: 'url("welcome-page/background-slate.jpg")' }}
                >
                <div className='flex flex-row w-[50vw] mt-[80vh] items-center z-10'>
                    <h1 className='text-4xl w-[60%] font-bold text-right mr-3'>
                        Let's learn your
                    </h1>
                    <Carousel />
                </div>
                
                <a href={`${backendUrl}/auth/login`}>
                    <Button className='font-bold mt-[3vh] text-lg flex items-center z-10'>
                        <ImSteam2 size={24} className='mr-1' />Log in via Steam ID
                    </Button>
                </a> 
            </div>
        </>
    );
};

export default Welcome;