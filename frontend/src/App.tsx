// This APP.tsx is the template for the single-page application

import { Route, Routes } from "react-router-dom"; 
// Routes = container for all Route components; renders the 1st matched Route
// Route = matches a specified path and renders a specified component

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SIgnup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";


const auth = useAuth();

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </main>
    
  );
}

export default App;
