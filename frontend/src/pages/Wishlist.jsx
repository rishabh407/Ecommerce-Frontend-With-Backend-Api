import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromwishlist } from "../ReduxStore/whishlist";
import { ThemeContext } from "../Context/ThemeContext";
import { addToCart } from "../ReduxStore/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getImageURL } from "../hooks/utils";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const handleRemove = (product) => {
    dispatch(removeFromwishlist(product));
    toast.info(`${product.name} removed from wishlist`);
  };

  const handlecart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section
      className={`min-h-screen py-12 px-6 transition-all duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* 🧡 Heading */}
        <h2
          className={`text-4xl font-extrabold text-center mb-12 tracking-wide ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          ❤️ My Wishlist
        </h2>

        {/* 🛒 Empty Wishlist */}
        {wishlistItems.length === 0 ? 
        (
          <div
  className={`flex flex-col items-center justify-center py-20 px-6 text-center ${
    isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
  }`}
>
  {/* Heart Icon */}
  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-pink-300 to-red-400 shadow-lg">
    <span className="text-4xl">❤️</span>
  </div>

  {/* Title */}
  <h2 className="text-3xl font-extrabold mb-3">Your Wishlist is Empty</h2>

  {/* Subtitle */}
  <p
    className={`text-lg font-medium mb-8 ${
      isDark ? "text-gray-400" : "text-gray-600"
    }`}
  >
    Looks like you haven’t added anything yet.  
    <br /> Start exploring and add your favorite items!
  </p>

  {/* Button */}
  <button
    onClick={() => navigate("/products")}
    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
  >
    Browse Products
  </button>
</div>

        ) 
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className={`relative rounded-2xl p-6 flex flex-col items-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  isDark
                    ? "bg-gray-800 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                    : "bg-white"
                }`}
              >
                {/* 🖼️ Product Image */}
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={getImageURL(product.image)}
                    alt={product.name}
                    onError={(e) => (e.target.src = "/Images/placeholder.jpg")}
                    className="w-44 h-44 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* 📝 Product Info */}
                <div className="text-center mb-4">
                  <h3
                    className={`text-xl font-semibold mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-lg font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    ₹{product.price}
                  </p>
                </div>

                {/* 🧾 Buttons */}
                <div className="flex gap-4 mt-auto w-full justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium shadow-md transition duration-200 hover:shadow-lg"
                  >
                    Remove
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlecart(product);
                    }}
                    className={`flex-1 py-2 rounded-lg font-medium shadow-md transition duration-200 hover:shadow-lg ${
                      isDark
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* 🏷️ Stylish Corner Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                    isDark
                      ? "bg-blue-700 text-blue-100"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  Wishlisted
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
