"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Dropzone } from "../components/Dropzone";
import { ImageCompare } from "../components/ImageCompare";
import { ControlBar, ToolTab } from "../components/ControlBar";
import { ExportModal } from "../components/ExportModal";
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
} from "lucide-react";

import {
  EnhanceOptions,
  defaultEnhanceOptions,
  applyEnhance,
  computeHistogram,
  HistogramData,
} from "../lib/enhance";
import {
  CompressOptions,
  CompressResult,
  compressImage,
} from "../lib/compress";
import {
  DenoiseOptions,
  defaultDenoiseOptions,
  applyDenoise,
} from "../lib/denoise";
import {
  PixelateOptions,
  defaultPixelateOptions,
  applyPixelate,
} from "../lib/pixelate";
import {
  RemoveBgOptions,
  defaultRemoveBgOptions,
  processRemoveBackground,
} from "../lib/removeBg";

interface QueueItem {
  id: string;
  name: string;
  file: File;
  thumbnail: string;
}

export default function StudioPage() {
  // Image State
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [imageInfo, setImageInfo] = useState<{
    name: string;
    size: number;
    width: number;
    height: number;
    type: string;
  } | null>(null);

  // File Queue
  const [fileQueue, setFileQueue] = useState<QueueItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  // Studio Tool Tabs
  const [activeTab, setActiveTab] = useState<ToolTab>("enhance");

  // Options State for Each Tool
  const [enhanceOptions, setEnhanceOptions] = useState<EnhanceOptions>(defaultEnhanceOptions);
  const [compressOptions, setCompressOptions] = useState<CompressOptions>({
    quality: 0.8,
    format: "image/webp",
    maxWidthOrHeight: 4096,
  });
  const [compressResult, setCompressResult] = useState<CompressResult | null>(null);
  const [denoiseOptions, setDenoiseOptions] = useState<DenoiseOptions>(defaultDenoiseOptions);
  const [pixelateOptions, setPixelateOptions] = useState<PixelateOptions>(defaultPixelateOptions);
  const [removeBgOptions, setRemoveBgOptions] = useState<RemoveBgOptions>(defaultRemoveBgOptions);

  // Processing & UI States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>("Processing image...");
  const [histogram, setHistogram] = useState<HistogramData | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Canvas Refs
  const workingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  // Scroll to workspace on "Dive In" click
  const handleDiveIn = () => {
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Initialize Base Image when selected
  const loadImageFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginalFile(file);
      setOriginalUrl(url);
      setProcessedUrl(url);
      setImageInfo({
        name: file.name,
        size: file.size,
        width: img.width,
        height: img.height,
        type: file.type || "image/png",
      });

      // Add to Queue
      const newId = Math.random().toString(36).substring(7);
      setFileQueue((prev) => [
        ...prev,
        { id: newId, name: file.name, file, thumbnail: url },
      ]);
      setActiveFileId(newId);

      // Reset filter parameters for new photo
      setEnhanceOptions(defaultEnhanceOptions);
      setDenoiseOptions(defaultDenoiseOptions);
      setPixelateOptions(defaultPixelateOptions);
      setCompressResult(null);

      // Scroll to editor
      setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };
    img.src = url;
  }, []);

  // Sample Image Selector Handler
  const handleSelectSample = async (sampleUrl: string, sampleName: string) => {
    setIsProcessing(true);
    setProgressText(`Fetching ${sampleName} sample...`);
    try {
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const file = new File([blob], `${sampleName.toLowerCase().replace(/\s+/g, "_")}.jpg`, {
        type: blob.type || "image/jpeg",
      });
      loadImageFile(file);
    } catch (err) {
      console.error("Failed to fetch sample image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Queue File Switcher
  const handleSelectQueueFile = (id: string) => {
    const item = fileQueue.find((f) => f.id === id);
    if (item) {
      setActiveFileId(id);
      loadImageFile(item.file);
    }
  };

  const handleRemoveQueueFile = (id: string) => {
    setFileQueue((prev) => prev.filter((item) => item.id !== id));
    if (activeFileId === id) {
      const remaining = fileQueue.filter((item) => item.id !== id);
      if (remaining.length > 0) {
        setActiveFileId(remaining[0].id);
        loadImageFile(remaining[0].file);
      } else {
        setOriginalFile(null);
        setOriginalUrl("");
        setProcessedUrl("");
        setImageInfo(null);
      }
    }
  };

  // Global Reset
  const handleResetAll = () => {
    setEnhanceOptions(defaultEnhanceOptions);
    setDenoiseOptions(defaultDenoiseOptions);
    setPixelateOptions(defaultPixelateOptions);
    setRemoveBgOptions(defaultRemoveBgOptions);
    setCompressResult(null);
    if (originalUrl) {
      setProcessedUrl(originalUrl);
    }
  };

  const handleResetTab = (tab: ToolTab) => {
    switch (tab) {
      case "enhance":
        setEnhanceOptions(defaultEnhanceOptions);
        break;
      case "denoise":
        setDenoiseOptions(defaultDenoiseOptions);
        break;
      case "pixelate":
        setPixelateOptions(defaultPixelateOptions);
        break;
      case "removeBg":
        setRemoveBgOptions(defaultRemoveBgOptions);
        break;
      case "compress":
        setCompressOptions({ quality: 0.8, format: "image/webp", maxWidthOrHeight: 4096 });
        setCompressResult(null);
        break;
    }
  };

  // Real-time Canvas Processor for Enhance, Denoise, Pixelate
  useEffect(() => {
    if (!originalUrl || !imageInfo) return;

    if (activeTab === "removeBg" || activeTab === "compress") {
      return;
    }

    let isSubscribed = true;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (!isSubscribed) return;

      const canvas = workingCanvasRef.current || document.createElement("canvas");
      workingCanvasRef.current = canvas;
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      let processedImageData: ImageData;

      if (activeTab === "enhance") {
        processedImageData = applyEnhance(ctx, img.width, img.height, enhanceOptions);
      } else if (activeTab === "denoise") {
        processedImageData = applyDenoise(ctx, img.width, img.height, denoiseOptions);
      } else if (activeTab === "pixelate") {
        processedImageData = applyPixelate(ctx, img.width, img.height, pixelateOptions);
      } else {
        processedImageData = ctx.getImageData(0, 0, img.width, img.height);
      }

      ctx.putImageData(processedImageData, 0, 0);

      const hist = computeHistogram(processedImageData);
      setHistogram(hist);

      const dataUrl = canvas.toDataURL("image/png");
      if (isSubscribed) {
        setProcessedUrl(dataUrl);
      }
    };

    img.src = originalUrl;

    return () => {
      isSubscribed = false;
    };
  }, [
    originalUrl,
    imageInfo,
    activeTab,
    enhanceOptions,
    denoiseOptions,
    pixelateOptions,
  ]);

  // Action Handler: Compression
  const handleTriggerCompress = async () => {
    if (!originalFile) return;
    setIsProcessing(true);
    setProgressText("Compressing photo client-side...");
    try {
      const result = await compressImage(originalFile, compressOptions);
      setCompressResult(result);
      setProcessedUrl(result.dataUrl);
    } catch (err) {
      console.error("Compression failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Action Handler: Remove Background via WASM AI
  const handleTriggerRemoveBg = async () => {
    if (!originalFile && !originalUrl) return;
    setIsProcessing(true);
    setProgressText("Initializing WASM Neural Model...");

    try {
      const targetSource = originalFile || originalUrl;
      const result = await processRemoveBackground(
        targetSource,
        removeBgOptions,
        (progress, text) => {
          setProgressText(text);
        }
      );

      setProcessedUrl(result.dataUrl);
    } catch (err) {
      console.error("Remove background error:", err);
      alert("Background removal failed. Please check network/browser capability.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 selection:bg-purple-500 selection:text-white pb-12">
      {/* Navbar Header */}
      <Header
        onSelectSample={handleSelectSample}
        onReset={handleResetAll}
        onExport={() => setIsExportOpen(true)}
        hasImage={!!originalUrl}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Hero Landing Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800/40 bg-gradient-to-b from-purple-950/20 via-[#090d16] to-[#090d16]">
        {/* Glow background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-500/10">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>High-Performance Client-Side Web Image Toolkit</span>
          </div>

          {/* Main Welcome Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              PixelCraft Studio
            </span>
          </h1>

          {/* Subtitle with Requested Text */}
          <p className="max-w-3xl text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            In here you can{" "}
            <strong className="text-purple-300 font-semibold">enhance photo clarity</strong>,{" "}
            <strong className="text-pink-300 font-semibold">compress file sizes</strong>,{" "}
            <strong className="text-cyan-300 font-semibold">denoise ISO grain</strong>,{" "}
            <strong className="text-amber-300 font-semibold">convert photos into 8-bit retro art</strong>,{" "}
            <strong className="text-emerald-300 font-semibold">remove backgrounds automatically with client-side AI</strong>, and{" "}
            <strong className="text-purple-300 font-semibold">color-grade like Lightroom Mobile</strong> — enjoy as you please!
          </p>

          {/* Action Button: Dive In */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleDiveIn}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>Dive In</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/editor"
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-900/80 hover:bg-gray-800 border border-gray-700/80 text-gray-200 hover:text-white font-semibold text-base transition-all duration-200"
            >
              <Wand2 className="w-5 h-5 text-pink-400" />
              <span>Open Lightroom Editor</span>
            </Link>
          </div>

          {/* Features Grid Showcase */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full pt-8 text-left">
            {[
              {
                title: "✨ Enhance",
                desc: "Sharpening & Contrast",
                color: "border-purple-500/30 bg-purple-950/20",
              },
              {
                title: "🗜️ Compress",
                desc: "JPG, PNG & WebP",
                color: "border-pink-500/30 bg-pink-950/20",
              },
              {
                title: "🧼 Denoise",
                desc: "ISO Grain Removal",
                color: "border-cyan-500/30 bg-cyan-950/20",
              },
              {
                title: "👾 Pixel Art",
                desc: "8-Bit Retro Palettes",
                color: "border-amber-500/30 bg-amber-950/20",
              },
              {
                title: "✂️ Remove BG",
                desc: "WASM AI Neural Net",
                color: "border-emerald-500/30 bg-emerald-950/20",
              },
              {
                title: "📸 Lightroom",
                desc: "8-Channel HSL Mixer",
                color: "border-purple-500/30 bg-purple-950/20",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border ${f.color} backdrop-blur-sm flex flex-col gap-1 hover:scale-105 transition-transform`}
              >
                <div className="font-bold text-xs text-white">{f.title}</div>
                <div className="text-[10px] text-gray-400">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Studio Workspace Grid */}
      <main
        ref={workspaceRef}
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-6"
      >
        {/* Top Upload Dropzone / Image Spec Bar */}
        <Dropzone
          onFileSelect={loadImageFile}
          onSampleSelect={handleSelectSample}
          currentImageInfo={imageInfo}
          fileQueue={fileQueue}
          activeFileId={activeFileId}
          onSelectQueueFile={handleSelectQueueFile}
          onRemoveQueueFile={handleRemoveQueueFile}
        />

        {/* Studio Interactive Viewport & Control Sidebar */}
        {originalUrl && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
            {/* Left 7 Columns: Interactive Image Before/After Visualizer */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <ImageCompare
                originalUrl={originalUrl}
                processedUrl={processedUrl}
                isProcessing={isProcessing}
                processingProgressText={progressText}
              />
            </div>

            {/* Right 5 Columns: Control Panel Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <ControlBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                enhanceOptions={enhanceOptions}
                setEnhanceOptions={setEnhanceOptions}
                compressOptions={compressOptions}
                setCompressOptions={setCompressOptions}
                compressResult={compressResult}
                onTriggerCompress={handleTriggerCompress}
                denoiseOptions={denoiseOptions}
                setDenoiseOptions={setDenoiseOptions}
                pixelateOptions={pixelateOptions}
                setPixelateOptions={setPixelateOptions}
                removeBgOptions={removeBgOptions}
                setRemoveBgOptions={setRemoveBgOptions}
                onTriggerRemoveBg={handleTriggerRemoveBg}
                histogram={histogram}
                onResetTab={handleResetTab}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        )}
      </main>

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        imageDataUrl={processedUrl || originalUrl}
        originalName={imageInfo?.name || "photo"}
        width={imageInfo?.width || 1920}
        height={imageInfo?.height || 1080}
      />
    </div>
  );
}
