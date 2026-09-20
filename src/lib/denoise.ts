export interface DenoiseOptions {
  radius: number;     // 1 to 5 (kernel radius, window size = 2r+1)
  strength: number;   // 0 to 100
  mode: 'median' | 'bilateral'; // Filter mode
  edgePreserve: number; // 1 to 100
}

export const defaultDenoiseOptions: DenoiseOptions = {
  radius: 2,
  strength: 50,
  mode: 'median',
  edgePreserve: 40,
};

/**
 * Apply spatial noise reduction (Median filter or Bilateral filter) to Canvas ImageData.
 */
export function applyDenoise(
  sourceCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: DenoiseOptions
): ImageData {
  const originalImageData = sourceCtx.getImageData(0, 0, width, height);
  
  if (options.strength <= 0) {
    return originalImageData;
  }

  if (options.mode === 'bilateral') {
    return applyBilateralFilter(originalImageData, width, height, options);
  } else {
    return applyMedianFilter(originalImageData, width, height, options);
  }
}

/**
 * Fast Spatial Median Filter for ISO grain reduction
 */
function applyMedianFilter(
  imageData: ImageData,
  width: number,
  height: number,
  options: DenoiseOptions
): ImageData {
  const src = imageData.data;
  const output = new ImageData(width, height);
  const dst = output.data;

  const r = Math.min(3, Math.max(1, Math.round(options.radius)));
  const blend = options.strength / 100;
  
  const windowSize = (2 * r + 1) * (2 * r + 1);
  const rBuf = new Float32Array(windowSize);
  const gBuf = new Float32Array(windowSize);
  const bBuf = new Float32Array(windowSize);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Handle borders quickly
      if (x < r || y < r || x >= width - r || y >= height - r) {
        dst[idx] = src[idx];
        dst[idx + 1] = src[idx + 1];
        dst[idx + 2] = src[idx + 2];
        dst[idx + 3] = src[idx + 3];
        continue;
      }

      let count = 0;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nIdx = ((y + dy) * width + (x + dx)) * 4;
          rBuf[count] = src[nIdx];
          gBuf[count] = src[nIdx + 1];
          bBuf[count] = src[nIdx + 2];
          count++;
        }
      }

      // Quick sort to find median
      rBuf.subarray(0, count).sort();
      gBuf.subarray(0, count).sort();
      bBuf.subarray(0, count).sort();

      const mid = Math.floor(count / 2);
      const medR = rBuf[mid];
      const medG = gBuf[mid];
      const medB = bBuf[mid];

      // Alpha blend original with median filtered based on strength
      dst[idx] = Math.round(src[idx] * (1 - blend) + medR * blend);
      dst[idx + 1] = Math.round(src[idx + 1] * (1 - blend) + medG * blend);
      dst[idx + 2] = Math.round(src[idx + 2] * (1 - blend) + medB * blend);
      dst[idx + 3] = src[idx + 3];
    }
  }

  return output;
}

/**
 * Bilateral Filter: Smooths low-contrast noise while preserving sharp boundaries
 */
function applyBilateralFilter(
  imageData: ImageData,
  width: number,
  height: number,
  options: DenoiseOptions
): ImageData {
  const src = imageData.data;
  const output = new ImageData(width, height);
  const dst = output.data;

  const radius = Math.min(3, Math.max(1, Math.round(options.radius)));
  const spatialSigma = radius * 1.5;
  const rangeSigma = (options.edgePreserve / 100) * 80 + 10;
  const blend = options.strength / 100;

  // Precompute spatial Gaussian weights
  const spatialWeights: number[][] = [];
  for (let dy = -radius; dy <= radius; dy++) {
    spatialWeights[dy + radius] = [];
    for (let dx = -radius; dx <= radius; dx++) {
      spatialWeights[dy + radius][dx + radius] = Math.exp(-(dx * dx + dy * dy) / (2 * spatialSigma * spatialSigma));
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (x < radius || y < radius || x >= width - radius || y >= height - radius) {
        dst[idx] = src[idx];
        dst[idx + 1] = src[idx + 1];
        dst[idx + 2] = src[idx + 2];
        dst[idx + 3] = src[idx + 3];
        continue;
      }

      const centerR = src[idx];
      const centerG = src[idx + 1];
      const centerB = src[idx + 2];

      let sumR = 0, sumG = 0, sumB = 0;
      let totalWeight = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nIdx = ((y + dy) * width + (x + dx)) * 4;
          const nr = src[nIdx];
          const ng = src[nIdx + 1];
          const nb = src[nIdx + 2];

          // Color distance
          const dr = nr - centerR;
          const dg = ng - centerG;
          const db = nb - centerB;
          const colorDistSq = dr * dr + dg * dg + db * db;

          // Range weight (exponential falloff for different colors)
          const rangeWeight = Math.exp(-colorDistSq / (2 * rangeSigma * rangeSigma));
          const w = spatialWeights[dy + radius][dx + radius] * rangeWeight;

          sumR += nr * w;
          sumG += ng * w;
          sumB += nb * w;
          totalWeight += w;
        }
      }

      const filteredR = sumR / totalWeight;
      const filteredG = sumG / totalWeight;
      const filteredB = sumB / totalWeight;

      dst[idx] = Math.round(centerR * (1 - blend) + filteredR * blend);
      dst[idx + 1] = Math.round(centerG * (1 - blend) + filteredG * blend);
      dst[idx + 2] = Math.round(centerB * (1 - blend) + filteredB * blend);
      dst[idx + 3] = src[idx + 3];
    }
  }

  return output;
}
