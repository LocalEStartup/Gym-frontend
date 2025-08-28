import React from "react";
import "./HomePage.css";

const HomePage: React.FC = () => (
  <div className="home-page animate__fadeIn">
    <section className="banner">
      <div className="banner-content">
        <h1>
          WELCOME TO <span className="nstar">N STAR GYM</span>
        </h1>
        <p className="banner-sub">
          Unleash Your Potential — Train with the Best Equipment, Trainers &
          Community!
        </p>
        <a href="/products" className="banner-btn">
          Explore Products
        </a>
      </div>
      <img
        src="https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=900&q=80"
        alt="Gym Banner"
        className="banner-img"
      />
    </section>
    <section className="features animate__fadeInUp">
      <h2>Why Choose N STAR GYM?</h2>
      <div className="features-list">
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/96/barbell.png"
            alt="equipment"
          />
          <h3>Modern Equipments</h3>
          <p>State-of-the-art machines for all fitness levels.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/96/personal-trainer.png"
            alt="personal trainer"
          />
          <h3>Expert Trainers</h3>
          <p>Certified trainers with proven experience.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/96/dumbbell.png"
            alt="dumbbells"
          />
          <h3>Flexible Membership</h3>
          <p>Month-to-month and annual plans for all goals.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/96/meal.png"
            alt="nutrition"
          />
          <h3>Nutrition Guidance</h3>
          <p>Personalized diet plans and supplements.</p>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
