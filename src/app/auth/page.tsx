"use client"

import LoginForm from "@/components/auth/loginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:px-6 md:p-10">
      <div className="w-full md:max-w-[85vw] lg:max-w-[60vw]">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;