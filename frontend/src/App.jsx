import React, { useState, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./pages/ScrollToTop";

// ✅ Lazy loading components
// It helps to not render each and every page at starting . With the help of this we can get a particular page when we open it.
const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const Cart = React.lazy(() => import("./pages/Cart"));
// const Profile = React.lazy(() => import("./pages/Profile"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
const Checkout = React.lazy(() => import("./pages/Checkout"));

function App() {
  
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Navbar />

        {/* Suspense shows fallback while components load */}
        <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading page...</h2>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes> 
        </Suspense>
        <Footer />
        {/* 🔥 ToastContainer must be added ONCE here .For adding a single line like items is added successfully or something else.*/}
      {/* 👇 This is required to display toast messages */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </BrowserRouter>
    </>
  );
}

export default App;
