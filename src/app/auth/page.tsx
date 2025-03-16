"use client";

import React from "react";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side: hidden on smaller screens */}
      <div className="hidden relative w-1/2 bg-black text-white md:flex flex-col justify-center p-12">
        <h1 className="text-5xl w-full absolute inset-0 top-40 left-16 font-bold mb-4">Join The Community !</h1>
        <img src="./auth-2.svg" alt="" />
      </div>

      {/* Right side: login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
        <LoginForm />
      </div>
    </div>
  );
}
