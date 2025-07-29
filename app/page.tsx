"use client"

import { Navbar } from "@/components/navbar"
import { ParallaxBackground } from "@/components/parallax-background"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Roadmap } from "@/components/roadmap"
import { Screenshots } from "@/components/screenshots"
import { SocialProof } from "@/components/social-proof"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { StickyCtaButton } from "@/components/sticky-cta-button"
import { JoinQuestModal } from "@/components/join-quest-modal"
import { useState } from "react"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-slate-900 min-h-screen relative">
      {/* Fixed Parallax Background */}
      <ParallaxBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section - Transparent background to show parallax */}
        <div className="relative z-10">
          <Hero onJoinQuest={() => setIsModalOpen(true)} />
        </div>

        {/* Content sections with solid backgrounds to hide parallax */}
        <div className="relative z-20 bg-slate-800">
          <Features />
        </div>

        <div className="relative z-20 bg-slate-900">
          <Screenshots />
        </div>

        <div className="relative z-20 bg-slate-800">
          <Roadmap />
        </div>

        <div className="relative z-20 bg-slate-900">
          <SocialProof />
        </div>

        <div className="relative z-20 bg-slate-800">
          <FAQ />
        </div>

        <div className="relative z-20">
          <Footer />
        </div>

        <StickyCtaButton onClick={() => setIsModalOpen(true)} />
        <JoinQuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  )
}
