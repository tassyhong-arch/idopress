import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDO Press - 한국 고전문학 전자책 플랫폼",
  description: "4개국어로 번역된 한국 고전문학을 무료 전자책으로 만나보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}