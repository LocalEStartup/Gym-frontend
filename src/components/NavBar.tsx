import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/cart", label: "Cart" },
    { path: "/about", label: "About Us" },
    { path: "/trainers", label: "Trainers" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0d1b3e] to-[#fed600] shadow-lg font-[Montserrat] animate-fadeInDown">
      <div className="flex items-center justify-between px-6 py-4 lg:px-16">
        {/* Logo */}
        <div className="text-2xl lg:text-3xl font-extrabold tracking-wider text-[#fed600] drop-shadow-[2px_2px_0_#0d1b3e] cursor-pointer transition-transform duration-300 hover:scale-105">
          N STAR GYM
        </div>

        {/* Desktop Menu (>=1070px) */}
        <ul className="hidden [@media(min-width:1070px)]:flex gap-8">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-md font-semibold transition cursor-pointer
                  ${
                    location.pathname === link.path
                      ? "bg-[#fed600] text-[#0d1b3e] shadow-[0_2px_10px_#fed60050] scale-105"
                      : "text-white hover:bg-[#fed600] hover:text-[#0d1b3e] hover:shadow-[0_2px_10px_#fed60050] hover:scale-105"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (<1070px) */}
        <button
          className="[@media(min-width:1070px)]:hidden text-white cursor-pointer transition-transform hover:scale-110"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 animate-fadeIn">
          {/* Dark Background */}
          <div
            className="absolute inset-0 bg-black/50 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />

          {/* Sliding Sidebar */}
          <div className="absolute top-0 right-0 h-full w-72 bg-[#0d1b3e] shadow-xl p-6 transform transition-transform duration-300 ease-out translate-x-0 animate-slideInRight">
            {/* Close Button */}
            <button
              className="text-white absolute top-4 right-4 cursor-pointer transition-transform hover:scale-110"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Menu Items */}
            <ul className="mt-12 flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md font-semibold transition cursor-pointer
                      ${
                        location.pathname === link.path
                          ? "bg-[#fed600] text-[#0d1b3e] shadow-[0_2px_10px_#fed60050] scale-105"
                          : "text-white hover:bg-[#fed600] hover:text-[#0d1b3e] hover:shadow-[0_2px_10px_#fed60050] hover:scale-105"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
