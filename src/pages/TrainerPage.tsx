import React from "react";
import "./TrainerPage.css";

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

const TrainerPage: React.FC = () => (
  <div className="trainer-page animate__fadeIn">
    <h1 className="trainer-title">Meet Our Trainers</h1>
    <div className="trainer-list">
      {trainers.map((t) => (
        <div className="trainer-card animate__zoomIn" key={t.name}>
          <img src={t.profile} alt={t.name} className="trainer-img" />
          <h2>{t.name}</h2>
          <p>
            <b>Experience:</b> {t.experience}
          </p>
          <p>
            <b>Services:</b> {t.services.join(", ")}
          </p>
          <p>
            <b>Training Fee:</b> <span className="trainer-fee">{t.fee}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default TrainerPage;
