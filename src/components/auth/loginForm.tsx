"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onResponse: () => {
            setLoading(false);
          },
          onError: (ctx) => {
            setLoading(false);
            console.error("Auth error:", ctx.error);

            // Handle specific error cases
            if (ctx.error.message?.includes("offline")) {
              toast.error(
                "Authentication failed. Please clear your browser cache and try again.",
              );
            } else {
              toast.error("Failed to sign in. Please try again.");
            }
          },
        },
      );
    } catch (error) {
      setLoading(false);
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in. Please try again.");
    }
  };

  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <motion.div
        key="login-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Sign In</h1>
        <p className="mb-6 text-sm text-gray-600">Login to your account</p>

        <div className="flex flex-col gap-4">
          {/* Google Sign In */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="flex w-full items-center justify-center gap-2 px-4 py-2"
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <div className="flex items-center gap-x-2">
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
                <span className="font-medium">Continue with Google</span>
              </div>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="mt-4 text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}

export default LoginForm;
