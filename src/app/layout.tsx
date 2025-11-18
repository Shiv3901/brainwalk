import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brainwalk - A mindful stroll through ideas worth knowing",
  description: "Discover curated content across poetry, history, science, philosophy, and more. One idea at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
