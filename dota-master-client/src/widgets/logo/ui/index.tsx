import { SiDota2 } from "react-icons/si";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex flex-row items-center">
        <SiDota2 size={28} className="mr-3" />
        <h1 className="text-3xl font-bold">DotaMaster</h1>
      </div>
    </Link>
  );
};

export { Logo };