import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { name: "Home", path: "/" },
    {
      name: "Movies",
      path: "/movies",
      subMenu: [
        { name: "Popular", path: "/movies/popular" },
        { name: "Top Rated", path: "/movies/top-rated" },
        { name: "Now Playing", path: "/movies/now-playing" }
      ]
    },
    {
      name: "TV Shows",
      path: "/tv",
      subMenu: [
        { name: "Popular", path: "/tv/popular" },
        { name: "Top Rated", path: "/tv/top-rated" },
        { name: "Airing Today", path: "/tv/airing-today" },
        { name: "On The Air", path: "/tv/on-the-air" }
      ]
    },
    { name: "Search", path: "/search" }
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-neutral-50 hover:text-accent"
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary-dark/95 border-b border-secondary/10 py-4">
          <div className="container mx-auto px-4">
            {navigationLinks.map((item, index) => (
              <div key={index} className="py-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-2 text-base ${isActive ? 'text-accent' : 'text-neutral-50'}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
                {item.subMenu && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block py-1.5 text-sm ${isActive ? 'text-accent' : 'text-neutral-50/80'}`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
