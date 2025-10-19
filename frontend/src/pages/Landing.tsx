import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <section className="flex flex-col md:flex-row justify-between items-center px-10 mt-10">
        <div className="max-w-lg">
          <h1 className="text-5xl font-extrabold leading-tight">
            TRACKING THE <span className="text-primary">SPORTS</span> UNIVERSE
          </h1>
          <h2 className="text-2xl font-semibold mt-2">One profile at a time</h2>
          <p className="mt-4 text-gray-600">
            Create your profile to track and get tracked today!
          </p>
          <ul className="mt-4 list-disc ml-5 text-gray-600">
            <li>Athlete</li>
            <li>Parents</li>
            <li>Coaches</li>
            <li>Organizations</li>
          </ul>
          <Link
            to="/register"
            className="inline-block mt-6 bg-primary text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition"
          >
            Create Your Profile
          </Link>
        </div>

        <div className="mt-10 md:mt-0">
          <div className="relative">
            <div className="absolute bg-primary/20 w-56 h-56 rounded-3xl -z-10 rotate-12 top-6 left-6"></div>
            <img
              src="/images/sports-hero.jpg"
              alt="Sports"
              className="rounded-2xl w-80 h-96 object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      <section id="features" className="text-center mt-20 mb-10">
        <h2 className="text-3xl font-bold">
          BE <span className="text-primary">FOUND</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Let the Sports Universe know who you are.
        </p>
      </section>
    </div>
  );
}