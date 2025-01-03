import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/LandingPage/Landingpage";
import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Settings from "./components/Settings/Settings";
import Form from "./pages/Form/Form.jsx";
import Share from "./pages/share/Share.jsx";

import { AppProvider } from "./context/index.jsx";

function App() {
  return (
    <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/form/" element={<Form />} />
        <Route path="/share/:wid" element={<Share />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
