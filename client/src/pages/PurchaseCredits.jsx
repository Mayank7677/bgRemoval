import React from "react";
import { assets, plans } from "../assets/assets";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const PurchaseCredits = () => {
  const { checkCredits, credits } = useAuthStore();
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {

          const { data } = await axiosInstance.post(
            "/api/user/verify-razor",
            response
          );
          if (data.success) {
            checkCredits();
            navigate("/");
            toast.success("Credit Added");
          }
          
        } catch (error) {
          console.log('error in handler : ', error)
          toast.error(error?.response)
        }
      },
    };

    const rzp = new window.Razorpay(options)
    rzp.open()
  };

  const paymentRazorpay = async (planId) => {
    try {
      const { data } = await axiosInstance.post(`/api/user/pay-razor`, {
        planId,
      });

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log("error in paymentRazorpay : ", error);
      toast.error(error?.message);
    }
  };

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
          return (
            <div className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 ">
              <img src={assets.logo_icon} width={40} alt="" />
              <p className="mt-3 font-semibold">{dets.id}</p>
              <p className="text-sm">{dets.desc}</p>

              <p className="mt-6">
                <span className="text-3xl font-medium">${dets.price}</span>/
                {dets.credits} credits
              </p>
              <button
                onClick={() => paymentRazorpay(dets.id)}
                className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:bg-white hover:text-gray-800 hover:border border-neutral-300 transition-all duration-500 cursor-pointer"
              >
                Purchase
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseCredits;
