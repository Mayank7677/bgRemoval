import React, { useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import useImageResult from "../store/useImageResult";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const HeroSection = () => {

  const { authUser, checkAuth, logout, credits, checkCredits } = useAuthStore();
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    checkAuth();
    if (userData) {
      checkCredits();
    }
  }, [checkAuth]);

  const { handleRemoveBg } = useImageResult();
  let navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];


    if (credits === 0) {
      toast.error('No credits left')
      return
    }

    if (file) {
      navigate("/result");
      await handleRemoveBg(file);
    }
  };

  
  return (
    <div className=" flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-7xl font-bold text-neutral-700 ">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" /> images for free.
        </h1>
        <p className="my-6 text-[15px] text-gray-500 font-medium">
          Remove Image Background . <br className="max-sm:hidden" /> Fully
          automated in 5 seconds with 1 click
        </p>

        <div>
          <input
            onChange={handleImageChange}
            type="file"
            name="img1"
            id="img1"
            hidden
          />
          <label
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to bg-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
            htmlFor="img1"
          >
            <p className="text-2xl text-white">
              {" "}
              <IoCloudUploadOutline />
            </p>

            <p className="text-white font-semibold">Upload your image</p>
          </label>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <img
          src="https://bg-remover-gs.vercel.app/assets/header_img-mdrOD-tk.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroSection;
