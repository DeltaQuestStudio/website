"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-teal-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Studio Logo - Left */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <Image
                src="/placeholder.svg?height=40&width=40&text=DQ"
                alt="DeltaQuest Games Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-teal-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </motion.div>
            <div className="hidden sm:block">
              <div className="font-orbitron text-sm font-bold text-teal-400">DELTAQUEST</div>
              <div className="text-xs text-gray-400">GAMES</div>
            </div>
          </Link>

          {/* Game Title - Center */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <motion.h1
              whileHover={{ scale: 1.02 }}
              className="font-orbitron text-xl lg:text-2xl font-black text-gradient cursor-pointer"
            >
              FRUITY TALES
            </motion.h1>
          </Link>

          {/* Wishlist CTA - Right */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg glow-effect text-sm"
              onClick={() => {
                window.open("https://store.steampowered.com/app/fruity-tales", "_blank")
                // Track click
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "steam_wishlist_click", {
                    source: "navbar",
                  })
                }
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Wishlist Now</span>
              <span className="sm:hidden">Wishlist</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
