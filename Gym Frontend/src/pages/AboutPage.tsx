import React from "react";
import "./AboutPage.css";

const AboutPage: React.FC = () => (
  <div className="about-page animate__fadeIn">
    <h1>About N STAR GYM</h1>
    <div className="about-content">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        alt="about gym"
        className="about-img"
      />
      <div>
        <p>
          <strong>N STAR GYM</strong> is the premier fitness destination in your
          city. We believe in empowering every member to achieve their fitness
          dreams — whether you’re a beginner or a pro. <br />
          <br />
          Our spacious facility, top-tier equipment, and expert trainers create
          the perfect environment for growth and transformation. <br />
          <br />
          <span className="about-highlight">
            Join us and experience a community-driven, goal-focused atmosphere
            where ambition meets encouragement!
          </span>
        </p>
        <div className="about-hr"></div>
        <ul className="about-list">
          <li>✔ 3500+ sq.ft workout area</li>
          <li>✔ 40+ modern machines</li>
          <li>✔ Nutrition & Supplement Store</li>
          <li>✔ Group Classes & Personal Training</li>
          <li>✔ Open 5 AM – 11 PM, 7 days a week</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutPage;
