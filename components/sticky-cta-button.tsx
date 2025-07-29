"use client"

import { motion, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface StickyCtaButtonProps {
  onClick: () => void
}

export function StickyCtaButton({ onClick }: StickyCtaButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > 800)
    })
    return unsubscribe
  }, [scrollY])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-6 right-6 z-50 hidden md:block"
    >
      <Button
        onClick={onClick}
        size="lg"
        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 glow-effect-strong"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-orbitron font-bold">JOIN THE QUEST</span>
        </motion.div>
      </Button>
    </motion.div>
  )
}
