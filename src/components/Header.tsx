"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShieldCheck, Image as ImageIcon, RotateCcw, Download, Sliders, Home, Wand2 } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-800/60 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Navigation Tabs */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[2px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-gray-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
                  PixelCraft Studio
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  100% Client Privacy
                </span>
              </div>
            </div>
          </Link>

          {/* Mode Navigation Switcher (Home / Studio / Lightroom) */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-950 p-1 rounded-xl border border-gray-800/80 text-xs">
            <Link
              href="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                pathname === "/"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900"
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <Link
              href="/studio"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                pathname === "/studio"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Toolkit Studio
            </Link>
            <Link
              href="/editor"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                pathname === "/editor"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-900"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-pink-400" /> Pro Color Editor
            </Link>
          </nav>
        </div>

        {/* Quick Sample Selector (Visible on Studio & Editor pages) */}
        {pathname !== "/" && (
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" /> Sample:
            </span>
            <div className="flex items-center gap-1.5">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => onSelectSample(sample.url, sample.name)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-gray-800/80 hover:bg-purple-600/30 hover:border-purple-500/40 border border-gray-700/60 text-gray-300 hover:text-white transition-all duration-150"
                  title={sample.desc}
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Navigation Button */}
          <Link
            href={pathname === "/" ? "/studio" : "/"}
            className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-900/40 text-purple-300 border border-purple-500/30 text-xs font-medium"
          >
            {pathname === "/" ? "Toolkit Studio" : "Home"}
          </Link>

          {hasImage && pathname !== "/" && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-700/60 transition-colors"
              title="Reset all filter parameters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              Reset
            </button>
          )}

          {pathname !== "/" && (
            <button
              onClick={onExport}
              disabled={!hasImage}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all duration-200 ${
                hasImage
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/40"
              }`}
            >
              <Download className="w-4 h-4" />
              Export Photo
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
