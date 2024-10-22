'use client'

import { Button } from "@/components/ui/button";
import Carousel from "./_components/carousel";
import { ImSteam, ImSteam2 } from "react-icons/im";

const Welcome = () => {
    return (
        <>
            <h1 className="absolute left-4 top-4 text-6xl">
                DotaMaster
            </h1>
            <div
                className='absolute w-full h-[90vh] flex flex-col items-center justify-center bg-contain bg-center bg-no-repeat'
                style={{ backgroundImage: 'url("welcome-page/background-gradient-2.jpg")' }}
            >
                <div className='flex flex-row w-[50vw] mt-[90vh] items-center'>
                    <h1 className='text-4xl w-[60%] font-bold text-right mr-3'>
                        Let's learn your
                    </h1>
                    <Carousel/>
                </div>
                <Button className='font-bold mt-[3vh] text-lg'>
                    <ImSteam2 size={56} className='mr-1' />Log in via Steam
                </Button>
            </div>
        </>
    );
};

export default Welcome