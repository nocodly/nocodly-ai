"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      // PKCE flow: code in query params
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          router.replace("/login?error=auth_failed");
          return;
        }
        router.replace("/dashboard");
        return;
      }

      // Implicit flow: tokens in URL hash — Supabase client auto-parses them
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/dashboard");
        return;
      }

      // Wait for auth state change (hash tokens processed async)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session) {
            subscription.unsubscribe();
            router.replace("/dashboard");
          }
        }
      );

      // Fallback timeout
      setTimeout(() => {
        subscription.unsubscribe();
        router.replace("/login?error=auth_timeout");
      }, 6000);
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", background: "#09090f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "2.5rem",
          height: "2.5rem",
          border: "3px solid rgba(139,92,246,0.3)",
          borderTopColor: "#8b5cf6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 1rem",
        }} />
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Signing you in...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
