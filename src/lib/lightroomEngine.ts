export interface HslChannel {
  hue: number;        // -100 to 100
  saturation: number; // -100 to 100
  luminance: number;  // -100 to 100
}

export type HslColorName = 'red' | 'orange' | 'yellow' | 'green' | 'aqua' | 'blue' | 'purple' | 'magenta';

export interface LightroomOptions {
  // Light / Exposure
  exposure: number;   // -100 to 100
  contrast: number;   // -100 to 100
  highlights: number; // -100 to 100
  shadows: number;    // -100 to 100
  whites: number;     // -100 to 100
  blacks: number;     // -100 to 100

  // Color
  temperature: number; // -100 to 100 (Warmth / Coolness)
  tint: number;        // -100 to 100 (Green / Magenta)
  vibrance: number;    // -100 to 100
  saturation: number;  // -100 to 100

  // HSL Target Channels
  hsl: Record<HslColorName, HslChannel>;

  // Effects
  texture: number;     // 0 to 100
  clarity: number;     // -100 to 100
  dehaze: number;      // -100 to 100
  vignette: number;    // -100 to 100
  grain: number;       // 0 to 100

  // Detail
  sharpening: number;  // 0 to 100
  noiseReduction: number; // 0 to 100

  // Transform / Crop
  rotationAngle: number; // -45 to 45
  flipH: boolean;
  flipV: boolean;
  aspectRatio: 'free' | '1:1' | '4:5' | '9:16' | '16:9';
}

const defaultHslChannel: HslChannel = { hue: 0, saturation: 0, luminance: 0 };

export const defaultLightroomOptions: LightroomOptions = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  temperature: 0,
  tint: 0,
  vibrance: 0,
  saturation: 0,
  hsl: {
    red: { ...defaultHslChannel },
    orange: { ...defaultHslChannel },
    yellow: { ...defaultHslChannel },
    green: { ...defaultHslChannel },
    aqua: { ...defaultHslChannel },
    blue: { ...defaultHslChannel },
    purple: { ...defaultHslChannel },
    magenta: { ...defaultHslChannel },
  },
  texture: 0,
  clarity: 0,
  dehaze: 0,
  vignette: 0,
  grain: 0,
  sharpening: 0,
  noiseReduction: 0,
  rotationAngle: 0,
  flipH: false,
  flipV: false,
  aspectRatio: 'free',
};

// Preset Definitions
export interface LightroomPreset {
  id: string;
  name: string;
  category: string;
  options: Partial<LightroomOptions>;
}

export const LIGHTROOM_PRESETS: LightroomPreset[] = [
  {
    id: 'teal_orange',
    name: 'Teal & Orange',
    category: 'Cinematic',
    options: {
      temperature: 15,
      tint: -5,
      contrast: 20,
      vibrance: 25,
      saturation: 10,
      highlights: -15,
      shadows: 15,
      hsl: {
        ...defaultLightroomOptions.hsl,
        orange: { hue: -10, saturation: 25, luminance: 10 },
        aqua: { hue: 15, saturation: 35, luminance: -10 },
        blue: { hue: 20, saturation: 40, luminance: -15 },
      },
      clarity: 15,
      vignette: -20,
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    category: 'Creative',
    options: {
      temperature: -20,
      tint: 30,
      contrast: 35,
      vibrance: 40,
      saturation: 20,
      highlights: 25,
      shadows: -20,
      hsl: {
        ...defaultLightroomOptions.hsl,
        blue: { hue: 15, saturation: 50, luminance: 20 },
        magenta: { hue: 0, saturation: 60, luminance: 15 },
        purple: { hue: -10, saturation: 50, luminance: 10 },
      },
      clarity: 25,
      vignette: -35,
    },
  },
  {
    id: 'vintage_gold',
    name: 'Vintage Gold',
    category: 'Retro',
    options: {
      temperature: 35,
      tint: 10,
      exposure: 5,
      contrast: -10,
      highlights: -30,
      shadows: 25,
      whites: -15,
      blacks: 20,
      vibrance: -10,
      texture: 15,
      grain: 25,
      vignette: -25,
    },
  },
  {
    id: 'moody_forest',
    name: 'Moody Forest',
    category: 'Nature',
    options: {
      temperature: -15,
      tint: -10,
      contrast: 25,
      highlights: -35,
      shadows: 10,
      blacks: -15,
      vibrance: -15,
      hsl: {
        ...defaultLightroomOptions.hsl,
        green: { hue: 25, saturation: -30, luminance: -20 },
        yellow: { hue: -20, saturation: -40, luminance: -15 },
      },
      clarity: 20,
      vignette: -30,
    },
  },
  {
    id: 'golden_hour',
    name: 'Golden Hour',
    category: 'Warm',
    options: {
      temperature: 40,
      tint: 5,
      exposure: 10,
      contrast: 15,
      highlights: -20,
      shadows: 20,
      vibrance: 30,
      saturation: 15,
      hsl: {
        ...defaultLightroomOptions.hsl,
        orange: { hue: 5, saturation: 30, luminance: 15 },
        yellow: { hue: 10, saturation: 35, luminance: 20 },
      },
      clarity: 10,
      vignette: -15,
    },
  },
  {
    id: 'bw_dramatic',
    name: 'B&W Dramatic',
    category: 'Monochrome',
    options: {
      saturation: -100,
      contrast: 45,
      exposure: 5,
      highlights: -20,
      shadows: -15,
      whites: 25,
      blacks: -30,
      clarity: 35,
      grain: 20,
      vignette: -40,
    },
  },
  {
    id: 'soft_pastel',
    name: 'Soft Pastel',
    category: 'Portrait',
    options: {
      exposure: 15,
      contrast: -20,
      highlights: -25,
      shadows: 30,
      whites: -10,
      blacks: 15,
      temperature: 10,
      vibrance: 15,
      saturation: -10,
      texture: -10,
      clarity: -15,
    },
  },
];

/**
 * Main Lightroom Mobile Filter Pipeline Engine
 */
export function applyLightroomEngine(
  sourceCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: LightroomOptions
): ImageData {
  const original = sourceCtx.getImageData(0, 0, width, height);
  const src = original.data;

  const output = new ImageData(width, height);
  const dst = output.data;

  // Pre-calculate constants
  const expMult = Math.pow(2, options.exposure / 50);
  const cFactor = (259 * (options.contrast * 2.55 + 255)) / (255 * (259 - options.contrast * 2.55));
  const tempVal = options.temperature;
  const tintVal = options.tint;
  const satMult = (options.saturation + 100) / 100;
  const vibVal = options.vibrance / 100;

  const hlVal = options.highlights / 100;
  const shVal = options.shadows / 100;
  const wVal = options.whites / 100;
  const bVal = options.blacks / 100;
  const dehazeVal = options.dehaze / 100;

  // Process pixel by pixel
  for (let i = 0; i < src.length; i += 4) {
    let r = src[i];
    let g = src[i + 1];
    let b = src[i + 2];
    const a = src[i + 3];

    // 1. Exposure
    if (options.exposure !== 0) {
      r *= expMult;
      g *= expMult;
      b *= expMult;
    }

    // 2. Highlights & Shadows (Tonal Curve Mapping)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // 0 to 1

    if (options.highlights !== 0 && luminance > 0.5) {
      const hlWeight = Math.pow((luminance - 0.5) * 2, 1.5);
      const hlFactor = 1 + hlVal * hlWeight;
      r *= hlFactor;
      g *= hlFactor;
      b *= hlFactor;
    }

    if (options.shadows !== 0 && luminance < 0.5) {
      const shWeight = Math.pow((0.5 - luminance) * 2, 1.5);
      const shFactor = 1 + shVal * shWeight;
      r *= shFactor;
      g *= shFactor;
      b *= shFactor;
    }

    // Whites & Blacks
    if (options.whites !== 0 && luminance > 0.7) {
      const wWeight = (luminance - 0.7) / 0.3;
      r += wVal * 40 * wWeight;
      g += wVal * 40 * wWeight;
      b += wVal * 40 * wWeight;
    }

    if (options.blacks !== 0 && luminance < 0.3) {
      const bWeight = (0.3 - luminance) / 0.3;
      r += bVal * 40 * bWeight;
      g += bVal * 40 * bWeight;
      b += bVal * 40 * bWeight;
    }

    // 3. Contrast & Dehaze
    if (options.contrast !== 0) {
      r = cFactor * (r - 128) + 128;
      g = cFactor * (g - 128) + 128;
      b = cFactor * (b - 128) + 128;
    }

    if (options.dehaze !== 0) {
      // Dehaze increases midtone contrast and reduces haze veil
      const dFactor = 1 + dehazeVal * 0.4;
      r = (r - 15 * dehazeVal) * dFactor;
      g = (g - 15 * dehazeVal) * dFactor;
      b = (b - 15 * dehazeVal) * dFactor;
    }

    // 4. Temperature & Tint
    if (tempVal !== 0) {
      r += tempVal * 0.85;
      b -= tempVal * 0.85;
    }

    if (tintVal !== 0) {
      g -= tintVal * 0.7; // Green to Magenta
      r += tintVal * 0.3;
      b += tintVal * 0.3;
    }

    // 5. HSL Color Target Channel Adjustments
    let [h, s, l] = rgbToHsl(r, g, b);

    // Identify target color channel
    const channelName = getHslChannelName(h);
    const channelOption = options.hsl[channelName];

    if (channelOption && (channelOption.hue !== 0 || channelOption.saturation !== 0 || channelOption.luminance !== 0)) {
      h = (h + (channelOption.hue / 100) * 30 + 360) % 360;
      s = Math.min(1, Math.max(0, s * (1 + channelOption.saturation / 100)));
      l = Math.min(1, Math.max(0, l * (1 + channelOption.luminance / 100)));
    }

    // Global Saturation & Vibrance
    if (options.saturation !== 0) {
      s = Math.min(1, Math.max(0, s * satMult));
    }

    if (options.vibrance !== 0) {
      const vibAmount = (1 - s) * vibVal;
      s = Math.min(1, Math.max(0, s + vibAmount * 0.5));
    }

    const [finalR, finalG, finalB] = hslToRgb(h, s, l);

    dst[i] = Math.min(255, Math.max(0, finalR));
    dst[i + 1] = Math.min(255, Math.max(0, finalG));
    dst[i + 2] = Math.min(255, Math.max(0, finalB));
    dst[i + 3] = a;
  }

  // 6. Effects: Vignette, Film Grain, Texture/Clarity
  if (options.vignette !== 0) {
    applyVignette(output, width, height, options.vignette);
  }

  if (options.grain > 0) {
    applyGrain(output, width, height, options.grain);
  }

  if (options.sharpening > 0 || options.clarity !== 0 || options.texture > 0) {
    applyDetailAndClarity(output, width, height, options);
  }

  return output;
}

/**
 * Apply Vignette (edge darkening/lightening)
 */
function applyVignette(imageData: ImageData, width: number, height: number, amount: number) {
  const dst = imageData.data;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
  const vFactor = amount / 100;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) / maxRadius;

      if (dist > 0.4) {
        const falloff = Math.pow((dist - 0.4) / 0.6, 2);
        const mult = 1 + vFactor * falloff * 0.85;

        dst[idx] = Math.min(255, Math.max(0, dst[idx] * mult));
        dst[idx + 1] = Math.min(255, Math.max(0, dst[idx + 1] * mult));
        dst[idx + 2] = Math.min(255, Math.max(0, dst[idx + 2] * mult));
      }
    }
  }
}

/**
 * Apply Film Grain noise
 */
function applyGrain(imageData: ImageData, width: number, height: number, amount: number) {
  const dst = imageData.data;
  const intensity = (amount / 100) * 35;

  for (let i = 0; i < dst.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity;
    dst[i] = Math.min(255, Math.max(0, dst[i] + noise));
    dst[i + 1] = Math.min(255, Math.max(0, dst[i + 1] + noise));
    dst[i + 2] = Math.min(255, Math.max(0, dst[i + 2] + noise));
  }
}

/**
 * Apply Sharpening, Clarity & Texture Kernel
 */
function applyDetailAndClarity(imageData: ImageData, width: number, height: number, options: LightroomOptions) {
  const src = new Uint8ClampedArray(imageData.data);
  const dst = imageData.data;

  const sharpIntensity = (options.sharpening / 100) * 0.8;
  const clarityIntensity = (options.clarity / 100) * 0.6;
  const textureIntensity = (options.texture / 100) * 0.5;

  const totalKernelWeight = sharpIntensity + textureIntensity;

  if (totalKernelWeight <= 0 && clarityIntensity === 0) return;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;

      for (let c = 0; c < 3; c++) {
        const top = src[((y - 1) * width + x) * 4 + c];
        const bottom = src[((y + 1) * width + x) * 4 + c];
        const left = src[(y * width + (x - 1)) * 4 + c];
        const right = src[(y * width + (x + 1)) * 4 + c];
        const center = src[idx + c];

        let val = center;

        // Sharpen / Texture Kernel
        if (totalKernelWeight > 0) {
          const edge = center * 4 - (top + bottom + left + right);
          val += edge * totalKernelWeight;
        }

        // Clarity (Midtone contrast)
        if (clarityIntensity !== 0) {
          const avgLocal = (top + bottom + left + right + center) / 5;
          val += (center - avgLocal) * clarityIntensity;
        }

        dst[idx + c] = Math.min(255, Math.max(0, val));
      }
    }
  }
}

// RGB <-> HSL Helper Functions
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

function getHslChannelName(hue: number): HslColorName {
  if (hue >= 345 || hue < 15) return 'red';
  if (hue >= 15 && hue < 45) return 'orange';
  if (hue >= 45 && hue < 75) return 'yellow';
  if (hue >= 75 && hue < 165) return 'green';
  if (hue >= 165 && hue < 195) return 'aqua';
  if (hue >= 195 && hue < 255) return 'blue';
  if (hue >= 255 && hue < 315) return 'purple';
  return 'magenta';
}
