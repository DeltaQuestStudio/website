"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const screenshots = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Fruity Tales Level 1 - Forest Adventure",
    title: "Forest Adventure",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Epic Boss Battle",
    title: "Boss Battle",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Grappling Mechanics",
    title: "Grappling System",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Speedrun Level",
    title: "Multiple Paths",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Character Customization",
    title: "Customization",
  },
]

export function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-fredoka text-4xl lg:text-6xl font-bold text-gradient mb-6">See It In Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every screenshot tells a story of adventure, challenge, and colorful fun.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Screenshot */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={screenshots[currentIndex].src || "/placeholder.svg"}
              alt={screenshots[currentIndex].alt}
              width={800}
              height={500}
              className="w-full h-auto"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white font-bold text-xl">{screenshots[currentIndex].title}</h3>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentIndex(index)}
                className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex ? "ring-4 ring-pink-400 shadow-lg" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={screenshot.src || "/placeholder.svg"}
                  alt={screenshot.alt}
                  width={120}
                  height={80}
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
