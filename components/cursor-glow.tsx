"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Hide on touch devices
    const handleTouchStart = () => {
      setIsVisible(false)
    }

    window.addEventListener("touchstart", handleTouchStart)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("touchstart", handleTouchStart)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, rgba(0, 212, 170, 0.08) 30%, rgba(0, 212, 170, 0.02) 60%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Secondary smaller glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.3,
        }}
        style={{
          width: "150px",
          height: "150px",
          background:
            "radial-gradient(circle, rgba(0, 212, 170, 0.25) 0%, rgba(0, 212, 170, 0.12) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(0.5px)",
        }}
      />

      {/* Core bright spot */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 40,
          mass: 0.1,
        }}
        style={{
          width: "50px",
          height: "50px",
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.4) 0%, rgba(0, 212, 170, 0.2) 50%, transparent 80%)",
          borderRadius: "50%",
        }}
      />
    </>
  )
}
