import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samrat Neupane",
  jobTitle: "SEO Specialist & Full-Stack Developer",
  url: "https://www.samratneupane.com.np",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "Nepal",
  },
  worksFor: {
    "@type": "Organization",
    name: "Griffity Studios",
  },
  sameAs: [
    "https://www.linkedin.com/in/samrat-neupane",
    "https://x.com/samratneupane6",
    "https://github.com/SamratNeupane787",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samratneupane.com.np"),
  title: {
    default: "Samrat Neupane | SEO Expert in Nepal & Full-Stack Developer",
    template: `%s | ${DATA.name}`,
  },
  description:
    "SEO expert in Nepal based in Kathmandu. Samrat Neupane grew a client ecommerce site to 265K Google Search impressions in 8 months.",
  alternates: {
    canonical: "https://www.samratneupane.com.np/",
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
