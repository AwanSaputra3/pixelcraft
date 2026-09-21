import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PixelCraft Studio - AI Photo Enhancer & Toolkit",
  description: "Make photos clearer and sharper in just a click with AI-powered technology. All-in-One Client-Side Web Image Toolkit & Photo Editor with 100% privacy.",
  openGraph: {
    title: "PixelCraft Studio - AI Photo Enhancer & Toolkit",
    description: "Make photos clearer and sharper in just a click with AI-powered technology. All-in-One Client-Side Web Image Toolkit & Photo Editor with 100% privacy.",
    type: "website",
    siteName: "PixelCraft Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelCraft Studio - AI Photo Enhancer & Toolkit",
    description: "Make photos clearer and sharper in just a click with AI-powered technology. All-in-One Client-Side Web Image Toolkit & Photo Editor with 100% privacy.",
  },
  keywords: ["image toolkit", "photo editor", "remove background", "image compression", "denoise photo", "pixel art generator", "canvas filter", "client-side privacy", "pro color editor", "color grading"],
  authors: [{ name: "PixelCraft Studio Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#121212] text-white selection:bg-[#ff47ff] selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
