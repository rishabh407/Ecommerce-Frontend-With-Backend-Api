import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../ReduxStore/cartSlice";
import { addtowishlist } from "../ReduxStore/whishlist";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart, FaStar } from "react-icons/fa";
import { getImageURL } from "../hooks/utils";

const ProductDetails = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    fetchProductById,
    singleProduct,
    setsingleProduct,
    fetchProductByCategory,
    categorywisedata,
    loading,
  } = useProducts();

  const [productcategory, setproductcategory] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Fetch product by ID
  useEffect(() => {
    if (!id) return;
    setsingleProduct(null);
    fetchProductById(id);
  }, [id]);

  // When product is loaded, set its category and main image
  useEffect(() => {
    if (singleProduct && singleProduct.category) {
      setproductcategory(singleProduct.category);
      setActiveImage(singleProduct.image);
    }
  }, [singleProduct]);

  // Fetch related products
  useEffect(() => {
    if (productcategory) fetchProductByCategory(productcategory);
  }, [productcategory]);

  // Handlers
  const handlecart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  const handleaddtowishlist = (item) => {
    dispatch(addtowishlist(item));
    toast.success(`${item.name} added to wishlist!`);
  };

  // Theme classes
  const pageBg =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-50 text-gray-900";
  const cardBg =
    theme === "dark"
      ? "bg-gray-800 text-gray-100"
      : "bg-white text-gray-900";

  if (loading || !singleProduct)
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${pageBg}`}
      >
        <p className="text-lg animate-pulse">Loading product details...</p>
      </div>
    );

  // Combine main image + extra images for consistent thumbnails
  const allImages = [
    singleProduct.image,
    ...(singleProduct.images || []).filter((img) => img !== singleProduct.image),
  ];

  return (
    <>
      {/* ------------------- PRODUCT DETAILS ------------------- */}
      <section className={`min-h-screen py-16 px-6 flex justify-center ${pageBg}`}>
        <div
          className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl shadow-lg overflow-hidden p-8 ${cardBg}`}
        >
          {/* LEFT SIDE - IMAGE GALLERY */}
          <div className="flex flex-col items-center">
            <div className="w-full">
              <img
                src={getImageURL(activeImage)}
                alt={singleProduct.title}
                className="rounded-xl object-cover w-full h-96 md:h-[500px] shadow-lg transition-all duration-500"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={getImageURL(img)}
                  alt={`thumb-${index}`}
                  className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    activeImage === img
                      ? "border-blue-500 border-4 scale-105"
                      : "border-gray-300 border-4 hover:scale-105"
                  }`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCT INFO */}
          <div className="flex flex-col justify-start space-y-5">
            {/* Title */}
            <h1 className="text-3xl font-bold leading-snug">
              {singleProduct.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-sm">
                {singleProduct.rating || 4.5} ⭐ (
                {singleProduct.totalReviews || 120} reviews)
              </span>
            </div>

            {/* Brand */}
            <p className="text-sm italic text-gray-500 dark:text-gray-400">
              Brand: {singleProduct.brand || "N/A"}
            </p>

            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">Category:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {singleProduct.category || "Unknown"}
              </span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-3 border-t border-b py-3">
              <h2 className="text-3xl font-semibold text-green-600">
                ₹{singleProduct.discountedPrice || singleProduct.price}
              </h2>
              {singleProduct.discountPercentage && (
                <>
                  <span className="line-through text-gray-400 text-lg">
                    ₹{singleProduct.price}
                  </span>
                  <span className="text-red-500 font-medium">
                    -{singleProduct.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <p
              className={`font-medium ${
                singleProduct.stock > 10 ? "text-green-600" : "text-red-500"
              }`}
            >
              {singleProduct.stock > 10
                ? "In Stock"
                : `Only ${singleProduct.stock} left!`}
            </p>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p
                className={`leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {singleProduct.description}
              </p>
            </div>

            {/* Tags */}
            {singleProduct.tags && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {singleProduct.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Seller */}
            {singleProduct.seller && (
              <div
                className={`p-4 rounded-lg border mt-4 ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <h3 className="font-semibold mb-1">Seller Information:</h3>
                <p className="text-sm">
                  {singleProduct.seller.name} ({singleProduct.seller.rating}⭐)
                </p>
                <p className="text-xs text-gray-500">
                  {singleProduct.seller.location}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => handlecart(singleProduct)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
              >
                <MdOutlineShoppingCart className="inline mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => handleaddtowishlist(singleProduct)}
                className="flex-1 px-6 py-3 rounded-lg font-medium border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaHeart className="inline mr-2 text-red-500" />
                Add to Wishlist
              </button>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition w-fit"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </section>

<section
  className={`py-12 ${
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
      : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
  }`}
>
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-8 text-center">
      Related Products
    </h2>

    {/* Grid layout instead of scroll */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categorywisedata.slice(0, 8).map((item) => (
        <Link
          key={item.id}
          to={`/products/${item.id}`}
          className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <img
              src={getImageURL(item.image)}
              alt={item.title}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col items-center text-center">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {item.brand || "Brand"}
            </p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm text-gray-400">
                {item.rating || 4.5}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold text-lg">
                ₹{item.discountedPrice || item.price}
              </span>
              {item.discountPercentage && (
                <span className="text-sm line-through text-gray-400">
                  ₹{item.price}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

    </>
  );
};

export default ProductDetails;
