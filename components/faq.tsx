"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "When will Fruity Tales be released?",
    answer:
      "We're targeting Q2 2025 for the full Steam release. A playable demo will be available in early September 2024, and our Kickstarter launches at the end of September.",
  },
  {
    question: "What platforms will the game be available on?",
    answer:
      "Fruity Tales will initially launch on PC via Steam. Console versions may follow based on community demand and Kickstarter success.",
  },
  {
    question: "How long is the game?",
    answer:
      "The main campaign features 6 worlds with 8 levels each, plus boss battles. Expect 8-12 hours for the main story, with additional content for completionists and speedrunners.",
  },
  {
    question: "Will there be accessibility options?",
    answer:
      "We're committed to making Fruity Tales accessible with colorblind-friendly palettes, customizable controls, difficulty options, and visual/audio cues for different needs.",
  },
  {
    question: "Can I play with a controller?",
    answer:
      "Yes! Fruity Tales supports both keyboard/mouse and controller input. We recommend a controller for the best platforming experience.",
  },
  {
    question: "Will there be a level editor?",
    answer:
      "A level editor is a stretch goal for our Kickstarter campaign. If funded, we'll include robust level creation tools and Steam Workshop integration.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
          <h2 className="font-fredoka text-4xl lg:text-6xl font-bold text-gradient mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers! Here's everything you need to know about Fruity Tales.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-200"
              >
                <h3 className="font-semibold text-lg text-gray-800 pr-4">{faq.question}</h3>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
