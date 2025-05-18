import DesktopNav from "./DesktopNav";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

// Add import
import MobileNav from "./MobileNav";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-primary-dark/95 backdrop-blur-md py-2 md:py-4 fixed z-50 w-full border-b border-secondary/10">
      <div className="container mx-auto px-4">
        {/* // Inside the header component, add MobileNav before the right section */}
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              <span className="text-accent">Movie</span>
              <span className="text-neutral-50">Review</span>
            </h1>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <DesktopNav />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Bar */}
            <div className={`relative ${isSearchOpen ? "w-40 md:w-64" : "w-10"} transition-all duration-300`}>
              <input
                type="text"
                placeholder="Search movies..."
                className={`w-full bg-primary/50 text-neutral-50 placeholder-neutral-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-accent border border-secondary/20 ${
                  isSearchOpen ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              />
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="absolute left-0 top-0 h-full px-3 text-neutral-400 hover:text-accent transition-colors"
              >
                <BiSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/login"
                className="px-2 md:px-4 py-2 text-sm md:text-base text-neutral-50 hover:text-accent transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base bg-accent hover:bg-accent-hover text-primary-dark font-medium rounded-full transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
