"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors hover:bg-white/6 border border-white/5">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 transition-colors hover:bg-white/6 border border-white/5 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
        </button>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.3)]">
          U
        </div>
      </div>
    </div>
  );
}
