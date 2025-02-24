"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center w-fit rounded-lg px-4 py-1 font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",

  {
    variants: {
      variant: {
        neu: " active:opacity-[0.6] border-[1px] border-[#0094FF] bg-[#0094FF] text-white shadow-[3px_3px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",

        neuOutline:
          " active:opacity-[0.6] border-[1px] border-zinc-800 bg-black text-white shadow-[2px_2px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",

        outline:
          "border border-[#0094FF] bg-transparent text-[#0094FF] hover:bg-[#0094FF]/10",

        default: "bg-blue-600 text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 text-sm",
        lg: "h-11 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "neu",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
