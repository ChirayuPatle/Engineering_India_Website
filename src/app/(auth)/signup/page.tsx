import SignupForm from "@/components/auth/signupForm";
import React from "react";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:px-6 md:p-10">
      <div className="w-full md:max-w-[85vw] lg:max-w-[80vw]">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
