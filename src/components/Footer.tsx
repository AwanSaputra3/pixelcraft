"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import {
  ShieldCheckIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#0d0d0d] relative overflow-hidden mt-auto">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#ff47ff]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Left: Brand Identity */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="inline-block">
              <Logo size={30} />
            </Link>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Modern AI-powered photo enhancement & pro color grading studio running 100% locally in your browser.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/studio" className="hover:text-[#ff47ff] transition-colors">
              Toolkit Studio
            </Link>
            <Link href="/editor" className="hover:text-[#ff47ff] transition-colors">
              Pro Color Editor
            </Link>
          </div>

          {/* Right: Agency Attribution & Privacy */}
          <div className="flex flex-col items-center md:items-end gap-2.5">
            {/* Nexa Digital Agency Badge */}
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-neutral-400 font-medium">Build by</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#ff47ff]/40 text-neutral-200 hover:text-white transition-all group shadow-sm">
                <SparklesIcon className="w-3.5 h-3.5 text-[#ff47ff] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-white tracking-wide">
                  Nexa Digital Agency
                </span>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#64ed68]/90 font-mono">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-[#64ed68]" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} PixelCraft Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <HeartIcon className="w-3 h-3 text-[#ff47ff] fill-[#ff47ff]/30 inline" />
            <span>for high-performance creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
