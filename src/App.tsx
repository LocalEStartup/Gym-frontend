import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage.jsx";
import AboutPage from "./pages/AboutPage";
import TrainerPage from "./pages/TrainerPage";
import GalleryPage from "./pages/GalleryPage.jsx";
import ChatBot from "./components/ChatBot";
import "./App.css";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => (
  <Router>
    <div className="app-bg">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/trainers" element={<TrainerPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/dashboard/*" element={<Dashboard />}/>
      </Routes>
      <ChatBot /> {/* ChatBot appears on all pages */}
    </div>
  </Router>
);

export default App;
