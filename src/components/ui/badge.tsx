import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const variantStyles = {
  default: "bg-purple-500/12 text-purple-300 border-purple-500/20",
  success: "bg-emerald-500/12 text-emerald-300 border-emerald-500/20",
  warning: "bg-amber-500/12 text-amber-300 border-amber-500/20",
  error: "bg-red-500/12 text-red-300 border-red-500/20",
  info: "bg-cyan-500/12 text-cyan-300 border-cyan-500/20",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
