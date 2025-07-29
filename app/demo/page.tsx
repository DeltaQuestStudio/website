"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Download, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DemoPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const { toast } = useToast()

  // Demo release date (Early September 2024)
  const demoReleaseDate = new Date("2024-09-05T00:00:00Z")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = demoReleaseDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "demo_page",
          tags: ["demo_early_access"],
        }),
      })

      if (response.ok) {
        toast({
          title: "You're on the list! 🎮",
          description: "We'll email you the moment the demo is ready to play!",
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
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-green-100">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-fredoka text-5xl lg:text-7xl font-bold text-gradient mb-6">Demo Coming Soon!</h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Get ready to experience the first 3 levels of Fruity Tales! Master the basics, meet our colorful cast, and
            get a taste of the adventure ahead.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">Demo Countdown</h2>
            <p className="text-gray-600">Early September 2024</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-6 text-white text-center"
              >
                <div className="font-fredoka text-3xl lg:text-4xl font-bold mb-2">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm font-medium opacity-90">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Early Access Signup */}
          <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Get Early Access</h3>
              <p className="text-gray-600">
                Be the first to play! We'll email you the download link the moment it's ready.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  {isSubmitting ? "Joining..." : "Notify Me"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Demo Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Calendar,
              title: "3 Complete Levels",
              description: "Experience the full gameplay loop with tutorial, challenge, and boss encounter.",
            },
            {
              icon: Clock,
              title: "30-45 Minutes",
              description: "Perfect length to get a feel for the game without spoiling the full experience.",
            },
            {
              icon: Download,
              title: "Free Download",
              description: "Available on Steam and itch.io. No strings attached, just pure fun!",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
