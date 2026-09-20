import imageCompression from 'browser-image-compression';

export interface CompressOptions {
  quality: number; // 0.1 to 1.0
  format: 'image/jpeg' | 'image/png' | 'image/webp' | 'original';
  maxWidthOrHeight?: number;
  maxSizeMB?: number;
}

export interface CompressResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercentage: number;
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Compress and convert image file client-side
 */
export async function compressImage(
  file: File | Blob,
  options: CompressOptions
): Promise<CompressResult> {
  const originalSize = file.size;
  const originalFile = file instanceof File ? file : new File([file], "image.png", { type: file.type || "image/png" });
  
  const fileType = options.format === 'original' ? originalFile.type : options.format;

  const compressionConfig = {
    maxSizeMB: options.maxSizeMB || 20, // max target size in MB
    maxWidthOrHeight: options.maxWidthOrHeight || 4096,
    useWebWorker: true,
    initialQuality: options.quality,
    fileType: fileType,
  };

  let compressedBlob: Blob;

  try {
    compressedBlob = await imageCompression(originalFile, compressionConfig);
  } catch (err) {
    console.warn("browser-image-compression fallback to HTML5 Canvas compression:", err);
    compressedBlob = await fallbackCanvasCompress(originalFile, options);
  }

  const resultFile = new File([compressedBlob], `compressed_${originalFile.name.split('.')[0]}.${getFileExtension(fileType)}`, {
    type: fileType,
  });

  const dataUrl = await imageCompression.getDataUrlFromFile(resultFile);

  // Get dimensions
  const dimensions = await getImageDimensions(dataUrl);

  const compressedSize = resultFile.size;
  const savedBytes = Math.max(0, originalSize - compressedSize);
  const savedPercentage = originalSize > 0 ? (savedBytes / originalSize) * 100 : 0;

  return {
    file: resultFile,
    originalSize,
    compressedSize,
    savedBytes,
    savedPercentage: parseFloat(savedPercentage.toFixed(1)),
    dataUrl,
    width: dimensions.width,
    height: dimensions.height,
  };
}

/**
 * Canvas fallback for image compression and format conversion
 */
async function fallbackCanvasCompress(file: File, options: CompressOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      let width = img.width;
      let height = img.height;
      const maxDim = options.maxWidthOrHeight || 4096;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Failed to get 2d context"));
        return;
      }

      const targetType = options.format === 'original' ? file.type : options.format;

      // Fill white background for JPEG output if image has transparency
      if (targetType === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas blob export failed"));
          }
        },
        targetType,
        options.quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

function getFileExtension(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/webp':
      return 'webp';
    case 'image/png':
      return 'png';
    default:
      return 'jpg';
  }
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = dataUrl;
  });
}
