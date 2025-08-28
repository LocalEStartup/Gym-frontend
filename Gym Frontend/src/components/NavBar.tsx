import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="nav-bar animate__fadeInDown">
      <div className="nav-logo">
        <span>N STAR GYM</span>
      </div>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/products" ? "active" : ""}>
          <Link to="/products">Products</Link>
        </li>
        <li className={location.pathname === "/cart" ? "active" : ""}>
          <Link to="/cart">Cart</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about">About Us</Link>
        </li>
        <li className={location.pathname === "/trainers" ? "active" : ""}>
          <Link to="/trainers">Trainers</Link>
        </li>
        <li className={location.pathname === "/gallery" ? "active" : ""}>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
