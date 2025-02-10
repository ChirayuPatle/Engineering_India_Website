"use client";

import { userService } from "@/libs/appwrite/config";
import { FaGoogle } from "react-icons/fa";

function Page() {
  const handleUserLogin = async () => {
    const user = await userService.loginWithGoogle();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Background Image with Overlay (Shown on large screens only) */}
      <div className="hidden lg:flex lg:w-3/4 relative bg-gradient-to-br from-neutral-950 to-neutral-800 items-center justify-center p-12">
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/priyanshukayarkar/image/upload/v1739173756/Reports_2023-24_emxnkr.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div className="relative z-10 bg-black/40 p-10 text-left">
          <h1 className="text-5xl font-bold text-zinc-200">
            Welcome to Our Community!
          </h1>
          <p className="mt-4 text-xl text-zinc-400">
            Join thousands of innovators building together.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full lg:w-1/4 items-center justify-center bg-white p-6">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-gray-900 text-3xl font-bold mb-8">Get Started!</h2>
          <button
            onClick={handleUserLogin}
            className="w-full flex items-center justify-center gap-4 p-3 bg-neutral-800 text-white rounded-lg font-semibold hover:bg-neutral-700 transition"
          >
            <FaGoogle className="text-xl" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
