"use client";

import React from "react";
import { LIGHTROOM_PRESETS, LightroomPreset, LightroomOptions } from "../../lib/lightroomEngine";
import { Sparkles, Check } from "lucide-react";

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
          <Sparkles className="w-4 h-4 text-purple-400" /> Cinematic Color Presets
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
              className={`group relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[84px] overflow-hidden ${
                isSelected
                  ? "bg-gradient-to-tr from-purple-900/60 to-pink-900/40 border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]"
                  : "bg-gray-950/70 border-gray-800 hover:border-purple-500/50 hover:bg-gray-900/80"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">
                  {preset.category}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              <div className="mt-2 font-bold text-xs text-white group-hover:text-purple-200 transition-colors">
                {preset.name}
              </div>

              {/* Decorative gradient glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
