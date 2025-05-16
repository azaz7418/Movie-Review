import { NavLink } from "react-router-dom";

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

const DesktopNav = () => {
  return (
    <nav className="flex items-center space-x-6">
      {navigationLinks.map((item, index) => (
        <div key={index} className="relative group">
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `relative py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-neutral-50 hover:text-accent'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 ${
                isActive ? 'after:scale-x-100' : ''
              }`
            }
          >
            {item.name}
          </NavLink>

          {item.subMenu && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-primary-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                {item.subMenu.map((subItem, subIndex) => (
                  <NavLink
                    key={subIndex}
                    to={subItem.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm ${
                        isActive
                          ? 'text-accent bg-primary-dark/50'
                          : 'text-neutral-50 hover:text-accent hover:bg-primary-dark/50'
                      }`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DesktopNav;
