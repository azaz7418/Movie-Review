import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col bg-primary-dark/45 min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="body ">
        <Outlet />
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
