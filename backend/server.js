import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors()); // allows frontend to talk to backedn (importatn for Axios)

app.use(express.json());
// Create __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve images folder
app.use("/images", express.static(path.join(__dirname, "images")));

let products = [
  // Electronics
  {
    id: 1,
    name: "Apple iPhone 15",
    category: "electronics",
    subCategory: "smartphones",
    brand: "Apple",
    description: "Latest iPhone with A17 chip and 48MP camera.",
    price: 120000,
    discountPercentage: 10,
    discountedPrice: 108000,
    currency: "INR",
    stock: 25,
    rating: 4.8,
    totalReviews: 350,
    image: "/images/iphone15.jpg",
    images: [
      "/images/iphone15-front.jpg",
      "/images/iphone15-back.jpg",
      "/images/iphone15-side.jpg"
    ],
    tags: ["smartphone", "5G", "Apple", "iPhone", "new launch"],
    featured: true,
    seller: {
      name: "Apple Store India",
      rating: 4.9,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    category: "electronics",
    subCategory: "smartphones",
    brand: "Samsung",
    description: "High performance smartphone with AMOLED display.",
    price: 80000,
    discountPercentage: 12,
    discountedPrice: 70400,
    currency: "INR",
    stock: 30,
    rating: 4.6,
    totalReviews: 290,
    image: "/images/galaxy-s23.jpg",
    images: [
      "/images/galaxy-s23-front.jpg",
      "/images/galaxy-s23-back.jpg"
    ],
    tags: ["smartphone", "Samsung", "AMOLED", "5G"],
    featured: true,
    seller: {
      name: "Samsung Official Store",
      rating: 4.8,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 3,
    name: "Sony Headphones",
    category: "electronics",
    subCategory: "audio",
    brand: "Sony",
    description: "Noise cancelling over-ear headphones with deep bass.",
    price: 5000,
    discountPercentage: 15,
    discountedPrice: 4250,
    currency: "INR",
    stock: 40,
    rating: 4.5,
    totalReviews: 180,
    image: "/images/sony-headphones.jpg",
    images: [
      "/images/sony-headphones-front.jpg",
      "/images/sony-headphones-side.jpg"
    ],
    tags: ["headphones", "Sony", "audio", "noise cancelling"],
    featured: false,
    seller: {
      name: "Sony Electronics",
      rating: 4.7,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 4,
    name: "Apple MacBook Pro",
    category: "electronics",
    subCategory: "laptops",
    brand: "Apple",
    description: "Powerful laptop with M2 chip and retina display.",
    price: 200000,
    discountPercentage: 8,
    discountedPrice: 184000,
    currency: "INR",
    stock: 15,
    rating: 4.9,
    totalReviews: 420,
    image: "/images/macbook-pro.jpg",
    images: [
      "/images/macbook-pro-front.jpg",
      "/images/macbook-pro-side.jpg"
    ],
    tags: ["laptop", "Apple", "M2 Chip", "retina display"],
    featured: true,
    seller: {
      name: "Apple Store India",
      rating: 4.9,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 5,
    name: "Samsung Smart TV",
    category: "electronics",
    subCategory: "tv",
    brand: "Samsung",
    description: "55-inch 4K UHD smart TV with HDR support.",
    price: 75000,
    discountPercentage: 10,
    discountedPrice: 67500,
    currency: "INR",
    stock: 20,
    rating: 4.7,
    totalReviews: 200,
    image: "/images/samsung-tv.jpg",
    images: [
      "/images/samsung-tv-front.jpg",
      "/images/samsung-tv-side.jpg"
    ],
    tags: ["TV", "Samsung", "Smart TV", "4K UHD", "HDR"],
    featured: true,
    seller: {
      name: "Samsung Official Store",
      rating: 4.8,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 6,
    name: "Logitech Mouse",
    category: "electronics",
    subCategory: "accessories",
    brand: "Logitech",
    description: "Wireless ergonomic mouse with high precision.",
    price: 1500,
    discountPercentage: 5,
    discountedPrice: 1425,
    currency: "INR",
    stock: 50,
    rating: 4.4,
    totalReviews: 100,
    image: "/images/logitech-mouse.jpg",
    images: [
      "/images/logitech-mouse-top.jpg",
      "/images/logitech-mouse-side.jpg"
    ],
    tags: ["mouse", "Logitech", "wireless", "ergonomic"],
    featured: false,
    seller: {
      name: "Logitech Store",
      rating: 4.7,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 7,
    name: "Canon DSLR Camera",
    category: "electronics",
    subCategory: "cameras",
    brand: "Canon",
    description: "DSLR camera with 24MP sensor and 4K video recording.",
    price: 55000,
    discountPercentage: 12,
    discountedPrice: 48400,
    currency: "INR",
    stock: 18,
    rating: 4.6,
    totalReviews: 150,
    image: "/images/canon-dslr.jpg",
    images: [
      "/images/canon-dslr-front.jpg",
      "/images/canon-dslr-side.jpg"
    ],
    tags: ["camera", "Canon", "DSLR", "24MP", "4K"],
    featured: true,
    seller: {
      name: "Canon Store India",
      rating: 4.8,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },

  // Clothes
  {
    id: 8,
    name: "Nike T-Shirt",
    category: "clothes",
    subCategory: "tops",
    brand: "Nike",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 1200,
    discountPercentage: 10,
    discountedPrice: 1080,
    currency: "INR",
    stock: 40,
    rating: 4.5,
    totalReviews: 120,
    image: "/images/nike-tshirt.jpg",
    images: [
      "/images/nike-tshirt-front.jpg",
      "/images/nike-tshirt-back.jpg"
    ],
    tags: ["t-shirt", "Nike", "cotton", "casual"],
    featured: false,
    seller: {
      name: "Nike Official Store",
      rating: 4.8,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },

  {
    id: 9,
    name: "Adidas Hoodie",
    category: "clothes",
    subCategory: "tops",
    brand: "Adidas",
    description: "Warm hoodie with soft inner lining.",
    price: 2500,
    discountPercentage: 15,
    discountedPrice: 2125,
    currency: "INR",
    stock: 35,
    rating: 4.6,
    totalReviews: 90,
    image: "/images/adidas-hoodie.jpg",
    images: [
      "/images/adidas-hoodie-front.jpg",
      "/images/adidas-hoodie-back.jpg"
    ],
    tags: ["hoodie", "Adidas", "warm", "casual"],
    featured: true,
    seller: {
      name: "Adidas Official Store",
      rating: 4.7,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },

  {
    id: 10,
    name: "Levi's Jeans",
    category: "clothes",
    subCategory: "bottoms",
    brand: "Levi's",
    description: "Classic slim fit denim jeans.",
    price: 1800,
    discountPercentage: 8,
    discountedPrice: 1656,
    currency: "INR",
    stock: 50,
    rating: 4.4,
    totalReviews: 80,
    image: "/images/levis-jeans.jpg",
    images: [
     "/images/levis-jeans-front.jpg",
      "/images/levis-jeans-back.jpg"
    ],
    tags: ["jeans", "Levi's", "denim", "slim fit"],
    featured: false,
    seller: {
      name: "Levi's Store India",
      rating: 4.6,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },

  {
    id: 11,
    name: "Puma Shorts",
    category: "clothes",
    subCategory: "bottoms",
    brand: "Puma",
    description: "Lightweight sports shorts for running and gym.",
    price: 900,
    discountPercentage: 5,
    discountedPrice: 855,
    currency: "INR",
    stock: 60,
    rating: 4.3,
    totalReviews: 50,
    image: "/images/puma-shorts.jpg",
    images: [
      "/images/puma-shorts-front.jpg",
      "/images/puma-shorts-back.jpg"
    ],
    tags: ["shorts", "Puma", "sports", "gym"],
    featured: false,
    seller: {
      name: "Puma Official Store",
      rating: 4.5,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
   {
    id: 12,
    name: "Zara Dress",
    category: "clothes",
    subCategory: "dresses",
    brand: "Zara",
    description: "Stylish cotton dress for casual outings.",
    price: 3500,
    discountPercentage: 12,
    discountedPrice: 3080,
    currency: "INR",
    stock: 25,
    rating: 4.5,
    totalReviews: 95,
    image: "/images/zara-dress.jpg",
    images: [
      "/images/zara-dress-front.jpg",
      "/images/zara-dress-back.jpg"
    ],
    tags: ["dress", "Zara", "cotton", "fashion"],
    featured: true,
    seller: {
      name: "Zara Official Store",
      rating: 4.7,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 13,
    name: "Reebok Sweatshirt",
    category: "clothes",
    subCategory: "tops",
    brand: "Reebok",
    description: "Cozy sweatshirt for cold days.",
    price: 2200,
    discountPercentage: 10,
    discountedPrice: 1980,
    currency: "INR",
    stock: 45,
    rating: 4.4,
    totalReviews: 75,
    image: "/images/reebok-sweatshirt.jpg",
    images: [
      "/reebok-sweatshirt-front.jpg",
      "/reebok-sweatshirt-back.jpg"
    ],
    tags: ["sweatshirt", "Reebok", "winter", "fashion"],
    featured: false,
    seller: {
      name: "Reebok Store India",
      rating: 4.6,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 14,
    name: "H&M Jacket",
    category: "clothes",
    subCategory: "outerwear",
    brand: "H&M",
    description: "Fashionable jacket suitable for winter.",
    price: 2800,
    discountPercentage: 8,
    discountedPrice: 2576,
    currency: "INR",
    stock: 30,
    rating: 4.6,
    totalReviews: 110,
    image: "/images/hm-jacket.jpg",
    images: [
      "/images/hm-jacket-front.jpg",
      "/images/hm-jacket-back.jpg"
    ],
    tags: ["jacket", "H&M", "winter", "fashion"],
    featured: true,
    seller: {
      name: "H&M Store India",
      rating: 4.7,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },

  // Shoes
  {
    id: 15,
    name: "Nike Air Max",
    category: "shoes",
    subCategory: "sports",
    brand: "Nike",
    description: "Comfortable running shoes with cushioned soles.",
    price: 5000,
    discountPercentage: 10,
    discountedPrice: 4500,
    currency: "INR",
    stock: 25,
    rating: 4.7,
    totalReviews: 200,
    image: "/images/nike-airmax.jpg",
    images: [
      "/images/nike-airmax-side.jpg",
      "/images/nike-airmax-top.jpg"
    ],
    tags: ["shoes", "Nike", "running", "sports"],
    featured: true,
    seller: {
      name: "Nike Official Store",
      rating: 4.8,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 16,
    name: "Adidas Ultraboost",
    category: "shoes",
    subCategory: "sports",
    brand: "Adidas",
    description: "High-performance sports shoes with boost technology.",
    price: 6000,
    discountPercentage: 15,
    discountedPrice: 5100,
    currency: "INR",
    stock: 30,
    rating: 4.8,
    totalReviews: 240,
    image: "/images/adidas-ultraboost.jpg",
    images: [
      "/images/adidas-ultraboost-side.jpg",
      "/images/adidas-ultraboost-top.jpg"
    ],
    tags: ["shoes", "Adidas", "running", "boost"],
    featured: true,
    seller: {
      name: "Adidas Official Store",
      rating: 4.7,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 17,
    name: "Puma Sneakers",
    category: "shoes",
    subCategory: "casual",
    brand: "Puma",
    description: "Casual sneakers for everyday wear.",
    price: 3500,
    discountPercentage: 8,
    discountedPrice: 3220,
    currency: "INR",
    stock: 40,
    rating: 4.5,
    totalReviews: 160,
    image: "/images/puma-sneakers.jpg",
    images: [
      "/images/puma-sneakers-side.jpg",
      "/images/puma-sneakers-top.jpg"
    ],
    tags: ["sneakers", "Puma", "casual", "fashion"],
    featured: false,
    seller: {
      name: "Puma Official Store",
      rating: 4.6,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 18,
    name: "Reebok Classic",
    category: "shoes",
    subCategory: "casual",
    brand: "Reebok",
    description: "Classic retro sneakers with great comfort.",
    price: 4000,
    discountPercentage: 10,
    discountedPrice: 3600,
    currency: "INR",
    stock: 35,
    rating: 4.4,
    totalReviews: 130,
    image: "/images/reebok-classic.jpg",
    images: [
      "/images/reebok-classic-side.jpg",
      "/images/reebok-classic-top.jpg"
    ],
    tags: ["sneakers", "Reebok", "classic", "fashion"],
    featured: false,
    seller: {
      name: "Reebok Store India",
      rating: 4.6,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 19,
    name: "Converse All Star",
    category: "shoes",
    subCategory: "casual",
    brand: "Converse",
    description: "Timeless high-top sneakers for all occasions.",
    price: 3000,
    discountPercentage: 12,
    discountedPrice: 2640,
    currency: "INR",
    stock: 45,
    rating: 4.6,
    totalReviews: 210,
    image: "/images/converse-allstar.jpg",
    images: [
      "/images/converse-allstar-side.jpg",
      "/images/converse-allstar-top.jpg"
    ],
    tags: ["sneakers", "Converse", "high-top", "fashion"],
    featured: true,
    seller: {
      name: "Converse Official Store",
      rating: 4.7,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 20,
    name: "Woodland Boots",
    category: "shoes",
    subCategory: "outdoor",
    brand: "Woodland",
    description: "Durable boots for outdoor activities.",
    price: 4500,
    discountPercentage: 10,
    discountedPrice: 4050,
    currency: "INR",
    stock: 20,
    rating: 4.7,
    totalReviews: 140,
    image: "/images/woodland-boots.jpg",
    images: [
      "/images/woodland-boots-side.jpg",
      "/images/woodland-boots-top.jpg"
    ],
    tags: ["boots", "Woodland", "outdoor", "durable"],
    featured: true,
    seller: {
      name: "Woodland Store India",
      rating: 4.8,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 21,
    name: "Skechers Running Shoes",
    category: "shoes",
    subCategory: "sports",
    brand: "Skechers",
    description: "Lightweight shoes designed for runners.",
    price: 3800,
    discountPercentage: 15,
    discountedPrice: 3230,
    currency: "INR",
    stock: 28,
    rating: 4.6,
    totalReviews: 175,
    image: "/images/skechers-running.jpg",
    images: [
      "/images/skechers-running-side.jpg",
      "/images/skechers-running-top.jpg"
    ],
    tags: ["running", "Skechers", "lightweight", "sports"],
    featured: false,
    seller: {
      name: "Skechers Official Store",
      rating: 4.7,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },

  // Furniture
  {
    id: 22,
    name: "Ikea Chair",
    category: "furniture",
    subCategory: "chairs",
    brand: "Ikea",
    description: "Simple and comfortable wooden chair.",
    price: 2500,
    discountPercentage: 8,
    discountedPrice: 2300,
    currency: "INR",
    stock: 35,
    rating: 4.4,
    totalReviews: 80,
    image: "/images/ikea-chair.jpg",
    images: [
      "/images/ikea-chair-front.jpg",
      "/images/ikea-chair-side.jpg"
    ],
    tags: ["chair", "Ikea", "wooden", "furniture"],
    featured: false,
    seller: {
      name: "Ikea Store India",
      rating: 4.7,
      location: "Hyderabad, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 23,
    name: "Wooden Dining Table",
    category: "furniture",
    subCategory: "tables",
    brand: "HomeTown",
    description: "Spacious dining table for family meals.",
    price: 12000,
    discountPercentage: 10,
    discountedPrice: 10800,
    currency: "INR",
    stock: 20,
    rating: 4.5,
    totalReviews: 95,
    image: "/images/dining-table.jpg",
    images: [
      "/images/dining-table-top.jpg",
      "/images/dining-table-side.jpg"
    ],
    tags: ["dining", "table", "wooden", "HomeTown"],
    featured: true,
    seller: {
      name: "HomeTown Furniture",
      rating: 4.6,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 24,
    name: "Leather Sofa",
    category: "furniture",
    subCategory: "sofas",
    brand: "Nilkamal",
    description: "Premium leather sofa for living room.",
    price: 35000,
    discountPercentage: 15,
    discountedPrice: 29750,
    currency: "INR",
    stock: 15,
    rating: 4.7,
    totalReviews: 120,
    image: "/images/leather-sofa.jpg",
    images: [
      "/images/leather-sofa-front.jpg",
      "/images/leather-sofa-side.jpg"
    ],
    tags: ["sofa", "Nilkamal", "leather", "furniture"],
    featured: true,
    seller: {
      name: "Nilkamal Furniture",
      rating: 4.8,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 25,
    name: "King Size Bed",
    category: "furniture",
    subCategory: "beds",
    brand: "Wakefit",
    description: "Comfortable king size bed with mattress.",
    price: 40000,
    discountPercentage: 10,
    discountedPrice: 36000,
    currency: "INR",
    stock: 10,
    rating: 4.8,
    totalReviews:140,
    image: "/images/king-bed.jpg",
    images: [
      "/images/king-bed-top.jpg",
      "/images/king-bed-side.jpg"
    ],
    tags: ["bed", "Wakefit", "king", "mattress"],
    featured: true,
    seller: {
      name: "Wakefit Store",
      rating: 4.8,
      location: "Bangalore, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 26,
    name: "Bookshelf",
    category: "furniture",
    subCategory: "shelves",
    brand: "Ikea",
    description: "Wooden bookshelf with multiple shelves.",
    price: 8000,
    discountPercentage: 12,
    discountedPrice: 7040,
    currency: "INR",
    stock: 22,
    rating: 4.5,
    totalReviews: 85,
    image: "/images/bookshelf.jpg",
    images: [
      "/images/bookshelf-front.jpg",
      "/images/bookshelf-side.jpg"
    ],
    tags: ["bookshelf", "Ikea", "wooden", "storage"],
    featured: false,
    seller: {
      name: "Ikea Store India",
      rating: 4.7,
      location: "Hyderabad, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 27,
    name: "Office Chair",
    category: "furniture",
    subCategory: "chairs",
    brand: "Godrej",
    description: "Ergonomic office chair with adjustable height.",
    price: 6000,
    discountPercentage: 10,
    discountedPrice: 5400,
    currency: "INR",
    stock: 28,
    rating: 4.6,
    totalReviews: 100,
    image:"/images/office-chair.jpg",
    images: [
      "/images/office-chair-front.jpg",
      "/images/office-chair-side.jpg"
    ],
    tags: ["office", "chair", "Godrej", "ergonomic"],
    featured: true,
    seller: {
      name: "Godrej Interiors",
      rating: 4.7,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 28,
    name: "Coffee Table",
    category: "furniture",
    subCategory: "tables",
    brand: "HomeTown",
    description: "Stylish coffee table for living area.",
    price: 4500,
    discountPercentage: 8,
    discountedPrice: 4140,
    currency: "INR",
    stock: 40,
    rating: 4.5,
    totalReviews: 90,
    image: "/images/coffee-table.jpg",
    images: [
      "/images/coffee-table-top.jpg",
      "/images/coffee-table-side.jpg"
    ],
    tags: ["coffee", "table", "HomeTown", "furniture"],
    featured: false,
    seller: {
      name: "HomeTown Furniture",
      rating: 4.6,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 29,
    name: "TV Stand",
    category: "furniture",
    subCategory: "stands",
    brand: "Nilkamal",
    description: "Modern TV stand with storage space.",
    price: 7000,
    discountPercentage: 10,
    discountedPrice: 6300,
    currency: "INR",
    stock: 25,
    rating: 4.4,
    totalReviews: 70,
    image: "/images/tv-stand.jpg",
    images: [
      "/images/tv-stand-front.jpg",
      "/images/tv-stand-side.jpg"
    ],
    tags: ["tv stand", "Nilkamal", "storage", "furniture"],
    featured: false,
    seller: {
      name: "Nilkamal Furniture",
      rating: 4.6,
      location: "Delhi, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  },
  {
    id: 30,
    name: "Wardrobe",
    category: "furniture",
    subCategory: "storage",
    brand: "Godrej",
    description: "Spacious wardrobe with multiple compartments.",
    price: 25000,
    discountPercentage: 15,
    discountedPrice: 21250,
    currency: "INR",
    stock: 12,
    rating: 4.7,
    totalReviews: 130,
    image: "/images/wardrobe.jpg",
    images: [
      "/images/wardrobe-front.jpg",
      "/images/wardrobe-inside.jpg"
    ],
    tags: ["wardrobe", "Godrej", "storage", "furniture"],
    featured: true,
    seller: {
      name: "Godrej Interiors",
      rating: 4.8,
      location: "Mumbai, India"
    },
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z"
  }
];


// All products
app.get("/api/products", (req, res) => {
  res.json(products);
});


``
// Single product by id
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // const {id} =req.params;
  const product = products.find((p) => p.id ===id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Category Wise Products 

app.get("/api/products/category/:category",(req,res)=>{
  const category=req.params.category.toLowerCase();
  const product=products.filter((p)=>p.category.toLowerCase()===category);
  if(product.length>0){
    res.json(product);
  }else{
    res.status(404).json({message:"Category Not Found"});
  }
});

// ✅ 3. Root route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT ||5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
