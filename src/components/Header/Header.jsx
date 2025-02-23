// import { useState } from "react";
import DesktopNav from "./DesktopNav";
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <header className="bg-slate-800 py-4 px-2 xl:py-5 md:py-5 capitalize fixed z-50 w-screen">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-4xl font-semibold text-[#d62929]">
            Logo <span className="text-[#DAD3BE]">.</span>
          </h1>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <DesktopNav />
        </div>

        {/* Auth Section */}
        {/* <div className="hidden md:flex items-center">
          {token ? (
            <span className="mx-4 flex flex-col justify-start">
              <span className="text-[12px] text-accent-hover">{user?.data?.email || "No email"}</span>
              <div>
                <IoMdLogOut onClick={handleLogout} className="text-4xl font-semibold text-accent" />
              </div>
            </span>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div> */}

        {/* Mobile nav */}
        {/* <div className="md:hidden flex items-center gap-4">
          <MobileNav routs={routs} />
          {token ? (
            <IoMdLogOut onClick={handleLogout} className="text-2xl font-semibold text-accent" />
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
