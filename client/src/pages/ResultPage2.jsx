import React, { useEffect } from "react";
import useImageResult from "../store/useImageResult";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const ResultPage2 = () => {
  const navigate = useNavigate();
  const { previewImage, resultImage, resetImages, resloading } =
    useImageResult();
  const { checkCredits } = useAuthStore();
  useEffect(() => {
    if (resultImage) {
      checkCredits();
    }
  }, [resultImage]);

  return (
    <div className="mx-4 py-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/* left side  */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <div>
              <img
                // className="rounded-md border border-neutral-200 h-full w-full"
                className="rounded-md border border-neutral-200 w-full h-[400px] object-contain"
                src={previewImage}
                alt=""
              />
            </div>
          </div>

          {/* right side  */}

          <div>
            <p className="font-semibold text-gray-600 mb-2">Inhanced Image</p>
            <div className="rounded-md border border-gray-300 w-full h-full relative  overflow-hidden">
              {/* {resultImage ? (
                <img
                  //   className="rounded-md border border-neutral-200 w-fit h-fit"
                  className="rounded-md border border-neutral-200 w-full h-[400px] object-contain"
                  src={resultImage}
                  alt=""
                />
              ) : (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                  <div className="border-4 border-violet-600 rounded-full h-10 w-10 border-t-transparent animate-spin"></div>
                </div>
              )} */}

              {resloading ? (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="border-4 border-violet-600 rounded-full h-10 w-10 border-t-transparent animate-spin"></div>
                </div>
              ) : resultImage ? (
                <img
                  className="rounded-md border border-neutral-200 w-full h-[400px] object-contain"
                  src={resultImage}
                  alt=""
                />
              ) : (
                <div className="text-gray-500 text-center py-10">
                  No image result
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-13">
          <button
            onClick={() => {
              resetImages();
              window.scrollTo(0, 0);
              navigate("/");
            }}
            className="px-8 cursor-pointer py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700"
          >
            Back
          </button>

          <a
            href={resultImage}
            download
            className="px-8 py-2.5 cursor-pointer text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
          >
            Download image
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultPage2;
