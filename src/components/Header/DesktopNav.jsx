import { NavLink } from "react-router-dom";
const generalRouts = [{ name: "Home", path: "/" }];

const DesktopNav = () => {
  return (
    <div>
      <div className="flex gap-5  text-white font-semibold">
        <div className="me-3 flex gap-5">
          {generalRouts.map((item, index) => {
            return (
              <NavLink
                key={index}
                className={({ isActive }) => {
                  return isActive
                    ? " text-accent border-b-2 border-accent capitalize"
                    : "  capitalize font-medium hover:text-accent transition-all";
                }}
                to={item.path}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default DesktopNav;
