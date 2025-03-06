"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SignupForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  // Signup form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP verification and error state
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      await signUp?.create({
        emailAddress: email,
        password: password,
        username: username,
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("Error during signup:", err);
      setError(err.errors ? err.errors[0].message : "Signup error");
    }
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const completeSignup = await signUp!.attemptEmailAddressVerification({ code });
      if (completeSignup.status === "complete") {
        await setActive!({ session: completeSignup.createdSessionId });
        router.push("/profile");
      } else {
        console.log("Verification pending", completeSignup);
      }
    } catch (err: any) {
      console.error("Error during OTP verification:", err);
      setError(err.errors ? err.errors[0].message : "Verification error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:px-6 md:p-10">
      <AnimatePresence mode="wait">
        {!pendingVerification ? (
          <motion.div
            key="signup-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full md:max-w-[85vw] lg:max-w-[60vw]"
          >
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="relative hidden md:block">
                  <img
                    src="/placeholder.svg"
                    alt="Signup Illustration"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-50 dark:grayscale"
                  />
                </div>
                <form className="p-4 sm:p-6 md:p-8" onSubmit={handleSignup}>
                  <div className="flex flex-col gap-6">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold sm:text-3xl">Create Account</h1>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Sign up for a new account
                      </p>
                    </div>
                    {error && <p className="text-center text-sm text-red-600">{error}</p>}
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {/* Password Field with Toggle */}
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <Eye className="w-5" /> : <EyeOff className="w-5" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                  <div id="clerk-captcha"></div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="otp-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full md:max-w-[85vw] lg:max-w-[60vw]"
          >
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">Email Verification</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Please enter the OTP sent to your email
                  </p>
                </div>
                {error && (
                  <p className="mt-4 text-center text-sm text-red-600">{error}</p>
                )}
                <form onSubmit={handleVerify} className="mt-6 flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupForm;
