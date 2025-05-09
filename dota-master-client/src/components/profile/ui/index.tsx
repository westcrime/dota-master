import { ProfileHeader } from "@src/components/profile/components/profile-header";
import { Records } from "../components/records";
import { Perfomance } from "../components/perfomance";

const Profile = () => {
  return (
    <div className="flex flex-row w-full space-x-3 mx-[5%] my-6">
      <div className="flex flex-col space-y-3 w-[45%]">
        <ProfileHeader />
        <Records />
      </div>
      <div className="w-[45%]">
        <Perfomance />
      </div>
    </div>
  );
};

export { Profile };
