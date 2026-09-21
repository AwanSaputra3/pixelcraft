"use client";

import React, { useRef, useState } from "react";
import {
  CloudArrowUpIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
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
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-5 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] ${
            isDragOver
              ? "border-[#ff47ff] bg-[#ff47ff]/10 scale-[1.01] shadow-xl shadow-[#ff47ff]/20"
              : "border-neutral-800 bg-[#1c1c1c] hover:border-[#ff47ff]/50 hover:bg-[#222222]"
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

          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#ff47ff]/15 border border-[#ff47ff]/30 flex items-center justify-center mb-3 sm:mb-4 text-[#ff47ff] group-hover:scale-110 transition-transform shadow-lg shadow-[#ff47ff]/10">
            <CloudArrowUpIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff47ff]" />
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
            Drag & drop your photo here, or <span className="text-[#ff47ff] underline">browse</span>
          </h3>
          <p className="text-xs text-neutral-400 max-w-sm mb-4 sm:mb-6 px-2">
            Supports PNG, JPG, WebP, GIF & BMP up to 50MB. Processed 100% locally in your browser.
          </p>

          {/* Quick sample pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-medium text-neutral-400">Or try demo image:</span>
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.name}
                onClick={() => onSampleSelect(sample.url, sample.name)}
                className="px-2.5 sm:px-3 py-1 text-xs font-medium rounded-full bg-[#121212] hover:bg-[#ff47ff]/20 text-neutral-200 border border-neutral-700 hover:border-[#ff47ff]/40 flex items-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                {sample.name}
                <ArrowTopRightOnSquareIcon className="w-3 h-3 text-[#ff47ff]" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Image Loaded Metadata Bar */
        <div className="glass-card-fintech rounded-2xl p-3 sm:p-3.5 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="px-2.5 py-1 rounded-full bg-[#ff47ff]/20 text-[#ff47ff] font-semibold uppercase tracking-wider text-[10px] shrink-0">
              {currentImageInfo.type.split("/")[1] || "IMG"}
            </div>
            <div className="truncate max-w-[160px] xs:max-w-[220px] sm:max-w-[280px] font-medium text-white" title={currentImageInfo.name}>
              {currentImageInfo.name}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 sm:gap-4 text-neutral-400 text-xs">
            <div>
              <span className="hidden xs:inline">Dimensions: </span>
              <span className="text-neutral-200 font-mono">
                {currentImageInfo.width}×{currentImageInfo.height}px
              </span>
            </div>
            <div>
              <span className="hidden xs:inline">Size: </span>
              <span className="text-neutral-200 font-mono">{formatBytes(currentImageInfo.size)}</span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-[#ff47ff]/40 transition-all duration-200 hover:scale-105 active:scale-95 font-medium shadow-sm shrink-0"
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
          <span className="text-xs text-neutral-400 flex items-center gap-1 shrink-0">
            <PhotoIcon className="w-3.5 h-3.5 text-[#ff47ff]" /> Queue ({fileQueue.length}):
          </span>
          {fileQueue.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectQueueFile(item.id)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs cursor-pointer shrink-0 transition-all ${
                activeFileId === item.id
                  ? "bg-[#ff47ff]/15 border-[#ff47ff] text-white shadow-md shadow-[#ff47ff]/15"
                  : "bg-[#1c1c1c] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
              }`}
            >
              <img src={item.thumbnail} alt={item.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="truncate max-w-[90px]">{item.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveQueueFile(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity p-0.5"
                title="Remove from queue"
              >
                <TrashIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

