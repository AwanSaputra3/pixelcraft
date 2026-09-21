"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShieldCheck, Image as ImageIcon, RotateCcw, Download, ArrowUpRight, Sliders, Wand2 } from "lucide-react";

interface HeaderProps {
  onSelectSample: (sampleUrl: string, sampleName: string) => void;
  onReset: () => void;
  onExport: () => void;
  hasImage: boolean;
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
}

export const SAMPLE_IMAGES = [
  {
    name: "Portrait",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    desc: "Great for Remove BG & Enhance",
  },
  {
    name: "Cyberpunk City",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80",
    desc: "Great for Pixel Art & Compress",
  },
  {
    name: "Low-Light Night",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    desc: "Great for Denoising & Saturation",
  },
];

export const Header: React.FC<HeaderProps> = ({
  onSelectSample,
  onReset,
  onExport,
  hasImage,
}) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070510]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070510] rounded-[9px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            PixelCraft <span className="font-light text-purple-400">Studio</span>
          </span>
        </Link>

        {/* Clean Menu Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link
            href="/"
            className={`transition-colors hover:text-white ${
              pathname === "/" ? "text-white font-semibold" : "text-gray-400"
            }`}
          >
            Home
          </Link>
          <Link
            href="/studio"
            className={`transition-colors hover:text-white ${
              pathname === "/studio" ? "text-purple-300 font-semibold" : "text-gray-400"
            }`}
          >
            Toolkit Studio
          </Link>
          <Link
            href="/editor"
            className={`transition-colors hover:text-white ${
              pathname === "/editor" ? "text-purple-300 font-semibold" : "text-gray-400"
            }`}
          >
            Pro Color Editor
          </Link>
          <span className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">
            Features
          </span>
          <span className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors flex items-center gap-1">
            Privacy <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </span>
        </nav>

        {/* Action Button & Tool Control Shortcuts */}
        <div className="flex items-center gap-3">
          {/* Quick Sample Selector (Visible on Studio & Editor pages) */}
          {pathname !== "/" && (
            <div className="hidden lg:flex items-center gap-2 mr-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> Sample:
              </span>
              <div className="flex items-center gap-1.5">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.name}
                    onClick={() => onSelectSample(sample.url, sample.name)}
                    className="px-2.5 py-1 text-xs rounded-full bg-white/5 hover:bg-purple-600/30 border border-white/10 text-gray-300 hover:text-white transition-all duration-150"
                    title={sample.desc}
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasImage && pathname !== "/" && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
              title="Reset all filter parameters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              Reset
            </button>
          )}

          {pathname !== "/" ? (
            <button
              onClick={onExport}
              disabled={!hasImage}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shadow-xl transition-all duration-200 ${
                hasImage
                  ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-400 hover:to-indigo-400 text-white shadow-purple-500/25 hover:scale-[1.03] active:scale-[0.98]"
                  : "bg-gray-900 text-gray-600 cursor-not-allowed border border-white/5"
              }`}
            >
              <Download className="w-4 h-4" />
              Export Photo
            </button>
          ) : (
            <Link
              href="/studio"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
