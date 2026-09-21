"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "../../components/Header";
import { Dropzone } from "../../components/Dropzone";
import { LightroomCanvas } from "../../components/lightroom/LightroomCanvas";
import { LightroomControlBar, LightroomTab } from "../../components/lightroom/LightroomControlBar";
import { ExportModal } from "../../components/ExportModal";
import {
  LightroomOptions,
  defaultLightroomOptions,
  applyLightroomEngine,
  LIGHTROOM_PRESETS,
  LightroomPreset,
} from "../../lib/lightroomEngine";
import { computeHistogram, HistogramData } from "../../lib/enhance";
import { HistogramCanvas } from "../../components/HistogramCanvas";
import { Sliders, RotateCcw, Download } from "lucide-react";

interface QueueItem {
  id: string;
  name: string;
  file: File;
  thumbnail: string;
}

export default function LightroomEditorPage() {
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

  // Active Lightroom Tab & Filter Options
  const [activeTab, setActiveTab] = useState<LightroomTab>("presets");
  const [options, setOptions] = useState<LightroomOptions>(defaultLightroomOptions);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Processing & Histogram
  const [histogram, setHistogram] = useState<HistogramData | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  // Load Image File and prepare cached canvas buffers
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

      const newId = Math.random().toString(36).substring(7);
      setFileQueue((prev) => [...prev, { id: newId, name: file.name, file, thumbnail: url }]);
      setActiveFileId(newId);

      // Reset options for new photo
      setOptions(defaultLightroomOptions);
      setActivePresetId(null);
    };
    img.src = url;
  }, []);

  // Sample Image Selector
  const handleSelectSample = async (sampleUrl: string, sampleName: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const file = new File([blob], `${sampleName.toLowerCase().replace(/\s+/g, "_")}.jpg`, {
        type: blob.type || "image/jpeg",
      });
      loadImageFile(file);
    } catch (err) {
      console.error("Failed to fetch sample photo:", err);
    } finally {
      setIsProcessing(false);
    }
  };

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

  // Select Preset Handler
  const handleSelectPreset = (preset: LightroomPreset) => {
    setActivePresetId(preset.id);
    setOptions((prev) => ({
      ...defaultLightroomOptions,
      ...preset.options,
      hsl: {
        ...defaultLightroomOptions.hsl,
        ...(preset.options.hsl || {}),
      },
    }));
  };

  const handleResetOptions = () => {
    setOptions(defaultLightroomOptions);
    setActivePresetId(null);
    if (originalUrl) {
      setProcessedUrl(originalUrl);
    }
  };

  // Silky-Smooth RequestAnimationFrame Live Engine Processing Loop
  useEffect(() => {
    if (!originalUrl || !cachedOriginalImgRef.current || !previewCanvasRef.current) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const img = cachedOriginalImgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!img || !previewCanvas) return;

      const pWidth = previewCanvas.width;
      const pHeight = previewCanvas.height;

      // Offscreen working canvas for processing
      const workCanvas = document.createElement("canvas");
      workCanvas.width = pWidth;
      workCanvas.height = pHeight;
      const ctx = workCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, pWidth, pHeight);

      const processedImageData = applyLightroomEngine(ctx, pWidth, pHeight, options);
      ctx.putImageData(processedImageData, 0, 0);

      const hist = computeHistogram(processedImageData);
      setHistogram(hist);

      // Fast Blob URL conversion (avoiding heavy Base64 PNG toDataURL string overhead)
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
  }, [originalUrl, options]);

  // Generate Full High-Resolution Render on Export
  const handleOpenExport = () => {
    if (!cachedOriginalImgRef.current || !fullCanvasRef.current) {
      setIsExportOpen(true);
      return;
    }

    const img = cachedOriginalImgRef.current;
    const fCanvas = fullCanvasRef.current;
    const ctx = fCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const fullProcessed = applyLightroomEngine(ctx, img.width, img.height, options);
      ctx.putImageData(fullProcessed, 0, 0);
      const fullDataUrl = fCanvas.toDataURL("image/png");
      setProcessedUrl(fullDataUrl);
    }
    setIsExportOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070510] starry-bg text-gray-100 selection:bg-purple-500 selection:text-white pb-12">
      {/* Header */}
      <Header
        onSelectSample={handleSelectSample}
        onReset={handleResetOptions}
        onExport={handleOpenExport}
        hasImage={!!originalUrl}
        activeTab={activeTab}
        setActiveTab={() => {}}
      />

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-6">
        {/* Dropzone & Info Bar */}
        <Dropzone
          onFileSelect={loadImageFile}
          onSampleSelect={handleSelectSample}
          currentImageInfo={imageInfo}
          fileQueue={fileQueue}
          activeFileId={activeFileId}
          onSelectQueueFile={handleSelectQueueFile}
          onRemoveQueueFile={handleRemoveQueueFile}
        />

        {/* Lightroom Studio Workspace Grid */}
        {originalUrl && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Canvas Preview & Histogram */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <LightroomCanvas
                originalUrl={originalUrl}
                processedUrl={processedUrl}
                options={options}
                isProcessing={isProcessing}
              />
              <HistogramCanvas histogram={histogram} height={50} />
            </div>

            {/* Right 5 Columns: Lightroom Controls Panel */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <LightroomControlBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                options={options}
                setOptions={setOptions}
                activePresetId={activePresetId}
                onSelectPreset={handleSelectPreset}
                onResetOptions={handleResetOptions}
              />
            </div>
          </div>
        )}
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        imageDataUrl={processedUrl || originalUrl}
        originalName={imageInfo?.name || "lightroom_edited"}
        width={imageInfo?.width || 1920}
        height={imageInfo?.height || 1080}
      />
    </div>
  );
}

