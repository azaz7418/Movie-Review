import { NavLink } from "react-router-dom";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/tv" },
  { name: "Top Rated", path: "/top-rated" }
];

const DesktopNav = () => {
  return (
    <nav className="flex items-center space-x-6">
      {navigationLinks.map((item, index) => (
        <NavLink
          key={index}
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
      ))}
    </nav>
  );
};

export default DesktopNav;
