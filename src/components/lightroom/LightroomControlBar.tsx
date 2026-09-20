"use client";

import React from "react";
import {
  Sun,
  Palette,
  Sparkles,
  Sliders,
  Crop,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Wand2,
} from "lucide-react";
import { LightroomOptions, HslColorName, HslChannel, LIGHTROOM_PRESETS, LightroomPreset } from "../../lib/lightroomEngine";
import { HslMixer } from "./HslMixer";
import { PresetsPanel } from "./PresetsPanel";

export type LightroomTab = "presets" | "light" | "color" | "effects" | "detail" | "crop";

interface LightroomControlBarProps {
  activeTab: LightroomTab;
  setActiveTab: (tab: LightroomTab) => void;
  options: LightroomOptions;
  setOptions: React.Dispatch<React.SetStateAction<LightroomOptions>>;
  activePresetId: string | null;
  onSelectPreset: (preset: LightroomPreset) => void;
  onResetOptions: () => void;
}

export const LightroomControlBar: React.FC<LightroomControlBarProps> = ({
  activeTab,
  setActiveTab,
  options,
  setOptions,
  activePresetId,
  onSelectPreset,
  onResetOptions,
}) => {
  const tabs = [
    { id: "presets", label: "Presets", icon: Wand2 },
    { id: "light", label: "Light", icon: Sun },
    { id: "color", label: "Color", icon: Palette },
    { id: "effects", label: "Effects", icon: Sparkles },
    { id: "detail", label: "Detail", icon: Sliders },
    { id: "crop", label: "Crop & Rotate", icon: Crop },
  ] as const;

  const handleChangeField = <K extends keyof LightroomOptions>(key: K, value: LightroomOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeHslChannel = (colorName: HslColorName, channel: HslChannel) => {
    setOptions((prev) => ({
      ...prev,
      hsl: {
        ...prev.hsl,
        [colorName]: channel,
      },
    }));
  };

  const handleResetHsl = () => {
    setOptions((prev) => ({
      ...prev,
      hsl: {
        red: { hue: 0, saturation: 0, luminance: 0 },
        orange: { hue: 0, saturation: 0, luminance: 0 },
        yellow: { hue: 0, saturation: 0, luminance: 0 },
        green: { hue: 0, saturation: 0, luminance: 0 },
        aqua: { hue: 0, saturation: 0, luminance: 0 },
        blue: { hue: 0, saturation: 0, luminance: 0 },
        purple: { hue: 0, saturation: 0, luminance: 0 },
        magenta: { hue: 0, saturation: 0, luminance: 0 },
      },
    }));
  };

  return (
    <div className="w-full glass-card rounded-2xl border border-gray-800 p-4 flex flex-col gap-5">
      {/* Lightroom Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LightroomTab)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-gray-900/60 hover:bg-gray-800/80 text-gray-400 hover:text-gray-200 border border-gray-800/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel 1: PRESETS */}
      {activeTab === "presets" && (
        <PresetsPanel activePresetId={activePresetId} onSelectPreset={onSelectPreset} />
      )}

      {/* Panel 2: LIGHT (Tone Curve Adjustments) */}
      {activeTab === "light" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-purple-400" /> Exposure & Tonal Curve Controls
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset Controls
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Exposure */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Exposure</span>
                <span className="font-mono text-purple-400 font-bold">{options.exposure}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.exposure}
                onChange={(e) => handleChangeField("exposure", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Contrast */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Contrast</span>
                <span className="font-mono text-purple-400 font-bold">{options.contrast}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.contrast}
                onChange={(e) => handleChangeField("contrast", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Highlights</span>
                <span className="font-mono text-purple-400 font-bold">{options.highlights}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.highlights}
                onChange={(e) => handleChangeField("highlights", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Shadows */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Shadows</span>
                <span className="font-mono text-purple-400 font-bold">{options.shadows}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.shadows}
                onChange={(e) => handleChangeField("shadows", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Whites */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Whites</span>
                <span className="font-mono text-purple-400 font-bold">{options.whites}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.whites}
                onChange={(e) => handleChangeField("whites", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Blacks */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Blacks</span>
                <span className="font-mono text-purple-400 font-bold">{options.blacks}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.blacks}
                onChange={(e) => handleChangeField("blacks", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Panel 3: COLOR & HSL */}
      {activeTab === "color" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-purple-400" /> Color Balance & HSL Target Channels
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Global White Balance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Temp (Warmth)</span>
                <span className="font-mono text-purple-400 font-bold">{options.temperature}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.temperature}
                onChange={(e) => handleChangeField("temperature", parseInt(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Tint (Magenta/Green)</span>
                <span className="font-mono text-purple-400 font-bold">{options.tint}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.tint}
                onChange={(e) => handleChangeField("tint", parseInt(e.target.value))}
                className="w-full accent-pink-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Vibrance</span>
                <span className="font-mono text-purple-400 font-bold">{options.vibrance}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.vibrance}
                onChange={(e) => handleChangeField("vibrance", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Saturation</span>
                <span className="font-mono text-purple-400 font-bold">{options.saturation}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.saturation}
                onChange={(e) => handleChangeField("saturation", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* HSL Mixer Component */}
          <HslMixer
            hslOptions={options.hsl}
            onChangeHslChannel={handleChangeHslChannel}
            onResetHsl={handleResetHsl}
          />
        </div>
      )}

      {/* Panel 4: EFFECTS */}
      {activeTab === "effects" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> Texture, Clarity & Vignette
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Texture</span>
                <span className="font-mono text-purple-400 font-bold">{options.texture}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.texture}
                onChange={(e) => handleChangeField("texture", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Clarity</span>
                <span className="font-mono text-purple-400 font-bold">{options.clarity}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.clarity}
                onChange={(e) => handleChangeField("clarity", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Dehaze</span>
                <span className="font-mono text-purple-400 font-bold">{options.dehaze}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.dehaze}
                onChange={(e) => handleChangeField("dehaze", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Vignette Amount</span>
                <span className="font-mono text-purple-400 font-bold">{options.vignette}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.vignette}
                onChange={(e) => handleChangeField("vignette", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Vintage Film Grain</span>
                <span className="font-mono text-purple-400 font-bold">{options.grain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.grain}
                onChange={(e) => handleChangeField("grain", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Panel 5: DETAIL */}
      {activeTab === "detail" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" /> Detail & Sharpening
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Sharpening Amount</span>
                <span className="font-mono text-purple-400 font-bold">{options.sharpening}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.sharpening}
                onChange={(e) => handleChangeField("sharpening", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Luminance Noise Reduction</span>
                <span className="font-mono text-purple-400 font-bold">{options.noiseReduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.noiseReduction}
                onChange={(e) => handleChangeField("noiseReduction", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Panel 6: CROP & ROTATE */}
      {activeTab === "crop" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Crop className="w-4 h-4 text-purple-400" /> Crop & Geometry Transform
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Aspect Ratio Buttons */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-300">Aspect Ratio Preset</label>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: "free", label: "Free" },
                { id: "1:1", label: "1:1 Square" },
                { id: "4:5", label: "4:5 Portrait" },
                { id: "9:16", label: "9:16 Story" },
                { id: "16:9", label: "16:9 Wide" },
              ].map((a) => (
                <button
                  key={a.id}
                  onClick={() => handleChangeField("aspectRatio", a.id as any)}
                  className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-all ${
                    options.aspectRatio === a.id
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flip & Rotate Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleChangeField("flipH", !options.flipH)}
              className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-colors ${
                options.flipH
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-gray-900 border-gray-800 text-gray-300 hover:text-white"
              }`}
            >
              <FlipHorizontal className="w-4 h-4" /> Flip Horiz
            </button>

            <button
              onClick={() => handleChangeField("flipV", !options.flipV)}
              className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-colors ${
                options.flipV
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-gray-900 border-gray-800 text-gray-300 hover:text-white"
              }`}
            >
              <FlipVertical className="w-4 h-4" /> Flip Vert
            </button>

            <button
              onClick={() =>
                handleChangeField("rotationAngle", (options.rotationAngle - 90 + 360) % 360)
              }
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-800 bg-gray-900 text-gray-300 hover:text-white text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> -90°
            </button>

            <button
              onClick={() =>
                handleChangeField("rotationAngle", (options.rotationAngle + 90) % 360)
              }
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-gray-800 bg-gray-900 text-gray-300 hover:text-white text-xs font-medium transition-colors"
            >
              <RotateCw className="w-4 h-4" /> +90°
            </button>
          </div>

          {/* Straighten Angle Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-gray-300">
              <span>Straighten Angle</span>
              <span className="font-mono text-purple-400 font-bold">{options.rotationAngle}°</span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={options.rotationAngle > 180 ? options.rotationAngle - 360 : options.rotationAngle}
              onChange={(e) => handleChangeField("rotationAngle", parseInt(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
