"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Star, Sparkles, Mail, ArrowRight } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface HeroProps {
  onJoinQuest: () => void
}

export function Hero({ onJoinQuest }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "hero_section",
          tags: ["hero_signup"],
        }),
      })

      if (response.ok) {
        toast({
          title: "Welcome to the quest! 🎮",
          description: "You're now part of the Fruity Tales community!",
        })
        setEmail("")
      } else {
        throw new Error("Subscription failed")
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us for help.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Foreground Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 transform rotate-45 rounded-lg" />
          </motion.div>
        ))}

        {/* Teal Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.3, 1.2, 0.3],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-20 container mx-auto px-4 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                className="inline-flex items-center gap-2 bg-teal-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-teal-400 mb-6"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 212, 170, 0.15)" }}
              >
                <Star className="w-4 h-4 fill-current" />
                Coming Soon to Steam
              </motion.div>

              <h1 className="font-orbitron text-6xl lg:text-8xl font-black text-gradient leading-tight mb-6">
                FRUITY TALES
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                A next-generation 2D action platformer where precision meets artistry. Master fluid combat, conquer
                handcrafted levels, and experience the evolution of indie gaming.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 glow-effect cursor-glow-hint"
                onClick={onJoinQuest}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  Join the Quest
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-teal-400/50 text-teal-400 hover:bg-teal-400/10 hover:border-teal-400 font-semibold py-4 px-8 rounded-lg text-lg bg-transparent backdrop-blur-sm cursor-glow-hint"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Trailer
              </Button>
            </motion.div>

            {/* Status Indicators */}
            <motion.div
              className="flex items-center gap-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                Demo: Early September
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                Kickstarter: End of September
              </div>
            </motion.div>
          </div>

          {/* Right Column - Game Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-teal-500/20">
                  <Image
                    src="/placeholder.svg?height=600&width=500&text=Fruity+Tales+Gameplay"
                    alt="Fruity Tales Game Screenshot"
                    width={500}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                </div>
              </motion.div>

              {/* Floating UI Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-teal-500 rounded-full p-3 shadow-lg glow-effect"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
              >
                <Star className="w-6 h-6 text-slate-900 fill-current" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-slate-800 to-slate-700 border border-teal-500/30 text-teal-400 rounded-xl px-4 py-2 font-bold backdrop-blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
              >
                Level 1-3
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Email Signup Section */}
      <motion.div
        className="relative z-20 pb-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ y: contentY, opacity }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800/95 to-slate-700/95 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-teal-400 mx-auto mb-4 glow-effect" />
                <h3 className="font-orbitron text-2xl font-bold text-gradient mb-2">STAY IN THE LOOP</h3>
                <p className="text-gray-300">
                  Get exclusive updates, early access to the demo, and be the first to know about our Kickstarter
                  launch.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-slate-900/50 border-teal-500/30 text-white placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400/20"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-900 font-bold px-8 py-2 rounded-lg glow-effect cursor-glow-hint"
                  >
                    {isSubmitting ? "Joining..." : "Join Now"}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 text-center">No spam, just game updates. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
