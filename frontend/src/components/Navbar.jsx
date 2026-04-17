import React from "react";
import logo from "../assets/logo.jpg";
import login from "../assets/login.png";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <header className="absolute top-0 w-full flex justify-center py-4">
        <div className="w-11/12 max-w-5xl px-8 py-3 flex justify-between items-center bg-white shadow-md rounded-2xl">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center space-x-8">
            <Link
              to="/product"
              className="text-gray-600 hover:text-black font-medium"
            >
              Our Product
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-black font-medium"
            >
              How it Works
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-black font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/persona/details"
              className="transition-transform duration-300 hover:scale-105"
            >
              <button className="border-blue-400 text-blue-500 border-2 rounded-md text-sm px-2 py-2">
                Generate Persona
              </button>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
