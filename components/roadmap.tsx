"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, Rocket } from "lucide-react"

const roadmapItems = [
  {
    date: "Q2 2024",
    title: "Development Kickoff",
    description: "Core mechanics and art style established",
    status: "completed",
    icon: CheckCircle,
  },
  {
    date: "Early Sept 2024",
    title: "Demo Release",
    description: "Playable demo with 3 levels available",
    status: "upcoming",
    icon: Clock,
  },
  {
    date: "End Sept 2024",
    title: "Kickstarter Launch",
    description: "Crowdfunding campaign goes live",
    status: "upcoming",
    icon: Rocket,
  },
  {
    date: "Q1 2025",
    title: "Beta Testing",
    description: "Closed beta for backers and testers",
    status: "planned",
    icon: Calendar,
  },
  {
    date: "Q2 2025",
    title: "Steam Release",
    description: "Full game launches on Steam",
    status: "planned",
    icon: Calendar,
  },
]

export function Roadmap() {
  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-fredoka text-4xl lg:text-6xl font-bold text-gradient mb-6">The Journey Ahead</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our development journey from concept to your Steam library.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Line */}
              {index < roadmapItems.length - 1 && (
                <div className="absolute left-1/2 top-20 w-0.5 h-24 bg-gradient-to-b from-pink-300 to-orange-300 transform -translate-x-0.5" />
              )}

              <div className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "upcoming"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    item.status === "completed"
                      ? "bg-green-500"
                      : item.status === "upcoming"
                        ? "bg-orange-500"
                        : "bg-gray-400"
                  } shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
