"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!signUp) {
      setError("Authentication is not available");
      return;
    }
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/profile",
      });
    } catch (err: any) {
      console.error("Error during Google signup:", err);
      setError(err.errors ? err.errors[0].message : "Signup failed");
    }
  };

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      if (!signUp) {
        setError("Authentication is not available");
        return;
      }
      const result = await signUp.create({
        emailAddress: email,
        password: password,
      });
      if (result.status === "complete") {
        if (setActive) {
          await setActive({ session: result.createdSessionId });
        }
        router.push("/profile");
      }
      // If email verification or additional steps are required, handle them here.
    } catch (err: any) {
      console.error("Error during signup:", err);
      setError(err.errors ? err.errors[0].message : "Signup failed");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <motion.div>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative hidden bg-muted md:block">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <form className="p-4 sm:p-6 md:p-8" onSubmit={handleSignup}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Create Account 😄!
                  </h1>
                  <p className="text-balance text-sm text-muted-foreground sm:text-base">
                    Sign up to get started
                  </p>
                </div>
                {error && (
                  <p className="text-center text-sm text-red-600">{error}</p>
                )}
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <Button
                    type="button"
                    onClick={handleGoogleSignup}
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
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default SignupForm;
