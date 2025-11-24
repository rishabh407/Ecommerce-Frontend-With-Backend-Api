import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../Context/ThemeContext";
import { toast } from "react-toastify";
import useProducts from "../hooks/useProducts";
import { ContextContent } from "../Context/SearchContext";
import { addToCart } from "../ReduxStore/cartSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getImageURL } from "../hooks/utils";

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const { search } = useContext(ContextContent);
  const { products, loading } = useProducts();
  const dispatch = useDispatch();

  const [filteredproducts, setfilteredproducts] = useState([]);
  const [pprice, setprice] = useState(200000);
  const [catcategory, categorychoosen] = useState("All");
  const [sortvalue, setsortvalue] = useState("Low to High");

  const categories = ["All", "electronics", "furniture", "clothes"];

  const handlechangeprice = (e) => {
    setprice(e.target.value);
  };

  const handlecart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  // 🧠 Filtering logic
  useEffect(() => {
    if (!products) return;

    let filtered = [...products];
 
    // 🔍 Search Filter
    if (search && search.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷️ Category Filter
    if (catcategory && catcategory !== "All") {
      filtered = filtered.filter((p) => p.category === catcategory);
    }

    // 💰 Price Filter
    filtered = filtered.filter((p) => p.price <= pprice);

    // 🔃 Sort
    if (sortvalue === "Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    setfilteredproducts(filtered);
  }, [catcategory, pprice, sortvalue, products, search]);

  if (loading) return <p className="text-center text-lg mt-20">Loading products...</p>;

  return (
    <section
      className={`relative min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        {/* ---------------- Sidebar Filters ---------------- */}
        <aside
          className={`w-full md:w-1/4 rounded-xl shadow-md p-6 md:sticky md:top-20 h-fit transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Category</h3>
            <ul className="flex flex-wrap gap-2">
              {categories.map((item, index) => (
                <li
                  key={index}
                  onClick={() => categorychoosen(item)}
                  className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition
                    ${
                      catcategory === item
                        ? "bg-blue-600 text-white"
                        : `${
                            theme === "dark"
                              ? "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                              : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                          }`
                    }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price: up to ₹{pprice}</h3>
            <input
              type="range"
              min="800"
              max="200000"
              value={pprice}
              onChange={handlechangeprice}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          </div>

          {/* Sort Filter */}
          <div>
            <h3 className="font-semibold mb-2">Sort</h3>
            <div className="flex gap-2 flex-wrap">
              {["Low to High", "High to Low"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setsortvalue(item)}
                  className={`px-3 py-1 rounded-md transition ${
                    sortvalue === item
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 hover:bg-blue-500 hover:text-white"
                      : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ---------------- Products Grid ---------------- */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredproducts.length > 0 ? (
            filteredproducts.map((product) => (
              <div
                key={product.id}
                className={`relative rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                }`}
              >
                <Link to={`/products/${product.id}`}>
                  {/* 🖼️ Product Image (hover swap) */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={getImageURL(product.image)}
                      alt={product.title}
                      className="h-48 w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.target.src = "/Images/placeholder.jpg")}
                    />
                    {product.images && product.images.length > 1 && (
                      <img
                        src={getImageURL(product.images[1])}
                        alt={`${product.title} hover`}
                        className="h-48 w-full object-cover rounded-xl absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* ⭐ Rating */}
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {product.rating} ({product.totalReviews})
                      </span>
                    </div>

                    {/* Title & Brand */}
                    <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                    <p className="text-sm italic mb-2 text-gray-500 dark:text-gray-400">
                      by {product.brand || product.seller?.name}
                    </p>

                    {/* Category Badge */}
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

                    {/* Stock */}
                    <p
                      className={`text-sm mb-3 ${
                        product.stock > 10 ? "text-green-600" : "text-red-500"
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
                      className="relative w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <MdOutlineShoppingCart className="text-lg" />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found matching your filters.
            </p>
          )}
        </main>
      </div>
    </section>
  );
};

export default Products;
