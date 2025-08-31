import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ✅ use lucide icons

function Header({ toggleSidebar, title, isSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 ">
      {/* Left: Title + Menu */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md bg-yellow-400 text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        className="px-4 py-1 text-white bg-[#F91111] hover:bg-red-700 rounded-md"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
