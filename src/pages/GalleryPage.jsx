import React from "react";
import NavBar from "../components/NavBar";

const galleryImages = [
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1509228627150-64a0c67b7c36?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517971071642-34a2d3eccb9a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1583454110554-21b7a3e9d30e?auto=format&fit=crop&w=400&q=80",
];

const GalleryPage = () => (
  <div className=" text-center animate-fade-in">
    <NavBar/>
    <h1 className="text-[#fed600] text-3xl font-extrabold mb-8 drop-shadow-[2px_2px_0_#0d1b3e]">
      N STAR GYM Gallery
    </h1>

    <div className="flex flex-wrap gap-9 justify-center">
      {galleryImages.map((src, i) => (
        <div
          key={i}
          className="bg-gradient-to-tr from-[#0d1b3e] to-[#fed600] rounded-xl shadow-[0_6px_30px_#0d1b3e70] 
                     w-[260px] h-[200px] flex items-center justify-center overflow-hidden cursor-pointer 
                     transition-transform duration-200 ease-in-out hover:scale-105 hover:-rotate-2 hover:shadow-[0_8px_40px_#fed600b0] 
                     animate-zoom-in"
        >
          <img
            src={src}
            alt={`Gym Equip ${i + 1}`}
            className="w-full h-full object-cover rounded-xl transition-transform duration-200 ease-in-out hover:scale-110 hover:rotate-2"
          />
        </div>
      ))}
    </div>
  </div>
);

export default GalleryPage;
