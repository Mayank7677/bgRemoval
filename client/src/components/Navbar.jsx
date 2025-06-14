import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <div className="mx-4 py-3 lg:py-4 lg:mx-44 flex items-center justify-between">
      <Link to={"/"}>
        <p className="text-xl sm:text-3xl font-medium">bg.remove</p>
      </Link>

      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-black text-white px-4 py-1 rounded-4xl font-medium text-lg sm:px-8 cursor-pointer sm:py-2.5"
        >
          Get started
        </button>
      )}
    </div>
  );
};

export default Navbar;
