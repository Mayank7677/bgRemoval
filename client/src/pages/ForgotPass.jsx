import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { CiTimer } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";


const ForgotPass = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

  const { checkMailAndSendOTP, verifyOTP, forgotPass, step, isSendingOTP } =
    useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "check") {
      await checkMailAndSendOTP(email);
    } else if (step === "verify") {
      await verifyOTP(email, otp);
    } else if (step === "forgot") {
        await forgotPass(email, password);
        navigate('/login')
    }
  };

  return (
    <section className="flex items-center justify-center h-screen ">
      <div class="flex  gap-10   rounded-4xl py-10  border-zinc-700 items-center">
        <div class="w-full flex flex-col items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            class="md:w-96 w-80 flex flex-col items-center justify-center p-5"
          >
            <h2 class="text-4xl text-gray-800 font-semibold">
              Forgot Password
            </h2>
            <p class="text-sm text-gray-800 mt-3 ">
              Enter your email and verify OTP to reset your password
            </p>

            {step === "check" && (
              <>
                <div class="flex mt-10 items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email id"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                    required
                  />
                </div>
              </>
            )}

            {step === "verify" && (
              <>
                <div class="flex mt-10 items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <CiTimer />
                  <input
                    type="text"
                    placeholder="OTP"
                    name="otp"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                    required
                  />
                </div>
              </>
            )}

            {step === "forgot" && (
              <>
                <div class="flex mt-10 items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <RiLockPasswordLine />
                  <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full "
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSendingOTP}
              class="mt-3 w-full h-11 rounded-full text-white bg-purple-600 hover:bg-purple-700 cursor-pointer hover:opacity-90 transition-opacity "
            >
              {step === "check"
                ? isSendingOTP
                  ? "Sending OTP..."
                  : "Send OTP"
                : step === "verify"
                ? "Verify OTP"
                : "Change Password"}
            </button>

            {step === "check" && (
              <p class="text-gray-700 text-sm  mt-4">
                Back to login page .{" "}
                <Link class="text-purple-600 hover:underline" to="/login">
                  Back
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPass;
