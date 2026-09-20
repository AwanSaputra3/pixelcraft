import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "PixelCraft Studio",
  description: "All-in-One Client-Side Web Image Toolkit & Photo Editor. Enhance photo clarity, compress images, denoise ISO grain, convert to 8-bit retro art, and remove backgrounds with 100% privacy.",
  openGraph: {
    title: "PixelCraft Studio",
    description: "All-in-One Client-Side Web Image Toolkit & Photo Editor. Enhance photo clarity, compress images, denoise ISO grain, convert to 8-bit retro art, and remove backgrounds with 100% privacy.",
    type: "website",
    siteName: "PixelCraft Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelCraft Studio",
    description: "All-in-One Client-Side Web Image Toolkit & Photo Editor. Enhance photo clarity, compress images, denoise ISO grain, convert to 8-bit retro art, and remove backgrounds with 100% privacy.",
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
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#090d16] text-gray-100 selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
