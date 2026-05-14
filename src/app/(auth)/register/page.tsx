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
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
});

type FormData = z.infer<typeof schema>;

const PERKS = [
  "100 free AI generations",
  "No credit card required",
  "Cancel anytime",
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.fullName } },
      });
      if (error) throw error;
      toast.success("Account created! Check your email to confirm.");
      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm"
    >
      <div className="glass rounded-2xl p-8 border border-purple-500/12 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-100 mb-1">Create your account</h1>
          <p className="text-sm text-slate-500">Start generating with AI in seconds</p>
        </div>

        {/* Perks */}
        <div className="flex flex-col gap-1.5 mb-6 p-3 rounded-xl bg-purple-500/6 border border-purple-500/12">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-xs text-slate-400">
              <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Full name</label>
            <Input {...register("fullName")} placeholder="John Doe" autoComplete="name" />
            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
            ) : (
              "Create free account"
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-4">
          By signing up you agree to our{" "}
          <Link href="#" className="text-slate-500 hover:text-slate-300 underline">Terms</Link>
          {" & "}
          <Link href="#" className="text-slate-500 hover:text-slate-300 underline">Privacy Policy</Link>
        </p>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
