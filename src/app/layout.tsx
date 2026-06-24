import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://veya.app"),
  title: "VEYA — AI Shopping Copilot",
  description:
    "AI analyzes reviews, detects suspicious patterns, and finds cheaper alternatives across marketplaces. Never overpay online again.",
  keywords: [
    "AI shopping",
    "review analysis",
    "scam detection",
    "price comparison",
    "shopping assistant",
    "fake reviews",
    "marketplace comparison",
    "VEYA",
  ],
  authors: [{ name: "VEYA" }],
  creator: "VEYA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veya.app",
    title: "VEYA — AI Shopping Copilot",
    description:
      "Never overpay online again. AI analyzes reviews, detects suspicious patterns, and finds cheaper alternatives.",
    siteName: "VEYA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VEYA — AI Shopping Copilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VEYA — AI Shopping Copilot",
    description: "Never overpay online again.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-[#0D0D12] text-white antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
