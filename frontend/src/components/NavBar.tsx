import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return (
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-black text-white px-3 py-1 text-lg font-bold mr-2">SPORTS</div>
            <div className="text-black text-lg font-bold">ID™</div>
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-dark flex items-center"
        >
          <span className="text-primary">SportsID RegisterX</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`w-full md:w-auto md:flex md:items-center md:space-x-8 ${
            isMenuOpen ? "flex flex-col gap-4 mt-4 md:mt-0" : "hidden md:flex"
          }`}
        >
          <Link
            to="/features"
            className="text-black font-medium hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            to="/programs"
            className="text-black font-medium hover:text-blue-600 transition-colors"
          >
            Sports
          </Link>
          <Link
            to="/about"
            className="text-black font-medium hover:text-blue-600 transition-colors"
          >
            About
          </Link>

          {/* User Actions */}
          {user ? (
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2 md:mt-0">
              <Link
                to="/dashboard"
                className="text-black font-medium hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-gray-600 text-sm">
                Welcome, {user.first_name}
              </span>
              <button
                onClick={logout}
                className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0">
              <Link
                to="/auth"
                className="flex items-center h-10 border rounded-full px-4 touch-feedback justify-center"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}