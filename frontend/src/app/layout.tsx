import type { Metadata } from "next";
import { Inter, Shrikhand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const shrikhand = Shrikhand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-shrikhand",
});

export const metadata: Metadata = {
  title: "Photo Gallery - Beautiful Photography Collection",
  description: "Discover and like amazing photographs from talented photographers around the world.",
  keywords: ["photography", "gallery", "photos", "art", "visual"],
  authors: [{ name: "Photo Gallery Team" }],
  openGraph: {
    title: "Photo Gallery",
    description: "Beautiful Photography Collection",
    url: "https://your-domain.com",
    siteName: "Photo Gallery",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Gallery Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery",
    description: "Beautiful Photography Collection",
    images: ["https://your-domain.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;700&family=Shrikhand:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${shrikhand.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
