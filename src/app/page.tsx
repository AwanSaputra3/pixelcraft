"use client";

import React from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Sliders,
  Archive,
  Scissors,
  Gamepad2,
  Wand2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070510] text-gray-100 selection:bg-purple-500 selection:text-white starry-bg relative">
      {/* Ambient Radial Spotlight Glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-700/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation Header */}
      <Header
        onSelectSample={() => {}}
        onReset={() => {}}
        onExport={() => {}}
        hasImage={false}
      />

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-between relative overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Main Hero Centered Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Elevate Your <br />
            <span className="font-semibold bg-gradient-to-b from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
              Editing Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-normal leading-relaxed pt-5">
            Unlock your photo&apos;s full potential in a 100% client-side regulated environment, powered by PixelCraft Studio
          </p>

          {/* Call to Action Glowing Pill Button */}
          <div className="pt-8 pb-4 relative z-30">
            <Link
              href="/studio"
              className="px-8 py-3.5 rounded-full bg-white text-gray-950 font-bold text-sm shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:shadow-[0_0_50px_rgba(255,255,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <span>Launch Studio & Trade Pixels</span>
              <ArrowUpRight className="w-4.5 h-4.5 text-gray-950" />
            </Link>
          </div>

          {/* 3D Organic Fluid Wave Display Container with Floating Metric Cards */}
          <div className="relative w-full max-w-5xl mt-6 min-h-[420px] flex items-center justify-center">
            
            {/* 3D Organic Fluid Ribbon Center Visual */}
            <div className="relative w-full flex items-center justify-center">
              <img
                src="/hero_fluid_wave.png"
                alt="3D Fluid Wave Ribbon"
                className="w-full max-w-4xl object-contain rounded-3xl mix-blend-screen opacity-90 filter drop-shadow-[0_20px_50px_rgba(168,85,247,0.3)] pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070510] via-transparent to-transparent opacity-80" />
            </div>

            {/* Left Floating Metric Card Widget */}
            <div className="absolute left-4 sm:left-12 top-1/3 -translate-y-1/2 glass-card-fintech rounded-3xl p-5 w-64 text-left backdrop-blur-2xl border border-white/10 shadow-2xl z-20 hidden md:block animate-pulse-glow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                  Client Security
                </span>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Unparalleled Privacy Protection
              </h4>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                <span className="text-xs text-purple-300 font-mono">100% Local GPU/WASM</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">100%</span>
              </div>
            </div>

            {/* Right Floating Metric Card Widget */}
            <div className="absolute right-4 sm:right-12 bottom-12 glass-card-fintech rounded-3xl p-5 w-64 text-left backdrop-blur-2xl border border-white/10 shadow-2xl z-20 hidden md:block">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                  WASM AI Neural Net
                </span>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono mb-2">
                99.8%
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[96%]" />
              </div>
            </div>
          </div>

          {/* Interactive Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-16 text-left">
            {/* Card 1: Enhance */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Sliders className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-bold block mb-1">
                  Enhance Engine
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Photo Enhancement
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Adaptive brightness, contrast, saturation, Laplacian 3x3 sharpening kernel & live RGB histogram.
                </p>
              </div>
            </Link>

            {/* Card 2: Compress */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 rounded-3xl border border-white/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                  <Archive className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 font-bold block mb-1">
                  Compress Pipeline
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  Image Compression
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Quality sliders for WebP, JPG, and PNG with real-time size savings readout.
                </p>
              </div>
            </Link>

            {/* Card 3: Denoise */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-cyan-500/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-1">
                  Spatial Denoise
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  Denoise ISO Grain
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Spatial Median & Bilateral Gaussian smooth filters to clean low-light photo noise.
                </p>
              </div>
            </Link>

            {/* Card 4: Pixel Art */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-amber-500/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block mb-1">
                  Retro Quantizer
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  Photo to Pixelated
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Flexible block sampling with GameBoy, NES 8-Bit, Cyberpunk, and C64 color palette presets.
                </p>
              </div>
            </Link>

            {/* Card 5: Remove BG */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                  <Scissors className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-emerald-500/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                  WASM AI Model
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Remove Background
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Automatic client-side subject segmentation with solid, gradient, or custom photo backdrops.
                </p>
              </div>
            </Link>

            {/* Card 6: Color Editor */}
            <Link
              href="/editor"
              className="group glass-card-fintech p-6 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-bold block mb-1">
                  Pro Color Engine
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Color Grade & HSL
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  8-channel target HSL color channel tuning, tone curves, texture, dehaze & selective masking.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

