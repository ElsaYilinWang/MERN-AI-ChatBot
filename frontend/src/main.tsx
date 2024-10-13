import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

import { Toaster} from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // ReactDOM.createRoot creates a root to display React components inside a browser DOM node.
  // document.getElementById("root")! asserting that root will never be null

  // React.StrictMode is a tool to highlight potential problems in an application
  // by calling each function twice, only in dev mode
  <React.StrictMode> 
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// BrowserRouter is a component from the react-router-dom library 
// that uses the HTML5 history API to keep your UI in sync with the URL. 
// Essentially, it allows for clean, modern URLs and 
// the ability to navigate via the browser's forward and back buttons.

// ThemeProvider takes a theme prop (use createTheme to customize) and applies it to the entire React tree 
// that it is wrapping around. It should preferably be used at the root of your component tree.

// Toaster: Add beautiful notifications to your React app with https://react-hot-toast.com/docs