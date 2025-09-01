import React from "react";
import NavBar from "../components/NavBar";

const trainers = [
  {
    name: "Rajiv Menon",
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
    experience: "8 years",
    services: ["Personal Training", "Bodybuilding", "Weight Loss"],
    fee: "₹2000/month",
  },
  {
    name: "Priya Kaur",
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
    experience: "6 years",
    services: ["Personal Training", "Strength Training", "Nutrition Guidance"],
    fee: "₹1800/month",
  },
  {
    name: "Arjun Patel",
    profile: "https://randomuser.me/api/portraits/men/83.jpg",
    experience: "5 years",
    services: ["Functional Training", "HIIT", "Group Classes"],
    fee: "₹1600/month",
  },
];

const TrainerPage = () => (
  <div className="text-center animate-fade-in">
    <NavBar/>
    {/* Title */}
    <h1 className="text-[#fed600] text-3xl font-extrabold mb-8 drop-shadow-[2px_2px_0_#0d1b3e]">
      Meet Our Trainers
    </h1>

    {/* Trainers List */}
    <div className="flex flex-wrap gap-10 justify-center">
      {trainers.map((t) => (
        <div
          key={t.name}
          className="bg-gradient-to-tr from-[#0d1b3e] to-[#fed600] rounded-2xl shadow-[0_6px_30px_#0d1b3e70] 
                     w-[270px] p-6 text-white animate-zoom-in transition-transform duration-300 
                     hover:scale-105 hover:shadow-[0_8px_40px_#fed600b0]"
        >
          {/* Profile Pic */}
          <img
            src={t.profile}
            alt={t.name}
            className="w-[100px] h-[100px] object-cover rounded-full mb-4 border-4 border-[#fed600] bg-white 
                       shadow-[0_2px_12px_#fed60060] mx-auto"
          />

          {/* Trainer Name */}
          <h2 className="text-[#fed600] text-xl font-extrabold mb-2">{t.name}</h2>

          {/* Experience */}
          <p>
            <b>Experience:</b> {t.experience}
          </p>

          {/* Services */}
          <p>
            <b>Services:</b> {t.services.join(", ")}
          </p>

          {/* Training Fee */}
          <p>
            <b>Training Fee:</b>{" "}
            <span className="text-[#fed600] font-extrabold text-lg">{t.fee}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default TrainerPage;
