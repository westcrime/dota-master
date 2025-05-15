import { Footer } from "@src/shared/ui/footer";
import { Header } from "@src/shared/ui/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <div className="px-18 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
