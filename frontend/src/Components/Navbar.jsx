import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiHackthebox } from "react-icons/si";
import { BiCart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../Context/ThemeContext";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { ContextContent } from "../Context/SearchContext";
// import { ProductContext } from "../hooks/Productcontext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [cartCount] = useState(2);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const{search,setsearch}=useContext(ContextContent);
      const navigate=useNavigate();
    const handleinput=()=>{ 
      navigate('/products');
    }
    const changeinput=(e)=>{
      setsearch(e.target.value)
    }
  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b 
      ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-3 md:px-12">
        {/* LOGO */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-gray-900 dark:text-blue-400 hover:opacity-90"
        >
          <SiHackthebox className="text-3xl" />
          <span className="text-2xl font-extrabold tracking-tight">ShopFlow</span>
        </NavLink>

        {/* SEARCH BAR */}
        <NavLink to='/products'>
        <div className="hidden md:flex flex-grow max-w-md mx-6">
          <input
            type="text"
            onClick={()=>handleinput()}
            onChange={(e)=>changeinput(e)}
            value={search}
            placeholder="Search for products..."
            className={`w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 
              ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800/60 text-gray-100 focus:ring-blue-400"
                  : "border-gray-300 bg-white text-gray-800 focus:ring-gray-400"
              }`}
          />
        </div>
        </NavLink>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {["Home", "Products"].map((item, index) => (
            <NavLink
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `relative group ${
                  isActive
                    ? theme === "dark"
                      ? "text-blue-400 font-semibold"
                      : "text-gray-900 font-semibold"
                    : theme === "dark"
                    ? "text-gray-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-black"
                }`
              }
            >
              {item}
              <motion.span
                layoutId="underline"
                className={`absolute left-0 -bottom-1 w-0 h-[2px] group-hover:w-full 
                  ${theme === "dark" ? "bg-blue-400" : "bg-gray-800"}`}
              ></motion.span>
            </NavLink>
          ))}

          {/* CART */}
          <NavLink
            to="/cart"
            className={`relative flex items-center gap-1 ${
              theme === "dark"
                ? "hover:text-blue-400"
                : "hover:text-gray-900 text-gray-700"
            }`}
          >
            <BiCart className="text-2xl" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/checkout"
            className={`flex items-center gap-1 ${
              theme === "dark"
                ? "hover:text-blue-400"
                : "hover:text-gray-900 text-gray-700"
            }`}
          >
            <CgProfile className="text-2xl" />
            <span>Checkout</span>
          </NavLink>
              
                     {/* WISHLIST */}
          <NavLink
            to="/wishlist"
            className={`flex items-center gap-1 ${
              theme === "dark"
                ? "hover:text-blue-400"
                : "hover:text-gray-900 text-gray-700"
            }`}
          >
            <span>WishList</span>
          </NavLink>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {theme === "dark" ? <BsSun /> : <BsMoonStars />}
          </button>
        </div>

        {/* HAMBURGER MENU */}
        <button
          className={`text-3xl md:hidden ${
            theme === "dark" ? "text-blue-400" : "text-gray-900"
          }`}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <ImCross /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className={`md:hidden border-t ${
              theme === "dark"
                ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex flex-col items-center gap-5 py-5 text-lg font-semibold">
              {/* Input section */}
          <input
  type="text"
  onClick={() => handleinput()}
  onChange={(e) => changeinput(e)}
  value={search}
  placeholder="Search for products..."
  className={`w-full border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2
    ${
      theme === "dark"
        ? "border-gray-700 bg-gray-800/60 text-gray-100 focus:ring-blue-400"
        : "border-gray-300 bg-white text-gray-800 focus:ring-gray-400"
    }
    sm:px-4 sm:py-2.5 sm:text-base
    md:w-96 md:py-3 md:text-sm
  `}
/>

              
              {["Home", "Products",,"Checkout","Cart","WishList"].map((item, i) => (
                <NavLink
                  key={i}
                  to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  onClick={() => setToggle(false)}
                  className={`flex items-center gap-2 ${
                    theme === "dark"
                      ? "hover:text-blue-400"
                      : "hover:text-gray-900"
                  }`}
                >
                  {item === "Cart" && <BiCart className="text-xl" />}
                  {item}
                </NavLink>
              ))}

              {/* THEME TOGGLE (Mobile) */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {theme === "dark" ? <BsSun /> : <BsMoonStars />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
