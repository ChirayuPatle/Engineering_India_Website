"use client";

import SignupForm from "@/components/auth/signupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
