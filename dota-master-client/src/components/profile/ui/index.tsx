import { ProfileHeader } from "@src/components/profile-header";

const Profile = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[50%]">
        <ProfileHeader />
      </div>
    </div>
  );
};

export { Profile };
