import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090f] grid-pattern flex flex-col">
      {/* Aurora */}
      <div className="aurora" />

      {/* Logo */}
      <div className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-100">
            Nocodly <span className="gradient-text">AI</span>
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-16">
        {children}
      </div>
    </div>
  );
}
