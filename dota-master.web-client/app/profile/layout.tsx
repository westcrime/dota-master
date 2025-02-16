import { Card } from "@/components/ui/card";
import { ProfileCard } from "./_components/profileCard";
import Logo from "@/components/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImSteam2 } from "react-icons/im";
  
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full p-8 px-16 flex-col space-y-6">
            <div className="flex justify-between w-full space-x-4">
                <Card className="bg-gray-800 h-16 my-2 w-1/4 flex justify-center items-center">
                    <Logo />
                </Card>
                <Card className="bg-gray-800 p-2 px-20 h-16 my-2 w-2/4 flex justify-between items-center space-x-6">
                    <a href="/home" className="hover:text-gray-300 text-xl">Главная</a>
                    <a href="/heroes" className="hover:text-gray-300 text-xl">Герои</a>
                    <a href="/stats" className="hover:text-gray-300 text-xl">Статистика</a>
                    <a href="/about" className="hover:text-gray-300 text-xl">О проекте</a>
                </Card>
                <div className="w-1/4 my-2 h-16 flex justify-center items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ProfileCard steamUrl="76561198286045701" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-4">
                            <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <a href={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/logout`}><DropdownMenuItem className="hover: cursor-pointer"><RiLogoutBoxLine /> Выйти</DropdownMenuItem></a>
                            <DropdownMenuItem><ImSteam2 /> Перейти в аккаунт Steam</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>


            {children}
        </div>
    );
}
