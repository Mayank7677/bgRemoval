import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import PurchaseCredits from "./pages/PurchaseCredits";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/credits" element={<PurchaseCredits />} />
      </Routes>
      <Footer />

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
