"use client";

import React from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import {
  Sparkles,
  ArrowRight,
  Sliders,
  Archive,
  Scissors,
  Gamepad2,
  Wand2,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 selection:bg-purple-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        onSelectSample={() => { }}
        onReset={() => { }}
        onExport={() => { }}
        hasImage={false}
      />

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        {/* Glowing background spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl w-full mx-auto text-center flex flex-col items-center gap-8 relative z-10">
          {/* Privacy Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-xl shadow-purple-500/10 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Client-Side Privacy — Zero Server Uploads</span>
          </div>

          {/* Main Welcome Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.15]">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              PixelCraft Studio
            </span>
          </h1>

          {/* Welcome Subtitle Paragraph with Requested Text */}
          <p className="max-w-3xl text-base sm:text-xl text-gray-300 font-normal leading-relaxed">
            In here you can{" "}
            <strong className="text-purple-300 font-semibold">enhance photo clarity</strong>,{" "}
            <strong className="text-pink-300 font-semibold">compress file sizes</strong>,{" "}
            <strong className="text-cyan-300 font-semibold">denoise ISO grain</strong>,{" "}
            <strong className="text-amber-300 font-semibold">convert photos into 8-bit retro art</strong>,{" "}
            <strong className="text-emerald-300 font-semibold">remove backgrounds automatically with client-side AI</strong>, and{" "}
            <strong className="text-purple-300 font-semibold">color-grading</strong> — enjoy as you please!
          </p>

          {/* Action Button: Dive In */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/studio"
              className="group flex items-center gap-3 px-9 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
            >
              <span>Dive In</span>
              <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/editor"
              className="flex items-center gap-2.5 px-7 py-4.5 rounded-2xl bg-gray-900/80 hover:bg-gray-800 border border-gray-700/80 text-gray-200 hover:text-white font-bold text-base transition-all duration-200 backdrop-blur-md"
            >
              <Wand2 className="w-5 h-5 text-pink-400" />
              <span>Lightroom Mobile Editor</span>
            </Link>
          </div>

          {/* Interactive Feature Cards Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full pt-12 text-left">
            {/* Card 1: Enhance */}
            <Link
              href="/studio"
              className="group p-5 rounded-2xl border border-purple-500/20 bg-gray-900/40 hover:bg-purple-950/20 hover:border-purple-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Sliders className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-bold">
                  Enhance Engine
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-300">
                  ✨ Photo Enhancement
                </h3>
                <p className="text-xs text-gray-400">
                  Adaptive brightness, contrast, saturation, Laplacian 3x3 sharpening kernel & live RGB histogram.
                </p>
              </div>
            </Link>

            {/* Card 2: Compress */}
            <Link
              href="/studio"
              className="group p-5 rounded-2xl border border-pink-500/20 bg-gray-900/40 hover:bg-pink-950/20 hover:border-pink-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Archive className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-pink-400 font-bold">
                  Compress Pipeline
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-pink-300">
                  🗜️ Image Compression
                </h3>
                <p className="text-xs text-gray-400">
                  Quality sliders for WebP, JPG, and PNG with real-time size savings readout.
                </p>
              </div>
            </Link>

            {/* Card 3: Denoise */}
            <Link
              href="/studio"
              className="group p-5 rounded-2xl border border-cyan-500/20 bg-gray-900/40 hover:bg-cyan-950/20 hover:border-cyan-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
                  Spatial Denoise
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300">
                  🧼 Denoise ISO Grain
                </h3>
                <p className="text-xs text-gray-400">
                  Spatial Median & Bilateral Gaussian smooth filters to clean low-light photo noise.
                </p>
              </div>
            </Link>

            {/* Card 4: Pixel Art */}
            <Link
              href="/studio"
              className="group p-5 rounded-2xl border border-amber-500/20 bg-gray-900/40 hover:bg-amber-950/20 hover:border-amber-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">
                  Retro Quantizer
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-300">
                  👾 Photo to Pixelated
                </h3>
                <p className="text-xs text-gray-400">
                  Flexible block sampling with GameBoy, NES 8-Bit, Cyberpunk, and C64 color palette presets.
                </p>
              </div>
            </Link>

            {/* Card 5: Remove BG */}
            <Link
              href="/studio"
              className="group p-5 rounded-2xl border border-emerald-500/20 bg-gray-900/40 hover:bg-emerald-950/20 hover:border-emerald-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Scissors className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
                  WASM AI Neural Net
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300">
                  ✂️ Remove Background
                </h3>
                <p className="text-xs text-gray-400">
                  Automatic client-side subject segmentation with solid, gradient, or custom photo backdrops.
                </p>
              </div>
            </Link>

            {/* Card 6: Lightroom Mobile Editor */}
            <Link
              href="/editor"
              className="group p-5 rounded-2xl border border-purple-500/20 bg-gray-900/40 hover:bg-purple-950/20 hover:border-purple-500/40 transition-all duration-200 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-bold">
                  Lightroom Mobile
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-300">
                  📸 Color Grade
                </h3>
                <p className="text-xs text-gray-400">
                  8-channel target HSL color channel tuning, tone curves, texture, dehaze & one-tap presets.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
