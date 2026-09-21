"use client";

import React from "react";
import { LIGHTROOM_PRESETS, LightroomPreset } from "../../lib/lightroomEngine";
import { SparklesIcon, CheckIcon } from "@heroicons/react/24/outline";

interface PresetsPanelProps {
  activePresetId: string | null;
  onSelectPreset: (preset: LightroomPreset) => void;
}

export const PresetsPanel: React.FC<PresetsPanelProps> = ({
  activePresetId,
  onSelectPreset,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <SparklesIcon className="w-4 h-4 text-[#ff47ff]" /> Cinematic Color Presets
        </h4>
        <span className="text-[10px] text-gray-400">One-Tap Color Grading</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {LIGHTROOM_PRESETS.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`group relative p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[84px] overflow-hidden ${
                isSelected
                  ? "bg-[#ff47ff]/20 border-[#ff47ff] shadow-lg shadow-[#ff47ff]/20 scale-[1.02]"
                  : "bg-[#1c1c1c] border-white/10 hover:border-[#ff47ff]/50 hover:bg-[#222222]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#ff47ff] font-semibold">
                  {preset.category}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-[#ff47ff] text-black flex items-center justify-center font-bold">
                    <CheckIcon className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              <div className="mt-2 font-bold text-xs text-white group-hover:text-[#ff47ff] transition-colors">
                {preset.name}
              </div>

              {/* Decorative gradient glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff47ff] via-[#bd99f8] to-[#64ed68] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
