"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Twitter, Instagram, Youtube, MessageCircle, Mail } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/DeltaQuestGames", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/deltaquestgames", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@DeltaQuestGames", label: "YouTube" },
    { icon: MessageCircle, href: "https://discord.gg/deltaquest", label: "Discord" },
    { icon: Mail, href: "mailto:hello@deltaquest.games", label: "Email" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="font-fredoka text-3xl font-bold text-gradient mb-4">DeltaQuest Games</h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Creating colorful, expressive games that bring joy to players worldwide. Fruity Tales is our love letter
                to the 2D platformer genre.
              </p>
            </motion.div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Game Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Game</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/demo" className="text-gray-300 hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/kickstarter" className="text-gray-300 hover:text-white transition-colors">
                  Kickstarter
                </Link>
              </li>
              <li>
                <a
                  href="https://store.steampowered.com/app/fruity-tales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Steam Page
                </a>
              </li>
              <li>
                <Link href="/presskit" className="text-gray-300 hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 DeltaQuest Games. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Made with 💖 for the indie game community</p>
        </div>
      </div>
    </footer>
  )
}
