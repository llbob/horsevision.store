import Footer from "@/app/_components/footer";
import { CMS_NAME } from "@/lib/constants";
import type { Metadata } from "next";

import "./globals.css";

function getNormalizedUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const urlObject = new URL(url);
    urlObject.hostname = urlObject.hostname.replace(/^www\./, '');
    return urlObject.toString();
  } catch {
    return "http://localhost:3000";
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(getNormalizedUrl()),
  title: {
    template: `%s | ${CMS_NAME}`,
    default: CMS_NAME,
  },
  description: `horse vision`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#F8F8F8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-background">
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
