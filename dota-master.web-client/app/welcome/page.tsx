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

const Welcome = () => {
    const [ steamID, setSteamID ] = useState('')
    const [ error, setError ] = useState('')

    const handleLogin = async () => {

    }

    return (
        <>
            <Logo />
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
                
                <Popover>
                    <PopoverTrigger>
                        <Button className='font-bold mt-[3vh] text-lg flex items-center z-10'>
                            <ImSteam2 size={24} className='mr-1' />Log in via Steam ID
                        </Button>   
                    </PopoverTrigger>
                    <PopoverContent>
                    <div className="mt-4 w-full flex flex-col items-center gap-4">
                        <Label htmlFor="steamID" className="mb-2 text-lg">Enter your <b>Steam ID</b></Label>
                        <Input
                            id="steamID"
                            type="text"
                            value={steamID}
                            onChange={(e) => setSteamID(e.target.value)}
                            placeholder="Enter Steam ID"
                            className="mb-4 px-4 py-2 border rounded w-3/4"
                        />
                        <Button className='font-bold flex items-center' onClick={handleLogin}>
                            Log in
                        </Button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
};

export default Welcome;
