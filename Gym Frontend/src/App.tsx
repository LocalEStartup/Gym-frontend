import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import TrainerPage from "./pages/TrainerPage";
import GalleryPage from "./pages/GalleryPage";
import NavBar from "./components/NavBar";
import ChatBot from "./components/ChatBot";
import "./App.css";

const App: React.FC = () => (
  <Router>
    <div className="app-bg">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/trainers" element={<TrainerPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <ChatBot /> {/* ChatBot appears on all pages */}
    </div>
  </Router>
);

export default App;
