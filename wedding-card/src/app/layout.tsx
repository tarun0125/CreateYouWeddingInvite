import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Wedding Invitation",
  description:
    "You are cordially invited to celebrate a beautiful royal Indian wedding — a new chapter, a timeless promise.",
  openGraph: {
    title: "Royal Wedding Invitation",
    description: "You are cordially invited to celebrate a beautiful royal Indian wedding.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}
