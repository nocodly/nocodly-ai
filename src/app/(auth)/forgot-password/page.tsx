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
import { Loader2, ArrowLeft, Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
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
        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Check your inbox</h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We sent a password reset link to{" "}
              <span className="text-slate-200 font-medium">{getValues("email")}</span>
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Back to sign in</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-100 mb-1">Reset password</h1>
              <p className="text-sm text-slate-500">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              <Link
                href="/login"
                className="flex items-center justify-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}
