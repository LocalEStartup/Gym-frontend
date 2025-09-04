import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ use lucide icons
import { logout }from "../../api/api.js"


function Header({ toggleSidebar, title, isSidebarOpen }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
const handleLogout = async () => {
    try {
      await logout(); // call backend to clear cookie
      setShowModal(false);
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
        // onClick={handleLogout}
         onClick={() => setShowModal(true)}
        className="px-4 py-1 text-white bg-[#F91111] hover:bg-red-700 rounded-md"
      >
        Logout
      </button>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-t from-[#0d1b3e] to-[#fed600] rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-white mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-green-300 hover:bg-green-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;
