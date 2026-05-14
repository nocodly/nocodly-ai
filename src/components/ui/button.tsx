"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090f] disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default: "btn-primary px-5 py-2.5",
        outline:
          "border border-purple-500/30 bg-transparent text-slate-200 hover:bg-purple-500/10 hover:border-purple-500/50 px-5 py-2.5",
        ghost:
          "bg-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200 px-5 py-2.5",
        secondary:
          "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/8 px-5 py-2.5",
        destructive:
          "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-5 py-2.5",
        link: "text-purple-400 underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-xs px-3",
        lg: "h-12 text-base px-8",
        xl: "h-14 text-base px-10",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
