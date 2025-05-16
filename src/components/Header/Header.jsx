import DesktopNav from "./DesktopNav";
import { Link } from "react-router-dom";
import { BiSearch, } from 'react-icons/bi';
import { useState } from 'react';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-primary-dark/95 backdrop-blur-md py-4 fixed z-50 w-full border-b border-secondary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-accent">Movie</span>
              <span className="text-neutral-50">Review</span>
            </h1>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <DesktopNav />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className={`relative ${isSearchOpen ? 'w-64' : 'w-10'} transition-all duration-300`}>
              <input
                type="text"
                placeholder="Search movies..."
                className={`w-full bg-primary/50 text-neutral-50 placeholder-neutral-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-accent border border-secondary/20 ${isSearchOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              />
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="absolute left-0 top-0 h-full px-3 text-neutral-400 hover:text-accent transition-colors"
              >
                <BiSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              <Link 
                to="/login"
                className="px-4 py-2 text-neutral-50 hover:text-accent transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-primary-dark font-medium rounded-full transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* User Menu (when logged in) */}
            {/* <div className="relative group">
              <button className="p-2 rounded-full bg-secondary/10 text-neutral-50 hover:bg-secondary/20 transition-colors">
                <BiUser className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 py-2 bg-primary-dark rounded-lg shadow-xl border border-secondary/10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-sm text-neutral-400">user@example.com</div>
                <div className="h-px bg-secondary/10 my-1"></div>
                <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-50 hover:bg-secondary/10">Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-secondary/10">Sign Out</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
