import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import useAuthStore from "../store/useAuthStore";
import { assets } from "../assets/assets";

const Navbar = () => {
  let navigate = useNavigate();
  const { authUser, checkAuth, logout, credits, checkCredits } = useAuthStore();
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    checkAuth();
    if (authUser) {
      checkCredits();
    }
  }, [checkAuth]);

  return (
    <div className="mx-4 py-3 lg:py-4 lg:mx-44 flex items-center justify-between">
      <Link to={"/"}>
        <p className="text-xl sm:text-3xl font-medium">bg.remove</p>
      </Link>

      {!authUser ? (
        <Link to={"/login"}>
          <button className="bg-black text-white px-4 py-1 rounded-4xl font-medium text-lg sm:px-8 cursor-pointer sm:py-2.5">
            Get started
          </button>
        </Link>
      ) : (
        <div className="flex items-center gap-5 ">
          <div>
            <Link to={"/credits"}>
              <button className="flex items-center gap-2 sm:gap-3 bg-blue-100 px-4 sm:px-7 py-2 cursor-pointer rounded-full">
                <img
                  className="w-7 max-sm:w-4"
                  src={assets.credit_icon}
                  alt=""
                />
                <p className="text-sm sm:text-lg text-neutral-700">
                  <span className="max-sm:hidden ">Credits :</span> {credits}
                </p>
              </button>
            </Link>
          </div>
          <p className="text-lg font-semibold max-sm:hidden">
            Hyy , {authUser.firstName}
          </p>
          <button
            onClick={() => logout()}
            className=" border border-red-600 text-red-600 px-4  rounded-4xl font-medium text-lg max-sm:text-sm sm:px-8 cursor-pointer py-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
