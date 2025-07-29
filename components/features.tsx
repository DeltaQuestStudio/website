"use client"

import { motion } from "framer-motion"
import { Sword, Zap, Crown, Target, Gamepad2, Palette } from "lucide-react"

const features = [
  {
    icon: Sword,
    title: "Expressive Combat",
    description: "Master fluid combat mechanics with satisfying feedback and creative combos.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Grappling System",
    description: "Swing through levels with precision using our innovative grappling mechanics.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Crown,
    title: "Epic Boss Battles",
    description: "Face off against memorable bosses with unique patterns and personalities.",
    color: "from-purple-500 to-teal-500",
  },
  {
    icon: Target,
    title: "Precision Platforming",
    description: "Every jump matters in our carefully crafted, challenging level design.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Gamepad2,
    title: "Speedrun Ready",
    description: "Built for speedrunners with tight controls and multiple route options.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: Palette,
    title: "Handcrafted Art",
    description: "Every frame is lovingly crafted with vibrant, expressive pixel art.",
    color: "from-teal-400 to-cyan-400",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl lg:text-6xl font-black text-gradient mb-6">WHAT MAKES IT SPECIAL</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Inspired by the legends of 2D platforming, Fruity Tales pushes the boundaries with cutting-edge mechanics
            and uncompromising attention to detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300 h-full">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:shadow-lg glow-effect transition-all duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-slate-900" />
                </motion.div>

                <h3 className="font-orbitron font-bold text-xl mb-4 text-white">{feature.title}</h3>

                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
