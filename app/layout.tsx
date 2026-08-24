import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PageLoader } from '@/components/layout/PageLoader';
import { EventCountdownBanner } from '@/components/layout/EventCountdownBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE, organizationJsonLd, websiteJsonLd } from '@/lib/seo';

// Initialize Inter as the primary sans-serif font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Initialize Montserrat as the secondary font (typically used for headings)
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  // Everything else can hand Next a relative URL and get an absolute one back.
  // Without this, social scrapers — which don't resolve relative paths — show
  // no image at all.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | ${SITE.name}`,
    // Page titles become "About ULES | ULES" rather than each one restating the
    // organisation's full name and burning the ~60 characters Google shows.
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.fullName,
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.fullName,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.fullName} | ${SITE.name}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.fullName} | ${SITE.name}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Defaults cap the preview text and forbid large image previews, which
      // is exactly the rich result we want.
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
  category: 'education',
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A2B56',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NG"
      suppressHydrationWarning
      className={cn('h-full font-sans antialiased', inter.variable, montserrat.variable)}
    >
      <head>
        {/*
          Framer renders each reveal's `initial` (hidden) state into the server
          HTML to avoid a flash. With JavaScript off, nothing ever animates it
          back, so the page would be blank. This puts it back.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <PageLoader />

        <Header />

        {/*
          `relative` so the countdown banner can sit absolutely at the top of
          this block — directly under the sticky navbar, overlaying the page
          rather than pushing the hero down, and scrolling away with content.
        */}
        <div className="relative flex-1">
          <EventCountdownBanner />
          <main>{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
