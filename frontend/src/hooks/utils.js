// utils.js
export const getImageURL = (path) => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  if (!path) return ""; // return empty string or placeholder image if path is null/undefined
  if (path.startsWith("http")) return path; // already a full URL

  // ensure single slash between baseURL and path
  return `${baseURL}/${path.replace(/^\/+/, "")}`;
};
