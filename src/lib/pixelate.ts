export type PaletteType = 'original' | 'gameboy' | 'nes_8bit' | 'cyberpunk' | 'monochrome' | 'c64';

export interface PixelateOptions {
  blockSize: number;      // 2 to 64
  palette: PaletteType;
  gridOverlay: boolean;   // Draw pixel grid lines
  contrastBoost: number;  // 0 to 100
}

export const defaultPixelateOptions: PixelateOptions = {
  blockSize: 8,
  palette: 'original',
  gridOverlay: false,
  contrastBoost: 20,
};

// Preset Palettes (RGB triplets)
const PALETTES: Record<PaletteType, [number, number, number][] | null> = {
  original: null,
  gameboy: [
    [15, 56, 15],
    [48, 98, 48],
    [139, 172, 15],
    [155, 188, 15],
  ],
  nes_8bit: [
    [0, 0, 0],
    [255, 255, 255],
    [124, 124, 124],
    [0, 30, 116],
    [8, 16, 144],
    [48, 0, 136],
    [68, 0, 100],
    [92, 0, 48],
    [84, 4, 0],
    [60, 20, 0],
    [8, 44, 0],
    [0, 52, 0],
    [0, 50, 60],
    [0, 0, 0],
    [252, 160, 68],
    [248, 56, 0],
  ],
  cyberpunk: [
    [10, 10, 26],
    [255, 0, 127],
    [0, 240, 255],
    [112, 0, 255],
    [255, 230, 0],
    [255, 255, 255],
    [30, 200, 160],
    [230, 30, 90],
  ],
  monochrome: [
    [0, 0, 0],
    [36, 36, 36],
    [72, 72, 72],
    [108, 108, 108],
    [144, 144, 144],
    [180, 180, 180],
    [216, 216, 216],
    [255, 255, 255],
  ],
  c64: [
    [0, 0, 0],
    [255, 255, 255],
    [136, 0, 0],
    [170, 255, 238],
    [204, 68, 204],
    [0, 204, 85],
    [0, 0, 170],
    [238, 238, 119],
    [221, 136, 85],
    [102, 68, 0],
    [255, 119, 119],
    [51, 51, 51],
    [119, 119, 119],
    [170, 255, 102],
    [0, 136, 255],
    [187, 187, 187],
  ],
};

/**
 * Pixelate photo using downscaled block sampling and color palette quantization
 */
export function applyPixelate(
  sourceCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: PixelateOptions
): ImageData {
  const originalImageData = sourceCtx.getImageData(0, 0, width, height);
  const src = originalImageData.data;
  
  const output = new ImageData(width, height);
  const dst = output.data;

  const blockSize = Math.max(2, Math.min(64, options.blockSize));
  const palette = PALETTES[options.palette];
  const contrastFactor = (259 * (options.contrastBoost + 255)) / (255 * (259 - options.contrastBoost));

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      // Calculate average color in block
      let totalR = 0, totalG = 0, totalB = 0, totalA = 0;
      let count = 0;

      const blockW = Math.min(blockSize, width - x);
      const blockH = Math.min(blockSize, height - y);

      for (let by = 0; by < blockH; by++) {
        for (let bx = 0; bx < blockW; bx++) {
          const idx = ((y + by) * width + (x + bx)) * 4;
          totalR += src[idx];
          totalG += src[idx + 1];
          totalB += src[idx + 2];
          totalA += src[idx + 3];
          count++;
        }
      }

      let avgR = totalR / count;
      let avgG = totalG / count;
      let avgB = totalB / count;
      const avgA = totalA / count;

      // Optional contrast boost
      if (options.contrastBoost > 0) {
        avgR = contrastFactor * (avgR - 128) + 128;
        avgG = contrastFactor * (avgG - 128) + 128;
        avgB = contrastFactor * (avgB - 128) + 128;
      }

      // Map to color palette if specified
      if (palette && palette.length > 0) {
        const mapped = findClosestColor(avgR, avgG, avgB, palette);
        avgR = mapped[0];
        avgG = mapped[1];
        avgB = mapped[2];
      }

      avgR = Math.min(255, Math.max(0, avgR));
      avgG = Math.min(255, Math.max(0, avgG));
      avgB = Math.min(255, Math.max(0, avgB));

      // Fill block with average/quantized color
      for (let by = 0; by < blockH; by++) {
        for (let bx = 0; bx < blockW; bx++) {
          const idx = ((y + by) * width + (x + bx)) * 4;

          // Optional 8-bit Grid Border line effect
          if (options.gridOverlay && (bx === 0 || by === 0)) {
            dst[idx] = Math.max(0, avgR - 40);
            dst[idx + 1] = Math.max(0, avgG - 40);
            dst[idx + 2] = Math.max(0, avgB - 40);
            dst[idx + 3] = avgA;
          } else {
            dst[idx] = avgR;
            dst[idx + 1] = avgG;
            dst[idx + 2] = avgB;
            dst[idx + 3] = avgA;
          }
        }
      }
    }
  }

  return output;
}

/**
 * Find closest color in palette using Euclidean RGB color distance
 */
function findClosestColor(
  r: number,
  g: number,
  b: number,
  palette: [number, number, number][]
): [number, number, number] {
  let minDistance = Infinity;
  let closest = palette[0];

  for (let i = 0; i < palette.length; i++) {
    const pr = palette[i][0];
    const pg = palette[i][1];
    const pb = palette[i][2];

    const dr = r - pr;
    const dg = g - pg;
    const db = b - pb;
    const dist = dr * dr + dg * dg + db * db;

    if (dist < minDistance) {
      minDistance = dist;
      closest = palette[i];
    }
  }

  return closest;
}
