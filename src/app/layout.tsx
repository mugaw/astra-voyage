import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { FloatingNav } from "@/components/common/FloatingNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASTRA VOYAGE | Luxury Space Travel Agency",
  description: "Experience the ultimate luxury adventure in space. From lunar escapes to Mars expeditions, we craft extraordinary journeys beyond imagination. Book your interplanetary voyage today.",
  keywords: ["Space Tourism", "Space Travel", "Lunar Vacation", "Mars Expedition", "SpaceX", "NASA", "Astronaut", "Space Experience", "ASTRA VOYAGE"],
  authors: [{ name: "ASTRA VOYAGE Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ASTRA VOYAGE | Luxury Space Travel Agency",
    description: "Experience the ultimate luxury adventure in space. Book your interplanetary voyage today.",
    url: "https://astravoyage.space",
    siteName: "ASTRA VOYAGE",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "ASTRA VOYAGE - Space Travel Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASTRA VOYAGE | Luxury Space Travel Agency",
    description: "Experience the ultimate luxury adventure in space. Book your interplanetary voyage today.",
    images: ["https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ScrollProgress />
        {children}
        <FloatingNav />
        <Toaster />
      </body>
    </html>
  );
}
