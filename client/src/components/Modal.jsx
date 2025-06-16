// Modal.jsx
import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [steps, setSteps] = useState("signup");

  return (
    <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50 p-2 ">
      <div className="relative bg-white rounded-4xl shadow-lg p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-5xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl text-neutral-700 font-bold mb-4 text-center">
          {steps === "login" ? "Login" : "Create Account"}
        </h2>

        {/* Form */}
        {steps === "login" ? (
          <form className="mt-15">
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border rounded-2xl outline-none border-neutral-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border rounded-2xl outline-none border-neutral-400"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-2xl hover:bg-purple-700"
            >
              Login
            </button>

            <p className="text-center mt-3">
              Don't have an account ?{" "}
              <span
                onClick={() => setSteps("steps")}
                className="text-purple-600 cursor-pointer"
              >
                Create
              </span>
            </p>
          </form>
        ) : (
          <form className="mt-15 ">
            <input
              type="text"
              placeholder="First Name"
              className="w-full mb-4 p-3 border rounded-2xl outline-none border-neutral-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full mb-4 p-3 border rounded-2xl outline-none border-neutral-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border rounded-2xl outline-none border-neutral-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border rounded-2xl outline-none border-neutral-400"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-2xl hover:bg-purple-700"
            >
              Create
            </button>

            <p className="text-center mt-3">
              Already have an account ?{" "}
              <span
                onClick={() => setSteps("login")}
                className="text-purple-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;
