"use client";

import React from "react";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side: hidden on smaller screens */}
      <div className="relative hidden w-1/2 flex-col justify-center bg-black p-12 text-white md:flex">
        <h1 className="absolute inset-0 left-16 top-40 mb-4 w-full text-5xl font-bold">
          Join The Community !
        </h1>
        <img src="./auth-2.svg" alt="" />
      </div>

      {/* Right side: login form */}
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
