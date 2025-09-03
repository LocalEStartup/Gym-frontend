import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar, menuItems, setHeaderTitle }) {
  const location = useLocation();

  return (
    <div
      className={`bg-blue-950 text-white w-64 fixed lg:static z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 h-full shadow-lg`}
    >
      <div className="p-4 font-bold text-lg flex justify-between items-center border-b border-blue-800">
        <span>N Star Gym</span>
        <button className="lg:hidden text-white" onClick={toggleSidebar}>
          X
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item, index) => (
            <Link
              to={`/dashboard/${item.path}`}
              key={index}
              onClick={() => setHeaderTitle(item.name)}
            >
              <li
                className={`flex items-center space-x-3 p-4 transition duration-200 ${
                  location.pathname.includes(item.path)
                    ? "bg-blue-800"
                    : "hover:bg-blue-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
