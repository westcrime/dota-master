import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import profileApi from "@shared/ui/header/api/profile";
import { Logo } from "@src/widgets/logo";
import { SteamProfileCard } from "@src/widgets/steam-profile-card";

const Header = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUserIdResponse = await profileApi.get();
        if (
          currentUserIdResponse.status < 200 ||
          currentUserIdResponse.status >= 300
        ) {
          throw new Error();
        }
      } catch {
        setShouldRedirect(true);
      }
    };

    fetchUserId();
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/welcome" />;
  }

  return (
    <header className="w-full inline-flex py-1 px-20 items-center bg-transparent mt-2">
      <div className="w-[20%] h-full">
        <Logo />
      </div>
      <div className="w-[65%] h-full">
        <ul className="flex flex-row space-x-16">
          <li className="list-none">
            <Link to="/profile" className="text-lg">
              Мой профиль
            </Link>
          </li>
          <li className="list-none">
            <Link to="/matches" className="text-lg">
              Матчи
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-[15%] h-full">
        <SteamProfileCard />
      </div>
    </header>
  );
};

export { Header };
