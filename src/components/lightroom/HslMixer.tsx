"use client";

import React, { useState } from "react";
import { HslColorName, HslChannel, LightroomOptions } from "../../lib/lightroomEngine";

interface HslMixerProps {
  hslOptions: Record<HslColorName, HslChannel>;
  onChangeHslChannel: (color: HslColorName, channel: HslChannel) => void;
  onResetHsl: () => void;
}

export const HSL_COLORS: { id: HslColorName; name: string; hex: string }[] = [
  { id: "red", name: "Red", hex: "#ef4444" },
  { id: "orange", name: "Orange", hex: "#f97316" },
  { id: "yellow", name: "Yellow", hex: "#eab308" },
  { id: "green", name: "Green", hex: "#22c55e" },
  { id: "aqua", name: "Aqua", hex: "#06b6d4" },
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "purple", name: "Purple", hex: "#a855f7" },
  { id: "magenta", name: "Magenta", hex: "#ec4899" },
];

export const HslMixer: React.FC<HslMixerProps> = ({
  hslOptions,
  onChangeHslChannel,
  onResetHsl,
}) => {
  const [activeColor, setActiveColor] = useState<HslColorName>("orange");

  const currentChannel = hslOptions[activeColor] || { hue: 0, saturation: 0, luminance: 0 };

  const handleSliderChange = (key: keyof HslChannel, val: number) => {
    onChangeHslChannel(activeColor, {
      ...currentChannel,
      [key]: val,
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-950/70 p-3.5 rounded-2xl border border-gray-800">
      {/* Header & Target Color Channel Circles */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-200">HSL Target Color Mixer</span>
        <button
          onClick={onResetHsl}
          className="text-[10px] text-gray-400 hover:text-white transition-colors"
        >
          Reset All Colors
        </button>
      </div>

      {/* Color Circle Picker Bar */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {HSL_COLORS.map((c) => {
          const isSelected = activeColor === c.id;
          const channel = hslOptions[c.id];
          const hasChanges = channel && (channel.hue !== 0 || channel.saturation !== 0 || channel.luminance !== 0);

          return (
            <button
              key={c.id}
              onClick={() => setActiveColor(c.id)}
              className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
                isSelected
                  ? "bg-gray-800 border-2 border-purple-500 scale-110 shadow-lg"
                  : "hover:bg-gray-900 border border-transparent"
              }`}
            >
              <div
                className="w-5 h-5 rounded-full shadow-inner border border-white/20 flex items-center justify-center"
                style={{ backgroundColor: c.hex }}
              >
                {hasChanges && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </div>
              <span className="text-[9px] text-gray-400 capitalize">{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Target Color Sliders (Hue, Saturation, Luminance) */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span className="capitalize font-medium flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: HSL_COLORS.find((c) => c.id === activeColor)?.hex }}
            />
            {activeColor} Hue Shift
          </span>
          <span className="font-mono text-purple-400 font-bold">{currentChannel.hue}</span>
        </div>
        <input
          type="range"
          min="-100"
          max="100"
          value={currentChannel.hue}
          onChange={(e) => handleSliderChange("hue", parseInt(e.target.value))}
          className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
        />

        <div className="flex items-center justify-between text-xs text-gray-300">
          <span className="capitalize font-medium">{activeColor} Saturation</span>
          <span className="font-mono text-purple-400 font-bold">{currentChannel.saturation}</span>
        </div>
        <input
          type="range"
          min="-100"
          max="100"
          value={currentChannel.saturation}
          onChange={(e) => handleSliderChange("saturation", parseInt(e.target.value))}
          className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
        />

        <div className="flex items-center justify-between text-xs text-gray-300">
          <span className="capitalize font-medium">{activeColor} Luminance</span>
          <span className="font-mono text-purple-400 font-bold">{currentChannel.luminance}</span>
        </div>
        <input
          type="range"
          min="-100"
          max="100"
          value={currentChannel.luminance}
          onChange={(e) => handleSliderChange("luminance", parseInt(e.target.value))}
          className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};
