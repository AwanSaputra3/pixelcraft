"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, FileText, CheckCircle2, Trash2, ArrowUpRight } from "lucide-react";
import { SAMPLE_IMAGES } from "./Header";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  onSampleSelect: (url: string, name: string) => void;
  currentImageInfo?: {
    name: string;
    size: number;
    width: number;
    height: number;
    type: string;
  } | null;
  fileQueue: Array<{ id: string; name: string; file: File; thumbnail: string }>;
  activeFileId: string | null;
  onSelectQueueFile: (id: string) => void;
  onRemoveQueueFile: (id: string) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelect,
  onSampleSelect,
  currentImageInfo,
  fileQueue,
  activeFileId,
  onSelectQueueFile,
  onRemoveQueueFile,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
      if (files.length > 0) {
        files.forEach((file) => onFileSelect(file));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
      files.forEach((file) => onFileSelect(file));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Upload Box / Compact Info Bar */}
      {!currentImageInfo ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[280px] ${
            isDragOver
              ? "border-purple-500 bg-purple-500/10 scale-[1.01] shadow-xl shadow-purple-500/20"
              : "border-gray-700/80 bg-gray-900/40 hover:border-purple-500/50 hover:bg-gray-800/50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept="image/png, image/jpeg, image/webp, image/gif, image/bmp"
            multiple
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-pink-600/30 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 text-purple-300 animate-bounce-subtle" />
          </div>

          <h3 className="text-base font-semibold text-white mb-1">
            Drag & drop your photo here, or <span className="text-purple-400 underline">browse</span>
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mb-6">
            Supports PNG, JPG, WebP, GIF & BMP up to 50MB. Processed 100% locally in your browser.
          </p>

          {/* Quick sample pills */}
          <div className="flex flex-wrap items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-medium text-gray-400">Or try demo image:</span>
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.name}
                onClick={() => onSampleSelect(sample.url, sample.name)}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-800/90 hover:bg-purple-600/40 text-purple-200 border border-purple-500/20 hover:border-purple-500/50 flex items-center gap-1 transition-all"
              >
                {sample.name}
                <ArrowUpRight className="w-3 h-3 text-purple-400" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Image Loaded Metadata Bar */
        <div className="glass-card rounded-xl p-3 border border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 font-semibold uppercase tracking-wider text-[10px]">
              {currentImageInfo.type.split("/")[1] || "IMG"}
            </div>
            <div className="truncate max-w-[200px] font-medium text-white" title={currentImageInfo.name}>
              {currentImageInfo.name}
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <div>
              Dimensions:{" "}
              <span className="text-gray-200 font-mono">
                {currentImageInfo.width} × {currentImageInfo.height}px
              </span>
            </div>
            <div>
              Size: <span className="text-gray-200 font-mono">{formatBytes(currentImageInfo.size)}</span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
            >
              Change Image
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/png, image/jpeg, image/webp, image/gif, image/bmp"
              multiple
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Multi-File Queue Bar */}
      {fileQueue.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
            <ImageIcon className="w-3.5 h-3.5" /> Queue ({fileQueue.length}):
          </span>
          {fileQueue.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectQueueFile(item.id)}
              className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer shrink-0 transition-all ${
                activeFileId === item.id
                  ? "bg-purple-900/40 border-purple-500 text-white shadow-md shadow-purple-500/10"
                  : "bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200"
              }`}
            >
              <img src={item.thumbnail} alt={item.name} className="w-5 h-5 rounded object-cover" />
              <span className="truncate max-w-[90px]">{item.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveQueueFile(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity p-0.5"
                title="Remove from queue"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
