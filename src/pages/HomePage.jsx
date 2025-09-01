import React from "react";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <div className="pb-10">
      <NavBar />

      {/* Banner Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between bg-custom-gradient shadow-[0_8px_40px_rgba(13,27,62,0.5)] rounded-b-[50px] overflow-hidden relative animate-fadeIn">
        <div className="flex-1.2 p-6 md:p-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-yellow drop-shadow-md">
            WELCOME TO <span className="text-brand-yellow">N STAR GYM</span>
          </h1>
          <p className="mt-3 mb-6 text-lg md:text-xl text-white font-semibold drop-shadow-sm">
            Unleash Your Potential — Train with the Best Equipment, Trainers &
            Community!
          </p>
          <a
            href="/products"
            className="inline-block bg-brand-yellow text-brand-dark2 font-extrabold py-3 px-8 rounded-full text-lg cursor-pointer shadow-[0_2px_10px_rgba(254,214,0,0.5)] transition duration-300 hover:shadow-glow "
          >
            Explore Products
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className=" text-center animate-fadeInUp">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-yellow drop-shadow-md mb-6">
          Why Choose N STAR GYM?
        </h2>

        <div className="flex flex-wrap gap-8 justify-center">
          {/* Feature Card 1 */}
          <div className="bg-gradient-to-tr from-brand-dark2 to-brand-yellow rounded-2xl shadow-[0_6px_30px_rgba(13,27,62,0.3)] p-8 w-[230px] transition transform hover:-translate-y-2 hover:scale-105 hover:-rotate-2 hover:shadow-[0_8px_40px_rgba(254,214,0,0.6)] cursor-pointer animate-zoomIn">
            <img
              src="https://img.icons8.com/fluency/96/barbell.png"
              alt="equipment"
              className="w-16 mx-auto mb-4 drop-shadow-lg"
            />
            <h3 className="text-brand-yellow font-bold text-lg mb-2">
              Modern Equipments
            </h3>
            <p className="text-white opacity-90 text-sm">
              State-of-the-art machines for all fitness levels.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gradient-to-tr from-brand-dark2 to-brand-yellow rounded-2xl shadow-[0_6px_30px_rgba(13,27,62,0.3)] p-8 w-[230px] transition transform hover:-translate-y-2 hover:scale-105 hover:rotate-2 hover:shadow-[0_8px_40px_rgba(254,214,0,0.6)] cursor-pointer animate-zoomIn">
            <img
              src="https://img.icons8.com/fluency/96/personal-trainer.png"
              alt="personal trainer"
              className="w-16 mx-auto mb-4 drop-shadow-lg"
            />
            <h3 className="text-brand-yellow font-bold text-lg mb-2">
              Expert Trainers
            </h3>
            <p className="text-white opacity-90 text-sm">
              Certified trainers with proven experience.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gradient-to-tr from-brand-dark2 to-brand-yellow rounded-2xl shadow-[0_6px_30px_rgba(13,27,62,0.3)] p-8 w-[230px] transition transform hover:-translate-y-2 hover:scale-105 hover:-rotate-2 hover:shadow-[0_8px_40px_rgba(254,214,0,0.6)] cursor-pointer animate-zoomIn">
            <img
              src="https://img.icons8.com/fluency/96/dumbbell.png"
              alt="dumbbells"
              className="w-16 mx-auto mb-4 drop-shadow-lg"
            />
            <h3 className="text-brand-yellow font-bold text-lg mb-2">
              Flexible Membership
            </h3>
            <p className="text-white opacity-90 text-sm">
              Month-to-month and annual plans for all goals.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-gradient-to-tr from-brand-dark2 to-brand-yellow rounded-2xl shadow-[0_6px_30px_rgba(13,27,62,0.3)] p-8 w-[230px] transition transform hover:-translate-y-2 hover:scale-105 hover:rotate-2 hover:shadow-[0_8px_40px_rgba(254,214,0,0.6)] cursor-pointer animate-zoomIn">
            <img
              src="https://img.icons8.com/fluency/96/meal.png"
              alt="nutrition"
              className="w-16 mx-auto mb-4 drop-shadow-lg"
            />
            <h3 className="text-brand-yellow font-bold text-lg mb-2">
              Nutrition Guidance
            </h3>
            <p className="text-white opacity-90 text-sm">
              Personalized diet plans and supplements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
