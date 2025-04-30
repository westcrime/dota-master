import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import profileApi from "../api/profile";
import { Logo } from "@src/shared/logo";
import { SteamProfileCard } from "@src/components/steam-profile-card";

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
    <header className="w-full inline-flex py-7 px-3 items-center bg-gray-800 text-white">
      <Logo />
      <div className="w-[65%] h-full">sa</div>
      <div className="w-[15%] h-full">
        <SteamProfileCard />
      </div>
    </header>
  );
};

export { Header };
