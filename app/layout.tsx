import type { Metadata } from "next";
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.ttf",
  variable: "--font-mono",
});

const akira = localFont({
  src: "./fonts/AkiraExpandedDemo.otf",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "SHUISBORED* | Portfolio",
  description: "Designer & Developer crafting clean, modern digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${akira.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
