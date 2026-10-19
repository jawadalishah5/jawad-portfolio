import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jawad Bukhari — Sr. Software Engineer & Sr. AI Engineer",
  description:
    "Portfolio of Jawad Bukhari, a senior AI engineer who ships agentic systems, reliable backend services, and cloud infrastructure.",
  authors: [{ name: "Jawad Bukhari" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="portfolio-theme";var t=localStorage.getItem(k);var d=t==="light"?"light":t==="dark"?"dark":(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(d);}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
