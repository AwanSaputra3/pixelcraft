"use client";

import React from "react";
import Link from "next/link";
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
  Cpu,
  Lock,
} from "lucide-react";
import { Header } from "../components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <Header
        onSelectSample={() => {}}
        onReset={() => {}}
        onExport={() => {}}
        hasImage={false}
      />

      {/* Hero Landing Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800/40 bg-gradient-to-b from-purple-950/20 via-[#090d16] to-[#090d16]">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
          {/* Privacy Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-500/10 animate-fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Client-Side Privacy & WebAssembly AI Engine</span>
          </div>

          {/* Main Welcome Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              PixelCraft Studio
            </span>
          </h1>

          {/* User Requested Welcome Subtitle */}
          <p className="max-w-3xl text-lg sm:text-xl text-gray-300 font-normal leading-relaxed">
            In here you can{" "}
            <strong className="text-purple-300 font-semibold">enhance photo clarity</strong>,{" "}
            <strong className="text-pink-300 font-semibold">compress file sizes</strong>,{" "}
            <strong className="text-cyan-300 font-semibold">denoise ISO grain</strong>,{" "}
            <strong className="text-amber-300 font-semibold">convert photos into 8-bit retro art</strong>,{" "}
            <strong className="text-emerald-300 font-semibold">remove backgrounds automatically with client-side AI</strong>, and{" "}
            <strong className="text-purple-300 font-semibold">color-grade like Lightroom Mobile</strong> — enjoy as you please!
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <Link
              href="/studio"
              className="group flex items-center gap-3 px-9 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
            >
              <span>Dive In</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/editor"
              className="flex items-center gap-2.5 px-7 py-4.5 rounded-2xl bg-gray-900/90 hover:bg-gray-800 border border-gray-700/80 text-gray-200 hover:text-white font-semibold text-lg hover:border-purple-500/40 transition-all duration-200"
            >
              <Wand2 className="w-5 h-5 text-pink-400" />
              <span>Lightroom Mobile Editor</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl pt-10 border-t border-gray-800/60 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-gray-400">Client-Side Privacy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">0 KB</span>
              <span className="text-xs text-gray-400">Server Uploads</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">8-Channel</span>
              <span className="text-xs text-gray-400">HSL Color Mixer</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">WASM AI</span>
              <span className="text-xs text-gray-400">In-Browser Neural Net</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            All-in-One Toolkit Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need for Image Editing
          </h2>
          <p className="text-gray-400 text-sm max-w-xl">
            High-speed client-side canvas algorithms designed for creators, developers, and photographers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Enhance */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">✨ Photo Enhancement</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Adaptive brightness, contrast, saturation, Laplacian 3x3 sharpening kernel, warmth, and real-time RGB histogram spectrum.
              </p>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Try Enhance <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Compress */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-pink-600/20 text-pink-400 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Archive className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">🗜️ Image Compression</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Reduce PNG, JPG, and WebP file sizes instantly with interactive quality sliders and real-time savings percentage readouts.
              </p>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Try Compress <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Denoise */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">🧼 Spatial Denoise Filter</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Smooth ISO grain and low-light noise using spatial Median Filters and Bilateral Gaussian edge-preserving smoothing.
              </p>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Try Denoise <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Pixel Art */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">👾 8-Bit Pixel Art</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Transform any photo into retro pixel artwork with block sampling (2px-64px) and color quantization (GameBoy, NES 8-Bit, Cyberpunk).
              </p>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Try Pixel Art <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: Remove BG */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">✂️ AI Background Removal</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                In-browser WebAssembly neural network segmentation. Replace backgrounds with transparent PNGs, solid hex colors, or custom photos.
              </p>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Try Remove BG <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6: Lightroom Mobile Editor */}
          <div className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">📸 Lightroom Mobile Editor</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Dedicated editor with 8-Channel Target HSL Mixer, Tone Curves, Texture, Dehaze, Crop/Rotate, and one-tap cinematic presets.
              </p>
            </div>
            <Link
              href="/editor"
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Open Lightroom Editor <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800/80 py-8 bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-white">PixelCraft Studio</span> — All-in-One Client-Side Web Image Toolkit
          </div>
          <div className="flex items-center gap-4">
            <Link href="/studio" className="hover:text-white transition-colors">
              Toolkit Studio
            </Link>
            <Link href="/editor" className="hover:text-white transition-colors">
              Lightroom Editor
            </Link>
            <a
              href="https://github.com/AwanSaputra3/pixelcraft"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
