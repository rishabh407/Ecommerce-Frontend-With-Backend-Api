import React, { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiBallerinaShoes, GiClothes } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../ReduxStore/cartSlice";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts";
import { getImageURL } from "../hooks/utils";

const Home = () => {
  const { theme,baseURL } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const categories = [
    { name: "Shoes", icon: <GiBallerinaShoes className="text-4xl" /> },
    { name: "Clothing", icon: <GiClothes className="text-4xl" /> },
    { name: "Accessories", icon: <GrTechnology className="text-4xl" /> },
  ];

  const { products, loading, error } = useProducts();
  const [semore, setsemore] = useState(false);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const allproducts = semore ? products : products.slice(0, 8);

  const handlecart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };
     console.log(products[0].image);
  return (
    <>
      {/* --------------------- Hero Section ---------------------- */}
      <section
        className={`relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between 
  w-full px-6 py-16 md:px-20 md:py-24 transition-all duration-300
  ${theme === "dark"
            ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"}`}
      >
        {/* ✨ Background Blobs */}
        <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-80px] right-[-120px] w-[400px] h-[400px] bg-pink-400 opacity-20 blur-[140px] rounded-full"></div>

        <div className="relative z-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 w-full max-w-[1300px] mx-auto">
          {/* 📝 Text Section */}
          <div className="md:w-1/2 flex flex-col gap-6 text-center md:text-left animate-fadeUp">
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Elevate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400">
                Shopping
              </span>{" "}
              Game
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0 leading-relaxed">
              Step into the future of online shopping. Experience personalization, speed, and elegance — all in one place.
            </p>
            <div className="flex justify-center md:justify-start mt-2">
              <NavLink
                to="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-cyan-400/50 hover:scale-110 active:scale-95 transition-all duration-300"
              >
                Start Shopping <FaLongArrowAltRight className="text-xl" />
              </NavLink>
            </div>
          </div>

          {/* 🖼️ Image Section */}
          <div className="relative w-full md:w-1/2 flex justify-center animate-float">
            <div className="relative">
              <div
                className={`absolute -inset-4 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent rounded-3xl blur-2xl ${theme === "dark" ? "opacity-40" : "opacity-60"
                  }`}
              ></div>
              <img
                src="/images/main.jpg"
                alt="Hero"
                className="relative w-full max-w-md md:max-w-lg rounded-3xl object-cover shadow-2xl border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------- Categories Section ---------------------- */}
      <section
        className={`py-12 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center gap-4 p-6 rounded-xl shadow-md cursor-pointer 
                hover:scale-105 transition-all duration-300 ${theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <div className="text-blue-600 dark:text-blue-400">{cat.icon}</div>
                <span className="font-semibold text-lg">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------- Featured Products Section ---------------------- */}
      <section
        className={`py-10 px-6 transition-colors duration-300 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">Featured Products</h1>

          {/* 🛍️ Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allproducts.map((product) => (
              <div
                key={product.id}
                className={`relative border rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden group
                ${theme === "dark"
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                  }`}
              >

                <Link to={`/products/${product.id}`}>
                  {/* 🖼️ Product Image */}
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={getImageURL(product.image)}
                      alt={product.title}
                      className="h-48 w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* ⭐ Rating */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {product.rating} ({product.totalReviews})
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                  <p className="text-sm italic mb-2 text-gray-500 dark:text-gray-400">
                    by {product.brand || product.seller?.name}
                  </p>

                  {/* 🏷️ Category Tags */}
                  <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                    {product.category} • {product.subCategory}
                  </span>

                  {/* 💰 Price & Discount */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{product.discountedPrice}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-red-500">
                      -{product.discountPercentage}%
                    </span>
                  </div>

                  {/* 🧍 Stock */}
                  <p
                    className={`text-sm mb-3 ${product.stock > 10
                        ? "text-green-600"
                        : "text-red-500"
                      }`}
                  >
                    {product.stock > 10
                      ? "In Stock"
                      : `Only ${product.stock} left!`}
                  </p>

                  {/* 🛒 Add to Cart */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handlecart(product);
                    }}
                    className="relative w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all"
                  >
                    <MdOutlineShoppingCart className="text-lg" />
                    Add to Cart
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setsemore(!semore)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {semore ? "See Less" : "See More"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
