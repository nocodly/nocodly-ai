"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f0f1a",
            border: "1px solid rgba(139,92,246,0.2)",
            color: "#f8fafc",
          },
        }}
      />
    </ThemeProvider>
  );
}
