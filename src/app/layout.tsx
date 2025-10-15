import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Religion - Premium Denim & Apparel",
  description: "Discover True Religion&apos;s premium denim and apparel collection. Shop the latest trends in men&apos;s and women&apos;s fashion.",
  keywords: "True Religion, denim, jeans, fashion, clothing, premium apparel",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.png',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Updated: 2024-12-19 - Removed footer and sale elements */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <AuthProvider>
            <AuthGuard>
              <Navbar />
              <main>{children}</main>
            </AuthGuard>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
