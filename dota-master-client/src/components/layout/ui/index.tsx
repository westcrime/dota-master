import { Footer } from "@src/components/footer";
import { Header } from "@src/components/header";
import { Profile } from "@src/components/profile";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Profile />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
