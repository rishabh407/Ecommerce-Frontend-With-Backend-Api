import React, { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../ReduxStore/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getImageURL } from "../hooks/utils";

const Checkout = () => {
  const { theme } = useContext(ThemeContext);
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key].trim()) {
        toast.error("Please fill all fields before submitting!");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    if (validateForm()) {
      setOrderPlaced(true);
      toast.success("✅ Order placed successfully!");
      dispatch(clearCart());
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardName: "",
      });
    }
  };

  // Styling variables
  const inputBase =
    "w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300";
  const inputStyle =
    theme === "dark"
      ? `${inputBase} bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`
      : `${inputBase} bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600`;

  const cardBase =
    "rounded-2xl shadow-lg p-6 transition-all duration-300 backdrop-blur-sm";
  const cardStyle =
    theme === "dark"
      ? `${cardBase} bg-gray-800 border border-gray-700`
      : `${cardBase} bg-white border border-gray-200`;

  const headingStyle =
    theme === "dark" ? "text-white font-bold" : "text-gray-900 font-bold";
  const labelStyle =
    theme === "dark" ? "text-gray-200 font-medium" : "text-gray-800 font-medium";
  const textStyle = theme === "dark" ? "text-gray-300" : "text-gray-700";

  // ✅ Order confirmation screen
  if (orderPlaced) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div
          className={`p-10 rounded-3xl shadow-2xl text-center ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <img
            src="/Images/success.gif"
            alt="Success"
            className="w-32 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-green-500 mb-2">
            ✅ Order Confirmed!
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Thank you for your purchase. Your order is being processed and will
            be delivered soon.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen py-12 px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10"
      >
        {/* LEFT SIDE - FORM */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className={cardStyle}>
            <h2 className={`text-2xl mb-6 ${headingStyle}`}>
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className={labelStyle}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="New Delhi"
                />
              </div>
              <div>
                <label className={labelStyle}>Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="110001"
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className={cardStyle}>
            <h2 className={`text-2xl mb-6 ${headingStyle}`}>Payment Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>
              <div>
                <label className={labelStyle}>Expiration Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className={labelStyle}>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="123"
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Place Order
          </button>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        {/* RIGHT SIDE - ORDER SUMMARY */}
<div className={cardStyle}>
  <h2 className={`text-2xl mb-4 ${headingStyle}`}>🧾 Order Summary</h2>

  {items.length > 0 ? (
    <>
      {/* ✅ Hidden Scrollbar but scroll still works */}
      <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide pr-2 scroll-smooth">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center pb-3 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={getImageURL(item.image)}
                alt={item.name}
                onError={(e) => (e.target.src = "/Images/placeholder.jpg")}
                className="w-14 h-14 object-cover rounded-lg shadow"
              />
              <div>
                <p className={`font-semibold ${textStyle}`}>{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className={`font-medium ${textStyle}`}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr
        className={`my-4 ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      />

      <div className="flex justify-between text-lg mb-1">
        <span>Subtotal</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg mb-1">
        <span>Shipping</span>
        <span className="font-semibold text-green-600">Free</span>
      </div>

      {/* Highlighted Total */}
      <div className="mt-5 py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex justify-between font-bold text-lg">
        <span>Total (incl. tax)</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => dispatch(clearCart())}
        type="button"
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
      >
        Clear Cart
      </button>
    </>
  ) : (
    <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
  )}
</div>

      </form>
    </section>
  );
};

export default Checkout;
