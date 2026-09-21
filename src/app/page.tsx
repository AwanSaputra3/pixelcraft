"use client";

import React from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import {
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  BoltIcon,
  CpuChipIcon,
  ScissorsIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { AnimeStaggerGrid } from "../components/AnimeStaggerGrid";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white selection:bg-[#ff47ff] selection:text-black starry-bg relative">
      {/* Ambient Radial Spotlight Glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ff47ff]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#bd99f8]/10 rounded-full blur-[150px] pointer-events-none" />

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
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto animate-slide-up">
            Elevate Your <br />
            <span className="font-semibold bg-gradient-to-r from-white via-[#bd99f8] to-[#ff47ff] bg-clip-text text-transparent">
              Editing Experience
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-normal leading-relaxed pt-5 animate-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            Make photos clearer and sharper in just a click with AI-powered technology in a 100% client-side privacy-first environment.
          </p>

          <div className="pt-8 pb-4 relative z-30 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <Link
              href="/studio"
              className="px-8 py-3.5 rounded-full bg-[#ff47ff] text-black font-semibold text-sm shadow-[0_0_35px_rgba(255,71,255,0.45)] hover:shadow-[0_0_50px_rgba(255,71,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <span>Launch Studio & Enhance</span>
              <ArrowTopRightOnSquareIcon className="w-4.5 h-4.5 text-black" />
            </Link>
          </div>

          {/* 3D Organic Fluid Wave Display Container with Floating Metric Cards */}
          <div className="relative w-full max-w-5xl mt-6 min-h-[420px] flex items-center justify-center">
            
            {/* 3D Organic Fluid Ribbon Center Visual */}
            <div className="relative w-full flex items-center justify-center">
              <img
                src="/hero_fluid_wave.png"
                alt="3D Fluid Wave Ribbon"
                className="w-full max-w-4xl object-contain rounded-3xl mix-blend-screen opacity-90 filter drop-shadow-[0_20px_50px_rgba(255,71,255,0.25)] pointer-events-none animate-zoom-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
            </div>

            {/* Left Floating Metric Card Widget */}
            <div className="absolute left-4 sm:left-12 top-1/3 -translate-y-1/2 z-20 hidden md:block">
              <div className="glass-card-fintech p-5 w-64 text-left animate-pulse-glow animate-float">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    Client Security
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Unparalleled Privacy Protection
                </h4>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                  <span className="text-xs text-[#ff47ff] font-mono">100% Local GPU/WASM</span>
                  <span className="text-xs font-bold text-[#64ed68] font-mono">100%</span>
                </div>
              </div>
            </div>

            {/* Right Floating Metric Card Widget */}
            <div className="absolute right-4 sm:right-12 bottom-12 z-20 hidden md:block">
              <div className="glass-card-fintech p-5 w-64 text-left animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    WASM AI Neural Net
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white font-mono mb-2">
                  99.8%
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[96%] bg-gradient-to-r from-[#ff47ff] to-[#bd99f8] animate-fill-bar rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Anime.js v4 Interactive Stagger Matrix */}
          <AnimeStaggerGrid className="mt-10 mb-2 z-20 relative" />

          {/* Interactive Feature Cards Grid */}
          <div id="features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full pt-16 text-left scroll-mt-24">
            {/* Card 1: Enhance */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 hover:border-[#ff47ff]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-slide-up stagger-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#ff47ff]/10 border border-[#ff47ff]/20 flex items-center justify-center text-[#ff47ff] group-hover:scale-110 transition-transform">
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#ff47ff]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#ff47ff] font-bold block mb-1">
                  Enhance Engine
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff47ff] transition-colors">
                  Photo Enhancement
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Adaptive brightness, contrast, saturation, Laplacian 3x3 sharpening kernel & live RGB histogram.
                </p>
              </div>
            </Link>

            {/* Card 2: Compress */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 hover:border-[#ffc13c]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-slide-up stagger-2"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#ffc13c]/10 border border-[#ffc13c]/20 flex items-center justify-center text-[#ffc13c] group-hover:scale-110 transition-transform">
                  <ArchiveBoxIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#ffc13c]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#ffc13c] font-bold block mb-1">
                  Compress Pipeline
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ffc13c] transition-colors">
                  Image Compression
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Quality sliders for WebP, JPG, and PNG with real-time size savings readout.
                </p>
              </div>
            </Link>

            {/* Card 3: Denoise */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 hover:border-[#bd99f8]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-slide-up stagger-3"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#bd99f8]/10 border border-[#bd99f8]/20 flex items-center justify-center text-[#bd99f8] group-hover:scale-110 transition-transform">
                  <BoltIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#bd99f8]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#bd99f8] font-bold block mb-1">
                  Spatial Denoise
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#bd99f8] transition-colors">
                  Denoise ISO Grain
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Spatial Median & Bilateral Gaussian smooth filters to clean low-light photo noise.
                </p>
              </div>
            </Link>

            {/* Card 4: Pixel Art */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 hover:border-[#ffc13c]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-slide-up stagger-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#ffc13c]/10 border border-[#ffc13c]/20 flex items-center justify-center text-[#ffc13c] group-hover:scale-110 transition-transform">
                  <CpuChipIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#ffc13c]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#ffc13c] font-bold block mb-1">
                  Retro Quantizer
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ffc13c] transition-colors">
                  Photo to Pixelated
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Flexible block sampling with GameBoy, NES 8-Bit, Cyberpunk, and C64 color palette presets.
                </p>
              </div>
            </Link>

            {/* Card 5: Remove BG */}
            <Link
              href="/studio"
              className="group glass-card-fintech p-6 hover:border-[#64ed68]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-slide-up stagger-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#64ed68]/10 border border-[#64ed68]/20 flex items-center justify-center text-[#64ed68] group-hover:scale-110 transition-transform">
                  <ScissorsIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#64ed68]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#64ed68] font-bold block mb-1">
                  WASM AI Model
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#64ed68] transition-colors">
                  Remove Background
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Automatic client-side subject segmentation with solid, gradient, or custom photo backdrops.
                </p>
              </div>
            </Link>

            {/* Card 6: Color Editor */}
            <Link
              href="/editor"
              className="group glass-card-fintech p-6 hover:border-[#ff47ff]/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between animate-slide-up stagger-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-[#ff47ff]/10 border border-[#ff47ff]/20 flex items-center justify-center text-[#ff47ff] group-hover:scale-110 transition-transform">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#ff47ff]/20 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#ff47ff] font-bold block mb-1">
                  Pro Color Engine
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff47ff] transition-colors">
                  Color Grade & HSL
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
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


