"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Different parallax speeds for each layer
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      {/* Background Layer - Slowest */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        {/* Forest Level Background */}
        <div className="absolute top-0 left-0 w-full h-screen">
          <Image
            src="/images/forest-level.png"
            alt="Forest Level Background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        {/* Character Art */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96">
          <Image src="/images/character-art.png" alt="Main Character Art" fill className="object-contain opacity-8" />
        </div>

        {/* Boss Battle Scene */}
        <div className="absolute top-2/3 left-1/6 w-80 h-60">
          <Image src="/images/boss-battle.png" alt="Boss Battle Scene" fill className="object-cover opacity-12" />
        </div>
      </motion.div>

      {/* Midground Layer - Medium Speed */}
      <motion.div style={{ y: midgroundY }} className="absolute inset-0">
        {/* Grappling Scene */}
        <div className="absolute top-1/4 left-1/3 w-72 h-48">
          <Image src="/images/grappling-scene.png" alt="Grappling Scene" fill className="object-cover opacity-15" />
        </div>

        {/* Level Design Art */}
        <div className="absolute top-3/4 right-1/3 w-64 h-64">
          <Image
            src="/placeholder.svg?height=300&width=300&text=Level+Design"
            alt="Level Design"
            fill
            className="object-contain opacity-10"
          />
        </div>

        {/* Collectibles */}
        <div className="absolute top-1/2 left-1/12 w-32 h-32">
          <Image
            src="/placeholder.svg?height=150&width=150&text=Collectibles"
            alt="Game Collectibles"
            fill
            className="object-contain opacity-20"
          />
        </div>
      </motion.div>

      {/* Foreground Layer - Fastest */}
      <motion.div style={{ y: foregroundY }} className="absolute inset-0">
        {/* UI Elements */}
        <div className="absolute top-1/6 right-1/6 w-48 h-32">
          <Image src="/images/ui-elements.png" alt="Game UI Elements" fill className="object-contain opacity-8" />
        </div>

        {/* Combat Scene */}
        <div className="absolute top-5/6 left-1/4 w-56 h-40">
          <Image
            src="/placeholder.svg?height=200&width=280&text=Combat+Scene"
            alt="Combat Scene"
            fill
            className="object-cover opacity-12"
          />
        </div>

        {/* Speedrun Elements */}
        <div className="absolute top-2/5 right-1/12 w-40 h-40">
          <Image
            src="/placeholder.svg?height=180&width=180&text=Speedrun"
            alt="Speedrun Elements"
            fill
            className="object-contain opacity-15"
          />
        </div>
      </motion.div>

      {/* Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80 pointer-events-none" />
    </div>
  )
}
