import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";
import PurchaseCredits from "./pages/PurchaseCredits";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useAuthStore from "./store/useAuthStore";
import ResultPage2 from "./pages/ResultPage2";
import ForgotPass from "./pages/ForgotPass";

const App = () => {
  const location = useLocation();

  // Hide navbar on login/signup
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/reset";

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Optional: use global store to recheck session on load
  const { checkAuth, credits, checkCredits, authUser } = useAuthStore();
  
  useEffect(() => {
    checkAuth()
  }, []);

  useEffect(() => {
    if (authUser) {
      checkCredits();
    }
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/reset"
          element={!authUser ? <ForgotPass /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/result"
          element={authUser ? <ResultPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/result2"
          element={authUser ? <ResultPage2 /> : <Navigate to="/login" />}
        />
        <Route
          path="/credits"
          element={authUser ? <PurchaseCredits /> : <Navigate to="/login" />}
        />
        
      </Routes>

      {!hideNavbar && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
