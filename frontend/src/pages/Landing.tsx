import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-16">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl mb-12 lg:mb-0 lg:mr-12">
          <h1 className="hero-title font-extrabold leading-tight mb-6">
            TRACKING THE <span className="text-blue-600">SPORTS</span> UNIVERSE
          </h1>
          <h2 className="hero-subtitle font-bold mb-6">One profile at a time</h2>
          <p className="text-lg text-gray-700 mb-8">
            Create your profile to track and get tracked today!
          </p>
          
          {/* User Types List */}
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-lg">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
              Athlete
            </li>
            <li className="flex items-center text-lg">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
              Parents
            </li>
            <li className="flex items-center text-lg">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
              Coaches
            </li>
            <li className="flex items-center text-lg">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
              Organizations
            </li>
          </ul>

          <Link
            to="/auth"
            className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            Create Your Profile
          </Link>
        </div>

        {/* Right Content - Image with Abstract Shapes */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            {/* Abstract Blue Shapes */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-600 rounded-2xl rotate-12 opacity-80 abstract-shape"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400 rounded-xl rotate-45 opacity-60 abstract-shape"></div>
            <div className="absolute top-8 -left-8 w-16 h-16 bg-blue-500 rounded-lg rotate-12 opacity-70 abstract-shape"></div>
            
            {/* Main Image Container */}
            <div className="relative z-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-4 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Football Player Image Placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden">
                  {/* Football field background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600 opacity-30"></div>
                  {/* Football player silhouette */}
                  <div className="relative z-10 text-center text-white">
                    <div className="text-8xl mb-4">⚽</div>
                    <div className="text-2xl font-bold">SPORTS ID</div>
                    <div className="text-lg opacity-90">Athlete Profile</div>
                  </div>
                  {/* Field lines */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-50"></div>
                    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white opacity-30"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white opacity-30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          BE <span className="text-blue-600">FOUND</span>
        </h2>
        <p className="text-xl text-gray-700">
          Let the Sports Universe know who you are.
        </p>
      </section>
    </div>
  );
}