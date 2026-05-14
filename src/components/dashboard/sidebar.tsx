"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  History,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Generate", icon: Sparkles, href: "/dashboard/generate" },
  { label: "History", icon: History, href: "/dashboard/history" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-60 min-h-screen flex flex-col border-r border-white/5 bg-[#09090f]/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="p-5 pb-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.35)] group-hover:shadow-[0_0_18px_rgba(139,92,246,0.5)] transition-all">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-slate-100 text-sm">Nocodly</span>
            <span className="gradient-text font-semibold text-sm"> AI</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-xs font-medium text-slate-600 uppercase tracking-wider px-3 py-2">
          Menu
        </p>
        {NAV.map(({ label, icon: Icon, href }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group relative",
                active
                  ? "bg-purple-500/12 text-purple-300 font-medium shadow-[inset_0_0_0_1px_rgba(139,92,246,0.15)]"
                  : "text-slate-500 hover:text-slate-200 hover:bg-white/4"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  active ? "text-purple-400" : "text-slate-600 group-hover:text-slate-400"
                )}
              />
              <span>{label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto text-purple-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Plan badge */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-br from-purple-500/8 to-cyan-500/6 border border-purple-500/12">
        <div className="text-xs text-slate-400 mb-1">Current Plan</div>
        <div className="text-sm font-semibold gradient-text">Free Tier</div>
        <div className="text-xs text-slate-600 mt-0.5">0 / 10 generations</div>
        <Link
          href="/dashboard/billing"
          className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          Upgrade to Pro <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Sign out */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
