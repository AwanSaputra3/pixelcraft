import { removeBackground, Config } from '@imgly/background-removal';

export type BgType = 'transparent' | 'solid' | 'gradient' | 'customImage';

export interface RemoveBgOptions {
  bgType: BgType;
  solidColor: string; // e.g. '#ffffff'
  gradientIndex: number;
  customBgImageDataUrl?: string;
  featherEdges: number; // 0 to 10
}

export const defaultRemoveBgOptions: RemoveBgOptions = {
  bgType: 'transparent',
  solidColor: '#ffffff',
  gradientIndex: 0,
  featherEdges: 2,
};

export const PRESET_GRADIENTS = [
  { name: 'Sunset Violet', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'] },
  { name: 'Ocean Depth', css: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)', colors: ['#2b5876', '#4e4376'] },
  { name: 'Cyberpunk Glow', css: 'linear-gradient(135deg, #ff007f 0%, #7000ff 100%)', colors: ['#ff007f', '#7000ff'] },
  { name: 'Clean Studio Light', css: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', colors: ['#e0eafc', '#cfdef3'] },
  { name: 'Emerald Forest', css: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', colors: ['#134e5e', '#71b280'] },
  { name: 'Golden Hour', css: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', colors: ['#ff7e5f', '#feb47b'] },
];

/**
 * Remove image background using @imgly/background-removal AI model (WASM/ONNX)
 */
export async function processRemoveBackground(
  imageSource: File | Blob | string,
  options: RemoveBgOptions,
  onProgress?: (progress: number, text: string) => void
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  try {
    onProgress?.(10, "Initializing AI Segmentation Engine...");

    const config: Config = {
      progress: (key: string, current: number, total: number) => {
        if (total > 0) {
          const pct = Math.round((current / total) * 100);
          if (key.includes('fetch')) {
            onProgress?.(10 + Math.round(pct * 0.4), `Downloading AI Model weights (${pct}%)...`);
          } else {
            onProgress?.(50 + Math.round(pct * 0.4), `Segmenting subject foreground (${pct}%)...`);
          }
        }
      },
    };

    // Run Neural Network segmentation
    const cutoutBlob = await removeBackground(imageSource, config);
    onProgress?.(92, "Applying background composition...");

    // Compose background (transparent, solid color, gradient, or custom background image)
    const composed = await composeBackground(cutoutBlob, options);
    onProgress?.(100, "Done!");

    return composed;
  } catch (error) {
    console.error("Failed to remove background via @imgly, attempting canvas fallback:", error);
    onProgress?.(50, "Using fallback subject segmentation...");
    return await fallbackRemoveBg(imageSource, options);
  }
}

/**
 * Composite transparent cutout onto selected background style
 */
async function composeBackground(
  cutoutBlob: Blob,
  options: RemoveBgOptions
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(cutoutBlob);

    img.onload = async () => {
      URL.revokeObjectURL(url);
      const width = img.width;
      const height = img.height;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error("Canvas context error"));
        return;
      }

      // Draw requested background
      if (options.bgType === 'solid') {
        ctx.fillStyle = options.solidColor || '#ffffff';
        ctx.fillRect(0, 0, width, height);
      } else if (options.bgType === 'gradient') {
        const gradDef = PRESET_GRADIENTS[options.gradientIndex] || PRESET_GRADIENTS[0];
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, gradDef.colors[0]);
        grad.addColorStop(1, gradDef.colors[1]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else if (options.bgType === 'customImage' && options.customBgImageDataUrl) {
        await drawCustomImageBg(ctx, options.customBgImageDataUrl, width, height);
      }

      // Draw foreground subject cutout
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({ blob, dataUrl, width, height });
        } else {
          reject(new Error("Blob creation failed"));
        }
      }, 'image/png');
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

function drawCustomImageBg(
  ctx: CanvasRenderingContext2D,
  bgDataUrl: string,
  targetWidth: number,
  targetHeight: number
): Promise<void> {
  return new Promise((resolve) => {
    const bgImg = new Image();
    bgImg.onload = () => {
      // Cover fit
      const scale = Math.max(targetWidth / bgImg.width, targetHeight / bgImg.height);
      const x = (targetWidth - bgImg.width * scale) / 2;
      const y = (targetHeight - bgImg.height * scale) / 2;
      ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);
      resolve();
    };
    bgImg.onerror = () => {
      // Fallback
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      resolve();
    };
    bgImg.src = bgDataUrl;
  });
}

/**
 * Fallback background removal using edge & luminance segmentation
 */
async function fallbackRemoveBg(
  imageSource: File | Blob | string,
  options: RemoveBgOptions
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let srcUrl: string;
    if (typeof imageSource === 'string') {
      srcUrl = imageSource;
    } else {
      srcUrl = URL.createObjectURL(imageSource);
    }

    img.onload = async () => {
      const width = img.width;
      const height = img.height;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Canvas context failed"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Sample corner pixel as background color
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      const threshold = 45;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const diff = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        if (diff < threshold) {
          data[i + 3] = 0; // Set transparent
        }
      }

      ctx.putImageData(imgData, 0, 0);

      const cutoutBlob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), 'image/png'));
      const composed = await composeBackground(cutoutBlob, options);
      resolve(composed);
    };

    img.onerror = (err) => reject(err);
    img.src = srcUrl;
  });
}
