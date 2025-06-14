import React from "react";

const ResultPage = () => {
  return (
    <div className="mx-4 py-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        <div className="flex flex-col sm:grid grid-cols-2 gap-8">
          {/* left side  */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border border-neutral-200 h-full"
              src="https://sb.kaleidousercontent.com/67418/992x558/b024f7a4e1/stunning-quality-product.png"
              alt=""
            />
          </div>

          {/* right side  */}

          <div>
            <p className="font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {/* <img
              className="rounded-md border border-neutral-200"
              src="https://sb.kaleidousercontent.com/67418/992x558/235d7eafc9/stunning-quality-prodcut-transp.png"
              alt=""
            /> */}

              {/* loader */}
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-4 border-violet-600 rounded-full h-10 w-10 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-13">
          <button className="px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700">
            Try another image
          </button>
          <a
            href=""
            className="px-8 py-2.5 text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700"
          >
            Download image
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
