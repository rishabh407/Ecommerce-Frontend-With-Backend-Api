import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SiHackthebox } from "react-icons/si";
import { FaFacebookF, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { ThemeContext } from "../Context/ThemeContext";

const Footer = () => {
  const {theme}=useContext(ThemeContext);
  return (
    <footer
      className={`transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <NavLink
            to="/"
            className={`flex items-center gap-2 font-extrabold tracking-tight ${
              theme === "dark" ? "text-blue-400" : "dark:text-blue-400 hover:opacity-90"
            } hover:opacity-90`}
          >
            <SiHackthebox className="text-3xl" />
            <span className="text-2xl">ShopFlow</span>
          </NavLink>
          <p className="text-sm md:text-base text-center md:text-left">
            Your seamless shopping destination
          </p>
          <ul className="flex gap-4 mt-2">
            <li
              className={`text-xl cursor-pointer transition-colors ${
                theme === "dark" ? "hover:text-blue-500" : "hover:text-blue-600"
              }`}
            >
              <FaFacebookF />
            </li>
            <li
              className={`text-xl cursor-pointer transition-colors ${
                theme === "dark" ? "hover:text-pink-500" : "hover:text-pink-600"
              }`}
            >
              <FaSquareInstagram />
            </li>
            <li
              className={`text-xl cursor-pointer transition-colors ${
                theme === "dark" ? "hover:text-sky-500" : "hover:text-sky-600"
              }`}
            >
              <FaXTwitter />
            </li>
          </ul>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          {/* About */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">About</h3>
            <NavLink
              to="/About"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Our Story
            </NavLink>
            <NavLink
              to="/Careers"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Careers
            </NavLink>
            <NavLink
              to="/Press"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Press
            </NavLink>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <NavLink
              to="/Help"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Help Center
            </NavLink>
            <NavLink
              to="/Contact"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/FAQ"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              FAQ
            </NavLink>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Legal</h3>
            <NavLink
              to="/Legal"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/Privacy"
              className={`hover:underline transition ${
                theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600"
              }`}
            >
              Privacy Policy
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className={`border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        } mt-8 pt-4 text-center text-sm md:text-base`}
      >
        &copy; {new Date().getFullYear()} ShopFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

