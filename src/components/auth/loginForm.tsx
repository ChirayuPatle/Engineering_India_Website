"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP verification and error state for login
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!signIn) {
      setError("Authentication is not available");
      return;
    }
    try {
      const result = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/profile",
      });
    } catch (err: any) {
      console.error("Error during Google login:", err);
      setError(err.errors ? err.errors[0].message : "Login failed");
    }
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      if (!signIn) {
        setError("Authentication is not available");
        return;
      }
      const result = await signIn.create({
        identifier: email,
        password: password,
      });
      if (result.status === "complete") {
        if (setActive) {
          await setActive({ session: result.createdSessionId });
        }
        router.push("/profile");
      } else if (result.status === "needs_second_factor") {
        // OTP or second factor is required
        setPendingVerification(true);
      }
    } catch (err: any) {
      console.error("Error during login:", err);
      setError(err.errors ? err.errors[0].message : "Login failed");
    }
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      if (!signIn) {
        setError("Authentication is not available");
        return;
      }
      const result = await signIn.attemptSecondFactor({
        code,
        strategy: "phone_code",
      });
      if (result.status === "complete") {
        if (setActive) {
          await setActive({ session: result.createdSessionId });
        }
        router.push("/profile");
      }
    } catch (err: any) {
      console.error("Error during OTP verification:", err);
      setError(err.errors ? err.errors[0].message : "Verification error");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        {!pendingVerification ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="relative hidden bg-muted md:block">
                  <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
                <form className="p-4 sm:p-6 md:p-8" onSubmit={handleLogin}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold sm:text-3xl">
                        Welcome 😄!
                      </h1>
                      <p className="text-balance text-sm text-muted-foreground sm:text-base">
                        Login to your account
                      </p>
                    </div>
                    {error && (
                      <p className="text-center text-sm text-red-600">
                        {error}
                      </p>
                    )}
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder="Email or Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                          {showPassword ? (
                            <Eye className="w-5" />
                          ) : (
                            <EyeOff className="w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                      <Button
                        type="button"
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="flex w-full items-center justify-center gap-2 px-4 py-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="font-medium">
                          Continue with Google
                        </span>
                      </Button>
                    </div>
                  </div>
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
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    OTP Verification
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Please enter the OTP sent to your email
                  </p>
                </div>
                {error && (
                  <p className="mt-4 text-center text-sm text-red-600">
                    {error}
                  </p>
                )}
                <form
                  onSubmit={handleVerify}
                  className="mt-6 flex flex-col gap-4"
                >
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
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default LoginForm;
