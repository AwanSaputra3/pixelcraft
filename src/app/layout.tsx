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
  description: "Next.js photo editing app: Enhance photo clarity, compress images, denoise ISO grain, convert to pixel art, and remove backgrounds 100% client-side with privacy.",
  keywords: ["image toolkit", "photo editor", "remove background", "image compression", "denoise photo", "pixel art generator", "canvas filter", "client-side privacy"],
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
