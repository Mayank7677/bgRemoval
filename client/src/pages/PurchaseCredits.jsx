import React from "react";
import { assets, plans } from "../assets/assets";

const PurchaseCredits = () => {
  return (
    <div className="min-h-[75vh] text-center pt-14 mb-10">
      <button class="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>

      <h1 class="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10">
        Choose the plan that's right for you
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((dets, i) => {
         return <div className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 ">
            <img src={assets.logo_icon} width={40} alt="" />
            <p className="mt-3 font-semibold">{dets.id}</p>
            <p className="text-sm">{dets.desc}</p>

            <p className="mt-6">
              <span className="text-3xl font-medium">${dets.price}</span>/
              {dets.credits} credits
            </p>
            <button className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:bg-white hover:text-gray-800 hover:border border-neutral-300 transition-all duration-500 cursor-pointer">
              Purchase
            </button>
          </div>;
        })}
      </div>
    </div>
  );
};

export default PurchaseCredits;
