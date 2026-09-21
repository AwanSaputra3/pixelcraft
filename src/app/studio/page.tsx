"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "../../components/Header";
import { Dropzone } from "../../components/Dropzone";
import { ImageCompare } from "../../components/ImageCompare";
import { ControlBar, ToolTab } from "../../components/ControlBar";
import { ExportModal } from "../../components/ExportModal";

import {
  EnhanceOptions,
  defaultEnhanceOptions,
  applyEnhance,
  computeHistogram,
  HistogramData,
} from "../../lib/enhance";
import {
  CompressOptions,
  CompressResult,
  compressImage,
} from "../../lib/compress";
import {
  DenoiseOptions,
  defaultDenoiseOptions,
  applyDenoise,
} from "../../lib/denoise";
import {
  PixelateOptions,
  defaultPixelateOptions,
  applyPixelate,
} from "../../lib/pixelate";
import {
  RemoveBgOptions,
  defaultRemoveBgOptions,
  processRemoveBackground,
} from "../../lib/removeBg";

interface QueueItem {
  id: string;
  name: string;
  file: File;
  thumbnail: string;
}

export default function StudioDashboardPage() {
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

  // High performance Canvas and Object URL Cache Refs
  const cachedOriginalImgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fullCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentBlobUrlRef = useRef<string>("");
  const rafIdRef = useRef<number | null>(null);

  // Clean up Blob URLs on unmount
  useEffect(() => {
    return () => {
      if (currentBlobUrlRef.current && currentBlobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
      }
    };
  }, []);

  // Auto load initial demo sample portrait on first load if no file present
  useEffect(() => {
    handleSelectSample(
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "Portrait"
    );
  }, []);

  // Initialize Base Image when selected
  const loadImageFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      cachedOriginalImgRef.current = img;
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

      // Prepare Downscaled Preview Buffer Canvas (Max 1200px dimension for 60fps slider response)
      const maxDim = 1200;
      let pWidth = img.width;
      let pHeight = img.height;
      if (pWidth > maxDim || pHeight > maxDim) {
        if (pWidth > pHeight) {
          pHeight = Math.round((pHeight * maxDim) / pWidth);
          pWidth = maxDim;
        } else {
          pWidth = Math.round((pWidth * maxDim) / pHeight);
          pHeight = maxDim;
        }
      }

      const pCanvas = document.createElement("canvas");
      pCanvas.width = pWidth;
      pCanvas.height = pHeight;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        pCtx.drawImage(img, 0, 0, pWidth, pHeight);
      }
      previewCanvasRef.current = pCanvas;

      // Prepare Full Resolution Source Canvas
      const fCanvas = document.createElement("canvas");
      fCanvas.width = img.width;
      fCanvas.height = img.height;
      const fCtx = fCanvas.getContext("2d");
      if (fCtx) {
        fCtx.drawImage(img, 0, 0);
      }
      fullCanvasRef.current = fCanvas;

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

  // Silky-Smooth RequestAnimationFrame Live Engine Processing Loop
  useEffect(() => {
    if (!originalUrl || !cachedOriginalImgRef.current || !previewCanvasRef.current) return;

    if (activeTab === "removeBg" || activeTab === "compress") {
      return;
    }

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const img = cachedOriginalImgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!img || !previewCanvas) return;

      const pWidth = previewCanvas.width;
      const pHeight = previewCanvas.height;

      const workCanvas = document.createElement("canvas");
      workCanvas.width = pWidth;
      workCanvas.height = pHeight;
      const ctx = workCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, pWidth, pHeight);

      let processedImageData: ImageData;

      if (activeTab === "enhance") {
        processedImageData = applyEnhance(ctx, pWidth, pHeight, enhanceOptions);
      } else if (activeTab === "denoise") {
        processedImageData = applyDenoise(ctx, pWidth, pHeight, denoiseOptions);
      } else if (activeTab === "pixelate") {
        processedImageData = applyPixelate(ctx, pWidth, pHeight, pixelateOptions);
      } else {
        processedImageData = ctx.getImageData(0, 0, pWidth, pHeight);
      }

      ctx.putImageData(processedImageData, 0, 0);

      const hist = computeHistogram(processedImageData);
      setHistogram(hist);

      workCanvas.toBlob(
        (blob) => {
          if (!blob) return;
          const newUrl = URL.createObjectURL(blob);

          if (currentBlobUrlRef.current && currentBlobUrlRef.current.startsWith("blob:")) {
            URL.revokeObjectURL(currentBlobUrlRef.current);
          }
          currentBlobUrlRef.current = newUrl;
          setProcessedUrl(newUrl);
        },
        "image/jpeg",
        0.92
      );
    });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [
    originalUrl,
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

  // Generate Full High-Resolution Render on Export
  const handleOpenExport = () => {
    if (!cachedOriginalImgRef.current || !fullCanvasRef.current) {
      setIsExportOpen(true);
      return;
    }

    if (activeTab === "enhance" || activeTab === "denoise" || activeTab === "pixelate") {
      const img = cachedOriginalImgRef.current;
      const fCanvas = fullCanvasRef.current;
      const ctx = fCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        let fullProcessed: ImageData;
        if (activeTab === "enhance") {
          fullProcessed = applyEnhance(ctx, img.width, img.height, enhanceOptions);
        } else if (activeTab === "denoise") {
          fullProcessed = applyDenoise(ctx, img.width, img.height, denoiseOptions);
        } else {
          fullProcessed = applyPixelate(ctx, img.width, img.height, pixelateOptions);
        }
        ctx.putImageData(fullProcessed, 0, 0);
        const fullDataUrl = fCanvas.toDataURL("image/png");
        setProcessedUrl(fullDataUrl);
      }
    }
    setIsExportOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070510] starry-bg text-gray-100 selection:bg-purple-500 selection:text-white pb-12">
      {/* Navbar Header */}
      <Header
        onSelectSample={handleSelectSample}
        onReset={handleResetAll}
        onExport={handleOpenExport}
        hasImage={!!originalUrl}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Studio Workspace Grid (Matching User Screenshot Layout) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
