"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", maxWidth: "24rem" }}
    >
      <div className="glass rounded-2xl border border-purple-500/12 shadow-2xl shadow-black/50" style={{ padding: "2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="text-2xl font-bold text-slate-100" style={{ marginBottom: "0.25rem" }}>Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to your Nocodly AI account</p>
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={googleLoading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            padding: "0.625rem 1rem",
            marginBottom: "1.5rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "0.5rem",
            color: "#e2e8f0",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: googleLoading ? "not-allowed" : "pointer",
            opacity: googleLoading ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
        >
          {googleLoading ? (
            <Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
          )}
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <span style={{ background: "#0f0f1a", padding: "0 0.75rem", fontSize: "0.75rem", color: "#475569" }}>or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label className="block text-xs font-medium text-slate-400" style={{ marginBottom: "0.375rem" }}>Email</label>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-red-400" style={{ marginTop: "0.25rem" }}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.375rem" }}>
              <label className="text-xs font-medium text-slate-400">Password</label>
              <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                {showPassword ? <EyeOff style={{ width: "1rem", height: "1rem" }} /> : <Eye style={{ width: "1rem", height: "1rem" }} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400" style={{ marginTop: "0.25rem" }}>{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#64748b", marginTop: "1.5rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Create one free
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
