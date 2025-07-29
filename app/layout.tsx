import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { InteractiveCursor } from "@/components/interactive-cursor"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "700", "900"],
})

export const metadata: Metadata = {
  title: "Fruity Tales - A Colorful 2D Action Platformer | DeltaQuest Games",
  description:
    "Join the quest in Fruity Tales, an expressive 2D action platformer inspired by Celeste, Cuphead, and Shovel Knight. Wishlist on Steam and back our Kickstarter!",
  keywords: ["indie game", "2D platformer", "action game", "Fruity Tales", "DeltaQuest", "Kickstarter", "Steam"],
  authors: [{ name: "DeltaQuest Games" }],
  creator: "DeltaQuest Games",
  publisher: "DeltaQuest Games",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fruitytales.com",
    siteName: "Fruity Tales",
    title: "Fruity Tales - A Colorful 2D Action Platformer",
    description:
      "Join the quest in Fruity Tales, an expressive 2D action platformer inspired by Celeste, Cuphead, and Shovel Knight.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fruity Tales Game Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fruity Tales - A Colorful 2D Action Platformer",
    description:
      "Join the quest in Fruity Tales, an expressive 2D action platformer inspired by Celeste, Cuphead, and Shovel Knight.",
    images: ["/og-image.jpg"],
    creator: "@DeltaQuestGames",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              name: "Fruity Tales",
              description: "A colorful 2D action platformer inspired by Celeste, Cuphead, and Shovel Knight",
              genre: ["Action", "Platformer", "Indie"],
              gamePlatform: ["PC", "Steam"],
              publisher: {
                "@type": "Organization",
                name: "DeltaQuest Games",
                url: "https://fruitytales.com",
              },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/PreOrder",
                url: "https://store.steampowered.com/app/fruity-tales",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-900 text-white min-h-screen cursor-none">
        <Suspense fallback={null}>
          {children}
          <Toaster />
          <Analytics />
          <InteractiveCursor />
        </Suspense>
      </body>
    </html>
  )
}
