import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@/lib/api-client";
import App from "./App";
import "./index.css";

// Configure API client base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
setBaseUrl(API_URL);
console.log('[SparkSTEM] API configured:', API_URL);

createRoot(document.getElementById("root")!).render(<App />);
