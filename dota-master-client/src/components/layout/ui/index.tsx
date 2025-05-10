import { Footer } from "@src/components/footer";
import { Header } from "@src/components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
