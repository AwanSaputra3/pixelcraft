export interface EnhanceOptions {
  brightness: number; // -100 to 100
  contrast: number;   // -100 to 100
  saturation: number; // -100 to 100
  sharpness: number;  // 0 to 100
  warmth: number;     // -100 to 100
  exposure: number;   // -100 to 100
  vibrance: number;   // -100 to 100
}

export interface HistogramData {
  r: number[];
  g: number[];
  b: number[];
  maxCount: number;
}

export const defaultEnhanceOptions: EnhanceOptions = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  sharpness: 0,
  warmth: 0,
  exposure: 0,
  vibrance: 0,
};

/**
 * Apply contrast, brightness, saturation, warmth, exposure, vibrance and sharpness to an ImageData object.
 */
export function applyEnhance(
  sourceCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: EnhanceOptions
): ImageData {
  const originalImageData = sourceCtx.getImageData(0, 0, width, height);
  const src = originalImageData.data;
  
  // Create output ImageData
  const outputImageData = new ImageData(width, height);
  const dst = outputImageData.data;

  const bMult = (options.brightness / 100) * 255;
  const cFactor = (259 * (options.contrast * 2.55 + 255)) / (255 * (259 - options.contrast * 2.55));
  const satMult = (options.saturation + 100) / 100;
  const warmthVal = options.warmth * 0.8;
  const expMult = Math.pow(2, options.exposure / 50);
  const vibranceVal = options.vibrance / 100;

  const hasExposure = options.exposure !== 0;
  const hasBrightness = options.brightness !== 0;
  const hasContrast = options.contrast !== 0;
  const hasWarmth = warmthVal !== 0;
  const hasSatOrVib = options.saturation !== 0 || options.vibrance !== 0;

  // Process color channels
  for (let i = 0; i < src.length; i += 4) {
    let r = src[i];
    let g = src[i + 1];
    let b = src[i + 2];
    const a = src[i + 3];

    // 1. Exposure
    if (hasExposure) {
      r *= expMult;
      g *= expMult;
      b *= expMult;
    }

    // 2. Brightness
    if (hasBrightness) {
      r += bMult;
      g += bMult;
      b += bMult;
    }

    // 3. Contrast
    if (hasContrast) {
      r = cFactor * (r - 128) + 128;
      g = cFactor * (g - 128) + 128;
      b = cFactor * (b - 128) + 128;
    }

    // 4. Warmth (Temperature)
    if (hasWarmth) {
      r += warmthVal;
      b -= warmthVal;
    }

    // 5. Saturation & Vibrance
    if (hasSatOrVib) {
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      
      if (options.saturation !== 0) {
        r = gray + (r - gray) * satMult;
        g = gray + (g - gray) * satMult;
        b = gray + (b - gray) * satMult;
      }

      if (options.vibrance !== 0) {
        const max = r > g ? (r > b ? r : b) : (g > b ? g : b);
        const avg = (r + g + b) * 0.333333;
        const amt = ((Math.abs(max - avg) * 2) * 0.00392156) * vibranceVal;
        r += (max - r) * amt;
        g += (max - g) * amt;
        b += (max - b) * amt;
      }
    }

    // Clamp values
    dst[i] = r < 0 ? 0 : r > 255 ? 255 : r;
    dst[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
    dst[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
    dst[i + 3] = a;
  }

  // 6. Sharpness (Convolution Matrix)
  if (options.sharpness > 0) {
    applySharpnessKernel(outputImageData, width, height, options.sharpness / 100);
  }

  return outputImageData;
}

/**
 * Sharpen image using a 3x3 Laplacian convolution kernel
 */
function applySharpnessKernel(
  imageData: ImageData,
  width: number,
  height: number,
  intensity: number
) {
  const src = new Uint8ClampedArray(imageData.data);
  const dst = imageData.data;
  
  const centerWeight = 1 + 4 * intensity;
  const edgeWeight = -intensity;

  for (let y = 1; y < height - 1; y++) {
    const yWidth = y * width;
    const yPrevWidth = (y - 1) * width;
    const yNextWidth = (y + 1) * width;

    for (let x = 1; x < width - 1; x++) {
      const idx = (yWidth + x) * 4;
      const topIdx = (yPrevWidth + x) * 4;
      const botIdx = (yNextWidth + x) * 4;
      const leftIdx = (yWidth + x - 1) * 4;
      const rightIdx = (yWidth + x + 1) * 4;

      for (let c = 0; c < 3; c++) {
        const top = src[topIdx + c];
        const bottom = src[botIdx + c];
        const left = src[leftIdx + c];
        const right = src[rightIdx + c];
        const center = src[idx + c];

        const val = center * centerWeight + (top + bottom + left + right) * edgeWeight;
        dst[idx + c] = val < 0 ? 0 : val > 255 ? 255 : val;
      }
    }
  }
}

/**
 * Compute RGB Histogram distributions (256 bins for each channel)
 */
export function computeHistogram(imageData: ImageData): HistogramData {
  const r = new Array(256).fill(0);
  const g = new Array(256).fill(0);
  const b = new Array(256).fill(0);
  let maxCount = 0;

  const data = imageData.data;
  const step = Math.max(1, Math.floor(data.length / (4 * 10000))); // Sample up to 10k pixels for fast UI updates

  for (let i = 0; i < data.length; i += 4 * step) {
    const rv = data[i];
    const gv = data[i + 1];
    const bv = data[i + 2];

    r[rv]++;
    g[gv]++;
    b[bv]++;

    if (r[rv] > maxCount) maxCount = r[rv];
    if (g[gv] > maxCount) maxCount = g[gv];
    if (b[bv] > maxCount) maxCount = b[bv];
  }

  return { r, g, b, maxCount };
}

