import Link from "next/link";
import { Sparkles, ExternalLink, AtSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-20">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-slate-100">
                Nocodly <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
              AI-powered SaaS platform for modern teams.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Link href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                <AtSign className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Changelog", "Roadmap"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Nocodly AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with Next.js, Supabase & OpenAI
          </p>
        </div>
      </div>
    </footer>
  );
}
