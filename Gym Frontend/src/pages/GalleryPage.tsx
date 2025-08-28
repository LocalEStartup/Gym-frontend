import React from "react";
import "./GalleryPage.css";

const galleryImages = [
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1509228627150-64a0c67b7c36?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517971071642-34a2d3eccb9a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1583454110554-21b7a3e9d30e?auto=format&fit=crop&w=400&q=80",
];

const GalleryPage: React.FC = () => (
  <div className="gallery-page animate__fadeIn">
    <h1 className="gallery-title">N STAR GYM Gallery</h1>
    <div className="gallery-grid">
      {galleryImages.map((src, i) => (
        <div className="gallery-card animate__zoomIn" key={i}>
          <img src={src} alt={`Gym Equip ${i + 1}`} className="gallery-img" />
        </div>
      ))}
    </div>
  </div>
);

export default GalleryPage;
