import React from "react";
import NavBar from "../components/NavBar";

const AboutPage = () => (
  <div className=" text-center animate-fade-in">
    <NavBar/>
    <h1 className="text-[#fed600] text-3xl font-extrabold mb-8 drop-shadow-[2px_2px_0_#0d1b3e]">
      About N STAR GYM
    </h1>

    <div className="flex flex-wrap gap-10 items-center justify-center max-w-4xl mx-auto bg-gradient-to-tr from-[#0d1b3e] to-[#fed600] rounded-2xl shadow-[0_6px_32px_#0d1b3e70] p-8 md:p-10 text-left">
      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        alt="about gym"
        className="max-w-[250px] rounded-xl shadow-[0_2px_12px_#fed60060] mb-4 md:mb-0"
      />

      {/* Text Content */}
      <div className="flex-1">
        <p className="text-white leading-relaxed">
          <strong className="text-[#fed600]">N STAR GYM</strong> is the premier
          fitness destination in your city. We believe in empowering every
          member to achieve their fitness dreams — whether you’re a beginner or
          a pro.
          <br />
          <br />
          Our spacious facility, top-tier equipment, and expert trainers create
          the perfect environment for growth and transformation.
          <br />
          <br />
          <span className="text-[#fed600] font-semibold">
            Join us and experience a community-driven, goal-focused atmosphere
            where ambition meets encouragement!
          </span>
        </p>

        {/* Divider */}
        <div className="h-[2px] bg-[#fed60070] my-5 rounded"></div>

        {/* List */}
        <ul className="text-[#fed600] font-bold text-lg space-y-2">
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
