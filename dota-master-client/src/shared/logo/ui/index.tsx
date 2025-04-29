import { SiDota2 } from "react-icons/si";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex flex-row">
        <SiDota2 size={36} className="mr-3" />
        <h1 className="text-4xl font-bold">DotaMaster</h1>
      </div>
    </Link>
  );
};

export { Logo };