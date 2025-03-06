"use client";

import SignupForm from "@/components/auth/signupForm";

const Signup = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
