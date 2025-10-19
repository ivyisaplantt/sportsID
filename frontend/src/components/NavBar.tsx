import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
      <Link to="/" className="text-2xl font-bold text-dark">
        <span className="text-primary">USRS</span>
      </Link>
      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/programs">Sports</Link>
        <Link to="/about">About</Link>
        <Link to="/login" className="border rounded-full px-4 py-1">
          Login
        </Link>
        <Link to="/register" className="bg-primary text-white rounded-full px-4 py-1">
          Register
        </Link>
      </div>
    </nav>
  );
}
