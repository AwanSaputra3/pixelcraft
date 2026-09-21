"use client";

import React from "react";
import {
  SunIcon,
  SwatchIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  ScissorsIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { LightroomOptions, HslColorName, HslChannel, LIGHTROOM_PRESETS, LightroomPreset } from "../../lib/lightroomEngine";
import { HslMixer } from "./HslMixer";
import { PresetsPanel } from "./PresetsPanel";
import { MaskingPanel } from "./MaskingPanel";

export type LightroomTab = "presets" | "light" | "color" | "effects" | "detail" | "masking" | "crop";

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
    { id: "presets", label: "Presets", icon: SparklesIcon },
    { id: "light", label: "Light", icon: SunIcon },
    { id: "color", label: "Color", icon: SwatchIcon },
    { id: "effects", label: "Effects", icon: SparklesIcon },
    { id: "detail", label: "Detail", icon: AdjustmentsHorizontalIcon },
    { id: "masking", label: "Masking", icon: Square3Stack3DIcon },
    { id: "crop", label: "Crop & Rotate", icon: ScissorsIcon },
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
    <div className="w-full glass-card-fintech p-5 flex flex-col gap-5">
      {/* Lightroom Navigation Tabs with Sliding Animated Pill */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3.5 gap-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LightroomTab)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 shrink-0 active:scale-95 z-10 cursor-pointer ${
                isActive
                  ? "text-black bg-[#ff47ff] shadow-lg shadow-[#ff47ff]/25"
                  : "text-neutral-400 hover:text-white bg-[#121212] border border-neutral-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Animated Panel Container */}
      <div
        key={activeTab}
        className="flex flex-col gap-4 animate-tab-fade"
      >
        {/* Panel 1: PRESETS */}
        {activeTab === "presets" && (
          <PresetsPanel activePresetId={activePresetId} onSelectPreset={onSelectPreset} />
        )}

        {/* Panel 2: LIGHT (Tone Curve Adjustments) */}
        {activeTab === "light" && (
          <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <SunIcon className="w-4 h-4 text-[#ffc13c]" /> Exposure & Tonal Curve Controls
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
              <ArrowPathIcon className="w-3 h-3" /> Reset Controls
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Exposure */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Exposure</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.exposure}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.exposure}
                onChange={(e) => handleChangeField("exposure", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Contrast */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Contrast</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.contrast}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.contrast}
                onChange={(e) => handleChangeField("contrast", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Highlights</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.highlights}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.highlights}
                onChange={(e) => handleChangeField("highlights", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Shadows */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Shadows</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.shadows}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.shadows}
                onChange={(e) => handleChangeField("shadows", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Whites */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Whites</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.whites}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.whites}
                onChange={(e) => handleChangeField("whites", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Blacks */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Blacks</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.blacks}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.blacks}
                onChange={(e) => handleChangeField("blacks", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Panel 3: COLOR & HSL */}
      {activeTab === "color" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <SwatchIcon className="w-4 h-4 text-[#ff47ff]" /> Color Balance & HSL Target Channels
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
              <ArrowPathIcon className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Temp (Warmth)</span>
                <span className="font-mono text-[#ffc13c] font-bold">{options.temperature}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.temperature}
                onChange={(e) => handleChangeField("temperature", parseInt(e.target.value))}
                className="w-full accent-[#ffc13c] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Tint (Magenta/Green)</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.tint}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.tint}
                onChange={(e) => handleChangeField("tint", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Vibrance</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.vibrance}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.vibrance}
                onChange={(e) => handleChangeField("vibrance", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Saturation</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.saturation}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.saturation}
                onChange={(e) => handleChangeField("saturation", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <HslMixer
            hslOptions={options.hsl}
            onChangeHslChannel={handleChangeHslChannel}
            onResetHsl={handleResetHsl}
          />
        </div>
      )}

      {/* Panel 4: EFFECTS */}
      {activeTab === "effects" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-[#bd99f8]" /> Texture, Clarity & Vignette
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
              <ArrowPathIcon className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Texture</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.texture}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.texture}
                onChange={(e) => handleChangeField("texture", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Clarity</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.clarity}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.clarity}
                onChange={(e) => handleChangeField("clarity", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Dehaze</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.dehaze}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.dehaze}
                onChange={(e) => handleChangeField("dehaze", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Vignette Amount</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.vignette}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={options.vignette}
                onChange={(e) => handleChangeField("vignette", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Vintage Film Grain</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.grain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.grain}
                onChange={(e) => handleChangeField("grain", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Panel 5: DETAIL */}
      {activeTab === "detail" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AdjustmentsHorizontalIcon className="w-4 h-4 text-[#64ed68]" /> Detail & Sharpening
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
              <ArrowPathIcon className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Sharpening Amount</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.sharpening}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.sharpening}
                onChange={(e) => handleChangeField("sharpening", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Luminance Noise Reduction</span>
                <span className="font-mono text-[#ff47ff] font-bold">{options.noiseReduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={options.noiseReduction}
                onChange={(e) => handleChangeField("noiseReduction", parseInt(e.target.value))}
                className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Panel 6: MASKING */}
      {activeTab === "masking" && (
        <MaskingPanel options={options} setOptions={setOptions} />
      )}

      {/* Panel 7: CROP & ROTATE */}
      {activeTab === "crop" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ScissorsIcon className="w-4 h-4 text-[#ffc13c]" /> Crop & Geometry Transform
            </h4>
            <button onClick={onResetOptions} className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
              <ArrowPathIcon className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-300 font-medium">Aspect Ratio Preset</label>
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
                  className={`py-1.5 rounded-full border text-[11px] font-semibold transition-all ${
                    options.aspectRatio === a.id
                      ? "bg-[#ff47ff] border-[#ff47ff] text-black"
                      : "bg-[#121212] border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleChangeField("flipH", !options.flipH)}
              className={`flex items-center justify-center gap-1.5 p-2.5 rounded-2xl border text-xs font-medium transition-colors ${
                options.flipH
                  ? "bg-[#ff47ff] border-[#ff47ff] text-black font-semibold"
                  : "bg-[#121212] border-neutral-800 text-neutral-300 hover:text-white"
              }`}
            >
              <ArrowsRightLeftIcon className="w-4 h-4" /> Flip Horiz
            </button>

            <button
              onClick={() => handleChangeField("flipV", !options.flipV)}
              className={`flex items-center justify-center gap-1.5 p-2.5 rounded-2xl border text-xs font-medium transition-colors ${
                options.flipV
                  ? "bg-[#ff47ff] border-[#ff47ff] text-black font-semibold"
                  : "bg-[#121212] border-neutral-800 text-neutral-300 hover:text-white"
              }`}
            >
              <ArrowsUpDownIcon className="w-4 h-4" /> Flip Vert
            </button>

            <button
              onClick={() =>
                handleChangeField("rotationAngle", (options.rotationAngle - 90 + 360) % 360)
              }
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-2xl border border-neutral-800 bg-[#121212] text-neutral-300 hover:text-white text-xs font-medium transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4" /> -90°
            </button>

            <button
              onClick={() =>
                handleChangeField("rotationAngle", (options.rotationAngle + 90) % 360)
              }
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-2xl border border-neutral-800 bg-[#121212] text-neutral-300 hover:text-white text-xs font-medium transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4" /> +90°
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-neutral-300">
              <span>Straighten Angle</span>
              <span className="font-mono text-[#ff47ff] font-bold">{options.rotationAngle}°</span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={options.rotationAngle > 180 ? options.rotationAngle - 360 : options.rotationAngle}
              onChange={(e) => handleChangeField("rotationAngle", parseInt(e.target.value))}
              className="w-full accent-[#ff47ff] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}
        </div>
    </div>
  );
};

