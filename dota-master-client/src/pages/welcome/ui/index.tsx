import { Button } from "@mui/material";
import Carousel from "./carousel";
import { ImSteam2 } from "react-icons/im";
import { SiDota2 } from "react-icons/si";

const Welcome = () => {
  const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_DOMAIN;

  return (
    <>
      <div
        className="flex flex-col w-full h-[100vh] space-y-2 bg-cover bg-center bg-no-repeat items-center"
        style={{ backgroundImage: 'url("welcome/background-slate.jpg")' }}
      >
        <a href="/" className="mt-[65vh]">
          <div className="flex flex-row">
            <SiDota2 size={64} className="mr-3" />
            <h1 className="text-7xl font-bold">DotaMaster</h1>
          </div>
        </a>
        <div className="flex flex-row items-center w-full">
          <h1 className="text-4xl font-bold text-right w-[55%] mr-3">
            Let's learn your
          </h1>
          <Carousel />
        </div>
        <a href={`${backendUrl}/auth/login`} className="mx-auto">
          <Button
            sx={{
              color: "black",
              bgcolor: "white",
              fontSize: 16
            }}
            variant="contained"
          >
            <ImSteam2 size={24} className="mr-2" />
            Log in with Steam
          </Button>
        </a>
      </div>
    </>
  );
};

export { Welcome };
