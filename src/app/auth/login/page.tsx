"use client";

import { userService } from "@/libs/appwrite/config";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const handleUserLogin = async () => {
    const user = userService.loginWithGoogle();
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 justify-center items-center p-12">
        <div>
          <h1 className="text-5xl font-bold leading-tight text-white">
            Welcome to Our Community!
          </h1>

          <p className="mt-4 text-xl text-blue-200">
            Join thousands of innovators building together.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6">
        <div className="w-full max-w-md text-center ">
          <h2 className="text-gray-900 text-3xl font-bold mb-8">
            Get's Started !
          </h2>

          <button
            onClick={() => handleUserLogin()}
            className="w-full flex gap-4 items-center justify-center p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <FaGoogle className="text-xl" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}
