const dev = window.location.hostname === "localhost";

export const API_URL = dev
  ? "http://localhost:4001/api" 
  : "https://blog-app-api-tau.vercel.app/api"; 
  