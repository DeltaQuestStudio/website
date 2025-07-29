"use client"

import { motion } from "framer-motion"
import { Star, Twitter } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Alex Chen",
    handle: "@alexgamedev",
    avatar: "/placeholder.svg?height=50&width=50",
    text: "The movement in Fruity Tales feels absolutely incredible. Can't wait to speedrun this!",
    platform: "twitter",
  },
  {
    name: "Sarah Martinez",
    handle: "@indiegamer_sarah",
    avatar: "/placeholder.svg?height=50&width=50",
    text: "Finally, a platformer that captures the magic of Celeste with its own unique charm. Day one purchase!",
    platform: "twitter",
  },
  {
    name: "GameDev Weekly",
    handle: "@gamedevweekly",
    avatar: "/placeholder.svg?height=50&width=50",
    text: "DeltaQuest is definitely a studio to watch. Fruity Tales looks like it could be the next indie darling.",
    platform: "twitter",
  },
]

const stats = [
  { number: "2.5K+", label: "Steam Wishlists" },
  { number: "850+", label: "Discord Members" },
  { number: "1.2K+", label: "Twitter Followers" },
  { number: "95%", label: "Positive Feedback" },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-fredoka text-4xl lg:text-6xl font-bold text-gradient mb-6">Join the Growing Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thousands of players are already excited about Fruity Tales. See what they're saying!
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="font-fredoka text-3xl lg:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                </div>
                <Twitter className="w-5 h-5 text-blue-400" />
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.text}"</p>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
