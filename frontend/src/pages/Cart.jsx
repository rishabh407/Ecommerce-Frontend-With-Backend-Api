import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../ReduxStore/cartSlice";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { getImageURL } from "../hooks/utils";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const card = theme === "dark" ? "bg-gray-800" : "bg-white";

  return (
    <section className={`min-h-screen ${bg} py-12 px-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT: Cart Items */}
        <div className={`flex-1 ${card} shadow-lg rounded-2xl p-8`}>
          <h1 className="text-3xl font-bold mb-6 border-b pb-4 flex items-center gap-2">
            <MdOutlineShoppingCart className="text-blue-500 text-3xl" /> Your Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                alt="Empty Cart"
                className="w-40 mb-4 opacity-80"
              />
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                Your cart is empty. Start shopping now!
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row justify-between items-center border-b pb-6 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4 w-full sm:w-3/4">
                      <img
                        src={getImageURL(item.image)}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => dispatch(removeFromCart(item))}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                          >
                            −
                          </button>
                          <span className="text-lg font-medium">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-4 sm:mt-0 font-medium text-lg">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
                >
                  <FaTrashAlt />
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: Order Summary */}
        {items.length > 0 && (
          <aside
            className={`w-full lg:w-1/3 ${card} rounded-2xl shadow-lg p-6 lg:sticky lg:top-20 self-start`}
          >
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">Order Summary</h2>

            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span>₹{(total * 0.05).toFixed(2)}</span>
              </div>
            </div>

            <hr className="my-5 border-gray-400" />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{(total * 1.05).toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </aside>
        )}
      </div>
    </section>
  );
};

export default Cart;
