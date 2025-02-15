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
  description: `A statically generated site using Next.js and ${CMS_NAME}.`,
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
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body>
        <script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
