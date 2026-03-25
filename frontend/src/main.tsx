import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// Configure API client base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
setBaseUrl(API_URL);
console.log('[SparkSTEM] API configured:', API_URL);

createRoot(document.getElementById("root")!).render(<App />);
