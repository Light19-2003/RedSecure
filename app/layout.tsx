import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { FirstVisitLoader } from "./interactive";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "https://redsecure.online";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: {
      default: "RedSecure — IT Solutions",
      template: "%s",
    },
    description:
      "Empowering businesses through technology, innovation, and secure solutions for a smarter future.",
    icons: {
      icon: "/redsecure/brand/6.png",
      shortcut: "/redsecure/brand/6.png",
      apple: "/redsecure/brand/6.png",
    },
    openGraph: {
      title: "RedSecure — IT Solutions",
      description:
        "Empowering businesses through technology, innovation, and secure solutions for a smarter future.",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "RedSecure — An Innovative IT Solutions Provider",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "RedSecure — IT Solutions",
      description:
        "Empowering businesses through technology, innovation, and secure solutions for a smarter future.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FirstVisitLoader />
        {children}
      </body>
    </html>
  );
}
